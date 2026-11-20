"use strict";

const P = {
  scan:'<path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16M3.5 12h17"/>',
  home:'<path d="M3 10.6 12 3.2l9 7.4"/><path d="M5.6 9.6V19a2 2 0 0 0 2 2h2.3v-5.6h4.2V21h2.3a2 2 0 0 0 2-2V9.6"/>',
  camera:'<path d="M4 8.6h2.9L8.3 6h7.4l1.4 2.6H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.6a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.2" r="3.2"/>',
  search:'<circle cx="11" cy="11" r="6.6"/><path d="M15.8 15.8 21 21"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11.2v5.4M12 7.8h.01"/>',
  lock:'<rect x="4.4" y="10.4" width="15.2" height="10.2" rx="2.2"/><path d="M8 10.4V8a4 4 0 0 1 8 0v2.4"/>',
  moon:'<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8 8.6 8.6 0 1 0 20.2 14.6Z"/>',
  sun:'<circle cx="12" cy="12" r="4.1"/><path d="M12 2.6v2.2M12 19.2v2.2M4.3 4.3l1.6 1.6M18.1 18.1l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.3 19.7l1.6-1.6M18.1 5.9l1.6-1.6"/>',
  arrow:'<path d="M4.2 12h14.6m-5-5 5 5-5 5"/>',
  back:'<path d="M19.8 12H5.2m5-5-5 5 5 5"/>',
  caret:'<path d="m9.5 5 7 7-7 7"/>',
  x:'<path d="m6 6 12 12M18 6 6 18"/>',
  check:'<path d="m5 12.6 4.4 4.4L19 7.4"/>',
  'check-c':'<circle cx="12" cy="12" r="8.6"/><path d="m8.3 12.2 2.6 2.6 4.8-5.2"/>',
  warning:'<path d="M12 4.4 3 20h18L12 4.4Z"/><path d="M12 10.2v4.2M12 17.4h.01"/>',
  alert:'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.6v5M12 16.2h.01"/>',
  ban:'<circle cx="12" cy="12" r="8.6"/><path d="m6 6 12 12"/>',
  shield:'<path d="M12 3.2 5 6v5.3c0 4.3 2.9 7.9 7 9.6 4.1-1.7 7-5.3 7-9.6V6l-7-2.8Z"/><path d="m8.8 11.9 2.3 2.3 4.2-4.5"/>',
  clock:'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.2 1.9"/>',
  pill:'<path d="M13.4 4.6a4.5 4.5 0 0 1 6 6l-8.8 8.8a4.5 4.5 0 0 1-6-6l8.8-8.8Z"/><path d="m8.2 9.8 6 6"/>',
  bottle:'<path d="M10 3h4v2.6l1.5 2.2a3 3 0 0 1 .5 1.7V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9.5a3 3 0 0 1 .5-1.7L10 5.6V3Z"/><path d="M8 12.4h8"/>',
  blister:'<rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.2"/><path d="M3.4 12h17.2M9.1 4.6v14.8M14.9 4.6v14.8"/>',
  flask:'<path d="M9.4 3v6.3L4.3 18.1A1.6 1.6 0 0 0 5.7 20.5h12.6a1.6 1.6 0 0 0 1.4-2.4l-5.1-8.8V3"/><path d="M8 3h8M7.2 14.2h9.6"/>',
  factory:'<path d="M3 20.4V10.2l5.4 3.4V10.2l5.4 3.4V6.6h1.8l1.4 13.8"/><path d="M2.4 20.4h19.2"/><path d="M6.6 17h1.2M11 17h1.2M15.4 17h1.2"/>',
  ocr:'<rect x="3.2" y="4.6" width="17.6" height="14.8" rx="2.4"/><path d="M7 9.2h4M7 12.4h7M7 15.6h5"/><circle cx="16.6" cy="14.4" r="2.6"/><path d="m18.6 16.4 1.8 1.8"/>',
  clipboard:'<path d="M9 4.6H7.2a1.8 1.8 0 0 0-1.8 1.8v12.4a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8V6.4a1.8 1.8 0 0 0-1.8-1.8H15"/><rect x="9" y="2.8" width="6" height="3.6" rx="1.2"/><path d="m8.8 12.4 1.8 1.8 3.6-3.8"/><path d="M8.8 17.2h6.4"/>',
  frame:'<path d="M3.4 8.6V5.8a2.4 2.4 0 0 1 2.4-2.4h2.8M15.4 3.4h2.8a2.4 2.4 0 0 1 2.4 2.4v2.8M20.6 15.4v2.8a2.4 2.4 0 0 1-2.4 2.4h-2.8M8.6 20.6H5.8a2.4 2.4 0 0 1-2.4-2.4v-2.8"/>',
  flash:'<path d="M9.2 3h5.6v3.4l-1.5 2.5v11a.9.9 0 0 1-.9.9h-.8a.9.9 0 0 1-.9-.9v-11L9.2 6.4V3Z"/><path d="M9.2 6.4h5.6"/>',
  refresh:'<path d="M4.4 12a7.6 7.6 0 0 1 13-5.4l2.4 2.4M19.8 4.6V9h-4.4"/><path d="M19.6 12a7.6 7.6 0 0 1-13 5.4L4.2 15M4.2 19.4V15h4.4"/>',
  upload:'<path d="M12 16.2V4M8 7.6 12 3.6l4 4M4 15v3.6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V15"/>',
  download:'<path d="M12 3.8V16M8 12.4l4 4 4-4M4 20.2h16"/>',
  speaker:'<path d="M4.6 9.4h3.2l4.2-3.6v12.4l-4.2-3.6H4.6a1 1 0 0 1-1-1v-3.2a1 1 0 0 1 1-1Z"/><path d="M15.6 9.6a3.4 3.4 0 0 1 0 4.8M18.2 7a7 7 0 0 1 0 10"/>',
  stop:'<rect x="6" y="6" width="12" height="12" rx="2.6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  pencil:'<path d="M4 20.2h4L18.4 9.8a2.83 2.83 0 1 0-4-4L4 16.2v4Z"/><path d="m13.5 6.7 4 4"/>',
  trash:'<path d="M4 7h16M9.5 7V4.8h5V7"/><path d="m6.6 7 .9 12.2a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4L17.4 7"/>',
  list:'<path d="M8.2 6.6h12.6M8.2 12h12.6M8.2 17.4h12.6M3.7 6.6h.01M3.7 12h.01M3.7 17.4h.01"/>',
  tag:'<path d="M4 10.4V5.2A1.2 1.2 0 0 1 5.2 4h5.2a1.2 1.2 0 0 1 .85.35l8 8a1.2 1.2 0 0 1 0 1.7l-5.2 5.2a1.2 1.2 0 0 1-1.7 0l-8-8A1.2 1.2 0 0 1 4 10.4Z"/><circle cx="8" cy="8" r="1.3"/>',
  db:'<ellipse cx="12" cy="6" rx="7" ry="2.9"/><path d="M5 6v12c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9V6"/><path d="M19 12c0 1.6-3.1 2.9-7 2.9S5 13.6 5 12"/>',
  logout:'<path d="M15 8.2V5.6A1.6 1.6 0 0 0 13.4 4H6.6A1.6 1.6 0 0 0 5 5.6v12.8A1.6 1.6 0 0 0 6.6 20h6.8a1.6 1.6 0 0 0 1.6-1.6v-2.6"/><path d="M11 12h10m-3.4-3.4L21 12l-3.4 3.4"/>',
  eye:'<path d="M2.6 12S6.4 5.6 12 5.6 21.4 12 21.4 12 17.6 18.4 12 18.4 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3.1"/>',
  'eye-off':'<path d="m3.6 3.6 16.8 16.8"/><path d="M9.9 5.9A8.7 8.7 0 0 1 12 5.6c5.6 0 9.4 6.4 9.4 6.4a17 17 0 0 1-3.2 3.9M6.6 8.1A17.4 17.4 0 0 0 2.6 12s3.8 6.4 9.4 6.4a8.9 8.9 0 0 0 3.4-.68"/><path d="M9.9 9.9a3.1 3.1 0 0 0 4.2 4.2"/>',
  link:'<path d="M10.2 13.8a3.6 3.6 0 0 0 5.1 0l3-3a3.6 3.6 0 1 0-5.1-5.1l-1.4 1.4"/><path d="M13.8 10.2a3.6 3.6 0 0 0-5.1 0l-3 3a3.6 3.6 0 1 0 5.1 5.1l1.4-1.4"/>',
  keyboard:'<rect x="2.6" y="6.2" width="18.8" height="11.6" rx="2.2"/><path d="M6.4 9.8h.01M9.6 9.8h.01M12.8 9.8h.01M16 9.8h.01M6.4 13h.01M17.6 13h.01M9.6 13h4.8"/>',
  image:'<rect x="3" y="4.6" width="18" height="14.8" rx="2.2"/><circle cx="8.4" cy="9.6" r="1.5"/><path d="m3.6 17.4 5-5 4 4 3-3 4.8 4.8"/>',
  mic:'<rect x="9" y="2.8" width="6" height="11.2" rx="3"/><path d="M5.4 11.4a6.6 6.6 0 0 0 13.2 0M12 18v3.2M8.4 21.2h7.2"/>',
  pause:'<rect x="7.4" y="5.4" width="3.4" height="13.2" rx="1.3"/><rect x="13.2" y="5.4" width="3.4" height="13.2" rx="1.3"/>',
  play:'<path d="M8.2 5.5 18.6 12 8.2 18.5V5.5Z"/>',
  box:'<path d="M20.4 7.6 12 3.4 3.6 7.6v8.8L12 20.6l8.4-4.2V7.6Z"/><path d="M3.6 7.6 12 11.8l8.4-4.2M12 11.8v8.8"/>',

  stomach:'<path d="M9.4 3.2V6.3C7.9 7.6 5.1 9 5.1 13.2c0 3.7 2.8 6.6 6.3 6.6s5.9-2.6 5.9-5.9c0-4-2.3-6.3-4.3-7.3V3.2Z"/><circle cx="9.5" cy="12.6" r="1.05"/><circle cx="12.9" cy="15" r="1.05"/>',
  laxative:'<path d="M16.6 5.2H9.8a2.6 2.6 0 0 0 0 5.2h4.6a2.6 2.6 0 0 1 0 5.2H7.4"/>',
  fever:'<path d="M12.4 14V5.4a2.2 2.2 0 1 0-4.4 0V14a4.2 4.2 0 1 0 4.4 0Z"/><path d="M10.2 9.6v6.2"/><path d="M16.4 11.2c1.1-1.1 1.1-2.3 0-3.4s-1.1-2.3 0-3.4"/><path d="M19.6 11.2c1.1-1.1 1.1-2.3 0-3.4s-1.1-2.3 0-3.4"/>',
  allergy:'<path d="M9 3.2v5.6c0 1.3-.8 2.2-1.8 3.3-1.1 1.2-1.8 2.5-1.8 3.9 0 2.5 2 4.4 4.5 4.4h4.2c2.5 0 4.5-1.9 4.5-4.4 0-1.4-.7-2.7-1.8-3.9-1-1.1-1.8-2-1.8-3.3V3.2"/><path d="M8.4 16a2.6 2.6 0 0 0 2.6 2.6M15.6 16a2.6 2.6 0 0 1-2.6 2.6"/><path d="M21.4 8.2c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-1 1.8-3.2 1.8-3.2s1.8 2.2 1.8 3.2Z"/>',
  cough:'<path d="M12 4v7.4"/><path d="M12 8.8H9.9c-1 0-1.9.6-2.3 1.6l-2 5.2c-.7 1.8.6 3.8 2.6 3.8h1.6a2.2 2.2 0 0 0 2.2-2.2V8.8Z"/><path d="M12 8.8h2.1c1 0 1.9.6 2.3 1.6l2 5.2c.7 1.8-.6 3.8-2.6 3.8h-1.6a2.2 2.2 0 0 1-2.2-2.2V8.8Z"/><path d="M12 11.4 9.5 13.8M12 11.4l2.5 2.4"/>',
  mouth:'<path d="M15.6 20.6v-2.2a3.4 3.4 0 0 1 1.4-2.8 7.6 7.6 0 1 0-11.8-8"/><path d="M5.2 7.6 3.4 12.4c-.2.6.2 1.2.9 1.2h1.6v1.8a2 2 0 0 0 2 2h1.4"/><circle cx="13.6" cy="17.4" r="1.4"/>',
};

// ไอคอนหกกลุ่มอาการ · ชื่อต้องตรงกับ id ใน assets/cat-icons.svg
const CAT_ICONS = ['stomach', 'laxative', 'fever', 'allergy', 'cough', 'mouth'];
let catSpriteOn = false;

// สร้างแท็ก svg ของไอคอน
function svg(n, cls) {
  const body = (catSpriteOn && CAT_ICONS.indexOf(n) >= 0)
    ? '<use href="#cat-' + n + '"/>'
    : (P[n] || P.info);
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
       + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"'
       + (cls ? ' class="' + cls + '"' : '') + '>' + body + '</svg>';
}

// โหลดไอคอนกลุ่มอาการมาซ่อนไว้ต้นหน้า ให้ <use> เรียกซ้ำ
async function loadCatSprite() {
  try {
    const res = await fetch('/assets/cat-icons.svg');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const txt = await res.text();
    if (txt.indexOf('<symbol') < 0) throw new Error('ไม่พบ symbol ในไฟล์');
    const box = document.createElement('div');
    box.innerHTML = txt;
    document.body.insertBefore(box, document.body.firstChild);
    catSpriteOn = true;
  } catch (err) {
    console.warn('โหลดไอคอนกลุ่มอาการไม่ได้ ใช้รูปเส้นสำรองแทน', err);
  }
}

// ใส่ไอคอนให้อิลิเมนต์ที่มี data-ico
function paintIcons(root) {
    (root || document).querySelectorAll('[data-ico]').forEach(el => {
        if (el.dataset.icoDone) return;
        el.dataset.icoDone ='1';
        el.insertAdjacentHTML('afterbegin', svg(el.dataset.ico));
    });
}

// ตัวช่วยเลือกอิลิเมนต์
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

// หน่วงเวลาก่อนเรียกฟังก์ชัน
function debounce(fn, ms) {
    let t;
    return function () {
        const a = arguments;
        clearTimeout(t);
        t = setTimeout(() => fn.apply(null, a), ms);
    };
}

// ผู้ใช้ตั้งค่าให้ลดการเคลื่อนไหวหรือไม่
const REDUCED  = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// นับตัวเลขขึ้นทีละขั้น
function countUp(el, to, ms) {
    if (REDUCED()) {el.textContent = to; return;}

    const t0 = performance.now();
    ms = ms || 900;

    (function tick(t) {
        const p = Math.min(1, (t -t0) / ms);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * e);
        if (p < 1) requestAnimationFrame(tick);
    })(t0);
}

let io = null;

// แสดงอิลิเมนต์เมื่อเลื่อนมาถึง
function initReveal(scope) {
  if (REDUCED()) {
    $$('.reveal,.pop', scope).forEach(el => el.classList.add('in'));
    return;
  }

  if (!io) {
    io = new IntersectionObserver(entries => {
      entries.forEach((en, i) => {
        if (!en.isIntersecting) return;
        // หน่วงเฉพาะตัวที่เพิ่งโผล่จากขอบล่าง
        const fromEdge = en.boundingClientRect.top > innerHeight * 0.6;
        en.target.style.setProperty('--rd', fromEdge ? Math.min(i, 5) * 60 + 'ms' : '0ms');
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }

  // สิ่งที่อยู่ในจอตั้งแต่แรก แสดงทันที
  $$('.reveal:not(.in),.pop:not(.in)', scope).forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in');
    else io.observe(el);
  });
}

const VIEWS = ['home', 'scan', 'search', 'detail', 'about',];
const TITLES = {home:'หน้าหลัก',scan:'ถ่ายรูปฉลากยา', search:'ค้นหายา', detail:'ข้อมูลยา', about:'เกี่ยวกับระบบ',};
let currentRoute = {name:'home', param:''};

// หน้าที่ผู้ใช้มาก่อนเข้าหน้าข้อมูลยา ใช้ตั้งปลายทางของปุ่มย้อนกลับ
let detailFrom = 'search';

// อ่านเส้นทางจากที่อยู่ของหน้า
function parseHash() {
    const raw = location.pathname.replace(/^\/+|\/+$/g, '');
    const parts = raw.split('/');
    let name = parts[0] || 'home';
    if (name === 'drug') name = 'detail';
    if (name === 'category') name = 'search';
    if (!VIEWS.includes(name)) name = 'home';
    return { name, param: parts[1] || '', sub: parts[2] || '' };
}

// เปลี่ยนไปหน้าอื่นโดยไม่โหลดเว็บใหม่
function go(path) {
    if (path === location.pathname) return;
    history.pushState(null, '', path);
    route();
}

// ดักคลิกลิงก์ภายในเว็บทั้งหมดไว้ที่เดียว ลิงก์ที่สร้างทีหลังจึงทำงานด้วย
document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const a = e.target.closest('a');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;

    const href = a.getAttribute('href');
    if (!href || !href.startsWith('/')) return;      // ลิงก์ออกนอกเว็บและลิงก์ #main ปล่อยผ่าน

    e.preventDefault();
    go(href);
});

// สลับหน้าตามเส้นทาง
function route() {
    stopSpeech();
    camClose();
    const prev = currentRoute.name;
    currentRoute = parseHash();
    if (currentRoute.name === 'detail' && prev !== 'detail') detailFrom = prev;
    const navName = currentRoute.name === 'detail' ? 'search' : currentRoute.name;

    VIEWS.forEach(v => {
        const el = $('#view-' + v);
        if (el) el.hidden = (v !== currentRoute.name);
    });

    $$('[data-nav]').forEach(a => {
        if (a.dataset.nav === navName) a.setAttribute('aria-current','page');
        else a.removeAttribute('aria-current');
    });

    document.title = TITLES[currentRoute.name] + ' · MedCheck';

    if (currentRoute.name === 'home')   { renderHome(); renderRecent(); }
    if (currentRoute.name === 'scan' && !(prev === 'detail' && detailFrom === 'scan')) camReset(false);
    if (currentRoute.name === 'search') renderSearch(currentRoute.param);
    if (currentRoute.name === 'detail') renderDetail(currentRoute.param);
    if (currentRoute.name === 'about')  renderAbout();
    if (currentRoute.name !== 'search') hideSuggest();
    initReveal($('#view-' + currentRoute.name));

    closeDrawer();
    window.scrollTo(0,0);
}

// วัดความสูงแถบบน
function syncHeaderHeight() {
    const h = Math.round($('.hdr').getBoundingClientRect().height);
    document.documentElement.style.setProperty('--hdr-h', h + 'px');
}

let scrollTick = false;

// ปรับแถบบนตามการเลื่อนหน้า
function syncHeaderState() {
    $('.hdr').classList.toggle('is-scrolled', window.scrollY > 8);
    scrollTick = false;
}

window.addEventListener('scroll', () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(syncHeaderState);
}, { passive:true});

window.addEventListener('resize', debounce(() => {
    syncHeaderHeight();
    syncDrawerForWidth();
}, 150));

if (window.ResizeObserver) new ResizeObserver(syncHeaderHeight).observe($('.hdr'));

const KEY_THEME = 'mc.theme';
const prefersDark = matchMedia('(prefers-color-scheme: dark)');

// โหมดสีที่ใช้อยู่
function currentTheme() {
    const set = document.documentElement.dataset.theme;
    if (set === 'dark' || set === 'light') return set;
    return prefersDark.matches ? 'dark' : 'light';
}

// ปรับปุ่มสลับโหมดสี
function syncThemeBtn() {
    const btn = $('#themeBtn');
    if (!btn) return;
    const dark = currentTheme() === 'dark';
    const ico = btn.querySelector('[data-ico]');
    if (ico) {
        ico.dataset.ico = dark ? 'sun' : 'moon';
        ico.innerHTML = svg(ico.dataset.ico);
        ico.dataset.icoDone = '1';
    }
    btn.setAttribute('aria-label', dark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด');
}

// ตั้งโหมดสี
function setTheme(mode) {
    document.documentElement.dataset.theme = mode;
    lsSet(KEY_THEME, mode);
    syncThemeBtn();
}

$('#themeBtn').addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
});

prefersDark.addEventListener('change', () => {
    if (!document.documentElement.dataset.theme) syncThemeBtn();
});

const KEY_FS = 'mc.fs';

// ระดับขนาดตัวอักษรที่ใช้อยู่
function currentFs() {
    return document.documentElement.dataset.fs || '1';
}

// ปรับปุ่มขนาดตัวอักษร
function syncFsBtn() {
    const now = currentFs();
    $$('.fs-ctl [data-fs]').forEach(b =>
        b.setAttribute('aria-pressed', String(b.dataset.fs === now)));
}

// ตั้งขนาดตัวอักษร
function setFs(level) {
    const v = String(level);
    if (v === '1') delete document.documentElement.dataset.fs;
    else document.documentElement.dataset.fs = v;

    lsSet(KEY_FS, v);
    syncFsBtn();
    syncHeaderHeight();
    syncDrawerForWidth();
}

$$('.fs-ctl [data-fs]').forEach(b =>
    b.addEventListener('click', () => setFs(b.dataset.fs)));

syncThemeBtn();
syncFsBtn();

let drawerPrev = null;

// ลิ้นชักเมนูเปิดอยู่หรือไม่
function drawerOpen() { return $('#drawer').classList.contains('open'); }

// เปิดลิ้นชักเมนู
function openDrawer() {
    if (drawerOpen()) return;
    drawerPrev = document.activeElement;
    $('#drawer').classList.add('open');
    $('#drawerBack').classList.add('open');
    $('#menuBtn').setAttribute('aria-expanded', 'true');
    $('#menuBtn').setAttribute('aria-label', 'ปิดเมนู');
    document.body.classList.add('locked');
    setTimeout(() => {
        const f = $('#drawer .drawer-nav a');
        if (f) f.focus();
    }, REDUCED() ? 0 : 120);
}

// ปิดลิ้นชักเมนู
function closeDrawer() {
    if (!$('#drawer') || !drawerOpen()) return;
    $('#drawer').classList.remove('open');
    $('#drawerBack').classList.remove('open');
    $('#menuBtn').setAttribute('aria-expanded', 'false');
    $('#menuBtn').setAttribute('aria-label', 'เปิดเมนู');
    document.body.classList.remove('locked');
    if (drawerPrev && drawerPrev.isConnected) drawerPrev.focus();
    drawerPrev = null;
}

// สลับรูปแบบเมนูตามความกว้างจอ
function syncDrawerForWidth() {
    const btn = $('#menuBtn');
    if (btn && getComputedStyle(btn).display === 'none') closeDrawer();
}

$('#menuBtn').addEventListener('click', ()=> { drawerOpen() ? closeDrawer() : openDrawer(); });
$('#drawerClose').addEventListener('click', closeDrawer);
$('#drawerBack').addEventListener('click', closeDrawer);
$('#drawer').addEventListener('click', e => { if (e.target.closest('a')) closeDrawer(); });

document.addEventListener('keydown', e => {
    if (!drawerOpen()) return;
    if (e.key === 'Escape') { e.preventDefault(); closeDrawer(); return; }
    if (e.key !== 'Tab') return;

    const f = $$('a[href],button:not([disabled])', $('#drawer'))
        .filter( x => x.offsetParent !== null);

    if (!f.length) return;

    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus();}
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus();}
});


// ตัวเลขสรุปบนหน้าแรก
function homeStats() {
  return [
    [DB.categories.length,   'กลุ่มอาการ'],
    [DB.formulations.length, 'สูตรตำรับ'],
    [DB.brands.filter(b => b.status === 'active').length, 'ยี่ห้อที่ตรวจสอบแล้ว'],
  ];
}

// การ์ดกลุ่มอาการ
function catCard(c) {
  return '<a class="catcard reveal" href="/category/' + encodeURIComponent(c.id) + '">' +
      '<span class="catcard-ico" data-ico="' + esc(c.icon || 'pill') + '"></span>' +
      '<span class="catcard-b"><b>' + esc(c.short) + '</b>' +
        '<span>' + formsOf(c.id).length + ' สูตรตำรับ · ' + brandsInCat(c.id).length + ' ยี่ห้อ</span></span>' +
      '<span class="catcard-go" data-ico="caret"></span>' +
    '</a>';
}

let homeDone = false;

// วาดหน้าแรก
function renderHome() {
    if (homeDone) return;

    $('#heroStats').innerHTML = homeStats().map(s =>
        '<div class="hero-stat"><b data-n="' + s[0] + '">0</b><span>' + s[1] + '</span></div>'
    ).join('');

    $$('#heroStats b').forEach((el, i) =>
        setTimeout(() => countUp(el, +el.dataset.n, 900), 260 + i * 130)
    );

    $('#homeCats').innerHTML = DB.categories.slice()
    .sort((a, b) => a.order - b.order)
    .map(catCard).join('');
    paintIcons($('#homeCats'));

    initSteps();
    initHeroTilt();
    homeDone = true;
}

// แถวรายการยาหนึ่งรายการ
function rowItem(b) {
  const ct = cat(b.categoryId);
  return '<li><a class="row" href="/drug/' + encodeURIComponent(b.id) + '">' +
      '<span class="row-b"><b>' + esc(thName(b.productName)) + '</b>' +
        (b.licensee ? '<span class="row-sub">' + esc(b.licensee) + '</span>' : '') +
        '<span class="tags">' +
          '<span class="pill pill-red">' + esc(ct ? ct.short : '') + '</span>' +
          '<span class="pill pill-grey">เลขทะเบียน ' + esc(b.regNo) + '</span>' +
          (b.status === 'active' ? '' : '<span class="pill pill-bad">ยกเลิกทะเบียน</span>') +
        '</span></span>' +
      '<span class="row-go" data-ico="caret"></span>' +
    '</a></li>';
}

let sState = { q: '', cat: '' };
let sBound = false;

// ข้อความที่ใช้ค้นหาของยาหนึ่งตัว
function sIndex(b) {
  const c = content(b), ct = cat(b.categoryId);
  const words = [
    b.productName, b.licensee, b.regNo,
    c.genericTh, c.genericEn, c.formName,
    c.ingredients.map(i => i.name).join(' '),
    ct ? ct.name : '', b.dosageForm,
  ];
  return norm(words.join(' ')) + '||' + regKey(b.regNo);
}

// ค้นหาแล้ววาดผลลัพธ์
function runSearch() {
  const q  = sState.q.trim();
  const nq = norm(q);
  const rq = regKey(q);

  let list = DB.brands.slice();
  if (sState.cat) list = list.filter(b => b.categoryId === sState.cat);
  if (nq) list = list.filter(b => {
    const idx = sIndex(b);
    return idx.includes(nq) || (rq.length >= 3 && idx.includes(rq));
  });

  list.sort((a, b) =>
    (a.status === b.status ? 0 : a.status === 'active' ? -1 : 1) ||
    a.productName.localeCompare(b.productName, 'th')
  );

  $('#resCount').textContent = 'ผลการค้นหา (' + list.length + ' รายการ)';
  $('#resRows').innerHTML = list.map(rowItem).join('');
  $('#resEmpty').innerHTML = list.length ? '' :
    '<div class="state mt-5">' +
      '<div class="state-ico is-warn">' + svg('search') + '</div>' +
      '<h2>ไม่พบยาที่ตรงกับคำค้นหา</h2>' +
      '<p>โปรดลองพิมพ์เพียงบางส่วนของชื่อยา เช่น “พารา” หรือพิมพ์ตัวยาสำคัญ เช่น “paracetamol” ' +
        'และตรวจสอบว่ายาที่ค้นหาอยู่ในขอบเขต 6 กลุ่มอาการของระบบ</p>' +
      '<div class="state-actions">' +
        '<button class="btn btn-primary" type="button" id="clrAll">ล้างตัวกรองทั้งหมด</button>' +
        '<a class="btn btn-outline" href="/about">ดูขอบเขตของระบบ</a>' +
      '</div>' +
    '</div>';

  paintIcons($('#view-search'));

  const clr = $('#clrAll');
  if (clr) clr.addEventListener('click', () => {
    sState = { q: '', cat: '' };
    $('#q').value = '';
    syncChips();
    runSearch();
  });

  $('#qClear').hidden = !q;
}

// ปรับปุ่มกรองกลุ่มอาการ
function syncChips() {
  $$('#chipbar [data-cat]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.cat === sState.cat)));
}

// วาดหน้าค้นหา
function renderSearch(pre) {
  if (!sBound) {

    $('#chipbar').innerHTML =
      '<button class="chip" type="button" data-cat="" aria-pressed="true">' +
        'ทั้งหมด<span class="n">' + DB.brands.length + '</span></button>' +
      DB.categories.slice().sort((a, b) => a.order - b.order).map(c =>
        // ชื่อเต็มกับชื่อย่ออยู่ในปุ่มเดียวกัน สลับด้วย CSS
        '<button class="chip" type="button" data-cat="' + esc(c.id) + '" aria-pressed="false">' +
          '<span class="t-full">' + esc(c.short) + '</span>' +
          '<span class="t-mini">' + esc(c.mini || c.short) + '</span>' +
          '<span class="n">' + brandsInCat(c.id).length + '</span></button>'
      ).join('');

    $('#chipbar').addEventListener('click', e => {
      const b = e.target.closest('[data-cat]');
      if (!b) return;
      sState.cat = b.dataset.cat;
      syncChips();
      runSearch();
    });

    const onType = debounce(() => {
      sState.q = $('#q').value;
      runSearch();
      renderSuggest();
    }, 180);
    $('#q').addEventListener('input', onType);
    $('#q').addEventListener('focus', () => { if ($('#q').value.trim()) renderSuggest(); });
    $('#q').addEventListener('blur', () => setTimeout(hideSuggest, 150));

    $('#q').addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if ($('#qList').hidden) renderSuggest(); else moveSuggest(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveSuggest(-1);
      } else if (e.key === 'Enter' && sugIdx >= 0) {
        e.preventDefault();
        gotoSuggest(sugIdx);
      } else if (e.key === 'Escape') {
        hideSuggest();
      }
    });

    $('#qList').addEventListener('mousedown', e => {
      const li = e.target.closest('[data-sug]');
      if (!li) return;
      e.preventDefault();
      gotoSuggest(+li.dataset.sug);
    });

    $('#qClear').addEventListener('click', () => {
      $('#q').value = '';
      sState.q = '';
      runSearch();
      hideSuggest();
      $('#q').focus();
    });

    initMic();
    sBound = true;
  }

  if (pre) sState.cat = cat(pre) ? pre : '';
  $('#q').value = sState.q;
  hideSuggest();
  syncChips();
  runSearch();
}

// กล่องยาเอียงตามเมาส์
function initHeroTilt() {
    const box =$('.box3d');
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (!box || !fine || REDUCED()) return;

    const hero = box.closest('.hero');
    const BASE_X = -10, BASE_Y = -24;
    let goalX = BASE_X, goalY = BASE_Y;
    let nowX = BASE_X, nowY = BASE_Y;
    let raf = 0;

    function tick() {
        nowX += (goalX - nowX) * 0.1;
        nowY += (goalY - nowY) * 0.1;
        box.style.setProperty('--rx', nowX.toFixed(2) + 'deg');
        box.style.setProperty('--ry', nowY.toFixed(2) + 'deg');

        const moving = Math.abs(goalX - nowX) > 0.03 || Math.abs(goalY - nowY) > 0.03;
        raf = moving ? requestAnimationFrame(tick) : 0;
    }
    function start() {
        if (!raf) raf = requestAnimationFrame(tick);
    }

    hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width * 2 - 1;
        const ny = (e.clientY - r.top) / r.height * 2 - 1;
        goalY = BASE_Y + nx * 18;
        goalX = BASE_X - ny * 10;
        start();
    });

    hero.addEventListener('pointerleave', () => {
        goalX = BASE_X;
        goalY = BASE_Y;
        start();
    });
}

let stepsBound = false;

// เปิดปิดการ์ดขั้นตอน
function openStep(card, on) {
    if (!card) return;
    card.classList.toggle('is-open', on);
    card.setAttribute('aria-expanded', String(on));
}

// เริ่มการ์ดขั้นตอนบนหน้าแรก
function initSteps() {
    const list = $('#stepList');
    if (!list || stepsBound) return;

const cards = $$('.step', list);
const hoverable = matchMedia('(hover:hover) and (pointer:fine)').matches;

cards.forEach( c => {
    if (hoverable) {
        c.addEventListener('mouseenter', () => openStep(c, true));
        c.addEventListener('mouseleave', () => openStep(c, false));
    }
    c.addEventListener('focus', () => openStep(c, true));
    c.addEventListener('blur', () => openStep(c, false));

    c.addEventListener('click', () => {
        const on = !c.classList.contains('is-open');
        cards.forEach(o => openStep(o, false));
        openStep(c, on);
    });
});

stepsBound = true;

}

// หน้าจอเปิดตัว
function runIntro() {
  const el = $('#intro');
  const root = document.documentElement;
  if (!el) return;

  if (REDUCED()) {
    el.remove();
    root.classList.add('entered');
    return;
  }

  root.classList.add('intro-on');

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    el.classList.add('out');
    root.classList.remove('intro-on');
    root.classList.add('entered');
    setTimeout(() => el.remove(), 480);
  };

  setTimeout(finish, 1250);
  el.addEventListener('click', finish);
  document.addEventListener('keydown', finish, { once: true });
}

let sugItems = [];
let sugIdx = -1;

// ซ่อนรายการคำแนะนำ
function hideSuggest() {
  const list = $('#qList');
  if (!list) return;
  list.hidden = true;
  list.innerHTML = '';
  sugItems = [];
  sugIdx = -1;
  $('#q').setAttribute('aria-expanded', 'false');
  $('#q').removeAttribute('aria-activedescendant');
}

// วาดคำแนะนำขณะพิมพ์
function renderSuggest() {
  const q = $('#q').value.trim();
  const list = $('#qList');
  if (!q) { hideSuggest(); return; }

  const nq = norm(q), rq = regKey(q);
  sugItems = DB.brands
    .filter(b => { const idx = sIndex(b); return idx.includes(nq) || (rq.length >= 3 && idx.includes(rq)); })
    .sort((a, b) => (a.status === b.status ? 0 : a.status === 'active' ? -1 : 1))
    .slice(0, 6);

  list.innerHTML = sugItems.length
    ? '<li class="s-head" role="presentation">ยาที่ตรงกับ “' + esc(q) + '”</li>' +
      sugItems.map((b, i) => {
        const c = content(b), ct = cat(b.categoryId);
        return '<li role="option" id="sug-' + i + '" aria-selected="false" data-sug="' + i + '">' +
            '<span class="s-ico">' + svg(b.packaging === 'blister' ? 'blister' : 'bottle') + '</span>' +
            '<span class="s-b"><b>' + esc(thName(b.productName)) + '</b>' +
              '<span>' + esc(c.genericTh || c.genericEn) + ' · ' + esc(ct ? ct.short : '') + '</span></span>' +
            '<span class="s-go">' + svg('arrow') + '</span>' +
          '</li>';
      }).join('')
    : '<li class="s-empty" role="presentation">ไม่พบยาที่ตรงกับ “' + esc(q) + '” โปรดลองพิมพ์ให้สั้นลง เช่น “พารา”</li>';

  list.hidden = false;
  $('#q').setAttribute('aria-expanded', 'true');
  sugIdx = -1;
}

// เลื่อนคำแนะนำด้วยปุ่มลูกศร
function moveSuggest(step) {
  const n = sugItems.length;
  if (!n) return;

  sugIdx = (sugIdx < 0 && step < 0) ? n - 1 : (sugIdx + step + n) % n;

  $$('#qList [data-sug]').forEach((el, i) => {
    const on = i === sugIdx;
    el.classList.toggle('hi', on);
    el.setAttribute('aria-selected', String(on));
    if (on) {
      $('#q').setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block: 'nearest' });
    }
  });
}

// เปิดยาที่เลือกจากคำแนะนำ
function gotoSuggest(i) {
  const b = sugItems[i];
  if (!b) return;
  hideSuggest();
  $('#q').blur();
  go('/drug/' + encodeURIComponent(b.id));
}

const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null;

// ข้อความสถานะของไมโครโฟน
function sayMsg(text) {
  const m = $('#qMsg');
  m.textContent = text;
  m.hidden = !text;
}

// เริ่มการค้นหาด้วยเสียง
function initMic() {
  const btn = $('#qMic');
  const box = $('.searchwrap .searchbox');
  if (!SpeechRec) {
    btn.hidden = true;
    box.classList.add('no-mic');
    return;
  }

  btn.hidden = false;
  btn.addEventListener('click', () => {
    if (recog) { recog.stop(); return; }

    recog = new SpeechRec();
    recog.lang = 'th-TH';
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    recog.onresult = e => {
      const t = (e.results[0][0].transcript || '').trim();
      if (!t) return;
      $('#q').value = t;
      sState.q = t;
      runSearch();
      renderSuggest();
      sayMsg('ได้ยินว่า “' + t + '”');
    };

    recog.onerror = e => {
      sayMsg(e.error === 'not-allowed' ? 'โปรดอนุญาตให้เว็บไซต์ใช้ไมโครโฟน'
           : e.error === 'no-speech'   ? 'ไม่ได้ยินเสียงพูด โปรดลองใหม่อีกครั้ง'
           : 'ฟังเสียงไม่สำเร็จ โปรดลองใหม่อีกครั้ง');
    };

    recog.onend = () => {
      recog = null;
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'พูดเพื่อค้นหา');
    };

    try {
      recog.start();
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('aria-label', 'หยุดฟัง');
      sayMsg('กำลังฟัง… พูดชื่อยาที่ต้องการค้นหา');
    } catch (err) {
      recog = null;
    }
  });
}

const TTS_OK = 'speechSynthesis' in window;
let ttsBtn = null;
let ttsUtter = null;
let ttsGap = null;

// ช่วงเว้นระหว่างประโยค และความเร็วในการอ่าน
const SPEAK_GAP  = 650;
const SPEAK_RATE = 0.86;

const VOICE_PREF = ['Premwadee', 'Niwat', 'Natural', 'Online', 'Google', 'Kanya', 'Pattara'];

// เลือกเสียงภาษาไทย
function pickThaiVoice(localOnly) {
  const th = speechSynthesis.getVoices().filter(v =>
    /^th/i.test(v.lang) && (v.localService || (!localOnly && navigator.onLine))
  );
  for (const key of VOICE_PREF) {
    const found = th.find(v => v.name.includes(key));
    if (found) return found;
  }
  return th[0] || null;
}

// รอรายชื่อเสียงให้พร้อม
function whenVoicesReady() {
  if (speechSynthesis.getVoices().length) return Promise.resolve();
  return new Promise(done => {
    const t = setTimeout(done, 1500);
    speechSynthesis.addEventListener('voiceschanged', () => { clearTimeout(t); done(); }, { once: true });
  });
}

// อ่านชื่อยาออกเสียง
function speakName(name) {
  const s = String(name || '');
  if (!/[฀-๿]/.test(s)) return s;
  return s.replace(/[A-Za-z][A-Za-z.&'-]*(\s+\d+)?/g, '')
          .replace(/\(\s*\)/g, '')
          .replace(/\s+-(\s+|$)/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
}

const SAY_AS = [
  ['พาราเซตามอล', 'พารา เซ ตา มอล'],
];

// แปลงข้อความให้อ่านออกเสียงได้ถูก
function forSpeech(t) {
  let s = String(t);
  SAY_AS.forEach(([from, to]) => { s = s.split(from).join(to); });
  return s
    .replace(/(\d)\s*-\s*(\d)/g, '$1 ถึง $2')
    .replace(/(\d+)\s*\/\s*(\d+)/g, '$1 ทับ $2')
    .replace(/(\d)([A-Z])/g, '$1 $2')
    .replace(/(\d)\s*mg\b/gi, '$1 มิลลิกรัม')
    .replace(/(\d)\s*ml\b/gi, '$1 มิลลิลิตร')
    .replace(/\s+/g, ' ')
    .trim();
}

if (TTS_OK) speechSynthesis.getVoices();

// คืนปุ่มอ่านออกเสียงสู่สถานะปกติ
function ttsReset() {
  if (ttsBtn) {
    ttsBtn.setAttribute('aria-pressed', 'false');
    ttsBtn.querySelector('span').textContent = 'ฟังข้อมูลยา';
  }
  ttsBtn = null;
  ttsUtter = null;
}

// หยุดอ่านออกเสียง
function stopSpeech() {
  clearTimeout(ttsGap);
  if (TTS_OK) speechSynthesis.cancel();
  ttsReset();
}

// อ่านข้อความออกเสียง
function speakText(text, btn, localOnly) {
  if (!TTS_OK) return;
  const same = ttsBtn === btn;
  stopSpeech();
  if (same && !localOnly) return;

  ttsBtn = btn;
  btn.setAttribute('aria-pressed', 'true');
  btn.querySelector('span').textContent = 'หยุดอ่าน';

  whenVoicesReady().then(() => {
    if (ttsBtn !== btn) return;

    const voice = pickThaiVoice(localOnly);
    console.log('เสียงที่ใช้อ่าน:', voice ? voice.name : 'ไม่พบเสียงไทย · เบราว์เซอร์เลือกเอง');
    const parts = forSpeech(text).split(/\.\s+/).filter(Boolean);
    if (!parts.length) { ttsReset(); return; }

    // ต่อคิวทีละประโยคแทนการโยนเข้าคิวทีเดียว จะได้เว้นช่วงระหว่างประโยคได้เอง
    let at = 0;
    const next = () => {
      if (ttsBtn !== btn) return;
      if (at >= parts.length) { ttsReset(); return; }

      const u = new SpeechSynthesisUtterance(parts[at++]);
      u.lang = 'th-TH';
      u.rate = SPEAK_RATE;
      if (voice) u.voice = voice;

      u.onend = () => {
        if (ttsUtter !== u) return;
        ttsGap = setTimeout(next, SPEAK_GAP);
      };

      u.onerror = e => {
        if (ttsUtter !== u) return;
        const online = voice && !voice.localService;
        if (online && !localOnly && e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('เสียงออนไลน์ใช้ไม่ได้ (' + e.error + ') → เปลี่ยนเป็นเสียงในเครื่อง');
          speakText(text, btn, true);
          return;
        }
        ttsReset();
      };

      ttsUtter = u;
      speechSynthesis.speak(u);
    };

    next();
  });
}

const KEY_RECENT = 'mc.recent';

// บันทึกยาที่เพิ่งเปิดดู
function pushRecent(id) {
  const list = lsGet(KEY_RECENT, []);
  lsSet(KEY_RECENT, [id].concat(list.filter(x => x !== id)).slice(0, 5));
}

// รายการยาที่ดูล่าสุด
const getRecent = () => lsGet(KEY_RECENT, []).map(brand).filter(Boolean);

// วาดรายการดูล่าสุด
function renderRecent() {
  const rec = getRecent();
  $('#recentWrap').hidden = rec.length === 0;
  $('#recentRows').innerHTML = rec.map(rowItem).join('');
  paintIcons($('#recentRows'));
}

/*  หน้าข้อมูลยา · เรียงหัวข้อตามลำดับที่พิมพ์อยู่บนกล่องยาจริง
    ตัวยาสำคัญ · สรรพคุณ · ขนาดและวิธีใช้ · คำเตือน · ผลิตโดย
    ห้ามสลับลำดับ ผู้ใช้ถือกล่องยาอยู่ในมือแล้วไล่สายตาเทียบทีละบรรทัด
    เส้นทางเก่าอย่าง /drug/:id/dose ยังเปิดได้ แค่ไม่มีแท็บให้สลับแล้ว  */

// ส่วนหัว · สถานะ หมวดหมู่ และเลขทะเบียน อยู่แถวเดียวกันเหนือชื่อยา
function detailHead(b, c, ct) {
  const ok = b.status === 'active';
  return '<div class="res-hero">' +
    '<div class="res-badges">' +
      (ok ? '<span class="pill pill-ok">' + svg('check-c') + 'ขึ้นทะเบียน อย. แล้ว</span>'
          : '<span class="pill pill-bad">' + svg('ban') + 'ยกเลิกทะเบียนแล้ว</span>') +
      (ct ? '<span class="pill pill-red">' + esc(ct.short) + '</span>' : '') +
      '<span class="pill pill-grey">เลขทะเบียน <b>' + esc(b.regNo) + '</b></span>' +
      (TTS_OK ? '<button class="speak" type="button" id="readDrug" aria-pressed="false" ' +
                  'style="margin-inline-start:auto">' + svg('speaker') +
                  '<span>ฟังข้อมูลยา</span></button>' : '') +
    '</div>' +
    // ใต้ชื่อยาไม่มีบรรทัดอะไรแล้ว · ชื่อสามัญซ้ำกับหัวข้อตัวยาสำคัญที่อยู่ถัดลงไป
    '<h1 class="res-title">' + esc(thName(b.productName)) + '</h1>' +
  '</div>';
}

// หนึ่งหัวข้อในเอกสาร · ป้ายอยู่ซ้าย เนื้อหาอยู่ขวา จอแคบป้ายขึ้นไปอยู่บน
function insRow(label, body) {
  return '<div class="ins-row">' +
    '<p class="ins-lb">' + label + '</p>' +
    '<div class="ins-vl">' + body + '</div>' +
  '</div>';
}

// รายการข้อ · ใส่เลขข้อเมื่อฉลากจริงใส่เลขกำกับไว้ เช่น คำเตือน
function insList(list, num) {
  if (!list.length) return '<p class="nodata">ไม่มีข้อมูลในระบบ</p>';
  const tag = num ? 'ol' : 'ul';
  return '<' + tag + ' class="items' + (num ? ' num' : '') + '">' +
    list.map(t => '<li>' + (num ? '' : '<span class="bul"></span>') +
      '<span>' + esc(t) + '</span></li>').join('') +
  '</' + tag + '>';
}

// เอกสารกำกับยาทั้งก้อน
function insertDoc(b, c) {
  const ing  = ingredientsTh(c);
  // วิธีใช้บันทึกเป็นข้อ ๆ คั่นด้วยขึ้นบรรทัดใหม่ · ของเดิมที่เป็นข้อความยาวก็ยังแสดงได้
  const dose = String(c.dosage || '').split('\n').map(s => s.trim()).filter(Boolean);
  const warn = c.warnings || [];

  return '<div class="ins">' +

    insRow('ตัวยาสำคัญ', ing.length
      ? '<ul class="items">' + ing.map(p =>
          '<li class="ing"><b>' + esc(p[0]) + '</b>' +
          (p[1] ? '<span class="dots" aria-hidden="true"></span>' +
                  '<i>' + esc(p[1]) + '</i>' : '') + '</li>').join('') + '</ul>'
      : '<p class="nodata">ไม่มีข้อมูลในระบบ</p>') +

    insRow('สรรพคุณ', insList(c.indications || [], false)) +

    insRow('ขนาดและวิธีใช้', insList(dose, false)) +

    insRow('คำเตือน', warn.length
      ? '<ol class="items num is-warn">' + warn.map(w =>
          '<li' + (w.level === 'danger' ? ' class="hot"' : '') + '>' +
          '<span>' + esc(w.text) + '</span></li>').join('') + '</ol>'
      : '<p class="nodata">ไม่มีข้อมูลคำเตือนของสูตรตำรับนี้ในระบบ ' +
        'โปรดอ่านคำเตือนจากฉลากของผลิตภัณฑ์จริง</p>') +

    insRow('ผลิตโดย', '<p>' + esc(b.licensee || 'ไม่มีข้อมูลในระบบ') + '</p>') +

  '</div>' +

  // คำเตือนของระบบเอง ไม่ใช่ข้อความบนฉลาก จึงอยู่นอกตัวเอกสาร
  '<div class="notice is-danger mt-4">' + svg('alert') +
    '<div><p>หากมีอาการแพ้ยา เช่น ผื่นขึ้น หน้าบวม หายใจลำบาก ' +
    'หรืออาการไม่ดีขึ้นตามระยะเวลาที่ระบุ ให้หยุดใช้ยาและพบแพทย์หรือเภสัชกรทันที</p></div></div>';
}

// ส่วนท้ายของหน้าข้อมูลยา
function detailFoot() {
  return '<div class="res-foot">' +
    '<div class="res-actions">' +
      '<a class="btn btn-primary" href="/scan">' + svg('camera') + 'ถ่ายภาพฉลากใหม่</a>' +
      '<a class="btn btn-outline" href="/search">' + svg('search') + 'ค้นหายาชนิดอื่น</a>' +
    '</div>' +
    '<p class="disclaimer">' + svg('info') + '<span>ข้อมูลนี้เป็นข้อมูลอ้างอิงเพื่อการศึกษา ' +
      'ชื่อผลิตภัณฑ์ เลขทะเบียน ผู้รับอนุญาต และสถานะทะเบียน อ้างอิงจากข้อมูลทะเบียนยาของ อย. ' +
      'ส่วนข้อบ่งใช้ ขนาดการใช้ และคำเตือน จัดทำโดยคณะผู้จัดทำตามสูตรตำรับ ' +
      'โปรดอ่านฉลากจากผลิตภัณฑ์จริงและปรึกษาแพทย์หรือเภสัชกรก่อนใช้ยา</span></p>' +
  '</div>';
}

// ปลายทางของปุ่มย้อนกลับ แยกตามหน้าที่ผู้ใช้มา
const BACK_TO = {
  scan:   ['scan',   'กลับไปหน้าถ่ายรูปฉลากยา'],
  home:   ['',       'กลับหน้าหลัก'],
  search: ['search', 'กลับไปหน้าค้นหา'],
};

// วาดหน้าข้อมูลยา
function renderDetail(id) {
  const host = $('#detailBody');
  const b = brand(id);

  if (!b) {
    host.innerHTML = '<div class="state"><div class="state-ico is-warn">' + svg('search') + '</div>' +
      '<h2>ไม่พบข้อมูลยาที่ต้องการ</h2><p>รายการนี้อาจถูกลบออกจากฐานข้อมูลแล้ว</p>' +
      '<div class="state-actions"><a class="btn btn-primary" href="/search">กลับไปหน้าค้นหา</a></div></div>';
    return;
  }

  pushRecent(b.id);
  const c = content(b), ct = cat(b.categoryId);
  const others = brandsOf(b.formulationId).filter(x => x.id !== b.id);
  const backTo = BACK_TO[detailFrom] || BACK_TO.search;

  host.innerHTML =
    '<div class="page-head"><a class="backlink" href="/' + backTo[0] + '" aria-label="' + backTo[1] + '">' +
      svg('back') + '</a></div>' +
    '<div class="rescard">' +
      detailHead(b, c, ct) +
      '<div class="resdoc">' + insertDoc(b, c) + '</div>' +
      detailFoot() +
    '</div>' +
    (others.length
      ? '<div class="sec-sm res-wide">' +
          '<h2 style="font-size:1.35rem">ยี่ห้ออื่นที่ใช้สูตรตำรับเดียวกัน</h2>' +
          '<p class="text-sm muted mt-2">ตัวยาสำคัญเหมือนกัน แต่คนละยี่ห้อและคนละเลขทะเบียนตำรับยา</p>' +
          '<ul class="rows">' + others.map(rowItem).join('') + '</ul>' +
        '</div>'
      : '');

  paintIcons(host);
  bindDetail(host, b, c, ct);
}

// เรียกเซิร์ฟเวอร์จริงหรือใช้ตัวจำลอง
const LIVE_API   = !USE_MOCK && !!API_BASE;
const SCAN_API   = LIVE_API ? API_BASE + '/scan' : '';

// ที่อยู่เส้นทางตรวจทะเบียน
const verifyUrl  = id => API_BASE + '/verify/' + encodeURIComponent(id);

let camStream   = null;
let camUrl      = null;
let camFileLast = null;
let camFromCam  = false;

// ข้อความสถานะใต้กรอบภาพ
function camSay(text) {
  const m = $('#camMsg');
  if (!m) return;
  m.textContent = text || '';
  m.hidden = !text;
}

// ตั้งสถานะของหน้าถ่ายรูป
function camState(state) {
  const stage = $('#camStage');
  if (!stage) return;

  stage.dataset.state = (state === 'sending' || state === 'result') ? 'shot' : state;
  stage.classList.toggle('is-sending', state === 'sending');

  $('#camStart').hidden  = state !== 'idle';
  $('#camShoot').hidden  = state !== 'live';
  $('#camRetry').hidden  = !(state === 'shot' || state === 'sending');
  $('#camCtl').hidden    = state === 'result';
  $('#camResult').hidden = state !== 'result';

  const busy = state === 'sending';
  $$('#camCtl button').forEach(b => b.disabled = busy);
  $('#camCtl').classList.toggle('is-busy', busy);
}

// เปิดกล้อง
async function camOpen() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    camSay('เบราว์เซอร์นี้ไม่รองรับการใช้กล้อง โปรดเลือกภาพจากเครื่องแทน');
    return;
  }

  camSay('กำลังเปิดกล้อง…');

  try {
    camStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { ideal: 'environment' },
               width:  { ideal: 1920 },
               height: { ideal: 1080 } }
    });
  } catch (err) {
    camFail(err);
    return;
  }

  const v = $('#camView');
  v.srcObject = camStream;
  await v.play();

  camState('live');
  camSay('');
}

// แจ้งเมื่อเปิดกล้องไม่ได้
function camFail(err) {
  console.error(err);
  camStream = null;
  camState('idle');

  if (err.name === 'NotAllowedError') {
    camSay('ไม่ได้รับอนุญาตให้ใช้กล้อง โปรดอนุญาตในการตั้งค่าของเบราว์เซอร์ หรือเลือกภาพจากเครื่องแทน');
  } else if (err.name === 'NotFoundError') {
    camSay('ไม่พบกล้องในอุปกรณ์นี้ โปรดเลือกภาพจากเครื่องแทน');
  } else if (err.name === 'NotReadableError') {
    camSay('กล้องกำลังถูกใช้งานโดยแอปพลิเคชันอื่น โปรดปิดแอปพลิเคชันนั้นแล้วลองใหม่อีกครั้ง');
  } else {
    camSay('เปิดกล้องไม่สำเร็จ โปรดลองใหม่อีกครั้ง');
  }
}

// ถ่ายภาพจากกล้อง
function camShoot() {
  const v = $('#camView');
  const c = $('#camWork');
  const w = v.videoWidth, h = v.videoHeight;

  if (!w || !h) { camSay('ภาพจากกล้องยังไม่พร้อม โปรดรอสักครู่แล้วลองใหม่อีกครั้ง'); return; }

  c.width = w;
  c.height = h;
  c.getContext('2d').drawImage(v, 0, 0, w, h);

  c.toBlob(blob => {
    if (!blob) { camSay('บันทึกภาพไม่สำเร็จ โปรดถ่ายใหม่อีกครั้ง'); return; }
    camFromCam = true;
    camShow(blob);
    readLabel(blob);
  }, 'image/jpeg', 0.92);

  camClose();
  camState('shot');
}

// แสดงภาพที่ได้
function camShow(file) {
  if (camUrl) URL.revokeObjectURL(camUrl);
  camUrl = URL.createObjectURL(file);
  $('#camShot').src = camUrl;
  camState('shot');
}

// ปิดกล้อง
function camClose() {
  if (!camStream) return;
  camStream.getTracks().forEach(t => t.stop());
  camStream = null;
  const v = $('#camView');
  if (v) v.srcObject = null;
}

// เริ่มหน้าถ่ายรูปใหม่
function camReset(reopen) {
  camClose();
  if (camUrl) { URL.revokeObjectURL(camUrl); camUrl = null; }
  camFileLast = null;
  $('#camShot').removeAttribute('src');
  $('#camResult').innerHTML = '';
  camSay('');
  camState('idle');
  if (reopen) camOpen();
}

// ข้อความผิดพลาดที่เซิร์ฟเวอร์ส่งมา
async function errText(res) {
  let detail = null;
  try { detail = (await res.json()).detail; } catch (e) {}

  if (typeof detail === 'string' && detail) return detail;
  if (res.status === 422) return 'ส่งภาพไม่ถูกรูปแบบ โปรดถ่ายใหม่อีกครั้ง';
  return 'อ่านฉลากไม่สำเร็จ (รหัส ' + res.status + ')';
}

// ด้านยาวสุดของภาพที่ส่งขึ้นเซิร์ฟเวอร์ และเวลารอสูงสุด
const MAX_EDGE = 1600;
const SCAN_TIMEOUT = 60000;

// ย่อภาพก่อนส่ง ภาพจากกล้องมือถือใหญ่หลายเมกะไบต์ ทำให้อัปโหลดช้าโดยไม่จำเป็น
function shrink(file) {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      const long  = Math.max(img.width, img.height);
      const scale = Math.min(1, MAX_EDGE / long);
      if (scale === 1 && file.size <= 900 * 1024) { resolve(file); return; }

      const c = document.createElement('canvas');
      c.width  = Math.round(img.width  * scale);
      c.height = Math.round(img.height * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(b => resolve(b || file), 'image/jpeg', 0.85);
    };

    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

// ส่งภาพฉลากไปให้เซิร์ฟเวอร์อ่าน
async function sendLabel(file) {
  if (!SCAN_API) return fakeScan();

  const fd = new FormData();
  fd.append('file', await shrink(file), 'label.jpg');

  // ตัดการรอเองเมื่อครบเวลา ไม่งั้นถ้าเซิร์ฟเวอร์เงียบ หน้าเว็บจะหมุนค้างไปเรื่อย ๆ
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), SCAN_TIMEOUT);

  let res;
  try {
    res = await fetch(SCAN_API, { method: 'POST', body: fd, signal: ctrl.signal });
  } catch (e) {
    throw new Error(e.name === 'AbortError'
      ? 'เซิร์ฟเวอร์ใช้เวลานานเกินไป โปรดลองใหม่อีกครั้ง'
      : 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ โปรดตรวจสอบอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง');
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) throw new Error(await errText(res));
  return res.json();
}

// ดึงเลขทะเบียนจากคำตอบของเซิร์ฟเวอร์
function regNosOf(res) {
  if (res.brand && res.brand.reg_no) return [res.brand.reg_no];
  if (Array.isArray(res.candidates))  return res.candidates.map(c => c.reg_no).filter(Boolean);
  return [];
}

// ตัวจำลองคำตอบของเซิร์ฟเวอร์
function fakeScan() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const r = Math.random();

      if (r < 0.12) { reject(new Error('เชื่อมต่อส่วนอ่านฉลากไม่ได้ โปรดลองใหม่อีกครั้ง')); return; }

      if (r < 0.24) {
        resolve({ match_type: 'not_found', ocr_text: '', ocr_reg_no: null,
                  brand: null, medicine: null, candidates: [] });
        return;
      }

      if (r < 0.36) {
        resolve({ match_type: 'out_of_scope', ocr_text: '', ocr_reg_no: '5C 12/61',
                  brand: null, medicine: null, candidates: [] });
        return;
      }

      if (r < 0.60) {
        const groups = DB.formulations.map(f => brandsOf(f.id)).filter(g => g.length > 1);
        const group  = groups.length ? groups[Math.floor(Math.random() * groups.length)] : [DB.brands[0]];
        resolve({ match_type: 'active_ingredient', ocr_text: '', ocr_reg_no: null,
                  brand: null, medicine: null,
                  candidates: group.map(b => ({ reg_no: b.regNo, brand_name: b.productName })) });
        return;
      }

      const b = DB.brands[Math.floor(Math.random() * DB.brands.length)];
      resolve({
        match_type: r < 0.82 ? 'reg_no' : 'brand_name',
        ocr_text: '',
        ocr_reg_no: r < 0.82 ? b.regNo : null,
        brand: { reg_no: b.regNo, brand_name: b.productName },
        medicine: null,
        candidates: [],
      });
    }, 1200);
  });
}

// ขั้นตอนตั้งแต่ได้ภาพจนแสดงผล
async function readLabel(file) {
  camFileLast = file;
  camState('sending');
  camSay('กำลังอ่านข้อความบนฉลาก โปรดรอสักครู่');

  const slow = setTimeout(() => camSay('เซิร์ฟเวอร์กำลังเริ่มทำงาน อาจใช้เวลานานกว่าปกติเล็กน้อย'), 7000);

  let res;
  try {
    res = await sendLabel(file);
  } catch (err) {
    console.error(err);
    res = { error: err.message || 'เชื่อมต่อไม่สำเร็จ' };
  }

  clearTimeout(slow);
  camSay('');
  showResult(res);
  camState('result');
}

// ข้อความของการ์ดผลลัพธ์แต่ละแบบ
const MATCH_INFO = {
  reg_no: {
    tone: 'is-ok', icon: 'check-c',
    head: 'พบข้อมูลยาที่ตรงกับฉลาก',
    note: 'ระบบอ่านเลขทะเบียนตำรับยาบนฉลากได้ และตรงกับข้อมูลในระบบ',
  },
  brand_name: {
    tone: 'is-ok', icon: 'check-c',
    head: 'พบยาที่ชื่อตรงกับฉลาก',
    note: 'ระบบจับคู่จากชื่อยี่ห้อ โปรดตรวจเลขทะเบียนบนฉลากให้ตรงกันอีกครั้งก่อนใช้ข้อมูล',
  },
  active_ingredient: {
    tone: 'is-warn', icon: 'alert',
    head: 'พบยาที่มีตัวยาสำคัญตรงกัน',
    note: 'ระบบอ่านชื่อยี่ห้อและเลขทะเบียนไม่ได้ จึงจับคู่จากตัวยาสำคัญแทน ' +
          'โปรดเลือกรายการที่ตรงกับฉลากที่ถืออยู่',
  },
};

// วาดการ์ดผลการอ่านฉลาก
function showResult(res) {
  const host = $('#camResult');

  const regNos = regNosOf(res);
  const list   = regNos.map(brandByReg).filter(Boolean);

  if (regNos.length && !list.length) {
    console.warn('เซิร์ฟเวอร์จับคู่ยาได้ แต่ไม่มีเลขทะเบียนนี้ในไฟล์ข้อมูล', regNos);
  }

  if (res.error) {
    host.innerHTML =
      '<div class="state">' +
        '<div class="state-ico is-warn">' + svg('alert') + '</div>' +
        '<h2>อ่านฉลากไม่สำเร็จ</h2>' +
        '<p>' + esc(res.error) + '</p>' +
        '<div class="state-actions">' +
          '<button class="btn btn-primary" type="button" id="camAgain">ลองใหม่อีกครั้ง</button>' +
          '<button class="btn btn-outline" type="button" id="camNew">ถ่ายใหม่</button>' +
        '</div>' +
      '</div>';

  } else if (list.length) {
    const info = MATCH_INFO[res.match_type] || MATCH_INFO.reg_no;
    const many = list.length > 1;

    host.innerHTML =
      '<div class="state">' +
        '<div class="state-ico ' + info.tone + '">' + svg(info.icon) + '</div>' +
        '<h2>' + info.head + (many ? ' ' + list.length + ' รายการ' : '') + '</h2>' +
        '<p>' + info.note + '</p>' +
      '</div>' +
      '<ul class="rows mt-4">' + list.map(rowItem).join('') + '</ul>' +
      '<div class="state-actions">' +
        (many ? '' :
          '<a class="btn btn-primary" href="/drug/' + encodeURIComponent(list[0].id) + '">' +
            svg('arrow') + 'ดูข้อมูลยา</a>') +
        '<button class="btn ' + (many ? 'btn-soft' : 'btn-outline') + '" type="button" id="camNew">' +
          'ถ่ายใหม่</button>' +
      '</div>';

  } else if (res.match_type === 'out_of_scope') {

    host.innerHTML =
      '<div class="state">' +
        '<div class="state-ico is-warn">' + svg('info') + '</div>' +
        '<h2>ยานี้อยู่นอกขอบเขตของระบบ</h2>' +
        '<p>ระบบอ่านเลขทะเบียนบนฉลากได้' +
          (res.ocr_reg_no ? 'เป็น ' + esc(res.ocr_reg_no) : '') +
          ' แต่ยาตัวนี้ไม่ได้อยู่ในกลุ่มยาสามัญประจำบ้านที่ระบบรวบรวมไว้ ' +
          'จึงไม่มีข้อมูลข้อบ่งใช้และคำเตือนให้แสดง โปรดอ่านฉลากจากผลิตภัณฑ์จริง ' +
          'หรือปรึกษาเภสัชกร</p>' +
        '<div class="state-actions">' +
          '<button class="btn btn-primary" type="button" id="camNew">ถ่ายใหม่</button>' +
          '<a class="btn btn-outline" href="/about">' + svg('info') + 'ดูขอบเขตของระบบ</a>' +
        '</div>' +
      '</div>';

  } else {
    host.innerHTML =
      '<div class="state">' +
        '<div class="state-ico is-warn">' + svg('search') + '</div>' +
        '<h2>ไม่พบยาที่ตรงกับฉลากนี้</h2>' +
        '<p>สาเหตุอาจเกิดจากภาพไม่ชัด มีแสงสะท้อนบนฉลาก หรือยานี้ยังไม่อยู่ในขอบเขตของระบบ ' +
          'โปรดถ่ายใหม่ให้เห็นชื่อยาและเลขทะเบียนชัดเจน หรือค้นหาด้วยชื่อยาแทน</p>' +
        '<div class="state-actions">' +
          '<button class="btn btn-primary" type="button" id="camNew">ถ่ายใหม่</button>' +
          '<a class="btn btn-outline" href="/search">' + svg('search') + 'ค้นหาด้วยชื่อยา</a>' +
        '</div>' +
      '</div>';
  }

  paintIcons(host);

  if (LIVE_API && list.length === 1 && res.brand && res.brand.id) verifyBrand(res.brand.id, host);

  const again = $('#camAgain', host);
  if (again) again.addEventListener('click', () => { if (camFileLast) readLabel(camFileLast); });

  const fresh = $('#camNew', host);
  if (fresh) fresh.addEventListener('click', () => camReset(camFromCam));
}

// เรียกตรวจทะเบียนกับ อย.
function verifyBrand(brandId, host) {
  const box = document.createElement('div');
  box.className = 'notice vfy';
  box.setAttribute('aria-live', 'polite');
  box.innerHTML =
    '<span class="vfy-spin" aria-hidden="true"></span>' +
    '<div><h4>กำลังตรวจสอบทะเบียนกับ อย.</h4>' +
    '<p>ขั้นตอนนี้อาจใช้เวลาประมาณ 30 วินาที ระหว่างนี้สามารถดูข้อมูลยาด้านบนได้ตามปกติ</p></div>';
  host.appendChild(box);

  fetch(verifyUrl(brandId))
    .then(res => (res.ok ? res.json() : Promise.reject(new Error('รหัส ' + res.status))))
    .then(v => showVerify(box, v, brandId, host))
    .catch(err => { console.error(err); showVerify(box, { ok: false }, brandId, host); });
}

// วาดกล่องผลตรวจทะเบียน
function showVerify(box, v, brandId, host) {
  let tone, icon, head, body, extra = '';

  if (!v || !v.ok) {
    tone = 'is-warn'; icon = 'alert';
    head = 'ตรวจสอบกับ อย. ไม่ได้ในขณะนี้';
    body = 'ระบบของ อย. ไม่ตอบกลับ ข้อมูลยาด้านบนยังใช้ได้ตามปกติ';
    extra = '<button class="btn btn-soft btn-sm" type="button" id="vfyRetry">' +
            svg('refresh') + 'ตรวจสอบอีกครั้ง</button>';

  } else if (!v.found) {
    tone = 'is-warn'; icon = 'search';
    head = 'ไม่พบทะเบียนนี้ในระบบ อย.';
    body = 'โปรดตรวจสอบเลขทะเบียนบนฉลากอีกครั้ง หากไม่ตรงกับที่ระบบอ่านได้ ควรปรึกษาเภสัชกรก่อนใช้ยา';

  } else if (!v.is_active) {
    tone = 'is-danger'; icon = 'warning';
    head = 'ทะเบียนนี้ไม่คงอยู่แล้ว';
    body = 'สถานะล่าสุดที่ อย. คือ ' + esc(v.status || 'ไม่ระบุ') +
           ' ไม่ควรใช้ยานี้ โปรดปรึกษาเภสัชกรก่อนใช้ยา';

  } else {
    tone = 'is-ok'; icon = 'shield';
    head = 'ทะเบียนถูกต้อง ตรวจสอบกับ อย. แล้ว';
    body = 'เลขทะเบียน ' + esc(v.reg_no || '') + ' สถานะ ' + esc(v.status || 'คงอยู่') +
           (v.licensee ? ' ผู้รับอนุญาตคือ' + esc(String(v.licensee).trim()) : '');
  }

  if (v && v.detail_url) {
    extra += '<a class="btn btn-soft btn-sm" href="' + esc(v.detail_url) + '" ' +
             'target="_blank" rel="noopener noreferrer">' + svg('arrow') + 'ดูข้อมูลที่เว็บ อย.</a>';
  }

  box.className = 'notice vfy ' + tone;
  box.innerHTML = svg(icon) +
    '<div><h4>' + head + '</h4><p>' + body + '</p>' +
    (extra ? '<div class="vfy-act">' + extra + '</div>' : '') + '</div>';

  const retry = $('#vfyRetry', box);
  if (retry) retry.addEventListener('click', () => { box.remove(); verifyBrand(brandId, host); });
}

$('#camStart').addEventListener('click', camOpen);
$('#camShoot').addEventListener('click', camShoot);
$('#camRetry').addEventListener('click', () => camReset(camFromCam));

$('#camFile').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  camClose();
  camFromCam = false;
  camShow(file);
  readLabel(file);
  e.target.value = '';
});

// เริ่มทำงานทั้งหมด
async function start() {
  paintIcons();
  syncHeaderHeight();
  syncHeaderState();
  runIntro();

  showLoading();

  try {
    await Promise.all([loadDB(), loadCatSprite()]);
  } catch (err) {
    showLoadError(err);
    return;
  }

  hideDataPane();
  window.addEventListener('popstate', route);
  route();
  console.log('MedCheck พร้อมทำงาน · ยา ' + DB.brands.length + ' ยี่ห้อ'
    + (dataSource === 'api' ? ' · อ่านจากฐานข้อมูล' : ' · อ่านจากไฟล์สำรอง'));
}

// แผ่นทับระหว่างรอข้อมูลยา · ไม่ลบส่วนหน้าจอเดิม เพราะตัวจัดเส้นทางยังต้องใช้
function dataPane(html) {
  const main = $('#main');
  let el = $('#dataPane');
  if (!el) {
    main.insertAdjacentHTML('afterbegin', '<div class="wrap sec" id="dataPane"></div>');
    el = $('#dataPane');
  }
  main.classList.add('is-loading');
  el.innerHTML = html;
  return el;
}

// เอาแผ่นทับออกเมื่อได้ข้อมูลแล้ว
function hideDataPane() {
  const el = $('#dataPane');
  if (el) el.remove();
  $('#main').classList.remove('is-loading');
}

// แจ้งระหว่างรอข้อมูลยา · ครั้งแรกเซิร์ฟเวอร์อาจต้องเริ่มทำงานจากสถานะพักก่อน
function showLoading() {
  dataPane(
    '<div class="state">' +
      '<div class="dataspin" aria-hidden="true"></div>' +
      '<h2>กำลังโหลดข้อมูลยา</h2>' +
      '<p>การเปิดใช้งานครั้งแรกอาจใช้เวลาสักครู่ </p>' +
    '</div>');
}

// แจ้งเมื่อโหลดข้อมูลยาไม่สำเร็จ
function showLoadError(err) {
  console.error(err);
  dataPane(
    '<div class="state">' +
      '<div class="state-ico is-warn">' + svg('info') + '</div>' +
      '<h2>เปิดข้อมูลยาไม่ได้</h2>' +
      '<p>' + esc(err.message) + ' — เซิร์ฟเวอร์ข้อมูลยาอาจกำลังเริ่มทำงานจากสถานะพัก ' +
        'โปรดรอสักครู่แล้วลองใหม่อีกครั้ง</p>' +
      '<div class="state-actions">' +
        '<button class="btn btn-primary" type="button" id="reloadData">ลองใหม่อีกครั้ง</button>' +
      '</div>' +
    '</div>');
  paintIcons($('#dataPane'));
  $('#reloadData').addEventListener('click', retryLoad);
}

// ลองโหลดข้อมูลยาอีกครั้งโดยไม่ต้องรีเฟรชทั้งหน้า
async function retryLoad() {
  const btn = $('#reloadData');
  btn.disabled = true;
  btn.textContent = 'กำลังโหลด…';
  showLoading();
  try {
    await loadDB();
  } catch (err) {
    showLoadError(err);
    return;
  }
  hideDataPane();
  // ใส่ตัวฟังซ้ำได้ เพราะเป็นฟังก์ชันตัวเดิม เบราว์เซอร์จะไม่เพิ่มซ้อน
  window.addEventListener('popstate', route);
  route();
}

start();

// ผูกเหตุการณ์ในหน้าข้อมูลยา
function bindDetail(host, b, c, ct) {

  const read = $('#readDrug', host);
  if (read) read.addEventListener('click', () => {
    speakText([
      speakName(thName(b.productName)), c.genericTh,
      'กลุ่ม ' + (ct ? ct.short : ''),
      'เลขทะเบียน ' + b.regNo,
      c.indications.length ? 'ข้อบ่งใช้ ' + c.indications.join('. ') : '',
      c.dosageAdult ? 'ขนาดยา ' + c.dosageAdult : '',
      c.warnings.length ? 'คำเตือน ' + c.warnings.map(w => w.text).join('. ') : '',
    ].filter(Boolean).join('. '), read);
  });
}

// วาดหน้าเกี่ยวกับระบบ
function renderAbout() {
  const m = DB.meta || {};
  $('#aboutBody').innerHTML =
    '<div class="page-head"><a class="backlink" href="/" aria-label="กลับหน้าหลัก">' + svg('back') + '</a>' +
      '<div style="flex:1 1 16rem"><h1>เกี่ยวกับระบบ MedCheck</h1>' +
      '<p>เครื่องมือต้นแบบที่ช่วยให้ผู้บริโภคตรวจสอบข้อมูลยาสามัญประจำบ้านได้ด้วยตนเอง ' +
      'โดยเชื่อมโยงการอ่านฉลากด้วย OCR เข้ากับข้อมูลทะเบียนยาของหน่วยงานภาครัฐ</p></div>' +
    '</div>' +

    '<div style="display:grid; gap:1.1rem">' +
      '<div class="notice is-ok reveal">' + svg('check-c') + '<div><h4>ขอบเขตของระบบ</h4><ul>' +
        '<li>ยาสามัญประจำบ้าน (OTC) ที่ซื้อได้เองโดยไม่ต้องมีใบสั่งแพทย์</li>' +
        '<li>' + DB.categories.length + ' กลุ่มอาการ ได้แก่ ' + DB.categories.map(x => esc(x.short)).join(', ') + '</li>' +
        '<li>ขนาดยาสำหรับผู้ใหญ่ ไม่ได้แยกขนาดสำหรับเด็กไว้ต่างหาก</li>' +
        '<li>เฉพาะยาน้ำบรรจุขวด และยาเม็ดบรรจุแผง</li>' +
      '</ul></div></div>' +

      '<div class="notice is-danger reveal">' + svg('ban') + '<div><h4>สิ่งที่อยู่นอกขอบเขตของระบบ</h4><ul>' +
        '<li>ยาที่ต้องสั่งจ่ายโดยแพทย์</li>' +
        '<li>ยากลุ่มเฉพาะทางอื่น เช่น ยาสำหรับโรคตา ยารักษาแผลไฟไหม้ ยาสำหรับโรคผิวหนัง และยาบรรเทาปวดกล้ามเนื้อ</li>' +
        '<li>สูตรตำรับที่ระบุไว้เฉพาะสำหรับใช้ในเด็ก</li>' +
        '<li>บรรจุภัณฑ์รูปแบบอื่น เช่น ยาขี้ผึ้งบรรจุกระปุก ยาผงบรรจุซอง ยาเหน็บทวาร และยาสวนทวาร</li>' +
        '<li>ฉลากที่ชำรุด เลือนราง หรือมีคุณภาพไม่เพียงพอต่อการอ่านด้วย OCR</li>' +
      '</ul></div></div>' +

      '<div class="notice is-warn reveal">' + svg('db') + '<div><h4>แหล่งที่มาของข้อมูล</h4>' +
        '<p><b>จากฐานข้อมูลทะเบียนยา อย.</b> — ชื่อผลิตภัณฑ์ เลขทะเบียนตำรับยา ชื่อผู้รับอนุญาต ประเภทยาตามกฎหมาย และสถานะทะเบียน</p>' +
        '<p class="mt-2"><b>จัดทำโดยคณะผู้จัดทำ</b> — ชื่อสามัญทางยา ตัวยาสำคัญ ขนาดการใช้ ข้อบ่งใช้ คำเตือน และการจัดหมวดหมู่ตามกลุ่มอาการ ' +
          'จัดเก็บตามสูตรตำรับ เนื่องจากข้อมูลส่วนนี้ไม่ได้แสดงไว้อย่างเป็นระบบในฐานข้อมูลของ อย.</p>' +
        '<p class="text-sm mt-3" style="color:var(--ink-3)">' +
          esc((m.sourceNote || '') + (m.updatedAt ? ' · ปรับปรุงล่าสุด ' + m.updatedAt : '')) +
          ' · ปัจจุบันมี ' + DB.categories.length + ' กลุ่มอาการ ' + DB.formulations.length + ' สูตรตำรับ และ ' + DB.brands.length + ' ยี่ห้อ</p>' +
      '</div></div>' +

      '<div class="notice reveal">' + svg('eye') + '<div><h4>ความเป็นส่วนตัว</h4><ul>' +
        '<li>รายการ “ยาที่ดูล่าสุด” จัดเก็บไว้ในเบราว์เซอร์เครื่องนี้เท่านั้น ไม่เกิน 5 รายการ</li>' +
        '<li>ปุ่มพูดเพื่อค้นหาใช้ระบบฟังเสียงของเบราว์เซอร์ ซึ่งบางเบราว์เซอร์ (เช่น Chrome) ส่งเสียงไปแปลงเป็นข้อความที่เซิร์ฟเวอร์ของผู้ให้บริการ</li>' +
        '<li>ผู้ใช้สามารถเลือกพิมพ์ค้นหาแทนการพูดได้เสมอ</li>' +
      '</ul></div></div>' +

      '<div class="notice reveal">' + svg('link') + '<div><h4>แหล่งอ้างอิง</h4><ul>' +
        (m.references || []).map(r =>
          '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' + esc(r.label) + '</a></li>'
        ).join('') +
      '</ul></div></div>' +

      '<div class="notice is-danger reveal">' + svg('warning') + '<div><h4>ข้อจำกัดความรับผิดชอบ</h4>' +
        '<p>ระบบนี้เป็นเครื่องมือต้นแบบเพื่อการศึกษาและช่วยอ่านฉลากยาเท่านั้น <b>ไม่ใช่คำแนะนำทางการแพทย์</b> ' +
        'ข้อมูลที่แสดงอาจไม่ตรงกับฉลากยาฉบับล่าสุดของผลิตภัณฑ์ที่คุณถืออยู่ ' +
        'โปรดอ่านฉลากและเอกสารกำกับยาจากผลิตภัณฑ์จริงเสมอ และปรึกษาแพทย์หรือเภสัชกรก่อนใช้ยา</p>' +
      '</div></div>' +
    '</div>';

  paintIcons($('#view-about'));
}
