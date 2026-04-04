# Rempah Warisan Bernam Website

Welcome to the official repository for the Rempah Warisan Bernam corporate website. This project is a static website built with HTML and Tailwind CSS, designed to showcase the company's brand, products, and heritage.

## Project Overview

The website consists of several key static pages that integrate with external services for dynamic content.

*   **`index.html`**: The main landing page.
*   **Product Pages (e.g., `chilli-powder.html`)**: Individual, template-based pages for each spice product.
*   **`blog.html`**: A blog listing page that fetches and displays posts from a Blogger blog.
*   **`recipe.html`**: A recipe collection page, also powered by the Blogger blog, filtering for posts tagged as "Recipe".

### Key Technologies & Integrations

*   **Styling**: Tailwind CSS is used for styling, loaded via a CDN link in the `<head>` of each HTML file.
*   **Icons**: Lucide Icons are used for iconography.
*   **Content Management (Blog/Recipes)**: All blog posts and recipes are managed on an external Blogger site. The `blog.html` and `recipe.html` pages use JavaScript to fetch posts from the Blogger JSON feed.
*   **Content Management (Products)**: Product purchase links are managed centrally in a Google Sheet. Product pages fetch the correct link at runtime based on the product name.

## Content Management

This project is designed to be managed without a complex CMS. Here’s how to update different parts of the site:

### Adding a New Product

To add a new product to the website, you need to create a new HTML file for it. This process involves duplicating a template and updating its content.

> **For detailed instructions, please see the Product Page Creation Guide.**

### Adding a New Blog Post or Recipe

1.  Go to the Rempah Warisan Bernam Blogger dashboard.
2.  Create a new post.
3.  To make it appear on the **Recipes** page, add the label `Recipe` or `AI-Generated Recipe` to the post.
4.  Posts without a recipe-related label will automatically appear on the **Blog** page.

## Deployment

This site is deployed via cPanel. The `.cpanel.yml` file in the repository root controls the deployment process. It copies all `*.html` files and the `images` directory to the `public_html` folder on the server.