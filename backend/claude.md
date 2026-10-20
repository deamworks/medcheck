# CLAUDE.md

คำแนะนำสำหรับ Claude Code เวลาทำงานกับโค้ดในโฟลเดอร์นี้

## ภาพรวมโปรเจค

Backend ของ "เว็บไซต์อ่านฉลากยาสามัญประจำบ้าน" (OTC Medicine Label Reading Website)
— ปริญญานิพนธ์ ทีม 2 คน อยู่ใน repo deamworks/medcheck โฟลเดอร์ backend/
(frontend/ เป็นของเพื่อนร่วมทีม ห้ามแก้)

ผู้ใช้ถ่ายภาพฉลากยา → OCR → ระบุเลขทะเบียน/ชื่อยี่ห้อ/ตัวยาสำคัญ → ค้นข้อมูลยาใน
ฐานข้อมูลของระบบ → แสดงผลทันที → frontend เรียก /verify แยกเพื่อยืนยันสถานะกับ อย.
ไม่มีบัญชีผู้ใช้ทั่วไป มีแค่ Admin ที่ต้อง login

## คำสั่งที่ใช้บ่อย

```bash
cd ~/Desktop/OTC-OCR/medcheck/backend
source venv/bin/activate
uvicorn main:app --reload        # เปิด http://127.0.0.1:8000/docs
python matcher.py                # ทดสอบ matcher (6 เคส)
python fda_api.py                # ทดสอบ อย. API (3 เคส)
python ocr_test.py               # ทดสอบ OCR แยก
```

venv สร้างจาก `/usr/bin/python3` (Python 3.9.6 ของ macOS) — ห้ามใช้ `python3`
เปล่าๆ นอก venv เพราะจะไปเรียก 3.14

## สถาปัตยกรรม

- `database.py` — engine, session, `get_db()`
- `models.py` — SQLAlchemy models ตรงกับ schema ใน Neon
- `matcher.py` — จับคู่ข้อความ OCR กับฐานข้อมูล (ไม่พึ่ง FastAPI ทดสอบแยกได้)
- `fda_api.py` — เรียก อย. API และแปลงผลเป็นรูปแบบที่ใช้งานได้
- `main.py` — endpoint ทั้งหมด + `serialize_brand()` / `serialize_medicine()`

## Database schema

```
category (id, name_th)
    ↓ 1:N
medicine (id, category_id FK, name_th, dosage_form, indications, dosage_instructions)
    ↓ 1:N              ↓ 1:N                    ↓ M:N ผ่าน medicine_ingredient
brand              warning                  active_ingredient (id, name_en, name_th)
(id, medicine_id,  (id, medicine_id,
 brand_name,        warning_text)
 licensee, reg_no,
 legal_type)

admin_user (id, email, password_hash, created_at)
```

**ห้ามเดาชื่อ column ต้องเช็คใน models.py ก่อนเขียน query เสมอ**
ไม่เก็บสถานะทะเบียน (คงอยู่/ยกเลิก) ในฐานข้อมูล — ดึงสดจาก อย. ทุกครั้ง

## Matching logic (matcher.py) — อย่าลดขั้นตอน

`identify_medicine()` คืน `{match_type, ocr_reg_no, brands}` เสมอ ลำดับ:

1. `extract_reg_no()` หาเลขทะเบียน → เทียบกับ DB แบบตัดช่องว่างทั้งสองฝั่ง
   (`normalize_reg_no()` + `func.replace` ใน query) → `reg_no`
2. `match_brand_name()` → `brand_name`
3. ถ้าอ่านเลขทะเบียนได้แต่ไม่อยู่ใน DB และชื่อยี่ห้อไม่ตรง → `out_of_scope`
   (ไม่ไปขั้น 4 เพราะจะทำให้ยายี่ห้อนอกระบบไปโผล่เป็นยี่ห้อของเรา)
4. `match_active_ingredient()` → `active_ingredient` (คืนหลายยี่ห้อ)
5. ไม่เจอเลย → `not_found`

**กับดักที่เคยเจอ อย่าทำซ้ำ:**
- อย่าเทียบชื่อยี่ห้อทั้งก้อน — แตกเป็นคำย่อยก่อน (ชื่อจริงมีไทย+อังกฤษปน)
- กรองคำที่เป็นตัวเลขล้วนออก (เลขขนาดยา "500" จะ false-match)
- ความยาวคำขั้นต่ำ: ชื่อยี่ห้อ 5 ตัวอักษร, ชื่อตัวยาสำคัญ 4 ตัวอักษร (ตั้งใจให้ต่างกัน)
- เลขทะเบียนจาก OCR อาจมี/ไม่มีเว้นวรรค — ต้องตัดช่องว่างก่อนเทียบเสมอ
- Python 3.9 — ห้ามใช้ `str | None` ให้ใช้ `Optional[str]`

## อย. API (fda_api.py) — implement แล้ว

- `POST porta.fda.moph.go.th/FDA_SEARCH_CENTER_BACKEND/SEACH_ALL/GET_SEARCH`
- ส่งเป็น **Form Data** (`data=`) ไม่ใช่ `json=` มี 2 fields: `MODEL` (JSON string)
  และ `search_input`
- **ต้องส่งเลขทะเบียนแบบมีเว้นวรรค** (`1A 844/39`) — แบบไม่มีเว้นวรรคค้นไม่เจอ
  `_format_for_search()` จัดรูปให้อัตโนมัติ
- ผลกลับมาเป็น **list** — เลือกรายการที่ `lcnno` ตรงกัน (ใน `lcnno` ไม่มีเว้นวรรค)
- Field ที่ใช้: `cncnm` (สถานะ เช่น "คงอยู่"), `productha`, `produceng`, `licen`,
  `typepro`, `URLs_NEW` (ลิงก์หน้าข้อมูลทางการ)
- เซิร์ฟเวอร์ อย. ตอบช้า/timeout เป็นบางครั้ง → timeout `(5, 30)` และ**ห้ามเรียก อย.
  ใน /scan** ให้ frontend เรียก /verify แยก
- ยืนยันกับ อย. ด้วย reg_no จากฐานข้อมูลเท่านั้น (ฐานข้อมูลเป็นตัวกรองขอบเขต)

`verify_with_fda()` คืน: `ok` (เรียกสำเร็จไหม), `found` (เจอทะเบียนไหม),
`is_active`, `status`, `error` + ข้อมูลผลิตภัณฑ์เมื่อ found

## Endpoints หลัก

- `POST /scan` → `{match_type, ocr_text, ocr_reg_no, brand, medicine, candidates}`
- `GET /verify/{brand_id}` → ผลจาก `verify_with_fda()`
- `GET /medicines/{id}`, `/medicines/search`, `/medicines/by-category`
- Error ใช้ HTTPException (400/404/502) ไม่คืน `{"error": ...}` ด้วย status 200

## ความปลอดภัย

repo เป็น **public** — `.env`, `venv/`, ไฟล์ Google credentials `.json`,
`.DS_Store` ต้องอยู่ใน `.gitignore` ใช้ `git add <ไฟล์>` ระบุชื่อ ห้าม `git add .`
และเช็ค `git status` ก่อน commit ทุกครั้ง