# Babo Bottle

An interactive, locally hosted storefront based on `Babo_Bottle_Website_PRD.pdf`.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev -- --port 3000
```

Open http://localhost:3000/. The server binds only to this computer.

```sh
npm run build
npm run preview -- --port 3000
```

`build` writes the production site to `dist/`. Stop the development server before using the same port for preview.

## Included

- Focused landing-page journey: combination imagery, brief how-it-works steps, six attachments, and an inline make-your-own station.
- The inline bottle grows/shrinks with size and extension changes, updates estimated price/capacity, and carries the exact setup into the full configurator.
- Optional engraving-style branding preview stays in an expandable section after the main journey.
- Six-step builder with per-module and handle colors, up to three stacked extensions and optional attachments, live estimated capacity and component pricing.
- Live 2D configuration preview with independent colors, compact handles, capacity extensions, and attachments.
- Presets, random colors, match-all, undo/redo, reset, and shareable configurations encoded in the URL.
- Compatibility validation for the concept part family; long extensions and storage bases cannot be combined.
- Search, product details, persistent local cart, component SKU breakdown, quantity controls, and demo order review.
- Keyboard-operable controls, focus-trapped dialogs, focus restoration, labeled swatches, live configuration announcements, and visible focus states.
- Local brand preview with custom text or a PNG/JPG/WebP logo upload. No files are sent to a server.
- A short Korean brand story: Babo means “fool”; the bottle is designed to be foolishly playful and simple to customize.

## Concept boundaries

The PRD identifies product architecture and commerce details as unvalidated. All capacities and prices in this implementation are illustrative. The photorealistic images are AI-generated concepts based on the supplied visual references. SVG illustrations provide the live configuration preview. None are verified production CAD or photographs of manufactured samples.

Checkout is a clearly labeled demo. It does not collect payments, reserve inventory, place orders, create accounts, or send data to a commerce service. The cart is stored in this browser. Build links include configuration choices only.

A production launch needs approved geometry and measured specifications; validated part compatibility, materials and care instructions; final SKUs and inventory; a commerce backend with server-side price/stock validation; tax, shipping, payment and fulfillment integrations; and final brand policies/content.

Fonts load from Google Fonts with local sans-serif fallbacks. No application tracking or external analytics are configured.

## Source map

- `index.html`, `style.css`, `app.js`: storefront and homepage interactions.
- `data.js`: concept catalog, color-specific SKUs, estimates, and compatibility rules.
- `configurator.js`, `configurator.css`: builder, cart, search, products, and informational dialogs.
- `illustrations.js`: original code-generated SVG product and accessory illustrations.
- `public/assets/`: optimized full-resolution WebP marketing photographs.
- `assets/originals/`: lossless PNG image masters.
- `assets/README.md`, `assets/COVER_AND_ATTACHMENTS.md`, `assets/FINAL_PHOTO_EDITS.md`, `assets/STUDIO_COVER.md`: image methods, reference paths, exact prompts, and native resolutions.

## Validation

The Vite production build passes. The expanded data model was checked across 138,240 configurations including stacked modules and attachment combinations. Price/capacity/BOM sums, compatibility at every stack position, legacy migration, sharing, and cart restoration were checked.

Chrome checks covered the rendered desktop storefront, 400px mobile layout, live builder changes, independent colors, incompatible-part disabling, component review, add/remove cart, demo order review, and share-link restoration. Screen capture was intermittent; the source is responsive, but physical iOS/Android device testing and a full WCAG audit remain outstanding.
