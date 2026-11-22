# DRYF — Project Architecture

A static, no-build-step web app organised like a production project: data, logic,
presentation and tooling are fully separated.

## Folder structure
```
.
├── index.html                  # HOME page (hero, previews — not the full catalogue)
├── shop.html                   # SHOP page: all 254 products, search/filter/sort (?cat=, ?q=)
├── categories.html             # ALL CATEGORIES page
├── category.html               # CATEGORY template page: category.html?cat=nuts
├── deals.html                  # DEALS + combo packs page
├── product.html                # PRODUCT template page: product.html?id=123
├── guide.html                  # STORE GUIDE + My Demo Orders page
├── sitemap.xml                 # Page list for search engines / Pages deploy
├── assets/
│   ├── css/
│   │   └── styles.css          # All presentation (design system + components)
│   ├── js/
│   │   ├── layout.js           # SHARED layout: header/footer/cart drawer/popups
│   │   │                       # mounted into every page (single source of truth)
│   │   ├── app.js              # Application logic (ES module): page routing,
│   │   │                       # state, cart, checkout, wishlist, i18n, rendering
│   │   └── data/
│   │       └── products.js     # DATA LAYER (ES module): categories, 254 products,
│   │                           # pricing rules, local product-photo mapping
│   └── images/
│       ├── hero.jpg            # Hero banner (local, always reliable)
│       └── categories/         # One fallback photo per category (9 files)
├── docs/
│   ├── ARCHITECTURE.md         # This file
│   ├── PRODUCTS.md             # Auto-generated full product list
│   ├── AUDIT.md                # Audit scope & how "100+ checks" works
│   └── DEPLOYMENT.md           # GitHub Pages deployment guide
├── scripts/
│   ├── audit.mjs               # Automated audit — `npm run audit`
│   └── generate-products-doc.mjs
├── .github/workflows/
│   └── deploy-pages.yml        # TEMPORARY workflow template (manual trigger)
├── package.json                # Tooling scripts (start / audit / check / docs)
├── .editorconfig · .gitignore · .nojekyll
└── README.md
```

## Pages & routing
This is a multi-page static site (no SPA router, no build step). Each page is a
real `.html` file with `<body data-page="…">` and three placeholders
(`#site-header`, `#site-footer`, `#site-overlays`) that `layout.js` fills with
the shared chrome, so the nav/cart/popups exist identically on all pages.
`app.js` reads `data-page` + the query string and renders only what that page
needs, e.g. `category.html?cat=spices` renders the spices hero + its 16
products, and `product.html?id=42` renders that product + related items.
All app state (cart/wishlist/orders) is in `localStorage`, so it survives
moving between pages.

## Design decisions
- **No framework / no build step** — plain HTML + CSS + ES modules. Deploys anywhere
  (GitHub Pages, Netlify, any static host) by copying the folder.
- **Data/logic separation** — `products.js` exports `CATS`, `products`, `packPrice`,
  `packMRP`, `PACKS_FOR`, `PRODUCT_IMG_MAP`. To add a product, add ONE line to the data
  file; UI, cart, search, Hindi names, docs and audit all pick it up automatically.
- **Product images = local product photos + fallback** — each product resolves a verified local
  photo by ingredient keyword (`PRODUCT_IMG_MAP` in `products.js`) — an
  ingredient photo (almonds, cashews, makhana…) or its category photo.
  No external stock CDN is used: stock sites kept serving wrong/generic
  food (e.g. cake) for real products, and local photos can be checked.
- **State** — cart / wishlist / store-list / orders persist in `localStorage`
  (keys `dryf-cart`, `dryf-wish`, `dryf-list`, `dryf-orders`, `dryf-lang`).
- **i18n** — every product carries English, transliteration and Devanagari names;
  the अ/EN toggle re-renders titles in Hindi without a page reload.

## Adding a product (the only workflow a maintainer needs)
1. Add one row in `assets/js/data/products.js`:
   `["Name","Translit · देवनागरी","category",price,"emoji",level,"shelf life","benefit"],`
2. Run `npm run audit` — it validates Hindi script, price range, category, image mapping.
3. Run `npm run docs:products` — refreshes `docs/PRODUCTS.md`.
