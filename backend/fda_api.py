import json
import re
from typing import Optional

import requests

FDA_API_URL = "https://porta.fda.moph.go.th/FDA_SEARCH_CENTER_BACKEND/SEACH_ALL/GET_SEARCH"
ACTIVE_STATUS = "คงอยู่"


def _normalize(reg_no: Optional[str]) -> str:
    # ตัดช่องว่างทั้งหมด ใช้ตอนเทียบผล
    return re.sub(r"\s+", "", reg_no or "").upper()


def _format_for_search(reg_no: str) -> str:
    # "1A844/39" หรือ "1A  844 / 39" → "1A 844/39" (รูปแบบที่ระบบค้นหาของ อย. ต้องการ)
    compact = _normalize(reg_no)
    return re.sub(r"^(\d[A-Z])", r"\1 ", compact)


def verify_with_fda(reg_no: str) -> dict:
    reg_no = _format_for_search(reg_no)

    model = {
        "SEARCH_VALUE": reg_no,
        "RADIO_TYPE": "ผลิตภัณฑ์ทั้งหมด",
        "RADIO_TYPE_ETC_FOOD": None,
        "RADIO_TYPE_ETC_DRUG": None,
        "RADIO_TYPE_ETC_HERB": None,
        "RADIO_TYPE_ETC_TXC": None,
        "RADIO_TYPE_ETC_CMT": None,
        "RADIO_TYPE_ETC_NCT": None,
        "RADIO_TYPE_ETC_MDC": None,
        "RADIO_TYPE_ETC_ADVER": None,
        "RADIO_TYPE_LOCATION": None,
    }

    form_data = {
        "MODEL": json.dumps(model),
        "search_input": reg_no,
    }

    try:
        response = requests.post(FDA_API_URL, data=form_data, timeout=(5, 30))
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return {"ok": False, "found": False, "error": "เชื่อมต่อ อย. ไม่สำเร็จ: " + str(e)}

    try:
        data = response.json()
    except ValueError:
        return {"ok": False, "found": False, "error": "อย. ตอบกลับมาในรูปแบบที่ไม่ใช่ JSON"}

    if not isinstance(data, list):
        return {"ok": False, "found": False, "error": "รูปแบบข้อมูลจาก อย. ไม่ตรงกับที่คาดไว้"}

    key = _normalize(reg_no)
    record = next((r for r in data if _normalize(r.get("lcnno")) == key), None)

    if record is None:
        return {"ok": True, "found": False, "error": None}

    status = (record.get("cncnm") or "").strip()

    return {
        "ok": True,
        "found": True,
        "error": None,
        "reg_no": record.get("lcnno"),
        "status": status,
        "is_active": status == ACTIVE_STATUS,
        "product_name_th": record.get("productha"),
        "product_name_en": record.get("produceng"),
        "licensee": record.get("licen"),
        "product_type": record.get("typepro"),
        "detail_url": record.get("URLs_NEW"),
    }


if __name__ == "__main__":
    for test in ["1A 844/39", "1A844/39", "9Z 999/99"]:
        print("===", test, "===")
        print(json.dumps(verify_with_fda(test), ensure_ascii=False, indent=2))