
const h1red = "rgb(255, 41, 135)";
const h2blue = "rgb(40, 118, 255)";


import { enableSziTileSource } from './szi-tile-source-v0.6.1.js';
enableSziTileSource(OpenSeadragon);


let opts = {
    id: "openseadragon1",
    //prefixUrl: "./node_modules/openseadragon/build/openseadragon/images/",
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    tileSources: "./tmp_corr.dzi.dzi",
    maxZoomPixelRatio: 1000.,
    minZoomImageRatio: 1.,
    imageSmoothingEnabled: false,
    showNavigator: true,
    panHorizontal: false,
    panVertical: false,
    showNavigationControl: false,

    gestureSettingsMouse: {
        clickToZoom: false,
        dragToPan: false,
        dblClickToZoom: false,
        pinchToZoom: false,
        scrollToZoom: false,
        zoomToRefPoint: true
    }
};
opts = {
    id: "openseadragon1",
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    tileSources: "./tmp_corr.dzi.dzi",
    maxZoomPixelRatio: 1000.,
    minZoomImageRatio: 1.,
    imageSmoothingEnabled: false,
    showNavigator: false,
}


opts = {
    id: "openseadragon1",
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    tileSources: "./tmp_corr_gray.dzi",
    maxZoomPixelRatio: 1000.,
    minZoomImageRatio: 1.,
    imageSmoothingEnabled: false,
    showNavigator: false,
    drawer: 'canvas',
    gestureSettingsMouse: {
        clickToZoom: false
    }
}

const seismic_cmap = [[0, 0, 76], [0, 0, 79], [0, 0, 82], [0, 0, 85], [0, 0, 88], [0, 0, 90], [0, 0, 93], [0, 0, 96], [0, 0, 99], [0, 0, 102], [0, 0, 104], [0, 0, 107], [0, 0, 110], [0, 0, 113], [0, 0, 116], [0, 0, 118], [0, 0, 121], [0, 0, 124], [0, 0, 127], [0, 0, 130], [0, 0, 132], [0, 0, 135], [0, 0, 138], [0, 0, 141], [0, 0, 144], [0, 0, 146], [0, 0, 149], [0, 0, 152], [0, 0, 155], [0, 0, 158], [0, 0, 160], [0, 0, 163], [0, 0, 166], [0, 0, 169], [0, 0, 172], [0, 0, 174], [0, 0, 177], [0, 0, 180], [0, 0, 183], [0, 0, 186], [0, 0, 188], [0, 0, 191], [0, 0, 194], [0, 0, 197], [0, 0, 200], [0, 0, 202], [0, 0, 205], [0, 0, 208], [0, 0, 211], [0, 0, 214], [0, 0, 216], [0, 0, 219], [0, 0, 222], [0, 0, 225], [0, 0, 228], [0, 0, 230], [0, 0, 233], [0, 0, 236], [0, 0, 239], [0, 0, 242], [0, 0, 244], [0, 0, 247], [0, 0, 250], [0, 0, 253], [1, 1, 255], [5, 5, 255], [9, 9, 255], [13, 13, 255], [17, 17, 255], [21, 21, 255], [25, 25, 255], [29, 29, 255], [33, 33, 255], [37, 37, 255], [41, 41, 255], [45, 45, 255], [49, 49, 255], [53, 53, 255], [57, 57, 255], [61, 61, 255], [65, 65, 255], [69, 69, 255], [73, 73, 255], [77, 77, 255], [81, 81, 255], [85, 85, 255], [89, 89, 255], [93, 93, 255], [97, 97, 255], [101, 101, 255], [105, 105, 255], [109, 109, 255], [113, 113, 255], [117, 117, 255], [121, 121, 255], [125, 125, 255], [129, 129, 255], [133, 133, 255], [137, 137, 255], [141, 141, 255], [145, 145, 255], [149, 149, 255], [153, 153, 255], [157, 157, 255], [161, 161, 255], [165, 165, 255], [169, 169, 255], [173, 173, 255], [177, 177, 255], [181, 181, 255], [185, 185, 255], [189, 189, 255], [193, 193, 255], [197, 197, 255], [201, 201, 255], [205, 205, 255], [209, 209, 255], [213, 213, 255], [217, 217, 255], [221, 221, 255], [225, 225, 255], [229, 229, 255], [233, 233, 255], [237, 237, 255], [241, 241, 255], [245, 245, 255], [249, 249, 255], [253, 253, 255], [255, 253, 253], [255, 249, 249], [255, 245, 245], [255, 241, 241], [255, 237, 237], [255, 233, 233], [255, 229, 229], [255, 225, 225], [255, 221, 221], [255, 217, 217], [255, 213, 213], [255, 209, 209], [255, 205, 205], [255, 201, 201], [255, 197, 197], [255, 193, 193], [255, 189, 189], [255, 185, 185], [255, 181, 181], [255, 177, 177], [255, 173, 173], [255, 169, 169], [255, 165, 165], [255, 161, 161], [255, 157, 157], [255, 153, 153], [255, 149, 149], [255, 145, 145], [255, 141, 141], [255, 137, 137], [255, 133, 133], [255, 129, 129], [255, 125, 125], [255, 121, 121], [255, 117, 117], [255, 113, 113], [255, 109, 109], [255, 105, 105], [255, 101, 101], [255, 97, 97], [255, 93, 93], [255, 89, 89], [255, 85, 85], [255, 81, 81], [255, 77, 77], [255, 73, 73], [255, 69, 69], [255, 65, 65], [255, 61, 61], [255, 57, 57], [255, 53, 53], [255, 49, 49], [255, 45, 45], [255, 41, 41], [255, 37, 37], [255, 33, 33], [255, 29, 29], [255, 25, 25], [255, 21, 21], [255, 17, 17], [255, 13, 13], [255, 9, 9], [255, 5, 5], [255, 1, 1], [254, 0, 0], [252, 0, 0], [250, 0, 0], [248, 0, 0], [246, 0, 0], [244, 0, 0], [242, 0, 0], [240, 0, 0], [238, 0, 0], [236, 0, 0], [234, 0, 0], [232, 0, 0], [230, 0, 0], [227, 0, 0], [226, 0, 0], [224, 0, 0], [222, 0, 0], [220, 0, 0], [218, 0, 0], [216, 0, 0], [214, 0, 0], [211, 0, 0], [210, 0, 0], [208, 0, 0], [206, 0, 0], [204, 0, 0], [202, 0, 0], [200, 0, 0], [198, 0, 0], [195, 0, 0], [194, 0, 0], [192, 0, 0], [190, 0, 0], [188, 0, 0], [186, 0, 0], [184, 0, 0], [182, 0, 0], [179, 0, 0], [178, 0, 0], [176, 0, 0], [174, 0, 0], [172, 0, 0], [170, 0, 0], [168, 0, 0], [166, 0, 0], [163, 0, 0], [162, 0, 0], [160, 0, 0], [158, 0, 0], [156, 0, 0], [154, 0, 0], [152, 0, 0], [150, 0, 0], [147, 0, 0], [146, 0, 0], [144, 0, 0], [142, 0, 0], [140, 0, 0], [138, 0, 0], [136, 0, 0], [134, 0, 0], [132, 0, 0], [130, 0, 0], [128, 0, 0]]
const cmap = seismic_cmap;

const szi_regions = [
    //"chr10_28831833_28846834_gp5d1kx.ps27347867.szi",
    //     "chr10_8691535_8706536_gp5d1kx.ps671941.szi",
    //     "chr1_109825066_109840067_gp5d1kx.ps108478516.szi",
    //     "chr1_172245680_172260681_gp5d1kx.ps171326927.szi",
    //     "chr1_182438712_182453713_gp5d1kx.ps181652317.szi",
    //     "chr1_201166535_201181536_gp5d1kx.ps200687307.szi",
    //     "chr1_204451537_204466538_gp5d1kx.ps201678130.szi",
    //     "chr1_21993063_22008064_gp5d1kx.ps20287018.szi",
    //     "chr1_221104789_221119790_gp5d1kx.ps221051063.szi",
    //     "chr1_22200574_22215575_gp5d1kx.ps20287018.szi",
    //     "chr1_239649189_239664190_gp5d1kx.ps232187716.szi",
    //     "chr1_244427274_244442275_gp5d1kx.ps232187716.szi",
    //     "chr1_37855330_37870331_gp5d1kx.ps35760121.szi",
    "chr1_54654902_54669903_gp5d1kx.ps54498843.szi",
    "chr1_70445201_70460202_gp5d1kx.ps54978056.szi"];



//const sziUrl = './data/shroom4_mA_1kx_gp5d.ps1308022.chrX_9367002-9387992.szi';

//const tileSource = await OpenSeadragon.SziTileSource.createSziTileSource(sziUrl);

const dziViewer = new OpenSeadragon.Viewer({
    id: "openseadragon1",
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    maxZoomPixelRatio: 1000.,
    minZoomImageRatio: 1.,
    imageSmoothingEnabled: false,
    showNavigator: false,
    drawer: 'canvas',
    gestureSettingsMouse: {
        clickToZoom: false
    },
    //tileSources: [tileSource],
});



szi_regions.forEach(r => {

    OpenSeadragon.SziTileSource.createSziTileSource("https://a3s.fi/251114_deepfiber/web/data/" + r).then(async src => {
        let m = r.match(/(chr[^_-]+)[:_-](\d+)/);
        src.fig_chr = m[1];
        src.fig_start_bp = parseInt(m[2]);
        console.log("Adding SZI tile source: ", src, " at ", src.fig_chr, ":", src.fig_start_bp);
        dziViewer.addTiledImage({ tileSource: src, x: src.fig_start_bp, y: src.fig_start_bp ,width:src.dimensions.x });
    });
});


//var dziViewer = OpenSeadragon(opts);
//dziViewer.fig_start_bp = 9367002;
//dziViewer.fig_chr = "chrX";

const x_coord = document.getElementById('X_coord');
const y_coord = document.getElementById('Y_coord');



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
if (true) {
    dziViewer.setFilterOptions({
        filters: {
            processors: OpenSeadragon.Filters.COLORMAP(cmap, 127)
        }
    });

}


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
        console.log("alt x_pos:",imageBounds.x+tiledImage.viewportToImageCoordinates(viewportPoint).x);
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
    let rho = color_i / (cmap.length - 1) * 2 - 1.0;
    document.getElementById('click-position').innerHTML = `idx: ${color_i}  approx rho: ${rho.toFixed(2)} X: ${genomic_chr}:${x_pos_bp.toLocaleString()} Y: ${genomic_chr}:${y_pos_bp.toLocaleString()}`;
    //console.log(`Pixel color RGBA: (${red}, ${green}, ${blue}, ${alpha})`);
});

let update_igv_from_dzi = true;

dziViewer.addHandler('animation-finish', function (event) {
    //return; // disable for now
    var bounds = event.eventSource.viewport.getBounds(false);
    var topLeft = viewportToGenomicCoordinates(bounds.getTopLeft());
    var bottomRight = viewportToGenomicCoordinates(bounds.getBottomRight());
    console.log(`Viewport bounds in image coordinates: ${topLeft.x} ${topLeft.y} ${bottomRight.x} ${bottomRight.y}`);
    console.log(`Viewport bounds in image coordinates: TopLeft ${topLeft.toString()}, BottomRight ${bottomRight.toString()}`);

    const x_start_bp = Math.floor(topLeft.x_bp);
    const x_end_bp = Math.ceil(bottomRight.x_bp);
    const y_start_bp = Math.floor(topLeft.y_bp);
    const y_end_bp = Math.ceil(bottomRight.y_bp);
    const event_chrom = topLeft.chr;
    console.assert(topLeft.chr === bottomRight.chr, "Both corners should be on the same chromosome");


    const x_region_str = `${event_chrom}:${x_start_bp}-${x_end_bp}`;
    const y_region_str = `${event_chrom}:${y_start_bp}-${y_end_bp}`;
    console.log(`X (hap 1) region: ${x_region_str} Y (hap 2) region: ${y_region_str}`);
    x_coord.innerHTML = `X h1: ${event_chrom}:${x_start_bp.toLocaleString()}-${x_end_bp.toLocaleString()}  (${(x_end_bp - x_start_bp + 1).toLocaleString()} bp)`;
    y_coord.innerHTML = `Y h2: ${event_chrom}:${y_start_bp.toLocaleString()}-${y_end_bp.toLocaleString()}  (${(y_end_bp - y_start_bp + 1).toLocaleString()} bp)`;

    // Now, update IGV to reflect this region
    if (window.igvBrowser && update_igv_from_dzi) {
        const locusStr = x_region_str + " " + y_region_str;
        //let locusStr = "MYC CCAT2"
        console.log(`Updating IGV locus to ${locusStr}`);

        window.igvBrowser.clearROIs();
        const dynamic_roi_config =
            [
                {
                    color: "rgba(237,72,155,0.0)",
                    features:
                        [
                            {
                                chr: event_chrom,
                                start: x_start_bp,
                                end: x_end_bp
                            },
                            {
                                chr: event_chrom,
                                start: y_start_bp,
                                end: y_end_bp
                            }
                        ]
                }
            ];
        window.igvBrowser.loadROI(dynamic_roi_config);


        window.igvBrowser.search(locusStr).then(() => {
            console.log("IGV locus updated");
        }).catch((error) => {
            console.error("Error updating IGV locus:", error);
        });
    } else {
        console.log("IGV browser not yet initialized");
    }
    update_igv_from_dzi = true;
});

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
import igv from "https://cdn.jsdelivr.net/npm/igv@3.3.0/dist/igv.esm.min.js"
//import igv from "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/web_dev/igv.esm.min.js"




//import igv from "/js/index.js"
const options = {
    "genome": "hs1",
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
            "name": "MOODS matches representative",
            "height": 100

        },
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

    var viewPortRect = null;
    for (let i = 0; i < count; i++) {
        const tiledImage = dziViewer.world.getItemAt(i);

        // Check if click is within this image's bounds
        const imageBounds = tiledImage.getBounds(false);
        console.log("i:", i, "tiledImage.source.fig_chr:", tiledImage.source.fig_chr, " chrom:", chrom, imageBounds, imageRect);
        if ((tiledImage.source.fig_chr == chrom)) {
            const top_left = tiledImage.imageToViewportCoordinates(new OpenSeadragon.Point(x_bp, y_bp));
            const bottom_right = tiledImage.imageToViewportCoordinates(new OpenSeadragon.Point(x_bp + x_width, y_bp + y_width));

            viewPortRect = new OpenSeadragon.Rect(top_left.x, top_left.y, bottom_right.x - top_left.x, bottom_right.y - top_left.y);

            //break;
        }
    }
    return {
        chr: chrom,
        viewport_rect: viewPortRect
    };
}
function fitImageRect(imgChr, imgX, imgY, widthPx, heightPx, immediately = false) {
    //const vpRect = dziViewer.viewport.imageToViewportRectangle(imgX , imgY, widthPx, heightPx);
    const vpRect = genomicToViewportRectangle(imgChr, imgX, imgY, widthPx, heightPx).viewport_rect;
    update_igv_from_dzi = false;
    console.log("vpRect: ", vpRect);
    if (vpRect) {
        dziViewer.viewport.fitBounds(vpRect, immediately); // zoom + pan so the rect fills the viewer
    }
}

var igvDiv = document.getElementById("igvDiv")



igv.createBrowser(igvDiv, options)
    .then(function (browser) {
        console.log("Created IGV browser")
        console.log("Loaded tracks:", options.tracks.length)


        function update_dzi_view() {
            // your logic here
            console.log('2D view updated');

            let loci = browser.currentLoci();
            console.log(loci);
            if (typeof loci === 'string' || loci instanceof String) {
                console.log("Please select exactly two loci to define the 2D region.");
                const m_x = loci.trim().match(/^([A-Za-z0-9._-]+):(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)(?:-(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?))?$/);
                console.log(m_x);
                fitImageRect(m_x[1], parseInt(m_x[2]), parseInt(m_x[2]), m_x[3] - m_x[2], m_x[3] - m_x[2], false);
            } else if (loci.length == 2) {
                console.log(loci);
                //const m_x = loci[0].trim().match(/^([A-Za-z0-9._-]+):(\d{1,3}(?:,\d{3})*|\d+)(?:-(\d{1,3}(?:,\d{3})*|\d+))?$/);
                //const m_y = loci[1].trim().match(/^([A-Za-z0-9._-]+):(\d{1,3}(?:,\d{3})*|\d+)(?:-(\d{1,3}(?:,\d{3})*|\d+))?$/);
                const m_x = loci[0].trim().match(/^([A-Za-z0-9._-]+):(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)-(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)$/);
                const m_y = loci[1].trim().match(/^([A-Za-z0-9._-]+):(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)-(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)$/);
                if (!m_x || !m_y) {
                    console.log("Loci must be in the format chr:start-end");
                    return;
                }
                fitImageRect(m_x[1], parseInt(m_x[2]), parseInt(m_y[2]), m_x[3] - m_x[2], m_y[3] - m_y[2], false);
            }

        }






        const target = document.getElementById('openseadragon1');

        function setWidth() {
            const refs = browser.root.querySelectorAll('.igv-column');

            const rect = refs[0].getBoundingClientRect();
            const igv_rect = browser.root.getBoundingClientRect();

            console.log(refs);
            console.log(rect)
            console.log(`Setting DZI x to ${rect.x} width to ${rect.width}px`);
            if (rect.width > 1) {
                target.style.width = Math.round(rect.width) + 'px';
                target.style.height = target.style.width;
                target.style.left = Math.round(rect.x - igv_rect.x) + 'px';

            }
        }


        setWidth();

        document.getElementById('setPairButton')
            .addEventListener('click', update_dzi_view);
        update_dzi_view();

        //console.log(ref);
        // keep it synced on layout changes
        const ro = new ResizeObserver(setWidth);
        ro.observe(browser.root);

        window.igvBrowser = browser
    })
    .catch(function (error) {
        console.error("Error creating IGV browser:", error)
        igvDiv.innerHTML = "<p style='color: red; text-align: center;'>Error loading IGV browser. Please check the console for details.</p>"
    })
