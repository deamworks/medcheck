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


/*  โหลดข้อมูลยา  */

// ข้อมูลประกอบของกลุ่มอาการ · ไอคอน ชื่อย่อ คำอธิบาย และลำดับที่แสดง
// ฐานข้อมูลเก็บแค่ชื่อเต็ม ส่วนนี้เป็นของหน้าเว็บ จับคู่ด้วยชื่อเต็มของกลุ่ม
// ถ้ามีกลุ่มใหม่ในฐานข้อมูลที่ไม่มีในตารางนี้ จะใช้ชื่อเต็มกับไอคอนยาเป็นค่าสำรอง
const CAT_META = {
  'ยาแก้ปวดท้อง ท้องอืด ท้องขึ้น ท้องเฟ้อ (รวมยาลดกรด)': { order: 1, icon: 'stomach',
    short: 'ยาแก้ปวดท้อง ท้องอืด ท้องขึ้น ท้องเฟ้อ',
    desc: 'ยาลดกรดและยาขับลม สำหรับอาการปวดท้องจากกรดเกิน ท้องอืด ท้องขึ้น ท้องเฟ้อ จุกเสียดแน่นท้อง' },
  'ยาระบาย': { order: 2, icon: 'laxative', short: 'ยาระบาย',
    desc: 'ยาช่วยการขับถ่าย สำหรับอาการท้องผูก ถ่ายไม่ออก' },
  'ยาแก้ปวดลดไข้': { order: 3, icon: 'fever', short: 'ยาแก้ปวดลดไข้',
    desc: 'ยาบรรเทาอาการปวดและลดไข้ สำหรับอาการปวดศีรษะ ปวดเมื่อย และมีไข้' },
  'ยาแก้แพ้ลดน้ำมูก': { order: 4, icon: 'allergy', short: 'ยาแก้แพ้ลดน้ำมูก',
    desc: 'ยาบรรเทาอาการแพ้ ลมพิษ คัดจมูก และน้ำมูกไหล' },
  'ยาแก้ไอ ขับเสมหะ': { order: 5, icon: 'cough', short: 'ยาแก้ไอ ขับเสมหะ',
    desc: 'ยาบรรเทาอาการไอ และช่วยละลายหรือขับเสมหะ' },
  'ยาสำหรับโรคปากและลำคอ': { order: 6, icon: 'mouth', short: 'ยาสำหรับโรคปากและลำคอ',
    desc: 'ยาสำหรับอาการในช่องปากและลำคอ เช่น แผลในปาก เชื้อราในช่องปาก' },
};

// ฐานข้อมูลเก็บรูปแบบยาเป็นภาษาอังกฤษ แปลงเป็นภาษาไทยให้ผู้ใช้อ่าน
// ชื่อที่ไม่มีในตารางจะแสดงตามที่ฐานข้อมูลเก็บไว้
const FORM_TH = {
  'TABLET':'ยาเม็ด',
  'CHEWABLE TABLET':'ยาเม็ดเคี้ยว',
  'FILM COATED TABLET':'ยาเม็ดเคลือบฟิล์ม',
  'COATED TABLET':'ยาเม็ดเคลือบ',
  'EFFERVESCENT TABLET':'ยาเม็ดฟู่',
  'CAPSULE':'ยาแคปซูล',
  'POWDER':'ยาผง',
  'LOZENGE':'ยาอม',
  'SUSPENSION':'ยาน้ำแขวนตะกอน',
  'ORAL SUSPENSION':'ยาน้ำแขวนตะกอนสำหรับรับประทาน',
  'SOLUTION':'ยาน้ำใส',
  'ORAL SOLUTION':'ยาน้ำสำหรับรับประทาน',
  'SYRUP':'ยาน้ำเชื่อม',
  'EMULSION':'ยาน้ำนม',
  'GEL':'ยาเจล',
  'CREAM':'ยาครีม',
  'COMPRESSED TABLET':'ยาเม็ดอัด',
  'ELIXIR':'ยาน้ำใส (อิลิกเซอร์)',
  'ORAL LIQUID':'ยาน้ำสำหรับรับประทาน',
  'AQUEOUS SOLUTION':'สารละลายน้ำ',
  'OROMUCOSAL SOLUTION':'สารละลายสำหรับใช้ในช่องปาก',
  'ORAL POWDER':'ยาผงสำหรับรับประทาน',
  'TINCTURE':'ยาทิงเจอร์',
  'OINTMENT':'ยาขี้ผึ้ง',
};

// บางตำรับเก็บรูปแบบยาหลายแบบในช่องเดียว คั่นด้วย / แปลทีละส่วนแล้วต่อกลับ
const formThai = v => String(v || '').split('/').map(s => s.trim()).filter(Boolean)
  .map(s => FORM_TH[s.toUpperCase()] || s).join(' / ');

// คำที่บอกว่าเป็นยาน้ำ ใช้แยกว่าบรรจุขวดหรือบรรจุแผง เพราะฐานข้อมูลไม่มีช่องนี้
const RE_LIQUID = /SUSPENSION|SOLUTION|SYRUP|ELIXIR|EMULSION|DROP|LIQUID|TINCTURE|น้ำ|เชื่อม|แขวนตะกอน|หยด/i;

// คำที่ทำให้ถือว่าเป็นคำเตือนระดับห้ามใช้ เพราะฐานข้อมูลไม่มีช่องระดับความรุนแรง
// ใช้แค่เลือกไอคอนหน้าข้อความ ไม่ได้เปลี่ยนเนื้อคำเตือน
const RE_DANGER = /ห้าม|อันตราย|เป็นพิษ/;

// ที่มาของข้อมูล · ใช้ในหน้าเกี่ยวกับระบบ
const META = {
  sourceNote: 'รายการผลิตภัณฑ์และเลขทะเบียนตำรับยา ตรวจสอบยืนยันเป็นรายยี่ห้อกับฐานข้อมูลทะเบียนยาของ อย.',
  references: [
    { label: 'ประกาศกระทรวงสาธารณสุข เรื่อง ยาสามัญประจำบ้านแผนปัจจุบัน พ.ศ. 2568',
      url: 'https://drug.fda.moph.go.th/announcement-ministry/category/current-home-remedies' },
    { label: 'ระบบสืบค้นข้อมูลผลิตภัณฑ์ยา สำนักงานคณะกรรมการอาหารและยา (อย.)',
      url: 'https://pertento.fda.moph.go.th/fda_search_drug/SEARCH_DRUG/FRM_SEARCH_DRUG.aspx' },
    { label: 'ChumCheck ร้านชำปลอดภัย สำนักงานสาธารณสุขจังหวัดสมุทรสงคราม',
      url: 'https://fdasamutsongkhram.org/ChumCheck/index.php' },
  ],
};

// ข้อมูลชุดนี้มาจากไหน · 'api' หรือ 'file'
let dataSource = '';

// แยกข้อความหลายบรรทัดเป็นรายการ · ฐานข้อมูลเก็บข้อบ่งใช้เป็นข้อความก้อนเดียว
const lines = t => String(t || '').split('\n').map(x => x.trim()).filter(Boolean);

// เรียกข้อมูลจาก Backend
async function getJSON(path) {
  let res;
  try {
    res = await fetch(API_BASE + path);
  } catch (e) {
    throw new Error('เชื่อมต่อเซิร์ฟเวอร์ข้อมูลยาไม่ได้');
  }
  if (!res.ok) throw new Error('โหลดข้อมูลยาไม่สำเร็จ (รหัส ' + res.status + ')');
  return res.json();
}

// ประกอบข้อมูลทั้งหมดจากฐานข้อมูล ให้มีรูปร่างเดียวกับไฟล์ข้อมูลเดิม
// ส่วนที่เหลือของหน้าเว็บจึงไม่ต้องรู้ว่าข้อมูลมาจากไหน
async function loadFromApi() {
  const cats = await getJSON('/categories');

  // ยาในแต่ละกลุ่มอาการ · ยิงพร้อมกันไม่ให้รอต่อกันเป็นทอด ๆ
  const byCat = await Promise.all(cats.map(c =>
    getJSON('/medicines/by-category?category_id=' + encodeURIComponent(c.id))));

  // ข้อมูลเต็มของยาแต่ละตัว เพราะรายชื่อยี่ห้อ คำเตือน และตัวยาสำคัญอยู่ในนี้เท่านั้น
  const pairs = [];
  cats.forEach((c, i) => (byCat[i] || []).forEach(m => pairs.push([String(c.id), m.id])));
  const full = await Promise.all(pairs.map(x => getJSON('/medicines/' + x[1])));

  const categories = cats.map(c => {
    const meta = CAT_META[c.name_th] || {};
    return {
      id:    String(c.id),
      order: meta.order || 99,
      name:  c.name_th,
      short: meta.short || c.name_th,
      desc:  meta.desc || '',
      icon:  meta.icon || 'pill',
    };
  });

  const formulations = [];
  const brands = [];

  full.forEach((m, i) => {
    const cid    = pairs[i][0];
    const fid    = String(m.id);
    const ing    = m.active_ingredients || [];
    const pack   = RE_LIQUID.test(m.dosage_form || '') ? 'bottle' : 'blister';
    const formTh = formThai(m.dosage_form);

    formulations.push({
      id: fid,
      categoryId: cid,
      name: m.name_th,
      genericTh: ing.map(x => x.name_th).filter(Boolean).join(' + '),
      genericEn: ing.map(x => x.name_en).filter(Boolean).join(' + '),
      ingredients: ing.map(x => ({ name: x.name_en || x.name_th, strength: '' })),
      dosageForm: formTh,
      dosageFormEn: m.dosage_form || '',
      packaging: pack,
      indications: lines(m.indications),
      dosage: m.dosage_instructions || '',
      dosageAdult: '',
      warnings: (m.warnings || []).map(t =>
        ({ level: RE_DANGER.test(t) ? 'danger' : 'warn', text: t })),
    });

    (m.brands || []).forEach(b => brands.push({
      id: String(b.id),
      formulationId: fid,
      categoryId: cid,
      productName: b.brand_name,
      licensee: b.licensee,
      regNo: b.reg_no,
      legalType: b.legal_type,
      // ฐานข้อมูลยังไม่มีช่องสถานะทะเบียน สถานะจริงมาจาก /verify ตอนเปิดหน้าข้อมูลยา
      status: 'active',
      statusLabel: 'คงอยู่',
      dosageForm: formTh,
      dosageFormEn: m.dosage_form || '',
      packaging: pack,
      override: {},
    }));
  });

  dataSource = 'api';
  return { meta: META, categories: categories, formulations: formulations, brands: brands };
}

// อ่านจากไฟล์ข้อมูลในเครื่อง · ใช้เมื่อปิดสวิตช์ DATA_FROM_API ใน config.js
async function loadFromFile() {
  const res = await fetch('/data/drugs.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error('โหลดข้อมูลยาไม่สำเร็จ (รหัส ' + res.status + ')');
  const db = await res.json();
  dataSource = 'file';
  return db;
}

// โหลดข้อมูลยา
async function loadDB() {
  const useApi = typeof DATA_FROM_API !== 'undefined' ? DATA_FROM_API : false;
  DB = (useApi && API_BASE) ? await loadFromApi() : await loadFromFile();
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

const RE_THAI  = /[฀-๿]/;
const RE_LATIN = /[A-Za-z]/;

// แยกข้อความที่ปนสองภาษาออกเป็นส่วนไทยกับส่วนอังกฤษ
function splitLang(text) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  const lang = words.map(w => RE_THAI.test(w) ? 'th' : RE_LATIN.test(w) ? 'en' : '');
  let last = '';
  for (let i = 0; i < lang.length; i++) {
    if (lang[i]) last = lang[i]; else lang[i] = last;
  }
  for (let i = lang.length - 1; i >= 0; i--) {
    if (!lang[i]) lang[i] = lang[i + 1] || '';
  }
  const pick = k => words.filter((w, i) => lang[i] === k).join(' ').trim();
  return { th: pick('th'), en: pick('en') };
}

// ชื่อยาเฉพาะส่วนภาษาไทย
const thName = t => splitLang(t).th || String(t || '');

// ชื่อยาเฉพาะส่วนภาษาอังกฤษ
const enName = t => splitLang(t).en;

// รูปแบบยาเฉพาะภาษาไทย
const thForm = t => String(t || '').split('/').map(x => x.trim())
  .filter(x => x && RE_THAI.test(x))[0] || String(t || '');

// ชื่อตัวยาสำคัญภาษาไทย จับคู่ตามลำดับที่เขียนไว้ใน genericTh
function ingredientsTh(c) {
  const th = String(c.genericTh || '').split('+').map(x => x.trim()).filter(Boolean);
  const use = th.length === c.ingredients.length;
  return c.ingredients.map((ing, i) =>
    (use ? th[i] : ing.name) + (ing.strength ? ' ' + ing.strength : ''));
}

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

// ชนิดของยาตามรูปแบบบรรจุ · ชื่อสูตรตำรับเก็บเฉพาะชื่อตัวยา ชนิดอยู่ในช่องนี้
const formType = p => p === 'blister' ? 'ชนิดเม็ด' : 'ชนิดน้ำ';

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
