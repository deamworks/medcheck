// แปลงอักขระพิเศษให้ปลอดภัยก่อนต่อเป็น HTML
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const THAI_DIGITS   = '๐๑๒๓๔๕๖๗๘๙';
const RE_THAI_DIGIT = /[\u0E50-\u0E59]/g;
const RE_THAI_MARK  = /[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/g;

// เลขไทยเป็นเลขอารบิก
const toArabic = t => String(t || '').replace(RE_THAI_DIGIT, d => String(THAI_DIGITS.indexOf(d)));

// จัดรูปข้อความให้เทียบกันได้
const norm = t => toArabic(t).toLowerCase().replace(RE_THAI_MARK, '').replace(/[\s\-.,()/]+/g, '');

// จัดรูปเลขทะเบียนให้เทียบกันได้
const regKey = t => toArabic(t).toUpperCase().replace(/[^0-9A-Z/]/g, '');

let DB = null;

// โหลดข้อมูลยาจากไฟล์
async function loadDB() {
    const res = await  fetch('data/drugs.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('โหลดข้อมูลยาไม่สำเร็จ (รหัส ' + res.status + ')');
    DB = await res.json();
    return DB;
}

// ค้นรายการจาก id
const byId = (list, id) => list.find(x => x.id === id) || null;

// ข้อมูลกลุ่มอาการ
const cat = id => byId(DB.categories, id);

// ข้อมูลสูตรตำรับ
const form = id => byId(DB.formulations, id);

// ข้อมูลยี่ห้อ
const brand = id => byId(DB.brands, id);

// สูตรตำรับในกลุ่มอาการ
const formsOf = cid => DB.formulations.filter(f => f.categoryId === cid);

// ยี่ห้อในกลุ่มอาการ
const brandsInCat = cid => DB.brands.filter(b => b.categoryId === cid);

// ยี่ห้อที่ใช้สูตรตำรับเดียวกัน
const brandsOf = fid => DB.brands.filter(b => b.formulationId === fid);

const RE_REG_KEY = /\d[A-Z]\d{1,4}\/\d{2,4}/;

// ค้นยี่ห้อจากเลขทะเบียน
const brandByReg = reg => {
    const raw = regKey(reg);
    if (!raw) return null;
    const m = raw.match(RE_REG_KEY);
    const key = m ? m[0] : raw;
    return DB.brands.find(b => regKey(b.regNo) === key) || null;
};

// อ่านค่าจากที่เก็บข้อมูลในเบราว์เซอร์
function lsGet(key, fallback) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch (e) {
        return fallback;
    }
}

// เขียนค่าลงที่เก็บข้อมูลในเบราว์เซอร์
function lsSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        return false;
    }
}

// รวมข้อมูลสูตรตำรับกับข้อมูลเฉพาะยี่ห้อ
function content(b) {
    const f = form(b.formulationId) || {};
    const o = b.override || {};
    return {
        genericTh:   f.genericTh || '',
        genericEn:   f.genericEn || '',
        formName:    f.name || '',
        ingredients: f.ingredients || [],
        indications: o.indications || f.indications || [],
        dosage:      o.dosage || f.dosage || '',
        dosageAdult: o.dosageAdult || f.dosageAdult || '',
        warnings:    o.warnings || f.warnings || [],
        dosageForm:  f.dosageForm || '',
    };
}
