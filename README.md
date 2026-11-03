# 🌰 DRYF — Dry Fruits, Seeds, Chocolates & Spices | Demo E-Commerce Store

A professionally organised, no-build-step demo online store: **254 products, 10 categories**, Hindi names, local product photos, cart, coupons, demo checkout & order tracking — plus a store-opening planner.

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
assets/js/data/products.js  Data layer: categories, 254 products, pricing, product-photo map
assets/images/              Hero + per-category fallback photos
docs/                       ARCHITECTURE · PRODUCTS (auto-generated) · AUDIT · DEPLOYMENT
scripts/                    audit.mjs (100+ checks) · generate-products-doc.mjs
.github/workflow-templates/ deploy-pages.yml — TEMPORARY GitHub Pages template (copy to .github/workflows/ to activate)
package.json · .editorconfig · .gitignore · .nojekyll
```
Full details: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## 🌐 Pages (no more one long page)
| Page | What is on it |
|---|---|
| `index.html` | Home — hero, deals preview, category shelves, 8 bestsellers, how ordering works |
| `shop.html` | Shop All — full 254 products with search / filter / sort (supports `?cat=` and `?q=` links) |
| `categories.html` | All 10 categories |
| `category.html?cat=nuts` | One category's own page (hero, chips to other categories, its products only) |
| `deals.html` | Deals of the Day (20), coupon offers & combo packs |
| `product.html?id=0` | One product's full page — packs, quantity, wishlist, related products |
| `guide.html` | Store Guide — open-your-store checklist, name ideas, My Demo Orders |

Header, footer, cart drawer and popups are shared by every page from one file:
`assets/js/layout.js` — edit once, changes everywhere. Cart & wishlist persist across pages.

## 🛒 Demo e-commerce features
Add to Cart with 250g/500g/1kg packs · MRP & % OFF · Deals of the Day + countdown ·
coupons `DRYF10` / `FESTIVE15` / `FIRSTBUY` / `FREESHIP` · free delivery above ₹999 ·
demo checkout (UPI/Card/COD) with validation · order success + animated tracking ·
My Orders · ❤️ Wishlist · everything persists in localStorage.

## 🇮🇳 Hindi names
Every product: English + transliteration + Devanagari (Badam · बादाम). **अ/EN toggle**
switches titles to Hindi; search understands Hindi — try `केसर`, `बादाम`, `लौंग`.

## 📦 254 products · 10 categories
| Category | Items | Category | Items |
|---|---:|---|---:|
| 🌰 Dry Fruits & Nuts | 30 | 🌴 Dates & Khajoor | 20 |
| 🍫 Chocolates | 37 | 🎁 Gift Hampers | 20 |
| 🔥 Roasted & Masala Snacks | 33 | 🍯 Health Pantry | 20 |
| 🫐 Berries & Dried Fruits | 31 | 🍬 Indian Sweets | 18 |
| 🌻 Seeds & Makhana | 29 | 🌶️ Whole Spices & Masalas | 16 |
|  |  | **Total** | **254** |

Full table: [docs/PRODUCTS.md](docs/PRODUCTS.md)

## 🖼️ Product images — local product photos
Each product gets a **verified local photo** matched by ingredient (almonds, cashews,
dates, chocolate, makhana, honey…) from `assets/images/products/`, falling back to its
category photo in `assets/images/categories/`. No external stock CDN is used — stock
sites kept showing wrong/generic food (e.g. cake) instead of the actual product.

## 🚀 Deploy on GitHub Pages
A ready-but-temporary workflow template is included at
`.github/workflow-templates/deploy-pages.yml` (manual trigger only). Step-by-step:
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 🔍 Audit
`npm run audit` executes **4,000+ checks** (structure, Hindi names, pricing, image
mapping, per-product validation ×247). It also runs in CI before any deploy.
Scope: [docs/AUDIT.md](docs/AUDIT.md)

> Demo only — no real payment/delivery. Prices are indicative; confirm with your local wholesale supplier.
