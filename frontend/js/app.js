"use strict";

// 1. ตัวช่วยย่อ
// หา element ตัวแรกที่ตรงเงื่อนไข
const $ = (sel) => document.querySelector(sel);
// หา element ทุกตัวที่ตรงเงือนไข แล้วคืนเป็น array
const $$ = (sel) => [...document.querySelectorAll(sel)];

function normalize(text) {
    return String(text ?? "")
        .toLowerCase()                      // ตัวใหญ่ → ตัวเล็ก
        .replace(/[\u0E50-\u0E59]/g,        // เลขไทย → เลขอารบิก
            (d) => String(d.charCodeAt(0) - 0x0E50))
        .replace(/[\u0E47-\u0E4C]/g, "")   // ตัดวรรณยุกต์ ็ ่ ้ ๊ ๋ ์
    .replace(/[\s\-\/.,()+]/g, "");        // ตัดช่องว่างและเครื่องหมาย
}
function escapeHTML(text) {
    return String(text ?? "").replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[ch]);
}

// 2. ข้อมูล 
// รายชื่อหน้าทั้งหมดที่มี 
const DB = {categories: [],items: [],}; // ที่เก็บข้อมูลทั้งหมดของเว็บ
async function loadData() {
    const res = await fetch("data/drugs.json");

    if (!res.ok) {
        throw new Error("โหลดข้อมูลไม่สำเร็จ รหัส " + res.status); 
    }

    const data = await res.json();
    buildIndex(data);
}
// ต่อข้อมูล 3 ตารางเข้าด้วยกัน
function buildIndex(data) {

    const formulationById = {};
    data.formulations.forEach((f) => {
        formulationById[f.id] = f;
    });

    const categoryById = {};
    data.categories.forEach((c) => {
        categoryById[c.id] = c;
    });
    // เก็บหมวดไว้ใช้สร้างชิป
    DB.categories = data.categories;
    // แปลงยี่ห้อทุกตัวให้มีข้อมูลครบในก้อนเดียว 
    DB.items = data.brands.map((b) => {
        const f = formulationById[b.formulationId];
        const c = categoryById[b.categoryId];

        return {
            ...b,
            formulation: f,
            category: c,
            haystack: normalize(
                [b.productName, b.regNo, f.genericTh, f.gemericEn, c.short].join(" ")
            ),    
        };
    });
}

// 3. หน้าค้นหา 
const state = {query: "",category: "all",};

// ฟังก์ชันค้นหา
function searchDrugs(query, categoryId) {
    const q = normalize(query);

    return DB.items.filter((item) => {
        const matchCategory = categoryId === "all" || item.categoryById === categoryId;
        const matchText = q === "" || item.haystack.includes(q);
        return matchCategory && matchText;
    });
}
// สร้าง HTML ของการ์ด 1 ใบ
function cardHTML(item) {
    return `
    <a class="card" href="#/drug/${item.id}">
        <p class="card-title">${escapeHTML(item.productName)}</p>
        <p class="card-sub">${escapeHTML(item.formulation.genericTh)}</p>
        <p class="card-meta">
            <span class="regno">${escapeHTML(item.regNo)}</span>
            <span>·</span>
            <span>${escapeHTML(item.category.short)}</span>
            </p>
        </a>`;
}

// สร้างชิปจากข้อมูลหมวด (ทำครั้งเดียว)
function renderChips() {
    const list = [{ id: "all", short: "ทั้งหมด"}, ...DB.categories];

        $("#chips").innerHTML = list
            .map((c) => `<button type="button" class="chip" data-cat="${c.id}">${escapeHTML(c.short)}</button>`).join("");
}

// วาดหน้าค้นหาใหม่ทั้งหมดจาก state
function renderSearch() {
    const results = searchDrugs(state.query, state.category);

    $$("#ships .chip").forEach((chip) => {
        chip.setAttribute("aria-pressed", String(chip.dataset.cat === state.category));
    });
    // จำนวนผลลัพธ์
    $("#resultCount").textContent = `พบ ${results.length} รายการ`;
    // การ์ด
    $("#results").innerHTML = results.map(cardHTML).join("");
    // กล่องไม่พบ
    $("#empty").hidden = results.length > 0;
}

// ต่อสายเหตุการณ์ (ทำครั้งเดียว)
function initSearch() {
    renderChips();

    $("#q").addEventListener("input", (e) => {
        state.query = e.target.value;
        renderSearch();
    });

    // กดชิป — ฟังที่กล่องแม่ตัวเดียว
    $("#chips").addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        state.category = chip.dataset.cat;
        renderSearch();
    });

    renderSearch();
}

// 4. Router 
const ROUTES = {
    home: "หน้าแรก",
    scan: "สแกนฉลากยา",
    search: "ค้นหาฉลากยา",
    about: "เกี่ยวกับระบบ",
};
const DEFAULT_ROUTE = "home";

// อ่านชื่อหน้าจาก URL
function readRoute() {
    // location.hash ได้ "#/search"  →  slice(2) ตัด "#/" ทิ้ง → "search"
    const raw = location.hash.slice(2);
    // วันที่ 5 จะมี "#/drug/12" → split("/")[0] เอาแค่ "drug"
    const name = raw.split("/")[0];
    // ถ้าชื่อที่ได้ไม่มีในรายการ ให้กลับไปหน้าแรก
    return ROUTES[name] ? name : DEFAULT_ROUTE;
}
// แสดงหน้าที่ต้องการ ซ่อนหน้าที่เหลือ
function showRoute(name) {
    // 4.1 วนดูทุก section.view
    $$(".view").forEach((section) => {
        // ถ้าชื่อไม่ตรง ให้ซ่อน (hidden = true)
        section.hidden = section.dataset.view !== name;
    });

    // 4.2 วนดูลิงก์เมนูทุกอัน ทั้งบนและล่าง
    $$("[data-nav]").forEach((link) => {
        const isCurrent = link.dataset.nav === name;

        link.classList.toggle("is-active", isCurrent);

        if (isCurrent) link.setAttribute("aria-current", "page");
        else           link.removeAttribute("aria-current");
    });

    // 4.3 เปลี่ยนชื่อบนและแท็บเบราว์เซอร์
    document.title = ROUTES[name] + " - MedCheck";

    // 4.4 เลื่อนกลับขึ้นไปบนสุด
    window.scrollTo(0,0);
}
// ต่อสายให้ทำงานอัตโนมัติ
function handleRouteChange() {
    showRoute(readRoute());
}

// 5. เริ่มต้นระบบ
async function boot() {
    window.addEventListener("hashchange", handleRouteChange);
    handleRouteChange();

    try {
        await loadData();
        initSearch();
        console.log("MedCheck พร้อมทำงาน · ยา", DB.items.length, "รายการ");
    } catch (err) {
        console.error(err); 
        $("#resultCount").textContent = "";
        $("#results").innerHTML = `
            <div class="alert alert-danger" role="alert">
                <p><strong>โหลดข้อมูลยาไม่สำเร็จ</strong>ตรวจว่าเปิดผ่าน Live Server (ขึ้นต้นด้วย http://) และมีไฟล์ data/drugs.json</p>
            </div>`;
    }
}

boot();