
from pathlib import Path
from ultralytics import YOLO

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_YAML = PROJECT_ROOT / "datasets" / "taco_prototype" / "data.yaml"
RUNS_DIR = PROJECT_ROOT / "runs" / "litter_single_class"

def main():
    if not DATA_YAML.exists():
        raise FileNotFoundError(
            f"Dataset configuration not found: {DATA_YAML}"
        )

    print("Dataset:", DATA_YAML)
    print("Training one class: litter")
    print("Device: CPU")
    print("Existing models/litter_best.pt will not be changed.")

    model = YOLO("yolo11n.pt")

    model.train(
        data=str(DATA_YAML),
        epochs=5,
        imgsz=640,
        batch=4,
        device="cpu",
        workers=0,
        project=str(RUNS_DIR),
        name="taco_litter_one_class",
        exist_ok=False,
        plots=True,
    )

    print("\nTraining finished.")
    print(
        "Candidate model:",
        RUNS_DIR / "taco_litter_one_class" / "weights" / "best.pt",
    )
    print("Do not replace the existing model until we evaluate this candidate.")

if __name__ == "__main__":
    main()
