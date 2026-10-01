
## 8. Measured results after R1–R4 (2026-10-01)

Lighthouse 13.5, mobile preset (simulated 4G + 4x CPU), performance category only, `vite preview` build, first-visit (boot screen) load, 3 runs each, averaged.
"Before" = git `HEAD` (original fonts via Google Fonts, shadow animations, backdrop blur). "After" = R1 (opacity-only keyframes), R2 (pause dimmed-node animations), R3 (panel blur removed), R4 (self-hosted fonts).

| Metric | Before | After |
|---|---|---|
| Performance score | 93 (95/92/93) | **100** (100/100/100) |
| First Contentful Paint | 2437 ms | **1355 ms** |
| Largest Contentful Paint | 2437 ms | **1655 ms** |
| Speed Index | 3459 ms | **1355 ms** |
| Total Blocking Time | 0 ms | 0 ms |
| Cumulative Layout Shift | 0.024 | **0.001** |
| Requests | 7 (2 third-party hosts) | 6 (all same-origin) |
| Transfer size | 122 KB | 121 KB |

Caveats: this is a lab test on localhost, so real-world network latency to Google Fonts (which the "before" build still paid in the simulation) is only approximated. The load test does not capture idle repaint/CPU savings from R1–R3; confirm those with a DevTools Performance trace and Paint flashing.
