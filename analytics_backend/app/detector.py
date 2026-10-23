
from functools import lru_cache

from ultralytics import YOLO


# Common object classes that may be relevant to waste.
# These are candidates, not proof that an object is litter.


@lru_cache(maxsize=1)
def get_model():
    return YOLO(
        "models/litter_best.pt"
    )


def detect_objects(image):
    model = get_model()

    results = model.predict(
        source=image,
        conf=0.25,
        device="cpu",
        verbose=False,
    )

    result = results[0]
    detections = []

    if result.boxes is None:
        return detections

    for box in result.boxes:
        class_id = int(box.cls[0].item())
        class_name = result.names[class_id]

        # Ignore objects outside our initial candidate list.
        

        x1, y1, x2, y2 = box.xyxy[0].tolist()

        detections.append({
            "class_name": class_name,
            "confidence": float(box.conf[0].item()),
            "bbox": {
                "x1": float(x1),
                "y1": float(y1),
                "x2": float(x2),
                "y2": float(y2),
            },
        })

    return detections

