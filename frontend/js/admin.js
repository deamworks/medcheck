// หน้าจัดการข้อมูลยา · ต่อกับเส้นทาง /admin ของ Backend

const ADMIN_API = API_BASE;

// บัตรผ่านเก็บใน sessionStorage
const KEY_TOKEN = 'admin_token';

// ไอคอนของหน้านี้
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
  fwd:'<path d="M4.2 12h14.6m-5-5 5 5-5 5"/>',
  back:'<path d="M19.8 12H5.2m5-5-5 5 5 5"/>',
  refresh:'<path d="M4.4 12a7.6 7.6 0 0 1 13-5.4l2.4 2.4M19.8 4.6V9h-4.4"/><path d="M19.6 12a7.6 7.6 0 0 1-13 5.4L4.2 15M4.2 19.4V15h4.4"/>',
  db:'<ellipse cx="12" cy="6" rx="7" ry="2.9"/><path d="M5 6v12c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9V6"/><path d="M19 12c0 1.6-3.1 2.9-7 2.9S5 13.6 5 12"/>',
  pill:'<path d="M13.4 4.6a4.5 4.5 0 0 1 6 6l-8.8 8.8a4.5 4.5 0 0 1-6-6l8.8-8.8Z"/><path d="m8.2 9.8 6 6"/>',
  tag:'<path d="M4 10.4V5.2A1.2 1.2 0 0 1 5.2 4h5.2a1.2 1.2 0 0 1 .85.35l8 8a1.2 1.2 0 0 1 0 1.7l-5.2 5.2a1.2 1.2 0 0 1-1.7 0l-8-8A1.2 1.2 0 0 1 4 10.4Z"/><circle cx="8" cy="8" r="1.3"/>',
  eye:'<path d="M2.6 12S6.4 5.6 12 5.6 21.4 12 21.4 12 17.6 18.4 12 18.4 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3.1"/>',
  moon:'<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8 8.6 8.6 0 1 0 20.2 14.6Z"/>',
  sun:'<circle cx="12" cy="12" r="4.1"/><path d="M12 2.6v2.2M12 19.2v2.2M4.3 4.3l1.6 1.6M18.1 18.1l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.3 19.7l1.6-1.6M18.1 5.9l1.6-1.6"/>',
  chev:'<path d="m5 9.5 7 7 7-7"/>',
  caret:'<path d="m9.5 5 7 7-7 7"/>',
  clock:'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.2 1.9"/>',
  clipboard:'<path d="M9 4.6H7.2a1.8 1.8 0 0 0-1.8 1.8v12.4a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8V6.4a1.8 1.8 0 0 0-1.8-1.8H15"/><rect x="9" y="2.8" width="6" height="3.6" rx="1.2"/><path d="m8.8 12.4 1.8 1.8 3.6-3.8"/><path d="M8.8 17.2h6.4"/>',
  check:'<path d="m5 12.6 4.4 4.4L19 7.4"/>',
  atom:'<circle cx="12" cy="6.4" r="2.6"/><circle cx="6.2" cy="16.6" r="2.6"/><circle cx="17.8" cy="16.6" r="2.6"/><path d="M10.2 8.3 8.1 14.2M13.8 8.3l2.1 5.9M8.8 16.6h6.4"/>',
  flask:'<path d="M10 3.2h4M10.8 3.2v6.1L5.6 18a2 2 0 0 0 1.7 3h9.4a2 2 0 0 0 1.7-3l-5.2-8.7V3.2"/><path d="M8.2 14.4h7.6"/>',
};

// สร้างแท็ก svg
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

// แยกข้อความที่ปนสองภาษา
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

// ข้อความหลายบรรทัด <-> รายการ
const lines  = t => String(t || '').split('\n').map(s => s.trim()).filter(Boolean);
const unline = list => list.join('\n');

// ข้อความที่กรอกเป็นข้อ ๆ · เก็บในฟอร์มเป็นอาร์เรย์ หนึ่งช่องต่อหนึ่งข้อ
// ต้องเหลืออย่างน้อยหนึ่งแถวเสมอ ไม่งั้นไม่มีที่ให้พิมพ์
const textRows = t => {
  const rows = (Array.isArray(t) ? t : lines(t)).map(s => String(s == null ? '' : s));
  return rows.length ? rows : [''];
};
const textList = rows => (rows || []).map(s => String(s || '').trim()).filter(Boolean);
const hasText  = rows => textList(rows).length > 0;


/*  ชั้นข้อมูล  */

let CATS   = [];    // หมวดอาการ [{id, name_th}]
let MEDS   = [];    // รายการยา [{id, name_th, category, dosage_form, brand_count}]
let BRANDS = [];    // ยี่ห้อทั้งหมด
let INGS   = [];    // ตัวยาสำคัญทั้งหมด

const token = () => sessionStorage.getItem(KEY_TOKEN) || '';

// แปลง detail ของเซิร์ฟเวอร์เป็นข้อความสำหรับผู้ใช้
function detailText(data, status) {
  const d = data && data.detail;
  if (typeof d === 'string' && d.trim()) return d;
  if (status === 422) return 'ข้อมูลไม่ครบหรือผิดรูปแบบ';
  if (status === 404) return 'ไม่พบรายการนี้ อาจถูกลบไปแล้ว';
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
    throw new Error('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ โปรดตรวจสอบอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง');
  }

  // บัตรผ่านหมดอายุ · พากลับหน้าเข้าสู่ระบบ
  if (res.status === 401) {
    sessionStorage.removeItem(KEY_TOKEN);
    backToLogin('หมดเวลาใช้งาน โปรดเข้าสู่ระบบอีกครั้ง');
    throw new Error('ต้องเข้าสู่ระบบใหม่');
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

// จำนวนยี่ห้อของสูตร
const brandCount = id => brandsOf(id).length;

// รูปแบบเลขทะเบียน เช่น 1A 844/39
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

// กล่องยืนยันก่อนทำสิ่งที่ย้อนไม่ได้
function confirmBox(title, text, okLabel) {
  const d = $('#confirmBox');
  $('#confirmTitle').textContent = title;
  $('#confirmText').textContent = text;
  $('#confirmOk').textContent = okLabel || 'ลบ';

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

/*  หน้าโหลด  */

let loadAt = 0;

// เปิดหน้าโหลด
function showLoad(tx) {
  const el = $('#viewLoad');
  $('#loadTx').textContent = tx;
  el.classList.remove('is-out');
  el.hidden = false;
  loadAt = Date.now();
}

// เปลี่ยนข้อความระหว่างโหลด
function setLoad(tx) { $('#loadTx').textContent = tx; }

// ปิดหน้าโหลด ค้างไว้ครู่หนึ่งก่อน จะได้ไม่กะพริบตอนเน็ตเร็ว
async function hideLoad() {
  const el = $('#viewLoad');
  if (el.hidden) return;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const left = 650 - (Date.now() - loadAt);
  if (left > 0) await wait(left);
  el.classList.add('is-out');
  await wait(260);
  el.hidden = true;
  el.classList.remove('is-out');
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

// เข้าสู่ระบบ
async function doLogin(e) {
  e.preventDefault();
  const u = $('#adUser'), p = $('#adPass');
  const msg = $('#loginMsg');
  msg.hidden = true;

  const okU = fieldErr(u, $('#adUserErr'), u.value.trim() ? '' : 'ระบุชื่อผู้ใช้');
  const okP = fieldErr(p, $('#adPassErr'), p.value ? '' : 'ระบุรหัสผ่าน');
  if (!okU || !okP) { (okU ? p : u).focus(); return; }

  const btn = $('#loginBtn');
  btn.disabled = true;
  btn.textContent = 'กำลังเข้าสู่ระบบ…';
  showLoad('กำลังตรวจสอบสิทธิ์');

  try {
    let res;
    try {
      res = await fetch(ADMIN_API + '/admin/login', {
        method: 'POST',
        body: new URLSearchParams({ username: u.value.trim(), password: p.value }),
      });
    } catch (err) {
      throw new Error('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ โปรดตรวจสอบอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง');
    }

    let data = null;
    try { data = await res.json(); } catch (err) {}
    if (!res.ok) throw new Error(detailText(data, res.status));

    sessionStorage.setItem(KEY_TOKEN, data.access_token);
    p.value = '';
    setLoad('กำลังโหลดข้อมูลยา');
    await openApp();
  } catch (err) {
    msg.textContent = err.message;
    msg.hidden = false;
  } finally {
    await hideLoad();
    btn.disabled = false;
    btn.textContent = 'เข้าสู่ระบบ';
  }
}

// ชื่อผู้ดูแลมุมขวาบน พร้อมตัวอักษรแรกในวงกลม
function setWho(name) {
  $('#whoami').textContent = name;
  $('#usrAv').textContent = name ? name.trim().charAt(0) : '?';
}

// เมนูที่หล่นลงมาจากชื่อผู้ดูแล
function openUsr(want) {
  const menu = $('#usrMenu');
  const show = want === undefined ? menu.hidden : want;
  menu.hidden = !show;
  $('#usrBtn').setAttribute('aria-expanded', show ? 'true' : 'false');
}


// ออกจากระบบ
function doLogout() {
  openUsr(false);
  sessionStorage.removeItem(KEY_TOKEN);
  backToLogin('');
}


/*  โครงหน้าจัดการ  */

// สถานะของหน้าจัดการ
let view    = 'home';   // หน้าที่เปิดอยู่ · home คือหน้าแรก list คือหน้าจัดการข้อมูล
let editing = '';       // รายการที่กำลังแก้
let query   = '';       // คำค้น
let cat     = '';       // หมวดหมู่ที่กรองอยู่ ว่างคือทุกหมวด
let form    = null;     // ค่าที่กรอกค้างในฟอร์ม
let listY   = 0;        // ตำแหน่งที่เลื่อนค้างไว้ในรายการ ก่อนเปิดฟอร์ม
let formStart = '';     // สภาพฟอร์มตอนเพิ่งเปิด ไว้ดูว่ามีอะไรถูกแก้แล้วหรือยัง

// เปิดส่วนจัดการหลังเข้าสู่ระบบ
async function openApp() {
  $('#viewLogin').hidden = true;
  $('#viewApp').hidden = false;
  view = 'home';
  paintIcons();
  syncThemeBtn();
  skeleton();

  try {
    const me = await api('/admin/me');
    setWho(me && me.username ? me.username : '');
    await loadAll();
  } catch (err) {
    if (!token()) return;   // หมดอายุ · api() จัดการแล้ว
    failPanel(err.message);
    return;
  }

  editing = '';
  form = null;
  query = '';
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
      svg('refresh') + 'ลองใหม่อีกครั้ง</button></div></div>';
  paintIcons($('#panel'));
  $('#retryBtn').addEventListener('click', openApp);
}

/*  ค่าคงที่และตัวช่วยของส่วนแสดงผล  */

// รูปแบบยาเป็นภาษาไทย
const FORM_TH = {
  'TABLET':'ยาเม็ด',
  'CHEWABLE TABLET':'ยาเม็ดเคี้ยว',
  'FILM COATED TABLET':'ยาเม็ดเคลือบฟิล์ม',
  'COATED TABLET':'ยาเม็ดเคลือบ',
  'EFFERVESCENT TABLET':'ยาเม็ดฟู่',
  'CAPSULE':'ยาแคปซูล',
  'POWDER':'ยาผง',
  'EFFERVESCENT POWDER':'ยาผงฟู่',
  'LOZENGE':'ยาอม',
  'SUSPENSION':'ยาน้ำแขวนตะกอน',
  'ORAL SUSPENSION':'ยาน้ำแขวนตะกอนสำหรับรับประทาน',
  'SOLUTION':'ยาน้ำใส',
  'ORAL SOLUTION':'ยาน้ำใสสำหรับรับประทาน',
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

// แปลรูปแบบยาเป็นไทย · ค่าหลายแบบคั่นด้วย /
const formTh = v => String(v || '').split('/').map(s => s.trim()).filter(Boolean)
  .map(s => FORM_TH[s.toUpperCase()] || s).join(' / ');

// ตัวเลือกรูปแบบยา
function formOptions() {
  const seen = {};
  const out = [];
  Object.keys(FORM_TH).forEach(k => { seen[k] = 1; out.push([k, FORM_TH[k]]); });
  MEDS.forEach(m => {
    const k = String(m.dosage_form || '').toUpperCase().trim();
    if (k && !seen[k]) { seen[k] = 1; out.push([k, formTh(k)]); }
  });
  return out;
}

// เทียบเลขทะเบียนโดยไม่สนช่องว่างและตัวพิมพ์
const regKey = t => String(t || '').toUpperCase().replace(/[^0-9A-Z/]/g, '');

// ชื่อหมวดหมู่แบบสั้น
const shortCat = n => String(n || '').replace(/\s*\(.*?\)\s*/g, ' ').trim();

// ชื่อตัวยาสำคัญ
const ingLabel = g => g ? (g.name_th || g.name_en) : '';

// ชื่อยี่ห้อ
const brandTh  = b => thName(b && b.brand_name);


/*  ช่องที่กรอกเป็นข้อ ๆ · ข้อบ่งใช้ วิธีใช้ คำเตือน  */

const LISTF = {
  indications: {
    label: 'ข้อบ่งใช้และสรรพคุณ *',
    hint:  'กด Enter เพื่อขึ้นข้อใหม่',
    ph:    'เช่น บรรเทาอาการปวด ลดไข้',
  },
  dosage_instructions: {
    label: 'วิธีใช้และขนาดรับประทาน *',
    hint:  'กด Enter เพื่อขึ้นข้อใหม่',
    ph:    'เช่น ผู้ใหญ่ รับประทานครั้งละ 1-2 เม็ด ทุก 4-6 ชั่วโมง',
  },
  warnings: {
    label: 'คำเตือนและข้อควรระวังสำคัญ',
    hint:  'กด Enter เพื่อขึ้นข้อใหม่',
    ph:    'เช่น ห้ามรับประทานเกินวันละ 8 เม็ด',
  },
};
const LKEYS = Object.keys(LISTF);


/*  ตัวช่วยสร้างฟอร์ม  */

// ช่องที่ต้องกรอก เขียน * ต่อท้ายข้อความป้ายตามเดิม ไม่ต้องส่งพารามิเตอร์เพิ่ม
const isReq = label => /\s\*$/.test(String(label));

// ป้ายของช่องกรอก · ดอกจันแยกออกมาเป็น span
function lbl(name, label) {
  const t = String(label);
  return '<label for="fl-' + name + '">' + esc(t.replace(/\s\*$/, '')) +
    (isReq(t) ? ' <span class="req" aria-hidden="true">*</span>' : '') + '</label>';
}

const reqAttr = label => isReq(label) ? ' aria-required="true"' : '';

// ช่องกรอกหนึ่งช่อง
function field(name, label, value, hint) {
  return '<div class="field" data-fl="' + name + '">' +
    lbl(name, label) +
    '<input id="fl-' + name + '" type="text" value="' + esc(value == null ? '' : value) + '"' +
      reqAttr(label) + ' ' +
      'aria-describedby="fh-' + name + ' fe-' + name + '">' +
    (hint ? '<p class="hint" id="fh-' + name + '">' + esc(hint) + '</p>' : '') +
    '<p class="field-err" id="fe-' + name + '" hidden></p>' +
  '</div>';
}

// ช่องกรอกของข้อหนึ่งข้อ · ไม่มีป้ายให้เห็น เพราะป้ายอยู่หัวรายการแล้ว
function fieldRow(name, aria, value, ph) {
  return '<div class="field" data-fl="' + name + '">' +
    '<textarea id="fl-' + name + '" class="lrtx" rows="1" ' +
      'aria-label="' + esc(aria) + '"' + (ph ? ' placeholder="' + esc(ph) + '"' : '') + ' ' +
      'aria-describedby="fe-' + name + '">' + esc(value == null ? '' : value) + '</textarea>' +
    '<p class="field-err" id="fe-' + name + '" hidden></p>' +
  '</div>';
}

// ช่องข้อความขยายเองตามจำนวนบรรทัด · ไม่ต้องมีแถบเลื่อนในช่องเตี้ย ๆ
function growArea(el) {
  el.style.height = 'auto';
  el.style.height = (el.scrollHeight + el.offsetHeight - el.clientHeight) + 'px';
}

// ช่องเลือกจากรายการ
function fieldSelect(name, label, value, options, hint) {
  return '<div class="field" data-fl="' + name + '">' +
    lbl(name, label) +
    '<select id="fl-' + name + '"' + reqAttr(label) +
      ' aria-describedby="fh-' + name + ' fe-' + name + '">' +
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
// แถวของแต่ละข้อ · แยกออกมาต่างหาก จะได้วาดใหม่เฉพาะรายการนี้ตอนเพิ่มหรือลบข้อ
function listRows(key, rows) {
  const d    = LISTF[key];
  const list = textRows(rows);
  const name = String(d.label).replace(/\s\*$/, '');

  const one = (s, i) =>
    '<li class="lrow" data-lrow="' + key + '" data-i="' + i + '">' +
      '<span class="lrno" aria-hidden="true">' + (i + 1) + '</span>' +
      fieldRow(key + '_' + i, name + ' ข้อที่ ' + (i + 1), s, d.ph) +
      (list.length > 1
        ? '<button class="iconact is-danger" type="button" data-lrdel="' + i + '" ' +
            'aria-label="ลบ' + esc(name) + ' ข้อที่ ' + (i + 1) + '">' + svg('trash') + '</button>'
        : '') +
    '</li>';

  return '<ul class="lrlist" id="lr_' + key + '">' + list.map(one).join('') + '</ul>';
}

// ช่องกรอกแบบหลายข้อทั้งก้อน · ป้ายหนึ่งอัน รายการข้อ คำอธิบาย แล้วปุ่มเพิ่มข้อ
function listField(key, f) {
  const d = LISTF[key];
  return '<div class="listfield" data-lf="' + key + '">' +
    '<p class="flabel">' + esc(String(d.label).replace(/\s\*$/, '')) +
      (isReq(d.label) ? ' <span class="req" aria-hidden="true">*</span>' : '') + '</p>' +
    listRows(key, f[key]) +
    '<p class="hint">' + esc(d.hint) + '</p>' +
    '<p class="lradd"><button class="btn btn-soft btn-sm" type="button" ' +
      'data-lradd="' + key + '">' + svg('plus') + 'เพิ่มข้อ</button></p>' +
  '</div>';
}

// วาดรายการข้อใหม่ทั้งรายการ · ใช้ตอนเพิ่ม ลบ หรือแตกข้อเท่านั้น
function redrawList(key) {
  const box = $('#lr_' + key);
  if (!box) return;
  box.outerHTML = listRows(key, form[key]);
  paintIcons($('#panel'));
  bindList(key);
}

// ช่องกรอกของรายการหนึ่ง · ผูกใหม่ทุกครั้งที่วาดรายการนั้นใหม่
function bindList(key) {
  $$('#lr_' + key + ' .lrtx').forEach(el => {
    growArea(el);
    el.addEventListener('input', () => growArea(el));

    // Enter คือขึ้นข้อใหม่ · ตัดข้อความตรงเคอร์เซอร์ไปเป็นข้อถัดไป
    el.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || e.isComposing) return;
      e.preventDefault();
      formRead();
      const i  = +el.closest('[data-lrow]').dataset.i;
      const at = el.selectionStart;
      const v  = String(el.value);
      form[key][i] = v.slice(0, at);
      form[key].splice(i + 1, 0, v.slice(at));
      redrawList(key);
      const next = $('#fl-' + key + '_' + (i + 1));
      if (next) { next.focus(); next.setSelectionRange(0, 0); }
    });

    // วางข้อความหลายบรรทัดมาทีเดียว ให้แตกเป็นข้อ ๆ ให้เลย
    el.addEventListener('change', () => {
      if (String(el.value).indexOf('\n') < 0) return;
      formRead();
      const i = +el.closest('[data-lrow]').dataset.i;
      form[key].splice.apply(form[key], [i, 1].concat(lines(el.value)));
      if (!form[key].length) form[key] = [''];
      redrawList(key);
      const back = $('#fl-' + key + '_' + i);
      if (back) back.focus();
    });
  });

  $$('#lr_' + key + ' [data-lrdel]').forEach(b => b.addEventListener('click', () => {
    formRead();
    form[key].splice(+b.dataset.lrdel, 1);
    if (!form[key].length) form[key] = [''];
    redrawList(key);
  }));
}

// ปุ่มเพิ่มข้อ · อยู่นอกรายการ ไม่ถูกวาดทับ จึงผูกตอนวาดฟอร์มครั้งเดียว
function bindListAdd() {
  $$('#panel [data-lradd]').forEach(b => b.addEventListener('click', () => {
    const key = b.dataset.lradd;
    formRead();
    form[key].push('');
    redrawList(key);
    const last = $('#fl-' + key + '_' + (form[key].length - 1));
    if (last) last.focus();
  }));
}

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

// ส่งข้อมูลแล้วปิดโหมดแก้ไขเมื่อสำเร็จ
async function apply(btn, work, okText) {
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'กำลังบันทึก…';
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
  toast(okText);
  render();
}


/*  หน้าจัดการ · มีหน้าเดียว คือรายการยากับฟอร์มเพิ่มหรือแก้ไข  */

// วาดหน้าใหม่
function render() {
  setHead();
  if (view === 'home') homePage();
  else productPage();
  paintIcons($('#panel'));
}

// หัวเรื่องของหน้า เปลี่ยนตามหน้าที่เปิดอยู่
function setHead() {
  const h = $('#adTitle');
  const p = $('#adLead');
  if (h) h.textContent = view === 'home'
    ? 'ระบบจัดการข้อมูลยาสามัญประจำบ้าน'
    : 'จัดการฐานข้อมูลยาสามัญประจำบ้าน';
  if (p) p.textContent = view === 'home'
    ? 'สำหรับผู้ดูแลระบบ โปรดเลือกรายการที่ต้องการดำเนินการ'
    : 'ตรวจสอบ แก้ไข เพิ่ม หรือลบข้อมูลยาและรายละเอียดการขึ้นทะเบียน อย.';
}

// เปลี่ยนหน้า · ถ้ายังมีฟอร์มค้างอยู่ต้องถามก่อน
async function goView(v) {
  if (view === v) return;
  if (!await leaveForm()) return;
  view = v;
  editing = '';
  form = null;
  render();
  window.scrollTo(0, 0);
}

function closeForm() {
  editing = '';
  form = null;
  render();
  // พากลับไปตรงที่ค้างไว้ในรายการ
  window.scrollTo(0, listY);
}

// เปิดฟอร์มทุกจุดเรียกตัวนี้ก่อน รายการกำลังจะถูกแทนที่ด้วยฟอร์ม
function leaveList() {
  listY = window.scrollY;
}

// จำสภาพฟอร์มตอนเพิ่งเปิด · เรียกหลัง render()
function markClean() {
  if (!form) { formStart = ''; return; }
  formRead();
  formStart = JSON.stringify(form);
}

// กำลังจะทิ้งฟอร์มที่เปิดอยู่ · คืน true ถ้าไปต่อได้
async function leaveForm() {
  if (!form) return true;
  formRead();
  if (JSON.stringify(form) === formStart) return true;

  return confirmBox('ออกจากฟอร์มนี้',
    'สิ่งที่กรอกไว้ยังไม่ได้บันทึก ถ้าออกตอนนี้ข้อมูลจะหายไป',
    'ออกโดยไม่บันทึก');
}


/*  หน้าแรกของส่วนผู้ดูแล  */

// ภาพประกอบบนการ์ด · เส้นเป็นโครง ส่วน hit เป็นจุดเน้นสีแบรนด์
const HICO = {

  // แผงยา
  meds: {
    line: '<rect x="10" y="5" width="28" height="38" rx="6"/>' +
          '<circle cx="18" cy="15" r="3.6"/><circle cx="18" cy="24" r="3.6"/>' +
          '<circle cx="18" cy="33" r="3.6"/><circle cx="30" cy="24" r="3.6"/>' +
          '<circle cx="30" cy="33" r="3.6"/>',
    hit:  '<circle cx="30" cy="15" r="3.6"/>',
  },

  // แคปซูลกับเครื่องหมายบวก
  add: {
    line: '<path d="M24.5 7.5a8.5 8.5 0 0 1 12 12L21 35a8.5 8.5 0 0 1-12-12L24.5 7.5Z"/>' +
          '<path d="M16.2 15.8 28 27.6"/>',
    hit:  '<rect x="36.4" y="28" width="3.2" height="13" rx="1.6"/>' +
          '<rect x="31.5" y="32.9" width="13" height="3.2" rx="1.6"/>',
  },

  // หน้าต่างเว็บกับแว่นขยาย
  view: {
    line: '<rect x="6" y="9" width="36" height="29" rx="4"/>' +
          '<path d="M6 17h36"/>' +
          '<circle cx="21.5" cy="25" r="5.5"/>' +
          '<path d="m25.6 29.1 5.2 5.2"/>',
    hit:  '<circle cx="11.5" cy="13" r="1.5"/><circle cx="16.5" cy="13" r="1.5"/>' +
          '<circle cx="21.5" cy="13" r="1.5"/>',
  },
};

function hicon(k) {
  const o = HICO[k];
  return '<svg class="hcard-ico" viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
      '<g stroke="currentColor" stroke-width="1.7" stroke-linecap="round" ' +
        'stroke-linejoin="round">' + o.line + '</g>' +
      '<g class="hcard-hit" fill="currentColor">' + o.hit + '</g>' +
    '</svg>';
}

function homePage() {
  $('#panel').innerHTML =
    '<div class="homegrid">' +
      homeCard('list', 'is-hero', 'meds', 'จัดการข้อมูลยา',
        'ตรวจสอบ แก้ไข หรือลบรายการยาที่เผยแพร่อยู่ในระบบ',
        BRANDS.length + ' รายการ') +
      homeCard('new', '', 'add', 'เพิ่มยาใหม่',
        'บันทึกผลิตภัณฑ์ยาใหม่ พร้อมรายละเอียดการขึ้นทะเบียนตำรับยา',
        'เริ่มกรอกข้อมูล') +
      homeCard('/', '', 'view', 'หน้าเว็บสำหรับผู้ใช้',
        'เปิดหน้าค้นหายาที่ผู้ใช้เห็น เพื่อตรวจทานข้อมูลที่เผยแพร่',
        'เปิดในแท็บใหม่') +
    '</div>';

  bindHome();
}

// การ์ดหนึ่งใบ · ปลายทางที่ขึ้นต้นด้วย / เป็นลิงก์ นอกนั้นเป็นปุ่มเปลี่ยนหน้า
function homeCard(go, tone, ico, title, desc, n) {
  const body =
    '<span class="hcard-top">' +
      '<span class="hcard-h">' + esc(title) + '</span>' +
      hicon(ico) +
    '</span>' +
    '<span class="hcard-ft">' +
      '<span class="hcard-tx">' +
        '<span class="hcard-n">' + esc(n) + '</span>' +
        '<span class="hcard-p">' + esc(desc) + '</span>' +
      '</span>' +
      '<span class="hcard-go">' + svg('fwd') + '</span>' +
    '</span>';

  const cls = 'hcard' + (tone ? ' ' + tone : '');

  return String(go).indexOf('/') === 0
    ? '<a class="' + cls + '" href="' + esc(go) + '" target="_blank" rel="noopener">' +
        body + '</a>'
    : '<button class="' + cls + '" type="button" data-go="' + esc(go) + '">' + body + '</button>';
}

function bindHome() {
  $$('#panel [data-go]').forEach(b => b.addEventListener('click', () => {
    // เพิ่มยาใหม่ · ข้ามไปหน้าจัดการข้อมูลแล้วเปิดฟอร์มให้เลย
    if (b.dataset.go === 'new') {
      view = 'list';
      setHead();
      openNew();
      return;
    }
    goView(b.dataset.go);
  }));
}


/*  รายการยา  */

// หมวดหมู่ของผลิตภัณฑ์ · มาจากชุดข้อมูลที่ผูกอยู่
const catOf = b => { const m = medRow(b.medicine_id); return m ? String(m.category || '') : ''; };

// เข้าเงื่อนไขตัวกรองหมวดหมู่ไหม
const inCat = b => !cat || catOf(b) === cat;

// ค้นหาและกรองในรายการ
function searchList() {
  const q = query.trim().toLowerCase();
  const qReg = regKey(query);
  const list = BRANDS.filter(b => {
    if (!inCat(b)) return false;
    if (!q) return true;
    const med = medRow(b.medicine_id);
    const hay = (b.brand_name + ' ' + b.licensee + ' ' +
      (med ? med.name_th + ' ' + (med.category || '') : '')).toLowerCase();
    if (hay.includes(q)) return true;
    return qReg.length > 2 && regKey(b.reg_no).includes(qReg);
  });
  return list.sort((a, b) => brandTh(a).localeCompare(brandTh(b), 'th'));
}

// ตัวเลือกหมวดหมู่พร้อมจำนวนผลิตภัณฑ์ในแต่ละหมวด
function catOptions() {
  return CATS.map(c => {
    const n = BRANDS.filter(b => catOf(b) === c.name_th).length;
    return [c.name_th, shortCat(c.name_th) + ' (' + n + ')'];
  });
}

function formPane(ico, title, body) {
  return '<p class="backbar">' +
      '<button class="btn btn-soft btn-sm" type="button" id="backList">' +
        svg('back') + 'กลับไปที่รายการ</button>' +
    '</p>' +
    '<section class="adcard is-edit is-pane">' +
      '<h3 class="cardhd">' + svg(ico) + esc(title) + '</h3>' +
      body +
    '</section>';
}

// โครงเทา ๆ ระหว่างรอข้อมูลจาก API
const skelBox = () => '<div class="skel">' + '<i></i>'.repeat(3) + '</div>';

function productPage() {
  const list = searchList();
  const b = editing.indexOf('p-') === 0
    ? BRANDS.find(x => x.id === +editing.slice(2)) : null;

  const pane =
    editing === 'new'
      ? formPane('pill', 'เพิ่มยาใหม่ในระบบ', form ? productForm() : skelBox())
      : b
        ? formPane('pencil', 'แก้ไข ' + brandTh(b), form ? productForm() : skelBox())
        : '';

  $('#panel').innerHTML =
    (pane ||
      '<p class="backbar">' +
        '<button class="btn btn-soft btn-sm" type="button" id="backHome">' +
          svg('back') + 'กลับไปหน้าแรก</button>' +
      '</p>' +

      '<div class="adbar">' +
        '<span class="srch">' + svg('search') +
          '<input type="search" id="adQ" value="' + esc(query) + '" ' +
          'placeholder="ค้นหาชื่อยา เลขทะเบียน ผู้ผลิต หมวดหมู่" ' +
          'aria-label="ค้นหายาในระบบ"></span>' +
        '<span class="catwrap">' + svg('filter') +
          '<select class="catsel" id="adCat" aria-label="กรองตามหมวดหมู่">' +
            '<option value="">ทุกหมวดหมู่ (' + BRANDS.length + ')</option>' +
            catOptions().map(o => '<option value="' + esc(o[0]) + '"' +
              (o[0] === cat ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') +
          '</select></span>' +
        '<button class="btn btn-primary" type="button" id="addBtn">' +
          svg('plus') + 'เพิ่มยาใหม่</button>' +
      '</div>' +

      (list.length
        ? '<div class="tablewrap"><table class="dtable">' +
            '<thead><tr>' +
              '<th scope="col">ชื่อผลิตภัณฑ์ยา</th>' +
              '<th scope="col">หมวดหมู่</th>' +
              '<th scope="col">เลขทะเบียน อย.</th>' +
              '<th scope="col">รูปแบบยา</th>' +
              '<th scope="col"><span class="vhide">การจัดการ</span></th>' +
            '</tr></thead>' +
            '<tbody>' + list.map(productRow).join('') + '</tbody>' +
          '</table></div>' +
          '<p class="count">' + list.length + ' จาก ' + BRANDS.length + ' รายการ</p>'
        : '<div class="state"><div class="state-ico">' + svg('search') + '</div>' +
          '<h2>' + (query || cat ? 'ไม่พบรายการที่ค้นหา' : 'ยังไม่มีข้อมูลยาในระบบ') + '</h2>' +
          '<p>' + (query || cat ? 'โปรดตรวจสอบคำค้นหรือหมวดหมู่อีกครั้ง'
                                : 'เริ่มต้นด้วยการเพิ่มรายการแรก') + '</p></div>'));

  bindNav();
  bindSearch();
  const add = $('#addBtn');
  if (add) add.addEventListener('click', openNew);
  $$('#panel [data-edit]').forEach(x =>
    x.addEventListener('click', () => openEdit(+x.dataset.edit)));
  $$('#panel [data-del]').forEach(x =>
    x.addEventListener('click', () => delProduct(+x.dataset.del)));

  if (!form) return;

  // เปลี่ยนรูปแบบยาแล้วต้องหาใหม่ว่ามียาตัวอื่นที่ใช้ข้อมูลชุดเดียวกันไหม
  const df = $('#fl-dosage_form');
  if (df) df.addEventListener('change', () => scanFormula().then(autoShare));

  const addIng = $('#ingAddBtn');
  if (addIng) addIng.addEventListener('click', () => {
    formRead();
    form.ingRows.push({ nm: '', st: '' });
    redrawIng();
    const last = $('#fl-in_' + (form.ingRows.length - 1));
    if (last) last.focus();
  });

  bindIngRows();
  LKEYS.forEach(bindList);
  bindListAdd();
  bindNote();
  bindFormBtns(saveProduct);
  scanFormula().then(autoShare);
}

// หนึ่งแถวในตารางรายการยา
function productRow(b) {
  const med = medRow(b.medicine_id);

  return '<tr>' +
    '<td><span class="nm">' + esc(brandTh(b)) + '</span>' +
      (med ? '<span class="sub">' + esc(med.name_th) + '</span>' : '') +
      '<span class="sub">' + esc(b.licensee) + '</span></td>' +
    '<td><span class="pill pill-red">' +
      esc((med && shortCat(med.category)) || 'ยังไม่ระบุหมวด') + '</span></td>' +
    '<td class="reg">' + esc(b.reg_no) + '</td>' +
    '<td>' + esc((med && formTh(med.dosage_form)) || '—') + '</td>' +
    '<td><span class="act">' +
      '<button class="iconact" type="button" data-edit="' + b.id + '" ' +
        'aria-label="แก้ไข ' + esc(brandTh(b)) + '">' + svg('pencil') + '</button>' +
      '<button class="iconact is-danger" type="button" data-del="' + b.id + '" ' +
        'aria-label="ลบ ' + esc(brandTh(b)) + '">' + svg('trash') + '</button>' +
    '</span></td>' +
  '</tr>';
}


/*  ข้อมูลที่กรอกค้างอยู่ในฟอร์ม  */

function newForm(b, m) {
  return {
    bid: b ? b.id : 0,
    mid: m ? m.id : 0,
    brand_name:  b ? b.brand_name : '',
    reg_no:      b ? b.reg_no : '',
    legal_type:  b ? b.legal_type : 'ยาสามัญประจำบ้าน',
    licensee:    b ? b.licensee : '',
    category_id: m ? String(m.category_id || '') : '',
    name_th:     m ? m.name_th : '',
    dosage_form: m ? String(m.dosage_form || '').toUpperCase() : '',
    // สามช่องนี้กรอกเป็นข้อ ๆ เก็บเป็นอาร์เรย์ หนึ่งช่องต่อหนึ่งข้อ
    indications: textRows(m ? m.indications : ''),
    dosage_instructions: textRows(m ? m.dosage_instructions : ''),
    warnings:    textRows(m ? (m.warnings || []) : []),
    // ตัวยาสำคัญกรอกทีละแถว ชื่อกับปริมาณแยกช่องกัน
    ingRows:     ingRowsOf(m && m.ingredients),
    ingIds:      m ? (m.ingredients || []).map(g => g.id) : [],
    // ปริมาณตัวยารายตัว เก็บเป็น ไอดีตัวยา -> ข้อความ เช่น 7 -> '500 mg'
    ingStr:      m ? (m.ingredients || []).reduce(
                   (o, g) => (o[g.id] = g.strength || '', o), {}) : {},
    ingMiss:     0,     // จำนวนตัวยาที่พิมพ์มาแล้วยังไม่มีในระบบ
    newIng:      {},    // ชื่อสองภาษาของตัวยาใหม่ที่รอสร้าง
    autoName:    '',    // ชื่อสามัญที่ระบบเติมให้ครั้งล่าสุด
    base:        '',
  };
}

// ช่องของตาราง medicines
function medBody(f) {
  return {
    category_id: +f.category_id,
    name_th: f.name_th,
    dosage_form: f.dosage_form,
    indications: unline(textList(f.indications)),
    dosage_instructions: unline(textList(f.dosage_instructions)),
    warnings: textList(f.warnings),
    // ต้องส่ง ingredients ไม่ใช่ ingredient_ids
    ingredients: f.ingIds.map(id => ({
      ingredient_id: id,
      strength: String((f.ingStr || {})[id] || '').trim(),
    })),
  };
}

// ชื่อสามัญที่ระบบเดาให้จากตัวยาสำคัญ ปริมาณตัวยา และรูปแบบยา
// นับตัวยาที่ยังไม่มีในระบบด้วย ไม่งั้นยาที่มีตัวยาใหม่จะได้ชื่อไม่ครบ
function autoName(f, list) {
  const names = (list || rowsInfo(f))
    .map(x => (x.strength ? x.name + ' ' + x.strength : x.name))
    .filter(Boolean);
  if (!names.length) return '';

  const fm = formTh(f.dosage_form);
  const base = names.join(' + ') + (fm ? ' · ' + fm : '');

  const taken = MEDS.some(m => m.id !== f.mid && m.name_th === base);
  const who = String(f.brand_name || '').trim();
  return taken && who ? base + ' (เฉพาะ ' + who + ')' : base;
}

// เติมชื่อสามัญให้เอง ตราบใดที่ยังไม่ได้พิมพ์ทับ
function syncName(f, list) {
  if (f.mid) return;                                  // ใช้ชื่อเดิมของยาที่ผูกข้อมูลร่วมอยู่
  if (f.name_th && f.name_th !== f.autoName) return;  // พิมพ์เองไว้แล้ว ห้ามทับ
  f.autoName = autoName(f, list);
  f.name_th = f.autoName;

  // เขียนลงช่องกรอกเดี๋ยวนี้ ไม่งั้นรอบอ่านถัดไปจะอ่านค่าเก่ากลับมาทับ
  const el = $('#fl-name_th');
  if (el && el.value !== f.name_th) el.value = f.name_th;
}

const medBase = m => JSON.stringify(medBody(newForm(null, m)));

// เก็บค่าที่พิมพ์ไว้ก่อนวาดหน้าใหม่
function formRead() {
  if (!form) return;
  ['brand_name', 'reg_no', 'legal_type', 'licensee', 'category_id', 'name_th',
   'dosage_form']
    .forEach(n => {
      if ($('#fl-' + n)) form[n] = fv(n);
    });

  // ข้อความที่กรอกเป็นข้อ ๆ · อ่านทีละแถวตามลำดับที่วาดไว้
  LKEYS.forEach(k => {
    (form[k] || []).forEach((s, i) => {
      if ($('#fl-' + k + '_' + i)) form[k][i] = fv(k + '_' + i);
    });
  });

  // ชื่อกับปริมาณของตัวยาแต่ละแถว
  (form.ingRows || []).forEach((r, i) => {
    if ($('#fl-in_' + i)) r.nm = fv('in_' + i);
    if ($('#fl-st_' + i)) r.st = fv('st_' + i);
  });

  // ชื่อสองภาษาของตัวยาใหม่ · เก็บตามชื่อที่พิมพ์ ไม่ใช่ตามลำดับแถว จะได้ไม่สลับกัน
  if (!form.newIng) form.newIng = {};
  $$('#panel [data-newing]').forEach(el => {
    const o = form.newIng[el.dataset.newing] || (form.newIng[el.dataset.newing] = {});
    if ($('#fl-ne_th_' + el.dataset.i)) o.th = fv('ne_th_' + el.dataset.i);
    if ($('#fl-ne_en_' + el.dataset.i)) o.en = fv('ne_en_' + el.dataset.i);
  });

  syncName(form, ingSync(form));
}


/*  ตัวยาสำคัญ · พิมพ์เป็นข้อความ ระบบจับคู่กับตัวยาที่มีอยู่ให้เอง  */

// ปรับข้อความก่อนเทียบชื่อ · ไม่สนตัวพิมพ์เล็กใหญ่และช่องว่างซ้ำ
const nameKey = s => String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim();

// ชื่อทุกแบบที่ใช้เรียกตัวยาหนึ่งตัว
const ingNames = g => [g.name_th, g.name_en].concat(g.aliases || []).filter(Boolean);

// ชื่อตัวยาที่ขึ้นต้นข้อความ · ยอมให้ช่องว่างไม่เท่ากันได้
const nameRe = n => new RegExp('^\\s*' +
  String(n).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+') + '\\s*', 'i');

// ปริมาณตัวยาต้องมีหน่วยกำกับ ไม่งั้นชื่ออย่าง วิตามินบี 1 จะถูกตัดผิด
const RE_STR = /^(.+?)\s+(\d[\d.,\/\s]*(?:มก|มคก|มล|ซีซี|กรัม|มิลลิกรัม|มิลลิลิตร|ไมโครกรัม|หน่วย|mg|mcg|µg|g|ml|cc|l|iu|u|%)[^]*)$/i;

// ข้อความท่อนนี้ขึ้นต้นด้วยตัวยาตัวไหนในระบบ · เอาชื่อที่ยาวที่สุดที่ตรง
function ingFind(part) {
  let best = null;
  INGS.forEach(g => ingNames(g).forEach(n => {
    if (!nameKey(part).startsWith(nameKey(n))) return;
    if (!best || String(n).length > String(best.n).length) best = { g: g, n: n };
  }));
  if (!best) return null;

  let rest = String(part).replace(nameRe(best.n), '').trim();
  // เขียนชื่อซ้ำสองภาษา เช่น พาราเซตามอล Paracetamol 500 mg · ตัดอีกชื่อออกด้วย
  ingNames(best.g).forEach(n => {
    if (nameKey(rest).startsWith(nameKey(n))) rest = rest.replace(nameRe(n), '').trim();
  });
  return { g: best.g, strength: rest };
}

// หนึ่งแถวตัวยา · คืนสิ่งที่ระบบเข้าใจจากแถวนั้น ถ้าแถวว่างคืน null
// id เป็น 0 แปลว่ายังไม่มีตัวยาชื่อนี้ในระบบ
function rowInfo(r) {
  const raw = String((r && r.nm) || '').trim();
  const st  = String((r && r.st) || '').trim();
  if (!raw) return null;

  // ชื่ออังกฤษในวงเล็บเก็บไว้ก่อน แล้วเอาวงเล็บออกเพื่อให้จับคู่ชื่อได้
  const extra = (raw.match(/\([^)]*\)/g) || []).join(' ').replace(/[()]/g, ' ');
  const part  = raw.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();

  const hit = ingFind(part);
  if (hit) return { id: hit.g.id, name: ingLabel(hit.g), strength: st || hit.strength };

  // ยังไม่มีในระบบ · เผื่อพิมพ์ปริมาณติดมากับชื่อ ให้แยกออกให้ ปริมาณต้องมีหน่วยกำกับ
  const cut  = part.match(RE_STR);
  const name = String(cut ? cut[1] : part).trim();
  const two  = splitLang(name + ' ' + extra);
  return { id: 0, name: name, th: two.th, en: two.en,
           strength: st || (cut ? cut[2].trim() : '') };
}

// ทุกแถวที่กรอกไว้ แปลงเป็นสิ่งที่ระบบเข้าใจ · แถวว่างไม่นับ
const rowsInfo = f => (f.ingRows || []).map(rowInfo).filter(Boolean);

// แถวตัวยาจากข้อมูลที่อยู่ในฐานข้อมูล · ไม่มีเลยก็ต้องมีแถวว่างไว้หนึ่งแถว
const ingRowsOf = list => {
  const rows = (list || []).map(g => ({ nm: g.name_th || g.name_en, st: g.strength || '' }));
  return rows.length ? rows : [{ nm: '', st: '' }];
};

// แปลงแถวที่กรอกเป็นรายการไอดีและปริมาณ ที่ใช้ส่งขึ้นเซิร์ฟเวอร์
function ingSync(f) {
  const list = rowsInfo(f);
  f.ingIds = [];
  f.ingStr = {};
  f.ingMiss = 0;

  list.forEach(x => {
    if (!x.id) { f.ingMiss++; return; }
    if (f.ingIds.indexOf(x.id) < 0) f.ingIds.push(x.id);
    f.ingStr[x.id] = x.strength;
  });
  return list;
}

// บรรทัดใต้แถว บอกว่าระบบเข้าใจแถวนั้นว่าอะไร
// อยู่ในกล่องของตัวเอง จะได้วาดใหม่ได้โดยไม่แตะช่องกรอกที่พิมพ์ค้างอยู่
function rowNote(f, i) {
  const x = rowInfo((f.ingRows || [])[i]);
  if (!x) return '';   // ยังไม่ได้พิมพ์ชื่อ ไม่ต้องบอกอะไร

  if (x.id)
    return '<p class="ingst is-ok">' + svg('check') +
      '<span>ตรงกับ <b>' + esc(x.name) + '</b> ที่มีอยู่แล้วในระบบ</span></p>';

  const d = (f.newIng || {})[nameKey(x.name)] || {};
  return '<p class="ingst">' + svg('plus') +
      '<span><b>' + esc(x.name) + '</b> ยังไม่มีในระบบ · จะเพิ่มให้ตอนกดบันทึก</span></p>' +
    (x.th && x.en ? '' :
      '<div class="formgrid two" data-newing="' + esc(nameKey(x.name)) + '" ' +
          'data-i="' + i + '">' +
        (x.th ? '' : field('ne_th_' + i, 'ชื่อตัวยา (ไทย) *', d.th || '', 'เช่น ไซเมทิโคน')) +
        (x.en ? '' : field('ne_en_' + i, 'ชื่อตัวยา (อังกฤษ) *', d.en || '',
          'ระบบสแกนใช้ชื่อนี้จับคู่กับฉลาก')) +
      '</div>');
}

// รายการแถวตัวยาทั้งหมด
function ingList(f) {
  const rows = f.ingRows || [];

  const one = (r, i) =>
    '<li class="subrow is-edit" data-row="' + i + '">' +
      '<div class="formgrid two">' +
        field('in_' + i, 'ชื่อตัวยาสำคัญ *', r.nm, 'ตามที่พิมพ์บนฉลาก เช่น พาราเซตามอล') +
        field('st_' + i, 'ปริมาณตัวยา', r.st, 'เช่น 500 มก. · เว้นว่างได้') +
      '</div>' +
      '<div class="ingx" id="ingx_' + i + '">' + rowNote(f, i) + '</div>' +
      (rows.length > 1
        ? '<p class="ingrow-act"><button class="btn btn-soft btn-sm" type="button" ' +
            'data-ingdel="' + i + '">' + svg('trash') + 'นำตัวยานี้ออก</button></p>'
        : '') +
    '</li>';

  return '<ul class="sublist" id="ingList">' + rows.map(one).join('') + '</ul>';
}

// กล่องตัวยาสำคัญทั้งกล่อง
function ingBlock(f) {
  return '<div class="ingbox">' +
    '<p class="flabel">ตัวยาสำคัญและปริมาณ <span class="req" aria-hidden="true">*</span></p>' +
    ingList(f) +
    '<p class="ingadd"><button class="btn btn-soft" type="button" id="ingAddBtn">' +
      svg('plus') + 'เพิ่มตัวยาอีกตัว</button></p>' +
    // รายชื่อตัวยาที่มีอยู่ ช่วยเติมให้ตรงกับในระบบ ไม่ได้บังคับให้เลือก
    '<datalist id="ingNames">' +
      INGS.map(g => '<option value="' + esc(ingLabel(g)) + '">').join('') +
    '</datalist>' +
  '</div>';
}

// วาดรายการแถวตัวยาใหม่ทั้งก้อน · ใช้ตอนเพิ่มหรือนำแถวออกเท่านั้น
function redrawIng() {
  const box = $('#ingList');
  if (!box) return;
  box.outerHTML = ingList(form);
  paintIcons($('#panel'));
  bindIngRows();
}

// สร้างตัวยาที่ยังไม่มีในระบบ ก่อนบันทึกยา
async function makeNewIngs(f) {
  const list = rowsInfo(f).filter(x => !x.id);

  for (let i = 0; i < list.length; i++) {
    const x = list[i];
    const d = (f.newIng || {})[nameKey(x.name)] || {};
    const made = await send('/admin/ingredients', 'POST', {
      name_th: x.th || String(d.th || '').trim(),
      name_en: x.en || String(d.en || '').trim(),
      aliases: [],
    });
    if (made) INGS.push(made);
  }
  if (list.length) ingSync(f);   // ตอนนี้ชื่อที่พิมพ์ไว้จับคู่ได้แล้ว
}


/*  ข้อมูลที่ใช้ร่วมกับยายี่ห้ออื่น  */

function sharedWith(f) {
  if (!f.mid) return [];
  return brandsOf(f.mid).filter(b => b.id !== f.bid);
}

// กล่องเสนอให้ใช้ข้อความชุดเดียวกัน · ไม่บังคับตอบ บันทึกได้โดยไม่ต้องกด
function offerNote(hit) {
  const kids = brandsOf(hit);
  const who = kids.length ? brandTh(kids[0]) : (medRow(hit) || {}).name_th || '';

  return '<div class="notice">' + svg('alert') + '<div>' +
      '<p><b>' + esc(who) + '</b> ใช้ตัวยาสำคัญ ปริมาณตัวยา และรูปแบบยา ชุดเดียวกัน ' +
        'ถ้าข้อความบนฉลากเหมือนกัน กดใช้ข้อความชุดเดียวกันได้ ไม่ต้องพิมพ์ซ้ำ</p>' +
      '<p class="noteact">' +
        '<button class="btn btn-soft btn-sm" type="button" id="useFormula">' +
          'ใช้ข้อความชุดเดียวกับ ' + esc(who) + '</button>' +
      '</p>' +
    '</div></div>';
}

// กล่องบอกว่าการแก้ไขกระทบผลิตภัณฑ์ใดบ้าง
function sharedNote(list, head) {
  return '<div class="notice is-warn">' + svg('warning') + '<div>' +
      '<p><b>' + head + '</b> การแก้ไขจะมีผลกับรายการต่อไปนี้</p>' +
      '<ul>' + list.map(b => '<li>' + esc(brandTh(b)) + '</li>').join('') + '</ul>' +
    '</div></div>';
}

// ช่องว่างสำหรับกล่องแจ้ง · วาดใหม่ได้โดยไม่ต้องวาดทั้งฟอร์ม
function noteSlot(f) {
  const others = sharedWith(f);
  let note = '';

  if (f.mid) {
    // ผูกกับข้อมูลชุดเดิมแล้ว แก้ช่องข้อความแล้วยี่ห้ออื่นเปลี่ยนตาม ต้องบอกให้ชัด
    if (others.length)
      note = sharedNote(others, 'ยาตัวนี้ใช้ข้อมูลร่วมกับอีก ' + others.length + ' ผลิตภัณฑ์');
  } else if (formulaHit(f)) {
    // ปกติระบบเติมให้เองตั้งแต่พิมพ์ตัวยาครบ จะมาถึงตรงนี้เฉพาะตอนพิมพ์ข้อความไว้ก่อนแล้ว
    note = offerNote(formulaHit(f));
  }
  return '<div id="noteSlot">' + note + '</div>';
}

// วาดเฉพาะส่วนที่เปลี่ยนตามตัวยา · ห้ามวาดทั้งฟอร์ม ไม่งั้นปุ่มบันทึกหลุดตอนกด
function refreshIng() {
  if (!form) return;
  formRead();

  // อัปเดตแค่บรรทัดสรุปใต้แต่ละแถว ห้ามวาดช่องกรอกใหม่ ไม่งั้นที่พิมพ์ค้างอยู่จะหลุด
  (form.ingRows || []).forEach((r, i) => {
    const el = $('#ingx_' + i);
    if (el) el.innerHTML = rowNote(form, i);
  });

  const slot = $('#noteSlot');
  if (slot) slot.outerHTML = noteSlot(form);

  paintIcons($('#panel'));
  bindNote();
}


/*  จับคู่ข้อมูลที่ใช้ร่วมกัน · ตัวยาสำคัญ + ปริมาณตัวยา + รูปแบบยา  */

// ปรับข้อความก่อนเทียบ · ไม่สนตัวพิมพ์เล็กใหญ่และช่องว่างซ้ำ
const normStr = s => String(s == null ? '' : s).trim().toLowerCase().replace(/\s+/g, ' ');

const ingKey = (ids, str) => ids.slice().sort((a, b) => a - b)
  .map(id => id + ':' + normStr(str && str[id])).join(',');

// กุญแจแบบเดียวกัน แต่สร้างจาก ingredients ที่ API ส่งมา
const ingKeyOf = list => ingKey((list || []).map(g => g.id),
  (list || []).reduce((o, g) => (o[g.id] = g.strength, o), {}));

const sameForm = (a, b) => String(a || '').toUpperCase() === String(b || '').toUpperCase();

// กุญแจของข้อมูลแต่ละชุด · ชุดที่ไม่มีตัวยาเก็บเป็น -
let MEDKEY = {};

// คืนไอดีชุดข้อมูลที่ตรงกับที่กรอกอยู่ ถ้าไม่เจอคืน 0
function formulaHit(f) {
  if (!f.dosage_form || !f.ingIds.length || f.ingMiss) return 0;
  const key = ingKey(f.ingIds, f.ingStr);
  const hit = MEDS.find(m => m.id !== f.mid && sameForm(m.dosage_form, f.dosage_form) &&
    MEDKEY[m.id] && MEDKEY[m.id] === key);
  return hit ? hit.id : 0;
}

// ดึงตัวยาของชุดข้อมูลที่รูปแบบยาตรงกัน แล้ววาดส่วนที่เกี่ยวข้องใหม่
async function scanFormula() {
  const f = form;
  if (!f) return;
  formRead();
  if (!f.dosage_form) return refreshIng();

  const need = MEDS.filter(m => sameForm(m.dosage_form, f.dosage_form) && !MEDKEY[m.id]);
  if (!need.length) return refreshIng();

  const got = await Promise.all(need.map(m =>
    api('/admin/medicines/' + m.id).catch(() => null)));
  got.forEach((med, i) => {
    MEDKEY[need[i].id] = (med ? ingKeyOf(med.ingredients) : '') || '-';
  });

  if (form !== f) return;   // ปิดฟอร์มหรือเปิดตัวอื่นไปแล้วระหว่างรอ
  refreshIng();
}

// ใช้ข้อความชุดเดียวกับยาที่เจอ
async function useFormula() {
  formRead();
  const f = form;
  const id = formulaHit(f);
  if (!id) return;

  if (LKEYS.some(k => hasText(f[k]))) {
    const ok = await confirmBox('ใช้ข้อความชุดเดียวกัน',
      'ข้อบ่งใช้ วิธีใช้ และคำเตือน ที่กรอกไว้จะถูกแทนที่ด้วยข้อความของยาตัวนั้น',
      'ใช้ข้อความชุดเดียวกัน');
    if (!ok || form !== f) return;
  }

  let med;
  try {
    med = await api('/admin/medicines/' + id);
  } catch (err) {
    return toast(err.message, true);
  }
  if (form !== f) return;

  const got = newForm(null, med);
  ['name_th', 'category_id'].forEach(k => { f[k] = got[k]; });
  LKEYS.forEach(k => { f[k] = got[k].slice(); });

  // รับปริมาณตามที่ชุดนั้นสะกดไว้ ไม่งั้นบันทึกครั้งต่อไปจะไปแก้ค่าของเขาโดยไม่ตั้งใจ
  f.ingRows = got.ingRows.map(r => ({ nm: r.nm, st: r.st }));
  f.ingIds = got.ingIds.slice();
  f.ingStr = Object.assign({}, got.ingStr);
  f.ingMiss = 0;

  f.mid = med.id;
  f.base = medBase(med);

  // วาดใหม่ทั้งฟอร์ม · จำช่องที่กำลังกรอกไว้ ไม่งั้นโฟกัสหลุดกลางทาง
  const at = document.activeElement && document.activeElement.id;
  render();
  const back = at && document.getElementById(at);
  if (back) back.focus();
}

// เจอชุดข้อมูลที่ตัวยา ปริมาณ และรูปแบบยาตรงกัน ดึงข้อความมาใส่ให้เลย ไม่ต้องถาม
// เติมเฉพาะตอนสามช่องยังว่าง จะได้ไม่ทับสิ่งที่พิมพ์ไปแล้ว
function autoShare() {
  const f = form;
  if (!f || f.mid || !formulaHit(f)) return;
  if (LKEYS.some(k => hasText(f[k]))) return;
  useFormula();
}


/*  ฟอร์มยา · หน้าเดียวจบ เรียงตามที่อ่านได้จากกล่องยา  */

function productForm() {
  const f = form;

  return '<div class="formgrid two">' +
      field('brand_name', 'ชื่อผลิตภัณฑ์ยา (Trade Name) *', f.brand_name,
        'ตามที่ปรากฏบนฉลาก') +
      field('name_th', 'ชื่อสามัญ (Generic Name) *', f.name_th,
        'ระบบสร้างให้จากตัวยาสำคัญโดยอัตโนมัติ · แก้ไขได้') +
    '</div>' +

    '<div class="formgrid three">' +
      fieldSelect('category_id', 'หมวดหมู่ *', f.category_id, CATS.map(c => [c.id, c.name_th]),
        'ตามประกาศยาสามัญประจำบ้าน อย.') +
      field('reg_no', 'เลขทะเบียน อย. (Reg. No.) *', f.reg_no, 'ตัวอย่าง 1A 844/39') +
      fieldSelect('dosage_form', 'รูปแบบยา *', f.dosage_form, formOptions(),
        'แสดงผลเป็นภาษาไทยในหน้าค้นหาของผู้ใช้') +
    '</div>' +

    ingBlock(f) +

    '<div class="formgrid two">' +
      field('licensee', 'ผู้ผลิต / จำหน่าย *', f.licensee, 'ผู้รับอนุญาตตามที่ระบุบนฉลาก') +
      field('legal_type', 'ประเภทตามกฎหมาย *', f.legal_type) +
    '</div>' +

    noteSlot(f) +

    LKEYS.map(k => listField(k, f)).join('') +
    formAct('บันทึก');
}


/*  เปิดฟอร์ม  */

function openNew() {
  if (editing === 'new') return closeForm();
  leaveList();
  editing = 'new';
  form = newForm(null, null);
  render();
  markClean();
  window.scrollTo(0, 0);
}

async function openEdit(id) {
  if (editing === 'p-' + id) return closeForm();
  const b = BRANDS.find(x => x.id === id);
  if (!b) return;

  leaveList();
  editing = 'p-' + id;
  form = null;
  render();
  window.scrollTo(0, 0);   // ฟอร์มแทนที่รายการทั้งหน้า ต้องเริ่มอ่านจากหัวฟอร์ม

  let med;
  try {
    med = await api('/admin/medicines/' + b.medicine_id);
  } catch (err) {
    if (!token()) return;
    toast(err.message, true);
    editing = '';
    return render();
  }
  if (editing !== 'p-' + id) return;   // กดไปที่อื่นระหว่างรอ
  form = newForm(b, med);
  form.base = medBase(med);
  render();
  markClean();
}


/*  ตรวจและบันทึก  */

function checkMed(f) {
  let ok = true;

  (f.ingRows || []).forEach((r, i) => {
    const x = rowInfo(r);

    // กรอกปริมาณไว้แต่ไม่มีชื่อตัวยา คือกรอกไม่ครบ ส่วนแถวว่างทั้งแถวปล่อยผ่าน
    if (!x) {
      ok = (String(r.st || '').trim()
        ? setErr('in_' + i, 'ระบุชื่อตัวยา') : setErr('in_' + i, '')) && ok;
      return;
    }
    setErr('in_' + i, '');
    if (x.id) return;

    // ตัวยาที่ยังไม่มีในระบบ ต้องได้ชื่อครบสองภาษาก่อน ไม่งั้นระบบสแกนจับคู่ไม่ได้
    const d = (f.newIng || {})[nameKey(x.name)] || {};
    if (!(x.th || String(d.th || '').trim()))
      ok = setErr('ne_th_' + i, 'ระบุชื่อภาษาไทย') && ok;
    if (!(x.en || String(d.en || '').trim()))
      ok = setErr('ne_en_' + i, 'ระบุชื่อภาษาอังกฤษ') && ok;
  });

  if (!rowsInfo(f).length) ok = setErr('in_0', 'ระบุตัวยาสำคัญอย่างน้อยหนึ่งตัว') && ok;

  ok = req('name_th', f.name_th, 'ระบุชื่อสามัญ') && ok;
  ok = req('category_id', f.category_id, 'เลือกหมวดหมู่') && ok;
  ok = req('dosage_form', f.dosage_form, 'เลือกรูปแบบยา') && ok;
  // ข้อความที่กรอกเป็นข้อ ๆ · ขอแค่มีข้อที่ไม่ว่างอย่างน้อยหนึ่งข้อ แจ้งที่ข้อแรก
  ok = setErr('indications_0',
    hasText(f.indications) ? '' : 'ระบุข้อบ่งใช้อย่างน้อยหนึ่งข้อ') && ok;
  ok = setErr('dosage_instructions_0',
    hasText(f.dosage_instructions) ? '' : 'ระบุวิธีใช้อย่างน้อยหนึ่งข้อ') && ok;
  return ok;
}

// ส่งข้อมูลส่วนที่ใช้ร่วมกันได้ · เฉพาะตอนเปลี่ยนจริง
async function saveMedPart(f) {
  const body = medBody(f);
  if (!f.mid) {
    const made = await send('/admin/medicines', 'POST', body);
    f.mid = made.id;
    MEDS.push({ id: made.id, name_th: made.name_th,
                category: made.category || catName(f.category_id),
                dosage_form: made.dosage_form, brand_count: 0 });
  } else if (JSON.stringify(body) !== f.base) {
    const res = await send('/admin/medicines/' + f.mid, 'PUT', body);
    const row = medRow(f.mid);
    if (row) {
      row.name_th = (res && res.name_th) || f.name_th;
      row.category = (res && res.category) || catName(f.category_id);
      row.dosage_form = (res && res.dosage_form) || f.dosage_form;
    }
  }
  f.base = JSON.stringify(body);
  MEDKEY[f.mid] = ingKey(f.ingIds, f.ingStr) || '-';   // แคชต้องตามของจริง ไม่งั้นจับคู่ผิดรอบหน้า
}

function saveProduct(btn) {
  formRead();
  const f = form;

  let ok = req('brand_name', f.brand_name, 'ระบุชื่อผลิตภัณฑ์ยา');
  ok = checkMed(f) && ok;

  ok = req('licensee', f.licensee, 'ระบุผู้ผลิตหรือผู้จำหน่าย') && ok;
  ok = req('legal_type', f.legal_type, 'ระบุประเภทตามกฎหมาย') && ok;

  if (!f.reg_no) ok = req('reg_no', '', 'ระบุเลขทะเบียน อย.') && ok;
  else if (!RE_REGNO.test(f.reg_no))
    ok = setErr('reg_no', 'รูปแบบไม่ถูกต้อง ตัวอย่าง 1A 844/39') && ok;
  else if (BRANDS.some(x => x.id !== f.bid && regKey(x.reg_no) === regKey(f.reg_no)))
    ok = setErr('reg_no', 'เลขทะเบียนนี้มีอยู่แล้ว') && ok;
  else setErr('reg_no', '');
  if (!ok) return focusBad();

  return apply(btn, async () => {
    await makeNewIngs(f);     // ตัวยาใหม่ต้องมีไอดีก่อน ถึงจะผูกเข้ากับยาได้
    await saveMedPart(f);

    const bb = { medicine_id: f.mid, brand_name: f.brand_name, reg_no: f.reg_no,
                 legal_type: f.legal_type, licensee: f.licensee };
    const b = f.bid ? BRANDS.find(x => x.id === f.bid) : null;
    const was = b ? b.medicine_id : 0;
    try {
      if (b) Object.assign(b, await send('/admin/brands/' + b.id, 'PUT', bb));
      else BRANDS.push(await send('/admin/brands', 'POST', bb));
    } catch (err) {
      throw new Error('บันทึกข้อมูลยาแล้ว แต่บันทึกชื่อผลิตภัณฑ์ไม่สำเร็จ · ' + err.message);
    }

    // อัปเดตจำนวนผลิตภัณฑ์ของชุดข้อมูลเดิมและชุดใหม่
    [was, f.mid].forEach(mid => {
      const row = mid && medRow(mid);
      if (row) row.brand_count = brandCount(mid);
    });
    form = null;
  }, f.bid ? 'บันทึกแล้ว' : 'เพิ่มรายการแล้ว');
}


/*  การลบ  */

// ลบผลิตภัณฑ์ · ถ้าไม่มียี่ห้ออื่นใช้ข้อมูลชุดนั้นแล้ว ลบชุดข้อมูลตามไปด้วย
async function delProduct(id) {
  const b = BRANDS.find(x => x.id === id);
  if (!b) return;

  const mid = b.medicine_id;
  const others = brandsOf(mid).filter(x => x.id !== id);

  const ok = await confirmBox('ยืนยันการลบ',
    'ลบ ' + brandTh(b) + ' เลขทะเบียน ' + b.reg_no + ' ออกจากฐานข้อมูล' +
    (others.length
      ? ' · ยาอีก ' + others.length + ' ยี่ห้อที่ใช้ข้อมูลร่วมกันยังอยู่ครบ'
      : ' พร้อมข้อบ่งใช้ วิธีใช้ และคำเตือนของยาตัวนี้ เพราะไม่มียี่ห้ออื่นใช้อยู่') +
    ' การลบนี้ไม่สามารถย้อนกลับได้', 'ลบ');
  if (!ok) return;

  try {
    await api('/admin/brands/' + id, { method: 'DELETE' });
  } catch (err) {
    if (token()) toast(err.message, true);
    return;
  }
  BRANDS = BRANDS.filter(x => x.id !== id);

  if (!others.length && mid) {
    // ลบยี่ห้อสำเร็จไปแล้ว ถ้าลบชุดข้อมูลไม่ผ่านก็ไม่ต้องขัดจังหวะ
    try {
      await api('/admin/medicines/' + mid, { method: 'DELETE' });
      MEDS = MEDS.filter(x => x.id !== mid);
      delete MEDKEY[mid];
    } catch (err) {}
  } else {
    const row = medRow(mid);
    if (row) row.brand_count = brandCount(mid);
  }

  toast('ลบ ' + brandTh(b) + ' แล้ว');
  render();
}


/*  ผูกปุ่มที่ใช้ร่วมกัน  */

function bindNav() {
  // ผูกที่นี่ ไม่ใช่ที่ bindFormBtns() เพราะต้องกดได้ตั้งแต่ตอนที่ยังรอข้อมูลจาก API
  const back = $('#backList');
  if (back) back.addEventListener('click', async () => {
    if (await leaveForm()) closeForm();
  });

  const home = $('#backHome');
  if (home) home.addEventListener('click', () => goView('home'));
}

// คืนโฟกัสและตำแหน่งเคอร์เซอร์หลังวาดใหม่
function bindSearch() {
  const sel = $('#adCat');
  if (sel) sel.addEventListener('change', e => {
    cat = e.target.value;
    render();
  });

  const box = $('#adQ');
  if (!box) return;
  box.addEventListener('input', e => {
    formRead();
    query = e.target.value;
    render();
    const el = $('#adQ');
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  });
}

// ช่องกรอกและปุ่มของแต่ละแถวตัวยา · ผูกใหม่ทุกครั้งที่วาดรายการแถวใหม่
function bindIngRows() {
  $$('#panel [data-row]').forEach(li => {
    const i = li.dataset.row;

    const nm = $('#fl-in_' + i);
    if (nm) {
      nm.setAttribute('list', 'ingNames');   // ช่วยเติมชื่อให้ตรงกับที่มีในระบบ
      // ใช้ change ห้ามใช้ input ไม่งั้นวาดใหม่ทุกตัวอักษร
      nm.addEventListener('change', () => scanFormula().then(autoShare));
    }

    const st = $('#fl-st_' + i);
    if (st) st.addEventListener('change', () => scanFormula().then(autoShare));

    const del = $('#panel [data-ingdel="' + i + '"]');
    if (del) del.addEventListener('click', () => {
      formRead();
      form.ingRows.splice(+i, 1);
      if (!form.ingRows.length) form.ingRows.push({ nm: '', st: '' });
      redrawIng();
      scanFormula().then(autoShare);
    });
  });
}

// ปุ่มในกล่องแจ้ง · วาดใหม่ทุกครั้งที่ตัวยาเปลี่ยน จึงต้องผูกใหม่ทุกครั้ง
function bindNote() {
  const useBtn = $('#useFormula');
  if (useBtn) useBtn.addEventListener('click', useFormula);
}

function bindFormBtns(saveFn) {
  const save = $('#adSave');
  if (save) save.addEventListener('click', () => saveFn(save));
  const cancel = $('#adCancel');
  if (cancel) cancel.addEventListener('click', closeForm);
}


/*  เริ่มทำงาน  */

paintIcons();
syncThemeBtn();

$('#loginForm').addEventListener('submit', doLogin);
$('#logoutBtn').addEventListener('click', doLogout);
$('#usrBtn').addEventListener('click', e => { e.stopPropagation(); openUsr(); });
document.addEventListener('click', e => {
  if (!$('#usrMenu').hidden && !$('#usrWrap').contains(e.target)) openUsr(false);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || $('#usrMenu').hidden) return;
  openUsr(false);
  $('#usrBtn').focus();
});
$('#themeBtn').addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));

$('#adPassShow').addEventListener('click', () => {
  const p = $('#adPass'), b = $('#adPassShow');
  const show = p.type === 'password';
  p.type = show ? 'text' : 'password';
  b.setAttribute('aria-pressed', String(show));
  b.setAttribute('aria-label', show ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน');
});

// มีบัตรผ่านค้างอยู่ก็ใช้ต่อได้เลย
if (token()) {
  showLoad('กำลังโหลดข้อมูลยา');
  openApp().finally(hideLoad);
}
else $('#adUser').focus();
