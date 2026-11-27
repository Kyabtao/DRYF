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
  products.find(p=>p.name==="Hazelnuts")?.img.includes("products/hazelnuts") &&
  products.find(p=>p.name==="Dry Fruit Laddoo (Sugar-Free)")?.img.includes("products/laddoo") &&
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
  products.find(p=>p.name==="Milk Choco Chips")?.img.includes("products/cocoa-baking") &&
  products.find(p=>p.name==="Sunflower Seeds")?.img.includes("products/sunflower-seeds") &&
  products.find(p=>p.name==="Flax Seeds (Alsi)")?.img.includes("products/flax-seeds") &&
  products.find(p=>p.name==="Sesame Seeds White")?.img.includes("products/sesame-seeds") &&
  products.find(p=>p.name.startsWith("Watermelon Seeds"))?.img.includes("products/magaj-seeds") &&
  products.find(p=>p.name==="Badam Barfi")?.img.includes("products/barfi") &&
  products.find(p=>p.name==="Peanut Chikki")?.img.includes("products/chikki") &&
  products.find(p=>p.name==="Black Pepper Whole")?.img.includes("products/whole-spices") &&
  products.find(p=>p.name==="Hazelnut Chocolate")?.img.endsWith("categories/chocolate.jpg") &&
  products.find(p=>p.name==="Cornflakes Mixture")?.img.includes("products/namkeen"));
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
check("specific photos: medjool/golden-dates/hamper/dates-gift/banana-chips/khakhra/cookies/wafer/sauce/fennel",
  products.find(p=>p.name==="Medjool Dates Jumbo")?.img.includes("products/medjool-dates") &&
  products.find(p=>p.name==="Sukkari Dates")?.img.includes("products/golden-dates") &&
  products.find(p=>p.name==="Luxury Wedding Hamper")?.img.includes("products/luxury-hamper") &&
  products.find(p=>p.name==="Ramadan Dates Gift Box")?.img.includes("products/dates-gift-box") &&
  products.find(p=>p.name==="Thank You Mini Gift Box")?.img.endsWith("categories/gift.jpg") &&
  products.find(p=>p.name==="Banana Chips")?.img.includes("products/banana-chips") &&
  products.find(p=>p.name==="Multigrain Khakhra")?.img.includes("products/khakhra.jpg") &&
  products.find(p=>p.name==="Dry Fruit Cookies")?.img.includes("products/cookies") &&
  products.find(p=>p.name==="Wafer Chocolate Sticks")?.img.includes("products/wafer-sticks") &&
  products.find(p=>p.name==="Chocolate Sauce (Bottle)")?.img.includes("products/chocolate-sauce") &&
  products.find(p=>p.name==="Fennel Seeds (Saunf)")?.img.includes("products/fennel-seeds"));
check("specific photos: mango/kiwi/poppy/kalonji/chana/mini-choc/diwali/dry-fruit-box/soft-dates",
  products.find(p=>p.name==="Dried Mango Slices")?.img.includes("products/dried-mango") &&
  products.find(p=>p.name==="Dried Kiwi Slices")?.img.includes("products/dried-kiwi") &&
  products.find(p=>p.name==="Poppy Seeds (Khus Khus)")?.img.includes("products/poppy-seeds") &&
  products.find(p=>p.name==="Nigella Seeds (Kalonji)")?.img.includes("products/kalonji-seeds") &&
  products.find(p=>p.name==="Roasted Chana (With Skin)")?.img.includes("products/roasted-chana") &&
  products.find(p=>p.name==="Diet Mixture Namkeen")?.img.includes("products/namkeen") &&
  products.find(p=>p.name==="Mini Chocolate Bars (Kids Pack)")?.img.includes("products/mini-chocolates") &&
  products.find(p=>p.name==="Diwali Laxmi Puja Dry Fruit Box")?.img.includes("products/diwali-hamper") &&
  products.find(p=>p.name==="Essential Dry Fruit Box 500g")?.img.includes("products/dry-fruit-box") &&
  products.find(p=>p.name==="Kimia / Soft Dates")?.img.includes("products/soft-dates"));
check("specific photos: berries/dried-fruit/trail/kesar/elaichi/Granola/peanuts/namkeen/tea",
  products.find(p=>p.name==="Dried Strawberries")?.img.includes("products/berries-mix") &&
  products.find(p=>p.name==="Tutti Frutti Mix")?.img.includes("products/dried-fruits") &&
  products.find(p=>p.name==="Classic Trail Mix")?.img.includes("products/trail-mix") &&
  products.find(p=>p.name.includes("Kesar Saffron"))?.img.includes("products/saffron") &&
  products.find(p=>p.name.includes("Green Cardamom 8mm"))?.img.includes("products/cardamom") &&
  products.find(p=>p.name==="Fruit & Nut Granola")?.img.includes("products/granola") &&
  products.find(p=>p.name==="Roasted Peanuts")?.img.includes("products/peanuts") &&
  products.find(p=>p.name==="Diet Mixture Namkeen")?.img.includes("products/namkeen"));

check("specific photos: pineapple/papaya/orange/dragon/peach/black-raisins/hemp/halim/cocoa-powder/cinnamon",
  products.find(p=>p.name==="Dried Pineapple")?.img.includes("products/dried-pineapple") &&
  products.find(p=>p.name==="Dried Papaya")?.img.includes("products/dried-papaya") &&
  products.find(p=>p.name==="Dried Orange Slices")?.img.includes("products/dried-orange") &&
  products.find(p=>p.name==="Dried Dragon Fruit")?.img.includes("products/dried-dragon-fruit") &&
  products.find(p=>p.name==="Dried Peach Slices")?.img.includes("products/dried-peach") &&
  products.find(p=>p.name==="Black Raisins Seedless")?.img.includes("products/black-raisins") &&
  products.find(p=>p.name==="Golden Raisins")?.img.includes("products/raisins") &&
  products.find(p=>p.name==="Hemp Seeds")?.img.includes("products/hemp-seeds") &&
  products.find(p=>p.name==="Garden Cress Seeds (Halim)")?.img.includes("products/halim-seeds") &&
  products.find(p=>p.name==="Cocoa Powder Unsweetened")?.img.includes("products/cocoa-powder") &&
  products.find(p=>p.name==="Cinnamon Sticks (Dalchini)")?.img.includes("products/cinnamon-sticks") &&
  products.find(p=>p.name==="Cloves (Laung)")?.img.includes("products/whole-spices"));

check("specific photos: gond-laddoo/almond-slices/masala-almonds/masala-cashews/cashew-pieces/flavoured-makhana/millet/choco-berries",
  products.find(p=>p.name==="Gond ke Laddoo")?.img.includes("products/gond-laddoo") &&
  products.find(p=>p.name==="Almond Slices (Badam Katran)")?.img.includes("products/almond-slices") &&
  products.find(p=>p.name==="Peri Peri Almonds")?.img.includes("products/masala-almonds") &&
  products.find(p=>p.name==="Smoked Almonds")?.img.includes("products/almonds") &&
  products.find(p=>p.name==="Masala Cashews")?.img.includes("products/masala-cashews") &&
  products.find(p=>p.name==="Cashew Splits & Pieces")?.img.includes("products/cashew-pieces") &&
  products.find(p=>p.name==="Peri Peri Makhana")?.img.includes("products/masala-makhana") &&
  products.find(p=>p.name==="Caramel Makhana (Sweet)")?.img.includes("products/caramel-makhana") &&
  products.find(p=>p.name==="Jowar Puffs (Masala)")?.img.includes("products/millet-snacks") &&
  products.find(p=>p.name==="Roasted Soya Nuts")?.img.endsWith("categories/snacks.jpg") &&
  products.find(p=>p.name==="Choco-Coated Almonds")?.img.includes("products/choco-almonds") &&
  products.find(p=>p.name==="Choco-Coated Blueberries")?.img.includes("products/choco-berries") &&
  products.find(p=>p.name==="Choco-Coated Cashews")?.img.includes("products/choco-nuts"));

check("specific photos: date typologies/date-powder/cardamoms/nutmeg-mace/star-anise/bay/oats/peanut-butter",
  products.find(p=>p.name==="Mabroom Dates")?.img.includes("products/dates-dark") &&
  products.find(p=>p.name==="Deglet Noor Dates")?.img.includes("products/dates-golden") &&
  products.find(p=>p.name==="Pitted Seedless Dates")?.img.includes("products/dates-pitted") &&
  products.find(p=>p.name==="Date Powder (Natural Sweetener)")?.img.includes("products/date-powder") &&
  products.find(p=>p.name==="Black Cardamom (Badi Elaichi)")?.img.includes("products/black-cardamom") &&
  products.find(p=>p.name==="Green Cardamom Bold 8mm+")?.img.includes("products/cardamom") &&
  products.find(p=>p.name==="Mace (Javitri)")?.img.includes("products/nutmeg-mace") &&
  products.find(p=>p.name==="Star Anise (Chakra Phool)")?.img.includes("products/star-anise") &&
  products.find(p=>p.name==="Bay Leaves (Tej Patta)")?.img.includes("products/bay-leaves") &&
  products.find(p=>p.name==="Rolled Oats")?.img.includes("products/rolled-oats") &&
  products.find(p=>p.name==="Peanut Butter Creamy")?.img.includes("products/peanut-butter") &&
  products.find(p=>p.name==="Almond Butter")?.img.includes("products/nut-butter"));
check("date-only keywords do not leak into raisins/cashews",
  products.find(p=>p.name==="Black Raisins Seedless")?.img.includes("products/black-raisins") &&
  products.find(p=>p.name==="Black Pepper Whole")?.img.includes("products/whole-spices"));

check("gap-fill catalogue: everyday spices, namkeen, mithai, chironji present",
  ["Turmeric Powder (Haldi)","Red Chilli Powder (Lal Mirch)","Coriander Powder (Dhania)","Garam Masala",
   "Kasuri Methi (Dried Fenugreek)","Hing (Asafoetida)","Rai (Mustard Seeds)","Methi Dana (Fenugreek Seeds)",
   "Ajwain (Carom Seeds)","Saunf (Fennel Seeds)","Kali Mirch Powder (Black Pepper)"]
    .every(n => products.some(p => p.name===n && p.cat==="spices")) &&
  ["Sev Bhujia","Moong Dal (Salted)","Aloo Bhujia","Bhel Mix","Khatta Meetha Mixture","Masala Chana Jor","Cornflakes Chivda"]
    .every(n => products.some(p => p.name===n && p.cat==="snacks")) &&
  ["Anjeer Barfi (No Sugar)","Besan Laddoo","Motichoor Laddoo","Balushahi","Kalakand","Dry Fruit Chikki (Mixed)","Choco Coated Dates"]
    .every(n => products.some(p => p.name===n && p.cat==="sweets")) &&
  products.some(p => p.name==="Chironji (Charoli)" && p.cat==="nuts") &&
  products.some(p => p.name==="Rock Sugar (Mishri)" && p.cat==="pantry"));
check("gap-fill photos: powders/masala/methi/hing/rai/bhujia/moong/chironji/anjeer/choco-dates",
  products.find(p=>p.name==="Turmeric Powder (Haldi)")?.img.includes("products/spice-powders") &&
  products.find(p=>p.name==="Red Chilli Powder (Lal Mirch)")?.img.includes("products/spice-powders") &&
  products.find(p=>p.name==="Kali Mirch Powder (Black Pepper)")?.img.includes("products/spice-powders") &&
  products.find(p=>p.name==="Garam Masala")?.img.includes("products/garam-masala") &&
  products.find(p=>p.name==="Kasuri Methi (Dried Fenugreek)")?.img.includes("products/kasuri-methi") &&
  products.find(p=>p.name==="Methi Dana (Fenugreek Seeds)")?.img.includes("categories/seeds") &&
  products.find(p=>p.name==="Hing (Asafoetida)")?.img.includes("products/hing") &&
  products.find(p=>p.name==="Rai (Mustard Seeds)")?.img.includes("products/mustard-seeds") &&
  products.find(p=>p.name==="Saunf (Fennel Seeds)")?.img.includes("products/fennel-seeds") &&
  products.find(p=>p.name==="Sev Bhujia")?.img.includes("products/bhujia") &&
  products.find(p=>p.name==="Moong Dal (Salted)")?.img.includes("products/moong-dal") &&
  products.find(p=>p.name==="Chironji (Charoli)")?.img.includes("products/chironji") &&
  products.find(p=>p.name==="Anjeer Barfi (No Sugar)")?.img.includes("products/anjeer-barfi") &&
  products.find(p=>p.name==="Choco Coated Dates")?.img.includes("products/choco-date-bites"));
check("no leaking on short gap-fill keywords (rai/saunf/methi)",
  products.find(p=>p.name==="Classic Trail Mix")?.img.includes("products/trail-mix") &&
  products.find(p=>p.name==="Multigrain Khakhra")?.img.includes("products/khakhra") &&
  products.find(p=>p.name==="Black Raisins Seedless")?.img.includes("products/black-raisins") &&
  products.find(p=>p.name==="Sugar-Coated Fennel (Mishri Saunf)")?.img.includes("products/choco-nuts") &&
  products.find(p=>p.name==="Fennel Seeds (Saunf)")?.img.includes("products/fennel-seeds") &&
  products.find(p=>p.name==="Stuffed Medjool Dates Box")?.img.includes("products/stuffed-dates"));
check("no duplicate product names in catalogue",
  new Set(products.map(p=>p.name)).size === products.length);

check("gap-fill 2: staples, date syrup, gulkand, corporate & festive boxes",
  ["Moong Dal (Split)","Masoor Dal (Split)","Chana Dal","Thick Poha","Sabudana","Makhana Flour (Fox Nut)","Date Syrup","Gulkand (Rose Petal Preserve)"]
    .every(n => products.some(p => p.name===n && p.cat==="pantry")) &&
  products.some(p => p.name==="Corporate Dry Fruit Box" && p.cat==="gifts") &&
  products.some(p => p.name==="Festive Dry Fruit Box (Medium)" && p.cat==="gifts"));
check("gap-fill 2 photos: dals/poha/sabudana/makhana-flour/date-syrup/gulkand/corporate-box",
  products.find(p=>p.name==="Moong Dal (Split)")?.img.includes("products/dals") &&
  products.find(p=>p.name==="Moong Dal (Salted)")?.img.includes("products/moong-dal-namkeen") &&
  products.find(p=>p.name==="Thick Poha")?.img.includes("products/poha") &&
  products.find(p=>p.name==="Sabudana")?.img.includes("products/sabudana") &&
  products.find(p=>p.name==="Makhana Flour (Fox Nut)")?.img.includes("products/makhana-flour") &&
  products.find(p=>p.name==="Date Syrup")?.img.includes("products/dates-syrup") &&
  products.find(p=>p.name==="Gulkand (Rose Petal Preserve)")?.img.includes("products/gulkand") &&
  products.find(p=>p.name==="Corporate Dry Fruit Box")?.img.includes("products/gift-box-corporate") &&
  products.find(p=>p.name==="Festive Dry Fruit Box (Medium)")?.img.includes("products/diwali-hamper") &&
  products.find(p=>p.name==="Essential Dry Fruit Box 500g")?.img.includes("products/dry-fruit-box") &&
  products.find(p=>p.name==="Masala Peanuts")?.img.includes("products/masala-peanuts"));
check("punctuation in names does not break keyword rules",
  products.find(p=>p.name==="Moong Dal (Salted)")?.img.includes("moong-dal-namkeen") &&
  products.find(p=>p.name==="Rolled Oats")?.img.includes("products/rolled-oats"));

check("photo-split batch: poha/berry singles/exotic-nut singles/kaju katli",
  products.find(p=>p.name==="Thick Poha")?.img.includes("products/poha") &&
  products.find(p=>p.name==="Dried Cranberries")?.img.includes("products/cranberries") &&
  products.find(p=>p.name==="Dried Blueberries")?.img.includes("products/blueberries") &&
  products.find(p=>p.name==="Goji Berries")?.img.includes("products/goji-berries") &&
  products.find(p=>p.name==="Hazelnuts")?.img.includes("products/hazelnuts") &&
  products.find(p=>p.name==="Macadamia Nuts")?.img.includes("products/macadamia") &&
  products.find(p=>p.name==="Pecan Nuts")?.img.includes("products/pecans") &&
  products.find(p=>p.name==="Pine Nuts (Chilgoza)")?.img.includes("products/pine-nuts") &&
  products.find(p=>p.name==="Brazil Nuts")?.img.includes("products/brazil-nuts") &&
  products.find(p=>p.name==="Kaju Katli Style Mewa Barfi")?.img.includes("products/kaju-katli"));
check("gap-fill 3: masala blends, salt/pepper basics, mithai, sherbets, gift tubs",
  ["Chaat Masala","Kitchen King Masala","Pav Bhaji Masala","Sambhar Masala","Kashmiri Red Chillies (Whole)","Kala Namak (Black Salt)","Amchur (Dry Mango Powder)","Safed Mirch (White Pepper)"]
    .every(n => products.some(p => p.name===n && p.cat==="spices")) &&
  ["Kaju Barfi","Gulab Jamun (Pack)","Rasgulla (Pack)"].every(n => products.some(p => p.name===n && p.cat==="sweets")) &&
  ["Rose Syrup (Gulab Sharbat)","Khus Syrup (Vetiver Sharbat)"].every(n => products.some(p => p.name===n && p.cat==="pantry")) &&
  ["Diwali Dry Fruit Gift Tub","Festive Chocolate & Nut Box"].every(n => products.some(p => p.name===n && p.cat==="gifts")));
check("gap-fill 3 photos: blends/chilli/black-salt/amchur/white-pepper/mithai/sherbet/tubs",
  products.find(p=>p.name==="Chaat Masala")?.img.includes("products/masala-blends") &&
  products.find(p=>p.name==="Garam Masala")?.img.includes("products/garam-masala") &&
  products.find(p=>p.name==="Kashmiri Red Chillies (Whole)")?.img.includes("products/kashmiri-chillies") &&
  products.find(p=>p.name==="Dry Red Chillies Whole")?.img.includes("products/red-chillies") &&
  products.find(p=>p.name==="Kala Namak (Black Salt)")?.img.includes("products/black-salt") &&
  products.find(p=>p.name==="Amchur (Dry Mango Powder)")?.img.includes("products/amchur") &&
  products.find(p=>p.name==="Safed Mirch (White Pepper)")?.img.includes("products/white-pepper") &&
  products.find(p=>p.name==="Kali Mirch Powder (Black Pepper)")?.img.includes("products/spice-powders") &&
  products.find(p=>p.name==="Black Pepper Whole")?.img.includes("products/whole-spices") &&
  products.find(p=>p.name==="Kaju Barfi")?.img.includes("products/kaju-barfi") &&
  products.find(p=>p.name==="Kaju Katli Style Mewa Barfi")?.img.includes("products/kaju-katli") &&
  products.find(p=>p.name==="Gulab Jamun (Pack)")?.img.includes("products/gulab-jamun") &&
  products.find(p=>p.name==="Rasgulla (Pack)")?.img.includes("products/rasgulla") &&
  products.find(p=>p.name==="Rose Syrup (Gulab Sharbat)")?.img.includes("products/flavoured-water") &&
  products.find(p=>p.name==="Khus Syrup (Vetiver Sharbat)")?.img.includes("products/khus-syrup") &&
  products.find(p=>p.name==="Diwali Dry Fruit Gift Tub")?.img.includes("products/dry-fruit-box") &&
  products.find(p=>p.name==="Diwali Laxmi Puja Dry Fruit Box")?.img.includes("products/diwali-hamper") &&
  products.find(p=>p.name==="Festive Chocolate & Nut Box")?.img.includes("products/chocolate-gift-box"));
check("photo-split batch 2: laddoo varieties, gift boxes, sweets, bhel, nibs, mamra",
  products.find(p=>p.name==="Motichoor Laddoo")?.img.includes("products/motichoor-laddoo") &&
  products.find(p=>p.name==="Besan Laddoo")?.img.includes("products/besan-laddoo") &&
  products.find(p=>p.name==="Energy Laddoo (Til-Mewa)")?.img.includes("products/til-laddoo") &&
  products.find(p=>p.name==="Coconut Dry Fruit Laddoo")?.img.includes("products/coconut-laddoo") &&
  products.find(p=>p.name==="Gond ke Laddoo")?.img.includes("products/gond-laddoo") &&
  products.find(p=>p.name==="Dry Fruit Laddoo (Sugar-Free)")?.img.includes("products/laddoo") &&
  products.find(p=>p.name==="Birthday Gift Hamper")?.img.includes("products/birthday-hamper") &&
  products.find(p=>p.name==="Rakhi Special Hamper")?.img.endsWith("categories/gift.jpg") &&
  products.find(p=>p.name==="Shakarpara (Mewa)")?.img.includes("products/shakarpara") &&
  products.find(p=>p.name==="Gond Pak (Winter)")?.img.includes("products/gond-pak") &&
  products.find(p=>p.name==="Bhel Mix")?.img.includes("products/bhel-mix") &&
  products.find(p=>p.name==="Cornflakes Chivda")?.img.includes("products/namkeen") &&
  products.find(p=>p.name==="Cacao Nibs")?.img.includes("products/cacao-nibs") &&
  products.find(p=>p.name==="Dark Choco Chips")?.img.includes("products/cocoa-baking") &&
  products.find(p=>p.name==="Almonds Mamra Premium")?.img.includes("products/mamra-almonds") &&
  products.find(p=>p.name==="Almonds California")?.img.includes("products/almonds") &&
  products.find(p=>p.name==="Kashmiri Mamra Walnut Kernels")?.img.includes("products/walnuts"));
check("nut/berry splits did not leak into flavours or spreads",
  products.find(p=>p.name==="Hazelnut Chocolate")?.img.endsWith("categories/chocolate.jpg") &&
  products.find(p=>p.name==="Hazelnut Chocolate Spread")?.img.includes("products/nut-butter") &&
  products.find(p=>p.name==="Choco-Coated Blueberries")?.img.includes("products/choco-berries") &&
  products.find(p=>p.name==="Badam Barfi")?.img.includes("products/barfi") &&
  products.find(p=>p.name==="Berry Trail Mix")?.img.includes("products/trail-mix"));

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
