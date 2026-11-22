/** Regenerates docs/PRODUCTS.md from the product data. Usage: npm run docs:products */
import { writeFileSync } from "node:fs";
import { CATS, products } from "../assets/js/data/products.js";

let out = `# DRYF — Full Product List (${products.length} products)\n\n`;
out += `Auto-generated from \`assets/js/data/products.js\` — run \`npm run docs:products\` to refresh.\n`;
out += `Prices are indicative demo prices per 500g (gift hampers per box). Product photos: verified local photos in assets/images/products/ and assets/images/categories/ (see PRODUCT_IMG_MAP in the data file) - no external stock URLs.\n`;

for (const [key, c] of Object.entries(CATS)) {
  const items = products.filter(p => p.cat === key);
  out += `\n## ${c.emoji} ${c.label} — ${c.hindi || ""} (${items.length})\n\n`;
  out += `| # | Product | Hindi | Price ₹/500g | Level | Shelf life |\n|---|---|---|---:|---|---|\n`;
  const L = { 1: "⭐ Must-Have", 2: "🔥 Popular", 3: "💎 Premium" };
  items.forEach((p, i) => { out += `| ${i + 1} | ${p.emoji} ${p.name} | ${p.translit} · ${p.deva} | ₹${p.price} | ${L[p.level]} | ${p.shelf} |\n`; });
}
writeFileSync("docs/PRODUCTS.md", out);
console.log(`docs/PRODUCTS.md written — ${products.length} products in ${Object.keys(CATS).length} categories`);
