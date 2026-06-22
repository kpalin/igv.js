// Shared Playwright harness.
//
// Libraries (igv, OpenSeadragon) are served from local vendored copies so tests
// don't depend on jsdelivr (which intermittently stalls the top-level
// `import igv` and makes the whole module fail to execute).
//
// Remote DATA (genome byte-ranges from hgdownload, tracks from a3s.fi, DZI tiles
// from the fibercorr host) is replayed from a recorded HAR so the heavy, flaky
// network is deterministic and offline. Re-record with `node record-har.mjs`.
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IGV = readFileSync(join(__dirname, 'vendor/igv.esm.min.js'));
const OSD = readFileSync(join(__dirname, 'vendor/openseadragon.min.js'));
const G3 = readFileSync(join(__dirname, 'vendor/genomes3.json'));
const HAR = join(__dirname, 'session.har');

export const BASE = process.env.URL || 'http://localhost:8000/gp5d_1kx_view.html';

export async function openPage({ timeout = 60000, useHar = existsSync(HAR) } = {}) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1700, height: 2000 } });
    const page = await ctx.newPage();

    // Replay recorded data responses (registered first => lowest precedence).
    if (useHar) {
        await page.routeFromHAR(HAR, { notFound: 'fallback', update: false });
        // The app's OWN files (served live from localhost) must NOT come from the
        // HAR, or edits to the page/JS won't be picked up. Fetch them live.
        await page.route('**://localhost:**/**', r => r.continue());
    }

    // Vendored libraries (registered last => win over the HAR catch-all).
    const cors = { 'access-control-allow-origin': '*' };
    await page.route('**/igv@3.8.1/dist/igv.esm.min.js', r =>
        r.fulfill({ contentType: 'application/javascript', headers: cors, body: IGV }));
    await page.route('**/openseadragon@5.0/build/openseadragon/openseadragon.min.js', r =>
        r.fulfill({ contentType: 'application/javascript', headers: cors, body: OSD }));
    await page.route('**/genomes/genomes3.json', r =>
        r.fulfill({ contentType: 'application/json', headers: cors, body: G3 }));

    const logs = [];
    page.on('console', m => logs.push(m.text()));
    page.on('pageerror', e => logs.push('PAGEERROR: ' + e.message));

    await page.goto(BASE, { waitUntil: 'load' });
    // igv.js v3.8.1 renders into a Shadow DOM attached to the container div, so
    // its nodes are NOT visible to document.querySelectorAll — query the host's
    // shadowRoot instead.
    await page.waitForFunction(() => {
        const x = document.getElementById('igvDivX');
        const y = document.getElementById('igvDivY');
        return window.igvX && window.igvY &&
            x && x.shadowRoot && x.shadowRoot.querySelectorAll('.igv-viewport').length > 3 &&
            y && y.shadowRoot && y.shadowRoot.querySelectorAll('.igv-viewport').length > 3;
    }, { timeout });
    // Let OSD finish its first DZI fit + IGV finish laying out tracks + alignment.
    await page.waitForTimeout(2500);

    return { browser, page, logs };
}

// Evaluated in-page: the data-viewport ("genomic area") rect for an igv browser,
// reaching into its shadow DOM. Returns the widest track viewport, whose width
// is the span the genomic axis maps onto (i.e. excludes the left axis gutter).
export const DATA_RECT_FN = `(hostId) => {
    const host = document.getElementById(hostId);
    const sr = host.shadowRoot;
    const vps = [...sr.querySelectorAll('.igv-viewport')];
    if (!vps.length) return null;
    let best = null, bestW = -1;
    for (const v of vps) { const r = v.getBoundingClientRect(); if (r.width > bestW) { bestW = r.width; best = r; } }
    return { x: best.x, y: best.y, w: best.width, h: best.height };
}`;
