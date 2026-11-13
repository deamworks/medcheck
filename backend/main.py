from dotenv import load_dotenv
from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text, or_
from google.cloud import vision
import os
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from models import Category, Medicine, Brand, ActiveIngredient, Warning, MedicineIngredient, AdminUser
from matcher import identify_medicine
from fda_api import verify_with_fda
from fastapi.security import OAuth2PasswordRequestForm
from auth import verify_password, create_access_token, get_current_admin
from admin_routes import router as admin_router
import logging
from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

logger = logging.getLogger("medcheck")


load_dotenv()

app = FastAPI()
vision_client = vision.ImageAnnotatorClient()

ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")
    if o.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
@app.exception_handler(IntegrityError)
async def handle_integrity_error(request: Request, exc: IntegrityError):
    logger.error("IntegrityError on %s %s", request.method, request.url.path, exc_info=exc)
    return JSONResponse(
        status_code=409,
        content={"detail": "บันทึกไม่ได้ ข้อมูลซ้ำหรืออ้างถึงข้อมูลที่ไม่มีในระบบ"},
    )


@app.exception_handler(SQLAlchemyError)
async def handle_db_error(request: Request, exc: SQLAlchemyError):
    logger.error("Database error on %s %s", request.method, request.url.path, exc_info=exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "ฐานข้อมูลขัดข้อง กรุณาลองใหม่อีกครั้ง"},
    )

app.include_router(admin_router)

def serialize_brand(b: Brand) -> dict:
    return {
        "id": b.id,
        "brand_name": b.brand_name,
        "licensee": b.licensee,
        "reg_no": b.reg_no,
        "legal_type": b.legal_type,
        "medicine_id": b.medicine_id,
    }


def serialize_medicine(medicine: Medicine) -> dict:
    return {
        "id": medicine.id,
        "name_th": medicine.name_th,
        "dosage_form": medicine.dosage_form,
        "indications": medicine.indications,
        "dosage_instructions": medicine.dosage_instructions,
        "category": medicine.category.name_th if medicine.category else None,
        "brands": [serialize_brand(b) for b in medicine.brands],
        "warnings": [w.warning_text for w in medicine.warnings],
        "active_ingredients": [
            {"name_th": mi.ingredient.name_th, "name_en": mi.ingredient.name_en}
            for mi in medicine.medicine_ingredients
        ],
    }

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

@app.get("/categories")
def list_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).order_by(Category.id).all()
    return [{"id": c.id, "name_th": c.name_th} for c in categories]

@app.get("/medicines/search")
def search_medicine(name: str, db: Session = Depends(get_db)):
    pattern = f"%{name}%"
    results = (
        db.query(Medicine)
        .outerjoin(Brand, Brand.medicine_id == Medicine.id)
        .filter(or_(Medicine.name_th.ilike(pattern), Brand.brand_name.ilike(pattern)))
        .distinct()
        .order_by(Medicine.id)
        .all()
    )

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
        raise HTTPException(status_code=404, detail="ไม่พบข้อมูลยา")
    return serialize_medicine(medicine)

@app.post("/scan")
def scan_label(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not (file.content_type or "").startswith("image/"):
        raise HTTPException(status_code=400, detail="กรุณาอัปโหลดไฟล์รูปภาพ")

    image_bytes = file.file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="ไฟล์รูปภาพว่างเปล่า")

    response = vision_client.text_detection(image=vision.Image(content=image_bytes))
    if response.error.message:
        raise HTTPException(status_code=502, detail="OCR ล้มเหลว: " + response.error.message)

    texts = response.text_annotations
    ocr_text = texts[0].description if texts else ""

    result = identify_medicine(ocr_text, db)
    match_type = result["match_type"]

    brand = None
    medicine = None
    candidates = []

    if match_type in ("reg_no", "brand_name"):
        b = result["brands"][0]
        brand = serialize_brand(b)
        med = db.query(Medicine).filter(Medicine.id == b.medicine_id).first()
        medicine = serialize_medicine(med) if med else None

    elif match_type == "active_ingredient":
        med_ids = {b.medicine_id for b in result["brands"]}
        med_names = {
            m.id: m.name_th
            for m in db.query(Medicine).filter(Medicine.id.in_(med_ids)).all()
        }
        candidates = [
            {**serialize_brand(b), "medicine_name": med_names.get(b.medicine_id)}
            for b in result["brands"]
        ]

    # การยืนยันกับ อย. แยกไปที่ GET /verify/{brand_id}
    # เพื่อไม่ให้ผู้ใช้ต้องรอ อย. (ซึ่งบางครั้งตอบช้า) ก่อนเห็นข้อมูลยา
    return {
        "match_type": match_type,
        "ocr_text": ocr_text,
        "ocr_reg_no": result["ocr_reg_no"],
        "brand": brand,
        "medicine": medicine,
        "candidates": candidates,
    }

@app.get("/verify/{brand_id}")
def verify_brand(brand_id: int, db: Session = Depends(get_db)):
    brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if brand is None:
        raise HTTPException(status_code=404, detail="ไม่พบยี่ห้อนี้ในระบบ")
    return verify_with_fda(brand.reg_no)


@app.post("/admin/login")
def admin_login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.username == form.username).first()
    if admin is None or not verify_password(form.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
    return {"access_token": create_access_token(admin), "token_type": "bearer"}


@app.get("/admin/me")
def admin_me(admin: AdminUser = Depends(get_current_admin)):
    return {"id": admin.id, "username": admin.username}


