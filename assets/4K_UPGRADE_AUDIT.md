# Native 4K upgrade audit

Superseded as an active requirement: the user clarified that they want high visual quality using their supplied palette, and do not want an API-key setup. The built-in workflow completed that refresh; see `REFERENCE_PALETTE_PHOTOS.md`. The historical pixel audit below does not block ongoing image work.

35 raster photographs are displayed by the site: 27 catalog parts/accessories, the landing cover, three how-it-works images, the branding blank bottle, and three product portraits. None currently has a native long edge of3840pixels. The live SVG builder and wordmarks are resolution-independent vectors.

Current landing master: `assets/originals/babo-cover-balanced-bases.png`,2172×724. Most catalog/how images are1536×1024; branding/product portraits are1024×1536. Current WebP exports preserve those dimensions.

A built-in ImageGen attempt explicitly requested a native3840×1280 reconstruction. It returned2172×724 again. The undersized attempt was not installed or presented as4K. Generated output: `/Users/nathancho/.codex/generated_images/01a1e7c8-dc9b-7173-b63e-794195d914d7/exec-23e57662-0536-45a3-b78c-ccfa793c63f8.png`.

The API-based generation workflow can request explicit output sizes. It requires the user's explicit choice of that fallback and a locally configured `OPENAI_API_KEY`; no API credential was configured during this audit. No credentials were printed or requested in chat.

## Exact built-in attempt prompt

Create a genuinely NATIVE 4K-resolution master of this exact Babo product campaign: output must be 3840 pixels wide by 1280 pixels high (3:1 panorama). This is a high-resolution detail reconstruction, not a low-resolution recolor. Re-render the powdercoat microtexture, crisp stainless screw threads, glass rims, woven strap, zipper teeth, small babo logos, clean product edges and realistic studio highlights with newly resolved fine detail at 3840x1280. Use the attached image as an exact composition reference: preserve every bottle silhouette, proportion, position and slant, all exploded gaps, the broad empty center, warm ivory background and exact colors: left yellow body/coral lid/coral base/clear chamber; cobalt ribbed body with turquoise short section/base and navy lid; lime smooth body/green lid/yellow base; cream body/pink lid/pink base/clear chamber/pink strap/pouch/flower; red smooth body/teal loop lid/BLACK base; violet ribbed body/yellow short section/base/violet lid/beads. Keep all six FULL bottles in frame, no crop, no new props, no new text, no arrows. Preserve exact spatial geometry for existing interactive hover regions. Native3840x1280 output, high fidelity product photography, exceptionally sharp natural detail; avoid smoothing, plastic CGI blur, oversharpened halos and fake grain.
