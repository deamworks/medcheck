import os
from dotenv import load_dotenv
from google.cloud import vision

load_dotenv()

client = vision.ImageAnnotatorClient()

def test_ocr(image_path):
    with open(image_path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.text_detection(image=image)

    if response.error.message:
        raise Exception(response.error.message)

    texts = response.text_annotations

    if texts:
        print("ข้อความที่อ่านได้ทั้งหมด:")
        print(texts[0].description)
    else:
        print("ไม่พบข้อความในภาพ")

test_ocr("test_label.jpg")