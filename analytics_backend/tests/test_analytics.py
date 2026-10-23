from datetime import datetime, timezone, timedelta
from app.analytics import priority, collection_duration_minutes

def test_empty_detections_are_low_priority():
    assert priority([]) == (0.0, "low")

def test_priority_is_bounded_and_has_level():
    score, level = priority([{"class_name": "glass"}] * 3, recent_event_count=2)
    assert 0 <= score <= 100
    assert level in {"low", "medium", "high"}

def test_collection_duration():
    start = datetime(2026, 10, 22, 10, tzinfo=timezone.utc)
    end = start + timedelta(minutes=12)
    assert collection_duration_minutes(start, end) == 12.0

def test_missing_collection_times():
    assert collection_duration_minutes(None, None) is None
