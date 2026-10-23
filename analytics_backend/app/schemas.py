from datetime import datetime, timezone
from typing import Literal
from uuid import uuid4
from pydantic import BaseModel, Field, ConfigDict, field_validator, model_validator

def utc_now():
    return datetime.now(timezone.utc)

class BoundingBox(BaseModel):
    # Pixel coordinates: x1,y1 = top-left; x2,y2 = bottom-right.
    x1: float = Field(ge=0)
    y1: float = Field(ge=0)
    x2: float = Field(gt=0)
    y2: float = Field(gt=0)

    @model_validator(mode="after")
    def valid_box(self):
        if self.x2 <= self.x1 or self.y2 <= self.y1:
            raise ValueError("bbox must have x2>x1 and y2>y1")
        return self

class Detection(BaseModel):
    class_name: str = Field(min_length=1)
    confidence: float = Field(ge=0, le=1)
    bbox: BoundingBox

class DetectionEventIn(BaseModel):
    model_config = ConfigDict(extra="forbid")
    schema_version: str = "1.0"
    event_id: str = Field(default_factory=lambda: str(uuid4()))
    camera_id: str = Field(min_length=1)
    location_id: str = Field(min_length=1)
    data_source: Literal["test", "operational"] = "test"
    captured_at: datetime
    processed_at: datetime = Field(default_factory=utc_now)
    model_name: str = Field(min_length=1)
    model_version: str = Field(min_length=1)
    detections: list[Detection] = Field(default_factory=list)
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    footfall_count: int | None = Field(default=None, ge=0)
    collection_status: Literal["unassigned", "queued", "assigned", "in_progress", "collected"] = "unassigned"
    processing_status: Literal["received", "processed", "failed"] = "processed"

    @field_validator("captured_at", "processed_at")
    @classmethod
    def timezone_required(cls, value):
        if value.tzinfo is None or value.utcoffset() is None:
            raise ValueError("timestamps must include a timezone; use UTC ISO 8601")
        return value

class CollectionUpdate(BaseModel):
    collection_status: Literal["unassigned", "queued", "assigned", "in_progress", "collected"]
    actual_collection_started_at: datetime | None = None
    actual_collection_completed_at: datetime | None = None

class EventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    event_id: str
    camera_id: str
    location_id: str
    captured_at: datetime
    processed_at: datetime
    model_name: str
    model_version: str
    detection_count: int
    latitude: float | None
    longitude: float | None
    footfall_count: int | None
    priority_score: float
    priority_level: str
    estimated_collection_minutes: float | None
    actual_collection_started_at: datetime | None
    actual_collection_completed_at: datetime | None
    collection_status: str
    processing_status: str
