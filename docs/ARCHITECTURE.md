# DRYF — Project Architecture

A static, no-build-step web app organised like a production project: data, logic,
presentation and tooling are fully separated.

## Folder structure
```
.
├── index.html                  # Entry point (markup + page sections)
├── assets/
│   ├── css/
│   │   └── styles.css          # All presentation (design system + components)
│   ├── js/
│   │   ├── app.js              # Application logic (ES module): state, cart,
│   │   │                       # checkout, wishlist, i18n toggle, rendering
│   │   └── data/
│   │       └── products.js     # DATA LAYER (ES module): categories, 247 products,
│   │                           # pricing rules, Unsplash stock-photo mapping
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

## Design decisions
- **No framework / no build step** — plain HTML + CSS + ES modules. Deploys anywhere
  (GitHub Pages, Netlify, any static host) by copying the folder.
- **Data/logic separation** — `products.js` exports `CATS`, `products`, `packPrice`,
  `packMRP`, `PACKS_FOR`, `STOCK_MAP`. To add a product, add ONE line to the data
  file; UI, cart, search, Hindi names, docs and audit all pick it up automatically.
- **Product images = stock photos + fallback** — each product resolves a stock photo
  from Unsplash (`images.unsplash.com`, matched by ingredient keyword in `STOCK_MAP`).
  Every `<img>` carries an `onerror` fallback to the local category photo, so the
  page never shows a broken image even if a CDN photo is removed.
- **State** — cart / wishlist / store-list / orders persist in `localStorage`
  (keys `dryf-cart`, `dryf-wish`, `dryf-list`, `dryf-orders`, `dryf-lang`).
- **i18n** — every product carries English, transliteration and Devanagari names;
  the अ/EN toggle re-renders titles in Hindi without a page reload.

## Adding a product (the only workflow a maintainer needs)
1. Add one row in `assets/js/data/products.js`:
   `["Name","Translit · देवनागरी","category",price,"emoji",level,"shelf life","benefit"],`
2. Run `npm run audit` — it validates Hindi script, price range, category, image mapping.
3. Run `npm run docs:products` — refreshes `docs/PRODUCTS.md`.
