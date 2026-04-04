# Product Page Creation Guide

This guide outlines the process for creating a new product page within the Rempah Warisan Bernam website. All product pages are located in the main (root) directory.

## Instructions

To create a new product page, follow these steps:

1.  **Duplicate the Template:**
    Make a copy of an existing product page like `meat-chicken-curry-powder.html` and rename it for the new product (e.g., `new-spice-powder.html`). Use lowercase and hyphens for the filename.

2.  **Update Product-Specific Metadata:**
    In the `<head>` of the new file, locate the `PRODUCT-SPECIFIC METADATA` section and update the following tags:
    *   `<title>`: The page title.
    *   `<meta name="description">`: A detailed description for SEO.
    *   `<meta property="og:title">`: Title for social media sharing.
    *   `<meta property="og:description">`: Description for social media.
    *   `<meta property="og:image">`: The absolute URL to the product's packaging image (e.g., `https://www.rempahwarisanbernam.net/images/Packaging/new-spice.png`).
    *   `<meta property="og:url">`: The absolute URL to the new product page (e.g., `https://www.rempahwarisanbernam.net/new-spice-powder.html`).

3.  **Update Product Schema (JSON-LD):**
    Find the `PRODUCT-SPECIFIC SCHEMA` script tag and edit the JSON content:
    *   `name`: Full product name.
    *   `image`: Absolute URL to the product image.
    *   `description`: The same detailed description from the meta tag.
    *   `sku`: The product's unique SKU.
    *   `offers.url`: The absolute URL to the new product page.
    *   `offers.price`: The retail price.

4.  **Update Page Content:**
    *   **Product Details Section:** Change the product image `src` and `alt` text, category, `<h1>` title, description, and key ingredients.
    *   **Heritage & Nutritional Section:** Update the `<h4>` title and paragraph content to reflect the new product's story. Update the nutritional facts table with the correct values.
    *   **JavaScript Configuration:** At the bottom of the file, inside the `<script>` tag, update the `CURRENT_PRODUCT_NAME` constant to match the product's full name exactly as it appears in the Google Sheet. This is crucial for fetching the correct "Purchase" link and related recipes.

5.  **Update Google Sheet:**
    Ensure the new product is added to the **"RWB Products"** Google Sheet with its correct `product_name` and `link_to_product` (the WhatsApp purchase link). The `product_name` must be an exact match to the `CURRENT_PRODUCT_NAME` constant in the HTML file for the purchase link to work.

By following these steps, you will maintain a consistent structure and ensure all dynamic features (like purchase links and related recipes) function correctly for new products.