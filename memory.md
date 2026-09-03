# Memory

Notes for Claude to carry across sessions on this project. Per Zaheer's instruction (2026-09-04), memory for this project is maintained here, inside the repo, instead of the external `~/.claude` auto-memory system.

## Tech stack & architecture

React 19 + TypeScript + Vite SPA presented as a Kubernetes cluster dashboard (nodes = career/skill domains, pods = portfolio items). Plain CSS with design tokens — no component/animation framework by design. All portfolio copy lives in `src/data/cluster.ts` (typed via `src/data/types.ts`), never hardcoded in components.

Key files: `src/App.tsx` (owns `introComplete`/`selectedNodeId`/`selectedPodId` state, syncs to `?node=&pod=` URL params), `src/data/cluster.ts` (nodes/pods/events/profileSections/externalAccess), `src/data/bootSequence.ts` (deterministic first-visit boot timeline, derives `bootWorkloadTotal` from `pods.length` to avoid drift), `src/data/intro.ts` (localStorage key `zaheer-platform-intro-complete` gates the boot replay).

Before editing UI components for a content change, check whether the fix actually belongs in `data/cluster.ts` instead — almost every content change (bio, projects, certs) belongs there, not in a component.

## Feedback: no component library / no invented content

Keep the site on plain CSS with design tokens — do not introduce a UI/animation framework. Do not invent portfolio facts (certifications, dates, progress percentages, project details) that Zaheer hasn't confirmed; leave fields unset/optional rather than fabricating them (e.g. in-progress certs use an indeterminate provisioning-bar rather than a made-up completion %).

**Why:** CLAUDE.md's explicit guardrails, and prior work in this repo already replaced invented placeholder certs/projects with verified ones sourced from READMEs/old-site history — reintroducing invented content would repeat that mistake.

## Feedback: workflow — discovery → plan → approval → implement

Zaheer runs a staged workflow for substantial changes: (1) full-repo discovery/audit, (2) a tiered implementation plan (Must-have/Should-have/Nice-to-have or numbered phases) with an explicit approval gate, (3) only then implementation.

For a multi-phase roadmap specifically, he wants phase-by-phase execution with a stop-and-approve gate between every phase: implement one phase, run `npm run build`/`lint`/`test`, explicitly confirm pass/fail, then ask before starting the next phase. Don't batch multiple phases into one turn even if confident they'd all pass.

For a single approved plan (not a phased roadmap), he may approve all tiers in one shot and expects it moved through quickly rather than re-confirming each tier. Small, obviously-scoped asks (e.g. "fix this typo") don't need a discovery report first.

## Feedback: boot sequence duration — do not shorten

The ~10.6s first-visit boot animation timing (per-step `after` values in `src/data/bootSequence.ts`, plus the 1100ms `finish` delay in `src/components/ClusterBoot.tsx`) is a deliberate favorite of Zaheer's, not an oversight. It was shortened once (2026-09-04, as part of a Website Improvement Audit's Phase 3, framed as reducing recruiter-abandonment risk) and immediately reverted at his request: "dont change thos duratiuon / I loved that."

**How to apply:** Do not propose or make changes to the boot sequence's timing values again. Skip-button visual/affordance improvements (more prominent bordered button, focus states) are separate and remain welcome — only the duration itself is off-limits. If a future audit flags boot duration as an issue, note that this has already been raised and explicitly declined.
