import { parseLocus, rotatedYTransform, unrotateRect, unrotatePoint } from "./gp5d_geom.js";
import {
    CMAP_CENTER0, CMAP_HALF0, cmapIndexForValue, rhoFromCmapIndex, computeCmapParams,
} from "./gp5d_colormap.js";

const h1red = "rgb(255, 41, 135)";
const h2blue = "rgb(40, 118, 255)";

const seismic_cmap = [[0, 0, 76], [0, 0, 79], [0, 0, 82], [0, 0, 85], [0, 0, 88], [0, 0, 90], [0, 0, 93], [0, 0, 96], [0, 0, 99], [0, 0, 102], [0, 0, 104], [0, 0, 107], [0, 0, 110], [0, 0, 113], [0, 0, 116], [0, 0, 118], [0, 0, 121], [0, 0, 124], [0, 0, 127], [0, 0, 130], [0, 0, 132], [0, 0, 135], [0, 0, 138], [0, 0, 141], [0, 0, 144], [0, 0, 146], [0, 0, 149], [0, 0, 152], [0, 0, 155], [0, 0, 158], [0, 0, 160], [0, 0, 163], [0, 0, 166], [0, 0, 169], [0, 0, 172], [0, 0, 174], [0, 0, 177], [0, 0, 180], [0, 0, 183], [0, 0, 186], [0, 0, 188], [0, 0, 191], [0, 0, 194], [0, 0, 197], [0, 0, 200], [0, 0, 202], [0, 0, 205], [0, 0, 208], [0, 0, 211], [0, 0, 214], [0, 0, 216], [0, 0, 219], [0, 0, 222], [0, 0, 225], [0, 0, 228], [0, 0, 230], [0, 0, 233], [0, 0, 236], [0, 0, 239], [0, 0, 242], [0, 0, 244], [0, 0, 247], [0, 0, 250], [0, 0, 253], [1, 1, 255], [5, 5, 255], [9, 9, 255], [13, 13, 255], [17, 17, 255], [21, 21, 255], [25, 25, 255], [29, 29, 255], [33, 33, 255], [37, 37, 255], [41, 41, 255], [45, 45, 255], [49, 49, 255], [53, 53, 255], [57, 57, 255], [61, 61, 255], [65, 65, 255], [69, 69, 255], [73, 73, 255], [77, 77, 255], [81, 81, 255], [85, 85, 255], [89, 89, 255], [93, 93, 255], [97, 97, 255], [101, 101, 255], [105, 105, 255], [109, 109, 255], [113, 113, 255], [117, 117, 255], [121, 121, 255], [125, 125, 255], [129, 129, 255], [133, 133, 255], [137, 137, 255], [141, 141, 255], [145, 145, 255], [149, 149, 255], [153, 153, 255], [157, 157, 255], [161, 161, 255], [165, 165, 255], [169, 169, 255], [173, 173, 255], [177, 177, 255], [181, 181, 255], [185, 185, 255], [189, 189, 255], [193, 193, 255], [197, 197, 255], [201, 201, 255], [205, 205, 255], [209, 209, 255], [213, 213, 255], [217, 217, 255], [221, 221, 255], [225, 225, 255], [229, 229, 255], [233, 233, 255], [237, 237, 255], [241, 241, 255], [245, 245, 255], [249, 249, 255], [253, 253, 255], [255, 253, 253], [255, 249, 249], [255, 245, 245], [255, 241, 241], [255, 237, 237], [255, 233, 233], [255, 229, 229], [255, 225, 225], [255, 221, 221], [255, 217, 217], [255, 213, 213], [255, 209, 209], [255, 205, 205], [255, 201, 201], [255, 197, 197], [255, 193, 193], [255, 189, 189], [255, 185, 185], [255, 181, 181], [255, 177, 177], [255, 173, 173], [255, 169, 169], [255, 165, 165], [255, 161, 161], [255, 157, 157], [255, 153, 153], [255, 149, 149], [255, 145, 145], [255, 141, 141], [255, 137, 137], [255, 133, 133], [255, 129, 129], [255, 125, 125], [255, 121, 121], [255, 117, 117], [255, 113, 113], [255, 109, 109], [255, 105, 105], [255, 101, 101], [255, 97, 97], [255, 93, 93], [255, 89, 89], [255, 85, 85], [255, 81, 81], [255, 77, 77], [255, 73, 73], [255, 69, 69], [255, 65, 65], [255, 61, 61], [255, 57, 57], [255, 53, 53], [255, 49, 49], [255, 45, 45], [255, 41, 41], [255, 37, 37], [255, 33, 33], [255, 29, 29], [255, 25, 25], [255, 21, 21], [255, 17, 17], [255, 13, 13], [255, 9, 9], [255, 5, 5], [255, 1, 1], [254, 0, 0], [252, 0, 0], [250, 0, 0], [248, 0, 0], [246, 0, 0], [244, 0, 0], [242, 0, 0], [240, 0, 0], [238, 0, 0], [236, 0, 0], [234, 0, 0], [232, 0, 0], [230, 0, 0], [227, 0, 0], [226, 0, 0], [224, 0, 0], [222, 0, 0], [220, 0, 0], [218, 0, 0], [216, 0, 0], [214, 0, 0], [211, 0, 0], [210, 0, 0], [208, 0, 0], [206, 0, 0], [204, 0, 0], [202, 0, 0], [200, 0, 0], [198, 0, 0], [195, 0, 0], [194, 0, 0], [192, 0, 0], [190, 0, 0], [188, 0, 0], [186, 0, 0], [184, 0, 0], [182, 0, 0], [179, 0, 0], [178, 0, 0], [176, 0, 0], [174, 0, 0], [172, 0, 0], [170, 0, 0], [168, 0, 0], [166, 0, 0], [163, 0, 0], [162, 0, 0], [160, 0, 0], [158, 0, 0], [156, 0, 0], [154, 0, 0], [152, 0, 0], [150, 0, 0], [147, 0, 0], [146, 0, 0], [144, 0, 0], [142, 0, 0], [140, 0, 0], [138, 0, 0], [136, 0, 0], [134, 0, 0], [132, 0, 0], [130, 0, 0], [128, 0, 0]]
const cmap = seismic_cmap;

const FIBERCORR_BASE = "https://fip-195-148-21-160.kaj.poutavm.fi/fibercorr";
let pending_fit_rect = null;


const dziViewer = new OpenSeadragon.Viewer({
    id: "openseadragon1",
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    maxZoomPixelRatio: 1000.,
    minZoomImageRatio: 1.,
    imageSmoothingEnabled: false,
    showNavigator: false,
    drawer: 'canvas',
    crossOriginPolicy: "Anonymous",
    gestureSettingsMouse: {
        clickToZoom: false
    },
    //tileSources: [tileSource],
});


function maybeLoadImagesForChrom(chrom) {
    if (dziViewer._cur_chrom == chrom) return;
    dziViewer._cur_chrom = chrom;
    dziViewer.world.removeAll();
    dziViewer.addTiledImage({
        tileSource: `${FIBERCORR_BASE}/${chrom}.dzi`,
        success: function(event) {
            const item = event.item;
            const src = item.source;
            const chrLen = src.width;
            src.fig_chr = chrom;
            src.fig_start_bp = 0;
            item.setWidth(chrLen);
            item.setPosition(new OpenSeadragon.Point(0, 0));
            console.log("Added DZI for", chrom, "chrLen:", chrLen);
            if (pending_fit_rect) {
                dziViewer.viewport.fitBounds(pending_fit_rect, true);
                pending_fit_rect = null;
            }
        }
    });
}
const xRegionEl = document.getElementById('x-region');
const yRegionEl = document.getElementById('y-region');
const clickEl = document.getElementById('click-position');



function nearestColorIndex(color) {
    let min_i = cmap.length;
    let min_d = Infinity;
    for (let i = 0; i < cmap.length; i++) {
        let c = cmap[i];
        let d = (color[0] - c[0]) ** 2 + (color[1] - c[1]) ** 2 + (color[2] - c[2]) ** 2;
        if (d < min_d) {
            min_d = d;
            min_i = i;
        }
    }
    return min_i;
}
// ---- Adjustable color mapping --------------------------------------------
// The colormap filter turns each grayscale source pixel value v into a color.
// Two tick options (see js/gp5d_colormap.js for the maths) let the user recenter
// white on the data median and/or rescale the color range to the visible
// |max|. We keep a running histogram of the raw values seen while filtering,
// snapshot it once a render settles, and recompute center/half from it.
const colorOpts = { whiteAtMedian: false, scaleToAbsMax: false };
let cmapParams = { center: CMAP_CENTER0, half: CMAP_HALF0 };
let displayLut = cmap.slice();                 // raw value (0-255) -> [r,g,b]
const cmapHist = new Float64Array(256);        // accumulates the current render
const cmapHistLast = new Float64Array(256);    // last settled render (for stats)
let cmapFinalizeTimer = null;

function rebuildDisplayLut() {
    const identity = cmapParams.center === CMAP_CENTER0 && cmapParams.half === CMAP_HALF0;
    for (let v = 0; v < 256; v++) {
        displayLut[v] = identity ? cmap[v]
            : cmap[cmapIndexForValue(v, cmapParams.center, cmapParams.half)];
    }
}

function updateColorbarLabels() {
    const set = (id, idx) => {
        const el = document.getElementById(id);
        if (el) el.textContent = rhoFromCmapIndex(idx, cmapParams.center, cmapParams.half).toFixed(2);
    };
    set('cbar-min', 0);
    set('cbar-mid', 128);
    set('cbar-max', 255);
}

// Draw the distribution of the visible region's correlation values. The raw
// values are re-binned into colorbar/display-index space so the bars line up
// with the colorbar and its rho labels, and each bar is tinted with the color
// shown at that column. A log scale keeps the dominant near-zero bins from
// flattening the rest.
function drawHistogram() {
    const canvas = document.getElementById('histogram');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const disp = new Float64Array(256);
    let total = 0;
    for (let v = 0; v < 256; v++) {
        const n = cmapHistLast[v];
        if (!n) continue;
        total += n;
        disp[cmapIndexForValue(v, cmapParams.center, cmapParams.half)] += n;
    }
    if (total === 0) return;

    let maxN = 0;
    for (let i = 0; i < 256; i++) if (disp[i] > maxN) maxN = disp[i];
    const denom = Math.log1p(maxN);

    for (let i = 0; i < 256; i++) {
        if (!disp[i]) continue;
        const h = denom > 0 ? Math.round(Math.log1p(disp[i]) / denom * (H - 1)) : 0;
        const c = cmap[i];
        ctx.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
        ctx.fillRect(i, H - h, 1, h);
    }
}

// Re-run the filter with the current displayLut. setFilterOptions bumps the
// plugin's filterIncrement, which is what makes it re-filter the cached tiles;
// a plain forceRedraw would keep the previously filtered pixels.
const cmapProcessor = function (context, callback) {
    const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const pxl = imgData.data;
    const lut = displayLut;
    for (let i = 0; i < pxl.length; i += 4) {
        const v = (pxl[i] + pxl[i + 1] + pxl[i + 2]) / 3 | 0;
        cmapHist[v]++;
        const c = lut[v];
        pxl[i] = c[0];
        pxl[i + 1] = c[1];
        pxl[i + 2] = c[2];
    }
    context.putImageData(imgData, 0, 0);
    scheduleCmapFinalize();
    callback();
};
const cmapFilterOptions = { loadMode: 'sync', filters: { processors: cmapProcessor } };
function reapplyColorMap() { dziViewer.setFilterOptions(cmapFilterOptions); }

// Recompute center/half from the last settled histogram; re-filter if the
// params changed (or a tick toggle forces it).
function applyColorOptions(force) {
    const next = computeCmapParams(cmapHistLast, colorOpts);
    const changed = next.center !== cmapParams.center || next.half !== cmapParams.half;
    cmapParams = next;
    if (changed || force) {
        rebuildDisplayLut();
        updateColorbarLabels();
        drawHistogram();
        reapplyColorMap();
    }
}

// Called (debounced) when a render's filtering settles: snapshot the histogram
// and, if an autoscaling option is on, recompute the mapping for this view.
function finalizeCmapPass() {
    cmapFinalizeTimer = null;
    let any = false;
    for (let v = 0; v < 256; v++) if (cmapHist[v]) { any = true; break; }
    if (any) { cmapHistLast.set(cmapHist); cmapHist.fill(0); }
    drawHistogram();
    if (colorOpts.whiteAtMedian || colorOpts.scaleToAbsMax) applyColorOptions(false);
}

function scheduleCmapFinalize() {
    if (cmapFinalizeTimer) clearTimeout(cmapFinalizeTimer);
    cmapFinalizeTimer = setTimeout(finalizeCmapPass, 120);
}

rebuildDisplayLut();
reapplyColorMap();
updateColorbarLabels();
drawHistogram();


function fitRegion(xstart, xend, ystart, yend) {
    // Define a rectangle in image coordinates (x, y, width, height in pixels)

    const w = xend - xstart + 1;
    const h = yend - ystart + 1;
    const imageRect = new OpenSeadragon.Rect(xstart, xstart, w, h);
    console.log("imageRect: ", imageRect);

    // Convert to viewport coordinates
    var viewportRect = dziViewer.viewport.imageToViewportRectangle(imageRect);
    console.log("viewportRect: ", viewportRect);
    // Fit that region into the viewport
    dziViewer.viewport.fitBounds(viewportRect, true); // true = immediate, false = animated
}

function viewportToGenomicCoordinates(viewportPoint) {

    // Find which image was clicked
    const count = dziViewer.world.getItemCount();
    console.log(`Count is ${count} viewportToGenomicCoordinates`);
    var x_pos_bp = -1;
    var y_pos_bp = -1;
    var genomic_chr = "";
    for (let i = 0; i < count; i++) {
        const tiledImage = dziViewer.world.getItemAt(i);

        // Check if click is within this image's bounds
        const imageBounds = tiledImage.getBounds();
        console.log("alt x_pos:", imageBounds.x + tiledImage.viewportToImageCoordinates(viewportPoint).x);
        if (imageBounds.containsPoint(viewportPoint) || (genomic_chr === "")) {
            const imagePoint = tiledImage.viewportToImageCoordinates(viewportPoint);

            x_pos_bp = Math.round(imageBounds.x + imagePoint.x);
            y_pos_bp = Math.round(imageBounds.y + imagePoint.y);
            genomic_chr = tiledImage.source.fig_chr;
            break;
        }
    }
    return {
        chr: genomic_chr,
        x_bp: x_pos_bp,
        y_bp: y_pos_bp
    };
}

dziViewer.addHandler('canvas-click', function (event) {
    //    return; // disable for now

    // The canvas-click event gives us a position in web coordinates.
    var webPoint = event.position;

    // Convert that to viewport coordinates, the lingua franca of OpenSeadragon coordinates.
    var viewportPoint = dziViewer.viewport.pointFromPixel(webPoint);

    // Find which image was clicked
    const count = dziViewer.world.getItemCount();
    console.log(`Count is ${count}`);
    var x_pos_bp = -1;
    var y_pos_bp = -1;
    var genomic_chr = "";
    for (let i = 0; i < count; i++) {
        const tiledImage = dziViewer.world.getItemAt(i);

        // Check if click is within this image's bounds
        const imageBounds = tiledImage.getBounds();
        if (imageBounds.containsPoint(viewportPoint)) {
            const imagePoint = tiledImage.viewportToImageCoordinates(viewportPoint);
            console.log("webPoint: ", webPoint.toString(), " imagePoint:", imagePoint.toString());
            console.log(tiledImage);
            console.log(imageBounds);
            console.log('Clicked on image', i, 'at coords:', imagePoint.x, imagePoint.y, imageBounds.containsPoint(viewportPoint));
            x_pos_bp = Math.round(imageBounds.x + imagePoint.x);
            y_pos_bp = Math.round(imageBounds.y + imagePoint.y);
            genomic_chr = tiledImage.source.fig_chr;
            //break;
        }
    }

    // The canvas-click event gives us a position in web coordinates.
    var color = dziViewer.getPixelColor(webPoint);

    console.log("Pixel color RGBA: ", color);


    let color_i = nearestColorIndex(color);
    let rho = rhoFromCmapIndex(color_i, cmapParams.center, cmapParams.half);
    if (genomic_chr === "") {
        clickEl.innerHTML = "Click inside the heatmap to read a correlation value";
    } else {
        clickEl.innerHTML =
            `<strong>&rho; &asymp; ${rho.toFixed(3)}</strong> &nbsp; ` +
            `<span style="color: rgb(255, 41, 135)">X (h1): ${genomic_chr}:${x_pos_bp.toLocaleString()}</span> &nbsp; ` +
            `<span style="color: rgb(40, 118, 255)">Y (h2): ${genomic_chr}:${y_pos_bp.toLocaleString()}</span>`;
    }
    //console.log(`Pixel color RGBA: (${red}, ${green}, ${blue}, ${alpha})`);
});

// ---- Genomic sync between the heatmap (OSD) and the two IGV panels -----------
// The X panel drives the heatmap's x-axis, the Y panel its y-axis, and the
// heatmap drives both. To keep this bidirectional without feedback loops, every
// sync is IDEMPOTENT: it only acts when the target actually differs from the
// source (beyond a small tolerance), so an echo event is a no-op and the system
// converges. (Because the heatmap is square, an x/y span mismatch settles to a
// common square region, which is the only undistorted view of a square matrix.)

function osdRanges() {
    const b = dziViewer.viewport.getBounds(false);
    const tl = viewportToGenomicCoordinates(b.getTopLeft());
    const br = viewportToGenomicCoordinates(b.getBottomRight());
    return {
        chr: tl.chr,
        x0: Math.max(0, Math.floor(tl.x_bp)), x1: Math.ceil(br.x_bp),
        y0: Math.max(0, Math.floor(tl.y_bp)), y1: Math.ceil(br.y_bp)
    };
}

// Tolerance (bp) for "already in sync" — a few heatmap pixels, enough to absorb
// rounding on the round trip but far below any genuine pan/zoom.
function syncTol(span) { return Math.max(4, Math.round(span / 250)); }
function locusApproxEq(cur, chr, start, end) {
    if (!cur || cur.chr !== chr) return false;
    const tol = syncTol(end - start);
    return Math.abs(cur.start - start) <= tol && Math.abs(cur.end - end) <= tol;
}

function syncIgvAxis(browser, chr, start, end) {
    if (!browser) return;
    if (locusApproxEq(parseLocus(browser.currentLoci()), chr, start, end)) return;
    browser.search(`${chr}:${start}-${end}`).catch(e => console.error("igv sync search:", e));
}

// Heatmap -> panels (runs after every OSD pan/zoom).
dziViewer.addHandler('animation-finish', function () {
    const r = osdRanges();
    if (!r.chr) return;
    if (xRegionEl) xRegionEl.innerHTML = `X (h1): ${r.chr}:${r.x0.toLocaleString()}-${r.x1.toLocaleString()} &nbsp; (${(r.x1 - r.x0).toLocaleString()} bp)`;
    if (yRegionEl) yRegionEl.innerHTML = `Y (h2): ${r.chr}:${r.y0.toLocaleString()}-${r.y1.toLocaleString()} &nbsp; (${(r.y1 - r.y0).toLocaleString()} bp)`;
    syncIgvAxis(window.igvX, r.chr, r.x0, r.x1);
    syncIgvAxis(window.igvY, r.chr, r.y0, r.y1);
});

// Panels -> heatmap (runs on either browser's locuschange). Coalesced to one
// call per frame so a drag doesn't restart the OSD animation every event; the
// idempotent check makes the post-gesture echo a no-op.
let igvSyncQueued = false;
function igvToOsd() {
    if (igvSyncQueued) return;
    igvSyncQueued = true;
    requestAnimationFrame(() => {
        igvSyncQueued = false;
        const x = parseLocus(window.igvX && window.igvX.currentLoci());
        const y = parseLocus(window.igvY && window.igvY.currentLoci());
        if (!x || !y || x.chr !== y.chr) return;
        const r = osdRanges();
        if (r.chr === x.chr &&
            locusApproxEq({ chr: r.chr, start: r.x0, end: r.x1 }, x.chr, x.start, x.end) &&
            locusApproxEq({ chr: r.chr, start: r.y0, end: r.y1 }, x.chr, y.start, y.end)) return;
        fitImageRect(x.chr, x.start, y.start,
            Math.max(1, x.end - x.start), Math.max(1, y.end - y.start), false);
    });
}

// Draw colorbar
function drawColorbar(canvas, colormap) {
    const ctx = canvas.getContext('2d');
    //console.log(`colormap length  ${colormap.length}`);
    for (let x = 0; x < canvas.width; x++) {
        const index = Math.floor((x / canvas.width) * colormap.length);
        const color = colormap[index];

        ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        //console.log(`${index} ${color} ctx.fillStyle=${ctx.fillStyle}`);
        ctx.fillRect(x, 0, 1, canvas.height);
    }
}

drawColorbar(document.getElementById('colorbar'), cmap);
import igv from "https://cdn.jsdelivr.net/npm/igv@3.8.1/dist/igv.esm.min.js"
//import igv from "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/web_dev/igv.esm.min.js"




//import igv from "/js/index.js"
const options = {
   "genome": {
        "id": "hs1",
        "name": "Human (T2T CHM13-v2.0/hs1)",
        "twoBitURL": "https://hgdownload3.gi.ucsc.edu/goldenPath/hs1/bigZips/hs1.2bit",
        "twoBitBptURL": "https://hgdownload3.gi.ucsc.edu/goldenPath/hs1/bigZips/hs1.2bit.bpt",
        "wholeGenomeView": true,
        "cytobandBbURL": "https://hgdownload3.gi.ucsc.edu/gbdb/hs1/cytoBandMapped/cytoBandMapped.bb",
        "blatDB": "hub_3671779_hs1",
        "aliasURL": "https://hgdownload3.gi.ucsc.edu/goldenPath/hs1/bigZips/hs1.chromAlias.txt",
        "chromosomeOrder": "chr1,chr2,chr3,chr4,chr5,chr6,chr7,chr8,chr9,chr10,chr11,chr12,chr13,chr14,chr15,chr16,chr17,chr18,chr19,chr20,chr21,chr22,chrX,chrY",
        "chromSizesURL": "https://hgdownload3.gi.ucsc.edu/goldenPath/hs1/bigZips/hs1.chrom.sizes.txt",
tracks: [
{
id: "ncbiRefSeqAll",
name: "RefSeq All",
url: "https://hgdownload.soe.ucsc.edu/gbdb/hs1/ncbiRefSeq/ncbiRefSeq.bb",
trixURL: "https://hgdownload.soe.ucsc.edu/gbdb/hs1/ncbiRefSeq/ncbiRefSeq.ix",
format: "biggenepred",
displayMode: "EXPANDED",
searchIndex: "name",
html: "https://genome.ucsc.edu/cgi-bin/hgTrackUi?db=hs1&g=refSeqComposite",
labelField: "geneName2",
order: 0,
altColor: "rgb(120,12,12)",
color: "rgb(12,12,120)",
visibilityWindow: -1
}
],
    },
    "locus": "chr1:37855330-37870331",
    "tracks": [


        {
            "type": "wig",
            "format": "bigwig",
            "min": 0,
            "autoscale": true,
            "graphType": "bar",
            "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.assoc.fdr.bw",
            "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.assoc.fdr",
            "height": 100
        },
        {
            "type": "annotation",
            "format": "bed",
            "url": "https://a3s.fi/251114_deepfiber/web/annot/CRC_GWAS.Fernandez.GCST90129505.chm13v2.bed.gz",
            "indexURL": "https://a3s.fi/251114_deepfiber/web/annot/CRC_GWAS.Fernandez.GCST90129505.chm13v2.bed.gz.tbi",
            "name": "CRC Associations (Fernandez et al., GCST90129505)",
        },
        {
            type: "variant",
            format: "vcf",
            url: "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-12-multiSMRT-merged/snv/longshot/GP5d-psfHia5-BIDGEN-SZ-2399-merged.longshot.snv.vcf.gz",
            indexURL: "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-12-multiSMRT-merged/snv/longshot/GP5d-psfHia5-BIDGEN-SZ-2399-merged.longshot.snv.vcf.gz.tbi",
            name: "Gp5d Single Nucleotide Variants"

        },
        {
            "name": "FibreSeq 6mA, (h1:red, h2:blue)",
            "type": "merged",
            "autoscale": false,
            "alpha": 0.5,
            "height": 100,

            "min": 0,
            "max": 100,
            "tracks": [
                {
                    "type": "wig",
                    "format": "bigwig",
                    "min": 0,
                    "max": 100,
                    "graphType": "bar",
                    "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.A+a.0.h1.bw",
                    "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.A+a.0.h1",
                    "height": 100,
                    "color": h1red
                },
                {
                    "type": "wig",
                    "format": "bigwig",
                    "min": 0,
                    "max": 100,
                    "graphType": "bar",
                    "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.A+a.0.h2.bw",
                    "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.A+a.0.h2",
                    "height": 100,
                    "color": h2blue
                }
            ]

        }
        ,
        {
            "name": "DNA methyaltion 5mCpG, (h1:red, h2:blue)",
            "type": "merged",
            "autoscale": false,
            "alpha": 0.5,
            "height": 100,

            "min": 0,
            "max": 100,
            "tracks": [


                // {
                //     "type": "wig",
                //     "format": "bigwig",
                //     "min": 0,
                //     "max": 100,
                //     "graphType": "line",
                //     "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.all.bw",
                //     "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.all",
                //     "height": 100
                // },
                {
                    "type": "wig",
                    "format": "bigwig",
                    "min": 0,
                    "max": 100,
                    "graphType": "line",
                    "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.h1.bw",
                    "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.h1",
                    "height": 100,
                    "color": h1red
                },
                {
                    "type": "wig",
                    "format": "bigwig",
                    "min": 0,
                    "max": 100,
                    "graphType": "line",
                    "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.h2.bw",
                    "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.h2",
                    "height": 100,
                    "color": h2blue
                }]
        },
        {
            "type": "wig",
            "format": "bigwig",
            "graphType": "dynseq",
            "autoscale": true,
            "url": "https://a3s.fi/phyloP/phyloP470way_hs1.bw",
            "name": "PhyloP, Hillar lab 470 mammals",
            "height": 100

        },
        {
            "type": "annotation",
            "format": "bed",
            "url": "https://a3s.fi/phyloP/MOODS_matches_representatives_hs1.bed.gz",
            "indexURL": "https://a3s.fi/phyloP/MOODS_matches_representatives_hs1.bed.gz.tbi",
            "name": "MOODS matches representative"
            //"height": 10

        }
    ]
}

function genomicToViewportRectangle(chrom, x_bp, y_bp, x_width, y_width) {

    // Find which image was clicked
    const count = dziViewer.world.getItemCount();
    console.log(`Count is ${count}`);


    const imageRect = new OpenSeadragon.Rect(x_bp, y_bp, x_width, y_width);

    return {
        chr: chrom,
        viewport_rect: imageRect
    };

}
function fitImageRect(imgChr, imgX, imgY, widthPx, heightPx, immediately = false) {
    const vpRect = new OpenSeadragon.Rect(imgX, imgY, widthPx, heightPx);
    if (dziViewer._cur_chrom != imgChr) {
        pending_fit_rect = vpRect;
        maybeLoadImagesForChrom(imgChr);
    } else {
        dziViewer.viewport.fitBounds(vpRect, immediately);
    }
}

const igvDivX = document.getElementById("igvDivX");
const igvDivY = document.getElementById("igvDivY");
const igvYCell = document.getElementById("igvY-cell");
const viewerGrid = document.querySelector(".viewer-grid");
const osdEl = document.getElementById("openseadragon1");

// The X (bottom) and Y (left, rotated) panels share the same track set but are
// independent browsers, so each gets its own deep copy of the config.
const optionsX = options;
const optionsY = structuredClone(options);

// Original getBoundingClientRect, kept so our own measurements bypass the pointer
// shim's override (installed further down) and always see true on-screen rects.
const ORIG_GBCR = Element.prototype.getBoundingClientRect;

// Rotate / size the Y browser so its genomic axis runs vertically, low coordinate
// at the top (matching the heatmap, whose image-y increases downward).
function layoutRotatedY() {
    const W = igvDivY.offsetWidth, H = igvDivY.offsetHeight;
    if (H < 1) return;
    const { transform, cellW, cellH } = rotatedYTransform(W, H);
    igvDivY.style.transform = transform;
    igvYCell.style.width = cellW + 'px';
    igvYCell.style.height = cellH + 'px';
    yRotated = true;
}

// The genomic data area of an igv browser (its widest track viewport), reached
// through the browser's shadow DOM. Excludes the left axis gutter.
function dataViewportRect(host) {
    const sr = host.shadowRoot;
    if (!sr) return null;
    let best = null, bestW = -1;
    for (const v of sr.querySelectorAll('.igv-viewport')) {
        const r = ORIG_GBCR.call(v);
        if (r.width > bestW) { bestW = r.width; best = r; }
    }
    return best;
}

// Overlay the square heatmap exactly on the IGV data viewports so a genomic
// position maps to the same screen pixel in all three views: horizontal extent
// from the X panel, vertical extent from the (rotated) Y panel.
function alignViews() {
    const rx = dataViewportRect(igvDivX);   // horizontal genomic axis
    const ry = dataViewportRect(igvDivY);   // vertical genomic axis (rotated)
    if (!rx || !ry || rx.width < 2 || ry.height < 2) return;
    const grid = ORIG_GBCR.call(viewerGrid);
    const S = Math.round(Math.min(rx.width, ry.height));
    osdEl.style.left = Math.round(rx.left - grid.left) + 'px';
    osdEl.style.top = Math.round(ry.top - grid.top) + 'px';
    osdEl.style.width = S + 'px';
    osdEl.style.height = S + 'px';
    if (dziViewer && dziViewer.forceRedraw) dziViewer.forceRedraw();
}

// ---- Pointer + layout shim for the rotated Y panel ---------------------------
// Two problems stem from the 90deg CSS rotation, both because code reads
// element.getBoundingClientRect() (which returns the ROTATED box):
//   1. igv lays the browser out from columnContainer.getBoundingClientRect().width
//      -> on every re-render it would read the rotated width (the track-stack
//      height) and shrink the data viewport.
//   2. igv maps pointer events as (clientX - rect.left)/rect.width -> wrong axis.
// Fix: once rotated, ALWAYS report the un-rotated rect for Y-panel shadow nodes
// (fixes layout AND event hit-testing), and additionally remap the pointer
// coordinates while an event is over the Y panel (fixes the axis swap). Our own
// measurements use ORIG_GBCR so they still see the true on-screen rotated rects.
let yRotated = false;
function yPanelGeom() {
    const cell = ORIG_GBCR.call(igvYCell);
    return { origin: { x: cell.left, y: cell.top }, W: igvDivY.offsetWidth, H: igvDivY.offsetHeight };
}
Element.prototype.getBoundingClientRect = function () {
    const r = ORIG_GBCR.call(this);
    if (yRotated && igvDivY.shadowRoot && this.getRootNode &&
        this.getRootNode() === igvDivY.shadowRoot) {
        const g = yPanelGeom();
        return unrotateRect(r, g.origin, g.W, g.H);
    }
    return r;
};
function installYShim() {
    const types = ['mousedown', 'mouseup', 'mousemove', 'click', 'dblclick', 'wheel',
        'contextmenu', 'pointerdown', 'pointerup', 'pointermove'];
    let dragging = false;
    const overY = (x, y) => {
        const r = ORIG_GBCR.call(igvDivY);
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };
    for (const t of types) {
        // capture phase (runs before igv's handlers): remap coordinates
        window.addEventListener(t, (e) => {
            const on = overY(e.clientX, e.clientY);
            if (t === 'mousedown' || t === 'pointerdown') dragging = dragging || on;
            if (!(on || dragging)) return;
            const g = yPanelGeom();
            const p = unrotatePoint(e.clientX, e.clientY, g.origin, g.W, g.H);
            const dx = p.x - e.clientX, dy = p.y - e.clientY;
            const patch = { clientX: p.x, clientY: p.y, x: p.x, y: p.y, pageX: e.pageX + dx, pageY: e.pageY + dy };
            for (const k in patch) {
                try { Object.defineProperty(e, k, { configurable: true, get: () => patch[k] }); } catch (_) { /* read-only */ }
            }
        }, true);
        // bubble phase (runs after igv's handlers): clear drag state
        window.addEventListener(t, () => {
            if (t === 'mouseup' || t === 'pointerup') dragging = false;
        }, false);
    }
}

// Read the current X- and Y-loci from the two browsers and frame that rectangle
// in the heatmap. Falls back to the OSD's current view if a locus won't parse.
function pushIgvToOsd() {
    const x = parseLocus(window.igvX && window.igvX.currentLoci());
    const y = parseLocus(window.igvY && window.igvY.currentLoci());
    if (!x || !y) {
        console.warn("Push to 2D view: could not read IGV loci", {
            x: window.igvX && window.igvX.currentLoci(),
            y: window.igvY && window.igvY.currentLoci()
        });
        return;
    }
    if (x.chr !== y.chr) {
        console.warn("Push to 2D view: X and Y browsers are on different chromosomes", x.chr, y.chr);
        return;
    }
    fitImageRect(x.chr, x.start, y.start,
        Math.max(1, x.end - x.start),
        Math.max(1, y.end - y.start), false);
}

// Copy the X panel's current locus onto the Y panel (the auto-sync then reframes
// the heatmap to the resulting diagonal region).
function copyXLocusToY() {
    const x = parseLocus(window.igvX && window.igvX.currentLoci());
    if (!x) {
        console.warn("Copy X→Y: could not read X locus", window.igvX && window.igvX.currentLoci());
        return;
    }
    window.igvY.search(`${x.chr}:${x.start}-${x.end}`).catch(e => console.error("Copy X→Y:", e));
}

Promise.all([
    igv.createBrowser(igvDivX, optionsX),
    igv.createBrowser(igvDivY, optionsY)
])
    .then(function ([browserX, browserY]) {
        console.log("Created both IGV browsers");
        window.igvX = browserX;
        window.igvY = browserY;

        layoutRotatedY();
        installYShim();
        alignViews();

        // Re-layout/re-align whenever the panels' rendered size changes.
        const ro = new ResizeObserver(() => { layoutRotatedY(); alignViews(); });
        ro.observe(igvDivX);
        ro.observe(igvDivY);
        window.addEventListener('resize', alignViews);

        // Live panels -> heatmap sync (heatmap -> panels is the animation-finish
        // handler above). Both directions are idempotent, so they can't loop.
        browserX.on('locuschange', igvToOsd);
        browserY.on('locuschange', igvToOsd);

        document.getElementById('setPairButton').addEventListener('click', pushIgvToOsd);
        document.getElementById('copyXtoYButton').addEventListener('click', copyXLocusToY);
        document.getElementById('reset2dButton')
            .addEventListener('click', () => { dziViewer.world.resetItems(); dziViewer.world.draw(); });

        const whiteAtMedianChk = document.getElementById('whiteAtMedianChk');
        const absMaxScaleChk = document.getElementById('absMaxScaleChk');
        if (whiteAtMedianChk) whiteAtMedianChk.addEventListener('change', () => {
            colorOpts.whiteAtMedian = whiteAtMedianChk.checked;
            applyColorOptions(true);
        });
        if (absMaxScaleChk) absMaxScaleChk.addEventListener('change', () => {
            colorOpts.scaleToAbsMax = absMaxScaleChk.checked;
            applyColorOptions(true);
        });

        // Initial framing: drive the heatmap from the starting loci.
        pushIgvToOsd();
    })
    .catch(function (error) {
        console.error("Error creating IGV browsers:", error);
        igvDivX.innerHTML = "<p style='color: red; text-align: center;'>Error loading IGV browsers. Please check the console for details.</p>";
    });
