import getpass

from database import SessionLocal
from models import AdminUser
from auth import hash_password


def main():
    username = input("Username: ").strip()
    password = getpass.getpass("Password: ")
    confirm = getpass.getpass("ยืนยัน Password: ")

    if not 3 <= len(username) <= 50:
        print("username ต้องยาว 3–50 ตัวอักษร")
        return
    if len(password) < 8:
        print("password ต้องยาวอย่างน้อย 8 ตัวอักษร")
        return
    if len(password.encode("utf-8")) > 72:
        print("password ยาวเกินไป (สูงสุด 72 bytes)")
        return
    if password != confirm:
        print("password ไม่ตรงกัน")
        return

    db = SessionLocal()
    try:
        if db.query(AdminUser).filter(AdminUser.username == username).first():
            print("มี username นี้อยู่แล้ว")
            return
        db.add(AdminUser(username=username, password_hash=hash_password(password)))
        db.commit()
        print(f"สร้าง admin '{username}' เรียบร้อย")
    finally:
        db.close()


if __name__ == "__main__":
    main()