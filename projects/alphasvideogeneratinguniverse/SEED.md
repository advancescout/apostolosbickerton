# Alpha's Video Generating Universe — project seed

**Route:** `apostolosbickerton.com/projects/alphasvideogeneratinguniverse` — this lives at `projects/alphasvideogeneratinguniverse/` in the repo; the folder path IS the URL on GitHub Pages, so keep both folder names exactly as is (all lowercase, no spaces)

## What this is

A video-directing studio web app with a cosmic theme. A working v1 already exists in `index.html` — a single self-contained file (no build step, no dependencies, Google Fonts only). Treat it as the design and feature baseline, not a throwaway mock.

## Current v1 features (all working, client-side)

- **Model picker** — 10 real model names as labels (Veo 3, Sora 2, Kling 2.1, Runway Gen-4, Seedance 1.0, Wan 2.2, Hailuo 02, Luma Ray 2, Pika 2.2, FLUX). Not connected to any of them.
- **Duration dial** — the signature feature. User types minutes and hours; live total + frame count at 24fps.
- **References tab** — multi-image upload with thumbnails (object URLs, never leaves the browser)
- **Keyframes tab** — timestamped keyframe list (min:sec + description), sortable, removable
- **Edit tab** — edit log; re-seeds the preview when applied
- **Extend tab** — adds minutes to the duration dial
- **Import tab** — video + audio file chips
- **Generate** — simulated progress bar + animated canvas "nebula" preview, clearly labelled "PREVIEW SIMULATION"
- **Projects panel** — in-memory save + JSON export

## Design tokens (keep these)

- Colours: void `#0B0A1A`, deepspace `#141230`, nebula `#2A2160`, panel `#191636`, line `#332C66`, stargold `#FFC966`, plasma `#FF6FB5`, ink `#EDEAFF`, dim `#9A93C4`
- Type: Unbounded (display), Space Grotesk (body)
- Starfield canvas background; respects `prefers-reduced-motion`

## Honesty constraints (non-negotiable)

1. The preview is a simulation. Keep the "PREVIEW SIMULATION" tag and the "Honest bit" footer note unless/until real generation is wired in.
2. The model names belong to other companies. Keep the non-affiliation wording in the footer.
3. Do not claim "unlimited free generation" anywhere real APIs are involved — real video generation is billed per second of output. If real APIs are added, surface cost/usage honestly.

## Roadmap ideas for Claude Code (in rough priority order)

1. **Persist projects** — swap the in-memory projects array for `localStorage` (fine on a real hosted site) with export/import of the JSON file.
2. **Playable imports** — render imported video/audio with `<video>`/`<audio>` elements and a simple combined timeline view instead of chips.
3. **Keyframes on a visual timeline** — horizontal timeline scaled to the duration dial, keyframes as draggable markers.
4. **Shareable project links** — encode a project into the URL hash so a project can be shared as a link.
5. **Real generation (optional, costs money)** — integrate one aggregator API (e.g. fal.ai or Replicate) behind a serverless proxy (Cloudflare Worker — never put API keys in client code). Start with one short-clip model, show real per-generation cost, and only then relabel the preview. Long durations would be built by chaining/extending clips.
6. **Gallery page** — a `/gallery` sub-page showing saved/exported projects as cards.

## Repo integration

- `project-card-snippet.html` contains a homepage tile linking to this project — paste its contents into the site's projects section and update the `href` to `/projects/alphasvideogeneratinguniverse/`.
- No build tooling needed; keep it dependency-free unless a feature genuinely requires it.
