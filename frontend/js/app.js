
"use strict";

// icons
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
  /* ไอคอนกลุ่มอาการ */
  stomach:'<path d="M12 3.4s6 6.2 6 10.2a6 6 0 1 1-12 0c0-4 6-10.2 6-10.2Z"/><path d="M8.8 14.6a3.2 3.2 0 0 0 3.2 3.2"/>',
  laxative:'<path d="M12 3.6v11.2M7.6 10.6 12 15l4.4-4.4M5.4 20.4h13.2"/>',
  fever:'<path d="M14.2 14.8V5.6a2.2 2.2 0 1 0-4.4 0v9.2a4.2 4.2 0 1 0 4.4 0Z"/><path d="M12 8.6v7.6"/>',
  allergy:'<path d="M3.6 8.6h9.2a3 3 0 1 0-3-3"/><path d="M3.6 15.4h11.8a3 3 0 1 1-3 3"/><path d="M3.6 12h6.6"/>',
  cough:'<path d="M4.4 12h3l4.2-4.2v8.4L7.4 12"/><path d="M14.6 9.4a3.4 3.4 0 0 1 0 5.2M17.4 6.8a7 7 0 0 1 0 10"/>',
  mouth:'<path d="M4.4 10.4c2.1-1 4.7-1.5 7.6-1.5s5.5.5 7.6 1.5c-.7 3.7-3.8 6.5-7.6 6.5s-6.9-2.8-7.6-6.5Z"/><path d="M4.6 10.6h14.8"/>',
};

function svg(n, cls) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
       + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"'
       + (cls ? ' class="' + cls + '"' : '') + '>' + (P[n] || P.info) + '</svg>';
}

function paintIcons(root) {
    (root || document).querySelectorAll('[data-ico]').forEach(el => {
        if (el.dataset.icoDone) return;
        el.dataset.icoDone ='1';
        el.insertAdjacentHTML('afterbegin', svg(el.dataset.ico));
    });
}

// utils
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

function debounce(fn, ms) {
    let t;
    return function () {
        const a = arguments;
        clearTimeout(t);
        t = setTimeout(() => fn.apply(null, a), ms);
    };
}

const REDUCED  = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

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

function initReveal(scope) {
  if (REDUCED()) {
    $$('.reveal,.pop', scope).forEach(el => el.classList.add('in'));
    return;
  }

  if (!io) {
    io = new IntersectionObserver(entries => {
      entries.forEach((en, i) => {
        if (!en.isIntersecting) return;
        en.target.style.setProperty('--rd', Math.min(i, 7) * 70 + 'ms');
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }

  $$('.reveal:not(.in),.pop:not(.in)', scope).forEach(el => io.observe(el));
}


// router
const VIEWS = ['home', 'scan', 'search', 'detail', 'about',];
const TITLES = {home:'หน้าหลัก',scan:'ถ่ายรูปฉลากยา', search:'ค้นหายา', detail:'ข้อมูลยา', about:'เกี่ยวกับระบบ',};
let currentRoute = {name:'home', param:''};

function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '');
    const parts = raw.split('/');
    let name = parts[0] || 'home';
    if (name === 'drug') name = 'detail';
    if (name === 'category') name = 'search';
    if (!VIEWS.includes(name)) name = 'home';
    return { name, param: parts[1] || ''};
}

function route() {
    currentRoute = parseHash();
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

    if (currentRoute.name === 'home') renderHome();
    if (currentRoute.name === 'search') renderSearch(currentRoute.param);   // ← เพิ่ม
    if (currentRoute.name !== 'search') hideSuggest();    
    initReveal($('#view-' + currentRoute.name)); 

    closeDrawer();
    window.scrollTo(0,0);
}

// header
function syncHeaderHeight() {
    const h = Math.round($('.hdr').getBoundingClientRect().height);
    document.documentElement.style.setProperty('--hdr-h', h + 'px');
}

let scrollTick = false;
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

// drawer
let drawerPrev = null;
function drawerOpen() { return $('#drawer').classList.contains('open'); }

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

/** สีประจำกลุ่มอาการ ช่วยให้จำและกวาดตาหาได้เร็วขึ้น */
const CAT_TONE = {
  'cat-gastro': 1, 'cat-laxative': 2, 'cat-analgesic': 3,
  'cat-antihistamine': 4, 'cat-cough': 5, 'cat-oral': 6,
};

function toneVars(cid) {
  const n = CAT_TONE[cid] ||
    (Math.abs(String(cid).split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % 6) + 1;
  return '--cc:var(--c' + n + ');--cbg:var(--c' + n + '-bg)';
}

// home 
// ตัวเลขในฮีโร่ — นับจากไฟล์ข้อมูล
function homeStats() {
  return [
    [DB.categories.length,   'กลุ่มอาการ'],
    [DB.formulations.length, 'สูตรตำรับ'],
    [DB.brands.filter(b => b.status === 'active').length, 'ยี่ห้อที่ตรวจสอบแล้ว'],
  ];
}

function catCard(c) {
  return '<a class="catcard reveal" href="#/category/' + encodeURIComponent(c.id) + '" style="' + toneVars(c.id) + '">' +
      '<span class="catcard-ico" data-ico="' + esc(c.icon || 'pill') + '"></span>' +
      '<span class="catcard-b"><b>' + esc(c.short) + '</b>' +
        '<span>' + formsOf(c.id).length + ' สูตรตำรับ · ' + brandsInCat(c.id).length + ' ยี่ห้อ</span></span>' +
      '<span class="catcard-go" data-ico="caret"></span>' +
    '</a>';
}

let homeDone = false;
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

/* SHARED */
// แถวผลลัพธ์ 1 แถว ใช้ทั้งหน้าค้นหา และ "ดูล่าสุด" ในวันถัดไป
function rowItem(b) {
  const c = content(b), ct = cat(b.categoryId);
  return '<li><a class="row" href="#/drug/' + encodeURIComponent(b.id) + '" style="' + toneVars(b.categoryId) + '">' +
      '<span class="row-ico" data-ico="' + (b.packaging === 'blister' ? 'blister' : 'bottle') + '"></span>' +
      '<span class="row-b"><b>' + esc(b.productName) + '</b>' +
        '<span class="gen">' + esc(c.genericEn || c.genericTh) + '</span>' +
        '<span class="tags">' +
          '<span class="pill pill-red">' + esc(ct ? ct.short : '') + '</span>' +
          '<span class="pill pill-grey">Reg. No. ' + esc(b.regNo) + '</span>' +
          (b.status === 'active' ? '' : '<span class="pill pill-bad">ยกเลิกทะเบียน</span>') +
        '</span></span>' +
      '<span class="row-go" data-ico="caret"></span>' +
    '</a></li>';
}

/* SEARCH */
let sState = { q: '', cat: '' };   // คำค้น และกลุ่มที่เลือก ('' = ทั้งหมด)
let sBound = false;

// ข้อความก้อนเดียวที่รวมทุกอย่างที่ค้นได้ของยี่ห้อนี้
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

  // ทะเบียนคงอยู่ขึ้นก่อน แล้วเรียงชื่อตามพจนานุกรมไทย
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
      '<p>ลองพิมพ์เพียงบางส่วนของชื่อยา เช่น “พารา” หรือพิมพ์ตัวยาสำคัญ เช่น “paracetamol” ' +
        'และตรวจสอบว่ายาที่ค้นหาอยู่ในขอบเขต 6 กลุ่มอาการของระบบ</p>' +
      '<div class="state-actions">' +
        '<button class="btn btn-primary" type="button" id="clrAll">ล้างตัวกรองทั้งหมด</button>' +
        '<a class="btn btn-outline" href="#/about">ดูขอบเขตของระบบ</a>' +
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

function syncChips() {
  $$('#chipbar [data-cat]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.cat === sState.cat))
  );
}

function renderSearch(pre) {
  if (!sBound) {
    // ชิป: "ทั้งหมด" + 6 กลุ่มจากข้อมูล
    $('#chipbar').innerHTML =
      '<button class="chip" type="button" data-cat="" aria-pressed="true">' +
        '<span class="c-ico">' + svg('list') + '</span>ทั้งหมด<span class="n">' + DB.brands.length + '</span></button>' +
      DB.categories.slice().sort((a, b) => a.order - b.order).map(c =>
        '<button class="chip" type="button" data-cat="' + esc(c.id) + '" aria-pressed="false" style="' + toneVars(c.id) + '">' +
          '<span class="c-ico">' + svg(c.icon || 'pill') + '</span>' + esc(c.short) +
          '<span class="n">' + brandsInCat(c.id).length + '</span></button>'
      ).join('');

    // คลิกชิปใดก็ได้: ฟังที่กล่องแม่ตัวเดียว
    $('#chipbar').addEventListener('click', e => {
      const b = e.target.closest('[data-cat]');
      if (!b) return;
      sState.cat = b.dataset.cat;
      syncChips();
      runSearch();
    });

    // พิมพ์: รอหยุดพิมพ์ 180ms ค่อยค้น
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

  if (pre) sState.cat = pre;   // มาจาก #/category/…
  $('#q').value = sState.q;
  hideSuggest();
  syncChips();
  runSearch();
}

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

// การ์ด 3 ขั้นตอน
let stepsBound = false;
function openStep(card, on) {
    if (!card) return;
    card.classList.toggle('is-open', on);
    card.setAttribute('aria-expanded', String(on));
}

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

    /* แตะหรือคลิก: เปิดใบที่กด แล้วปิดใบอื่น */
    c.addEventListener('click', () => {
        const on = !c.classList.contains('is-open');
        cards.forEach(o => openStep(o, false));
        openStep(c, on);
    });
});

stepsBound = true;

}

// intro
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


/* คำแนะนำขณะพิมพ์  */
let sugItems = [];   // ยาที่แสดงอยู่ในรายการตอนนี้
let sugIdx = -1;     // ตัวที่เลือกด้วยลูกศร (-1 = ยังไม่เลือก)

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
        return '<li role="option" id="sug-' + i + '" aria-selected="false" data-sug="' + i + '" style="' + toneVars(b.categoryId) + '">' +
            '<span class="s-ico">' + svg(b.packaging === 'blister' ? 'blister' : 'bottle') + '</span>' +
            '<span class="s-b"><b>' + esc(b.productName) + '</b>' +
              '<span>' + esc(c.genericEn || c.genericTh) + ' · ' + esc(ct ? ct.short : '') + '</span></span>' +
            '<span class="s-go">' + svg('arrow') + '</span>' +
          '</li>';
      }).join('')
    : '<li class="s-empty" role="presentation">ไม่พบยาที่ตรงกับ “' + esc(q) + '” ลองพิมพ์สั้นลง เช่น “พารา”</li>';

  list.hidden = false;
  $('#q').setAttribute('aria-expanded', 'true');
  sugIdx = -1;
}

function moveSuggest(step) {
  const n = sugItems.length;
  if (!n) return;
  // ยังไม่ได้เลือก แล้วกดขึ้น → ไปตัวสุดท้าย · นอกนั้นวนรอบ
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

function gotoSuggest(i) {
  const b = sugItems[i];
  if (!b) return;
  hideSuggest();
  $('#q').blur();
  location.hash = '#/drug/' + encodeURIComponent(b.id);
}

/*  พูดเพื่อค้นหา */
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null;

// ข้อความสถานะใต้ช่องค้นหา
function sayMsg(text) {
  const m = $('#qMsg');
  m.textContent = text;
  m.hidden = !text;
}

function initMic() {
  const btn = $('#qMic');
  const box = $('.searchwrap .searchbox');
  if (!SpeechRec) {                 // เบราว์เซอร์ไม่รองรับ เช่น Firefox
    btn.hidden = true;
    box.classList.add('no-mic');
    return;
  }

  btn.hidden = false;
  btn.addEventListener('click', () => {
    if (recog) { recog.stop(); return; }   // กำลังฟังอยู่ กดอีกครั้ง = หยุด

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
      sayMsg(e.error === 'not-allowed' ? 'กรุณาอนุญาตให้เว็บไซต์ใช้ไมโครโฟน'
           : e.error === 'no-speech'   ? 'ไม่ได้ยินเสียงพูด ลองใหม่อีกครั้ง'
           : 'ฟังเสียงไม่สำเร็จ ลองใหม่อีกครั้ง');
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


// boot
async function start() {
  paintIcons();
  syncHeaderHeight();
  syncHeaderState();
  runIntro();

  try {
    await loadDB();
  } catch (err) {
    showLoadError(err);
    return;
  }

  window.addEventListener('hashchange', route);
  route();
  console.log('MedCheck พร้อมทำงาน · ยา ' + DB.brands.length + ' ยี่ห้อ');
}

function showLoadError(err) {
  console.error(err);
  $('#main').innerHTML =
    '<div class="wrap sec"><div class="state">' +
      '<div class="state-ico is-warn">' + svg('info') + '</div>' +
      '<h2>เปิดข้อมูลยาไม่ได้</h2>' +
      '<p>' + esc(err.message) + ' — ถ้าเปิดไฟล์ด้วยการดับเบิลคลิก ให้เปิดผ่าน Live Server แทน</p>' +
    '</div></div>';
}

start();
