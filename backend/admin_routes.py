import re
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import func
from sqlalchemy.orm import Session

from auth import get_current_admin
from database import get_db
from models import (
    ActiveIngredient, Brand, Category, IngredientAlias,
    Medicine, MedicineIngredient, Warning,
)

# ทุก endpoint ในไฟล์นี้ต้องมี token ของ admin
router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(get_current_admin)],
)


# =====================================================
# Schemas
# =====================================================

class BrandIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    medicine_id: int
    brand_name: str = Field(min_length=1, max_length=255)
    licensee: str = Field(min_length=1, max_length=255)
    reg_no: str = Field(min_length=1, max_length=50)
    legal_type: str = Field(min_length=1, max_length=50)


class MedicineIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    category_id: int
    name_th: str = Field(min_length=1, max_length=150)
    dosage_form: str = Field(min_length=1, max_length=50)
    indications: str = Field(min_length=1)
    dosage_instructions: str = Field(min_length=1)
    warnings: List[str] = Field(default_factory=list)
    ingredient_ids: List[int] = Field(default_factory=list)


class IngredientIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name_en: str = Field(min_length=1, max_length=150)
    name_th: str = Field(min_length=1, max_length=150)
    aliases: List[str] = Field(default_factory=list)


# =====================================================
# Brand
# =====================================================

def _brand_dict(b: Brand, medicine_name: Optional[str] = None) -> dict:
    return {
        "id": b.id,
        "medicine_id": b.medicine_id,
        "medicine_name": medicine_name,
        "brand_name": b.brand_name,
        "licensee": b.licensee,
        "reg_no": b.reg_no,
        "legal_type": b.legal_type,
    }


def _clean_reg_no(reg_no: str) -> str:
    # "1a  844/39" -> "1A 844/39"
    return re.sub(r"\s+", " ", reg_no).strip().upper()


def _reg_no_taken(db: Session, reg_no: str, exclude_id: Optional[int] = None) -> bool:
    # เทียบแบบตัดช่องว่าง "1A844/39" กับ "1A 844/39" ถือว่าเป็นเลขเดียวกัน
    key = re.sub(r"\s+", "", reg_no).upper()
    query = db.query(Brand).filter(func.upper(func.replace(Brand.reg_no, " ", "")) == key)
    if exclude_id is not None:
        query = query.filter(Brand.id != exclude_id)
    return db.query(query.exists()).scalar()


def _get_medicine_or_400(db: Session, medicine_id: int) -> Medicine:
    medicine = db.get(Medicine, medicine_id)
    if medicine is None:
        raise HTTPException(status_code=400, detail=f"ไม่พบยารหัส {medicine_id}")
    return medicine


def _get_brand_or_404(db: Session, brand_id: int) -> Brand:
    brand = db.get(Brand, brand_id)
    if brand is None:
        raise HTTPException(status_code=404, detail="ไม่พบยี่ห้อนี้")
    return brand


@router.get("/brands")
def list_brands(db: Session = Depends(get_db)):
    rows = (
        db.query(Brand, Medicine.name_th)
        .outerjoin(Medicine, Brand.medicine_id == Medicine.id)
        .order_by(Brand.id)
        .all()
    )
    return [_brand_dict(b, name) for b, name in rows]


@router.get("/brands/{brand_id}")
def get_brand(brand_id: int, db: Session = Depends(get_db)):
    brand = _get_brand_or_404(db, brand_id)
    medicine = db.get(Medicine, brand.medicine_id) if brand.medicine_id else None
    return _brand_dict(brand, medicine.name_th if medicine else None)


@router.post("/brands", status_code=201)
def create_brand(data: BrandIn, db: Session = Depends(get_db)):
    medicine = _get_medicine_or_400(db, data.medicine_id)
    reg_no = _clean_reg_no(data.reg_no)
    if _reg_no_taken(db, reg_no):
        raise HTTPException(status_code=409, detail=f"เลขทะเบียน {reg_no} มีอยู่ในระบบแล้ว")

    brand = Brand(**data.model_dump(exclude={"reg_no"}), reg_no=reg_no)
    db.add(brand)
    db.commit()
    db.refresh(brand)
    return _brand_dict(brand, medicine.name_th)


@router.put("/brands/{brand_id}")
def update_brand(brand_id: int, data: BrandIn, db: Session = Depends(get_db)):
    brand = _get_brand_or_404(db, brand_id)
    medicine = _get_medicine_or_400(db, data.medicine_id)
    reg_no = _clean_reg_no(data.reg_no)
    if _reg_no_taken(db, reg_no, exclude_id=brand_id):
        raise HTTPException(status_code=409, detail=f"เลขทะเบียน {reg_no} มีอยู่ในระบบแล้ว")

    for field, value in data.model_dump(exclude={"reg_no"}).items():
        setattr(brand, field, value)
    brand.reg_no = reg_no
    db.commit()
    db.refresh(brand)
    return _brand_dict(brand, medicine.name_th)


@router.delete("/brands/{brand_id}", status_code=204)
def delete_brand(brand_id: int, db: Session = Depends(get_db)):
    brand = _get_brand_or_404(db, brand_id)
    db.delete(brand)
    db.commit()


# =====================================================
# Medicine
# =====================================================

def _medicine_dict(m: Medicine) -> dict:
    return {
        "id": m.id,
        "category_id": m.category_id,
        "category": m.category.name_th if m.category else None,
        "name_th": m.name_th,
        "dosage_form": m.dosage_form,
        "indications": m.indications,
        "dosage_instructions": m.dosage_instructions,
        "warnings": [w.warning_text for w in m.warnings],
        "ingredients": [
            {"id": mi.ingredient.id, "name_th": mi.ingredient.name_th, "name_en": mi.ingredient.name_en}
            for mi in m.medicine_ingredients
        ],
        "brand_count": len(m.brands),
    }


def _get_medicine_or_404(db: Session, medicine_id: int) -> Medicine:
    medicine = db.get(Medicine, medicine_id)
    if medicine is None:
        raise HTTPException(status_code=404, detail="ไม่พบข้อมูลยา")
    return medicine


def _apply_medicine(db: Session, m: Medicine, data: MedicineIn) -> None:
    if db.get(Category, data.category_id) is None:
        raise HTTPException(status_code=400, detail=f"ไม่พบหมวดหมู่รหัส {data.category_id}")

    # ตัด id ซ้ำ โดยคงลำดับเดิม
    ingredient_ids = list(dict.fromkeys(data.ingredient_ids))
    if ingredient_ids:
        found = {
            row[0]
            for row in db.query(ActiveIngredient.id).filter(ActiveIngredient.id.in_(ingredient_ids))
        }
        missing = [i for i in ingredient_ids if i not in found]
        if missing:
            raise HTTPException(status_code=400, detail=f"ไม่พบตัวยาสำคัญรหัส {missing}")

    m.category_id = data.category_id
    m.name_th = data.name_th
    m.dosage_form = data.dosage_form
    m.indications = data.indications
    m.dosage_instructions = data.dosage_instructions

    # แทนที่คำเตือนทั้งชุด (ข้ามบรรทัดว่าง)
    m.warnings = [Warning(warning_text=text) for text in data.warnings if text]

    # แทนที่ตัวยาสำคัญทั้งชุด เก็บแถวเดิมที่ยังอยู่ไว้ ไม่ลบแล้วสร้างใหม่
    existing = {mi.ingredient_id: mi for mi in m.medicine_ingredients}
    m.medicine_ingredients = [
        existing.get(i) or MedicineIngredient(ingredient_id=i) for i in ingredient_ids
    ]


@router.get("/medicines")
def list_medicines(db: Session = Depends(get_db)):
    medicines = db.query(Medicine).order_by(Medicine.id).all()
    return [
        {
            "id": m.id,
            "name_th": m.name_th,
            "category": m.category.name_th if m.category else None,
            "dosage_form": m.dosage_form,
            "brand_count": len(m.brands),
        }
        for m in medicines
    ]


@router.get("/medicines/{medicine_id}")
def get_medicine(medicine_id: int, db: Session = Depends(get_db)):
    return _medicine_dict(_get_medicine_or_404(db, medicine_id))


@router.post("/medicines", status_code=201)
def create_medicine(data: MedicineIn, db: Session = Depends(get_db)):
    medicine = Medicine()
    _apply_medicine(db, medicine, data)
    db.add(medicine)
    db.commit()
    db.refresh(medicine)
    return _medicine_dict(medicine)


@router.put("/medicines/{medicine_id}")
def update_medicine(medicine_id: int, data: MedicineIn, db: Session = Depends(get_db)):
    medicine = _get_medicine_or_404(db, medicine_id)
    _apply_medicine(db, medicine, data)
    db.commit()
    db.refresh(medicine)
    return _medicine_dict(medicine)


@router.delete("/medicines/{medicine_id}", status_code=204)
def delete_medicine(medicine_id: int, db: Session = Depends(get_db)):
    medicine = _get_medicine_or_404(db, medicine_id)
    if medicine.brands:
        raise HTTPException(
            status_code=409,
            detail=f"ยังมี {len(medicine.brands)} ยี่ห้อผูกกับยานี้อยู่ ต้องลบหรือย้ายยี่ห้อก่อน",
        )
    db.delete(medicine)
    db.commit()


# =====================================================
# Active ingredient + aliases
# =====================================================

def _ingredient_dict(i: ActiveIngredient, db: Session) -> dict:
    medicine_count = (
        db.query(MedicineIngredient).filter(MedicineIngredient.ingredient_id == i.id).count()
    )
    return {
        "id": i.id,
        "name_en": i.name_en,
        "name_th": i.name_th,
        "aliases": [a.alias_name for a in i.aliases],
        "medicine_count": medicine_count,
    }


def _get_ingredient_or_404(db: Session, ingredient_id: int) -> ActiveIngredient:
    ingredient = db.get(ActiveIngredient, ingredient_id)
    if ingredient is None:
        raise HTTPException(status_code=404, detail="ไม่พบตัวยาสำคัญ")
    return ingredient


def _apply_ingredient(db: Session, i: ActiveIngredient, data: IngredientIn) -> None:
    # ห้ามชื่ออังกฤษซ้ำ (ไม่สนตัวพิมพ์เล็กใหญ่)
    query = db.query(ActiveIngredient).filter(
        func.lower(ActiveIngredient.name_en) == data.name_en.lower()
    )
    if i.id is not None:
        query = query.filter(ActiveIngredient.id != i.id)
    if db.query(query.exists()).scalar():
        raise HTTPException(status_code=409, detail=f"มีตัวยา {data.name_en} อยู่ในระบบแล้ว")

    i.name_en = data.name_en
    i.name_th = data.name_th

    # ตัดชื่อซ้ำ (ไม่สนตัวพิมพ์) และบรรทัดว่าง โดยคงลำดับเดิม
    seen = set()
    alias_names = []
    for name in data.aliases:
        key = name.lower()
        if name and key not in seen:
            seen.add(key)
            alias_names.append(name)

    existing = {a.alias_name: a for a in i.aliases}
    i.aliases = [existing.get(n) or IngredientAlias(alias_name=n) for n in alias_names]


@router.get("/ingredients")
def list_ingredients(db: Session = Depends(get_db)):
    ingredients = db.query(ActiveIngredient).order_by(ActiveIngredient.id).all()
    return [_ingredient_dict(i, db) for i in ingredients]


@router.get("/ingredients/{ingredient_id}")
def get_ingredient(ingredient_id: int, db: Session = Depends(get_db)):
    return _ingredient_dict(_get_ingredient_or_404(db, ingredient_id), db)


@router.post("/ingredients", status_code=201)
def create_ingredient(data: IngredientIn, db: Session = Depends(get_db)):
    ingredient = ActiveIngredient()
    _apply_ingredient(db, ingredient, data)
    db.add(ingredient)
    db.commit()
    db.refresh(ingredient)
    return _ingredient_dict(ingredient, db)


@router.put("/ingredients/{ingredient_id}")
def update_ingredient(ingredient_id: int, data: IngredientIn, db: Session = Depends(get_db)):
    ingredient = _get_ingredient_or_404(db, ingredient_id)
    _apply_ingredient(db, ingredient, data)
    db.commit()
    db.refresh(ingredient)
    return _ingredient_dict(ingredient, db)


@router.delete("/ingredients/{ingredient_id}", status_code=204)
def delete_ingredient(ingredient_id: int, db: Session = Depends(get_db)):
    ingredient = _get_ingredient_or_404(db, ingredient_id)
    used = (
        db.query(MedicineIngredient).filter(MedicineIngredient.ingredient_id == ingredient_id).count()
    )
    if used:
        raise HTTPException(
            status_code=409,
            detail=f"ตัวยานี้ใช้อยู่ใน {used} ตำรับยา ต้องเอาออกจากยาเหล่านั้นก่อน",
        )
    db.delete(ingredient)
    db.commit()