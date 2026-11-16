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
let view    = 'home';   // หน้าที่เปิดอยู่ 'home' 'list' 'formula' หรือ 'ingredient'
let editing = '';       // รายการที่กำลังแก้
let query   = '';       // คำค้น
let form    = null;     // ค่าที่กรอกค้างในฟอร์ม
let ingEdit = 0;        // รหัสตัวยาที่กำลังแก้ชื่ออยู่ 0 คือไม่ได้แก้
let listY   = 0;        // ตำแหน่งที่เลื่อนค้างไว้ในรายการ ก่อนเปิดฟอร์ม
let formStart = '';     // สภาพฟอร์มตอนเพิ่งเปิด ไว้ดูว่ามีอะไรถูกแก้แล้วหรือยัง

// เปิดส่วนจัดการหลังเข้าสู่ระบบ
async function openApp() {
  $('#viewLogin').hidden = true;
  $('#viewApp').hidden = false;
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

  view = 'home';
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

// ช่องกรอกหลายบรรทัด
function fieldArea(name, label, value, hint, rows) {
  return '<div class="field" data-fl="' + name + '">' +
    lbl(name, label) +
    '<textarea id="fl-' + name + '" rows="' + (rows || 5) + '"' + reqAttr(label) + ' ' +
      'aria-describedby="fh-' + name + ' fe-' + name + '">' + esc(value == null ? '' : value) + '</textarea>' +
    (hint ? '<p class="hint" id="fh-' + name + '">' + esc(hint) + '</p>' : '') +
    '<p class="field-err" id="fe-' + name + '" hidden></p>' +
  '</div>';
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
  ingEdit = 0;
  toast(okText);
  render();
}


/*  หน้าจัดการ · สองแท็บ  */

// วาดหน้าตามแท็บที่เปิดอยู่
function render() {
  if (view === 'home') homePage();
  else if (view === 'formula') formulaPage();
  else if (view === 'ingredient') ingredientPage();
  else { view = 'list'; productPage(); }
  paintIcons($('#panel'));
}

// แถบสลับแท็บ
function navBar(now) {
  const tab = (key, ico, label, n) =>
    '<button class="adtab" type="button" data-go="' + key + '" aria-pressed="' +
      (now === key ? 'true' : 'false') + '">' + svg(ico) + esc(label) +
      (n === undefined ? '' : '<span class="tally">' + n + '</span>') + '</button>';
  return '<nav class="adtabs" aria-label="หมวดข้อมูลที่จัดการ">' +
    tab('home', 'home', 'หน้าแรก') +
    tab('list', 'pill', 'รายการยา', BRANDS.length) +
    tab('formula', 'flask', 'ข้อมูลที่ใช้ร่วมกัน', MEDS.length) +
    tab('ingredient', 'atom', 'ตัวยาสำคัญ', INGS.length) +
  '</nav>';
}

async function goTab(v) {
  if (view === v) return;
  if (!await leaveForm()) return;
  view = v;
  editing = '';
  form = null;
  ingEdit = 0;
  query = '';
  render();
  window.scrollTo(0, 0);
  if (v === 'ingredient') refreshIngs();
}

function closeForm() {
  editing = '';
  form = null;
  ingEdit = 0;
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


/*  หน้าแรก  */

// ไอคอนประจำการ์ด · line คือเส้น hit คือส่วนทึบสีเน้น
const HICO = {

  // แผงยา
  meds: {
    line: '<rect x="10" y="5" width="28" height="38" rx="6"/>' +
          '<circle cx="18" cy="15" r="3.6"/><circle cx="18" cy="24" r="3.6"/>' +
          '<circle cx="18" cy="33" r="3.6"/><circle cx="30" cy="24" r="3.6"/>' +
          '<circle cx="30" cy="33" r="3.6"/>',
    hit:  '<circle cx="30" cy="15" r="3.6"/>',
  },

  // โกร่งบดยากับสาก
  formula: {
    line: '<path d="M19 6h10"/>' +
          '<path d="M21 6v12L12.4 36a3.5 3.5 0 0 0 3.1 5.2h17a3.5 3.5 0 0 0 3.1-5.2L27 18V6"/>' +
          '<path d="M16.3 27h15.4"/>',
    hit:  '<circle cx="21" cy="33.5" r="1.9"/><circle cx="27.5" cy="36.5" r="1.4"/>' +
          '<circle cx="24.5" cy="30.5" r="1.1"/>',
  },

  // โครงสร้างโมเลกุล
  ing: {
    line: '<path d="M24 9 37 16.5v15L24 39l-13-7.5v-15L24 9Z"/>' +
          '<circle cx="24" cy="9" r="2.5"/><circle cx="37" cy="16.5" r="2.5"/>' +
          '<circle cx="37" cy="31.5" r="2.5"/><circle cx="24" cy="39" r="2.5"/>' +
          '<circle cx="11" cy="31.5" r="2.5"/>',
    hit:  '<circle cx="11" cy="16.5" r="3.4"/>',
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
      homeCard('list', 'is-hero', 'meds', 'รายการยา',
        'ผลิตภัณฑ์ที่ผู้ใช้เห็นในหน้าค้นหา ชื่อการค้าและเลขทะเบียน',
        BRANDS.length + ' รายการ') +
      homeCard('formula', '', 'formula', 'ข้อมูลที่ใช้ร่วมกัน',
        'ข้อบ่งใช้ วิธีใช้ และคำเตือน ของยาที่ตัวยาตรงกัน · ปกติไม่ต้องเข้ามาที่นี่',
        MEDS.length + ' ชุด') +
      homeCard('ingredient', '', 'ing', 'ตัวยาสำคัญ',
        'ชื่อตัวยาและชื่อเรียกอื่น ที่ระบบสแกนใช้จับคู่กับฉลากยา',
        INGS.length + ' ตัวยา') +
    '</div>';

  bindNav();
}

function homeCard(key, tone, ico, title, desc, n) {
  return '<button class="hcard' + (tone ? ' ' + tone : '') + '" type="button" ' +
      'data-go="' + key + '">' +
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
    '</span>' +
  '</button>';
}

/*  แท็บรายการยา  */

// ค้นหาในแท็บรายการยา
function searchList() {
  const q = query.trim().toLowerCase();
  const qReg = regKey(query);
  const list = BRANDS.filter(b => {
    if (!q) return true;
    const med = medRow(b.medicine_id);
    const hay = (b.brand_name + ' ' + b.licensee + ' ' +
      (med ? med.name_th + ' ' + (med.category || '') : '')).toLowerCase();
    if (hay.includes(q)) return true;
    return qReg.length > 2 && regKey(b.reg_no).includes(qReg);
  });
  return list.sort((a, b) => brandTh(a).localeCompare(brandTh(b), 'th'));
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
    navBar('list') +

    (pane ||
      '<div class="adbar">' +
        '<span class="srch">' + svg('search') +
          '<input type="search" id="adQ" value="' + esc(query) + '" ' +
          'placeholder="ค้นหาชื่อยา เลขทะเบียน ผู้ผลิต หมวดหมู่" ' +
          'aria-label="ค้นหายาในระบบ"></span>' +
        '<button class="btn btn-primary" type="button" id="addBtn">' +
          svg('plus') + 'เพิ่มยาใหม่</button>' +
        '<span class="count">' + list.length + ' จาก ' + BRANDS.length + ' รายการ</span>' +
      '</div>' +

      (list.length
        ? '<ul class="druglist">' + list.map(productRow).join('') + '</ul>'
        : '<div class="state"><div class="state-ico">' + svg('search') + '</div>' +
          '<h2>' + (query ? 'ไม่พบรายการที่ค้นหา' : 'ยังไม่มีข้อมูลยาในระบบ') + '</h2>' +
          '<p>' + (query ? 'โปรดตรวจสอบคำค้นอีกครั้ง'
                         : 'เริ่มต้นด้วยการเพิ่มรายการแรก') + '</p></div>'));

  bindNav();
  bindSearch();
  const add = $('#addBtn');
  if (add) add.addEventListener('click', openNew);
  $$('#panel [data-edit]').forEach(b =>
    b.addEventListener('click', () => openEdit(+b.dataset.edit)));
  $$('#panel [data-del]').forEach(b =>
    b.addEventListener('click', () => delProduct(+b.dataset.del)));

  if (!form) return;
  // เปลี่ยนรูปแบบยาแล้วต้องหาสูตรใหม่ เพราะรูปแบบยาเป็นส่วนหนึ่งของตัวระบุสูตร
  const df = $('#fl-dosage_form');
  if (df) df.addEventListener('change', () => { formRead(); render(); });

  const useBtn = $('#useFormula');
  if (useBtn) useBtn.addEventListener('click', useFormula);

  const soloBtn = $('#soloFormula');
  if (soloBtn) soloBtn.addEventListener('click', () => {
    formRead();
    form.solo = true;
    form.askErr = false;
    render();
  });

  const undoBtn = $('#undoSolo');
  if (undoBtn) undoBtn.addEventListener('click', () => {
    formRead();
    form.solo = false;
    render();
  });

  const edShared = $('#editShared');
  if (edShared) edShared.addEventListener('click', () => {
    const id = form.mid;
    goTab('formula');
    openFormula(id);
  });

  bindIngPicker();
  bindFormBtns(saveProduct);
  scanFormula();
}

// หนึ่งแถวผลิตภัณฑ์ในรายการ
function productRow(b) {
  const med = medRow(b.medicine_id);

  return '<li class="drugrow is-static">' +
    '<span class="drugrow-ico">' + svg('pill') + '</span>' +
    '<span class="drugrow-b">' +
      '<b>' + esc(brandTh(b)) + '</b>' +
      '<span class="sub">' + esc(b.licensee) + '</span>' +
      '<span class="meta">' +
        (med ? '<span class="pill pill-red">' + esc(shortCat(med.category) || 'ยังไม่ระบุหมวด') +
               '</span>' : '') +
        (med && med.dosage_form
          ? '<span class="tally">' + svg('flask') + esc(formTh(med.dosage_form)) + '</span>' : '') +
        '<span class="tally">' + svg('db') + 'เลขทะเบียน ' + esc(b.reg_no) + '</span>' +
      '</span>' +
    '</span>' +
    (editing ? '' :
      '<span class="subrow-act">' +
        '<button class="iconact" type="button" data-edit="' + b.id + '" ' +
          'aria-label="แก้ไข ' + esc(brandTh(b)) + '">' + svg('pencil') + '</button>' +
        '<button class="iconact is-danger" type="button" data-del="' + b.id + '" ' +
          'aria-label="ลบ ' + esc(brandTh(b)) + '">' + svg('trash') + '</button>' +
      '</span>') +
  '</li>';
}


/*  แท็บสูตรตำรับ · ตาราง medicines  */

function searchFormula() {
  const q = query.trim().toLowerCase();
  const list = MEDS.filter(m => {
    if (!q) return true;
    const hay = (m.name_th + ' ' + (m.category || '') + ' ' + formTh(m.dosage_form) + ' ' +
      brandsOf(m.id).map(b => b.brand_name).join(' ')).toLowerCase();
    return hay.includes(q);
  });
  return list.slice().sort((a, b) => String(a.name_th).localeCompare(String(b.name_th), 'th'));
}

function formulaPage() {
  const list = searchFormula();
  const m = editing.indexOf('f-') === 0 ? medRow(+editing.slice(2)) : null;

  const pane = m
    ? formPane('pencil', 'แก้ไขสูตร ' + m.name_th, form ? formulaForm() : skelBox())
    : '';

  $('#panel').innerHTML =
    navBar('formula') +

    (pane ||
      '<div class="adbar">' +
        '<span class="srch">' + svg('search') +
          '<input type="search" id="adQ" value="' + esc(query) + '" ' +
          'placeholder="ค้นหาชื่อสูตร หมวดหมู่ หรือชื่อผลิตภัณฑ์" ' +
          'aria-label="ค้นหาข้อมูลที่ใช้ร่วมกัน"></span>' +
        '<span class="count">' + list.length + ' จาก ' + MEDS.length + ' ชุด</span>' +
      '</div>' +

      (list.length
        ? '<ul class="druglist">' + list.map(formulaRow).join('') + '</ul>'
        : '<div class="state"><div class="state-ico">' + svg('search') + '</div>' +
          '<h2>' + (query ? 'ไม่พบข้อมูลที่ค้นหา' : 'ยังไม่มีข้อมูลชุดใดในระบบ') + '</h2>' +
          '<p>' + (query ? 'โปรดตรวจสอบคำค้นอีกครั้ง'
                         : 'ข้อมูลชุดนี้เกิดขึ้นเองเมื่อเพิ่มยาในแท็บรายการยา') + '</p></div>'));

  bindNav();
  bindSearch();
  $$('#panel [data-fedit]').forEach(b =>
    b.addEventListener('click', () => openFormula(+b.dataset.fedit)));
  $$('#panel [data-fdel]').forEach(b =>
    b.addEventListener('click', () => delFormula(+b.dataset.fdel)));

  if (!form) return;
  bindIngPicker();
  bindFormBtns(saveFormula);
}

// แถวในรายการอย่างเดียว · ฟอร์มแก้ไขไปอยู่ที่ formPane() ใน formulaPage() แล้ว
function formulaRow(m) {
  const n = brandCount(m.id);

  return '<li class="drugrow is-static">' +
    '<span class="drugrow-ico">' + svg('flask') + '</span>' +
    '<span class="drugrow-b">' +
      '<b>' + esc(m.name_th) + '</b>' +
      '<span class="meta">' +
        '<span class="pill pill-red">' + esc(shortCat(m.category) || 'ยังไม่ระบุหมวด') + '</span>' +
        (m.dosage_form
          ? '<span class="tally">' + svg('pill') + esc(formTh(m.dosage_form)) + '</span>' : '') +
        '<span class="tally">' + svg('tag') + n + ' ผลิตภัณฑ์</span>' +
      '</span>' +
    '</span>' +
    (editing ? '' :
      '<span class="subrow-act">' +
        '<button class="iconact" type="button" data-fedit="' + m.id + '" ' +
          'aria-label="แก้ไขสูตร ' + esc(m.name_th) + '">' + svg('pencil') + '</button>' +
        '<button class="iconact is-danger" type="button" data-fdel="' + m.id + '" ' +
          'aria-label="ลบสูตร ' + esc(m.name_th) + '">' + svg('trash') + '</button>' +
      '</span>') +
  '</li>';
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
    indications: m ? m.indications : '',
    dosage_instructions: m ? m.dosage_instructions : '',
    warnings:    m ? unline(m.warnings || []) : '',
    ingIds:      m ? (m.ingredients || []).map(g => g.id) : [],
    // ปริมาณตัวยารายตัว เก็บเป็น ไอดีตัวยา -> ข้อความ เช่น 7 -> '500 mg'
    ingStr:      m ? (m.ingredients || []).reduce(
                   (o, g) => (o[g.id] = g.strength || '', o), {}) : {},
    // ตอบแล้วว่ายาตัวนี้ไม่เหมือนสูตรที่เจอ จะกรอกข้อความเอง
    solo:        false,
    // กดบันทึกแล้วแต่ยังไม่ได้ตอบ ใช้ค้างข้อความเตือนไว้ในกล่อง
    askErr:      false,
    base:        '',
  };
}

// ช่องของตาราง medicines
function medBody(f) {
  return {
    category_id: +f.category_id,
    name_th: f.mid ? f.name_th : autoName(f),
    dosage_form: f.dosage_form,
    indications: f.indications,
    dosage_instructions: f.dosage_instructions,
    warnings: lines(f.warnings),
    // ต้องส่ง ingredients ไม่ใช่ ingredient_ids
    ingredients: f.ingIds.map(id => ({
      ingredient_id: id,
      strength: String((f.ingStr || {})[id] || '').trim(),
    })),
  };
}

// ตั้งชื่อสูตรจากตัวยาสำคัญ ปริมาณตัวยา และรูปแบบยา 
function autoName(f) {
  const names = f.ingIds.map(id => {
    const nm = ingLabel(INGS.find(g => g.id === id));
    if (!nm) return '';
    const st = String((f.ingStr || {})[id] || '').trim();
    return st ? nm + ' ' + st : nm;
  }).filter(Boolean);
  const fm = formTh(f.dosage_form);
  const base = names.join(' + ') + (fm ? ' · ' + fm : '');

  const taken = MEDS.some(m => m.id !== f.mid && m.name_th === base);
  const who = String(f.brand_name || '').trim();
  return taken && who ? base + ' (เฉพาะ ' + who + ')' : base;
}

const medBase = m => JSON.stringify(medBody(newForm(null, m)));

// เก็บค่าที่พิมพ์ไว้ก่อนวาดหน้าใหม่
function formRead() {
  if (!form) return;
  ['brand_name', 'reg_no', 'legal_type', 'licensee', 'category_id', 'name_th',
   'dosage_form', 'indications', 'dosage_instructions', 'warnings',
   'gi_th', 'gi_en', 'gi_alias'].forEach(n => {
    if ($('#fl-' + n)) form[n] = fv(n);
  });

  // ช่องปริมาณมีกี่ช่องขึ้นกับว่าเลือกตัวยาไว้กี่ตัว
  if (!form.ingStr) form.ingStr = {};
  (form.ingIds || []).forEach(id => {
    if ($('#fl-st_' + id)) form.ingStr[id] = fv('st_' + id).replace(/\s+/g, ' ');
  });
}

// ช่องข้อความของสูตร ใช้ร่วมกันทั้งสองฟอร์ม · ตัวยาสำคัญแยกไปที่ ingBlock()
function textFields(f) {
  return fieldArea('indications', 'ข้อบ่งใช้และสรรพคุณ *', f.indications,
      'หลายข้อให้ขึ้นบรรทัดใหม่') +
    fieldArea('dosage_instructions', 'วิธีใช้และขนาดรับประทาน *', f.dosage_instructions,
      'ระบุทั้งผู้ใหญ่และเด็ก') +
    fieldArea('warnings', 'คำเตือนและข้อควรระวังสำคัญ', f.warnings,
      'หนึ่งข้อต่อหนึ่งบรรทัด');
}

// ช่องปริมาณตัวยา · ชื่อช่องคือ st_<ไอดีตัวยา>
const strField = (f, g) =>
  '<div class="stf">' +
    field('st_' + g.id, 'ปริมาณตัวยา', (f.ingStr || {})[g.id] || '',
      'ตามที่พิมพ์บนกล่อง เช่น 500 mg · เว้นว่างได้') +
  '</div>';

// ตัวยาสำคัญ
function ingBlock(f) {
  const picked = f.ingIds.map(id => INGS.find(g => g.id === id)).filter(Boolean);
  const left = INGS.filter(g => f.ingIds.indexOf(g.id) < 0);

  // แถวที่กดแก้อยู่ เปลี่ยนเป็นช่องกรอกแทน
  const editRow = g =>
    '<li class="subrow is-edit">' +
      field('ed_th', 'ชื่อตัวยา (ไทย)', g.name_th || '', '') +
      field('ed_en', 'ชื่อตัวยา (อังกฤษ)', g.name_en || '', '') +
      field('ed_alias', 'ชื่อเรียกอื่น', (g.aliases || []).join(', '),
        'คั่นด้วยจุลภาค · ระบบสแกนใช้จับคู่ฉลากที่พิมพ์ชื่ออื่น') +
      '<div class="ingedit-act">' +
        '<button class="btn btn-primary btn-sm" type="button" id="ingSave">บันทึกตัวยา</button>' +
        '<button class="btn btn-soft btn-sm" type="button" id="ingCancel">ยกเลิก</button>' +
      '</div>' +
    '</li>';

  const showRow = g => {
    const name = g.name_th || g.name_en;
    return '<li class="subrow"><span class="subrow-tx"><b>' + esc(name) + '</b>' +
      (g.name_th && g.name_en ? '<span class="sub">' + esc(g.name_en) + '</span>' : '') +
      ((g.aliases || []).length
        ? '<span class="sub">ชื่อเรียกอื่น · ' + esc(g.aliases.join(', ')) + '</span>' : '') +
      strField(f, g) +
      '</span>' +
    '<span class="subrow-act">' +
      '<button class="iconact" type="button" data-ingedit="' + g.id + '" ' +
        'aria-label="แก้ไข ' + esc(name) + '">' + svg('pencil') + '</button>' +
      '<button class="iconact is-danger" type="button" data-ingdrop="' + g.id + '" ' +
        'aria-label="นำ ' + esc(name) + ' ออกจากสูตรนี้">' + svg('trash') + '</button>' +
    '</span></li>';
  };

  return '<div class="ingbox">' +
    '<p class="flabel">ตัวยาสำคัญ</p>' +
    (picked.length
      ? '<ul class="sublist">' +
          picked.map(g => (ingEdit === g.id ? editRow(g) : showRow(g))).join('') + '</ul>'
      : '<p class="blank">ยังไม่ได้ระบุตัวยาสำคัญ</p>') +
    '<div class="addbox">' +
      (left.length
        ? fieldSelect('ing_pick', 'เพิ่มตัวยา', '', left.map(g => [g.id, ingLabel(g)]),
            'หากไม่มีตัวยาที่ต้องการ โปรดสร้างที่แท็บตัวยาสำคัญก่อน') +
          '<button class="btn btn-soft" type="button" id="addIngBtn">เพิ่มตัวยา</button>'
        : '<p class="blank">' + (INGS.length
            ? 'เพิ่มครบทุกตัวที่มีในระบบแล้ว'
            : 'ยังไม่มีตัวยาในระบบ โปรดสร้างที่แท็บตัวยาสำคัญก่อน') + '</p>') +
    '</div>' +
  '</div>';
}


/*  แท็บตัวยาสำคัญ  */

// ดึงรายการตัวยาใหม่ เผื่อเพิ่งบันทึกสูตรไปแล้วจำนวนสูตรที่ใช้เปลี่ยน
async function refreshIngs() {
  let list;
  try {
    list = await api('/admin/ingredients');
  } catch (err) {
    return;   // ใช้ของเดิมต่อได้ ไม่ต้องรบกวนผู้ใช้
  }
  if (!list) return;
  INGS = list;
  if (view === 'ingredient' && !form) render();
}

// ค้นหาในแท็บตัวยาสำคัญ
function searchIng() {
  const q = query.trim().toLowerCase();
  const list = INGS.filter(g => {
    if (!q) return true;
    return (String(g.name_th || '') + ' ' + String(g.name_en || '') + ' ' +
            (g.aliases || []).join(' ')).toLowerCase().includes(q);
  });
  return list.slice().sort((a, b) =>
    String(a.name_th || a.name_en).localeCompare(String(b.name_th || b.name_en), 'th'));
}

function ingredientPage() {
  const list = searchIng();
  const g = editing.indexOf('g-') === 0 && editing !== 'g-new'
    ? INGS.find(x => x.id === +editing.slice(2)) : null;

  const pane =
    editing === 'g-new'
      ? formPane('atom', 'เพิ่มตัวยาสำคัญใหม่', ingForm())
      : g
        ? formPane('pencil', 'แก้ไขตัวยา ' + (g.name_th || g.name_en), ingForm())
        : '';

  $('#panel').innerHTML =
    navBar('ingredient') +

    (pane ||
      '<div class="adbar">' +
        '<span class="srch">' + svg('search') +
          '<input type="search" id="adQ" value="' + esc(query) + '" ' +
          'placeholder="ค้นหาชื่อตัวยา หรือชื่อเรียกอื่น" ' +
          'aria-label="ค้นหาตัวยาสำคัญ"></span>' +
        '<button class="btn btn-primary" type="button" id="addGBtn">' +
          svg('plus') + 'เพิ่มตัวยาใหม่</button>' +
        '<span class="count">' + list.length + ' จาก ' + INGS.length + ' ตัวยา</span>' +
      '</div>' +

      (list.length
        ? '<ul class="druglist">' + list.map(ingRow).join('') + '</ul>'
        : '<div class="state"><div class="state-ico">' + svg('search') + '</div>' +
          '<h2>' + (query ? 'ไม่พบตัวยาที่ค้นหา' : 'ยังไม่มีตัวยาสำคัญในระบบ') + '</h2>' +
          '<p>' + (query ? 'โปรดตรวจสอบคำค้นอีกครั้ง'
                         : 'เพิ่มได้ที่หน้านี้ หรือสร้างขณะกรอกสูตรตำรับ') + '</p></div>'));

  bindNav();
  bindSearch();
  const add = $('#addGBtn');
  if (add) add.addEventListener('click', openNewIng);
  $$('#panel [data-gedit]').forEach(b =>
    b.addEventListener('click', () => openIng(+b.dataset.gedit)));
  $$('#panel [data-gdel]').forEach(b =>
    b.addEventListener('click', () => delIng(+b.dataset.gdel)));

  if (form) bindFormBtns(saveIng);
}

// แถวในรายการอย่างเดียว · ฟอร์มแก้ไขไปอยู่ที่ formPane() ใน ingredientPage() แล้ว
function ingRow(g) {
  const n = g.medicine_count || 0;
  const name = g.name_th || g.name_en;

  return '<li class="drugrow is-static">' +
    '<span class="drugrow-ico">' + svg('atom') + '</span>' +
    '<span class="drugrow-b">' +
      '<b>' + esc(name) + '</b>' +
      (g.name_th && g.name_en ? '<span class="sub">' + esc(g.name_en) + '</span>' : '') +
      ((g.aliases || []).length
        ? '<span class="sub">ชื่อเรียกอื่น · ' + esc(g.aliases.join(', ')) + '</span>' : '') +
      '<span class="meta">' +
        '<span class="tally">' + svg('flask') + n + ' สูตร</span>' +
      '</span>' +
    '</span>' +
    (editing ? '' :
      '<span class="subrow-act">' +
        '<button class="iconact" type="button" data-gedit="' + g.id + '" ' +
          'aria-label="แก้ไขตัวยา ' + esc(name) + '">' + svg('pencil') + '</button>' +
        (n
          ? '<button class="iconact is-danger" type="button" disabled ' +
              'aria-label="ไม่สามารถลบได้ มี ' + n + ' สูตรใช้ตัวยานี้อยู่" ' +
              'title="มี ' + n + ' สูตรใช้ตัวยานี้อยู่">' + svg('trash') + '</button>'
          : '<button class="iconact is-danger" type="button" data-gdel="' + g.id + '" ' +
              'aria-label="ลบตัวยา ' + esc(name) + '">' + svg('trash') + '</button>') +
      '</span>') +
  '</li>';
}

function ingForm() {
  const f = form;
  return '<div class="formgrid">' +
      field('gi_th', 'ชื่อตัวยา (ไทย) *', f.gi_th, 'เช่น พาราเซตามอล') +
      field('gi_en', 'ชื่อตัวยา (อังกฤษ) *', f.gi_en, 'เช่น Paracetamol') +
    '</div>' +
    field('gi_alias', 'ชื่อเรียกอื่น', f.gi_alias,
      'คั่นด้วยจุลภาค · ระบบสแกนใช้จับคู่ฉลากที่พิมพ์ชื่ออื่น เช่น Acetaminophen') +
    formAct('บันทึก');
}

function openNewIng() {
  if (editing === 'g-new') return closeForm();
  leaveList();
  editing = 'g-new';
  form = { gid: 0, gi_th: '', gi_en: '', gi_alias: '' };
  render();
  markClean();
  window.scrollTo(0, 0);
}

function openIng(id) {
  if (editing === 'g-' + id) return closeForm();
  const g = INGS.find(x => x.id === id);
  if (!g) return;
  leaveList();
  editing = 'g-' + id;
  form = { gid: id, gi_th: g.name_th || '', gi_en: g.name_en || '',
           gi_alias: (g.aliases || []).join(', ') };
  render();
  markClean();
  window.scrollTo(0, 0);   // ฟอร์มแทนที่รายการทั้งหน้า ต้องเริ่มอ่านจากหัวฟอร์ม
}

function saveIng(btn) {
  formRead();
  const f = form;

  let ok = req('gi_th', f.gi_th, 'ระบุชื่อภาษาไทย');
  ok = req('gi_en', f.gi_en, 'ระบุชื่อภาษาอังกฤษ') && ok;

  // ชื่ออังกฤษซ้ำกับตัวอื่นไม่ได้ ไม่นับตัวที่กำลังแก้
  const key = f.gi_en.trim().toLowerCase();
  if (ok && INGS.some(g => g.id !== f.gid && String(g.name_en).toLowerCase() === key))
    ok = setErr('gi_en', 'ชื่อนี้ซ้ำกับตัวยาอื่น');
  if (!ok) return focusBad();

  const body = {
    name_th: f.gi_th,
    name_en: f.gi_en,
    aliases: f.gi_alias ? f.gi_alias.split(',').map(x => x.trim()).filter(Boolean) : [],
  };
  const adding = !f.gid;

  return apply(btn, async () => {
    if (adding) {
      const made = await send('/admin/ingredients', 'POST', body);
      if (made) INGS.push(made);
    } else {
      const res = await send('/admin/ingredients/' + f.gid, 'PUT', body);
      const g = INGS.find(x => x.id === f.gid);
      if (g) Object.assign(g, res || body);
    }
    form = null;
  }, adding ? 'เพิ่มตัวยาแล้ว' : 'บันทึกแล้ว');
}

// ลบตัวยา · ได้เฉพาะตัวที่ไม่มีสูตรไหนใช้
async function delIng(id) {
  const g = INGS.find(x => x.id === id);
  if (!g) return;

  const n = g.medicine_count || 0;
  if (n) return toast('มี ' + n + ' สูตรใช้ตัวยานี้อยู่ ต้องนำออกจากสูตรเหล่านั้นก่อน', true);

  const name = g.name_th || g.name_en;
  const ok = await confirmBox('ยืนยันการลบ',
    'ลบตัวยา ' + name + ' พร้อมชื่อเรียกอื่นออกจากฐานข้อมูล การลบนี้ไม่สามารถย้อนกลับได้', 'ลบ');
  if (!ok) return;

  try {
    await api('/admin/ingredients/' + id, { method: 'DELETE' });
  } catch (err) {
    if (token()) toast(err.message, true);
    return;
  }
  INGS = INGS.filter(x => x.id !== id);
  toast('ลบตัวยา ' + name + ' แล้ว');
  render();
}

/*  ฟอร์มผลิตภัณฑ์  */

function sharedWith(f) {
  if (!f.mid) return [];
  return brandsOf(f.mid).filter(b => b.id !== f.bid);
}

// สถานะของสามช่อง ข้อบ่งใช้ วิธีใช้ คำเตือน · shared · ask · own
function textMode(f) {
  if (f.mid) return sharedWith(f).length ? 'shared' : 'own';
  if (formulaHit(f) && !f.solo) return 'ask';
  return 'own';
}

// กล่องบอกว่าการแก้ไขกระทบผลิตภัณฑ์ใดบ้าง
function sharedNote(list, head, blank) {
  if (!list.length)
    return '<div class="notice">' + svg('alert') + '<div><p>' + blank + '</p></div></div>';

  return '<div class="notice is-warn">' + svg('warning') + '<div>' +
      '<p><b>' + head + '</b> การแก้ไขจะมีผลกับรายการต่อไปนี้</p>' +
      '<ul>' + list.map(b => '<li>' + esc(brandTh(b)) + '</li>').join('') + '</ul>' +
    '</div></div>';
}


/*  จับคู่สูตร  */

// ตัวระบุสูตร · ตัวยาสำคัญ + ปริมาณตัวยา + รูปแบบยา

// ปรับข้อความก่อนเทียบ · ไม่สนตัวพิมพ์เล็กใหญ่และช่องว่างซ้ำ
const normStr = s => String(s == null ? '' : s).trim().toLowerCase().replace(/\s+/g, ' ');

const ingKey = (ids, str) => ids.slice().sort((a, b) => a - b)
  .map(id => id + ':' + normStr(str && str[id])).join(',');

// กุญแจแบบเดียวกัน แต่สร้างจาก ingredients ที่ API ส่งมา
const ingKeyOf = list => ingKey((list || []).map(g => g.id),
  (list || []).reduce((o, g) => (o[g.id] = g.strength, o), {}));

const sameForm = (a, b) => String(a || '').toUpperCase() === String(b || '').toUpperCase();

// กุญแจสูตรของแต่ละสูตร · สูตรที่ไม่มีตัวยาเก็บเป็น -
let MEDKEY = {};

// วิธีใช้ของแต่ละสูตร
let MEDDOSE = {};

// คืนไอดีสูตรที่ตรงกับที่กรอกอยู่ ถ้าไม่เจอคืน 0
function formulaHit(f) {
  if (!f.dosage_form || !f.ingIds.length) return 0;
  const key = ingKey(f.ingIds, f.ingStr);
  const hit = MEDS.find(m => m.id !== f.mid && sameForm(m.dosage_form, f.dosage_form) &&
    MEDKEY[m.id] && MEDKEY[m.id] === key);
  return hit ? hit.id : 0;
}

// ดึงตัวยาของสูตรที่รูปแบบยาตรงกัน แล้ววาดใหม่
async function scanFormula() {
  const f = form;
  if (!f || !f.dosage_form) return;

  const need = MEDS.filter(m => sameForm(m.dosage_form, f.dosage_form) && !MEDKEY[m.id]);
  if (!need.length) return;

  const got = await Promise.all(need.map(m =>
    api('/admin/medicines/' + m.id).catch(() => null)));
  got.forEach((med, i) => {
    MEDKEY[need[i].id] = (med ? ingKeyOf(med.ingredients) : '') || '-';
    if (med) MEDDOSE[med.id] = med.dosage_instructions || '';
  });

  if (form !== f) return;   // ปิดฟอร์มหรือเปิดตัวอื่นไปแล้วระหว่างรอ
  formRead();               // เก็บสิ่งที่พิมพ์ค้างไว้ก่อนวาดใหม่
  render();
}

// ใช้ข้อมูลร่วมกับสูตรที่เจอ
async function useFormula() {
  formRead();
  const f = form;
  const id = formulaHit(f);
  if (!id) return;

  if (f.indications || f.dosage_instructions || f.warnings) {
    const ok = await confirmBox('ใช้ข้อมูลร่วมกัน',
      'ข้อบ่งใช้ วิธีใช้ และคำเตือน ที่กรอกไว้จะถูกแทนที่ด้วยข้อมูลของยาตัวนั้น',
      'ใช้ข้อมูลร่วม');
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
  ['name_th', 'category_id', 'indications', 'dosage_instructions', 'warnings']
    .forEach(k => { f[k] = got[k]; });

  // รับปริมาณตามที่สูตรนั้นสะกดไว้ ไม่งั้นบันทึกครั้งต่อไปจะไปแก้ค่าของเขาโดยไม่ตั้งใจ
  f.ingIds = got.ingIds.slice();
  f.ingStr = Object.assign({}, got.ingStr);

  f.askErr = false;
  f.mid = med.id;
  f.base = medBase(med);
  render();
}


/*  ฟอร์มผลิตภัณฑ์  */

// กล่องถามว่าจะใช้ข้อมูลร่วมกับสูตรที่เจอ หรือกรอกเอง
function askNote(hit, bad) {
  const kids = brandsOf(hit);
  const who = kids.length ? brandTh(kids[0]) : (medRow(hit) || {}).name_th || '';
  const dose = String(MEDDOSE[hit] || '').replace(/\s*\n+\s*/g, ' · ').trim();

  return '<div class="notice">' + svg('alert') + '<div>' +
      '<p><b>' + esc(who) + '</b> ใช้ตัวยาสำคัญ ปริมาณตัวยา และรูปแบบยา ชุดเดียวกัน ' +
        'ใช้ข้อบ่งใช้ วิธีใช้ และคำเตือน ร่วมกันได้ ไม่ต้องพิมพ์ซ้ำ ' +
        'หลังจากนั้นถ้าแก้ข้อมูลชุดนี้ จะมีผลกับยาทั้งสองตัว</p>' +
      (dose ? '<p class="notedose"><b>วิธีใช้ของชุดนี้</b><br>' + esc(dose) + '</p>' : '') +
      '<p class="notewarn">เทียบจากตัวยาสำคัญ ปริมาณตัวยา และรูปแบบยา ที่กรอกไว้ข้างบน ' +
        'ถ้าปริมาณบนกล่องสะกดคนละแบบ เช่น 500 mg กับ 500 มก. ระบบจะมองเป็นคนละสูตร ' +
        'กรุณาเทียบวิธีใช้ข้างบนกับกล่องยาที่ถืออยู่ แล้วเลือกอย่างใดอย่างหนึ่ง</p>' +
      (bad ? '<p class="notebad">' + svg('warning') +
        '<span>เลือกอย่างใดอย่างหนึ่งก่อน จึงจะบันทึกได้</span></p>' : '') +
      '<p class="noteact">' +
        '<button class="btn btn-soft btn-sm" type="button" id="useFormula">' +
          'ใช้ข้อมูลร่วมกับยาตัวนี้</button>' +
        '<button class="btn btn-soft btn-sm" type="button" id="soloFormula">' +
          'ยาตัวนี้ไม่เหมือนกัน · กรอกเอง</button>' +
      '</p>' +
    '</div></div>';
}

function productForm() {
  const f = form;

  // ตัวยาหรือรูปแบบยาเปลี่ยนจนไม่เจอสูตรที่ตรงกันแล้ว คำตอบเดิมใช้ไม่ได้ ต้องถามใหม่
  if (f.solo && !formulaHit(f)) f.solo = false;

  const mode = textMode(f);
  const others = sharedWith(f);
  let note = '';

  if (f.mid) {
    // ผูกกับสูตรแล้ว แก้ช่องข้อความแล้วยี่ห้ออื่นเปลี่ยนตาม ต้องบอกให้ชัด
    if (others.length)
      note = sharedNote(others, 'ยาตัวนี้ใช้ข้อมูลร่วมกับอีก ' + others.length + ' ผลิตภัณฑ์', '');
  } else if (mode === 'ask') {
    note = askNote(formulaHit(f), f.askErr);
  } else if (formulaHit(f)) {
    // ตอบไปแล้วว่าไม่เหมือนกัน เหลือไว้บรรทัดเดียวให้ย้อนได้
    note = '<p class="noteundo"><span>ยาตัวนี้กรอกข้อความเอง ไม่ใช้ข้อมูลร่วมกับยาที่ตัวยาตรงกัน</span>' +
      '<button class="btn btn-soft btn-sm" type="button" id="undoSolo">เปลี่ยนใจ</button></p>';
  }

  return '<h4 class="cardhd fsec">' + svg('tag') + 'ข้อมูลบนฉลาก</h4>' +
    '<div class="formgrid two">' +
      field('brand_name', 'ชื่อผลิตภัณฑ์ยา (Trade Name) *', f.brand_name,
        'ตามที่ปรากฏบนฉลาก') +
      field('reg_no', 'เลขทะเบียน อย. (Reg. No.) *', f.reg_no, 'ตัวอย่าง 1A 844/39') +
    '</div>' +
    '<div class="formgrid two">' +
      field('licensee', 'ผู้ผลิต / จำหน่าย *', f.licensee, 'ผู้รับอนุญาตตามที่ระบุบนฉลาก') +
      field('legal_type', 'ประเภทตามกฎหมาย *', f.legal_type) +
    '</div>' +

    '<h4 class="cardhd fsec">' + svg('pill') + 'ตัวยาและสรรพคุณ</h4>' +
    '<div class="formgrid two">' +
      fieldSelect('category_id', 'หมวดหมู่ *', f.category_id, CATS.map(c => [c.id, c.name_th]),
        'ตามประกาศยาสามัญประจำบ้าน อย.') +
      fieldSelect('dosage_form', 'รูปแบบยา *', f.dosage_form, formOptions(),
        'จัดเก็บเป็นภาษาอังกฤษ แสดงผลเป็นภาษาไทย') +
    '</div>' +
    ingBlock(f) +
    note +
    (mode === 'ask' ? '' :
      mode === 'shared' ? sharedText(f, others.length) : textFields(f)) +
    formAct('บันทึก');
}

// สามช่องแบบใช้ร่วมกับยี่ห้ออื่น · แสดงอย่างเดียว
function sharedText(f, n) {
  const box = (label, value) =>
    '<div class="field"><label>' + esc(label) + '</label>' +
      (value
        ? '<div class="rotext">' + esc(value).replace(/\n/g, '<br>') + '</div>'
        : '<div class="rotext is-blank">ยังไม่มีข้อมูล กดปุ่มด้านล่างเพื่อเพิ่ม</div>') +
    '</div>';

  return box('ข้อบ่งใช้และสรรพคุณ', f.indications) +
    box('วิธีใช้และขนาดรับประทาน', f.dosage_instructions) +
    box('คำเตือนและข้อควรระวังสำคัญ', f.warnings) +
    '<p class="noteact"><button class="btn btn-soft btn-sm" type="button" id="editShared">' +
      'แก้ข้อมูลชุดนี้ · มีผลกับ ' + (n + 1) + ' ยี่ห้อ</button></p>';
}


/*  ฟอร์มข้อมูลที่ใช้ร่วมกัน  */

function formulaForm() {
  const f = form;
  // ที่นี่ทุกผลิตภัณฑ์ของสูตรได้รับผลหมด ไม่ต้องกรองตัวใดออกเหมือนฟอร์มผลิตภัณฑ์
  const kids = f.mid ? brandsOf(f.mid) : [];

  return sharedNote(kids,
      'ข้อมูลชุดนี้ใช้กับ ' + kids.length + ' ผลิตภัณฑ์',
      'ยังไม่มีผลิตภัณฑ์ใดใช้ข้อมูลชุดนี้ ลบทิ้งได้ถ้าไม่ได้ใช้แล้ว') +
    '<div class="formgrid two">' +
      fieldSelect('category_id', 'หมวดหมู่ *', f.category_id, CATS.map(c => [c.id, c.name_th]),
        'ตามประกาศยาสามัญประจำบ้าน อย.') +
      fieldSelect('dosage_form', 'รูปแบบยา *', f.dosage_form, formOptions(),
        'จัดเก็บเป็นภาษาอังกฤษ แสดงผลเป็นภาษาไทย') +
    '</div>' +
    ingBlock(f) +
    textFields(f) +
    formAct('บันทึก');
}


/*  เปิดฟอร์ม  */

function openNew() {
  if (editing === 'new') return closeForm();
  leaveList();
  editing = 'new';
  ingEdit = 0;
  form = newForm(null, null);
  render();
  markClean();
  window.scrollTo(0, 0);
}

// แก้ผลิตภัณฑ์
async function openEdit(id) {
  if (editing === 'p-' + id) return closeForm();
  const b = BRANDS.find(x => x.id === id);
  if (!b) return;

  leaveList();
  editing = 'p-' + id;
  form = null;
  ingEdit = 0;
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

async function openFormula(id) {
  if (editing === 'f-' + id) return closeForm();
  if (!medRow(id)) return;

  leaveList();
  editing = 'f-' + id;
  form = null;
  ingEdit = 0;
  render();
  window.scrollTo(0, 0);   // ฟอร์มแทนที่รายการทั้งหน้า ต้องเริ่มอ่านจากหัวฟอร์ม

  let med;
  try {
    med = await api('/admin/medicines/' + id);
  } catch (err) {
    if (!token()) return;
    toast(err.message, true);
    editing = '';
    return render();
  }
  if (editing !== 'f-' + id) return;
  form = newForm(null, med);
  form.base = medBase(med);
  render();
  markClean();
}

/*  ตรวจและบันทึก  */

// ตรวจช่องของสูตรตำรับ
function checkMed(f, mode) {
  // ไม่มีช่องชื่อสามัญแล้ว ชื่อสูตรสร้างจากตัวยา จึงต้องมีตัวยาอย่างน้อยหนึ่งตัว
  let ok = true;
  if (!f.ingIds.length) {
    toast('เลือกตัวยาสำคัญอย่างน้อยหนึ่งตัว', true);
    ok = false;
  }
  ok = req('category_id', f.category_id, 'เลือกหมวดหมู่') && ok;
  ok = req('dosage_form', f.dosage_form, 'เลือกรูปแบบยา') && ok;

  // บังคับสามช่องเฉพาะตอนเป็น own
  if (mode !== 'own') return ok;

  ok = req('indications', f.indications, 'ระบุข้อบ่งใช้') && ok;
  ok = req('dosage_instructions', f.dosage_instructions, 'ระบุวิธีใช้') && ok;
  return ok;
}

// ส่งสูตรตำรับ · เฉพาะตอนเปลี่ยนจริง
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

  const mode = textMode(f);
  let ok = req('brand_name', f.brand_name, 'ระบุชื่อผลิตภัณฑ์ยา');
  ok = checkMed(f, mode) && ok;

  // ยังไม่ตอบว่าจะใช้ข้อมูลร่วมหรือกรอกเอง · เตือนที่กล่อง ไม่ใช่ที่ช่อง
  if (mode === 'ask') {
    f.askErr = true;
    toast('เลือกก่อนว่าจะใช้ข้อมูลร่วมกัน หรือกรอกเอง', true);
    ok = false;
  }
  ok = req('licensee', f.licensee, 'ระบุผู้ผลิตหรือผู้จำหน่าย') && ok;
  ok = req('legal_type', f.legal_type, 'ระบุประเภทตามกฎหมาย') && ok;

  if (!f.reg_no) ok = req('reg_no', '', 'ระบุเลขทะเบียน อย.') && ok;
  else if (!RE_REGNO.test(f.reg_no))
    ok = setErr('reg_no', 'รูปแบบไม่ถูกต้อง ตัวอย่าง 1A 844/39') && ok;
  else if (BRANDS.some(x => x.id !== f.bid && regKey(x.reg_no) === regKey(f.reg_no)))
    ok = setErr('reg_no', 'เลขทะเบียนนี้มีอยู่แล้ว') && ok;
  else setErr('reg_no', '');
  if (!ok) {
    if (mode === 'ask') render();   // วาดใหม่ให้ข้อความเตือนในกล่องโผล่
    return focusBad();
  }

  return apply(btn, async () => {
    await saveMedPart(f);

    const bb = { medicine_id: f.mid, brand_name: f.brand_name, reg_no: f.reg_no,
                 legal_type: f.legal_type, licensee: f.licensee };
    const b = f.bid ? BRANDS.find(x => x.id === f.bid) : null;
    const was = b ? b.medicine_id : 0;
    try {
      if (b) Object.assign(b, await send('/admin/brands/' + b.id, 'PUT', bb));
      else BRANDS.push(await send('/admin/brands', 'POST', bb));
    } catch (err) {
      throw new Error('บันทึกสูตรตำรับแล้ว แต่บันทึกผลิตภัณฑ์ไม่สำเร็จ · ' + err.message);
    }

    // อัปเดตจำนวนผลิตภัณฑ์ของสูตรเดิมและสูตรใหม่
    [was, f.mid].forEach(mid => {
      const row = mid && medRow(mid);
      if (row) row.brand_count = brandCount(mid);
    });
    form = null;
  }, f.bid ? 'บันทึกแล้ว' : 'เพิ่มรายการแล้ว');
}

function saveFormula(btn) {
  formRead();
  const f = form;

  const ok = checkMed(f, 'own');
  if (!ok) return focusBad();

  const adding = !f.mid;
  return apply(btn, async () => {
    await saveMedPart(f);
    form = null;
  }, adding ? 'เพิ่มสูตรตำรับแล้ว' : 'บันทึกแล้ว');
}

// เพิ่มตัวยาเข้าสูตร
function addIngredient() {
  const v = fv('ing_pick');
  if (!req('ing_pick', v, 'เลือกตัวยาที่จะเพิ่ม')) return focusBad();
  formRead();
  form.ingIds.push(+v);
  if (!form.ingStr) form.ingStr = {};
  if (form.ingStr[+v] == null) form.ingStr[+v] = '';
  ingEdit = 0;
  render();
}


// บันทึกชื่อและชื่อเรียกอื่นของตัวยา
async function saveIngEdit(btn) {
  const id = ingEdit;
  const d = readForm(['ed_th', 'ed_en', 'ed_alias']);

  let ok = req('ed_th', d.ed_th, 'ระบุชื่อภาษาไทย');
  ok = req('ed_en', d.ed_en, 'ระบุชื่อภาษาอังกฤษ') && ok;

  // ชื่ออังกฤษซ้ำกับตัวยาอื่นไม่ได้ ไม่นับตัวที่กำลังแก้
  const key = d.ed_en.toLowerCase();
  if (ok && INGS.some(g => g.id !== id && String(g.name_en).toLowerCase() === key))
    ok = setErr('ed_en', 'ชื่อนี้ซ้ำกับตัวยาอื่น');
  if (!ok) return focusBad();

  const body = {
    name_th: d.ed_th,
    name_en: d.ed_en,
    aliases: d.ed_alias ? d.ed_alias.split(',').map(x => x.trim()).filter(Boolean) : [],
  };
  formRead();

  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'กำลังบันทึก…';
  try {
    const res = await send('/admin/ingredients/' + id, 'PUT', body);
    const g = INGS.find(x => x.id === id);
    if (g) Object.assign(g, res || body);
  } catch (err) {
    if (!token()) return;
    showFormMsg(err.message);
    btn.disabled = false;
    btn.textContent = label;
    return;
  }
  ingEdit = 0;
  toast('แก้ไขตัวยาแล้ว');
  render();
}


/*  การลบ  */

// ลบผลิตภัณฑ์ · ไม่ลบสูตรตาม
async function delProduct(id) {
  const b = BRANDS.find(x => x.id === id);
  if (!b) return;

  const ok = await confirmBox('ยืนยันการลบ',
    'ลบ ' + brandTh(b) + ' เลขทะเบียน ' + b.reg_no + ' ออกจากฐานข้อมูล ' +
    'สูตรตำรับยังคงอยู่ในแท็บสูตรตำรับ การลบนี้ไม่สามารถย้อนกลับได้', 'ลบ');
  if (!ok) return;

  try {
    await api('/admin/brands/' + id, { method: 'DELETE' });
  } catch (err) {
    if (token()) toast(err.message, true);
    return;
  }
  BRANDS = BRANDS.filter(x => x.id !== id);
  const row = medRow(b.medicine_id);
  if (row) row.brand_count = brandCount(b.medicine_id);

  toast('ลบ ' + brandTh(b) + ' แล้ว');
  render();
}

// ลบสูตรตำรับ
async function delFormula(id) {
  const m = medRow(id);
  if (!m) return;
  const n = brandCount(id);

  if (n) return toast('มี ' + n + ' ผลิตภัณฑ์ใช้สูตรนี้อยู่ ต้องลบผลิตภัณฑ์เหล่านั้นก่อน', true);


  const ok = await confirmBox('ยืนยันการลบ',
    'ลบสูตรตำรับ ' + m.name_th + ' พร้อมข้อบ่งใช้ วิธีใช้ และคำเตือน ' +
    'ออกจากฐานข้อมูล การลบนี้ไม่สามารถย้อนกลับได้', 'ลบ');
  if (!ok) return;

  try {
    await api('/admin/medicines/' + id, { method: 'DELETE' });
  } catch (err) {
    if (token()) toast(err.message, true);
    return;
  }
  MEDS = MEDS.filter(x => x.id !== id);
  delete MEDKEY[id];
  delete MEDDOSE[id];
  toast('ลบสูตร ' + m.name_th + ' แล้ว');
  render();
}


/*  ผูกปุ่มที่ใช้ร่วมกัน  */

function bindNav() {
  $$('#panel [data-go]').forEach(b =>
    b.addEventListener('click', () => goTab(b.dataset.go)));

  // ผูกที่นี่ ไม่ใช่ที่ bindFormBtns() เพราะต้องกดได้ตั้งแต่ตอนที่ยังรอข้อมูลจาก API
  const back = $('#backList');
  if (back) back.addEventListener('click', async () => {
    if (await leaveForm()) closeForm();
  });
}

// คืนโฟกัสและตำแหน่งเคอร์เซอร์หลังวาดใหม่
function bindSearch() {
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

function bindIngPicker() {
  const addIng = $('#addIngBtn');
  if (addIng) addIng.addEventListener('click', addIngredient);

  // กรอกปริมาณเสร็จแล้วหาสูตรใหม่ทันที · ใช้ change ห้ามใช้ input
  $$('#panel [data-fl^="st_"] input').forEach(el =>
    el.addEventListener('change', () => { formRead(); render(); }));

  $$('#panel [data-ingedit]').forEach(b => b.addEventListener('click', () => {
    formRead();
    ingEdit = +b.dataset.ingedit;
    render();
  }));

  const ingSave = $('#ingSave');
  if (ingSave) ingSave.addEventListener('click', () => saveIngEdit(ingSave));

  const ingCancel = $('#ingCancel');
  if (ingCancel) ingCancel.addEventListener('click', () => {
    formRead();
    ingEdit = 0;
    render();
  });

  $$('#panel [data-ingdrop]').forEach(b => b.addEventListener('click', () => {
    formRead();
    const id = +b.dataset.ingdrop;
    form.ingIds = form.ingIds.filter(x => x !== id);
    if (form.ingStr) delete form.ingStr[id];
    render();
  }));
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
