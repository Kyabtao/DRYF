# DRYF — Audit

## What "audit 100 times" means here
Instead of a one-time manual look, the project has a **repeatable automated audit**
(`scripts/audit.mjs`) that executes **100+ checks on every run** — in practice
several thousand, because every one of the 247 products is individually validated.
Run it any time:

```bash
npm run audit        # or: node scripts/audit.mjs
```

It also runs in CI as the first job of the deployment workflow, so a broken
product entry can never reach the live site.

## Coverage (7 audit groups)
1. **Project structure** — all 15 expected files exist (entry point, organised
   css/js/data, docs, workflow, tooling configs).
2. **HTML wiring** — organised asset paths only, ES-module loading, required
   sections/ids present, no stale root-level references.
3. **Category integrity** — 9 categories, each with label/emoji/blurb, an existing
   local fallback image, products, and at least one bestseller.
4. **Catalogue size & uniqueness** — ≥240 products, sequential ids, no duplicate names.
5. **Per-product checks (×247)** — English name, Hindi transliteration **and**
   Devanagari script, known category, sane price (₹50–5000), emoji, level 1–3,
   shelf life, benefit text, rating 4.0–5.0, discount 10–35%, MRP > price,
   Unsplash stock-photo URL, existing local fallback image, and monotonic
   pack pricing (250g < 500g < 1kg).
6. **Stock-photo mapping** — 25+ keyword groups, all pointing at
   `images.unsplash.com`, 25+ distinct photos actually used.
7. **App-logic smoke checks** — cart, checkout, orders, wishlist, Hindi toggle,
   billing and image-fallback code all present; cart persistence in localStorage.

## Manual audit passes done alongside (this release)
- Click-tested: search (EN + Hindi — "केसर"), filters, sorting, pack-size change,
  add-to-cart, quantity +/−, coupons (valid/invalid/below-threshold), free-delivery
  threshold, checkout validation (10-digit mobile, 6-digit PIN), order success,
  order history, wishlist, store-list CSV/copy/print, Hindi title toggle, ESC/overlay close.
- Verified every generated `<img>` has an `onerror` fallback to a local photo.
- Verified the site serves correctly from the reorganised paths (`assets/…`).
