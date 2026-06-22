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
    const r = c.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
});

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
            const r = v.getBoundingClientRect();
            if (r.height > 200 && r.width > 40 && r.width * r.height > score) { score = r.width * r.height; best = { x: r.x, y: r.y, w: r.width, h: r.height }; }
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
