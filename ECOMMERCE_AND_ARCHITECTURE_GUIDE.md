# Documentation Index & Architecture Guide

This project includes two detailed documentation manuals to guide ongoing maintenance and future development:

1. **[Product Creation & Maintenance Guide](product_template.md):**  
   Step-by-step instructions for adding new products, updating images, and running automation scripts.
2. **[eCommerce & Technical Architecture Guide](ECOMMERCE_AND_ARCHITECTURE_GUIDE.md):**  
   Covers system architecture, Google Sheet integration, dual-mode order logic, and the roadmap for transitioning to a full eCommerce store.

---

## Quick Reference Summary

### 1. Active Catalog Status
* **Total Products:** 34 fully designed, responsive product pages located in [`products/`](products/).
* **Catalog Grid (`index.html`):** Features interactive category filters (*All, Spice Blends, Ground Spices, Whole Spices, Pantry & Bulk*) and live instant search.
* **Packaging Presentation:** All images use `object-contain` with clean padding to display the full packaging artwork without cropping.

---

### 2. Dual-Mode Ordering Flow
Each product page dynamically fetches size variants from the Google Sheet and supports two order modes:

1. **Custom Checkout Link (Primary):**  
   If an external cart or payment URL is provided in the Google Sheet's `link` column, it opens that link directly.
2. **Quick WhatsApp Order Modal (Automated Fallback):**  
   If no custom payment link is set, clicking a size option opens an on-page modal that:
   * Provides a quantity stepper and real-time subtotal calculation.
   * Collects customer delivery details (**Full Name**, **Delivery Address**, **Postcode**, and **Notes**).
   * Generates a formatted order invoice and opens WhatsApp directly to **`+601154322254`**.

---

### 3. Build & Maintenance Commands

```bash
# Build production Tailwind CSS
npm run build

# Watch mode for development
npm run watch

# Local preview server
npm run preview
```
