from app.analytics import priority

example = [
    {"class_name": "plastic_bottle", "confidence": 0.91},
    {"class_name": "plastic_bottle", "confidence": 0.88},
    {"class_name": "glass", "confidence": 0.82},
]
score, level = priority(example, recent_event_count=3)
print({"synthetic_example": True, "object_count": len(example),
       "priority_score": score, "priority_level": level})
