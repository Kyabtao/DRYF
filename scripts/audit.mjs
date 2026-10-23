/**
 * DRYF — full project audit.
 * Runs 100+ (actually thousands of) automated checks:
 * file structure, data integrity, Hindi names, pricing logic,
 * stock-image mapping, HTML asset references and category coverage.
 * Usage:  npm run audit        (or: node scripts/audit.mjs)
 */
import { existsSync, readFileSync } from "node:fs";
import { CATS, products, packPrice, PACKS_FOR, STOCK_MAP } from "../assets/js/data/products.js";

let run = 0; const failures = [];
function check(label, ok) { run++; if (!ok) failures.push(label); }
const hasDeva = s => /[\u0900-\u097F]/.test(s || "");

/* ---------- 1. Project structure (files a real project must have) ---------- */
const FILES = [
  "index.html", "README.md", "package.json", ".gitignore", ".editorconfig", ".nojekyll",
  "assets/css/styles.css", "assets/js/app.js", "assets/js/data/products.js",
  "assets/images/hero.jpg", "docs/ARCHITECTURE.md", "docs/DEPLOYMENT.md",
  ".github/workflows/deploy-pages.yml", "scripts/audit.mjs", "scripts/generate-products-doc.mjs",
];
FILES.forEach(f => check(`file exists: ${f}`, existsSync(f)));

/* ---------- 2. HTML wiring ---------- */
const html = readFileSync("index.html", "utf8");
check("html links organised css", html.includes("assets/css/styles.css"));
check("html loads app as ES module", html.includes('type="module" src="assets/js/app.js"'));
check("html hero uses organised image", html.includes("assets/images/hero.jpg"));
check("html has no old root script.js reference", !html.includes('src="script.js"'));
check("html has no old root styles.css reference", !html.includes('href="styles.css"'));
check("html declares lang + viewport + charset",
  html.includes('lang="en"') && html.includes("viewport") && html.includes("UTF-8"));
["catalogue", "deals", "categories", "packs", "cartBtnTop", "checkoutForm", "successWrap", "productGrid"]
  .forEach(id => check(`html has #${id}`, html.includes(`id="${id}"`)));

/* ---------- 3. Category integrity ---------- */
const catKeys = Object.keys(CATS);
check("at least 9 categories", catKeys.length >= 9);
catKeys.forEach(k => {
  const c = CATS[k];
  check(`cat ${k}: label`, !!c.label);
  check(`cat ${k}: emoji`, !!c.emoji);
  check(`cat ${k}: blurb >= 20 chars`, (c.blurb || "").length >= 20);
  check(`cat ${k}: local image exists (${c.img})`, existsSync(c.img));
  check(`cat ${k}: has products`, products.some(p => p.cat === k));
  check(`cat ${k}: has a bestseller (level 1)`, products.some(p => p.cat === k && p.level === 1));
});

/* ---------- 4. Catalogue size & uniqueness ---------- */
check("at least 240 products", products.length >= 240);
check("product ids are sequential", products.every((p, i) => p.id === i));
const names = products.map(p => p.name.toLowerCase());
check("no duplicate product names", new Set(names).size === names.length);

/* ---------- 5. Per-product checks (the bulk of the 100+ audit) ---------- */
for (const p of products) {
  const at = `#${p.id} ${p.name}:`;
  check(`${at} English name`, !!p.name && p.name.length >= 3);
  check(`${at} Hindi transliteration`, !!p.translit);
  check(`${at} Hindi Devanagari name`, hasDeva(p.deva));
  check(`${at} known category`, catKeys.includes(p.cat));
  check(`${at} price in sane range (50–5000)`, p.price >= 50 && p.price <= 5000);
  check(`${at} emoji present`, !!p.emoji);
  check(`${at} level 1–3`, [1, 2, 3].includes(p.level));
  check(`${at} shelf life present`, !!p.shelf);
  check(`${at} benefit >= 20 chars`, (p.benefit || "").length >= 20);
  check(`${at} rating 4.0–5.0`, +p.rating >= 4.0 && +p.rating <= 5.0);
  check(`${at} discount 10–35%`, p.off >= 10 && p.off <= 35);
  check(`${at} MRP above price`, p.mrp > p.price);
  check(`${at} stock photo is Unsplash CDN`, /^https:\/\/images\.unsplash\.com\/photo-[\w-]+/.test(p.stockImg));
  check(`${at} local fallback image exists`, existsSync(p.img));
  const packs = PACKS_FOR(p);
  check(`${at} has pack options`, packs.length >= 1);
  if (p.cat !== "gifts") {
    check(`${at} pack price order 250g<500g<1kg`,
      packPrice(p, "250g") < packPrice(p, "500g") && packPrice(p, "500g") < packPrice(p, "1kg"));
  }
}

/* ---------- 6. Stock-photo mapping coverage ---------- */
check("stock map has 25+ keyword groups", STOCK_MAP.length >= 25);
STOCK_MAP.forEach(([keys, url], i) =>
  check(`stock group ${i} (${keys[0]}): keywords + unsplash url`, keys.length > 0 && url.includes("images.unsplash.com")));
const distinctPhotos = new Set(products.map(p => p.stockImg));
check("at least 25 distinct stock photos used", distinctPhotos.size >= 25);

/* ---------- 7. App logic smoke checks (static) ---------- */
const app = readFileSync("assets/js/app.js", "utf8");
["addToCart", "renderCart", "openCheckout", "renderOrders", "applyLang", "billCalc", "stockImg"]
  .forEach(fn => check(`app.js implements ${fn}`, app.includes(fn)));
check("app.js persists cart in localStorage", app.includes('localStorage.setItem("dryf-cart"'));
check("app.js has image fallback (onerror)", app.includes("onerror"));

/* ---------- Report ---------- */
const passed = run - failures.length;
console.log(`\n🔍 DRYF AUDIT — ${run} checks executed (requirement: 100+)`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failures.length}`);
if (failures.length) { failures.slice(0, 40).forEach(f => console.log("  - " + f)); process.exit(1); }
console.log("🎉 All checks passed.\n");
