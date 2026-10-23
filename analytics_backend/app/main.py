
import json
from io import BytesIO
from uuid import uuid4
from collections import defaultdict
from fastapi import UploadFile, File
from PIL import Image, UnidentifiedImageError

from app.detector import detect_objects
from datetime import datetime, timezone
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.database import Base, engine, get_db
from app import models_db
from app.schemas import DetectionEventIn, EventOut, CollectionUpdate
from app.service import save_event
from app.analytics import event_summary, collection_duration_minutes

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Urban Micro-Litter Analytics API",
    version="0.1.0",
    description="Prototype API. Protect it with authentication before shared or production use."
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "urban-micro-litter-analytics", "version": "0.1.0"}


@app.post("/detect/image")
async def detect_image_endpoint(
    file: UploadFile = File(...),
    camera_id: str = "camera-01",
    location_id: str = "location-01",
    data_source: str = "operational",
    latitude: float | None = None,
    longitude: float | None = None,
    footfall_count: int | None = None,
    db: Session = Depends(get_db),
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=415,
            detail="Please upload an image file."
        )

    content = await file.read()

    if not content:
        raise HTTPException(status_code=400, detail="The image is empty.")

    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="Image size must not exceed 10 MB."
        )

    try:
        image = Image.open(BytesIO(content)).convert("RGB")
    except (UnidentifiedImageError, OSError):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image."
        )

    captured_at = datetime.now(timezone.utc)

    try:
        detections = detect_objects(image)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Image detection failed: {type(exc).__name__}"
        )

    processed_at = datetime.now(timezone.utc)

    event = DetectionEventIn(
        event_id=str(uuid4()),
        camera_id=camera_id,
        location_id=location_id,
        captured_at=captured_at,
        processed_at=processed_at,
        data_source=data_source,
        model_name="YOLO11n-TACO-SingleClass",
        model_version="taco-litter-5-epochs",
        detections=detections,
        latitude=latitude,
        longitude=longitude,
        footfall_count=footfall_count,
        processing_status="processed",
    )

    row, created = save_event(db, event)

    return {
        "event_id": row.event_id,
        "detection_count": row.detection_count,
        "detections": json.loads(row.detections_json),
        "priority_score": row.priority_score,
        "priority_level": row.priority_level,
        "note": (
            "Experimental custom-trained single-class litter model trained on a TACO dataset subset. Predictions require validation before real-world use."
            "Predictions require validation before real-world use."
        ),
    }


@app.post("/events", response_model=EventOut)
def create_event(event: DetectionEventIn, db: Session = Depends(get_db)):
    row, created = save_event(db, event)
    # Idempotent behavior: same event_id returns the existing event.
    return row

@app.get("/events", response_model=list[EventOut])
def list_events(limit: int = 100, db: Session = Depends(get_db)):
    if limit < 1 or limit > 1000:
        raise HTTPException(status_code=400, detail="limit must be between 1 and 1000")
    return list(db.scalars(select(models_db.DetectionEvent).order_by(
        models_db.DetectionEvent.captured_at.desc()
    ).limit(limit)).all())


@app.get("/analytics/summary")
def summary(db: Session = Depends(get_db)):
    rows = list(
        db.scalars(
            select(models_db.DetectionEvent).where(
                models_db.DetectionEvent.data_source == "operational"
            )
        ).all()
    )
    return event_summary(rows)

@app.get("/analytics/hotspots")
def hotspots(db: Session = Depends(get_db)):
    rows = list(
    db.scalars(
        select(models_db.DetectionEvent).where(
            models_db.DetectionEvent.data_source == "operational"
        )
    ).all()
)

    locations = defaultdict(list)

    for row in rows:
        locations[row.location_id].append(row)

    results = []

    for location_id, events in locations.items():
        total_detections = sum(
            event.detection_count for event in events
        )

        average_priority = round(
            sum(event.priority_score for event in events)
            / len(events),
            2,
        )

        latest_event = max(
            events, key=lambda event: event.captured_at
        )

        pending_count = sum(
            1 for event in events
            if event.collection_status != "completed"
        )

        if total_detections >= 10 or average_priority >= 70:
            severity = "high"
        elif total_detections >= 4 or average_priority >= 40:
            severity = "medium"
        else:
            severity = "low"

        results.append({
            "location_id": location_id,
            "event_count": len(events),
            "total_detections": total_detections,
            "average_priority_score": average_priority,
            "latest_detection_at": latest_event.captured_at,
            "pending_collection_events": pending_count,
            "hotspot_severity": severity,
            "latitude": latest_event.latitude,
            "longitude": latest_event.longitude,
        })

    results.sort(
        key=lambda item: item["average_priority_score"],
        reverse=True,
    )

    return {
        "hotspot_count": len(results),
        "hotspots": results,
        "note": (
            "Prototype hotspot estimates based on stored events. "
            "Repeated detections may represent the same physical litter."
        ),
    }


@app.get("/events/{event_id}/detections")
def event_detections(event_id: str, db: Session = Depends(get_db)):
    row = db.scalar(select(models_db.DetectionEvent).where(models_db.DetectionEvent.event_id == event_id))
    if not row:
        raise HTTPException(status_code=404, detail="event not found")
    return {
        "event_id": row.event_id,
        "detection_count": row.detection_count,
        "detections": json.loads(row.detections_json)
    }

@app.patch("/events/{event_id}/collection", response_model=EventOut)
def update_collection(event_id: str, update: CollectionUpdate, db: Session = Depends(get_db)):
    row = db.scalar(select(models_db.DetectionEvent).where(models_db.DetectionEvent.event_id == event_id))
    if not row:
        raise HTTPException(status_code=404, detail="event not found")
    for field in ("actual_collection_started_at", "actual_collection_completed_at"):
        value = getattr(update, field)
        if value is not None and (value.tzinfo is None or value.utcoffset() is None):
            raise HTTPException(status_code=422, detail=f"{field} must include timezone")
    row.collection_status = update.collection_status
    if update.actual_collection_started_at is not None:
        row.actual_collection_started_at = update.actual_collection_started_at
    if update.actual_collection_completed_at is not None:
        row.actual_collection_completed_at = update.actual_collection_completed_at
    if row.actual_collection_started_at and row.actual_collection_completed_at:
        try:
            row.estimated_collection_minutes = collection_duration_minutes(
                row.actual_collection_started_at, row.actual_collection_completed_at
            )
        except ValueError as exc:
            raise HTTPException(status_code=422, detail=str(exc))
    db.commit()
    db.refresh(row)
    return row
