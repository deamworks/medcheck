# -*- coding: utf-8 -*-
"""สร้าง assets/cat-icons.svg จากไฟล์ไอคอนต้นฉบับใน assets/src

  python -I tools/make-cat-icons.py
  python -I tools/make-cat-icons.py "<โฟลเดอร์ที่เพิ่งส่งออกมา>"

วิธีใช้อย่างละเอียดอยู่ใน claude.md หัวข้อ ไอคอนกลุ่มอาการ อ่านก่อนแก้
"""
import io
import os
import re
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, 'assets', 'src')
OUT = os.path.join(ROOT, 'assets', 'cat-icons.svg')

# ชื่อไอคอนในเว็บ · ชื่อไฟล์ใน assets/src · คำสำคัญที่ใช้หาไฟล์
ICONS = [
    ('stomach',  'stomach.svg',    ['stomach']),
    ('laxative', 'intestine.svg',  ['intestine', 'laxative', 'bowel']),
    ('fever',    'fever.svg',      ['fever', 'thermometer']),
    ('allergy',  'runny-nose.svg', ['runnynose', 'allergy']),
    ('cough',    'cough.svg',      ['cough']),
    ('mouth',    'nose-neck.svg',  ['noseneck', 'throat', 'mouth']),
]

BOX = 24.0   # ขนาดกรอบ เท่ากับไอคอนอื่นในเว็บ
PAD = 0.6    # ที่ว่างรอบรูป


def numbers(text):
    return [float(v) for v in re.findall(r'-?\d*\.?\d+(?:[eE][-+]?\d+)?', text)]


def parse_path(d):
    """แปลง d ของ path เป็นรายการช่วงเส้น รองรับ M L C Z แบบพิกัดสัมบูรณ์"""
    segs = []
    cur = start = (0.0, 0.0)
    for cmd, body in re.findall(r'([MLCZmlcz])([^MLCZmlcz]*)', d):
        n = numbers(body)
        up = cmd.upper()
        if up == 'M':
            for i in range(0, len(n) - 1, 2):
                pt = (n[i], n[i + 1])
                if i == 0:
                    start = pt
                else:
                    segs.append(('L', cur, pt))
                cur = pt
        elif up == 'L':
            for i in range(0, len(n) - 1, 2):
                pt = (n[i], n[i + 1])
                segs.append(('L', cur, pt))
                cur = pt
        elif up == 'C':
            for i in range(0, len(n) - 5, 6):
                p1, p2, p3 = (n[i], n[i + 1]), (n[i + 2], n[i + 3]), (n[i + 4], n[i + 5])
                segs.append(('C', cur, p1, p2, p3))
                cur = p3
        elif up == 'Z':
            segs.append(('L', cur, start))
            cur = start
    return segs


def cubic_extent(a, b, c, d):
    """ค่าน้อยสุด-มากสุดของเส้นโค้งลูกบาศก์หนึ่งแกน รวมจุดหักเลี้ยวข้างใน"""
    vals = [a, d]
    qa = 3 * (-a + 3 * b - 3 * c + d)
    qb = 6 * (a - 2 * b + c)
    qc = 3 * (b - a)
    roots = []
    if abs(qa) < 1e-12:
        if abs(qb) > 1e-12:
            roots.append(-qc / qb)
    else:
        disc = qb * qb - 4 * qa * qc
        if disc >= 0:
            r = disc ** 0.5
            roots += [(-qb + r) / (2 * qa), (-qb - r) / (2 * qa)]
    for t in roots:
        if 0.0 < t < 1.0:
            u = 1 - t
            vals.append(u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d)
    return min(vals), max(vals)


def bbox(all_segs):
    xs, ys = [], []
    for s in all_segs:
        if s[0] == 'L':
            for p in s[1:]:
                xs.append(p[0])
                ys.append(p[1])
        else:
            p0, p1, p2, p3 = s[1], s[2], s[3], s[4]
            xs += list(cubic_extent(p0[0], p1[0], p2[0], p3[0]))
            ys += list(cubic_extent(p0[1], p1[1], p2[1], p3[1]))
    return min(xs), min(ys), max(xs), max(ys)


def fmt(v):
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('', '-0') else s


def emit(segs, sx, tx, ty):
    """เขียน d ใหม่หลังย่อและขยับ ตัดทศนิยมให้สั้นลง"""
    out = []
    prev_end = None
    for s in segs:
        p = lambda q: fmt(q[0] * sx + tx) + ' ' + fmt(q[1] * sx + ty)
        if s[0] == 'L':
            if prev_end != s[1]:
                out.append('M' + p(s[1]))
            out.append('L' + p(s[2]))
            prev_end = s[2]
        else:
            if prev_end != s[1]:
                out.append('M' + p(s[1]))
            out.append('C' + p(s[2]) + ' ' + p(s[3]) + ' ' + p(s[4]))
            prev_end = s[4]
    return ''.join(out)


def key(s):
    """ตัดสิ่งที่ไม่ใช่ตัวอักษรกับตัวเลขออก เพื่อเทียบชื่อไฟล์แบบหลวม ๆ"""
    return re.sub(r'[^a-z0-9]', '', s.lower())


def pull(folder):
    """คัดไฟล์ svg จากโฟลเดอร์ที่ระบุ มาใส่ assets/src · ข้ามไฟล์สีขาว"""
    if not os.path.isdir(folder):
        print('ไม่พบโฟลเดอร์ ' + folder)
        return False

    files = [f for f in os.listdir(folder) if f.lower().endswith('.svg')]
    moved = 0
    for name, fn, words in ICONS:
        hit = [f for f in files
               if 'white' not in key(f) and any(w in key(f) for w in words)]
        if len(hit) > 1:
            print('%-9s เจอหลายไฟล์ ไม่รู้จะเอาอันไหน · %s' % (name, ', '.join(hit)))
            return False
        if not hit:
            continue
        shutil.copyfile(os.path.join(folder, hit[0]), os.path.join(SRC, fn))
        print('คัดมา   %-9s ← %s' % (name, hit[0]))
        moved += 1

    if not moved:
        print('ไม่เจอไฟล์ที่ตรงกับไอคอนใดเลยในโฟลเดอร์นั้น')
        return False
    print('')
    return True


def main():
    if len(sys.argv) > 1 and not pull(sys.argv[1]):
        return 1

    parts = []
    for name, fn, _ in ICONS:
        path = os.path.join(SRC, fn)
        if not os.path.exists(path):
            print('ไม่พบไฟล์ต้นฉบับ ' + path)
            return 1
        raw = io.open(path, encoding='utf-8').read()
        body = re.sub(r'<defs>.*?</defs>', '', raw, flags=re.S)
        ds = re.findall(r'<path[^>]*\sd="([^"]*)"', body)
        if not ds:
            print('ไม่พบเส้นที่วาดจริงใน ' + fn)
            return 1

        paths = [parse_path(d) for d in ds]
        x0, y0, x1, y1 = bbox([s for p in paths for s in p])
        w, h = x1 - x0, y1 - y0
        sx = (BOX - 2 * PAD) / max(w, h)
        tx = (BOX - w * sx) / 2 - x0 * sx
        ty = (BOX - h * sx) / 2 - y0 * sx

        shapes = ''.join('<path d="' + emit(p, sx, tx, ty) + '"/>' for p in paths)
        parts.append('<symbol id="cat-' + name + '" viewBox="0 0 24 24">'
                     '<g fill="currentColor" stroke="none">' + shapes + '</g></symbol>')
        print('%-9s %2d เส้น · รูปจริง %.0fx%.0f · ย่อ %.4f' % (name, len(ds), w, h, sx))

    out = ('<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" '
           'aria-hidden="true" focusable="false" '
           'style="position:absolute;width:0;height:0;overflow:hidden">'
           '<!-- สร้างจาก assets/src ด้วย tools/make-cat-icons.py · อย่าแก้ไฟล์นี้ด้วยมือ -->'
           + ''.join(parts) + '</svg>\n')
    io.open(OUT, 'w', encoding='utf-8', newline='\n').write(out)
    print('เขียน ' + OUT + ' · ' + str(len(out)) + ' ตัวอักษร')
    return 0


if __name__ == '__main__':
    sys.exit(main())
