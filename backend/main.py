from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from models import Category, Medicine, Brand, ActiveIngredient, Warning, MedicineIngredient, AdminUser


app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, medicine scanner backend!"}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1"))
    return {"database_connected": True, "result": result.scalar()}

@app.get("/test-category")
def test_category(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return [{"id": c.id, "name_th": c.name_th} for c in categories]

@app.get("/test-all-tables")
def test_all_tables(db: Session = Depends(get_db)):
    return {
        "category_count": db.query(Category).count(),
        "medicine_count": db.query(Medicine).count(),
        "brand_count": db.query(Brand).count(),
        "active_ingredient_count": db.query(ActiveIngredient).count(),
        "warning_count": db.query(Warning).count(),
        "medicine_ingredient_count": db.query(MedicineIngredient).count(),
        "admin_user_count": db.query(AdminUser).count(),
    }

@app.get("/medicines/search")
def search_medicine(name: str, db: Session = Depends(get_db)):
    results = db.query(Medicine).filter(Medicine.name_th.ilike(f"%{name}%")).all()

    return [
        {
            "id": m.id,
            "name_th": m.name_th,
            "dosage_form": m.dosage_form,
            "indications": m.indications,
        }
        for m in results
    ]

@app.get("/medicines/by-category")
def search_by_category(category_id: int, db: Session = Depends(get_db)):
    results = db.query(Medicine).filter(Medicine.category_id == category_id).all()

    return [
        {
            "id": m.id,
            "name_th": m.name_th,
            "dosage_form": m.dosage_form,
            "indications": m.indications,
        }
        for m in results
    ]

@app.get("/medicines/{medicine_id}")
def get_medicine_detail(medicine_id: int, db: Session = Depends(get_db)):
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()

    if medicine is None:
        return {"error": "ไม่พบข้อมูลยา"}

    return {
        "id": medicine.id,
        "name_th": medicine.name_th,
        "dosage_form": medicine.dosage_form,
        "indications": medicine.indications,
        "dosage_instructions": medicine.dosage_instructions,
        "category": medicine.category.name_th,
        "brands": [
            {
                "brand_name": b.brand_name,
                "licensee": b.licensee,
                "reg_no": b.reg_no,
                "legal_type": b.legal_type,
            }
            for b in medicine.brands
        ],
        "warnings": [w.warning_text for w in medicine.warnings],
        "active_ingredients": [
            {
                "name_th": mi.ingredient.name_th,
                "name_en": mi.ingredient.name_en,
            }
            for mi in medicine.medicine_ingredients
        ],
    }

