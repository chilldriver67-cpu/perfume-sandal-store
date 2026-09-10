# Perfume & Sandal Store — Setup Guide

This is a clean rebuild of the project (through v0.16), with these fixes baked in from the start:

1. **Mobile alignment** — the navbar's logo + icon row no longer overflows at narrow widths (this was the real cause of the earlier "everything leans left" bug). `overflow-x: hidden` is also set as a safety net.
2. **Locally hosted images** — every image lives in `src/assets/images/` as a simple SVG placeholder. Nothing depends on an external image host, so nothing can go "dead" the way the old Unsplash links did.
3. **Dark mode** — a 🌙/☀️ toggle in the navbar switches themes instantly, remembers your choice (localStorage), and respects your OS-level preference on first visit.
4. **Clean, single `package.json`** and no stray config files — see the folder structure below.

## First-time setup

Delete any previous version of this project folder entirely before starting fresh with this one — old, half-edited files are exactly what caused several of the earlier bugs.

```powershell
cd path\to\perfume-sandal-store
npm install
npm run dev
```

Then open the `http://localhost:5173/` link the terminal prints.

## If npm "isn't responding" / hangs

Try these in order:

1. **Check your internet connection** — `npm install` needs to reach the npm registry.
2. **Clear npm's cache**, then retry:
   ```powershell
   npm cache clean --force
   npm install
   ```
3. **Delete `node_modules` and the lockfile, then reinstall clean**:
   ```powershell
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   ```
4. **Confirm you're in the right folder** — `npm run dev` only works if you're inside the folder that actually contains `package.json`. Run `dir` (Windows) and confirm `package.json` is listed before running any npm command.
5. If it still hangs specifically on `npm install`, try `npm install --verbose` to see exactly which package it's stuck on — paste that output if you need help.

## Connecting Supabase (optional, for login/signup)

1. Copy `.env.example` to a new file named `.env` in the project root.
2. Fill in your real `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project's **Settings → API** page.
3. Restart `npm run dev` after creating/editing `.env` — Vite only reads it on startup.
4. `.env` is already in `.gitignore` — never commit it.

Without a `.env` file, everything on the site works except login/signup (the auth modal will show a connection error if you try to use it).

## Replacing the placeholder images with real photos

Every image is a plain SVG in `src/assets/images/`, referenced by a simple local path like `/src/assets/images/product-velvet-oud.svg`. To swap in a real photo:

1. Get the real image file (from your client, or downloaded yourself from a site like unsplash.com).
2. Drop it into `src/assets/images/` (e.g. `velvet-oud.jpg`).
3. Update the matching path in `src/data/products.js` (for products) or `index.html` (for Categories/Hero/About) to point to your new file instead of the `.svg` placeholder.

No other code changes needed — everything else (cards, modals, cart) reads from these same paths automatically.

## Folder structure

```
perfume-sandal-store/
├── index.html
├── package.json
├── .env.example
├── .gitignore
├── src/
│   ├── css/
│   │   ├── style.css        (imports + theme variables + reset)
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── products.css     (categories, product cards, about, testimonials, newsletter, modals)
│   │   ├── footer.css       (footer + cart drawer)
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js          (entry point — wires everything together)
│   │   ├── theme.js         (dark mode)
│   │   ├── navbar.js
│   │   ├── products.js
│   │   ├── testimonials.js
│   │   ├── newsletter.js
│   │   ├── footer.js
│   │   ├── cart.js
│   │   ├── productDetails.js
│   │   ├── auth.js
│   │   └── supabaseClient.js
│   ├── data/
│   │   ├── products.js
│   │   └── testimonials.js
│   └── assets/
│       ├── images/          (all local placeholder SVGs live here)
│       ├── icons/
│       └── logos/
└── public/
```

## Known technical notes (carried over from earlier lessons)

- CSS is imported via `import "../css/style.css"` in `main.js` — never switch this to a `<link>` tag in `index.html`, it breaks Vite's dev-mode CSS handling.
- `@import` lines in `style.css` must stay the very first lines in the file.
- Both `<dialog>`-based modals (product details, auth) need `margin: auto;` explicitly set — the global CSS reset cancels the browser's native dialog centering otherwise.
- If styles ever seem "stuck" after an edit, clear Vite's cache and restart:
  ```powershell
  rmdir /s /q node_modules\.vite
  npm run dev
  ```
