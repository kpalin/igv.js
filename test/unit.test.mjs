import assert from 'node:assert/strict';
import {
    parseLocus, rotatedYTransform, elementToCell, cellToElement,
    unrotateRect, unrotatePoint,
} from '../js/gp5d_geom.js';

// Forward transform element-local -> rotated page point, matching the CSS
// transform `translateX(H) rotate(90deg)` with origin = panelOrigin.
function elementToPage(ex, ey, origin, W, H) {
    const { cx, cy } = elementToCell(ex, ey, W, H);
    return { x: origin.x + cx, y: origin.y + cy };
}

describe('parseLocus', () => {
    it('parses a plain string locus', () => {
        assert.deepEqual(parseLocus('chr1:37855330-37870331'),
            { chr: 'chr1', start: 37855330, end: 37870331 });
    });
    it('parses comma-grouped numbers', () => {
        assert.deepEqual(parseLocus('chr1:37,855,330-37,870,331'),
            { chr: 'chr1', start: 37855330, end: 37870331 });
    });
    it('parses a single-element array (igv currentLoci form)', () => {
        assert.deepEqual(parseLocus(['chrX:1000-2000']),
            { chr: 'chrX', start: 1000, end: 2000 });
    });
    it('parses a single-position locus (no end)', () => {
        assert.deepEqual(parseLocus('chr2:500'), { chr: 'chr2', start: 500, end: 500 });
    });
    it('parses fractional coordinates (igv reports these after a pan/zoom)', () => {
        assert.deepEqual(parseLocus('chr1:37857571.918-37872572.918'),
            { chr: 'chr1', start: 37857572, end: 37872573 });
    });
    it('returns null for empty / unparsable input', () => {
        assert.equal(parseLocus(''), null);
        assert.equal(parseLocus([]), null);
        assert.equal(parseLocus(null), null);
        assert.equal(parseLocus('not a locus'), null);
        assert.equal(parseLocus('chr1'), null);
    });
});

describe('rotation maps', () => {
    const W = 656, H = 840;
    it('builds the expected CSS transform and cell size', () => {
        const t = rotatedYTransform(W, H);
        assert.equal(t.transform, `translateX(${H}px) rotate(90deg)`);
        assert.equal(t.cellW, H);
        assert.equal(t.cellH, W);
    });
    it('puts genomic-low (ex=0) at the TOP of the cell (cy=0)', () => {
        assert.equal(elementToCell(0, 0, W, H).cy, 0);          // low coord -> top
        assert.equal(elementToCell(W, 0, W, H).cy, W);          // high coord -> bottom
    });
    it('round-trips element<->cell', () => {
        for (const [ex, ey] of [[0, 0], [W, 0], [0, H], [W, H], [123, 456]]) {
            const c = elementToCell(ex, ey, W, H);
            const e = cellToElement(c.cx, c.cy, W, H);
            assert.ok(Math.abs(e.ex - ex) < 1e-9 && Math.abs(e.ey - ey) < 1e-9);
        }
    });
});

describe('rotation shim self-consistency', () => {
    const W = 656, H = 840;
    const origin = { x: 200, y: 300 };

    it('unrotateRect recovers a child element rect', () => {
        // A child element occupying element-local [exMin,exMax] x [eyMin,eyMax].
        const exMin = 50, exMax = 600, eyMin = 30, eyMax = 120;
        // Its on-screen (rotated) bounding box:
        const p1 = elementToPage(exMin, eyMin, origin, W, H);
        const p2 = elementToPage(exMax, eyMax, origin, W, H);
        const bbox = {
            left: Math.min(p1.x, p2.x), right: Math.max(p1.x, p2.x),
            top: Math.min(p1.y, p2.y), bottom: Math.max(p1.y, p2.y),
        };
        const r = unrotateRect(bbox, origin, W, H);
        assert.ok(Math.abs(r.left - (origin.x + exMin)) < 1e-6);
        assert.ok(Math.abs(r.width - (exMax - exMin)) < 1e-6);
        assert.ok(Math.abs(r.top - (origin.y + eyMin)) < 1e-6);
        assert.ok(Math.abs(r.height - (eyMax - eyMin)) < 1e-6);
    });

    it("igv's fraction formula recovers the genomic position after shim", () => {
        // Child element (a track viewport) in element-local coords.
        const exMin = 0, exMax = W, eyMin = 200, eyMax = 260;
        const p1 = elementToPage(exMin, eyMin, origin, W, H);
        const p2 = elementToPage(exMax, eyMax, origin, W, H);
        const bbox = {
            left: Math.min(p1.x, p2.x), right: Math.max(p1.x, p2.x),
            top: Math.min(p1.y, p2.y), bottom: Math.max(p1.y, p2.y),
        };
        const rect = unrotateRect(bbox, origin, W, H);

        // For several genomic fractions, place the true pointer at that spot on
        // the rotated panel, run the shim, and check igv's formula recovers it.
        for (const frac of [0, 0.25, 0.5, 0.75, 1]) {
            const ex = exMin + frac * (exMax - exMin);
            const ey = (eyMin + eyMax) / 2;
            const truePage = elementToPage(ex, ey, origin, W, H);     // where the user clicks
            const shimmed = unrotatePoint(truePage.x, truePage.y, origin, W, H);
            const igvFraction = (shimmed.x - rect.left) / rect.width;  // what igv computes
            assert.ok(Math.abs(igvFraction - frac) < 1e-6,
                `frac ${frac} -> igv saw ${igvFraction}`);
        }
    });
});
