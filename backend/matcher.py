import re
from typing import Optional
from sqlalchemy.orm import Session
from models import Brand, ActiveIngredient, MedicineIngredient, Medicine

def extract_reg_no(ocr_text: str) -> Optional[str]:
    pattern = r"\d[A-Z]\s?\d{2,4}\s?/\s?\d{2,4}"
    match = re.search(pattern, ocr_text)

    if match:
        found = match.group()
        found = re.sub(r"\s+", " ", found).strip()
        return found

    return None


def match_brand_name(ocr_text: str, db: Session):
    all_brands = db.query(Brand).all()
    ocr_text_lower = ocr_text.lower()

    for brand in all_brands:
        words = brand.brand_name.split()

        for word in words:
            word_clean = word.strip("-()").lower()

            if len(word_clean) < 5:
                continue

            if word_clean.isdigit():
                continue

            if word_clean in ocr_text_lower:
                return brand

    return None

def match_active_ingredient(ocr_text: str, db: Session):
    all_ingredients = db.query(ActiveIngredient).all()
    ocr_text_lower = ocr_text.lower()

    matched_ingredient_ids = []

    for ingredient in all_ingredients:
        names_to_check = [ingredient.name_en, ingredient.name_th]

        for name in names_to_check:
            words = name.split()

            for word in words:
                word_clean = word.strip("-()").lower()

                if len(word_clean) < 4:
                    continue

                if word_clean in ocr_text_lower:
                    matched_ingredient_ids.append(ingredient.id)
                    break

    if not matched_ingredient_ids:
        return []

    medicine_ids = (
        db.query(MedicineIngredient.medicine_id)
        .filter(MedicineIngredient.ingredient_id.in_(matched_ingredient_ids))
        .distinct()
        .all()
    )

    medicine_id_list = [row[0] for row in medicine_ids]

    medicines = db.query(Medicine).filter(Medicine.id.in_(medicine_id_list)).all()

    return medicines

def identify_medicine(ocr_text: str, db: Session):
    reg_no = extract_reg_no(ocr_text)
    if reg_no:
        brand = db.query(Brand).filter(Brand.reg_no == reg_no).first()
        if brand:
            return {
                "match_type": "reg_no",
                "reg_no": reg_no,
                "brands": [brand],
            }

    brand = match_brand_name(ocr_text, db)
    if brand:
        return {
            "match_type": "brand_name",
            "reg_no": brand.reg_no,
            "brands": [brand],
        }

    medicines = match_active_ingredient(ocr_text, db)
    if medicines:
        medicine_ids = [m.id for m in medicines]
        brands = db.query(Brand).filter(Brand.medicine_id.in_(medicine_ids)).all()
        return {
            "match_type": "active_ingredient",
            "reg_no": None,
            "brands": brands,
        }

    return {
        "match_type": "not_found",
        "reg_no": None,
        "brands": [],
    }

if __name__ == "__main__":
    from database import SessionLocal

    db = SessionLocal()

    print("=== ทดสอบ 1: มีเลขทะเบียนชัดเจน ===")
    text1 = "TYLENOL 500 ไทลินอล Reg. No. 1A 844/39 Manufactured by OLIC"
    result1 = identify_medicine(text1, db)
    print(result1["match_type"], "| จำนวนยี่ห้อ:", len(result1["brands"]))

    print("=== ทดสอบ 2: มีแค่ชื่อยี่ห้อ ===")
    text2 = "TYLENOL 500 Pain Reliever Fever Reducer"
    result2 = identify_medicine(text2, db)
    print(result2["match_type"], "| จำนวนยี่ห้อ:", len(result2["brands"]))

    print("=== ทดสอบ 3: มีแค่ชื่อตัวยาสำคัญ ===")
    text3 = "ยานี้มีพาราเซตามอล 500 มิลลิกรัม บรรเทาอาการปวด"
    result3 = identify_medicine(text3, db)
    print(result3["match_type"], "| จำนวนยี่ห้อ:", len(result3["brands"]))
    for b in result3["brands"]:
        print("  -", b.brand_name)

    print("=== ทดสอบ 4: ไม่เจอเลย ===")
    text4 = "xyz abc random text"
    result4 = identify_medicine(text4, db)
    print(result4["match_type"], "| จำนวนยี่ห้อ:", len(result4["brands"]))

    db.close()