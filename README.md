# Guide to Managing Product Pages

This guide provides instructions for an AI agent or developer on how to create, update, and manage individual product pages for the Rempah Warisan Bernam website.

## 1. Objective

To create a dedicated, SEO-optimized static HTML page for each product in the catalog. These pages dynamically pull in their "Purchase via WhatsApp" link from the master Google Sheet and display related recipes from the blog.

## 2. File Location

All product pages **must** be created and stored in the `/products/` directory.

## 3. Creating a New Product Page: Step-by-Step

Follow these instructions precisely to generate a new product page.

### Step 1: Duplicate the Template

Copy an existing product page, such as `products/meat-chicken-curry-powder.html`, to use as a template.

### Step 2: Rename the New File

Rename the copied file to a URL-friendly "slug" that represents the new product.

- Use all lowercase letters.
- Separate words with hyphens (`-`).
- **Example:** For "Chilli Powder", the filename should be `chilli-powder.html`.

### Step 3: Edit the Product-Specific Sections

Open the new HTML file and modify the three sections marked with comments.

#### A. Update the SEO & Metadata

This section is in the `<head>` of the document. It is critical for search engine optimization and social media link previews.

```html
<!-- === PRODUCT-SPECIFIC METADATA (EDIT FOR EACH NEW PRODUCT) === -->
<title>Chilli Powder | Rempah Warisan Bernam</title>
<meta name="description"
    content="100% pure dry red chilli powder, finely ground with zero preservatives. Perfect for adding vibrant color and controlled heat to any dish.">
<meta property="og:title" content="Chilli Powder | Rempah Warisan Bernam">
<meta property="og:description"
    content="100% pure dry red chilli powder, finely ground with zero preservatives.">
<meta property="og:image" content="https://www.rempahwarisanbernam.net/images/Packaging/Chilli-Powder.png">
<meta property="og:url" content="https://www.rempahwarisanbernam.net/products/chilli-powder.html">
<!-- === END OF PRODUCT-SPECIFIC METADATA === -->
```

**Fields to Edit:**
- `<title>`: The full title shown in the browser tab.
- `meta name="description"`: A detailed, keyword-rich description for search engines.
- `og:title`: The title for social media previews (usually shorter).
- `og:description"`: The description for social media previews.
- `og:image"`: The **full, absolute URL** to the product's image.
- `og:url"`: The **full, absolute URL** to this new product page.

#### B. Update the Product Schema

This `application/ld+json` script is also in the `<head>`. It provides structured data to Google for rich search results.

```html
<!-- === PRODUCT-SPECIFIC SCHEMA (EDIT FOR EACH NEW PRODUCT) === -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Chilli Powder",
  "image": "https://www.rempahwarisanbernam.net/images/Packaging/Chilli-Powder.png",
  "description": "100% pure dry red chilli powder, finely ground with zero preservatives. Perfect for adding vibrant color and controlled heat to any dish.",
  "sku": "RWB-SCP-01",
  "offers": {
    "url": "https://www.rempahwarisanbernam.net/products/chilli-powder.html",
    "price": "4.00"
  }
  ...
}
</script>
<!-- === END OF PRODUCT-SPECIFIC SCHEMA === -->
```

**Fields to Edit:**
- `name`: The product's full name.
- `image`: The absolute URL to the product image.
- `description`: The detailed product description.
- `sku`: The unique Stock Keeping Unit for the product.
- `offers.url`: The absolute URL to this new product page.
- `offers.price`: The product's price (as a string, without currency symbols).

#### C. Update the Page Content & Configuration
1.  **Main Product Details:** In the first `<section>`, update the product image `src`, `<h1>` title, main paragraph description, and "Key Ingredients" list.
2.  **Heritage & Nutrition Section:** In the second `<section>`, write a compelling paragraph for the "Heritage & Craft" story of the product. Then, update the "Nutritional Facts" table with the correct values for the product.
3.  **Technology Section:** The third section on "Tradition Meets Technology" is standardized. It does not need to be edited.
4.  **JavaScript Configuration:** At the bottom of the file, inside the `<script>` tag, update the `CURRENT_PRODUCT_NAME` variable.

```javascript
// --- CONFIGURATION (EDIT FOR EACH NEW PRODUCT) ---
const CURRENT_PRODUCT_NAME = "Chilli Powder";
// --- END OF CONFIGURATION ---
```

> **Crucial:** The value of `CURRENT_PRODUCT_NAME` **must exactly match** the product's name in the `product_name` column of the Google Sheet. This is how the page automatically fetches the correct "Purchase via WhatsApp" link and filters for related recipes.

## 4. How to Add or Remove Products

### To Add a New Product:
1.  Ensure the new product is listed in the master Google Sheet with its `product_name` and `link_to_product`.
2.  Follow the **Step-by-Step Guide** above to create its corresponding `.html` file in the `/products/` directory.
3.  (Optional) Link to the new product page from the main website (e.g., from the catalog on `index.html`).

### To Remove a Product:
1.  Simply **delete the product's HTML file** from the `/products/` directory.
2.  (Optional) Remove any direct links to that page from the main website.

---

This guide ensures that all product pages are created with a consistent, SEO-friendly, and maintainable structure.ndget 