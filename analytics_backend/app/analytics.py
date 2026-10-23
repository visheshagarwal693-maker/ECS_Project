from collections import Counter
from datetime import datetime, timezone
from statistics import mean

# Prototype heuristic only; tune with domain experts and real observations.

HAZARD_WEIGHT = {
    # Existing and possible future litter class names
    "sharp_object": 1.0,
    "knife": 1.0,
    "glass": 0.9,
    "wine glass": 0.9,
    "battery": 1.0,
    "plastic_bottle": 0.4,
    "bottle": 0.4,
    "plastic bag": 0.4,
    "wrapper": 0.4,
    "can": 0.4,
    "paper": 0.2,
    "cup": 0.3,
    "bowl": 0.2,
    "fork": 0.5,
    "spoon": 0.2,
    "unknown": 0.5,
}


def priority(detections: list[dict], recent_event_count: int = 0):
    if not detections:
        return 0.0, "low"
    quantity_score = min(len(detections) / 10, 1.0) * 50
    hazard_average = mean(
        HAZARD_WEIGHT.get(str(d.get("class_name", "")).lower(), HAZARD_WEIGHT["unknown"])
        for d in detections
    )
    hazard_score = hazard_average * 30
    recurrence_score = min(max(recent_event_count, 0) / 10, 1.0) * 20
    score = round(quantity_score + hazard_score + recurrence_score, 2)
    level = "high" if score >= 70 else "medium" if score >= 40 else "low"
    return score, level

def event_summary(rows):
    class_counts = Counter()
    total_objects = 0
    confidences = []
    for row in rows:
        import json
        detections = json.loads(row.detections_json)
        total_objects += len(detections)
        for detection in detections:
            class_counts[detection["class_name"]] += 1
            confidences.append(detection["confidence"])
    return {
        "event_count": len(rows),
        "total_object_detections": total_objects,
        "counts_by_class": dict(class_counts),
        "average_confidence": round(mean(confidences), 4) if confidences else None,
        "note": "Counts are detections across events, not unique physical litter items."
    }

def collection_duration_minutes(started_at, completed_at):
    if started_at is None or completed_at is None:
        return None
    if completed_at < started_at:
        raise ValueError("Completion cannot be before collection start")
    return round((completed_at - started_at).total_seconds() / 60, 2)
