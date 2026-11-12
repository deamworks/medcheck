import re
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session, selectinload

from models import ActiveIngredient, Brand, Medicine, MedicineIngredient


def extract_reg_no(ocr_text: str) -> Optional[str]:
    pattern = r"\d[A-Z]\s?\d{2,4}\s?/\s?\d{2,4}"
    # IGNORECASE: OCR อาจอ่านตัวอักษรเป็นตัวพิมพ์เล็ก เช่น "1a 844/39"
    match = re.search(pattern, ocr_text, re.IGNORECASE)

    if match:
        found = re.sub(r"\s+", " ", match.group()).strip()
        return found.upper()

    return None


def normalize_reg_no(reg_no: str) -> str:
    return re.sub(r"\s+", "", reg_no).upper()

# คำทั่วไปในชื่อยี่ห้อที่บอกรูปแบบยา/รสชาติ ไม่ได้บอกว่าเป็นยี่ห้อไหน
BRAND_GENERIC_WORDS = {
    # อังกฤษ
    "tablet", "tablets", "mixture", "syrup", "suspension", "solution",
    "capsule", "capsules", "liquid", "peppermint", "original",
    # ไทย
    "ชนิดเม็ด", "ชนิดน้ำ", "เปปเปอร์มินท์", "เม็ดกลม", "เม็ดรี", "ยาเม็ด", "ยาน้ำ",
}


def match_brand_name(ocr_text: str, db: Session):
    all_brands = db.query(Brand).all()
    ocr_text_lower = ocr_text.lower()

    for brand in all_brands:
        for word in brand.brand_name.split():
            word_clean = word.strip("-()").lower()

            if len(word_clean) < 5:
                continue
            if word_clean.isdigit():
                continue
            if word_clean in BRAND_GENERIC_WORDS:
                continue
            if word_clean in ocr_text_lower:
                return brand

    return None


def match_active_ingredient(ocr_text: str, db: Session):
    all_ingredients = (
        db.query(ActiveIngredient).options(selectinload(ActiveIngredient.aliases)).all()
    )
    ocr_text_lower = ocr_text.lower()

    matched_ingredient_ids = []

    for ingredient in all_ingredients:
        matched = False

        # 1) ชื่อหลัก: แตกเป็นคำย่อย (ชื่อจริงมีไทย+อังกฤษปน)
        for name in [ingredient.name_en, ingredient.name_th]:
            for word in name.split():
                word_clean = word.strip("-()").lower()
                if len(word_clean) < 4:
                    continue
                if word_clean in ocr_text_lower:
                    matched = True
                    break
            if matched:
                break

        # 2) ชื่อเรียกอื่น: เทียบทั้งวลี ไม่แตกคำ
        #    (ถ้าแตก "Vitamin B1" จะเหลือ "vitamin" แล้ว match วิตามินทุกตัว)
        if not matched:
            for alias in ingredient.aliases:
                alias_clean = alias.alias_name.strip().lower()
                if len(alias_clean) >= 4 and alias_clean in ocr_text_lower:
                    matched = True
                    break

        if matched:
            matched_ingredient_ids.append(ingredient.id)

    if not matched_ingredient_ids:
        return []

    medicine_ids = (
        db.query(MedicineIngredient.medicine_id)
        .filter(MedicineIngredient.ingredient_id.in_(matched_ingredient_ids))
        .distinct()
        .all()
    )
    medicine_id_list = [row[0] for row in medicine_ids]

    return db.query(Medicine).filter(Medicine.id.in_(medicine_id_list)).all()


def identify_medicine(ocr_text: str, db: Session):
    ocr_reg_no = extract_reg_no(ocr_text)

    # ขั้น 1: เลขทะเบียน (เทียบแบบตัดช่องว่างออกทั้งสองฝั่ง)
    if ocr_reg_no:
        key = normalize_reg_no(ocr_reg_no)
        brand = (
            db.query(Brand)
            .filter(func.upper(func.replace(Brand.reg_no, " ", "")) == key)
            .first()
        )
        if brand:
            return {"match_type": "reg_no", "ocr_reg_no": ocr_reg_no, "brands": [brand]}

    # ขั้น 2: ชื่อยี่ห้อ
    brand = match_brand_name(ocr_text, db)
    if brand:
        return {"match_type": "brand_name", "ocr_reg_no": ocr_reg_no, "brands": [brand]}

    # อ่านเลขทะเบียนได้ชัด แต่ไม่ใช่ยาในระบบ → ไม่อยู่ในขอบเขต
    # (ไม่ไปขั้น 3 เพราะจะทำให้ยายี่ห้อนอกระบบไปโผล่เป็นยี่ห้อของเรา)
    if ocr_reg_no:
        return {"match_type": "out_of_scope", "ocr_reg_no": ocr_reg_no, "brands": []}

    # ขั้น 3: ตัวยาสำคัญ (รวมชื่อเรียกอื่น)
    medicines = match_active_ingredient(ocr_text, db)
    if medicines:
        medicine_ids = [m.id for m in medicines]
        brands = db.query(Brand).filter(Brand.medicine_id.in_(medicine_ids)).all()
        return {"match_type": "active_ingredient", "ocr_reg_no": None, "brands": brands}

    return {"match_type": "not_found", "ocr_reg_no": None, "brands": []}


if __name__ == "__main__":
    from database import SessionLocal

    db = SessionLocal()

    print("=== ทดสอบ 1: มีเลขทะเบียนชัดเจน ===")
    r1 = identify_medicine("TYLENOL 500 ไทลินอล Reg. No. 1A 844/39 Manufactured by OLIC", db)
    print(r1["match_type"], "| จำนวนยี่ห้อ:", len(r1["brands"]), "| คาดว่า: reg_no")

    print("=== ทดสอบ 2: มีแค่ชื่อยี่ห้อ ===")
    r2 = identify_medicine("TYLENOL 500 Pain Reliever Fever Reducer", db)
    print(r2["match_type"], "| จำนวนยี่ห้อ:", len(r2["brands"]), "| คาดว่า: brand_name")

    print("=== ทดสอบ 3: มีแค่ชื่อตัวยาสำคัญ ===")
    r3 = identify_medicine("ยานี้มีพาราเซตามอล 500 มิลลิกรัม บรรเทาอาการปวด", db)
    print(r3["match_type"], "| จำนวนยี่ห้อ:", len(r3["brands"]), "| คาดว่า: active_ingredient")
    for b in r3["brands"]:
        print("  -", b.brand_name)

    print("=== ทดสอบ 4: ไม่เจอเลย ===")
    r4 = identify_medicine("xyz abc random text", db)
    print(r4["match_type"], "| คาดว่า: not_found")

    print("=== ทดสอบ 5: เลขทะเบียนไม่มีเว้นวรรค + ตัวพิมพ์เล็ก ===")
    r5 = identify_medicine("Reg. No. 1a844/39", db)
    print(r5["match_type"], "| ocr_reg_no:", r5["ocr_reg_no"], "| คาดว่า: reg_no, 1A844/39")

    print("=== ทดสอบ 6: เลขทะเบียนที่ไม่อยู่ในระบบ ===")
    r6 = identify_medicine("Reg. No. 9Z 999/99 some other drug", db)
    print(r6["match_type"], "| คาดว่า: out_of_scope")

    print("=== ทดสอบ 7: ชื่อเรียกอื่น (alias) ===")
    r7 = identify_medicine("Acetaminophen 500 mg tablets", db)
    print(r7["match_type"], "| จำนวนยี่ห้อ:", len(r7["brands"]),
          "| คาดว่า: active_ingredient (ถ้าเพิ่ม alias Acetaminophen แล้ว)")

    db.close()