# 🌰 DRYF — Dry Fruits, Seeds, Chocolates & Spices | Demo E-Commerce Store

A professionally organised, no-build-step demo online store: **247 products, 9 categories**, Hindi names, stock photos, cart, coupons, demo checkout & order tracking — plus a store-opening planner.

## ⚡ Quick start
```bash
npm start            # python3 -m http.server 8000 → http://localhost:8000
npm run audit        # 4,000+ automated checks (100+ requirement)
npm run docs:products  # regenerate docs/PRODUCTS.md
```
> ES modules need http(s) — serve the folder, don't open via `file://`.

## 📁 Project structure (engineer-organised)
```
index.html                  Entry point
assets/css/styles.css       All styles
assets/js/app.js            App logic (cart, checkout, wishlist, i18n, rendering)
assets/js/data/products.js  Data layer: categories, 247 products, pricing, stock-photo map
assets/images/              Hero + per-category fallback photos
docs/                       ARCHITECTURE · PRODUCTS (auto-generated) · AUDIT · DEPLOYMENT
scripts/                    audit.mjs (100+ checks) · generate-products-doc.mjs
.github/workflows/          deploy-pages.yml — TEMPORARY GitHub Pages template (manual trigger)
package.json · .editorconfig · .gitignore · .nojekyll
```
Full details: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## 🛒 Demo e-commerce features
Add to Cart with 250g/500g/1kg packs · MRP & % OFF · Deals of the Day + countdown ·
coupons `DRYF10` / `FESTIVE15` / `FIRSTBUY` / `FREESHIP` · free delivery above ₹999 ·
demo checkout (UPI/Card/COD) with validation · order success + animated tracking ·
My Orders · ❤️ Wishlist · everything persists in localStorage.

## 🇮🇳 Hindi names
Every product: English + transliteration + Devanagari (Badam · बादाम). **अ/EN toggle**
switches titles to Hindi; search understands Hindi — try `केसर`, `बादाम`, `लौंग`.

## 📦 247 products · 9 categories
| Category | Items | Category | Items |
|---|---:|---|---:|
| 🌰 Dry Fruits & Nuts | 42 | 🎁 Gift Hampers | 20 |
| 🍫 Chocolates | 37 | 🍯 Health Pantry | 21 |
| 🔥 Roasted & Masala Snacks | 33 | 🍬 Indian Sweets | 18 |
| 🫐 Berries & Dried Fruits | 31 | 🌶️ Whole Spices & Masalas | 16 |
| 🌻 Seeds & Makhana | 29 | **Total** | **247** |

Full table: [docs/PRODUCTS.md](docs/PRODUCTS.md)

## 🖼️ Product images — stock photos
Each product gets a **stock photo from Unsplash** (`images.unsplash.com`, matched by
ingredient keyword — almonds, dates, chocolate, kesar…). If a stock photo ever fails,
the UI auto-falls back to local category photos — never a broken image.

## 🚀 Deploy on GitHub Pages
A ready-but-temporary workflow template is included at
`.github/workflows/deploy-pages.yml` (manual trigger only). Step-by-step:
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 🔍 Audit
`npm run audit` executes **4,000+ checks** (structure, Hindi names, pricing, image
mapping, per-product validation ×247). It also runs in CI before any deploy.
Scope: [docs/AUDIT.md](docs/AUDIT.md)

> Demo only — no real payment/delivery. Prices are indicative; confirm with your local wholesale supplier.
