# สรุปความคืบหน้า — เว็บไซต์อ่านฉลากยาสามัญประจำบ้าน (Backend)

## สถานะโดยรวม
Backend เริ่มจาก 0 จนถึงตอนนี้ใช้งานได้จริงหลายส่วน เชื่อมฐานข้อมูลจริง (Neon PostgreSQL)
และ Google Cloud Vision OCR สำเร็จแล้ว เหลือแค่ประกอบร่างเป็น endpoint หลัก `/scan`

## Stack ที่ใช้
- Backend: FastAPI (Python 3.9) + SQLAlchemy
- Database: Neon (PostgreSQL serverless)
- OCR: Google Cloud Vision API
- Dev tools: VS Code, Git, DBeaver

## โครงสร้างไฟล์ปัจจุบัน
```
medicine-scanner-backend/
├── venv/
├── main.py              # FastAPI app + endpoints
├── database.py           # การเชื่อมต่อฐานข้อมูล (SQLAlchemy engine, session)
├── models.py              # SQLAlchemy models ทั้ง 7 ตาราง + relationships
├── matcher.py             # Logic จับคู่ยาจากข้อความ OCR (3 ลำดับความสำคัญ)
├── ocr_test.py            # ไฟล์ทดสอบ Google Cloud Vision (แยกจาก main app)
├── .env                   # DATABASE_URL, GOOGLE_APPLICATION_CREDENTIALS (ไม่ push ขึ้น git)
├── .gitignore
└── <google-credentials>.json   # Service account key (ไม่ push ขึ้น git)
```

## Database — 7 ตาราง (ครบ ตรงกับ ER Diagram)
category, medicine, active_ingredient, medicine_ingredient, warning, brand, admin_user

โครงสร้างจริงอยู่ใน `models.py` — ทุกตารางมี relationship เชื่อมกันแล้ว
(เช่น `medicine.brands`, `medicine.warnings`, `medicine.category`,
`medicine.medicine_ingredients[].ingredient`)

## Endpoints ที่ทำงานได้จริงแล้ว
| Endpoint | หน้าที่ |
|---|---|
| `GET /` | ทดสอบเซิร์ฟเวอร์ |
| `GET /test-db` | ทดสอบเชื่อมต่อฐานข้อมูล |
| `GET /test-category` | ดึงหมวดหมู่ทั้งหมด (ทดสอบ model) |
| `GET /test-all-tables` | นับจำนวนแถวทุกตาราง (ทดสอบ model ทั้งหมด) |
| `GET /medicines/search?name=...` | ค้นหายาด้วยชื่อ (ilike) |
| `GET /medicines/by-category?category_id=...` | ค้นหายาด้วยหมวดหมู่กลุ่มอาการ |
| `GET /medicines/{medicine_id}` | ดึงข้อมูลยาแบบเต็ม (join ทุกตาราง) |

## matcher.py — Logic การจับคู่ยา (เขียนเสร็จ + ทดสอบผ่านแล้ว)
ลำดับความสำคัญ 3 ขั้น ตามที่ออกแบบไว้ใน DFD Level 2 Process 1:

1. **`extract_reg_no(ocr_text)`** — ใช้ regex หา pattern เลขทะเบียน (`1A 844/39` รูปแบบ)
2. **`match_brand_name(ocr_text, db)`** — แตกชื่อยี่ห้อเป็นคำย่อย เทียบกับ OCR text
   (กรองคำสั้น <5 ตัวอักษรและตัวเลขล้วนออก กัน false positive)
3. **`match_active_ingredient(ocr_text, db)`** — หาชื่อตัวยาสำคัญ คืนค่าเป็น list ของยาที่เป็นไปได้
   (เพราะตัวยาเดียวมีได้หลายยี่ห้อ)
4. **`identify_medicine(ocr_text, db)`** — ฟังก์ชันหลัก ลองทั้ง 3 วิธีตามลำดับ หยุดที่เจอก่อน
   คืนค่า `{match_type, reg_no, brands}` เสมอ

### บั๊กที่เจอและแก้ไปแล้วระหว่างทาง
- Python 3.9 ไม่รองรับ `str | None` syntax → ใช้ `Optional[str]` จาก `typing` แทน
- เทียบชื่อยี่ห้อแบบ "ทั้งก้อน" ไม่เจอ เพราะชื่อจริงมีทั้งไทย+อังกฤษปนกัน
  (เช่น "ไทลินอล 500 TYLENOL 500") → แก้เป็นแตกคำย่อยแล้วเทียบทีละคำ
- คำว่า "500" (ตัวเลขขนาดยา) ถูกจับเป็นตัวบ่งชี้ยี่ห้อผิดๆ → กรอง `.isdigit()` ออก
- คำว่า "พารา" ไปตรงกับ "พาราเซตามอล" (คำไทยไม่มีเว้นวรรค ซ้อนกันได้)
  → เพิ่มความยาวขั้นต่ำของคำที่ใช้เทียบจาก 3 เป็น 5 ตัวอักษร

## Google Cloud Vision — เชื่อมต่อสำเร็จ
- สร้าง Project, เปิด Vision API, ผูก Billing (ต้องใช้บัตรที่ไม่ใช่ prepaid — เคยติดปัญหานี้)
- สร้าง Service Account + JSON key เก็บไว้ในโฟลเดอร์โปรเจค (กันไว้ใน .gitignore แล้ว)
- ทดสอบกับภาพฉลากยาจริง (TYLENOL 500) อ่านเลขทะเบียน "1A 844/39" ได้แม่นยำ
- ข้อสังเกตสำคัญ: เลขทะเบียนมักอยู่ "อีกด้าน" ของแผงยา (ด้านที่มีตารางขนาดใช้/คำเตือน)
  ไม่ใช่ด้านหน้าที่มีแค่โลโก้ยี่ห้อ — ต้องคำนึงถึงตอนออกแบบ UX การถ่ายภาพ

## งานที่ค้างอยู่ (Next steps)
1. **สร้าง endpoint `/scan`** — endpoint หลักที่รวมทุกอย่าง:
   รับภาพอัปโหลด → ส่งเข้า Vision API OCR → เข้า `identify_medicine()` →
   ถ้าได้ยี่ห้อเดียวชัดเจน (reg_no/brand_name) → เชื่อมต่อ อย. API ยืนยันสถานะ →
   คืนข้อมูลยาเต็ม + สถานะยืนยันกลับไป
2. เชื่อมต่อ อย. API จริง (มีรูปแบบ request ที่ทดสอบไว้แล้วว่าใช้ได้ — POST แบบ Form Data
   พร้อม MODEL เป็น JSON string, ค้นด้วยเลขทะเบียนได้โดยตรง)
3. Endpoint สำหรับ Admin (login, CRUD ทั้ง 6 ตารางข้อมูลยา) — ยังไม่เริ่ม
4. Deploy: Google Cloud Run (backend) + Vercel (frontend) — ยังไม่เริ่ม

## Git
Commit เป็นระยะตลอดการทำงาน ใช้ `git log --oneline` ดูประวัติทั้งหมดได้
