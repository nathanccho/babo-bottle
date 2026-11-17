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

- Responsive storefront with photorealistic campaign imagery, modular anatomy, curated builds, accessories, and care information.
- Six-step builder with per-module and handle colors, optional extensions and attachments, live estimated capacity and component pricing.
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
- `public/assets/`: six optimized full-resolution WebP images used by the storefront.
- `assets/originals/`: six lossless PNG image masters.
- `assets/README.md`: image generation method, exact prompts, and verified native resolutions.

## Validation

The Vite production build passes. The data model was checked across all 432 core component combinations: 384 valid and 48 incompatible long-extension/storage combinations. Valid price and capacity totals match their component sums.

Chrome checks covered the rendered desktop storefront, 400px mobile layout, live builder changes, independent colors, incompatible-part disabling, component review, add/remove cart, demo order review, and share-link restoration. Screen capture was intermittent; the source is responsive, but physical iOS/Android device testing and a full WCAG audit remain outstanding.
