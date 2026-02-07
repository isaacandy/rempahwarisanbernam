/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}", // Scans all .html and .js files in the root
  ],
  theme: {
    extend: {
      colors: {
        'brand-obsidian': '#121212',
        'brand-crimson': '#8b1a1a',
        'brand-gold': '#b39359',
        'brand-cream': '#fdfcf9',
      }
    },
  },
  plugins: [],
}