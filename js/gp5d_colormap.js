// Pure color-mapping maths for the 2D correlation heatmap.
//
// The source heatmap tiles are grayscale: a pixel value v in [0,255] encodes
// the correlation linearly as rho = v/255*2 - 1 (so v=127.5 -> rho 0 -> white).
// The viewer maps v through the 256-entry seismic colormap via a linear
// transform with two knobs:
//   center - the v that lands on the colormap middle (white)
//   half   - the half-width, in v units, that spans half the colormap
// colormap index = round(128 + (v - center)/half * 128), clamped to [0,255].
// The defaults center=128, half=128 reproduce the identity mapping index === v.
//
// Two user options drive these knobs from the histogram of the visible values:
//   whiteAtMedian - put white on the data median instead of on v=128 (rho 0)
//   scaleToAbsMax - set half to the largest |v - center| so the most extreme
//                   visible value reaches a colorbar end (full saturation)

export const CMAP_CENTER0 = 128;
export const CMAP_HALF0 = 128;

export function cmapIndexForValue(v, center = CMAP_CENTER0, half = CMAP_HALF0) {
    const idx = Math.round(128 + (v - center) / half * 128);
    return idx < 0 ? 0 : idx > 255 ? 255 : idx;
}

// Inverse of the linear part: which raw value a colormap index represents.
export function valueForCmapIndex(idx, center = CMAP_CENTER0, half = CMAP_HALF0) {
    return center + (idx - 128) * half / 128;
}

export function rhoFromValue(v) {
    return v / 255 * 2 - 1;
}

// rho a displayed color (via its nearest colormap index) corresponds to.
export function rhoFromCmapIndex(idx, center = CMAP_CENTER0, half = CMAP_HALF0) {
    return rhoFromValue(valueForCmapIndex(idx, center, half));
}

// Median bin of a 256-entry value histogram, or null when the histogram is empty.
export function medianFromHist(hist) {
    let total = 0;
    for (let v = 0; v < hist.length; v++) total += hist[v];
    if (total === 0) return null;
    let cum = 0;
    for (let v = 0; v < hist.length; v++) {
        cum += hist[v];
        if (cum >= total / 2) return v;
    }
    return hist.length - 1;
}

// Largest |v - center| over the populated bins, or null when the histogram is empty.
export function absMaxFromHist(hist, center) {
    let amax = 0;
    let any = false;
    for (let v = 0; v < hist.length; v++) {
        if (hist[v] > 0) {
            any = true;
            const d = Math.abs(v - center);
            if (d > amax) amax = d;
        }
    }
    return any ? amax : null;
}

// center/half for a render given its value histogram and the two options.
// Falls back to the identity defaults whenever the histogram has no data.
export function computeCmapParams(hist, { whiteAtMedian = false, scaleToAbsMax = false } = {}) {
    let center = CMAP_CENTER0;
    if (whiteAtMedian) {
        const m = medianFromHist(hist);
        if (m !== null) center = m;
    }
    let half = CMAP_HALF0;
    if (scaleToAbsMax) {
        const a = absMaxFromHist(hist, center);
        if (a !== null) half = Math.max(1, a);
    }
    return { center, half };
}
