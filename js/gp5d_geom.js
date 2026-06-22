// Pure geometry helpers for the 2D heatmap + dual-IGV viewer.
// No DOM or network access, so these are unit-testable under node (see test/).

// Parse an IGV locus into {chr, start, end}.
// Accepts a string ("chr1:1,000-2,000" or "chr1:1000"), a single-element array
// of such (igv.currentLoci() returns either a string or an array), or "".
// Returns null when it can't be parsed.
export function parseLocus(loci) {
    let s = Array.isArray(loci) ? loci[0] : loci;
    if (s == null) return null;
    s = String(s).trim();
    // Coordinates may be fractional: after a pan/zoom igv reports loci like
    // "chr1:37857571.918-37872572.918". Accept decimals and round to integers.
    const num = '[\\d,]+(?:\\.\\d+)?';
    const m = s.match(new RegExp(`^([A-Za-z0-9._|-]+):(${num})(?:-(${num}))?$`));
    if (!m) return null;
    const start = Math.round(parseFloat(m[2].replace(/,/g, '')));
    const end = m[3] ? Math.round(parseFloat(m[3].replace(/,/g, ''))) : start;
    if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
    return { chr: m[1], start, end };
}

// ---------------------------------------------------------------------------
// Rotation of the vertical (Y-axis) IGV panel.
//
// The panel element has natural (un-rotated) size width=W (its genomic axis runs
// horizontally across W px) and height=H (the stacked-track depth). We rotate it
// 90deg CLOCKWISE about its top-left corner so the genomic axis becomes vertical
// with the LOW coordinate at the TOP -- matching the heatmap, whose image-y
// increases downward. After rotation the element fills a cell of size
// (cellW = H, cellH = W).
//
// CSS: transform-origin: top left; transform: translateX(H) rotate(90deg)
//
//   element-local (ex, ey)  ->  cell-local (cx, cy):   cx = H - ey,  cy = ex
//   cell-local   (cx, cy)   ->  element-local (ex,ey): ex = cy,      ey = H - cx
//
// where ex in [0,W] is the genomic axis (0 = low coordinate) and ey in [0,H] is
// track depth. Cell-local is measured from the panel's (un-transformed) top-left.
// ---------------------------------------------------------------------------

export function rotatedYTransform(W, H) {
    return { transform: `translateX(${H}px) rotate(90deg)`, cellW: H, cellH: W };
}

export function elementToCell(ex, ey, W, H) {
    return { cx: H - ey, cy: ex };
}

export function cellToElement(cx, cy, W, H) {
    return { ex: cy, ey: H - cx };
}

// ---------------------------------------------------------------------------
// Pointer / rect shim for the rotated panel.
//
// igv.js reads pointer coordinates as `(clientX - rect.left)/rect.width` and
// `(clientY - rect.top)/rect.height`, where rect = element.getBoundingClientRect().
// Under a 90deg rotation the genomic axis moves from X to Y, but igv keeps reading
// it from X and dividing by rect.width (now the track-depth size) -- so neither a
// coordinate patch nor a rect patch alone is sufficient; we need BOTH, applied
// together, so that for every element igv measures:
//
//   (patchedClientX - unrotatedRect.left) / unrotatedRect.width  ==  ex_fraction
//
// A 90deg rotation keeps rectangles axis-aligned, so the un-rotated rect is exact.
//
// `panelOrigin` = {x, y} is the panel's un-transformed top-left in page coords
// (i.e. the cell's top-left, since the panel is absolutely positioned there).
// ---------------------------------------------------------------------------

// Convert a child element's rotated bounding box (page coords) back to the rect
// it WOULD have if the panel were not rotated, anchored at panelOrigin.
export function unrotateRect(bbox, panelOrigin, W, H) {
    // bbox corners -> cell-local
    const cx1 = bbox.left - panelOrigin.x, cy1 = bbox.top - panelOrigin.y;
    const cx2 = bbox.right - panelOrigin.x, cy2 = bbox.bottom - panelOrigin.y;
    // -> element-local
    const a = cellToElement(cx1, cy1, W, H);
    const b = cellToElement(cx2, cy2, W, H);
    const exMin = Math.min(a.ex, b.ex), exMax = Math.max(a.ex, b.ex);
    const eyMin = Math.min(a.ey, b.ey), eyMax = Math.max(a.ey, b.ey);
    // -> un-rotated page coords (genomic axis ex back on X)
    const left = panelOrigin.x + exMin;
    const top = panelOrigin.y + eyMin;
    const width = exMax - exMin;
    const height = eyMax - eyMin;
    return { left, top, width, height, right: left + width, bottom: top + height, x: left, y: top };
}

// Convert a true pointer page point over the rotated panel to the page point it
// would occupy if the panel were not rotated (so igv, reading the un-rotated
// rects above, computes the correct fractions).
export function unrotatePoint(pageX, pageY, panelOrigin, W, H) {
    const cx = pageX - panelOrigin.x, cy = pageY - panelOrigin.y;
    const { ex, ey } = cellToElement(cx, cy, W, H);
    return { x: panelOrigin.x + ex, y: panelOrigin.y + ey };
}
