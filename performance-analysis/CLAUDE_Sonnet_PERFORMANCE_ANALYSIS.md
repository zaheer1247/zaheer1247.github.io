# Performance Analysis — Kubernetes Portfolio

**Date:** 2026-10-01 · **Branch:** `k8sportfolio` · **Method:** static code review + production build (`npm run build`).
**Not measured:** no runtime profiling (Lighthouse, Chrome Performance panel, CPU/memory traces) was run. The runtime claims below are inferred from the code and should be confirmed with the checks in section 6.

## 1. Verdict

**The application is not resource intensive.** It is a static, client-only SPA with no backend, no network data fetching, no polling, and no heavy computation. Total first-load payload is about 100 KB gzipped (excluding fonts). The remaining cost is cosmetic: a handful of always-running CSS animations and two `backdrop-filter` blurs. These are low risk on desktop and worth trimming for low-end mobile and battery.

| Area | Rating | Notes |
|---|---|---|
| JS bundle | Good | 242 KB raw / **72.9 KB gzip**, mostly React 19 |
| CSS | Good | 28.9 KB raw / **6.3 KB gzip** |
| Runtime CPU | Good | No intervals, rAF loops, or listeners; one timer chain during boot only |
| Rendering / GPU | Fair | 10 infinite animations, 2 `backdrop-filter` blurs |
| Network / fonts | Fair | Render-blocking Google Fonts stylesheet, 2 families, 7 weights |
| Static assets | Good | Resume PDF 82 KB (download only), OG image SVG 2 KB |
| Memory | Good | Small static dataset, no leaks found |

## 2. Build output

```
dist/index.html             5.26 kB │ gzip: 1.72 kB
dist/assets/index-*.css    28.86 kB │ gzip: 6.30 kB
dist/assets/index-*.js    242.12 kB │ gzip: 72.89 kB
```

- 30 modules, built in about 155 ms.
- Dependencies in the runtime bundle: **React and ReactDOM only**. No router, state library, animation library, or component framework.
- `package.json` lists `vite`, `typescript` and `@vitejs/plugin-react` under `dependencies`. This does not affect the bundle (they are build-time only). It is a hygiene issue; see recommendation R6.
- `dist/` is gitignored and untracked (`git ls-files dist` is empty). The "remove dist from git history" item in CLAUDE.md is already resolved.

## 3. Runtime behavior

### 3.1 CPU and JS execution
- **No polling or live data.** The "Live" labels in the UI are static copy. There are no `setInterval`, `requestAnimationFrame`, `scroll`/`resize` listeners, or network calls in `src/`.
- **Boot sequence** (`ClusterBoot.tsx`) uses a single chained `setTimeout`, one per step. It is cleaned up in the effect return. Each tick re-renders one small component for about 10.6 s in total, and only on a first visit (gated by localStorage). This is negligible. Per project memory, the boot duration is a liked feature and should not be shortened.
- **Dashboard** (`App.tsx`) has three `useState` hooks and one `useEffect` that calls `history.replaceState` on selection change. No timers.
- **Per-render derived data.** `App.tsx` runs `pods.filter(...)`, `nodes.find(...)` and rebuilds the `selectionEvents` array on every render, and does `pods.filter` per node inside the JSX. With about 35 pods this costs microseconds. Not worth memoizing today. It would matter only if the dataset grew by 100x.
- **Re-render scope.** Selecting a pod re-renders the whole `App` tree (all `Node` cards, no `React.memo`). With roughly 5 nodes and 35 small pods this is still well under a frame, but it is the only scaling concern in the render path.

### 3.2 Rendering and GPU (the main cost centre)
- **10 `infinite` CSS animations** (`pulse`, `blink`, `pod-running`, `soft-pulse`, `provisioning-sweep` and others) run continuously on the dashboard: one per healthy pod dot and status badge, one per pending dot, plus the progression strip. They animate `opacity` and `box-shadow`.
  - `opacity` is compositor-friendly.
  - **`box-shadow` animation is not.** It triggers a repaint every frame for every animated dot (`pod-running`, `soft-pulse`). With dozens of simultaneous dots, this is the most likely source of idle CPU/GPU use and battery drain.
- **`backdrop-filter: blur(16px)` on every `.metric-card` and `.panel`, and `blur(18px)` on boot panels.** Blur on large translucent surfaces is expensive on low-end GPUs and mobile, and the cost scales with the area blurred. The page background is a dark gradient and there is little behind the panels worth blurring, so the visual payoff is small.
- **Reduced motion is handled.** A `prefers-reduced-motion: reduce` block collapses animation and transition durations. This is good for accessibility, and it also removes the idle animation cost for those users.
- **No `will-change` hints** and no layout-thrashing patterns (no JS-driven measurement).
- **Pod name wrapping, grids and `overflow: auto` event log** are cheap layout.

### 3.3 Network and loading
- **Google Fonts stylesheet is render-blocking** (`<link rel="stylesheet">` to `fonts.googleapis.com`). It adds a third-party round trip (CSS, then font files from `fonts.gstatic.com`) before first paint, and is the largest single contributor to load time on slow connections. It requests **DM Mono 400/500 and Manrope 400/500/600/700/800**: 7 weight files. The CSS only needs a subset (the code uses mostly 400/500/600/700; 800 appears rarely).
- **Single JS chunk.** Everything, including the boot screen and all pod detail components, ships in one 73 KB gzip bundle. Code-splitting is not justified at this size.
- **Hosting.** GitHub Pages serves with gzip/brotli and CDN caching, and Vite emits content-hashed asset names, so repeat visits are cached.
- **OG image** is SVG (about 2 KB). Not a performance issue; it is a social-scraper compatibility issue (already tracked in CLAUDE.md).

### 3.4 Memory
- All content is a static in-module dataset (`cluster.ts` is about 38 KB source). No caches, subscriptions, or global listeners that could leak. The boot timeout is cleared on unmount. Expected heap footprint is a few MB, dominated by React itself.

## 4. Estimated load profile (to be validated)

| Metric | Expectation | Basis |
|---|---|---|
| Transfer before first paint | about 80 KB + font CSS/files | JS + CSS + HTML gzip |
| Main-thread work at load | Low (tens of ms on a modern laptop) | 73 KB gzip React app, one render |
| Idle CPU after load | Low but non-zero | continuous box-shadow/opacity animations |
| LCP | Likely 1 s or less on broadband; gated by font CSS on slow networks | render-blocking font stylesheet |
| CLS | Likely small | possible shift on web-font swap (`display=swap`) |

## 5. Risks, ranked

| # | Risk | Severity | Likelihood |
|---|---|---|---|
| 1 | Always-on `box-shadow` keyframes on many dots cause continuous repaints (battery/CPU on mobile and low-end laptops) | Low–Medium | Medium |
| 2 | `backdrop-filter` blur on all panels/cards is costly on weak GPUs and during scroll | Low–Medium | Medium |
| 3 | Render-blocking Google Fonts stylesheet delays first paint on slow networks; 7 weights is more than needed | Low | High |
| 4 | Whole-tree re-render on every pod click (no memoization) | Very Low | Low (only at much larger data size) |

## 6. Recommendations

Listed in priority order. None are required, and all preserve the existing design.

**R1. Animate only compositor-friendly properties.** Keep the glow as a static `box-shadow` and animate `opacity` (or `transform: scale`) on a pseudo-element instead. Applies to `pod-running`, `soft-pulse` and `blink`. This should remove most idle repaint cost with no visible change.

**R2. Pause off-screen or unnecessary animations.** Options: stop dot animations on non-selected nodes (the dimmed state already communicates this), or limit infinite animation to the selected node's pods.

**R3. Reduce or remove `backdrop-filter`.** Replace the blur with a slightly more opaque background on `.panel` and `.metric-card`. Alternatively, keep it only on the boot panels, which are short-lived.

**R4. Make fonts non-blocking and leaner.**
- Trim to the weights actually used (verify with a grep of `font-weight` in the CSS; drop 800 if unused).
- Use `media="print" onload="this.media='all'"` plus a `<noscript>` fallback, or self-host the two families as `woff2` with `font-display: swap` and `<link rel="preload">`. Self-hosting also removes the third-party DNS/TLS cost and a privacy dependency.

**R5. Optional micro-optimizations (only if the dataset grows).** Wrap `Node` in `React.memo` and memoize `pods.filter` per node with `useMemo`. Not needed at current scale.

**R6. Dependency hygiene.** Move `vite`, `typescript` and `@vitejs/plugin-react` to `devDependencies`. This has no bundle effect, but it makes intent clear and reduces production-install size if it is ever containerized.

### Verification checklist (not yet done)
1. Run Lighthouse (mobile preset, throttled) against `npm run preview` and record LCP, TBT, CLS.
2. Chrome DevTools → Performance → record 10 s idle on the dashboard. Look for continuous "Paint" entries (confirms or refutes risk 1).
3. DevTools → Rendering → enable "Paint flashing" and "Layer borders" to see which animated elements repaint.
4. Toggle `backdrop-filter: none` in DevTools and compare frame times while scrolling on a throttled CPU (confirms or refutes risk 2).
5. Re-measure after R1–R4.

## 7. Conclusion

The portfolio is lightweight by any reasonable standard: a roughly 80 KB gzip first load, no runtime data work, and a clean dependency list. The only meaningful resource use is visual (continuous shadow animations and blur effects) plus the render-blocking font stylesheet. Addressing R1–R4 would make it efficient even on low-end phones. No architectural change is warranted.
