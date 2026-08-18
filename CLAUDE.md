# Kubernetes Portfolio — Claude Handoff

## Purpose

This is a React + TypeScript Vite portfolio presented as a Kubernetes cluster. It is intentionally a premium dark dashboard, not a terminal or hacker-themed site.

Visitor journey:

1. A deterministic Kubernetes boot sequence runs on a first visit.
2. The main cluster topology appears after boot.
3. Visitors select nodes, then pods, to explore portfolio information as Kubernetes workload metadata.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

`npm run build` and `npm run lint` should pass before handoff.

## Stack

- React 19 + TypeScript
- Vite
- Plain CSS with design tokens; no component or animation framework
- Local structured TypeScript data; no backend or CMS yet

## Important architecture

### Application flow

- `src/App.tsx` owns high-level UI selection state:
  - `introComplete`: whether the boot experience should display.
  - `selectedNodeId`: current worker node.
  - `selectedPodId`: current workload detail.
- `src/components/ClusterBoot.tsx` is the pre-dashboard boot experience.
- `src/data/intro.ts` persists completion under localStorage key `zaheer-platform-intro-complete`.
  - Clear that key in browser storage to replay the boot sequence during development.

### Structured content

Do not hardcode portfolio copy in UI components. Add or revise content in:

- `src/data/cluster.ts` — cluster config, nodes, pods, baseline events, profile sections.
- `src/data/types.ts` — contracts for that data.
- `src/data/bootSequence.ts` — deterministic boot timeline and boot resource state.

`PortfolioPod.metadata` is the preferred shape for pod-detail values:

```ts
metadata: [
  { label: 'Role', value: 'Quality Engineer III' },
]
```

## Existing UI components

- `ClusterHeader`: site/header cluster status.
- `ClusterBoot`: state-driven boot timeline with skip option.
- `Node`: clickable worker node with embedded selectable pods.
- `PodDetail`: Kubernetes-style runtime metadata panel for the selected pod.
- `Pod`: compact workload card (still reusable for future use).
- `EventLog`, `StatusBadge`, `Panel`, `MetricCard`: reusable dashboard primitives.

## Current implementation status

Completed:

- Responsive visual system in `src/styles/index.css`.
- First-visit boot experience: control plane, services, node state transitions, pod scheduling, deployment health, final cluster health.
- Five-node interactive topology:
  - `node-01 / Identity`
  - `node-02 / Engineering`
  - `node-03 / Experience`
  - `node-04 / Projects`
  - `node-05 / Certifications`
- Node selection dims unrelated nodes and updates the activity/detail sidebar.
- Pod selection updates the pod detail panel.
- `node-01 / Identity` has `profile-pod`, `about-pod`, `education-pod`, and `career-pod`.
- `profile-pod` contains Zaheer Abbas’s requested role, years of experience, career direction, and capability metadata.

Not yet implemented:

- Complete real content for engineering, experience, projects, and certification pods.
- Per-pod context-specific event history instead of the current node-derived event stream.
- Navigation/deep links and URL-addressable selection.
- Full career timeline and professional contact screen.
- Automated interaction tests.

## Design constraints

- Preserve the dark, restrained, modern SaaS/Kubernetes-dashboard direction.
- Use status colors and subtle motion only to communicate system state.
- Avoid Matrix green, excessive neon, terminal-heavy copy, random timing, and generic portfolio layouts.
- Respect the existing `prefers-reduced-motion` CSS block.
- Keep mobile topology usable: it becomes a two-column then one-column node grid.

## Suggested next work

1. Populate `node-02 / Engineering` pods with detailed automation, CI/CD, Linux, and DevOps metadata.
2. Expand node-03 with dated but workload-oriented career deployment information.
3. Add a projects detail model with outcomes, technologies, and links.
4. Add certification issuer/date/verification metadata.
5. Consider adding URL query state (`?node=identity&pod=profile-pod`) after the content is complete.

## Guardrails

- Do not remove existing user-facing content without explicit instruction.
- Do not replace the custom CSS with a generic component library.
- Keep `npm run build` and `npm run lint` clean.
