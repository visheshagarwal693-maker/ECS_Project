import json
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models_db import DetectionEvent
from app.analytics import priority
from app.schemas import DetectionEventIn

def save_event(db: Session, event: DetectionEventIn):
    existing = db.scalar(select(DetectionEvent).where(DetectionEvent.event_id == event.event_id))
    if existing:
        return existing, False

    detections = [d.model_dump(mode="json") for d in event.detections]
    score, level = priority(detections)
    row = DetectionEvent(
        event_id=event.event_id,
        camera_id=event.camera_id,
        location_id=event.location_id,
        data_source=event.data_source,
        captured_at=event.captured_at,
        processed_at=event.processed_at,
        model_name=event.model_name,
        model_version=event.model_version,
        detection_count=len(detections),
        detections_json=json.dumps(detections),
        latitude=event.latitude,
        longitude=event.longitude,
        footfall_count=event.footfall_count,
        priority_score=score,
        priority_level=level,
        collection_status=event.collection_status,
        processing_status=event.processing_status,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row, True
