// หน้าจัดการข้อมูลยา · ต่อกับเส้นทาง /admin ของ Backend จริง
// ที่อยู่เซิร์ฟเวอร์อยู่ใน config.js ไฟล์เดียว ห้ามเขียนที่อยู่ซ้ำในไฟล์นี้

const ADMIN_API = API_BASE;

// เก็บบัตรผ่านไว้ใน sessionStorage ตามที่ฝั่งเซิร์ฟเวอร์แนะนำ
// ปิดแท็บแล้วหาย ปลอดภัยกว่า localStorage
const KEY_TOKEN = 'admin_token';

// ไอคอน · ชุดย่อยของหน้าเว็บหลัก หน้านี้โหลด app.js ไม่ได้เพราะจะไปเรียกหน้าที่ไม่มีอยู่
const P = {
  scan:'<path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16M3.5 12h17"/>',
  search:'<circle cx="11" cy="11" r="6.6"/><path d="M15.8 15.8 21 21"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  filter:'<path d="M4 5.6h16l-6.2 7.3v5.3l-3.6 2.2v-7.5L4 5.6Z"/>',
  home:'<path d="M4 10.4 12 4l8 6.4V19a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19v-8.6Z"/><path d="M9.6 20.6v-6.4h4.8v6.4"/>',
  pencil:'<path d="M4 20.2h4L18.4 9.8a2.83 2.83 0 1 0-4-4L4 16.2v4Z"/><path d="m13.5 6.7 4 4"/>',
  trash:'<path d="M4 7h16M9.5 7V4.8h5V7"/><path d="m6.6 7 .9 12.2a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4L17.4 7"/>',
  x:'<path d="m6 6 12 12M18 6 6 18"/>',
  alert:'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.6v5M12 16.2h.01"/>',
  warning:'<path d="M12 4.4 3 20h18L12 4.4Z"/><path d="M12 10.2v4.2M12 17.4h.01"/>',
  logout:'<path d="M15 8.2V5.6A1.6 1.6 0 0 0 13.4 4H6.6A1.6 1.6 0 0 0 5 5.6v12.8A1.6 1.6 0 0 0 6.6 20h6.8a1.6 1.6 0 0 0 1.6-1.6v-2.6"/><path d="M11 12h10m-3.4-3.4L21 12l-3.4 3.4"/>',
  lock:'<rect x="4.4" y="10.4" width="15.2" height="10.2" rx="2.2"/><path d="M8 10.4V8a4 4 0 0 1 8 0v2.4"/>',
  back:'<path d="M19.8 12H5.2m5-5-5 5 5 5"/>',
  refresh:'<path d="M4.4 12a7.6 7.6 0 0 1 13-5.4l2.4 2.4M19.8 4.6V9h-4.4"/><path d="M19.6 12a7.6 7.6 0 0 1-13 5.4L4.2 15M4.2 19.4V15h4.4"/>',
  db:'<ellipse cx="12" cy="6" rx="7" ry="2.9"/><path d="M5 6v12c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9V6"/><path d="M19 12c0 1.6-3.1 2.9-7 2.9S5 13.6 5 12"/>',
  pill:'<path d="M13.4 4.6a4.5 4.5 0 0 1 6 6l-8.8 8.8a4.5 4.5 0 0 1-6-6l8.8-8.8Z"/><path d="m8.2 9.8 6 6"/>',
  tag:'<path d="M4 10.4V5.2A1.2 1.2 0 0 1 5.2 4h5.2a1.2 1.2 0 0 1 .85.35l8 8a1.2 1.2 0 0 1 0 1.7l-5.2 5.2a1.2 1.2 0 0 1-1.7 0l-8-8A1.2 1.2 0 0 1 4 10.4Z"/><circle cx="8" cy="8" r="1.3"/>',
  eye:'<path d="M2.6 12S6.4 5.6 12 5.6 21.4 12 21.4 12 17.6 18.4 12 18.4 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3.1"/>',
  moon:'<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8 8.6 8.6 0 1 0 20.2 14.6Z"/>',
  sun:'<circle cx="12" cy="12" r="4.1"/><path d="M12 2.6v2.2M12 19.2v2.2M4.3 4.3l1.6 1.6M18.1 18.1l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.3 19.7l1.6-1.6M18.1 5.9l1.6-1.6"/>',
  caret:'<path d="m9.5 5 7 7-7 7"/>',
  clock:'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.2 1.9"/>',
  clipboard:'<path d="M9 4.6H7.2a1.8 1.8 0 0 0-1.8 1.8v12.4a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8V6.4a1.8 1.8 0 0 0-1.8-1.8H15"/><rect x="9" y="2.8" width="6" height="3.6" rx="1.2"/><path d="m8.8 12.4 1.8 1.8 3.6-3.8"/><path d="M8.8 17.2h6.4"/>',
  check:'<path d="m5 12.6 4.4 4.4L19 7.4"/>',
  flask:'<path d="M10 3.2h4M10.8 3.2v6.1L5.6 18a2 2 0 0 0 1.7 3h9.4a2 2 0 0 0 1.7-3l-5.2-8.7V3.2"/><path d="M8.2 14.4h7.6"/>',
};

// สร้างแท็ก svg ของไอคอน
function svg(n) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
       + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
       + (P[n] || P.alert) + '</svg>';
}

// ใส่ไอคอนให้อิลิเมนต์ที่มี data-ico
function paintIcons(root) {
  (root || document).querySelectorAll('[data-ico]').forEach(el => {
    if (el.dataset.icoDone) return;
    el.dataset.icoDone = '1';
    el.insertAdjacentHTML('afterbegin', svg(el.dataset.ico));
  });
}

const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

// กันข้อความกลายเป็นแท็ก HTML
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const RE_THAI  = /[฀-๿]/;
const RE_LATIN = /[A-Za-z]/;

// ตัดเอาเฉพาะส่วนภาษาไทยของชื่อยา ชุดเดียวกับที่หน้าเว็บหลักใช้
function thName(text) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  const lang = words.map(w => RE_THAI.test(w) ? 'th' : RE_LATIN.test(w) ? 'en' : '');
  let last = '';
  for (let i = 0; i < lang.length; i++) {
    if (lang[i]) last = lang[i]; else lang[i] = last;
  }
  for (let i = lang.length - 1; i >= 0; i--) {
    if (!lang[i]) lang[i] = lang[i + 1] || '';
  }
  const th = words.filter((w, i) => lang[i] === 'th').join(' ').trim();
  return th || String(text || '');
}

// ข้อความหลายบรรทัด <-> รายการ
// ฝั่งเซิร์ฟเวอร์เก็บข้อบ่งใช้เป็นข้อความก้อนเดียว หน้านี้ให้กรอกทีละข้อแล้วต่อด้วยขึ้นบรรทัดใหม่
const lines  = t => String(t || '').split('\n').map(s => s.trim()).filter(Boolean);
const unline = list => list.join('\n');


/*  ชั้นข้อมูล  */

let CATS   = [];    // หมวดอาการ [{id, name_th}]
let MEDS   = [];    // รายการยา [{id, name_th, category, dosage_form, brand_count}]
let BRANDS = [];    // ยี่ห้อทั้งหมด
let INGS   = [];    // ตัวยาสำคัญทั้งหมด
let MED    = null;  // ยาที่กำลังเปิดดู ข้อมูลเต็ม

const token = () => sessionStorage.getItem(KEY_TOKEN) || '';

// แปลง detail ของเซิร์ฟเวอร์เป็นข้อความที่แสดงให้ผู้ใช้อ่านได้
function detailText(data, status) {
  const d = data && data.detail;
  if (typeof d === 'string' && d.trim()) return d;
  if (status === 422) return 'กรอกข้อมูลไม่ครบหรือผิดรูปแบบ กรุณาตรวจอีกครั้ง';
  if (status === 404) return 'ไม่พบรายการนี้แล้ว อาจมีคนลบไปก่อนหน้า';
  return 'ทำรายการไม่สำเร็จ (รหัส ' + status + ')';
}

// เรียกเส้นทางของเซิร์ฟเวอร์พร้อมแนบบัตรผ่าน
async function api(path, opt) {
  const o = Object.assign({}, opt);
  o.headers = Object.assign({ Authorization: 'Bearer ' + token() }, o.headers || {});
  if (typeof o.body === 'string') o.headers['Content-Type'] = 'application/json';

  let res;
  try {
    res = await fetch(ADMIN_API + path, o);
  } catch (e) {
    throw new Error('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ตรวจอินเทอร์เน็ตแล้วลองใหม่');
  }

  // บัตรผ่านหมดอายุหรือไม่ถูกต้อง · พากลับไปหน้าเข้าสู่ระบบ
  if (res.status === 401) {
    sessionStorage.removeItem(KEY_TOKEN);
    backToLogin('หมดเวลาเข้าสู่ระบบแล้ว กรุณาเข้าสู่ระบบอีกครั้ง');
    throw new Error('กรุณาเข้าสู่ระบบใหม่');
  }
  if (res.status === 204) return null;

  let data = null;
  try { data = await res.json(); } catch (e) {}
  if (!res.ok) throw new Error(detailText(data, res.status));
  return data;
}

// ส่งข้อมูลแบบ JSON
const send = (path, method, body) =>
  api(path, { method: method, body: JSON.stringify(body) });

// โหลดข้อมูลทั้งหมดที่หน้านี้ใช้
async function loadAll() {
  const [cats, meds, brands, ings] = await Promise.all([
    api('/categories'),
    api('/admin/medicines'),
    api('/admin/brands'),
    api('/admin/ingredients'),
  ]);
  CATS = cats || [];
  MEDS = meds || [];
  BRANDS = brands || [];
  INGS = ings || [];
}

const medRow   = id => MEDS.find(m => m.id === id) || null;
const brandsOf = id => BRANDS.filter(b => b.medicine_id === id);
const catName  = id => { const c = CATS.find(x => String(x.id) === String(id)); return c ? c.name_th : ''; };

// ชื่อยี่ห้อที่ขายยาตัวนี้ เอาไว้โชว์ให้จำได้ง่าย
function brandNames(id, max) {
  const names = brandsOf(id).map(b => thName(b.brand_name));
  if (!names.length) return '';
  if (!max || names.length <= max) return names.join(' · ');
  return names.slice(0, max).join(' · ') + ' และอีก ' + (names.length - max);
}

// จำนวนยี่ห้อ · นับจากรายการยี่ห้อที่โหลดมาจริง
const brandCount = id => brandsOf(id).length;

// รูปแบบเลขทะเบียนที่เซิร์ฟเวอร์รับ เช่น 1A 844/39 · เซิร์ฟเวอร์จัดช่องว่างให้เองอีกชั้น
const RE_REGNO = /^\d[A-Za-z]\s?\d{1,4}\/\d{2,4}$/;


/*  โหมดสี  */

const prefersDark = matchMedia('(prefers-color-scheme: dark)');
const currentTheme = () => document.documentElement.dataset.theme
  || (prefersDark.matches ? 'dark' : 'light');

// ปรับปุ่มสลับโหมดสี
function syncThemeBtn() {
  const b = $('#themeBtn');
  if (!b) return;
  const dark = currentTheme() === 'dark';
  b.innerHTML = svg(dark ? 'sun' : 'moon');
  b.setAttribute('aria-label', dark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด');
}

// ตั้งโหมดสี
function setTheme(mode) {
  document.documentElement.dataset.theme = mode;
  try { localStorage.setItem('mc.theme', JSON.stringify(mode)); } catch (e) {}
  syncThemeBtn();
}


/*  ข้อความแจ้งผลและกล่องยืนยัน  */

let toastTimer = null;

// แจ้งผลชั่วคราวมุมล่างจอ
function toast(text, bad) {
  const t = $('#toast');
  t.textContent = text;
  t.classList.toggle('is-bad', !!bad);
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 3600);
}

// ถามยืนยันก่อนทำสิ่งที่ย้อนไม่ได้
function confirmBox(title, text, okLabel) {
  const d = $('#confirmBox');
  $('#confirmTitle').textContent = title;
  $('#confirmText').textContent = text;
  $('#confirmOk').textContent = okLabel || 'ลบรายการนี้';

  return new Promise(resolve => {
    const done = ok => {
      $('#confirmOk').removeEventListener('click', yes);
      $('#confirmNo').removeEventListener('click', no);
      d.removeEventListener('cancel', no);
      d.close();
      resolve(ok);
    };
    const yes = () => done(true);
    const no  = e => { if (e) e.preventDefault(); done(false); };

    $('#confirmOk').addEventListener('click', yes);
    $('#confirmNo').addEventListener('click', no);
    d.addEventListener('cancel', no);
    d.showModal();
  });
}


/*  เข้าสู่ระบบ  */

// แสดงข้อความผิดพลาดใต้ช่องกรอก
function fieldErr(input, errEl, msg) {
  input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  errEl.textContent = msg || '';
  errEl.hidden = !msg;
  return !msg;
}

// กลับไปหน้าเข้าสู่ระบบ พร้อมบอกเหตุผล
function backToLogin(msg) {
  $('#viewApp').hidden = true;
  $('#viewLogin').hidden = false;
  $('#adPass').value = '';
  const m = $('#loginMsg');
  if (msg) { m.textContent = msg; m.hidden = false; } else { m.hidden = true; }
  $('#adUser').focus();
}

// ตรวจและเข้าสู่ระบบกับเซิร์ฟเวอร์จริง
async function doLogin(e) {
  e.preventDefault();
  const u = $('#adUser'), p = $('#adPass');
  const msg = $('#loginMsg');
  msg.hidden = true;

  const okU = fieldErr(u, $('#adUserErr'), u.value.trim() ? '' : 'กรุณากรอกชื่อผู้ใช้');
  const okP = fieldErr(p, $('#adPassErr'), p.value ? '' : 'กรุณากรอกรหัสผ่าน');
  if (!okU || !okP) { (okU ? p : u).focus(); return; }

  const btn = $('#loginBtn');
  btn.disabled = true;
  btn.textContent = 'กำลังเข้าสู่ระบบ...';

  try {
    let res;
    try {
      res = await fetch(ADMIN_API + '/admin/login', {
        method: 'POST',
        body: new URLSearchParams({ username: u.value.trim(), password: p.value }),
      });
    } catch (err) {
      throw new Error('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ตรวจอินเทอร์เน็ตแล้วลองใหม่');
    }

    let data = null;
    try { data = await res.json(); } catch (err) {}
    if (!res.ok) throw new Error(detailText(data, res.status));

    sessionStorage.setItem(KEY_TOKEN, data.access_token);
    p.value = '';
    await openApp();
  } catch (err) {
    msg.textContent = err.message;
    msg.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = 'เข้าสู่ระบบ';
  }
}

// ออกจากระบบ · ทิ้งบัตรผ่านทันที
function doLogout() {
  sessionStorage.removeItem(KEY_TOKEN);
  MED = null;
  backToLogin('');
}


/*  โครงหน้าจัดการ  */

// หน้าแอดมินแก้ข้อมูลผ่านเส้นทาง /admin ของเซิร์ฟเวอร์โดยตรง
// สิ่งที่แก้ที่นี่มีผลกับผู้ใช้ทุกคนทันที ไม่มีขั้นตอนตรวจทานอัตโนมัติ

let view    = 'list';   // list = รายการยา · drug = หน้ายาหนึ่งตัว · wizard = เพิ่มยาใหม่ · ings = ตัวยาสำคัญ
let editing = '';       // การ์ดหรือแถวที่กำลังแก้อยู่ ว่างคือไม่ได้แก้อะไร
let query   = '';       // คำค้นในช่องค้นหา
let wiz     = null;     // ข้อมูลที่กรอกไว้ในตัวช่วยเพิ่มยาใหม่
let ingNew  = false;    // ในฟอร์มเพิ่มตัวยา กำลังเลือก "สร้างตัวยาใหม่" อยู่หรือไม่

// เปิดส่วนจัดการหลังเข้าสู่ระบบแล้ว
async function openApp() {
  $('#viewLogin').hidden = true;
  $('#viewApp').hidden = false;
  paintIcons();
  syncThemeBtn();
  skeleton();

  try {
    const me = await api('/admin/me');
    $('#whoami').textContent = me && me.username ? me.username : '';
    await loadAll();
  } catch (err) {
    if (!token()) return;   // หมดอายุ · จัดการให้แล้วใน api()
    failPanel(err.message);
    return;
  }

  view = 'list';
  MED = null;
  render();
}

// โครงร่างระหว่างรอข้อมูล
function skeleton() {
  $('#panel').innerHTML = '<div class="skel">' + '<i></i>'.repeat(6) + '</div>';
}

// แจ้งว่าโหลดไม่สำเร็จ พร้อมปุ่มลองใหม่
function failPanel(msg) {
  $('#panel').innerHTML =
    '<div class="state"><div class="state-ico is-warn">' + svg('alert') + '</div>' +
    '<h2>โหลดข้อมูลไม่สำเร็จ</h2><p>' + esc(msg) + '</p>' +
    '<div class="state-actions"><button class="btn btn-primary" type="button" id="retryBtn">' +
      svg('refresh') + 'ลองใหม่</button></div></div>';
  paintIcons($('#panel'));
  $('#retryBtn').addEventListener('click', openApp);
}

/*  ค่าคงที่และตัวช่วยของส่วนแสดงผล  */

// รูปแบบยาเป็นภาษาไทย · ฐานข้อมูลเก็บค่าเป็นภาษาอังกฤษ ชุดเดียวกับ data.js
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

// ฐานข้อมูลเก็บรูปแบบยาเป็นภาษาอังกฤษ และบางตำรับเก็บหลายแบบคั่นด้วย /
// แปลทีละส่วนแล้วต่อกลับ เพื่อให้หน้าแอดมินขึ้นชื่อไทยเสมอ ส่วนที่ไม่มีคำแปลคงไว้ตามเดิม
const formTh = v => String(v || '').split('/').map(s => s.trim()).filter(Boolean)
  .map(s => FORM_TH[s.toUpperCase()] || s).join(' / ');

// ตัวเลือกรูปแบบยา · รวมค่าที่มีอยู่จริงในฐานข้อมูลด้วย เผื่อมีค่านอกตาราง
function formOptions() {
  const seen = {};
  const out = [];
  Object.keys(FORM_TH).forEach(k => { seen[k] = 1; out.push([k, FORM_TH[k] + ' · ' + k]); });
  MEDS.forEach(m => {
    const k = String(m.dosage_form || '').toUpperCase().trim();
    if (k && !seen[k]) { seen[k] = 1; out.push([k, formTh(k) + ' · ' + k]); }
  });
  return out;
}

// เทียบเลขทะเบียนโดยไม่สนช่องว่างและตัวพิมพ์เล็กใหญ่
const regKey = t => String(t || '').toUpperCase().replace(/[^0-9A-Z/]/g, '');

// ชื่อหมวดหมู่แบบสั้น ตัดวงเล็บท้ายออก เพราะป้ายมีที่จำกัด
const shortCat = n => String(n || '').replace(/\s*\(.*?\)\s*/g, ' ').trim();

// ชื่อตัวยาสำคัญที่อ่านง่าย · ไทยก่อนเสมอ
const ingLabel = g => g ? (g.name_th || g.name_en) + (g.name_th && g.name_en ? ' · ' + g.name_en : '') : '';

// ชื่อยี่ห้อ · ขึ้นภาษาไทยก่อน ส่วนชื่อเต็มตามฉลากเก็บไว้เป็นบรรทัดรอง
const brandTh  = b => thName(b && b.brand_name);
const brandSub = b => {
  const full = String((b && b.brand_name) || '').trim();
  return brandTh(b) === full ? '' : full;
};


/*  ตัวช่วยสร้างฟอร์ม  */

// ช่องกรอกหนึ่งช่อง · ใช้ id แบบ fl-ชื่อ เพื่อให้ readForm กับ setErr หาเจอ
function field(name, label, value, hint) {
  return '<div class="field" data-fl="' + name + '">' +
    '<label for="fl-' + name + '">' + esc(label) + '</label>' +
    '<input id="fl-' + name + '" type="text" value="' + esc(value == null ? '' : value) + '" ' +
      'aria-describedby="fh-' + name + ' fe-' + name + '">' +
    (hint ? '<p class="hint" id="fh-' + name + '">' + esc(hint) + '</p>' : '') +
    '<p class="field-err" id="fe-' + name + '" hidden></p>' +
  '</div>';
}

// ช่องกรอกหลายบรรทัด
function fieldArea(name, label, value, hint, rows) {
  return '<div class="field" data-fl="' + name + '">' +
    '<label for="fl-' + name + '">' + esc(label) + '</label>' +
    '<textarea id="fl-' + name + '" rows="' + (rows || 5) + '" ' +
      'aria-describedby="fh-' + name + ' fe-' + name + '">' + esc(value == null ? '' : value) + '</textarea>' +
    (hint ? '<p class="hint" id="fh-' + name + '">' + esc(hint) + '</p>' : '') +
    '<p class="field-err" id="fe-' + name + '" hidden></p>' +
  '</div>';
}

// ช่องเลือกจากรายการ
function fieldSelect(name, label, value, options, hint) {
  return '<div class="field" data-fl="' + name + '">' +
    '<label for="fl-' + name + '">' + esc(label) + '</label>' +
    '<select id="fl-' + name + '" aria-describedby="fh-' + name + ' fe-' + name + '">' +
      '<option value="">— เลือก —</option>' +
      options.map(o => '<option value="' + esc(o[0]) + '"' +
        (String(o[0]) === String(value == null ? '' : value) ? ' selected' : '') + '>' +
        esc(o[1]) + '</option>').join('') +
    '</select>' +
    (hint ? '<p class="hint" id="fh-' + name + '">' + esc(hint) + '</p>' : '') +
    '<p class="field-err" id="fe-' + name + '" hidden></p>' +
  '</div>';
}

// ปุ่มบันทึกและยกเลิกท้ายฟอร์ม
function formAct(okLabel) {
  return '<p class="formmsg" id="adFormMsg" role="alert" hidden></p>' +
    '<div class="formact">' +
      '<button class="btn btn-primary" type="button" id="adSave">' + esc(okLabel || 'บันทึก') + '</button>' +
      '<button class="btn btn-soft" type="button" id="adCancel">ยกเลิก</button>' +
    '</div>';
}

const fv = name => { const el = $('#fl-' + name); return el ? String(el.value).trim() : ''; };

// อ่านค่าหลายช่องพร้อมกัน
function readForm(names) {
  const out = {};
  names.forEach(n => { out[n] = fv(n); });
  return out;
}

// แสดงหรือลบข้อความผิดพลาดใต้ช่องกรอก
function setErr(name, msg) {
  const box = $('[data-fl="' + name + '"]');
  const err = $('#fe-' + name);
  const inp = $('#fl-' + name);
  if (!err) return !msg;
  if (inp) inp.setAttribute('aria-invalid', msg ? 'true' : 'false');
  if (box) box.classList.toggle('is-bad', !!msg);
  err.textContent = msg || '';
  err.hidden = !msg;
  return !msg;
}

const req = (name, value, msg) => setErr(name, value ? '' : msg);

// พาไปที่ช่องแรกที่กรอกผิด
function focusBad() {
  const el = $('[aria-invalid="true"]');
  if (el) el.focus();
}

// ข้อความผิดพลาดรวมท้ายฟอร์ม
function showFormMsg(msg, good) {
  const m = $('#adFormMsg');
  if (!m) return;
  m.textContent = msg;
  m.classList.toggle('is-ok', !!good);
  m.hidden = false;
}

// ทำงานที่ต้องส่งเซิร์ฟเวอร์ แล้วปิดโหมดแก้ไขเมื่อสำเร็จ
async function apply(btn, work, okText) {
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'กำลังบันทึก...';
  try {
    await work();
  } catch (err) {
    if (!token()) return;
    showFormMsg(err.message);
    btn.disabled = false;
    btn.textContent = label;
    return;
  }
  editing = '';
  ingNew = false;
  toast(okText);
  render();
}


/*  โครงหน้าและการสลับหน้า  */

// วาดหน้าตามสถานะปัจจุบัน
function render() {
  if (view === 'wizard' && wiz) wizardPage();
  else if (view === 'drug' && MED) drugPage(MED);
  else if (view === 'ings') ingPage();
  else { view = 'list'; drugList(); }
  paintIcons($('#panel'));
}

// แถบสลับระหว่างรายการยากับตัวยาสำคัญ
function navBar(now) {
  const tab = (key, ico, label, n) =>
    '<button class="adtab" type="button" data-go="' + key + '" aria-pressed="' +
      (now === key ? 'true' : 'false') + '">' +
      '<span data-ico="' + ico + '" aria-hidden="true"></span>' + esc(label) +
      '<span class="tally">' + n + '</span></button>';
  return '<nav class="adtabs" aria-label="หมวดข้อมูลที่จัดการ">' +
    tab('list', 'pill', 'รายการยา', MEDS.length) +
    tab('ings', 'flask', 'ตัวยาสำคัญ', INGS.length) +
  '</nav>';
}

// ผูกปุ่มบนแถบสลับหน้า
function bindNav() {
  $$('#panel [data-go]').forEach(b => b.addEventListener('click', () => {
    const go = b.dataset.go;
    if (go === 'list') goList(); else { view = go; editing = ''; query = ''; render(); }
  }));
}

function goList() {
  wiz = null; MED = null;
  view = 'list'; editing = ''; query = '';
  render();
  window.scrollTo(0, 0);
}

// เปิดหน้ายาหนึ่งตัว · ต้องดึงข้อมูลเต็มจากเซิร์ฟเวอร์ก่อน เพราะรายการรวมไม่มีรายละเอียด
async function goDrug(id) {
  wiz = null; editing = ''; ingNew = false;
  view = 'drug';
  skeleton();
  window.scrollTo(0, 0);
  try {
    MED = await api('/admin/medicines/' + id);
  } catch (err) {
    if (!token()) return;
    toast(err.message, true);
    view = 'list';
    render();
    return;
  }
  render();
}

// ดึงข้อมูลยาที่เปิดอยู่ใหม่ หลังแก้ไขอะไรที่กระทบหลายการ์ด
async function reloadMed() {
  MED = await api('/admin/medicines/' + MED.id);
}


/*  หน้ารายการยา  */

function drugList() {
  const q = query.trim().toLowerCase();
  const qReg = regKey(query);
  const list = MEDS.filter(m => {
    if (!q) return true;
    const bs = brandsOf(m.id);
    const hay = (m.name_th + ' ' + (m.category || '') + ' ' +
      bs.map(b => b.brand_name + ' ' + b.licensee).join(' ')).toLowerCase();
    if (hay.includes(q)) return true;
    return qReg.length > 2 && bs.some(b => regKey(b.reg_no).includes(qReg));
  });

  $('#panel').innerHTML =
    navBar('list') +

    '<div class="adbar">' +
      '<span class="srch">' + svg('search') +
        '<input type="search" id="adQ" value="' + esc(query) + '" ' +
        'placeholder="ค้นหาชื่อยา ยี่ห้อ ผู้รับอนุญาต หรือเลขทะเบียน" aria-label="ค้นหายา">' +
      '</span>' +
      '<button class="btn btn-primary" type="button" id="adAdd">' +
        svg('plus') + 'เพิ่มยาใหม่</button>' +
      '<span class="count" id="adCount">' + list.length + ' จาก ' + MEDS.length + ' รายการ</span>' +
    '</div>' +

    (list.length
      ? '<div class="druglist">' + list.map(drugRow).join('') + '</div>'
      : '<div class="state"><div class="state-ico">' + svg('search') + '</div>' +
        '<h2>ไม่พบยาที่ค้นหา</h2><p>ลองเปลี่ยนคำค้น หรือดูรายการทั้งหมด</p></div>');

  $('#adAdd').addEventListener('click', wizStart);
  $('#adQ').addEventListener('input', e => {
    query = e.target.value;
    drugList();
    paintIcons($('#panel'));
    $('#adQ').focus();
    const el = $('#adQ');
    el.setSelectionRange(el.value.length, el.value.length);
  });
  $$('#panel .drugrow').forEach(b =>
    b.addEventListener('click', () => goDrug(+b.dataset.id)));
  bindNav();
}

// ยาหนึ่งตัวในรายการ
function drugRow(m) {
  const names = brandNames(m.id, 3);
  return '<button class="drugrow" type="button" data-id="' + m.id + '">' +
    '<span class="drugrow-ico">' + svg('pill') + '</span>' +
    '<span class="drugrow-b">' +
      '<b>' + esc(m.name_th) + '</b>' +
      (names ? '<span class="sub">' + esc(names) + '</span>' :
        '<span class="sub">ยังไม่มียี่ห้อในระบบ</span>') +
      '<span class="meta">' +
        '<span class="pill pill-red">' + esc(shortCat(m.category) || 'ยังไม่ระบุหมวด') + '</span>' +
        '<span class="tally">' + svg('box') + esc(formTh(m.dosage_form)) + '</span>' +
        '<span class="tally">' + svg('tag') + brandCount(m.id) + ' ยี่ห้อ</span>' +
      '</span>' +
    '</span>' +
    '<span class="drugrow-go">' + svg('caret') + '</span>' +
  '</button>';
}


/*  หน้ายาหนึ่งตัว · การ์ดละหนึ่งเรื่องตามตารางในฐานข้อมูล  */

function drugPage(m) {
  $('#panel').innerHTML =
    '<div class="drughead">' +
      '<button class="iconact" type="button" id="goBack" aria-label="กลับไปหน้ารายการ">' +
        svg('back') + '</button>' +
      '<div class="drughead-b">' +
        '<h2>' + esc(m.name_th) + '</h2>' +
        '<p>' + esc(shortCat(m.category) || catName(m.category_id)) + ' · ' +
          esc(formTh(m.dosage_form)) + ' · ' + brandCount(m.id) + ' ยี่ห้อ</p>' +
      '</div>' +
      '<button class="iconact is-danger" type="button" id="delMed" ' +
        'aria-label="ลบยานี้ทั้งรายการ">' + svg('trash') + '</button>' +
    '</div>' +

    cardInfo(m) + cardIng(m) + cardInd(m) + cardDose(m) + cardWarn(m) + cardBrands(m);

  $('#goBack').addEventListener('click', goList);
  $('#delMed').addEventListener('click', () => delMed(m));
  bindCards(m);
}

// หัวการ์ด พร้อมปุ่มแก้ไข · ระหว่างแก้การ์ดอื่น ปุ่มจะถูกซ่อนไว้กันกดพลาด
function cardTop(title, ico, key, label) {
  const busy = editing && editing !== key;
  return '<div class="card-top"><h3>' + svg(ico) + esc(title) + '</h3>' +
    (busy ? '' :
      '<button class="btn btn-soft btn-sm" type="button" data-edit="' + key + '">' +
        svg(editing === key ? 'x' : 'pencil') + (editing === key ? 'ยกเลิก' : esc(label || 'แก้ไข')) +
      '</button>') +
  '</div>';
}

// การ์ด 1 · ข้อมูลยา · ตาราง medicines ช่อง category_id, name_th, dosage_form
function cardInfo(m) {
  const on = editing === 'info';
  return '<section class="adcard' + (on ? ' is-edit' : '') + '">' +
    cardTop('ข้อมูลยา', 'pill', 'info') +
    (on
      ? fieldSelect('category_id', 'หมวดหมู่', m.category_id, CATS.map(c => [c.id, c.name_th]),
          'หมวดหมู่ตามประกาศยาสามัญประจำบ้านของ อย.') +
        field('name_th', 'ชื่อยา (ชื่อสูตรตำรับ)', m.name_th,
          'ชื่อกลางของสูตรตำรับ ไม่ใช่ชื่อการค้า เช่น ยาเม็ดพาราเซตามอล') +
        fieldSelect('dosage_form', 'รูปแบบยา', String(m.dosage_form || '').toUpperCase(),
          formOptions(), 'ฐานข้อมูลเก็บเป็นภาษาอังกฤษ หน้าเว็บผู้ใช้แปลเป็นไทยให้เอง') +
        formAct()
      : '<dl class="facts">' +
          fact('หมวดหมู่', m.category || catName(m.category_id)) +
          fact('ชื่อยา', m.name_th) +
          fact('รูปแบบยา', formTh(m.dosage_form) + ' (' + (m.dosage_form || '—') + ')') +
        '</dl>') +
  '</section>';
}

const fact = (k, v) => '<div><dt>' + esc(k) + '</dt><dd>' +
  (v ? esc(v) : '<span class="blank">ยังไม่มีข้อมูล</span>') + '</dd></div>';

// การ์ด 2 · ตัวยาสำคัญ · ตาราง ingredients ผูกกับยาผ่าน ingredient_ids
function cardIng(m) {
  const gs = m.ingredients || [];
  const adding = editing === 'ing-new';
  const left = INGS.filter(g => !gs.some(x => x.id === g.id));

  const rows = gs.map(g =>
    '<li class="subrow">' +
      '<span class="subrow-tx"><b>' + esc(g.name_th || g.name_en) + '</b>' +
        (g.name_en && g.name_th ? '<span class="sub">' + esc(g.name_en) + '</span>' : '') +
      '</span>' +
      (editing ? '' :
        '<span class="subrow-act">' +
          '<button class="iconact is-danger" type="button" data-ingdrop="' + g.id + '" ' +
            'aria-label="เอา ' + esc(g.name_th || g.name_en) + ' ออกจากยานี้">' + svg('trash') +
          '</button>' +
        '</span>') +
    '</li>').join('');

  return '<section class="adcard' + (adding ? ' is-edit' : '') + '">' +
    cardTop('ตัวยาสำคัญ', 'flask', 'ing-new', 'เพิ่มตัวยา') +
    (gs.length ? '<ul class="sublist mb-3">' + rows + '</ul>'
               : '<p class="blank mb-3">ยังไม่ได้ระบุตัวยาสำคัญ</p>') +
    (adding
      ? '<div class="wizadd">' +
          fieldSelect('ing_pick', 'เลือกตัวยา', ingNew ? '__new' : '',
            left.map(g => [g.id, ingLabel(g)]).concat([['__new', '+ สร้างตัวยาใหม่']]),
            'ตัวยาเก็บเป็นตารางกลาง ใช้ร่วมกันได้ทุกยา เลือกจากรายการก่อนเสมอ') +
          (ingNew
            ? '<div class="ingnew">' +
                field('name_th', 'ชื่อตัวยา (ไทย)', '', 'เช่น พาราเซตามอล') +
                field('name_en', 'ชื่อตัวยา (อังกฤษ)', '', 'เช่น Paracetamol') +
                field('aliases', 'ชื่อเรียกอื่น', '',
                  'คั่นด้วยเครื่องหมายจุลภาค ใช้ตอนอ่านฉลากให้จับคู่ได้แม่นขึ้น') +
              '</div>'
            : '') +
          formAct('เพิ่มตัวยานี้') +
        '</div>'
      : '') +
  '</section>';
}

// การ์ด 3 · ข้อบ่งใช้ · ตาราง medicines ช่อง indications เก็บเป็นข้อความก้อนเดียว
function cardInd(m) {
  const on = editing === 'ind';
  const items = lines(m.indications);
  return '<section class="adcard' + (on ? ' is-edit' : '') + '">' +
    cardTop('ข้อบ่งใช้และสรรพคุณ', 'clipboard', 'ind') +
    (on
      ? fieldArea('indications', 'ข้อบ่งใช้', m.indications,
          'ขึ้นบรรทัดใหม่เมื่อมีหลายข้อ หน้าเว็บผู้ใช้จะแสดงเป็นรายการให้เอง') + formAct()
      : (items.length
          ? '<ul class="bullets">' + items.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul>'
          : '<p class="blank">ยังไม่มีข้อบ่งใช้</p>')) +
  '</section>';
}

// การ์ด 4 · วิธีใช้ · ตาราง medicines ช่อง dosage_instructions
function cardDose(m) {
  const on = editing === 'dose';
  return '<section class="adcard' + (on ? ' is-edit' : '') + '">' +
    cardTop('วิธีใช้และขนาดรับประทาน', 'clock', 'dose') +
    (on
      ? fieldArea('dosage_instructions', 'วิธีใช้', m.dosage_instructions,
          'เขียนให้ครบทั้งผู้ใหญ่และเด็ก ตามที่ระบุบนฉลากยา') + formAct()
      : (m.dosage_instructions
          ? '<p class="runtx">' + esc(m.dosage_instructions) + '</p>'
          : '<p class="blank">ยังไม่มีวิธีใช้</p>')) +
  '</section>';
}

// การ์ด 5 · คำเตือน · ตาราง medicines ช่อง warnings เก็บเป็นรายการข้อความ
function cardWarn(m) {
  const ws = m.warnings || [];
  const adding = editing === 'warn-new';
  const editIdx = editing.indexOf('warn-') === 0 && editing !== 'warn-new'
    ? +editing.slice(5) : -1;

  const rows = ws.map((t, i) => editIdx === i
    ? '<li class="subrow is-edit">' +
        fieldArea('warn_text', 'ข้อความคำเตือน', t) + formAct() +
      '</li>'
    : '<li class="subrow">' +
        '<span class="subrow-tx">' + esc(t) + '</span>' +
        (editing ? '' :
          '<span class="subrow-act">' +
            '<button class="iconact" type="button" data-warnedit="' + i + '" ' +
              'aria-label="แก้ไขคำเตือนข้อที่ ' + (i + 1) + '">' + svg('pencil') + '</button>' +
            '<button class="iconact is-danger" type="button" data-warndrop="' + i + '" ' +
              'aria-label="ลบคำเตือนข้อที่ ' + (i + 1) + '">' + svg('trash') + '</button>' +
          '</span>') +
      '</li>').join('');

  return '<section class="adcard' + (adding ? ' is-edit' : '') + '">' +
    cardTop('คำเตือนและข้อควรระวัง', 'warning', 'warn-new', 'เพิ่มคำเตือน') +
    (ws.length ? '<ul class="sublist">' + rows + '</ul>'
               : '<p class="blank">ยังไม่มีคำเตือน</p>') +
    (adding
      ? '<div class="wizadd">' +
          fieldArea('warn_text', 'ข้อความคำเตือนข้อใหม่', '',
            'หนึ่งข้อต่อหนึ่งคำเตือน ถ้ามีหลายเรื่องให้แยกเป็นหลายข้อ', 3) +
          formAct('เพิ่มคำเตือนนี้') +
        '</div>'
      : '') +
  '</section>';
}

// การ์ด 6 · ยี่ห้อ · ตาราง brands ผูกกับยาผ่าน medicine_id
function cardBrands(m) {
  const bs = brandsOf(m.id);
  const adding = editing === 'brand-new';
  const editId = editing.indexOf('brand-') === 0 && editing !== 'brand-new'
    ? +editing.slice(6) : 0;

  const rows = bs.map(b => b.id === editId
    ? '<li class="subrow is-edit">' + brandForm(b) + '</li>'
    : '<li class="subrow">' +
        '<span class="subrow-tx"><b>' + esc(brandTh(b)) + '</b>' +
          (brandSub(b) ? '<span class="sub">' + esc(brandSub(b)) + '</span>' : '') +
          '<span class="sub">' + esc(b.licensee) + ' · ' + esc(b.legal_type) + '</span>' +
          '<span class="sub mono">เลขทะเบียน ' + esc(b.reg_no) + '</span>' +
        '</span>' +
        (editing ? '' :
          '<span class="subrow-act">' +
            '<button class="iconact" type="button" data-brandedit="' + b.id + '" ' +
              'aria-label="แก้ไข ' + esc(brandTh(b)) + '">' + svg('pencil') + '</button>' +
            '<button class="iconact is-danger" type="button" data-branddrop="' + b.id + '" ' +
              'aria-label="ลบ ' + esc(brandTh(b)) + '">' + svg('trash') + '</button>' +
          '</span>') +
      '</li>').join('');

  return '<section class="adcard' + (adding ? ' is-edit' : '') + '">' +
    cardTop('ยี่ห้อที่ขายยาตัวนี้', 'tag', 'brand-new', 'เพิ่มยี่ห้อ') +
    (bs.length ? '<ul class="sublist">' + rows + '</ul>'
               : '<p class="blank">ยังไม่มียี่ห้อ · ยาจะยังไม่ขึ้นในหน้าค้นหาของผู้ใช้</p>') +
    (adding ? '<div class="wizadd">' + brandForm(null) + '</div>' : '') +
  '</section>';
}

// ฟอร์มยี่ห้อ ใช้ทั้งตอนเพิ่มและตอนแก้
function brandForm(b) {
  return field('brand_name', 'ชื่อยี่ห้อ', b ? b.brand_name : '',
      'ตามที่พิมพ์บนฉลาก ใส่ได้ทั้งไทยและอังกฤษ') +
    '<div class="formgrid two">' +
      field('reg_no', 'เลขทะเบียนตำรับยา', b ? b.reg_no : '', 'รูปแบบ 1A 844/39') +
      field('legal_type', 'ประเภทตามกฎหมาย', b ? b.legal_type : 'ยาสามัญประจำบ้าน') +
    '</div>' +
    field('licensee', 'ผู้รับอนุญาต / ผู้ผลิต', b ? b.licensee : '') +
    formAct(b ? 'บันทึกยี่ห้อ' : 'เพิ่มยี่ห้อนี้');
}


/*  ผูกปุ่มในหน้ายาหนึ่งตัว  */

function bindCards(m) {
  $$('#panel [data-edit]').forEach(btn => btn.addEventListener('click', () => {
    const key = btn.dataset.edit;
    editing = editing === key ? '' : key;
    ingNew = false;
    render();
  }));

  $$('#panel [data-warnedit]').forEach(btn => btn.addEventListener('click', () => {
    editing = 'warn-' + btn.dataset.warnedit;
    render();
  }));
  $$('#panel [data-brandedit]').forEach(btn => btn.addEventListener('click', () => {
    editing = 'brand-' + btn.dataset.brandedit;
    render();
  }));

  $$('#panel [data-warndrop]').forEach(btn =>
    btn.addEventListener('click', () => delWarn(m, +btn.dataset.warndrop)));
  $$('#panel [data-branddrop]').forEach(btn =>
    btn.addEventListener('click', () => delBrand(+btn.dataset.branddrop)));
  $$('#panel [data-ingdrop]').forEach(btn =>
    btn.addEventListener('click', () => dropIng(m, +btn.dataset.ingdrop)));

  const pick = $('#fl-ing_pick');
  if (pick) pick.addEventListener('change', () => {
    const want = pick.value === '__new';
    if (want === ingNew) return;
    ingNew = want;
    render();
  });

  const save = $('#adSave');
  if (save) save.addEventListener('click', () => saveCard(save));
  const cancel = $('#adCancel');
  if (cancel) cancel.addEventListener('click', () => { editing = ''; ingNew = false; render(); });
}


/*  บันทึกแต่ละการ์ด  */

// ร่างข้อมูลยาทั้งก้อน · เซิร์ฟเวอร์ต้องการครบทุกช่องทุกครั้งที่แก้
function medBody(over) {
  return Object.assign({
    category_id: MED.category_id,
    name_th: MED.name_th,
    dosage_form: MED.dosage_form,
    indications: MED.indications,
    dosage_instructions: MED.dosage_instructions,
    warnings: MED.warnings || [],
    ingredient_ids: (MED.ingredients || []).map(g => g.id),
  }, over || {});
}

// ส่งแก้ไขยาแล้วเก็บผลลัพธ์กลับมา
async function saveMed(over) {
  const res = await send('/admin/medicines/' + MED.id, 'PUT', medBody(over));
  MED = res;
  const row = medRow(MED.id);
  if (row) {
    row.name_th = MED.name_th;
    row.category = MED.category || catName(MED.category_id);
    row.dosage_form = MED.dosage_form;
  }
}

function saveCard(btn) {
  // การ์ดข้อมูลยา
  if (editing === 'info') {
    const d = readForm(['category_id', 'name_th', 'dosage_form']);
    let ok = req('category_id', d.category_id, 'กรุณาเลือกหมวดหมู่');
    ok = req('name_th', d.name_th, 'กรุณากรอกชื่อยา') && ok;
    ok = req('dosage_form', d.dosage_form, 'กรุณาเลือกรูปแบบยา') && ok;
    if (!ok) return focusBad();
    return apply(btn, () => saveMed({
      category_id: +d.category_id, name_th: d.name_th, dosage_form: d.dosage_form,
    }), 'บันทึกข้อมูลยาแล้ว');
  }

  // การ์ดข้อบ่งใช้
  if (editing === 'ind') {
    const t = fv('indications');
    if (!req('indications', t, 'กรุณากรอกข้อบ่งใช้')) return focusBad();
    return apply(btn, () => saveMed({ indications: t }), 'บันทึกข้อบ่งใช้แล้ว');
  }

  // การ์ดวิธีใช้
  if (editing === 'dose') {
    const t = fv('dosage_instructions');
    if (!req('dosage_instructions', t, 'กรุณากรอกวิธีใช้')) return focusBad();
    return apply(btn, () => saveMed({ dosage_instructions: t }), 'บันทึกวิธีใช้แล้ว');
  }

  // การ์ดคำเตือน · เพิ่มข้อใหม่
  if (editing === 'warn-new') {
    const t = fv('warn_text');
    if (!req('warn_text', t, 'กรุณากรอกข้อความคำเตือน')) return focusBad();
    const next = (MED.warnings || []).concat([t]);
    return apply(btn, () => saveMed({ warnings: next }), 'เพิ่มคำเตือนแล้ว');
  }

  // การ์ดคำเตือน · แก้ข้อเดิม
  if (editing.indexOf('warn-') === 0) {
    const i = +editing.slice(5);
    const t = fv('warn_text');
    if (!req('warn_text', t, 'กรุณากรอกข้อความคำเตือน')) return focusBad();
    const next = (MED.warnings || []).slice();
    next[i] = t;
    return apply(btn, () => saveMed({ warnings: next }), 'บันทึกคำเตือนแล้ว');
  }

  // การ์ดตัวยาสำคัญ · เพิ่มตัวยา
  if (editing === 'ing-new') {
    const pick = fv('ing_pick');
    if (!req('ing_pick', pick, 'กรุณาเลือกตัวยาหรือสร้างใหม่')) return focusBad();

    if (pick !== '__new') {
      const ids = (MED.ingredients || []).map(g => g.id).concat([+pick]);
      return apply(btn, () => saveMed({ ingredient_ids: ids }), 'เพิ่มตัวยาสำคัญแล้ว');
    }

    const d = readForm(['name_th', 'name_en', 'aliases']);
    let ok = req('name_th', d.name_th, 'กรุณากรอกชื่อภาษาไทย');
    ok = req('name_en', d.name_en, 'กรุณากรอกชื่อภาษาอังกฤษ') && ok;
    if (ok && INGS.some(g => String(g.name_en).toLowerCase() === d.name_en.toLowerCase()))
      ok = setErr('name_en', 'ตัวยาชื่อนี้มีอยู่แล้ว เลือกจากรายการด้านบนแทน');
    if (!ok) return focusBad();

    return apply(btn, async () => {
      const made = await send('/admin/ingredients', 'POST', {
        name_th: d.name_th, name_en: d.name_en,
        aliases: d.aliases ? d.aliases.split(',').map(s => s.trim()).filter(Boolean) : [],
      });
      INGS.push(made);
      await saveMed({ ingredient_ids: (MED.ingredients || []).map(g => g.id).concat([made.id]) });
    }, 'สร้างตัวยาใหม่และเพิ่มให้ยานี้แล้ว');
  }

  // การ์ดยี่ห้อ · เพิ่มหรือแก้
  if (editing.indexOf('brand-') === 0) {
    const d = readForm(['brand_name', 'reg_no', 'legal_type', 'licensee']);
    let ok = req('brand_name', d.brand_name, 'กรุณากรอกชื่อยี่ห้อ');
    ok = req('legal_type', d.legal_type, 'กรุณากรอกประเภทตามกฎหมาย') && ok;
    ok = req('licensee', d.licensee, 'กรุณากรอกผู้รับอนุญาต') && ok;

    const id = editing === 'brand-new' ? 0 : +editing.slice(6);
    if (!d.reg_no) ok = req('reg_no', '', 'กรุณากรอกเลขทะเบียน') && ok;
    else if (!RE_REGNO.test(d.reg_no))
      ok = setErr('reg_no', 'รูปแบบไม่ถูกต้อง ตัวอย่างที่ถูกคือ 1A 844/39') && ok;
    else if (BRANDS.some(x => x.id !== id && regKey(x.reg_no) === regKey(d.reg_no)))
      ok = setErr('reg_no', 'เลขทะเบียนนี้มีอยู่ในระบบแล้ว') && ok;
    else setErr('reg_no', '');
    if (!ok) return focusBad();

    const b = id ? BRANDS.find(x => x.id === id) : null;
    return apply(btn, async () => {
      if (b) {
        const res = await send('/admin/brands/' + b.id, 'PUT',
          Object.assign({ medicine_id: b.medicine_id }, d));
        Object.assign(b, res);
      } else {
        const res = await send('/admin/brands', 'POST',
          Object.assign({ medicine_id: MED.id }, d));
        BRANDS.push(res);
        const row = medRow(MED.id);
        if (row) row.brand_count = brandCount(MED.id);
      }
    }, b ? 'บันทึกยี่ห้อแล้ว' : 'เพิ่มยี่ห้อแล้ว');
  }
}


/*  การลบ  */

// เอาตัวยาออกจากยานี้ · ตัวยายังอยู่ในตารางกลาง ยาตัวอื่นใช้ต่อได้
async function dropIng(m, id) {
  const g = INGS.find(x => x.id === id) || (m.ingredients || []).find(x => x.id === id);
  const ok = await confirmBox('เอาตัวยาออกจากยานี้',
    'จะเอา ' + (g ? (g.name_th || g.name_en) : 'ตัวยานี้') + ' ออกจาก ' + m.name_th +
    ' ตัวยายังอยู่ในระบบและยาตัวอื่นยังใช้ได้', 'เอาออก');
  if (!ok) return;
  try {
    await saveMed({ ingredient_ids: (MED.ingredients || []).map(x => x.id).filter(x => x !== id) });
  } catch (err) {
    if (token()) toast(err.message, true);
    return;
  }
  toast('เอาตัวยาออกแล้ว');
  render();
}

// ลบคำเตือนหนึ่งข้อ
async function delWarn(m, i) {
  const ws = m.warnings || [];
  const ok = await confirmBox('ลบคำเตือนข้อนี้',
    'จะลบ "' + String(ws[i] || '').slice(0, 60) + '" ออกจาก ' + m.name_th, 'ลบคำเตือน');
  if (!ok) return;
  try {
    await saveMed({ warnings: ws.filter((x, n) => n !== i) });
  } catch (err) {
    if (token()) toast(err.message, true);
    return;
  }
  toast('ลบคำเตือนแล้ว');
  render();
}

// ลบยี่ห้อ
async function delBrand(id) {
  const b = BRANDS.find(x => x.id === id);
  if (!b) return;
  const ok = await confirmBox('ลบยี่ห้อนี้',
    'จะลบ ' + brandTh(b) + ' เลขทะเบียน ' + b.reg_no +
    ' ออกจากฐานข้อมูลจริง ผู้ใช้จะไม่เห็นยี่ห้อนี้อีก และกู้คืนเองไม่ได้', 'ลบยี่ห้อ');
  if (!ok) return;
  try {
    await api('/admin/brands/' + id, { method: 'DELETE' });
  } catch (err) {
    if (token()) toast(err.message, true);
    return;
  }
  BRANDS = BRANDS.filter(x => x.id !== id);
  const row = medRow(MED.id);
  if (row) row.brand_count = brandCount(MED.id);
  toast('ลบยี่ห้อแล้ว');
  render();
}

// ลบยาทั้งรายการ · เซิร์ฟเวอร์ไม่ยอมถ้ายังมียี่ห้อค้างอยู่
async function delMed(m) {
  if (brandCount(m.id) > 0) {
    await confirmBox('ลบยานี้ไม่ได้',
      'ยานี้ยังมียี่ห้ออยู่ ' + brandCount(m.id) + ' ยี่ห้อ ต้องลบยี่ห้อให้หมดก่อน ' +
      'แล้วจึงลบตัวยาได้', 'เข้าใจแล้ว');
    return;
  }
  const ok = await confirmBox('ลบยานี้ออกจากระบบ',
    'จะลบ ' + m.name_th + ' พร้อมข้อบ่งใช้ วิธีใช้ และคำเตือนทั้งหมด ออกจากฐานข้อมูลจริง ' +
    'กู้คืนเองไม่ได้', 'ลบยานี้');
  if (!ok) return;
  try {
    await api('/admin/medicines/' + m.id, { method: 'DELETE' });
  } catch (err) {
    if (token()) toast(err.message, true);
    return;
  }
  MEDS = MEDS.filter(x => x.id !== m.id);
  toast('ลบ ' + m.name_th + ' แล้ว');
  goList();
}


/*  ตัวช่วยเพิ่มยาใหม่ · ทำตามลำดับที่ฐานข้อมูลต้องการ ตัวยา แล้วยา แล้วยี่ห้อ  */

const WIZ_STEPS = [
  ['ข้อมูลยา', 'pill'],
  ['ตัวยาสำคัญ', 'flask'],
  ['ข้อบ่งใช้', 'clipboard'],
  ['วิธีใช้', 'clock'],
  ['คำเตือน', 'warning'],
  ['ยี่ห้อ', 'tag'],
  ['ตรวจทาน', 'check'],
];

function wizStart() {
  wiz = {
    step: 0,
    med: { category_id: '', name_th: '', dosage_form: '', indications: '', dosage_instructions: '' },
    ingIds: [], newIngs: [], warnings: [], brands: [],
  };
  view = 'wizard';
  editing = '';
  ingNew = false;
  render();
  window.scrollTo(0, 0);
}

function wizardPage() {
  const s = wiz.step;

  $('#panel').innerHTML =
    '<div class="drughead">' +
      '<button class="iconact" type="button" id="wizQuit" aria-label="ออกจากการเพิ่มยาใหม่">' +
        svg('back') + '</button>' +
      '<div class="drughead-b"><h2>เพิ่มยาใหม่</h2>' +
        '<p>ขั้นที่ ' + (s + 1) + ' จาก ' + WIZ_STEPS.length + ' · ' + esc(WIZ_STEPS[s][0]) +
        ' · ยังไม่บันทึกจนกว่าจะกดในขั้นสุดท้าย</p></div>' +
    '</div>' +

    '<ol class="wizbar">' + WIZ_STEPS.map((x, i) =>
      '<li class="' + (i === s ? 'now' : i < s ? 'done' : '') + '">' +
        '<span class="dot">' + (i < s ? svg('check') : (i + 1)) + '</span>' + esc(x[0]) +
      '</li>').join('') + '</ol>' +

    '<section class="adcard">' + wizStepBody(s) + '</section>' +

    '<div class="wizact">' +
      (s > 0 ? '<button class="btn btn-soft" type="button" id="wizBack">ย้อนกลับ</button>' : '') +
      '<button class="btn btn-primary" type="button" id="wizNext">' +
        (s === WIZ_STEPS.length - 1 ? 'บันทึกยาใหม่' : 'ถัดไป') + '</button>' +
    '</div>' +
    '<p class="formmsg" id="adFormMsg" role="alert" hidden></p>';

  $('#wizQuit').addEventListener('click', wizQuit);
  if ($('#wizBack')) $('#wizBack').addEventListener('click', () => { wizRead(); wiz.step--; render(); });
  $('#wizNext').addEventListener('click', wizNext);
  bindWizExtras();
}

async function wizQuit() {
  const ok = await confirmBox('ออกจากการเพิ่มยาใหม่',
    'ข้อมูลที่กรอกไว้จะหายทั้งหมด เพราะยังไม่ได้บันทึกลงฐานข้อมูล', 'ออกโดยไม่บันทึก');
  if (ok) goList();
}

function wizStepBody(s) {
  const m = wiz.med;

  if (s === 0) {
    return '<h3 class="cardhd">ข้อมูลยา</h3>' +
      '<p class="hint mb-4">ส่วนนี้เก็บในตาราง medicines หนึ่งแถวคือหนึ่งสูตรตำรับ</p>' +
      fieldSelect('category_id', 'หมวดหมู่', m.category_id, CATS.map(c => [c.id, c.name_th])) +
      field('name_th', 'ชื่อยา (ชื่อสูตรตำรับ)', m.name_th,
        'ชื่อกลางของสูตร ไม่ใช่ชื่อการค้า เช่น ยาเม็ดพาราเซตามอล') +
      fieldSelect('dosage_form', 'รูปแบบยา', m.dosage_form, formOptions());
  }

  if (s === 1) {
    const picked = wiz.ingIds.map(id => INGS.find(g => g.id === id)).filter(Boolean)
      .map(g => ({ th: g.name_th || g.name_en, en: g.name_en, key: 'id:' + g.id }))
      .concat(wiz.newIngs.map((g, i) => ({ th: g.name_th, en: g.name_en + ' (ใหม่)', key: 'new:' + i })));
    const left = INGS.filter(g => wiz.ingIds.indexOf(g.id) < 0);

    return '<h3 class="cardhd">ตัวยาสำคัญ</h3>' +
      '<p class="hint mb-4">ตัวยาเก็บแยกในตาราง ingredients ใช้ร่วมกันได้หลายยา ' +
        'เลือกจากรายการก่อนเสมอ สร้างใหม่เฉพาะเมื่อไม่มีจริง ๆ</p>' +
      (picked.length
        ? '<ul class="sublist mb-3">' + picked.map(g =>
            '<li class="subrow"><span class="subrow-tx"><b>' + esc(g.th) + '</b>' +
              '<span class="sub">' + esc(g.en) + '</span></span>' +
            '<span class="subrow-act"><button class="iconact is-danger" type="button" ' +
              'data-wizdrop="' + g.key + '" aria-label="เอา ' + esc(g.th) + ' ออก">' +
              svg('trash') + '</button></span></li>').join('') + '</ul>'
        : '<p class="blank mb-3">ยังไม่ได้เลือกตัวยาสำคัญ</p>') +
      '<div class="wizadd">' +
        fieldSelect('ing_pick', 'เพิ่มตัวยา', ingNew ? '__new' : '',
          left.map(g => [g.id, ingLabel(g)]).concat([['__new', '+ สร้างตัวยาใหม่']])) +
        (ingNew
          ? '<div class="ingnew">' +
              field('name_th', 'ชื่อตัวยา (ไทย)', '') +
              field('name_en', 'ชื่อตัวยา (อังกฤษ)', '') +
              field('aliases', 'ชื่อเรียกอื่น', '', 'คั่นด้วยเครื่องหมายจุลภาค ไม่ใส่ก็ได้') +
            '</div>'
          : '') +
        '<button class="btn btn-soft" type="button" id="wizAddIng">เพิ่มตัวยานี้</button>' +
      '</div>';
  }

  if (s === 2) {
    return '<h3 class="cardhd">ข้อบ่งใช้และสรรพคุณ</h3>' +
      '<p class="hint mb-4">เก็บในช่อง indications ขึ้นบรรทัดใหม่เมื่อมีหลายข้อ</p>' +
      fieldArea('indications', 'ข้อบ่งใช้', m.indications);
  }

  if (s === 3) {
    return '<h3 class="cardhd">วิธีใช้และขนาดรับประทาน</h3>' +
      '<p class="hint mb-4">เก็บในช่อง dosage_instructions เขียนให้ครบทั้งผู้ใหญ่และเด็ก</p>' +
      fieldArea('dosage_instructions', 'วิธีใช้', m.dosage_instructions);
  }

  if (s === 4) {
    return '<h3 class="cardhd">คำเตือนและข้อควรระวัง</h3>' +
      '<p class="hint mb-4">เก็บในช่อง warnings เป็นรายการ หนึ่งข้อต่อหนึ่งคำเตือน ไม่มีก็ข้ามได้</p>' +
      (wiz.warnings.length
        ? '<ul class="sublist mb-3">' + wiz.warnings.map((t, i) =>
            '<li class="subrow"><span class="subrow-tx">' + esc(t) + '</span>' +
            '<span class="subrow-act"><button class="iconact is-danger" type="button" ' +
              'data-wizwarn="' + i + '" aria-label="ลบคำเตือนข้อที่ ' + (i + 1) + '">' +
              svg('trash') + '</button></span></li>').join('') + '</ul>'
        : '<p class="blank mb-3">ยังไม่มีคำเตือน</p>') +
      '<div class="wizadd">' +
        fieldArea('warn_text', 'คำเตือนข้อใหม่', '') +
        '<button class="btn btn-soft" type="button" id="wizAddWarn">เพิ่มคำเตือนนี้</button>' +
      '</div>';
  }

  if (s === 5) {
    return '<h3 class="cardhd">ยี่ห้อที่ขายยานี้</h3>' +
      '<p class="hint mb-4">เก็บในตาราง brands ต้องมีอย่างน้อยหนึ่งยี่ห้อ ' +
        'ไม่งั้นยาจะไม่ขึ้นในหน้าค้นหาของผู้ใช้</p>' +
      (wiz.brands.length
        ? '<ul class="sublist mb-3">' + wiz.brands.map((b, i) =>
            '<li class="subrow"><span class="subrow-tx"><b>' + esc(brandTh(b)) + '</b>' +
              '<span class="sub">' + esc(b.licensee) + '</span>' +
              '<span class="sub mono">เลขทะเบียน ' + esc(b.reg_no) + '</span></span>' +
            '<span class="subrow-act"><button class="iconact is-danger" type="button" ' +
              'data-wizbrand="' + i + '" aria-label="ลบ ' + esc(brandTh(b)) + '">' +
              svg('trash') + '</button></span></li>').join('') + '</ul>'
        : '<p class="blank mb-3">ยังไม่ได้เพิ่มยี่ห้อ</p>') +
      '<div class="wizadd">' +
        field('brand_name', 'ชื่อยี่ห้อ', '') +
        '<div class="formgrid two">' +
          field('reg_no', 'เลขทะเบียนตำรับยา', '', 'รูปแบบ 1A 844/39') +
          field('legal_type', 'ประเภทตามกฎหมาย', 'ยาสามัญประจำบ้าน') +
        '</div>' +
        field('licensee', 'ผู้รับอนุญาต / ผู้ผลิต', '') +
        '<button class="btn btn-soft" type="button" id="wizAddBrand">เพิ่มยี่ห้อนี้</button>' +
      '</div>';
  }

  // ขั้นตรวจทาน
  const ings = wiz.ingIds.map(id => {
    const g = INGS.find(x => x.id === id);
    return g ? (g.name_th || g.name_en) : '';
  }).concat(wiz.newIngs.map(g => g.name_th + ' (สร้างใหม่)')).filter(Boolean);

  return '<h3 class="cardhd">ตรวจทานก่อนบันทึก</h3>' +
    '<p class="hint mb-4">กดบันทึกแล้วข้อมูลจะขึ้นให้ผู้ใช้เห็นทันที ' +
      'ระบบจะสร้างตัวยาใหม่ก่อน แล้วสร้างยา แล้วจึงสร้างยี่ห้อ</p>' +
    '<dl class="facts">' +
      fact('หมวดหมู่', catName(m.category_id)) +
      fact('ชื่อยา', m.name_th) +
      fact('รูปแบบยา', formTh(m.dosage_form)) +
      fact('ตัวยาสำคัญ', ings.join(' · ')) +
      fact('ข้อบ่งใช้', m.indications) +
      fact('วิธีใช้', m.dosage_instructions) +
      fact('คำเตือน', wiz.warnings.length ? wiz.warnings.join('\n') : '') +
      fact('ยี่ห้อ', wiz.brands.map(b => brandTh(b) + ' (' + b.reg_no + ')').join('\n')) +
    '</dl>';
}

// เก็บค่าที่กรอกไว้ก่อนเปลี่ยนขั้น
function wizRead() {
  const s = wiz.step;
  const m = wiz.med;
  if (s === 0) {
    m.category_id = fv('category_id');
    m.name_th = fv('name_th');
    m.dosage_form = fv('dosage_form');
  }
  if (s === 2) m.indications = fv('indications');
  if (s === 3) m.dosage_instructions = fv('dosage_instructions');
}

function bindWizExtras() {
  const pick = $('#fl-ing_pick');
  if (pick) pick.addEventListener('change', () => {
    const want = pick.value === '__new';
    if (want === ingNew) return;
    ingNew = want;
    render();
  });

  const addIng = $('#wizAddIng');
  if (addIng) addIng.addEventListener('click', () => {
    const v = fv('ing_pick');
    if (!req('ing_pick', v, 'กรุณาเลือกตัวยาหรือสร้างใหม่')) return focusBad();
    if (v !== '__new') {
      wiz.ingIds.push(+v);
      ingNew = false;
      return render();
    }
    const d = readForm(['name_th', 'name_en', 'aliases']);
    let ok = req('name_th', d.name_th, 'กรุณากรอกชื่อภาษาไทย');
    ok = req('name_en', d.name_en, 'กรุณากรอกชื่อภาษาอังกฤษ') && ok;
    const key = d.name_en.toLowerCase();
    if (ok && (INGS.some(g => String(g.name_en).toLowerCase() === key)
            || wiz.newIngs.some(g => g.name_en.toLowerCase() === key)))
      ok = setErr('name_en', 'ตัวยาชื่อนี้มีอยู่แล้ว เลือกจากรายการแทน');
    if (!ok) return focusBad();
    wiz.newIngs.push({
      name_th: d.name_th, name_en: d.name_en,
      aliases: d.aliases ? d.aliases.split(',').map(s => s.trim()).filter(Boolean) : [],
    });
    ingNew = false;
    render();
  });

  $$('#panel [data-wizdrop]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.wizdrop.split(':');
    if (k[0] === 'id') wiz.ingIds = wiz.ingIds.filter(x => x !== +k[1]);
    else wiz.newIngs.splice(+k[1], 1);
    render();
  }));

  const addWarn = $('#wizAddWarn');
  if (addWarn) addWarn.addEventListener('click', () => {
    const t = fv('warn_text');
    if (!req('warn_text', t, 'กรุณากรอกข้อความคำเตือน')) return focusBad();
    wiz.warnings.push(t);
    render();
  });
  $$('#panel [data-wizwarn]').forEach(b => b.addEventListener('click', () => {
    wiz.warnings.splice(+b.dataset.wizwarn, 1);
    render();
  }));

  const addBrand = $('#wizAddBrand');
  if (addBrand) addBrand.addEventListener('click', () => {
    const d = readForm(['brand_name', 'reg_no', 'legal_type', 'licensee']);
    let ok = req('brand_name', d.brand_name, 'กรุณากรอกชื่อยี่ห้อ');
    ok = req('legal_type', d.legal_type, 'กรุณากรอกประเภทตามกฎหมาย') && ok;
    ok = req('licensee', d.licensee, 'กรุณากรอกผู้รับอนุญาต') && ok;
    if (!d.reg_no) ok = req('reg_no', '', 'กรุณากรอกเลขทะเบียน') && ok;
    else if (!RE_REGNO.test(d.reg_no))
      ok = setErr('reg_no', 'รูปแบบไม่ถูกต้อง ตัวอย่างที่ถูกคือ 1A 844/39') && ok;
    else if (BRANDS.some(x => regKey(x.reg_no) === regKey(d.reg_no))
          || wiz.brands.some(x => regKey(x.reg_no) === regKey(d.reg_no)))
      ok = setErr('reg_no', 'เลขทะเบียนนี้มีอยู่ในระบบแล้ว') && ok;
    else setErr('reg_no', '');
    if (!ok) return focusBad();
    wiz.brands.push(d);
    render();
  });
  $$('#panel [data-wizbrand]').forEach(b => b.addEventListener('click', () => {
    wiz.brands.splice(+b.dataset.wizbrand, 1);
    render();
  }));
}

// ตรวจความครบถ้วนของขั้นปัจจุบันแล้วไปขั้นถัดไป
function wizNext() {
  const s = wiz.step;
  wizRead();
  const m = wiz.med;

  if (s === 0) {
    let ok = req('category_id', m.category_id, 'กรุณาเลือกหมวดหมู่');
    ok = req('name_th', m.name_th, 'กรุณากรอกชื่อยา') && ok;
    ok = req('dosage_form', m.dosage_form, 'กรุณาเลือกรูปแบบยา') && ok;
    if (!ok) return focusBad();
  }
  if (s === 1 && !wiz.ingIds.length && !wiz.newIngs.length) {
    showFormMsg('กรุณาเพิ่มตัวยาสำคัญอย่างน้อยหนึ่งตัว');
    return;
  }
  if (s === 2 && !req('indications', m.indications, 'กรุณากรอกข้อบ่งใช้')) return focusBad();
  if (s === 3 && !req('dosage_instructions', m.dosage_instructions, 'กรุณากรอกวิธีใช้')) return focusBad();
  if (s === 5 && !wiz.brands.length) {
    showFormMsg('กรุณาเพิ่มยี่ห้ออย่างน้อยหนึ่งยี่ห้อ');
    return;
  }

  if (s < WIZ_STEPS.length - 1) {
    wiz.step++;
    ingNew = false;
    render();
    window.scrollTo(0, 0);
    return;
  }
  wizSave();
}

// บันทึกยาใหม่ · สร้างตัวยาใหม่ก่อน แล้วสร้างยา แล้วจึงสร้างยี่ห้อทีละตัว
async function wizSave() {
  const btn = $('#wizNext');
  btn.disabled = true;
  btn.textContent = 'กำลังบันทึก...';

  const m = wiz.med;
  const ids = wiz.ingIds.slice();

  try {
    for (const draft of wiz.newIngs) {
      const made = await send('/admin/ingredients', 'POST', draft);
      INGS.push(made);
      ids.push(made.id);
    }
    wiz.newIngs = [];
    wiz.ingIds = ids.slice();
  } catch (err) {
    if (!token()) return;
    showFormMsg('สร้างตัวยาสำคัญไม่สำเร็จ · ' + err.message);
    btn.disabled = false;
    btn.textContent = 'บันทึกยาใหม่';
    return;
  }

  let made;
  try {
    made = await send('/admin/medicines', 'POST', {
      category_id: +m.category_id,
      name_th: m.name_th,
      dosage_form: m.dosage_form,
      indications: m.indications,
      dosage_instructions: m.dosage_instructions,
      warnings: wiz.warnings,
      ingredient_ids: ids,
    });
  } catch (err) {
    if (!token()) return;
    showFormMsg('บันทึกยาไม่สำเร็จ · ' + err.message + ' (ตัวยาที่สร้างใหม่บันทึกไปแล้ว)');
    btn.disabled = false;
    btn.textContent = 'บันทึกยาใหม่';
    return;
  }

  MEDS.push({ id: made.id, name_th: made.name_th,
              category: made.category || catName(m.category_id),
              dosage_form: made.dosage_form, brand_count: 0 });

  const failed = [];
  for (const b of wiz.brands) {
    try {
      const nb = await send('/admin/brands', 'POST', Object.assign({ medicine_id: made.id }, b));
      BRANDS.push(nb);
    } catch (err) {
      if (!token()) return;
      failed.push(brandTh(b) + ' · ' + err.message);
    }
  }
  const row = medRow(made.id);
  if (row) row.brand_count = brandCount(made.id);

  wiz = null;
  if (failed.length) {
    toast('บันทึกยาแล้ว แต่มียี่ห้อที่เพิ่มไม่สำเร็จ', true);
  } else {
    toast('เพิ่ม ' + made.name_th + ' เรียบร้อยแล้ว');
  }
  goDrug(made.id);
}


/*  หน้าจัดการตัวยาสำคัญ · ตาราง ingredients ที่ทุกยาใช้ร่วมกัน  */

function ingPage() {
  const q = query.trim().toLowerCase();
  const list = INGS.filter(g => !q ||
    ((g.name_th || '') + ' ' + (g.name_en || '') + ' ' + (g.aliases || []).join(' '))
      .toLowerCase().includes(q));

  const usedBy = id => MEDS.filter(m => {
    const full = MED && MED.id === m.id ? MED : null;
    return full ? (full.ingredients || []).some(x => x.id === id) : false;
  }).length;

  $('#panel').innerHTML =
    navBar('ings') +
    '<div class="notice"><span data-ico="alert" aria-hidden="true"></span><div>' +
      '<h2>ตัวยาสำคัญใช้ร่วมกันทุกยา</h2>' +
      '<p>แก้ชื่อตัวยาที่นี่จะเปลี่ยนให้ทุกยาที่ใช้ตัวยานี้ ถ้าจะเอาตัวยาออกจากยาตัวใดตัวหนึ่ง ' +
      'ให้เข้าไปแก้ที่การ์ดตัวยาสำคัญในหน้ายาตัวนั้นแทน</p></div></div>' +

    '<div class="adbar">' +
      '<span class="srch">' + svg('search') +
        '<input type="search" id="adQ" value="' + esc(query) + '" ' +
        'placeholder="ค้นหาชื่อตัวยา" aria-label="ค้นหาตัวยาสำคัญ"></span>' +
      '<button class="btn btn-primary" type="button" data-edit="ing-add">' +
        svg('plus') + 'เพิ่มตัวยา</button>' +
      '<span class="count">' + list.length + ' จาก ' + INGS.length + ' ตัว</span>' +
    '</div>' +

    (editing === 'ing-add'
      ? '<section class="adcard is-edit">' +
          '<h3 class="cardhd">เพิ่มตัวยาสำคัญใหม่</h3>' +
          field('name_th', 'ชื่อตัวยา (ไทย)', '') +
          field('name_en', 'ชื่อตัวยา (อังกฤษ)', '') +
          field('aliases', 'ชื่อเรียกอื่น', '', 'คั่นด้วยเครื่องหมายจุลภาค ไม่ใส่ก็ได้') +
          formAct('เพิ่มตัวยา') +
        '</section>'
      : '') +

    '<ul class="sublist">' + list.map(g => editing === 'ing-' + g.id
      ? '<li class="subrow is-edit">' +
          field('name_th', 'ชื่อตัวยา (ไทย)', g.name_th) +
          field('name_en', 'ชื่อตัวยา (อังกฤษ)', g.name_en) +
          field('aliases', 'ชื่อเรียกอื่น', (g.aliases || []).join(', ')) +
          formAct('บันทึกตัวยา') +
        '</li>'
      : '<li class="subrow">' +
          '<span class="subrow-tx"><b>' + esc(g.name_th || g.name_en) + '</b>' +
            '<span class="sub">' + esc(g.name_en || '') + '</span>' +
            ((g.aliases || []).length
              ? '<span class="sub">เรียกอีกอย่างว่า ' + esc((g.aliases || []).join(', ')) + '</span>'
              : '') +
          '</span>' +
          (editing ? '' :
            '<span class="subrow-act">' +
              '<button class="iconact" type="button" data-ingedit="' + g.id + '" ' +
                'aria-label="แก้ไข ' + esc(g.name_th || g.name_en) + '">' + svg('pencil') + '</button>' +
            '</span>') +
        '</li>').join('') + '</ul>';

  $('#adQ').addEventListener('input', e => {
    query = e.target.value;
    ingPage();
    paintIcons($('#panel'));
    const el = $('#adQ');
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  });
  $$('#panel [data-edit]').forEach(b => b.addEventListener('click', () => {
    editing = editing === b.dataset.edit ? '' : b.dataset.edit;
    render();
  }));
  $$('#panel [data-ingedit]').forEach(b => b.addEventListener('click', () => {
    editing = 'ing-' + b.dataset.ingedit;
    render();
  }));
  const save = $('#adSave');
  if (save) save.addEventListener('click', () => saveIng(save));
  const cancel = $('#adCancel');
  if (cancel) cancel.addEventListener('click', () => { editing = ''; render(); });
  bindNav();
}

// บันทึกตัวยาสำคัญ ทั้งเพิ่มใหม่และแก้ของเดิม
function saveIng(btn) {
  const d = readForm(['name_th', 'name_en', 'aliases']);
  let ok = req('name_th', d.name_th, 'กรุณากรอกชื่อภาษาไทย');
  ok = req('name_en', d.name_en, 'กรุณากรอกชื่อภาษาอังกฤษ') && ok;

  const adding = editing === 'ing-add';
  const id = adding ? 0 : +editing.slice(4);
  const key = d.name_en.toLowerCase();
  if (ok && INGS.some(g => g.id !== id && String(g.name_en).toLowerCase() === key))
    ok = setErr('name_en', 'ตัวยาชื่อนี้มีอยู่แล้ว');
  if (!ok) return focusBad();

  const body = {
    name_th: d.name_th, name_en: d.name_en,
    aliases: d.aliases ? d.aliases.split(',').map(s => s.trim()).filter(Boolean) : [],
  };

  return apply(btn, async () => {
    if (adding) {
      INGS.push(await send('/admin/ingredients', 'POST', body));
    } else {
      const res = await send('/admin/ingredients/' + id, 'PUT', body);
      const g = INGS.find(x => x.id === id);
      if (g) Object.assign(g, res);
      if (MED) await reloadMed();
    }
  }, adding ? 'เพิ่มตัวยาแล้ว' : 'บันทึกตัวยาแล้ว');
}


/*  เริ่มทำงาน  */

paintIcons();
syncThemeBtn();

$('#loginForm').addEventListener('submit', doLogin);
$('#logoutBtn').addEventListener('click', doLogout);
$('#themeBtn').addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));

$('#adPassShow').addEventListener('click', () => {
  const p = $('#adPass'), b = $('#adPassShow');
  const show = p.type === 'password';
  p.type = show ? 'text' : 'password';
  b.setAttribute('aria-pressed', String(show));
  b.setAttribute('aria-label', show ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน');
});

// มีบัตรผ่านค้างอยู่ในแท็บนี้ก็ใช้ต่อได้เลย ถ้าหมดอายุ api() จะพากลับหน้าเข้าสู่ระบบเอง
if (token()) openApp();
else $('#adUser').focus();
