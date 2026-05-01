/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Scan all HTML files in the root directory
    "./products/*.html", // Scan HTML files in the products directory
    // Add any other directories containing HTML files that use Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};