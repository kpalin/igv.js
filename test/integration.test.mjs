// End-to-end tests against the real page rendered in headless Chromium.
// Library JS is vendored and remote data is replayed from session.har, so these
// run offline and deterministically. See harness.mjs.
import assert from 'node:assert/strict';
import { openPage, DATA_RECT_FN } from './harness.mjs';
import { parseLocus } from '../js/gp5d_geom.js';

let browser, page, logs;

before(async function () {
    this.timeout(90000);
    ({ browser, page, logs } = await openPage({ timeout: 75000 }));
});
after(async () => { if (browser) await browser.close(); });

const dataRect = (hostId) => page.evaluate(({ fn, id }) => eval('(' + fn + ')')(id), { fn: DATA_RECT_FN, id: hostId });
const osdRect = () => page.evaluate(() => {
    const c = document.querySelector('#openseadragon1 canvas') || document.getElementById('openseadragon1');
    const r = c.getClientRects()[0];
    return { x: r.x, y: r.y, w: r.width, h: r.height };
});

// --- shared helpers for the interaction tests ---
const num = (s) => parseInt(String(s).replace(/[,\s]/g, ''), 10);
// The #x-region / #y-region readouts reflect the HEATMAP's current genomic ranges.
const readoutRange = async (id) => {
    const t = await page.evaluate((id) => document.getElementById(id).textContent, id);
    const m = t.match(/chr[\w.]+:([\d,]+)-([\d,]+)/);
    return m ? { start: num(m[1]), end: num(m[2]) } : null;
};
const panelLocus = async (w) => parseLocus(await page.evaluate((w) => window[w].currentLoci(), w));
// A tall track viewport (true on-screen rect; vertical=true for the rotated Y panel).
const trackRect = (id, vertical) => page.evaluate(({ id, vertical }) => {
    const sr = document.getElementById(id).shadowRoot;
    let best = null, score = -1;
    for (const v of sr.querySelectorAll('.igv-viewport')) {
        const r = v.getClientRects()[0];
        const ok = r && (vertical ? (r.height > 200 && r.width > 40) : (r.width > 200 && r.height > 40));
        if (ok && r.width * r.height > score) { score = r.width * r.height; best = { x: r.x, y: r.y, w: r.width, h: r.height }; }
    }
    return best;
}, { id, vertical });

const assertAligned = (r, tol = 3) => {
    assert.ok(Math.abs(r.osd.x - r.rx.x) <= tol && Math.abs(r.osd.w - r.rx.w) <= tol,
        `heatmap horizontally aligned to X panel; Δ left=${Math.round(r.osd.x - r.rx.x)} width=${Math.round(r.osd.w - r.rx.w)}`);
    assert.ok(Math.abs(r.osd.y - r.ry.y) <= tol && Math.abs(r.osd.h - r.ry.h) <= tol,
        `heatmap vertically aligned to Y panel; Δ top=${Math.round(r.osd.y - r.ry.y)} height=${Math.round(r.osd.h - r.ry.h)}`);
};
const allRects = async () => ({ osd: await osdRect(), rx: await dataRect('igvDivX'), ry: await dataRect('igvDivY') });

// The panels must match the heatmap's genomic ranges (the #x/#y readouts).
const assertSynced = async (frac = 0.03) => {
    const xr = await readoutRange('x-region'), yr = await readoutRange('y-region');
    const lx = await panelLocus('igvX'), ly = await panelLocus('igvY');
    assert.ok(xr && yr && lx && ly, 'heatmap ranges and panel loci are readable');
    const tol = (sp) => Math.max(20, Math.round(sp * frac));
    assert.ok(Math.abs(lx.start - xr.start) <= tol(xr.end - xr.start) && Math.abs(lx.end - xr.end) <= tol(xr.end - xr.start),
        `X in sync: heatmap ${xr.start}-${xr.end} vs igvX ${lx.start}-${lx.end}`);
    assert.ok(Math.abs(ly.start - yr.start) <= tol(yr.end - yr.start) && Math.abs(ly.end - yr.end) <= tol(yr.end - yr.start),
        `Y in sync: heatmap ${yr.start}-${yr.end} vs igvY ${ly.start}-${ly.end}`);
};
// No oscillation: the loci must not keep changing once an interaction settles.
const assertStable = async () => {
    const a = await panelLocus('igvX'), b = await panelLocus('igvY');
    await page.waitForTimeout(700);
    const a2 = await panelLocus('igvX'), b2 = await panelLocus('igvY');
    assert.ok(Math.abs(a2.start - a.start) < 10 && Math.abs(b2.start - b.start) < 10,
        `system settled (no sync oscillation): X Δ=${a2.start - a.start} Y Δ=${b2.start - b.start}`);
};

describe('rendering & loci', () => {
    it('both browsers expose a parseable single-chromosome locus', async () => {
        const lx = await page.evaluate(() => window.igvX.currentLoci());
        const ly = await page.evaluate(() => window.igvY.currentLoci());
        const x = parseLocus(lx), y = parseLocus(ly);
        assert.ok(x, `X locus parseable: ${JSON.stringify(lx)}`);
        assert.ok(y, `Y locus parseable: ${JSON.stringify(ly)}`);
        assert.equal(x.chr, y.chr);
    });
});

describe('heatmap is pixel-aligned to the IGV data viewports', () => {
    it('horizontal extent matches the X panel (≤2px)', async () => {
        const osd = await osdRect(), rx = await dataRect('igvDivX');
        assert.ok(Math.abs(osd.x - rx.x) <= 2, `left Δ=${osd.x - rx.x}`);
        assert.ok(Math.abs(osd.w - rx.w) <= 2, `width Δ=${osd.w - rx.w}`);
    });
    it('vertical extent matches the Y panel (≤2px)', async () => {
        const osd = await osdRect(), ry = await dataRect('igvDivY');
        assert.ok(Math.abs(osd.y - ry.y) <= 2, `top Δ=${osd.y - ry.y}`);
        assert.ok(Math.abs(osd.h - ry.h) <= 2, `height Δ=${osd.h - ry.h}`);
    });
    it('the Y panel sits to the LEFT of the heatmap', async () => {
        const osd = await osdRect(), ry = await dataRect('igvDivY');
        assert.ok(ry.x + ry.w <= osd.x + 2, `Y right edge ${ry.x + ry.w} should be <= OSD left ${osd.x}`);
    });
});

describe('panels stay close to the heatmap in a wide window', () => {
    let wide;
    before(async function () { this.timeout(90000); wide = await openPage({ timeout: 75000, viewport: { width: 2600, height: 1600 } }); });
    after(async () => { if (wide) await wide.browser.close(); });

    it('does not drift the heatmap far from the Y panel', async () => {
        const m = await wide.page.evaluate(() => {
            const osd = (document.querySelector('#openseadragon1 canvas') || document.getElementById('openseadragon1')).getBoundingClientRect();
            const yCell = document.getElementById('igvY-cell').getBoundingClientRect();
            return { gap: osd.left - yCell.right, gridW: document.querySelector('.viewer-grid').getBoundingClientRect().width, vw: window.innerWidth };
        });
        // The visible gap between the Y panel and the heatmap is just the X panel's
        // left gutter + grid gap, and must NOT grow with the (2600px) window.
        assert.ok(m.gap < 80, `gap between Y panel and heatmap should stay small; got ${Math.round(m.gap)}px`);
        // The grid is content-sized, far narrower than the wide window.
        assert.ok(m.gridW < m.vw - 400, `grid should not stretch to the window; gridW=${Math.round(m.gridW)} vw=${m.vw}`);
    });
});

describe('rotated Y-panel pointer shim', () => {
    // A tall track viewport (NOT the thin ruler): for the rotated Y panel the
    // genomic axis is the HEIGHT, so we want height > 200.
    const yTrackRect = () => page.evaluate(() => {
        const sr = document.getElementById('igvDivY').shadowRoot;
        let best = null, score = -1;
        for (const v of sr.querySelectorAll('.igv-viewport')) {
            const r = v.getClientRects()[0];   // true on-screen (rotated) rect
            if (r && r.height > 200 && r.width > 40 && r.width * r.height > score) { score = r.width * r.height; best = { x: r.x, y: r.y, w: r.width, h: r.height }; }
        }
        return best;
    });
    const startOf = async () => parseLocus(await page.evaluate(() => window.igvY.currentLoci())).start;
    const settle = async () => { await page.waitForTimeout(700); };

    it('routes a VERTICAL drag to a genomic pan', async () => {
        const t = await yTrackRect();
        assert.ok(t, 'found a tall Y track viewport');
        const v0 = await startOf();
        assert.ok(Number.isFinite(v0), 'Y locus readable before drag');
        await page.mouse.move(t.x + t.w / 2, t.y + t.h * 0.35);
        await page.mouse.down();
        await page.mouse.move(t.x + t.w / 2, t.y + t.h * 0.65, { steps: 12 });
        await page.mouse.up();
        await settle();
        const v1 = await startOf();
        assert.ok(Math.abs(v1 - v0) > 1000, `vertical drag should pan genomically; Δstart=${Math.abs(v1 - v0)}`);
    });

    it('does NOT pan on a horizontal drag (that axis is track-depth)', async () => {
        const t = await yTrackRect();
        const h0 = await startOf();
        await page.mouse.move(t.x + t.w * 0.2, t.y + t.h / 2);
        await page.mouse.down();
        await page.mouse.move(t.x + t.w * 0.8, t.y + t.h / 2, { steps: 12 });
        await page.mouse.up();
        await settle();
        const h1 = await startOf();
        assert.ok(Math.abs(h1 - h0) < 800, `horizontal drag should barely pan; Δstart=${Math.abs(h1 - h0)}`);
    });
});

describe('clicking the heatmap', () => {
    it('reports a correlation and X/Y positions inside the current ranges', async () => {
        const osd = await osdRect();
        const xr = parseLocus(await page.evaluate(() => window.igvX.currentLoci()));
        const yr = parseLocus(await page.evaluate(() => window.igvY.currentLoci()));
        await page.mouse.click(osd.x + osd.w / 2, osd.y + osd.h / 2);
        await page.waitForTimeout(300);
        const txt = await page.evaluate(() => document.getElementById('click-position').textContent);
        assert.match(txt, /ρ|rho|≈/i, `readout should show a correlation: "${txt}"`);
        const nums = [...txt.matchAll(/chr[\w.]+:([\d,]+)/g)].map(m => parseInt(m[1].replace(/,/g, ''), 10));
        assert.equal(nums.length, 2, `readout should show X and Y positions: "${txt}"`);
        const [xp, yp] = nums;
        assert.ok(xp >= xr.start - 1 && xp <= xr.end + 1, `X ${xp} within ${xr.start}-${xr.end}`);
        assert.ok(yp >= yr.start - 1 && yp <= yr.end + 1, `Y ${yp} within ${yr.start}-${yr.end}`);
    });
});

// Runs last: pushing to the 2D view re-fits the OSD, which re-syncs both panels,
// so keep it after the tests that depend on a stable panel locus.
describe('"Push IGV loci → 2D view" button', () => {
    it('reads both loci without a parse error and reframes the heatmap', async () => {
        await page.evaluate(() => window.igvX.search('chr1:37,860,000-37,865,000'));
        await page.waitForTimeout(500);
        const before = logs.length;
        await page.click('#setPairButton');
        await page.waitForTimeout(800);
        const warned = logs.slice(before).some(l => /could not read IGV loci/i.test(l));
        assert.equal(warned, false, 'button should not warn about unparseable loci');
    });
});

describe('"Copy X locus → Y" button', () => {
    it('copies the X panel locus onto Y', async () => {
        // Put Y at a different position than X (same span, shifted), then copy.
        const lx0 = await panelLocus('igvX');
        const span = lx0.end - lx0.start;
        await page.evaluate((s) => window.igvY.search(s),
            `${lx0.chr}:${lx0.start + span}-${lx0.end + span}`);
        await page.waitForTimeout(1200);
        const yBefore = await panelLocus('igvY');
        assert.ok(Math.abs(yBefore.start - lx0.start) > span / 2, 'Y differs from X before the copy');

        await page.click('#copyXtoYButton');
        await page.waitForTimeout(1500);
        const lx = await panelLocus('igvX'), ly = await panelLocus('igvY');
        const tol = Math.max(30, Math.round(span * 0.05));
        assert.equal(ly.chr, lx.chr);
        assert.ok(Math.abs(ly.start - lx.start) <= tol && Math.abs(ly.end - lx.end) <= tol,
            `Y should match X after copy: X ${lx.start}-${lx.end} vs Y ${ly.start}-${ly.end}`);
        await assertSynced();
        assertAligned(await allRects());
    });
});

// The heatmap and the two panels must stay both pixel-aligned AND genomically
// synchronized through every kind of UI interaction.
describe('alignment & sync survive UI interactions', () => {
    it('window resize', async () => {
        await page.setViewportSize({ width: 1500, height: 1650 });
        await page.waitForTimeout(1300);
        assertAligned(await allRects());
        await assertSynced();
        await page.setViewportSize({ width: 1700, height: 2000 });   // restore
        await page.waitForTimeout(1300);
        assertAligned(await allRects());
        await assertSynced();
    });

    it('scroll-zoom on the heatmap (OSD) pans/zooms both panels', async () => {
        const r = await allRects();
        const before = await panelLocus('igvX');
        await page.mouse.move(r.osd.x + r.osd.w / 2, r.osd.y + r.osd.h / 2);
        await page.mouse.wheel(0, -450);
        await page.waitForTimeout(1500);
        const after = await panelLocus('igvX');
        assert.ok((after.end - after.start) < (before.end - before.start) - 200,
            `heatmap zoom should narrow the panel range; before=${before.end - before.start} after=${after.end - after.start}`);
        await assertSynced();
        assertAligned(await allRects());
        await assertStable();
    });

    it('scrolling/panning the X panel drives the heatmap x-axis', async () => {
        const t = await trackRect('igvDivX', false);
        const before = await panelLocus('igvX');
        await page.mouse.move(t.x + t.w * 0.6, t.y + t.h / 2);
        await page.mouse.down();
        await page.mouse.move(t.x + t.w * 0.4, t.y + t.h / 2, { steps: 12 });
        await page.mouse.up();
        await page.waitForTimeout(1500);
        const after = await panelLocus('igvX');
        assert.ok(Math.abs(after.start - before.start) > 200, `X panel should pan; Δstart=${after.start - before.start}`);
        await assertSynced();
        assertAligned(await allRects());
        await assertStable();
    });

    // Driving the Y AXIS programmatically (a "scroll" of the Y panel's locus):
    // the heatmap must follow and stay pixel-aligned and stable.
    it('changing the Y panel locus drives the heatmap y-axis', async () => {
        const x = await panelLocus('igvX');
        const span = x.end - x.start;
        const shift = Math.round(span * 0.6);
        await page.evaluate(({ chr, s, e }) => window.igvY.search(`${chr}:${s}-${e}`),
            { chr: x.chr, s: x.start + shift, e: x.end + shift });   // same span, shifted: no square-snap
        await page.waitForTimeout(1500);
        const yr = await readoutRange('y-region');           // heatmap's y-range
        const ly = await panelLocus('igvY');
        assert.ok(Math.abs(yr.start - ly.start) <= Math.max(20, span * 0.04),
            `heatmap y-axis followed the Y panel: heatmap ${yr.start} vs igvY ${ly.start}`);
        await assertSynced();
        assertAligned(await allRects());
        await assertStable();
    });
});

// The Y panel is CSS-rotated; a vertical drag pans it via the pointer shim.
// (igv stops recognizing drags on a rotated panel after it re-renders, so this
// is verified on a fresh page where the drag is the first interaction; once
// rendered, the panel is driven by the heatmap / X panel / buttons.)
describe('dragging the Y panel pans the heatmap (fresh page)', () => {
    let ctx;
    before(async function () { this.timeout(90000); ctx = await openPage({ timeout: 75000 }); });
    after(async () => { if (ctx) await ctx.browser.close(); });

    it('a vertical drag pans igvY and the heatmap follows', async () => {
        const pg = ctx.page;
        const pl = async (w) => parseLocus(await pg.evaluate((w) => window[w].currentLoci(), w));
        const yTrack = () => pg.evaluate(() => {
            const sr = document.getElementById('igvDivY').shadowRoot;
            let b = null, s = -1;
            for (const v of sr.querySelectorAll('.igv-viewport')) {
                const r = v.getClientRects()[0];
                if (r && r.height > 200 && r.width > 40 && r.width * r.height > s) { s = r.width * r.height; b = { x: r.x, y: r.y, w: r.width, h: r.height }; }
            }
            return b;
        });
        const before = await pl('igvY');
        const t = await yTrack();
        await pg.mouse.move(t.x + t.w / 2, t.y + t.h * 0.6);
        await pg.mouse.down();
        await pg.mouse.move(t.x + t.w / 2, t.y + t.h * 0.4, { steps: 12 });
        await pg.mouse.up();
        await pg.waitForTimeout(1500);
        const after = await pl('igvY');
        assert.ok(Math.abs(after.start - before.start) > 200, `Y drag should pan igvY; Δstart=${after.start - before.start}`);
        const yReadout = await pg.evaluate(() => document.getElementById('y-region').textContent);
        const m = yReadout.match(/chr[\w.]+:([\d,]+)-/);
        const heatmapYStart = parseInt(m[1].replace(/,/g, ''), 10);
        assert.ok(Math.abs(heatmapYStart - after.start) <= Math.max(40, (after.end - after.start) * 0.05),
            `heatmap y-axis followed the drag: heatmap ${heatmapYStart} vs igvY ${after.start}`);
    });
});
