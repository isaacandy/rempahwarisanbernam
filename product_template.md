# Product Page Creation & Management Guide

This comprehensive guide outlines the process for creating, updating, and maintaining product pages for **Rempah Warisan Bernam**. All product pages reside in the [`products/`](file:///c:/Users/DrIsaacAndyPhD/workspace/rempahwarisanbernam/products/) directory.

---

## 1. Quick Automated Generation (Recommended)

When new products are added to the Google Sheet ([catalog_products.csv](https://docs.google.com/spreadsheets/d/1vKPPiD963CK5QLqZ3gwk__xGgnQ1wRgU6agEYMyiqvQ)), you can run the automated generator script to create all missing pages:

```bash
# 1. Inspect missing pages
python scratch/parse_products.py

# 2. Generate pages automatically
python scratch/generate_all_product_pages.py

# 3. Update sitemap.xml
python scratch/update_sitemap.py

# 4. Rebuild Tailwind CSS
npm run build
```

---

## 2. Manual Step-by-Step Instructions

If creating or customizing a product page manually, follow these detailed steps:

### Step 1: Duplicate Reference Template

Copy an existing clean page (e.g. `products/cinnamon-powder.html` or `products/black-pepper-powder.html`) and rename it with lower-case letters and hyphens:

- Format: `products/<slug>.html` (e.g., `products/cinnamon-powder.html`)

### Step 2: Update Metadata in `<head>`

Update the following tags:

- `<title>`: `[Product Name] | Rempah Warisan Bernam`
- `<meta name="description">`: Concise, SEO-rich product summary (120-160 chars)
- `<link rel="canonical" href="https://www.rempahwarisanbernam.net/products/[slug].html">`
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`
- Twitter tags: `twitter:image:alt`

### Step 3: Update JSON-LD Product Schema

In the `<script type="application/ld+json">` block:

- `name`: Exact product name
- `image`: Absolute URL to image (e.g., `https://www.rempahwarisanbernam.net/images/Packaging/...`)
- `sku`: Base product SKU (e.g., `RWB-019`)
- `offers.price`: Numerical price (e.g., `"7.00"`)
- `offers.url`: Canonical product page URL

### Step 4: Configure JavaScript Constants

Near the bottom of the page, update:

```javascript
// MUST match the 'title' column in the Google Sheet exactly:
const CURRENT_PRODUCT_NAME = "Cinnamon Powder";
const PRODUCT_SKU = "RWB-019";
```

> [!IMPORTANT]
> The dynamic purchase buttons fetch data from Google Sheets based on:
> `variant.name === CURRENT_PRODUCT_NAME`
> If these strings do not match character-for-character, the purchase buttons will not appear.

### Step 5: Update Page Body Content

1. **Category**: Small gold tag above the main title (e.g., `Ground Spice`, `Spice Blend`, `Whole Spice`, `Nuts & Seeds`, `Grains & Pulses`, `Flours`, `Dried Fruits`).
2. **Main Title `<h1>`**: Full commercial product name.
3. **Hero Image**: Ensure `src` points to the packaging PNG in `images/Packaging/` with fallback `onerror`.
4. **ShareThis Container**: Ensure `data-url` and `data-title` match the product.
5. **Common Uses `<ul>`**: 4–5 realistic culinary bullet points.
6. **Key Ingredients `<p>`**: Full botanical or ingredient list.
7. **Heritage Section**: 2–3 sentences highlighting the 1972 recipe origin, processing purity, or natural spice sourcing.
8. **Nutritional Facts Table**: 4–5 realistic values per 100g serving (Energy, Protein, Fat, Carbohydrates, Dietary Fiber).
9. **Related Recipes `<h2>`**: `Recipes with [Product Name]`.

### Step 6: Post-Creation Checklist

- [ ] Add URL entry to [`sitemap.xml`](file:///c:/Users/DrIsaacAndyPhD/workspace/rempahwarisanbernam/sitemap.xml)
- [ ] Ensure packaging image exists in `images/Packaging/`
- [ ] Run `npm run build` to compile Tailwind styles for the new page
- [ ] Test the page in browser at `http://localhost:<port>/products/<slug>.html`
- [ ] Verify purchase option buttons load from the Google Sheet
- [ ] Verify related recipe feed loads or displays graceful fallback

---

## 3. Data Integration Reference

### Google Sheet ("RWB Products" / `catalog_products.csv`)

- **Sheet ID**: `1vKPPiD963CK5QLqZ3gwk__xGgnQ1wRgU6agEYMyiqvQ`
- **Sheet Name**: `catalog_products.csv`
- **Dynamic Lookup**: `https://docs.google.com/spreadsheets/d/1vKPPiD963CK5QLqZ3gwk__xGgnQ1wRgU6agEYMyiqvQ/gviz/tq?tqx=out:json&sheet=catalog_products.csv&headers=1`
- **Variant Matching**: Each size row in the sheet (`250g`, `1kg`, `3kg`) shares the identical `title`. The script automatically parses the size suffix from the ID (e.g., `RWB-019-1KG` -> `1KG`).

### Blogger Recipe Feed

- **Feed URL**: `https://blog.rempahwarisanbernam.net/feeds/posts/default?alt=json-in-script`
- **Matching Tag**: Blogger post must have a label matching `CURRENT_PRODUCT_NAME` and `Recipe`.
