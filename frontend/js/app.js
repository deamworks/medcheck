

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
    x:'<path d="m6 6 12 12M18 6 6 18"/>',
    caret:'<path d="m9.5 5 7 7-7 7"/>',
    back:'<path d="M19.8 12H5.2m5-5-5 5 5 5"/>',
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

// router
const VIEWS = ['home', 'scan', 'search', 'detail', 'about', 'admin'];
const TITLES = {home:'หน้าหลัก',scan:'ถ่ายรูปฉลากยา', search:'ค้นหายา', detail:'ข้อมูลยา', about:'เกี่ยวกับระบบ', admin:'ผู้ดูแลระบบ',};
let currentRoute = {name:'home', param:''};

function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '');
    const parts = raw.split('/');
    let name = parts[0] || 'home';
    if (name === 'drug') name = 'detail';
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

    document.title = TITLES[currentRoute.name] + '· MedCheck';
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
    $('#menuBtn').setAttribute('aria-lebel', 'เปิดเมนู');
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
    if (s.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus();}
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus();}
});

// boot
paintIcons();
syncHeaderHeight();
syncHeaderState();
window.addEventListener('hashchange', route);
route();
console.log('MedCheck พร้อมทำงาน');


// 1. ตัวช่วยย่อ
// หา element ตัวแรกที่ตรงเงื่อนไข
// const $ = (sel) => document.querySelector(sel);
// // หา element ทุกตัวที่ตรงเงือนไข แล้วคืนเป็น array
// const $$ = (sel) => [...document.querySelectorAll(sel)];

// function normalize(text) {
//     return String(text ?? "")
//         .toLowerCase()                      // ตัวใหญ่ → ตัวเล็ก
//         .replace(/[\u0E50-\u0E59]/g,        // เลขไทย → เลขอารบิก
//             (d) => String(d.charCodeAt(0) - 0x0E50))
//         .replace(/[\u0E47-\u0E4C]/g, "")   // ตัดวรรณยุกต์ ็ ่ ้ ๊ ๋ ์
//     .replace(/[\s\-\/.,()+]/g, "");        // ตัดช่องว่างและเครื่องหมาย
// }
// function escapeHTML(text) {
//     return String(text ?? "").replace(/[&<>"']/g, (ch) => ({
//         "&": "&amp;",
//         "<": "&lt;",
//         ">": "&gt;",
//         '"': "&quot;",
//         "'": "&#39;",
//     })[ch]);
// }

// // 2. ข้อมูล 
// // รายชื่อหน้าทั้งหมดที่มี 
// const DB = {categories: [],items: [],}; // ที่เก็บข้อมูลทั้งหมดของเว็บ
// async function loadData() {
//     const res = await fetch("data/drugs.json");

//     if (!res.ok) {
//         throw new Error("โหลดข้อมูลไม่สำเร็จ รหัส " + res.status); 
//     }

//     const data = await res.json();
//     buildIndex(data);
// }
// // ต่อข้อมูล 3 ตารางเข้าด้วยกัน
// function buildIndex(data) {

//     const formulationById = {};
//     data.formulations.forEach((f) => {
//         formulationById[f.id] = f;
//     });

//     const categoryById = {};
//     data.categories.forEach((c) => {
//         categoryById[c.id] = c;
//     });
//     // เก็บหมวดไว้ใช้สร้างชิป
//     DB.categories = data.categories;
//     // แปลงยี่ห้อทุกตัวให้มีข้อมูลครบในก้อนเดียว 
//     DB.items = data.brands.map((b) => {
//         const f = formulationById[b.formulationId];
//         const c = categoryById[b.categoryId];

//         return {
//             ...b,
//             formulation: f,
//             category: c,
//             haystack: normalize(
//                 [b.productName, b.regNo, f.genericTh, f.gemericEn, c.short].join(" ")
//             ),    
//         };
//     });
// }

// // 3. หน้าค้นหา 
// const state = {query: "",category: "all",};

// // ฟังก์ชันค้นหา
// function searchDrugs(query, categoryId) {
//     const q = normalize(query);

//     return DB.items.filter((item) => {
//         const matchCategory = categoryId === "all" || item.categoryId === categoryId;
//         const matchText = q === "" || item.haystack.includes(q);
//         return matchCategory && matchText;
//     });
// }
// // สร้าง HTML ของการ์ด 1 ใบ
// function cardHTML(item) {
//   const tone = CATEGORY_TONE[item.categoryId] ?? "c1";
//   const icon = PACKAGING_ICON[item.packaging] ?? "i-pill";

//   return `
//     <a class="row-item" href="#/drug/${item.id}">
//       <span class="row-ico tone-${tone}" aria-hidden="true">
//         <svg class="ico"><use href="#${icon}"/></svg>
//       </span>
//       <span class="row-main">
//         <span class="row-title">${escapeHTML(item.productName)}</span>
//         <span class="row-sub">${escapeHTML(item.formulation.genericEn)}</span>
//         <span class="row-tags">
//           <span class="tag-cat">${escapeHTML(item.category.short)}</span>
//           <span class="tag-reg">Reg. No. ${escapeHTML(item.regNo)}</span>
//         </span>
//       </span>
//       <svg class="ico row-arrow" aria-hidden="true"><use href="#i-chevron"/></svg>
//     </a>`;
// }

// // สร้างชิปจากข้อมูลหมวด (ทำครั้งเดียว)
// function renderChips() {
//     const list = [{ id: "all", short: "ทั้งหมด"}, ...DB.categories];

//         $("#chips").innerHTML = list
//             .map((c) => `<button type="button" class="chip" data-cat="${c.id}">${escapeHTML(c.short)}</button>`).join("");
// }

// // วาดหน้าค้นหาใหม่ทั้งหมดจาก state
// function renderSearch() {
//     const results = searchDrugs(state.query, state.category);

//     $$("#chips .chip").forEach((chip) => {
//         chip.setAttribute("aria-pressed", String(chip.dataset.cat === state.category));
//     });
//     // จำนวนผลลัพธ์
//     $("#resultCount").textContent = `พบ ${results.length} รายการ`;
//     // การ์ด
//     $("#results").innerHTML = results.map(cardHTML).join("");
//     // กล่องไม่พบ
//     $("#empty").hidden = results.length > 0;
// }

// // ต่อสายเหตุการณ์ (ทำครั้งเดียว)
// function initSearch() {
//     renderChips();

//     $("#q").addEventListener("input", (e) => {
//         state.query = e.target.value;
//         renderSearch();
//     });

//     // กดชิป — ฟังที่กล่องแม่ตัวเดียว
//     $("#chips").addEventListener("click", (e) => {
//         const chip = e.target.closest(".chip");
//         if (!chip) return;
//         state.category = chip.dataset.cat;
//         renderSearch();
//     });

//     renderSearch();
// }

// // 4. Router 
// const ROUTES = {
//     home: "หน้าแรก",
//     scan: "สแกนฉลากยา",
//     search: "ค้นหาฉลากยา",
//     about: "เกี่ยวกับระบบ",
// };
// const DEFAULT_ROUTE = "home";

// // อ่านชื่อหน้าจาก URL
// function readRoute() {
//     // location.hash ได้ "#/search"  →  slice(2) ตัด "#/" ทิ้ง → "search"
//     const raw = location.hash.slice(2);
//     // วันที่ 5 จะมี "#/drug/12" → split("/")[0] เอาแค่ "drug"
//     const name = raw.split("/")[0];
//     // ถ้าชื่อที่ได้ไม่มีในรายการ ให้กลับไปหน้าแรก
//     return ROUTES[name] ? name : DEFAULT_ROUTE;
// }
// // แสดงหน้าที่ต้องการ ซ่อนหน้าที่เหลือ
// function showRoute(name) {
//     // วนดูทุก section.view
//     $$(".view").forEach((section) => {
//         // ถ้าชื่อไม่ตรง ให้ซ่อน (hidden = true)
//         section.hidden = section.dataset.view !== name;
//     });

//     // วนดูลิงก์เมนูทุกอัน ทั้งบนและล่าง
//     $$("[data-nav]").forEach((link) => {
//         const isCurrent = link.dataset.nav === name;

//         link.classList.toggle("is-active", isCurrent);

//         if (isCurrent) link.setAttribute("aria-current", "page");
//         else           link.removeAttribute("aria-current");
//     });

//     // เปลี่ยนชื่อบนและแท็บเบราว์เซอร์
//     document.title = ROUTES[name] + " - MedCheck";

//     // เลื่อนกลับขึ้นไปบนสุด
//     window.scrollTo(0,0);
// }
// // ต่อสายให้ทำงานอัตโนมัติ
// function handleRouteChange() {
//     showRoute(readRoute());
// }

// // 5. เริ่มต้นระบบ
// async function boot() {
//     window.addEventListener("hashchange", handleRouteChange);
//     handleRouteChange();

//     try {
//         await loadData();
//         initSearch();
//         console.log("MedCheck พร้อมทำงาน · ยา", DB.items.length, "รายการ");
//     } catch (err) {
//         console.error(err); 
//         $("#resultCount").textContent = "";
//         $("#results").innerHTML = `
//             <div class="alert alert-danger" role="alert">
//                 <p><strong>โหลดข้อมูลยาไม่สำเร็จ</strong>ตรวจว่าเปิดผ่าน Live Server (ขึ้นต้นด้วย http://) และมีไฟล์ data/drugs.json</p>
//             </div>`;
//     }
// }

// boot();