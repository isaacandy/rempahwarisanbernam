# GitHub Copilot Instructions — Rempah Warisan Bernam

This file gives concise, actionable guidance for AI coding agents working in this repository.

Summary
- **Two parallel sites**: a static corporate site at the repo root (plain HTML/Tailwind) and a React + Vite app under `rempah-website`.

Quick commands
- Static preview: open `index.html` (root) in a browser — no build step.
- React app (local dev):
  - `cd rempah-website`
  - `npm install`
  - `npm run dev` — starts Vite HMR dev server
  - `npm run build` — production build
  - `npm run preview` — serve a local preview of the build
  - `npm run lint` — runs ESLint as configured in `rempah-website/eslint.config.js` ([file](rempah-website/eslint.config.js#L1-L20)).

Architecture & key patterns
- Root site: single-file static pages (`index.html`, `blog.html`, `recipe.html`) — edited directly for content/layout.
- App: `rempah-website` is a small React SPA scaffolded with Vite. Entry is `rempah-website/src/main.jsx` ([file](rempah-website/src/main.jsx#L1-L20)); main UI in `rempah-website/src/App.jsx` ([file](rempah-website/src/App.jsx#L1-L40)).
- Styling: Tailwind is used (see `rempah-website/tailwind.config` and `rempah-website/index.css`). Follow existing utility-first classes present in `App.jsx` rather than introducing new global CSS files.
- Icons: uses `lucide-react` throughout; import only the icons used to keep bundle small (see imports at top of `App.jsx`).
- Data: product/catalog data is currently hard-coded in `rempah-website/src/App.jsx` (the `products` array). If persisting or adding more products, prefer moving this array into a single `data/*.js` or `src/assets/*.json` and import it.

Conventions and gotchas
- Duplicate artifact: there is a `scr/` folder with a copy of `App.jsx` (`scr/App.jsx`) — prefer `rempah-website/src` as canonical source. Avoid editing both copies; search for `scr/` first when changing components.
- No backend: this repo is static/front-end only. Integration points (future) are described in the root README; mock external links rather than implementing server code.
- ESLint: project uses the flat config at `rempah-website/eslint.config.js`; rule `no-unused-vars` is configured to ignore names matching `^[A-Z_]` (useful for intentionally exported constants).
- Tailwind v4-ish: check `rempah-website/tailwind.config` for theme tokens before adding custom classes.

Where to change behavior
- To change navigation, modify `rempah-website/src/App.jsx` nav section (search for `Navigation` comment).
- To change product text/images, update the `products` array in `rempah-website/src/App.jsx` or move it to a `data/` file as noted above.
- To change build / lint pipeline, edit `rempah-website/package.json` scripts ([file](rempah-website/package.json#L1-L40)).

Testing & debugging
- Vite console output is the primary source of build/runtime errors. When `npm run dev` shows a compilation error, follow the stack trace to the original source file shown by Vite.
- To reproduce production behavior locally: `npm run build` then `npm run preview`.

PR guidance for AI agents
- Make minimal, focused changes; keep root static pages unchanged unless the PR explicitly targets them.
- When touching UI, show a small before/after screenshot or a brief dev-server command so reviewers can reproduce: e.g., `cd rempah-website && npm run dev`.
- If adding new dependencies, update `rempah-website/package.json` and include reasons in the PR description.

If anything is ambiguous
- Ask where the change should live: root static HTML vs `rempah-website` SPA.
- Ask whether `scr/` duplicates should be removed or maintained for history.

Request feedback
- If this file misses any local build scripts or CI steps you use, tell me and I will iterate.
