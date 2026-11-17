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

- Focused landing-page journey: combination imagery, brief how-it-works steps, a filterable 27-part gallery with a mixed 15-part preview (three rows of five on desktop) and a See all control, and an inline make-your-own station.
- The inline station starts empty and builds a base, body, and lid piece by piece. Extra upper sections, lower extensions, and accessories have individual type/color controls; the exact build carries into Review.
- An engraving-style branding preview stays collapsed behind an Add your brand button. Header and footer brand links open it.
- Six-step builder with per-module and handle colors, up to three stacked extensions and optional attachments, live estimated capacity and component pricing.
- Live 2D configuration preview with independent colors, compact handles, capacity extensions, and 14 attachments, including a protective boot, sling, spare straws, infuser, spare seals, and stickers.
- Persistent KR/EN language switching for storefront text, builder controls, product information, dialogs, and accessibility labels. Korean headings and body copy have suitable rounded font fallbacks.
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
- `i18n.js`, `ko-data.js`: Korean UI and catalog translations, dynamic text translation, and persisted language preference.
- `configurator.js`, `configurator.css`: builder, cart, search, products, and informational dialogs.
- `illustrations.js`: original code-generated SVG product and accessory illustrations.
- `public/assets/`: optimized full-resolution WebP marketing photographs.
- `assets/originals/`: lossless PNG image masters.
- `assets/README.md`, `assets/COVER_AND_ATTACHMENTS.md`, `assets/FINAL_PHOTO_EDITS.md`, `assets/STUDIO_COVER.md`, `assets/EXPLODED_AND_SNACK.md`, `assets/ATTACHMENT_LOOP.md`, `assets/UPWARD_THREADS.md`, `assets/VARIED_COVER.md`, `assets/PART_GALLERY_REBUILD.md`, `assets/LID_CORRECTIONS.md`, `assets/EVERYDAY_ACCESSORIES.md`: image methods, reference paths, exact prompts, and native resolutions.

## Validation

The Vite production build passes. The expanded data model was checked across 138,240 configurations including stacked modules and attachment combinations. Price/capacity/BOM sums, compatibility at every stack position, legacy migration, sharing, and cart restoration were checked.

Chrome checks covered the rendered desktop storefront, 400px mobile layout, live builder changes, independent colors, incompatible-part disabling, component review, add/remove cart, demo order review, and share-link restoration. The latest polish reviewed the 375px iPhone SE emulated layout and mobile menu navigation, and added 20 focused keyboard/cart checks. It fixes focus recovery, actual-height product dialog scrolling, touch targets, and a compact sticky mobile preview with an Expand option. Native browser control was intermittent, so a complete final mobile tap-through, physical iOS/Android device testing, and a full WCAG audit remain outstanding.

The latest accessory expansion checks 16,384 attachment combinations, all 14 independent colors in cart/share persistence, six new standalone products, and 25 SVG renders. All 27 part photos exist at 1536 × 1024. Korean catalog coverage and Korean search checks pass. The final production build and whitespace checks pass. The latest native-browser capture attempt failed with a ScreenCaptureKit stream error, so the newest Korean layout and accessory additions still need a visual browser pass.

Korean/English fixture checks also pass for text and accessibility-attribute roundtrips, same-node dynamic updates, protected tab title, untranslated identifiers/URLs/color values, and dynamic gallery/cart/builder labels. These source-level checks do not replace the outstanding visual browser pass.

Builder stability polish: the preview uses a fixed product centerline and floor instead of recentering each part bounding box. Core assembly keeps a consistent scale, while tall stacks fit the stage. Control changes preserve page scroll, and only explicit next-step/new-module actions reposition the editor. Cards use eager full-resolution part photos with consistent contain sizing. Twenty camera cases pass for mobile/desktop sizes, steady core scale, floor alignment, and tall stacks. Chrome at 375px confirmed base → body → lid and enabled Review; capture failed again during the final color screenshot.

Vibrant palette refresh: 12 saturated builder colors, six matching hero combinations, cobalt announcement bar, teal actions, yellow builder frame, and navy footer. The color-only landing image edit retains the original hover geometry and is saved at its native 2172 × 724 resolution. See `assets/VIBRANT_PALETTE.md` for the exact built-in ImageGen prompt and asset paths. Desktop and 375px mobile landing screenshots were reviewed. All 48 preset/palette core-color SKU combinations, six hero configurations, and Korean color/combination labels pass checks.

Compact builder flow: Base → Body → Lid → Attachments. The desktop controls and preview are each 520px tall; options scroll inside the editor, with tabs, totals, and Review kept visible. Body compartments and clear extensions are added during the Body step before a lid is required. Attachments occupy the final tab, with no persistent optional-extras accordion. Browser checks confirmed two added body compartments followed by a lid and snack attachment; source checks cover all14attachment choices, body controls before the lid, hidden irrelevant menus, and Korean labels.

Catalog photo refresh: 24 colored/opaque product images now use the vibrant landing palette, with all PNG masters and full-resolution1536×1024 WebP replacements. Three transparent glass parts retain their clear neutral appearance. Gallery, inline builder, and component dialogs share the refreshed assets and cache version. Default accessory colors match their new photos; saved custom colors remain intact. A24-image contact sheet and the expanded27-part desktop gallery were visually inspected. The16,384attachment-set checks, asset presence checks, syntax checks, and production build pass. Exact built-in ImageGen prompts and source/output paths are in `assets/VIBRANT_CATALOG.md`.

Reference-palette refresh: the latest user board replaces the neon palette with18coordinated colors and six matching cover builds.32photos—including the landing image, catalog parts/accessories, how-to photos, branding blank and product portraits—were recreated using built-in ImageGen. Three clear-glass photos remain transparent. New PNG masters and WebP exports are in the `reference-palette` subfolders. The landing WebP is lossless; other new exports usequality96 at native resolution. No API key is needed for this visual-quality workflow. Exact prompts, source paths, and verified dimensions are in `assets/REFERENCE_PALETTE_PHOTOS.md`. The32-image QA sheet and desktop landing page were inspected.72preset/color combinations, six hero configurations, translated color labels and16,384attachment sets pass; all35active photo paths exist.
