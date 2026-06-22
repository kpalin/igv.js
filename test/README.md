# Tests for the 2D heatmap + dual-IGV viewer

Headless test suite for `../gp5d_1kx_view.html` + `../js/gp5d_1kx_view.js`.

## Run

```bash
cd test
npm install                 # playwright + mocha (first time)
npx playwright install chromium

# the app is served over HTTP (module imports + CORS need a real origin)
python3 -m http.server 8000 --directory ..   # from anywhere, or use the repo root server

npm test            # unit + integration
npm run test:unit   # pure geometry (fast, no browser)
npm run test:e2e    # browser integration
```

## What's covered

- **`unit.test.mjs`** — pure geometry in `../js/gp5d_geom.js`: `parseLocus`
  (including the fractional-coordinate case that caused the "Could not parse IGV
  loci" button bug), the Y-panel rotation maps, and a proof that the pointer
  shim is self-consistent (igv's own `(clientX-rect.left)/rect.width` formula
  recovers the correct genomic fraction after the shim).
- **`integration.test.mjs`** — the real page in headless Chromium:
  - both igv browsers render (into their shadow DOM) with parseable loci,
  - the heatmap is pixel-aligned to the X and Y data viewports (≤2px),
  - the Y panel sits to the left of the heatmap,
  - the rotated Y-panel shim turns a vertical drag into a genomic pan (and a
    horizontal drag does not pan),
  - clicking the heatmap reports a correlation and X/Y positions inside range,
  - the "Push IGV loci → 2D view" button reads loci without error.

## How it stays deterministic

igv.js loads a genome (hgdownload byte-ranges) and tracks (a3s.fi) over the
network, which is slow and flaky headless. `harness.mjs`:

- serves the igv / OpenSeadragon libraries from `vendor/` (jsdelivr intermittently
  stalls the top-level `import igv`, which silently aborts the whole module),
- replays all remote **data** from `session.har` (offline, deterministic),
- fetches the app's own files (`localhost`) live so edits are picked up.

`session.har` is gitignored (21MB) and must be recorded once before running the
integration tests (and re-recorded if the data sources change):

```bash
node record-har.mjs   # loads the page until it renders, writes session.har
```

`vendor/` (the pinned igv / OpenSeadragon libraries) is a checked-in fixture.
