# Product Page Creation Guide

This guide outlines the process for creating a new product page within the Rempah Warisan Bernam website. All product pages should be located in the `/products` directory.

## Instructions

To create a new product page, follow these steps:

1.  **Duplicate the Template:**
    In the `/products` directory, make a copy of an existing product page (e.g., `chilli-powder.html`) and rename it for the new product (e.g., `new-spice-powder.html`). Use lowercase and hyphens for the filename.

2.  **Update Product-Specific Metadata:**
    In the `<head>` of the new file, locate the `PRODUCT-SPECIFIC METADATA` section and update these tags:
    *   `<title>`: The page title.
    *   `<meta name="description">`: A detailed description for SEO.
    *   `<meta property="og:title">`: Title for social media sharing.
    *   `<meta property="og:description">`: Description for social media.
    *   `<meta property="og:image">`: The **absolute URL** to the product's packaging image (e.g., `https://www.rempahwarisanbernam.net/images/Packaging/new-spice.png`).
    *   `<meta property="og:url">`: The **absolute URL** to the new product page (e.g., `https://www.rempahwarisanbernam.net/products/new-spice-powder.html`).

3.  **Update Product Schema (JSON-LD):**
    Find the `PRODUCT-SPECIFIC SCHEMA` script tag and edit the JSON content:
    *   `name`: Full product name.
    *   `image`: Absolute URL to the product image.
    *   `description`: The same detailed description from the meta tag.
    *   `sku`: The product's unique SKU (if available).
    *   `offers.url`: The absolute URL to the new product page.
    *   `offers.price`: The retail price.

4.  **Update Page Content:**
    *   **Product Image:** Update the `src` and `alt` text for the main product image.
    *   **Product Information:**
        *   Update the category `<p>` tag (e.g., "Spice Blend").
        *   Update the `<h1>` title.
        *   Update the main description paragraph.
    *   **Common Uses:** Update the `<ul>` list with common applications for the product.
    *   **Key Ingredients:** Update the paragraph with the product's ingredients.
    *   **Heritage & Nutritional Section:**
        *   Update the `<h4>` title and the descriptive paragraph to tell the story of the product.
        *   Fill in the nutritional facts table with the correct values per 100g serving.

5.  **Configure Dynamic Content (JavaScript):** 
    At the bottom of the file, inside the `<script>` tag, find the `JAVASCRIPT CONFIGURATION` section.
    *   **Update `CURRENT_PRODUCT_NAME`:** Change the value of this constant to match the product's full name **exactly** as it appears in the Google Sheet and as a tag in Blogger.
        *   **Example:** `const CURRENT_PRODUCT_NAME = "Serbuk Kari Daging & Ayam";`
    *   This constant is critical for two functions:
        1.  Fetching the correct **WhatsApp purchase link** from the Google Sheet.
        2.  Fetching **related recipes** from the Blogger site by filtering for posts tagged with this name.

6.  **Update Centralized Data Sources:** 
    *   **Google Sheet ("RWB Products"):**
        *   Add a new row for the product.
        *   Ensure the `product_name` column is an **exact match** to the `CURRENT_PRODUCT_NAME` constant in the HTML file.
        *   Add the correct `whatsapp_product_link`.
    *   **Blogger (`blog.rempahwarisanbernam.net`):**
        *   When creating recipes that use this new product, add a **label/tag** to the post that is an **exact match** to the `CURRENT_PRODUCT_NAME` constant.
        *   Also, ensure the post is tagged with "Recipe" for it to be correctly identified.

By following these steps, you will maintain a consistent structure and ensure all dynamic features (purchase links and related recipes) function correctly for new products.