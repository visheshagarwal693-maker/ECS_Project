import json
import random
import shutil
import zipfile
from pathlib import Path
from collections import defaultdict, Counter

zip_path = Path.home() / "Downloads" / "TACO.zip"
output = Path("datasets/taco_prototype")



litter_categories = [
    "Other plastic bottle",
    "Clear plastic bottle",
    "Glass bottle",
    "Food Can",
    "Aerosol",
    "Drink can",
    "Toilet tube",
    "Other carton",
    "Egg carton",
    "Drink carton",
    "Corrugated carton",
    "Meal carton",
    "Pizza box",
    "Magazine paper",
    "Tissues",
    "Wrapping paper",
    "Normal paper",
    "Paper bag",
    "Plastified paper bag",
    "Plastic film",
    "Six pack rings",
    "Garbage bag",
    "Other plastic wrapper",
    "Single-use carrier bag",
    "Polypropylene bag",
    "Crisp packet",
    "Disposable plastic cup",
    "Foam cup",
    "Other plastic cup",
    "Cigarette",
]

class_names = ["litter"]

# Map every selected litter category to the single class ID 0.
name_to_class = {
    category_name: 0
    for category_name in litter_categories
}


print("Reading TACO annotations...")
with zipfile.ZipFile(zip_path) as z:
    data = json.loads(z.read("TACO/data/annotations.json"))
    category_names = {c["id"]: c["name"] for c in data["categories"]}
    image_info = {im["id"]: im for im in data["images"]}
    selected = defaultdict(list)
    class_counts = Counter()

    for ann in data["annotations"]:
        category_name = category_names.get(ann["category_id"])
        if category_name not in name_to_class:
            continue
        bbox = ann.get("bbox", [])
        if len(bbox) != 4 or bbox[2] <= 0 or bbox[3] <= 0:
            continue
        image_id = ann["image_id"]
        selected[image_id].append(
            (name_to_class[category_name], bbox)
        )
        class_counts[name_to_class[category_name]] += 1

    image_ids = list(selected.keys())
    random.Random(42).shuffle(image_ids)
    cut = max(1, int(len(image_ids) * 0.8))
    split_ids = {
        "train": image_ids[:cut],
        "val": image_ids[cut:]
    }

    for split, ids in split_ids.items():
        image_dir = output / "images" / split
        label_dir = output / "labels" / split
        image_dir.mkdir(parents=True, exist_ok=True)
        label_dir.mkdir(parents=True, exist_ok=True)

        for image_id in ids:
            info = image_info[image_id]
            relative_name = info["file_name"]
            archive_name = "TACO/data/" + relative_name
            safe_name = relative_name.replace("/", "__")
            image_path = image_dir / safe_name
            label_path = label_dir / (Path(safe_name).stem + ".txt")

            if not image_path.exists():
                with z.open(archive_name) as src, open(image_path, "wb") as dst:
                    shutil.copyfileobj(src, dst)

            width, height = info["width"], info["height"]
            lines = []
            for class_id, (x, y, w, h) in selected[image_id]:
                xc = (x + w / 2) / width
                yc = (y + h / 2) / height
                lines.append(
                    f"{class_id} {xc:.6f} {yc:.6f} {w/width:.6f} {h/height:.6f}"
                )
            label_path.write_text("\n".join(lines) + "\n", encoding="utf-8")

yaml_path = output / "data.yaml"
root = output.resolve().as_posix()
yaml_text = f"path: '{root}'\ntrain: images/train\nval: images/val\nnames:\n"
for i, name in enumerate(class_names):
    yaml_text += f"  {i}: {name}\n"
yaml_path.write_text(yaml_text, encoding="utf-8")

print("\nDATASET PREPARATION COMPLETE")
print("Training images:", len(split_ids["train"]))
print("Validation images:", len(split_ids["val"]))
print("Annotations by class:")
for i, name in enumerate(class_names):
    print(f"  {i}: {name}: {class_counts[i]}")
print("Dataset configuration:", yaml_path)
print("Original TACO ZIP was not modified.")
