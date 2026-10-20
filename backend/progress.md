# สรุปความคืบหน้า — เว็บไซต์อ่านฉลากยาสามัญประจำบ้าน (Backend)

## สถานะโดยรวม
Flow หลักของระบบใช้งานได้ครบแล้ว: อัปโหลดภาพ → OCR → จับคู่ยา → แสดงข้อมูลยา →
ยืนยันสถานะกับ อย. แบบเรียลไทม์ ทดสอบกับฉลากจริง (TYLENOL 500) ผ่าน
โค้ดอยู่ใน repo deamworks/medcheck โฟลเดอร์ backend/

## Stack
- Backend: FastAPI (Python 3.9) + SQLAlchemy
- Database: Neon (PostgreSQL serverless)
- OCR: Google Cloud Vision API
- Dev tools: VS Code, Git/GitHub, DBeaver

## โครงสร้างไฟล์
```
medcheck/backend/
├── main.py         # endpoints + serialize helpers
├── matcher.py      # จับคู่ยาจาก OCR (reg_no / brand_name / out_of_scope / active_ingredient)
├── fda_api.py      # เรียก อย. API + แปลงผล
├── database.py
├── models.py
├── ocr_test.py
├── requirements.txt
├── venv/           # ไม่ขึ้น git (สร้างจาก /usr/bin/python3)
├── .env            # ไม่ขึ้น git
└── <credentials>.json  # ไม่ขึ้น git
```

## Endpoints
| Endpoint | หน้าที่ |
|---|---|
| `POST /scan` | รับภาพ → OCR → จับคู่ยา → คืนข้อมูลยาเต็มหรือรายการยี่ห้อให้เลือก |
| `GET /verify/{brand_id}` | ยืนยันสถานะทะเบียนกับ อย. (แยกจาก /scan เพราะ อย. ตอบช้าบางครั้ง) |
| `GET /medicines/{medicine_id}` | ข้อมูลยาเต็ม |
| `GET /medicines/search?name=...` | ค้นหาด้วยชื่อ |
| `GET /medicines/by-category?category_id=...` | ค้นหาด้วยหมวดหมู่ |
| `GET /`, `/test-db`, `/test-category`, `/test-all-tables` | ทดสอบระบบ |

## match_type ที่ /scan คืนกลับ
- `reg_no` / `brand_name` → มี `brand` + `medicine` → frontend เรียก /verify ต่อ
- `active_ingredient` → มี `candidates` ให้ผู้ใช้เลือก แล้วเรียก /verify หลังเลือก
- `out_of_scope` → อ่านเลขทะเบียนได้ แต่ไม่ใช่ยาในระบบ
- `not_found` → อ่านฉลากไม่ได้

## ผลทดสอบ
- matcher.py ผ่าน 6/6 เคส (รวมเลขทะเบียนไม่มีเว้นวรรค และเลขที่อยู่นอกระบบ)
- fda_api.py ผ่าน 3/3 เคส (มีเว้นวรรค / ไม่มีเว้นวรรค / ไม่มีในระบบ อย.)

## บั๊กและข้อค้นพบระหว่างทาง
- Python 3.9 ไม่รองรับ `str | None` → ใช้ `Optional[str]`
- เทียบชื่อยี่ห้อทั้งก้อนไม่เจอ → แตกคำย่อย, กรองตัวเลขล้วน, ความยาวขั้นต่ำ 5
- "พารา" ซ้อนกับ "พาราเซตามอล" → เพิ่มความยาวขั้นต่ำ
- เลขทะเบียนจาก OCR มี/ไม่มีเว้นวรรคไม่แน่นอน → ตัดช่องว่างก่อนเทียบ
- อย. ค้นหาด้วยเลขไม่มีเว้นวรรคไม่เจอ → จัดรูปเป็น "1A 844/39" ก่อนส่ง
- อย. API timeout เป็นบางครั้ง (แม้ 30 วินาที) → แยก /verify ออกจาก /scan
- เดิม /scan เป็น async แต่เรียกโค้ด blocking → เปลี่ยนเป็น def ธรรมดา
- เลขทะเบียนมักอยู่ด้านหลังแผงยา ต้องคำนึงถึงตอนออกแบบ UX การถ่ายภาพ
- ย้ายโค้ดจากโฟลเดอร์ medicine-scanner-backend (ไม่มี remote) เข้า medcheck/backend
  และสร้าง venv ใหม่ด้วย /usr/bin/python3 เพราะเครื่องไม่มีคำสั่ง python3.9

## งานถัดไป
1. เพิ่ม CORS + ตกลง API contract กับ frontend
2. เช็ค schema: ตาราง `ingredient_alias` ยังไม่มีใน models.py,
   admin_user ใช้ email หรือ username ให้ตรงกับรายงาน
3. Admin endpoints (login ด้วย JWT + CRUD) — ต้องเพิ่ม python-jose, passlib[bcrypt]
4. ทดสอบ OCR กับภาพจริงครบ 23 ยี่ห้อ (หน้า/หลัง, แผงพลาสติก/ฟอยล์) → ตารางบทที่ 4
5. Deploy: Cloud Run (Python 3.12, ผูก service account แทนไฟล์ key) + Vercel