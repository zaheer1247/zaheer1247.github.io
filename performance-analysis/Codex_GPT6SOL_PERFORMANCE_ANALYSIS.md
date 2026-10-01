# Performance architecture assessment — Kubernetes portfolio

**Date:** 2026-10-01  
**Scope:** This checkout's React/Vite application and fresh production build on branch `k8sportfolio`.  
**Method:** Source review, asset inventory, and `npm run build`. Browser CPU, GPU, memory, and network timings were **not** measured.

## Verdict

**The application is not resource intensive overall.** It is a small, static client application. There is no backend workload, data polling, runtime fetch, media decoding, or continuous JavaScript loop in the application source. Its main potential resource cost is the continuously animated status dots and translucent blurred panels. The first-visit intro also delays access to the portfolio for 10.6 seconds unless the visitor uses **Skip intro**; this is a user experience cost, not evidence of high CPU use.

| Dimension | Assessment | Evidence and limit |
|---|---|---|
| Download | Low for core files | Fresh build: 5.26 KB HTML, 28.86 KB CSS, 242.12 KB JS; about **80.9 KB gzip combined**. Font CSS and font files are additional. |
| JavaScript CPU | Low expected | No polling, `requestAnimationFrame`, runtime `fetch`, or heavy computation found in `src/`. Only a chained timeout during the intro. Actual main-thread time is unmeasured. |
| Rendering / battery | Moderate potential on weak devices | Approximately 31 pod status dots can be present in the dashboard; healthy and pending dots animate `box-shadow`. Status badges and event markers add further infinite animations. Paint cost needs browser profiling. |
| Browser memory | Low expected | Five nodes, 31 pods, and a fixed event dataset; no unbounded collection or persistent listener was found. Actual heap size is unmeasured. |
| Server resources | Minimal | GitHub Actions builds static files for GitHub Pages; this app has no application server or Kubernetes cluster runtime. |

## Measured build and asset inventory

`npm run build` passed. Vite reported 30 transformed modules and these output sizes:

| File | Raw | Gzip reported by Vite |
|---|---:|---:|
| `dist/index.html` | 5.26 KB | 1.72 KB |
| `dist/assets/index-*.css` | 28.86 KB | 6.30 KB |
| `dist/assets/index-*.js` | 242.12 KB | 72.89 KB |

The deployed `dist/` also contains an 82.43 KB résumé PDF and a 2.06 KB social preview SVG. The PDF is linked for download and the SVG is metadata; neither is an ordinary page image download. Three root-level PNG files total about **9.56 MB raw**, but source references do not use them and they are absent from `dist/`. They increase repository size, not the current deployed page payload. Build-size figures are artifacts, not measured network transfers; server compression, caching, and font downloads were not verified.

## Where resources are spent

1. **Continuous paint work — highest investigation priority.** `.node-pod__dot--healthy` animates `opacity` and `box-shadow` indefinitely; `.node-pod__dot--pending` uses the same pattern. The dashboard renders all 31 pods across five nodes. `box-shadow` animation can require repainting, unlike opacity-only animation. The exact number active depends on pod status and the visible UI. Healthy status badges and success event markers animate opacity continuously too, though their keyframes do not animate shadows. See `src/styles/index.css` and `src/components/Node.tsx`.
2. **Blurred surfaces.** `.metric-card` and `.panel` use `backdrop-filter: blur(16px)`, and intro surfaces use `blur(18px)`. The number and area of blurred surfaces can increase GPU/compositing cost during scrolling, especially on lower-powered devices. This is a plausible risk, not a measured bottleneck.
3. **Font dependency.** `index.html` loads a Google Fonts stylesheet in the document head for DM Mono and Manrope. It adds a third-party request chain and can delay text styling/first render. The URL requests two DM Mono weights and five Manrope weights; it does **not** prove seven separate font files are downloaded, because browser font selection and Google Fonts responses vary.
4. **Intro access delay.** `src/data/bootSequence.ts` has 16 steps. Delays after the initial step total 9.5 seconds, followed by a 1.1 second completion timer in `ClusterBoot.tsx`. On first visit, portfolio content appears after about **10.6 seconds** unless skipped. The chain holds one timeout at a time and clears it on effect cleanup. Subsequent visits use `localStorage` to bypass it.
5. **Selection rerenders.** `App.tsx` filters 31 pods and rebuilds its small component tree on selection. At this scale, memoization or code splitting has no demonstrated benefit. The whole app is one 72.89 KB gzip JS chunk.

The displayed cluster CPU and memory percentages in `src/data/cluster.ts` are **portfolio content**, not measurements of the visitor's device or hosting infrastructure. The dashboard's “Live” activity is also derived from static data; there is no live Kubernetes stream.

## Recommendations, in order

1. **Reduce ongoing shadow animation if profiling shows idle paints.** Keep a static glow and animate only opacity or transform on a small dot/pseudo-element. Measure a 10-second idle trace before and after on a mobile-class device. This is the most likely battery improvement.
2. **Test blur cost on a low-end mobile profile.** Compare scrolling with `backdrop-filter` enabled and disabled in browser DevTools. If frame times improve materially, use a more opaque background for the main panels and reserve blur for a small accent surface.
3. **Review the intro as a content-access decision.** Keep the visible skip control. If first-visit engagement matters, test whether a shorter sequence or immediate access improves it; this is a UX experiment rather than a resource fix.
4. **Measure font loading before changing it.** Record the actual font requests and first paint on a throttled connection. If font CSS dominates, request only used weights or self-host a subset with `font-display: swap`. Do not assume every declared weight becomes a separate transfer.
5. **Avoid premature React optimization.** Revisit memoization only if pod counts or selection latency grow substantially. Moving Vite/TypeScript build tools to `devDependencies` would improve package metadata clarity but would not reduce the browser bundle.

## Validation still needed

Run a production preview in Chrome DevTools or Lighthouse with both first-visit and returning-visit states. Capture LCP, INP or click latency, CLS, transferred font bytes, JS heap, a 10-second idle Performance trace, and scroll frame times on a mobile-class profile. Use Paint flashing to check the animated dots and compare blur on/off. Until then, the conclusion about CPU, GPU, and battery remains a source-based risk assessment rather than a device measurement.
