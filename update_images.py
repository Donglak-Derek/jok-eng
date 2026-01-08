import os

ROOT_DIR = "src/data"

CATEGORY_IMAGES = {
    "small_talk": "/images/scenarios/small_talk_generic.png",
    "the_sarcasm_detector": "/images/scenarios/sarcasm_generic.png",
    "the_polite_fight": "/images/scenarios/polite_generic.png",
    "dating_and_disasters": "/images/scenarios/dating_generic.png",
    "the_party_survival_kit": "/images/scenarios/bus_stop.png", # Fallback for missed party ones
    "texting_decoder": "/images/scenarios/texting_generic.png",
    "office_banter": "/images/scenarios/networking_coffee.png" # Fallback
}

def update_file(filepath, category):
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    # Check if already has imageUrl
    if any("imageUrl:" in line for line in lines):
        return
    
    # Determine insertion point
    insert_idx = -1
    for i, line in enumerate(lines):
        if "sentences:" in line or "decoderItems:" in line:
            insert_idx = i
            break
            
    if insert_idx != -1:
        img_url = CATEGORY_IMAGES.get(category)
        if img_url:
            lines.insert(insert_idx, f'  imageUrl: "{img_url}",\n')
            with open(filepath, 'w') as f:
                f.writelines(lines)
            print(f"Updated {filepath}")

for root, dirs, files in os.walk(ROOT_DIR):
    for file in files:
        if file.endswith(".ts") and file not in ["index.ts", "categories.ts"]:
            filepath = os.path.join(root, file)
            # Determine category from parent dirname
            category = os.path.basename(root)
            if category in CATEGORY_IMAGES:
                update_file(filepath, category)
