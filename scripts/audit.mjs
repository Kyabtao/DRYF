/**
 * DRYF — full project audit.
 * Runs 100+ (actually thousands of) automated checks:
 * file structure, data integrity, Hindi names, pricing logic,
 * stock-image mapping, HTML asset references and category coverage.
 * Usage:  npm run audit        (or: node scripts/audit.mjs)
 */
import { existsSync, readFileSync } from "node:fs";
import { CATS, products, packPrice, PACKS_FOR, PRODUCT_IMG_MAP } from "../assets/js/data/products.js";

let run = 0; const failures = [];
function check(label, ok) { run++; if (!ok) failures.push(label); }
const hasDeva = s => /[\u0900-\u097F]/.test(s || "");

/* ---------- 1. Project structure (files a real project must have) ---------- */
const PAGES = ["index.html","shop.html","categories.html","category.html","deals.html","product.html","guide.html"];
const FILES = [
  ...PAGES, "sitemap.xml",
  "README.md", "package.json", ".gitignore", ".editorconfig", ".nojekyll",
  "assets/css/styles.css", "assets/js/app.js", "assets/js/layout.js", "assets/js/data/products.js",
  "assets/images/hero.jpg", "docs/ARCHITECTURE.md", "docs/DEPLOYMENT.md",
  ".github/workflow-templates/deploy-pages.yml", "scripts/audit.mjs", "scripts/generate-products-doc.mjs",
];
FILES.forEach(f => check(`file exists: ${f}`, existsSync(f)));

/* ---------- 2. Multi-page HTML wiring ---------- */
const html = readFileSync("index.html", "utf8");
const layout = readFileSync("assets/js/layout.js", "utf8");
const allPages = Object.fromEntries(PAGES.map(f => [f, readFileSync(f, "utf8")]));
const siteText = Object.values(allPages).join("\n") + layout;
PAGES.forEach(f => {
  const h = allPages[f];
  check(`${f}: links organised css`, h.includes("assets/css/styles.css"));
  check(`${f}: loads app as ES module`, h.includes('type="module" src="assets/js/app.js"'));
  check(`${f}: declares lang + viewport + charset`, h.includes('lang="en"') && h.includes("viewport") && h.includes("UTF-8"));
  check(`${f}: has shared layout placeholders`, h.includes('id="site-header"') && h.includes('id="site-footer"') && h.includes('id="site-overlays"'));
  check(`${f}: declares a data-page`, /<body data-page="(home|shop|categories|category|deals|product|guide)">/.test(h));
  check(`${f}: no old root script.js/styles.css references`, !h.includes('src="script.js"') && !h.includes('href="styles.css"'));
});
check("index hero uses organised image", html.includes("assets/images/hero.jpg"));
check("home is a landing page (no full 247-product grid)", html.includes('id="featuredGrid"') && !html.includes('id="productGrid"'));
check("shop page hosts the full product grid", allPages["shop.html"].includes('id="productGrid"') && allPages["shop.html"].includes('id="pillRow"'));
check("categories page hosts the category grid", allPages["categories.html"].includes('id="catGrid"'));
check("category page is a dynamic template (?cat=)", allPages["category.html"].includes('id="catHero"') && allPages["category.html"].includes('id="productGrid"'));
check("product page is a dynamic template (?id=)", allPages["product.html"].includes('id="productDetail"') && allPages["product.html"].includes('id="relatedGrid"'));
check("deals page hosts deals + combos", allPages["deals.html"].includes('id="dealRow"') && allPages["deals.html"].includes('id="packs"'));
check("guide page hosts store guide + orders", allPages["guide.html"].includes('id="myOrdersBox"'));
check("layout mounts shared header/footer/overlays", ["mountLayout","site-header","site-footer","site-overlays"].every(s=>layout.includes(s)));
["index.html","shop.html","categories.html","deals.html","guide.html"].forEach(f =>
  check(`layout nav links to ${f}`, layout.includes(`"${f}"`) || layout.includes(`href="${f}"`) || layout.includes(f)));
Object.keys(CATS).forEach(k =>
  check(`layout links to category page: ${k}`, layout.includes("category.html?cat=${k}") || layout.includes(`category.html?cat=${k}`)));
check("sitemap lists main pages", ["shop.html","categories.html","deals.html","guide.html"].every(pg => readFileSync("sitemap.xml","utf8").includes(pg)));
/* Regression: popups must never be visible on page load. Component classes
   (.modal-wrap{display:grid}, .bill>div{display:flex}) override the plain
   `hidden` attribute, so a global [hidden] rule is mandatory. */
const cssText = readFileSync("assets/css/styles.css", "utf8");
check("css: global [hidden] rule wins over component display", /\[hidden\]\s*\{\s*display:\s*none\s*!important/.test(cssText));
["modalWrap", "checkoutWrap", "successWrap", "overlay"]
  .forEach(id => check(`layout: #${id} starts hidden`, new RegExp(`id="${id}"[^>]*\\bhidden\\b`).test(layout)));
check("layout: coupon row starts hidden (bill row override)", new RegExp(`id="couponRow"[^>]*\\bhidden\\b`).test(layout));
check("layout: product modal links to the full product page", layout.includes('id="modalFullPage"'));

/* ---------- 3. Category integrity ---------- */
const catKeys = Object.keys(CATS);
check("at least 9 categories", catKeys.length >= 9);
check("dedicated Dates category exists", catKeys.includes("dates"));
check("Dates category has 18+ date products", products.filter(p=>p.cat==="dates").length >= 18);
check("no loose date products left in Dry Fruits & Nuts",
  products.filter(p=>p.cat==="nuts" && /dates|khajoor|chuara/i.test(p.name)).length === 0);
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
  check(`${at} product photo is local (no external CDN)`, p.img.startsWith("assets/images/") && !/https?:/.test(p.img) && p.stockImg === p.img);
  check(`${at} local fallback image exists`, existsSync(p.img));
  const packs = PACKS_FOR(p);
  check(`${at} has pack options`, packs.length >= 1);
  if (p.cat !== "gifts") {
    check(`${at} pack price order 250g<500g<1kg`,
      packPrice(p, "250g") < packPrice(p, "500g") && packPrice(p, "500g") < packPrice(p, "1kg"));
  }
}

/* ---------- 6. Product-photo mapping coverage ---------- */
check("product image map has 12+ keyword groups", PRODUCT_IMG_MAP.length >= 12);
PRODUCT_IMG_MAP.forEach(([keys, img], i) =>
  check(`image group ${i} (${keys[0]}): local file exists (${img})`, img.startsWith("assets/images/") && existsSync(img)));
const distinctPhotos = new Set(products.map(p => p.img));
check("at least 15 distinct product photos used", distinctPhotos.size >= 15);
check("no product uses an external image URL", products.every(p => !/https?:/.test(p.img)));
check("specific photos: almonds/cashews/makhana/honey are ingredient photos",
  products.find(p=>p.name.startsWith("Almonds California"))?.img.includes("products/almonds") &&
  products.find(p=>p.name.startsWith("Cashews W240"))?.img.includes("products/cashews") &&
  products.find(p=>p.name.includes("Roasted Salted Makhana"))?.img.includes("products/makhana") &&
  products.find(p=>p.name.includes("Pure Raw Honey"))?.img.includes("products/honey"));
check("specific photos: exotic-nuts/laddoo/powders/badam-milk/jaggery/coconut/prunes/pumpkin/chia/coffee",
  products.find(p=>p.name==="Hazelnuts")?.img.includes("products/exotic-nuts") &&
  products.find(p=>p.name==="Gond ke Laddoo")?.img.includes("products/laddoo") &&
  products.find(p=>p.name==="Ashwagandha Powder")?.img.includes("products/herbal-powder") &&
  products.find(p=>p.name==="Kesar Badam Milk Mix")?.img.includes("products/badam-milk") &&
  products.find(p=>p.name.includes("Jaggery Powder"))?.img.includes("products/jaggery") &&
  products.find(p=>p.name==="Dried Coconut Slices")?.img.includes("products/coconut") &&
  products.find(p=>p.name.startsWith("Prunes"))?.img.includes("products/prunes-cherries") &&
  products.find(p=>p.name==="Pumpkin Seeds")?.img.includes("products/pumpkin-seeds") &&
  products.find(p=>p.name==="Chia Seeds")?.img.includes("products/chia-seeds") &&
  products.find(p=>p.name==="Chocolate Coffee Beans")?.img.includes("products/coffee-beans"));
check("specific photos: dark-choc/truffles/cocoa/sunflower/flax/sesame/magaj/barfi/chikki/whole-spices",
  products.find(p=>p.name==="Dark Chocolate 85%")?.img.includes("products/dark-chocolate") &&
  products.find(p=>p.name==="Assorted Truffles")?.img.includes("products/truffles") &&
  products.find(p=>p.name==="Cocoa Powder Unsweetened")?.img.includes("products/cocoa-baking") &&
  products.find(p=>p.name==="Sunflower Seeds")?.img.includes("products/sunflower-seeds") &&
  products.find(p=>p.name==="Flax Seeds (Alsi)")?.img.includes("products/flax-seeds") &&
  products.find(p=>p.name==="Sesame Seeds White")?.img.includes("products/sesame-seeds") &&
  products.find(p=>p.name.startsWith("Watermelon Seeds"))?.img.includes("products/magaj-seeds") &&
  products.find(p=>p.name.includes("Kaju Katli"))?.img.includes("products/barfi") &&
  products.find(p=>p.name==="Peanut Chikki")?.img.includes("products/chikki") &&
  products.find(p=>p.name==="Black Pepper Whole")?.img.includes("products/whole-spices") &&
  products.find(p=>p.name==="Hazelnut Chocolate")?.img.endsWith("categories/chocolate.jpg") &&
  products.find(p=>p.name==="Banana Chips")?.img.includes("products/namkeen"));
check("specific photos: stuffed/dry-dates/soan/hot-choc/apricot/sabja/quinoa/amla/cumin/chilli",
  products.find(p=>p.name==="Stuffed Medjool Dates Box")?.img.includes("products/stuffed-dates") &&
  products.find(p=>p.name.startsWith("Dry Dates Yellow"))?.img.includes("products/dry-dates") &&
  products.find(p=>p.name==="Dry Fruit Soan Papdi")?.img.includes("products/soan-papdi") &&
  products.find(p=>p.name==="Hot Chocolate Premix")?.img.includes("products/hot-chocolate") &&
  products.find(p=>p.name==="Dried Apricots Turkish")?.img.includes("products/apricots") &&
  products.find(p=>p.name==="Dried Figs (Anjeer)")?.img.includes("products/figs") &&
  products.find(p=>p.name==="Basil Seeds (Sabja)")?.img.includes("products/sabja-seeds") &&
  products.find(p=>p.name==="Quinoa")?.img.includes("products/quinoa") &&
  products.find(p=>p.name==="Sweet Amla Candy")?.img.includes("products/amla-candy") &&
  products.find(p=>p.name==="Cumin Seeds (Jeera)")?.img.includes("products/cumin-seeds") &&
  products.find(p=>p.name==="Dry Red Chillies Whole")?.img.includes("products/red-chillies"));
check("specific photos: Ajwa/turmeric/mishri/gujiya/panjeeri/bites/seed-mix/milk-choc/pink-salt/singhara",
  products.find(p=>p.name==="Ajwa Dates")?.img.includes("products/ajwa-dates") &&
  products.find(p=>p.name==="Turmeric Fingers (Haldi Gattha)")?.img.includes("products/turmeric-ginger") &&
  products.find(p=>p.name==="Dry Ginger (Sonth)")?.img.includes("products/turmeric-ginger") &&
  products.find(p=>p.name==="Dhaga Mishri")?.img.includes("products/mishri") &&
  products.find(p=>p.name==="Dry Fruit Gujiya")?.img.includes("products/gujiya") &&
  products.find(p=>p.name==="Dry Fruit Panjeeri")?.img.includes("products/panjeeri") &&
  products.find(p=>p.name==="Dry Fruit Bites (No Added Sugar)")?.img.includes("products/dry-fruit-bites") &&
  products.find(p=>p.name==="Kaju Pista Roll")?.img.includes("products/dry-fruit-bites") &&
  products.find(p=>p.name==="Roasted Seed Mix")?.img.includes("products/seed-mix") &&
  products.find(p=>p.name==="Milk Chocolate Bar")?.img.includes("products/milk-chocolate") &&
  products.find(p=>p.name==="White Chocolate")?.img.includes("products/milk-chocolate") &&
  products.find(p=>p.name==="Pink Salt (Sendha Namak)")?.img.includes("products/pink-salt") &&
  products.find(p=>p.name==="Water Chestnut Dry (Singhara)")?.img.includes("products/singhara"));
check("specific photos: berries/dried-fruit/trail/kesar/elaichi/Granola/peanuts/namkeen/tea",
  products.find(p=>p.name==="Dried Cranberries")?.img.includes("products/berries-mix") &&
  products.find(p=>p.name==="Dried Mango Slices")?.img.includes("products/dried-fruits") &&
  products.find(p=>p.name==="Classic Trail Mix")?.img.includes("products/trail-mix") &&
  products.find(p=>p.name.includes("Kesar Saffron"))?.img.includes("products/saffron") &&
  products.find(p=>p.name.includes("Green Cardamom 8mm"))?.img.includes("products/cardamom") &&
  products.find(p=>p.name==="Fruit & Nut Granola")?.img.includes("products/granola") &&
  products.find(p=>p.name==="Masala Peanuts")?.img.includes("products/peanuts") &&
  products.find(p=>p.name==="Diet Mixture Namkeen")?.img.includes("products/namkeen"));

/* ---------- 7. App logic smoke checks (static) ---------- */
const app = readFileSync("assets/js/app.js", "utf8");
["addToCart", "renderCart", "openCheckout", "renderOrders", "applyLang", "billCalc", "stockImg"]
  .forEach(fn => check(`app.js implements ${fn}`, app.includes(fn)));
check("app.js persists cart in localStorage", app.includes('localStorage.setItem("dryf-cart"'));
check("app.js has image fallback (onerror)", app.includes("onerror"));
check("app.js: safe localStorage parsing (no direct key-by-key JSON.parse)", app.includes("function safeParse") && !/JSON\.parse\(localStorage\.getItem\("dryf-/.test(app));
check("app.js: modals forced hidden on init (never auto-open)", app.includes('"modalWrap","checkoutWrap","successWrap"'));
["mountLayout", "renderCategoryPage", "renderProductPage", "renderFeatured", "renderRelated", "initPageState", "category.html?cat=", "product.html?id="]
  .forEach(fn => check(`app.js multi-page: ${fn}`, app.includes(fn)));
check("app.js: category cards navigate to category pages", app.includes("data-catlink"));
check("app.js: product cards navigate to product pages", app.includes("product.html?id=${el.dataset.open}"));
check("app.js: page-optional controls are guarded", app.includes('if(_si)') && app.includes('if (!grid) return') && app.includes('if (!$("#pillRow")) return'));
check("app.js: success screen only shown from checkout submit handler",
  (app.match(/successWrap"\)\.hidden=false/g) || []).length === 1);

/* ---------- Report ---------- */
const passed = run - failures.length;
console.log(`\n🔍 DRYF AUDIT — ${run} checks executed (requirement: 100+)`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failures.length}`);
if (failures.length) { failures.slice(0, 40).forEach(f => console.log("  - " + f)); process.exit(1); }
console.log("🎉 All checks passed.\n");
