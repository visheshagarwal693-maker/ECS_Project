import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./data/litter.db")
CAMERA_ID = os.getenv("CAMERA_ID", "camera-001")
LOCATION_ID = os.getenv("LOCATION_ID", "site-001")
MODEL_NAME = os.getenv("MODEL_NAME", "yolo11")
MODEL_VERSION = os.getenv("MODEL_VERSION", "unconfigured")
CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", "0.35"))

def optional_float(name: str):
    value = os.getenv(name, "").strip()
    return float(value) if value else None
