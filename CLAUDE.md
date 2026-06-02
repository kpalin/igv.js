# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Standalone web visualization that renders **2D correlation heatmaps** (from fibercorr output) alongside **IGV.js genome tracks**. The heatmap tiles come from `.szi` files served remotely; IGV tracks come from BigWig/CRAM/VCF/BED files.

## Commands

```bash
npm run build        # Full build: Sass → embedCss.js → Rollup (ESM + UMD) → copy artifacts
npm run build_iife   # Same but IIFE output format
npm run updateCSS    # Recompile Sass only (fast iteration on styles)
npm run test         # Run mocha tests
```

Build outputs: `dist/igv.js` (UMD), `dist/igv.esm.js` (ESM), minified variants alongside.

## Architecture

The app lives in two files:

- **`gp5d_1kx_view.html`** — page layout: colorbar, OpenSeadragon div, IGV browser div, control buttons
- **`js/gp5d_1kx_view.js`** — all application logic: tile loading, event handling, coordinate conversion, IGV config

Two custom plugins extend OpenSeadragon:

- **`js/szi-tile-source-v0.6.1.js`** — teaches OSD to load tiles from `.szi` files (see SZI format below). Entry point: `enableSziTileSource(OpenSeadragon)`.
- **`js/openseadragon-filtering.js`** — adds `viewer.setFilterOptions()` for per-pixel colormap transforms. Used to apply the seismic colormap.

### Coordinate systems

Three coordinate systems must be kept in sync:

1. **Viewport** — OSD internal floating-point units (origin = top-left of image world)
2. **Genomic** — `chr:bp` positions
3. **Tile pixel** — pixel within a DZI tile level

`gp5d_1kx_view.js` maps between these via `viewportToGenomicCoordinates()`. Each `TiledImage` is positioned at `x = fig_start_bp, y = fig_start_bp` in viewport space, so viewport ↔ genomic is a simple linear offset + scale using `src.fig_start_bp` and `src.dimensions.x`.

### Interaction loop

```
OSD animation-finish (zoom/pan)
  → viewportToGenomicCoordinates(viewport bounds)
  → browser.search(locus) + loadROI()
  → IGV updates to show matching region

OSD canvas-click
  → get pixel color at click
  → nearestColorIndex(seismicColormap)
  → rho = (index/255)*2 - 1
  → display genomic coords + correlation value
```

### SZI format

`.szi` = uncompressed ZIP containing a standard DZI descriptor + PNG tile pyramid.

```
file.szi (ZIP)
├── image.dzi           ← DZI XML: Width, Height, TileSize, Overlap, Format
└── image_files/
    ├── {level}/0_0.png
    └── ...
```

`SziTileSource` in `szi-tile-source-v0.6.1.js`:
1. Fetches file size via HTTP HEAD
2. Reads End-of-Central-Directory record (Zip64-aware) via byte-range request
3. Parses Central Directory to build filename→offset map
4. On each tile request, fetches the exact byte range for that PNG and returns it as a Blob URL

This avoids downloading the entire SZI upfront. Tiles are fetched on demand.

### Seismic colormap

256-entry RGB table, blue (index 0) → white (127) → red (255), stored inline in `gp5d_1kx_view.js`. Applied at render time via the filtering plugin. Correlation coefficient from color: `rho = (colorIndex / 255) * 2 - 1`.

Haplotype layout within each square image:
- **Upper-right triangle** (`bp_x < bp_y`): H1 — colored red `rgb(255, 41, 135)`
- **Lower-left triangle** (`bp_x > bp_y`): H2 — colored blue `rgb(40, 118, 255)`
- **Diagonal**: per-site modification frequency

### Data sources

All remote data is hosted at `https://a3s.fi/`.  IGV tracks (BigWig methylation, CRAM alignments, VCF SNVs, BED annotations) are also loaded from that host.

Reference genome: **hs1 (T2T-CHM13v2.0)**.
