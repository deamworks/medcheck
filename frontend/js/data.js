// ชั้นข้อมูล: โหลดไฟล์ยา หาข้อมูล จัดรูปข้อความให้ค้นได้

// กันข้อความจากไฟล์ข้อมูลกลายเป็นแท็ก HTML
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const THAI_DIGITS   = '๐๑๒๓๔๕๖๗๘๙';
const RE_THAI_DIGIT = /[\u0E50-\u0E59]/g;
const RE_THAI_MARK  = /[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/g;

// เลขไทย → เลขอารบิก
const toArabic = t => String(t || '').replace(RE_THAI_DIGIT, d => String(THAI_DIGITS.indexOf(d)));

// ทำให้ข้อความเทียบกันได้: ตัวเล็ก ตัดสระบน-ล่างและวรรณยุกต์ ตัดช่องว่างและเครื่องหมาย
const norm = t => toArabic(t).toLowerCase().replace(RE_THAI_MARK, '').replace(/[\s\-.,()/]+/g, '');

// รูปแบบเลขทะเบียน: ตัวใหญ่ · เหลือแค่ 0-9 A-Z และ /
const regKey = t => toArabic(t).toUpperCase().replace(/[^0-9A-Z/]/g, '');

// database

let DB = null;
async function loadDB() {
    const res = await  fetch('data/drugs.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('โหลดข้อมูลยาไม่สำเร็จ (รหัส ' + res.status + ')');
    DB = await res.json();
    return DB;
}

const byId = (list, id) => list.find(x => x.id === id) || null;
const cat = id => byId(DB.categories, id);
const form = id => byId(DB.formulations, id);
const brand = id => byId(DB.brands, id);
const formsOf = cid => DB.formulations.filter(f => f.categoryId === cid);
const brandsInCat = cid => DB.brands.filter(b => b.categoryId === cid);

// รวมข้อมูลสูตรตำรับกับข้อมูลเฉพาะยี่ห้อ — ถ้ายี่ห้อมี override ใช้ของยี่ห้อ
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