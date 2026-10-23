# Deploying DRYF on GitHub Pages

The repo ships a **temporary workflow template** at
`.github/workflow-templates/deploy-pages.yml`. It is valid and ready, but in *template mode*
it only runs when you trigger it manually — so nothing deploys until you decide.

## Option A — Manual deploy (template as-is)
1. Push this repo to GitHub.
2. Repo → **Settings → Pages** → Build and deployment → Source: **GitHub Actions**.
3. Repo → **Actions** tab → **"Deploy DRYF to GitHub Pages (template)"** → **Run workflow**.
4. The workflow first runs the full audit (`scripts/audit.mjs`, 100+ checks),
   then publishes the repo root as the site.
5. Your site appears at `https://<username>.github.io/<repo>/`.

## Option B — Automatic deploy on every push
In your copied `.github/workflows/deploy-pages.yml`, uncomment under `on:`:
```yaml
  push:
    branches: ["main"]
```
Commit & push — every push to `main` now audits and redeploys automatically.

## Notes
- No build step exists; `index.html` at repo root is the entry point and
  `.nojekyll` is included so GitHub Pages serves files as-is.
- Stock product photos load from Unsplash's CDN in the visitor's browser;
  if one ever fails, the site falls back to local photos in
  `assets/images/categories/` — the page never breaks.
- Local preview: `npm start` (or `python3 -m http.server 8000`), then open
  http://localhost:8000. ES modules require http(s) — opening the file via
  `file://` will not load the data module in most browsers.
