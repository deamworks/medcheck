# CLAUDE.md

คำแนะนำสำหรับ Claude Code เวลาทำงานกับโค้ดในโฟลเดอร์นี้

## ภาพรวมโปรเจค

Backend ของ "เว็บไซต์อ่านฉลากยาสามัญประจำบ้าน" (OTC Medicine Label Scanning and
Safety Verification System) — ปริญญานิพนธ์ ทีม 2 คน

ผู้ใช้ถ่ายภาพฉลากยา ระบบอ่านด้วย OCR พยายามระบุเลขทะเบียนตำรับยา/ชื่อยี่ห้อ/
ชื่อตัวยาสำคัญ ยืนยันสถานะกับ อย. แบบเรียลไทม์ผ่าน API ค้นข้อมูลยาในฐานข้อมูล
ของระบบเอง แสดงผลให้ผู้ใช้ ไม่ต้องมีบัญชีผู้ใช้ทั่วไป มีแค่ Admin ที่ต้อง login
เพื่อจัดการข้อมูลยา

## คำสั่งที่ใช้บ่อย

source venv/bin/activate
uvicorn main:app --reload
python3 matcher.py
python3 ocr_test.py

เอกสาร API แบบ interactive เปิดที่ http://127.0.0.1:8000/docs

## สถาปัตยกรรม

- database.py — engine, session, get_db dependency สำหรับ FastAPI
- models.py — SQLAlchemy models ตรงกับ schema จริงใน Neon ทั้ง 7 ตาราง
- matcher.py — logic จับคู่ข้อความ OCR กับข้อมูลยาในฐานข้อมูล
- main.py — endpoint ทั้งหมด

## Database schema (7 ตาราง)

category (id, name_th)
medicine (id, category_id FK, name_th, dosage_form, indications, dosage_instructions)
brand (id, medicine_id FK, brand_name, licensee, reg_no, legal_type)
warning (id, medicine_id FK, warning_text)
active_ingredient (id, name_en, name_th)
medicine_ingredient (medicine_id FK, ingredient_id FK)
admin_user (id, email, password_hash, created_at) — แยกเดี่ยว ไม่มี FK เชื่อมตารางอื่น

ชื่อ column ทุกตัวเป็น snake_case ตรงกับฐานข้อมูลจริงเป๊ะ ห้ามเดาชื่อ column
ต้องเช็คใน models.py ก่อนเขียน query เสมอ

## Matching logic (matcher.py) — สำคัญมาก อย่าลดขั้นตอน

ระบบพยายามระบุตัวตนยาจากข้อความ OCR ตามลำดับความสำคัญ 3 ขั้น
1. extract_reg_no — regex หา pattern แบบ 1A 844/39
2. match_brand_name — ถ้าไม่เจอเลขทะเบียน ลองหาชื่อยี่ห้อแทน
3. match_active_ingredient — ถ้ายังไม่เจอ ลองหาชื่อตัวยาสำคัญ คืนหลายยี่ห้อได้

identify_medicine เป็นตัวรวม ลองทั้ง 3 ขั้นเรียงกัน หยุดที่เจอก่อน

กับดักที่เคยเจอมาแล้ว อย่าทำซ้ำ
- อย่าเทียบชื่อยี่ห้อแบบทั้งก้อน ชื่อจริงมีทั้งไทยและอังกฤษปนกัน ต้องแตกเป็นคำย่อยก่อนเทียบเสมอ
- กรองคำที่เป็นตัวเลขล้วนออกจากการเทียบชื่อยี่ห้อ ไม่งั้นเลขขนาดยาจะ false-match
- ตั้งความยาวคำขั้นต่ำที่ใช้เทียบไว้ที่ 5 ตัวอักษรขึ้นไป กันคำไทยซ้อนกันผิดพลาด
- Python ที่ใช้อยู่คือ 3.9 ห้ามใช้ syntax str pipe None ให้ใช้ Optional จาก typing แทนเสมอ

## อย. API (ยังไม่ได้ implement ใน backend แต่ทดสอบรูปแบบ request แล้วว่าใช้ได้จริง)

ต้องส่งเป็น Form Data ไม่ใช่ raw JSON body
Body ต้องมี 2 fields คือ MODEL (เป็น JSON-encoded string) และ search_input (plain text)
รองรับค้นหาด้วยเลขทะเบียนโดยตรง

## ความปลอดภัย

.env, venv/, ไฟล์ Google credentials .json ทั้งหมดถูกกันไว้ใน .gitignore แล้ว
ถ้าสร้างไฟล์ credentials หรือ secret ใหม่ ต้องเพิ่มเข้า .gitignore ทันทีก่อน commit ครั้งถัดไปเสมอ
