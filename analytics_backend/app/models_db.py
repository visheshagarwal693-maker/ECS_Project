from datetime import datetime
from sqlalchemy import String, DateTime, Float, Integer, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class DetectionEvent(Base):
    __tablename__ = "detection_events"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    event_id: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    camera_id: Mapped[str] = mapped_column(String(100), index=True)
    location_id: Mapped[str] = mapped_column(String(100), index=True)
    data_source: Mapped[str] = mapped_column(String(20), default="test", nullable=False, index=True)
    captured_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    processed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    model_name: Mapped[str] = mapped_column(String(100))
    model_version: Mapped[str] = mapped_column(String(100))
    detection_count: Mapped[int] = mapped_column(Integer, default=0)
    detections_json: Mapped[str] = mapped_column(Text)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    footfall_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    priority_score: Mapped[float] = mapped_column(Float, default=0)
    priority_level: Mapped[str] = mapped_column(String(20), default="low")
    estimated_collection_minutes: Mapped[float | None] = mapped_column(Float, nullable=True)
    actual_collection_started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    actual_collection_completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    collection_status: Mapped[str] = mapped_column(String(30), default="unassigned")
    processing_status: Mapped[str] = mapped_column(String(30), default="processed")
