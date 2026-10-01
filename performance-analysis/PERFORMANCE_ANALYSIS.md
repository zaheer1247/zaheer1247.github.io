
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

Caveat: this is a lab test on localhost, so real-world network latency to Google Fonts (which the "before" build still paid in the simulation) is only approximated.

### Idle repaint trace (2026-10-01)

Headless Chromium trace (`devtools.timeline` + `cc` categories) of the dashboard sitting idle for 10 s after the intro was skipped, run twice per build. "Before" = the commit before R1–R4; "After" = current.

| Metric (10 s idle) | Before | After |
|---|---|---|
| Paint events | ~40,800 | **0** |
| Time spent painting | ~1,870 ms | **0 ms** |
| UpdateLayer events | ~48,300 | **3** |
| Script (FunctionCall) time | 8–14 ms | ~4 ms |

The "before" build repainted continuously (about 19% of the main thread busy painting while idle); the "after" build is fully idle, with the pulses running on the compositor. Selection latency was also measured: a click's synchronous React render takes about 1 ms (6x CPU slowdown included), so memoization (R5) is not needed.
