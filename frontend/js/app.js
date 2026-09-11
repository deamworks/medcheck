"use strict";

// 1. ตัวช่วยย่อ

// หา element ตัวแรกที่ตรงเงื่อนไข
const $ = (sel) => document.querySelector(sel);
// หา element ทุกตัวที่ตรงเงือนไข แล้วคืนเป็น array
const $$ = (sel) => [...document.querySelectorAll(sel)];

// 2. รายชื่อหน้าทั้งหมดที่มี 

const ROUTES = {
    home: "หน้าแรก",
    scan: "สแกนฉลากยา",
    search: "ค้นหาฉลากยา",
    about: "เกี่ยวกับระบบ",
};

const DEFAULT_ROUTE = "home";

//  3.อ่านชื่อหน้าจาก URL

function readRoute() {
    // location.hash ได้ "#/search"  →  slice(2) ตัด "#/" ทิ้ง → "search"
    const raw = location.hash.slice(2);
    // วันที่ 5 จะมี "#/drug/12" → split("/")[0] เอาแค่ "drug"
    const name = raw.split("/")[0];
    // ถ้าชื่อที่ได้ไม่มีในรายการ ให้กลับไปหน้าแรก
    return ROUTES[name] ? name : DEFAULT_ROUTE;
}

// 4. แสดงหน้าที่ต้องการ ซ่อนหน้าที่เหลือ

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
    document.title = ROUTES[name] = "- MedCheck";

    // 4.4 เลื่อนกลับขึ้นไปบนสุด
    window.scrollTo(0,0);
}

// 5. ต่อสายให้ทำงานอัตโนมัติ

function handleRouteChange() {
    showRoute(readRoute());
}
// เมื่อ hash เปลี่ยน (ผู้ใช้กดเมนู หรือกดปุ่ม back)
window.addEventListener("hashchange", handleRouteChange);
// เรียกครั้งแรกตอนโหลดหน้า
handleRouteChange();

console.log("MedCheck พร้อมทำงาน");