# Product Page Creation Guide

This guide outlines the process for creating a new product page within the Rempah Warisan Bernam website. All product pages should be located in the `/products` directory.

## Instructions

To create a new product page, follow these steps:

1.  **Duplicate the Template:**
    In the `/products` directory, make a copy of an existing product page (e.g., `chilli-powder.html`) and rename it for the new product (e.g., `new-spice-powder.html`). Use lowercase and hyphens for the filename.

2.  **Update Product-Specific Metadata:**
    In the `<head>` of the new file, locate and update these tags:
    *   `<title>`: The page title.
    *   `<meta name="description">`: A detailed description for SEO.
    *   `<meta property="og:title">`: Title for social media sharing.
    *   `<meta property="og:description">`: Description for social media.
    *   `<meta property="og:image">`: The **absolute URL** to the product's packaging image (e.g., `https://www.rempahwarisanbernam.net/images/Packaging/new-spice.png`).
    *   `<meta property="og:url">`: The **absolute URL** to the new product page (e.g., `https://www.rempahwarisanbernam.net/products/new-spice-powder.html`).

3.  **Configure Dynamic Content (JavaScript):**
    Still in the `<head>`, find the `JAVASCRIPT CONFIGURATION & LOGIC` section.
    *   **Update `CURRENT_PRODUCT_NAME`:** Change the value of this constant to match the product's full name **exactly** as it appears in the Google Sheet and as a tag in Blogger.
        *   **Example:** `const CURRENT_PRODUCT_NAME = "Meat & Chicken Curry Powder";`
    *   This constant is critical for two functions:
        1.  Fetching all its purchase variants (sizes, prices, links) from the Google Sheet.
        2.  Fetching related recipes from the Blogger site.
    *   **Update `PRODUCT_SKU`:** Change this to the SKU of the *primary* or *default* variant for schema purposes.
        *   **Example:** `const PRODUCT_SKU = "RWB-SKDA-250G";`

4.  **Update Product Schema (JSON-LD for the default variant):**
    Find the `PRODUCT-SPECIFIC SCHEMA` script tag (also in the `<head>`) and edit the JSON content:
    *   `name`: Full product name.
    *   `image`: Absolute URL to the product image.
    *   `description`: The same detailed description from the meta tag.
    *   `sku`: The product's unique SKU (if available).
    *   `offers.url`: The absolute URL to the new product page.
    *   `offers.price`: The retail price.

5.  **Include Google Customer Reviews Badge:**
    Add the following script block just before the closing `</body>` tag (or within the `<footer>` like `index.html`):
    ```html
    <!-- Google Customer Reviews Merchant Widget -->
    <script id='merchantWidgetScript' src="https://www.gstatic.com/shopping/merchant/merchantwidget.js" defer></script>
    <script>
      merchantWidgetScript.addEventListener('load', function () {
        merchantwidget.start({
             // REQUIRED FIELDS
             merchant_id: 5724505526,
             // OPTIONAL FIELDS
             position: 'BOTTOM_RIGHT', // You can choose other positions like 'LEFT_BOTTOM', 'TOP_LEFT', etc.
             // region: 'REGION_CODE', // Optional: uncomment and replace with your region code if needed (e.g., 'US', 'MY')
        });
      });
    </script>
    ```

5.  **Update Page Content (in the `<body>`):**
    *   **Product Details Section:**
        *   **Product Image:** Update the `src` and `alt` text for the main product image. The ShareThis buttons are positioned directly below this image and will update automatically.
        *   **Product Information:**
            *   Update the category `<p>` tag (e.g., "Spice Blend").
            *   Update the `<h1>` title.
            *   Update the main description paragraph.
        *   **Purchase Options:** The purchase buttons are now generated dynamically. You don't need to edit the "Purchase Now" button anymore. Just ensure the `<div id="purchase-options-container">...</div>` exists.
        *   **Common Uses:** Update the `<ul>` list with common applications for the product.
        *   **Key Ingredients:** Update the paragraph with the product's ingredients.
    *   **Heritage & Nutritional Section:**
        *   Update the `<h4>` title and the descriptive paragraph to tell the story of the product.
        *   Fill in the nutritional facts table with the correct values per 100g serving.
    *   **Related Recipes Section:**
        *   Update the `<h2>` title to reflect the product name (e.g., "Recipes with Coriander Powder").

6.  **Update Centralized Data Sources:**
    *   **Google Sheet ("RWB Products"):**
        *   Add a new row for **each size/variant** of the product.
        *   The `title` column must be an **exact match** to `CURRENT_PRODUCT_NAME` for all variants of that product.
        *   Each variant must have a **unique `id`** that includes the size (e.g., `RWB-001-1KG`, `RWB-001-3KG`).
        *   Fill in the `price` for each variant.
        *   Add the correct `link` for each variant, pointing to the specific cart URL on `order.rempahwarisanbernam`.

    *   **AI Recipe Generator & Blogger:**
        *   Recipes are generated by an external AI system at izndgroup.com and published to the Blogger site.
        *   To ensure recipes appear on the correct product pages, the AI system must be configured to add a **label/tag** to the blog post that is an **exact match** to the product's `CURRENT_PRODUCT_NAME`.
        *   The post must also be tagged with "Recipe" to be correctly categorized.

By following these steps, you will maintain a consistent structure and ensure all dynamic features (purchase links and related recipes) function correctly for new products.

**Note:** The JavaScript for fetching purchase links and related recipes is now self-contained at the bottom of each product page. There is no need to edit a separate `.js` file.