# Kubernetes Portfolio — Claude Handoff

## Purpose

This is a React + TypeScript Vite portfolio presented as a Kubernetes cluster. It is intentionally a premium dark dashboard, not a terminal or hacker-themed site.

Visitor journey:

1. A deterministic Kubernetes boot sequence runs on a first visit.
2. The main cluster topology appears after boot.
3. Visitors select nodes, then pods, to explore portfolio information as Kubernetes workload metadata.

# Project Context

This is my professional DevOps / SRE portfolio website.

## Objective

Build a premium professional portfolio that clearly communicates:
- DevOps expertise
- SRE experience
- Cloud/platform engineering skills
- Kubernetes
- Linux
- Ansible
- Terraform
- AWS
- Monitoring/Observability
- Automation
- Projects
- GitHub work
- Professional experience

The website should make a visitor immediately understand that this is the portfolio of an experienced DevOps/SRE professional.

## Working Rules

- Inspect the existing project before making changes.
- Do not unnecessarily rewrite working code.
- Preserve existing functionality.
- Follow the existing architecture and design system.
- Reuse existing components where possible.
- Keep the website responsive.
- Optimize for performance.
- Maintain accessibility.
- Do not introduce unnecessary dependencies.
- Test changes before considering a task complete.
- Do not stop at analysis; implement the agreed changes.
- Keep code clean and production quality.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
```

`npm run build`, `npm run lint`, and `npm run test` should pass before handoff.

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

`PortfolioPod` also supports (all optional, added while building out node-02 through node-05):

- `capabilities: CapabilityGroup[]` — `{ apiGroup: string; items: string[] }[]`, a grouped concept map rendered as tiles instead of a flat technology list (used by `node-02` skill pods, e.g. `kubernetes-pod`'s groups for Pods/Deployments/Services/... and RBAC/Helm/...).
- `details: Array<{ label: string; items: string[] }>` — longer-form bullet groups (Responsibilities, Key achievements, Key technical decisions, What I learned) rendered by `DetailGroups`.
- `architecture: string[]` — an ordered stage list for `ProjectPod`'s architecture-flow diagram.
- `statusLabel: string` — overrides the generic status label for this one pod (see `podStatusLabel` below).
- `events: ClusterEvent[]` — pod-specific activity history rendered in the "Node activity" sidebar instead of the generic node-derived event stream (see `App.tsx`'s `selectionEvents`). Populated for pods with a real, non-generic story (identity/experience/project/certification pods); node-02 skill pods fall back to the generic stream since they're static concept lists.
- `targetDate: string` / `progress: number` — real exam date / completion percentage for an in-progress certification pod. Schema exists but intentionally unset everywhere — never invent a value here (see Guardrails).

`ClusterNode.progression?: { stages: string[]; currentIndex: number }` drives the `Node` component's rollout strip (currently only `node-03`).

## Existing UI components

- `ClusterHeader`: site/header cluster status.
- `ClusterBoot`: state-driven boot timeline with skip option.
- `Node`: clickable worker node with embedded selectable pods; renders an optional `.node-progression` rollout strip when `ClusterNode.progression` is set (currently `node-03 / Experience`).
- `PodDetail`: Kubernetes-style runtime metadata panel for the selected pod. Also renders `PortfolioPod.capabilities` as a grouped "capability map" tile grid, `PortfolioPod.details` (via the exported `DetailGroups` helper) as labeled bullet lists, and a `.provisioning-bar` indeterminate progress indicator for certification pods that are `status: 'pending'`. Exports `DetailGroups`, reused by `ProjectPod`.
- `ProjectPod`: dedicated detail view for `kind: 'project'` pods (`node-04`). Renders an `architecture` flow diagram (ordered stages with arrow connectors), `DetailGroups`, and a prominent `.pod-detail__action` source/GitHub button via `linkLabel`. `App.tsx` picks `ProjectPod` vs `PodDetail` based on `pod.kind === 'project'`.
- `Pod`: compact workload card (still reusable for future use).
- `EventLog`, `StatusBadge`, `Panel`, `MetricCard`: reusable dashboard primitives.

Status labels are resolved via `podStatusLabel(pod)` (`data/types.ts`), not `statusLabels[pod.status]` directly — it returns `pod.statusLabel` when a pod sets that override, otherwise the generic status label. This lets a certification pod being actively pursued read "Provisioning" while a `pending` career pod elsewhere still reads "Rolling out", without changing what `pending` means globally.

## Current implementation status

Completed:

- Responsive visual system in `src/styles/index.css`.
- First-visit boot experience: control plane, services, node state transitions, pod scheduling, deployment health, final cluster health. Worker-node list and total workload count are now sourced from `data/cluster.ts` (`nodes`, `bootWorkloadTotal`) instead of hardcoded strings, so the boot narrative can't drift from the real topology again.
- Five-node interactive topology:
  - `node-01 / Identity`
  - `node-02 / Engineering`
  - `node-03 / Experience`
  - `node-04 / Projects`
  - `node-05 / Certifications`
- Node selection dims unrelated nodes and updates the activity/detail sidebar.
- Pod selection updates the pod detail panel.
- `node-01 / Identity` has `profile-pod`, `about-pod`, `education-pod`, and `career-pod`.
- `profile-pod` contains Zaheer Abbas's requested role, years of experience, career direction, and capability metadata.
- `node-02 / Engineering` has seven skill pods, one per capability domain: `linux-pod`, `ansible-pod`, `kubernetes-pod`, `terraform-pod`, `cloud-pod`, `automation-pod`, `observability-pod`. Each carries a `capabilities` concept map (e.g. `kubernetes-pod`: Pods/Deployments/Services/Ingress/ConfigMaps/Secrets grouped under `workloads/v1`, RBAC/Helm/Cluster Administration/Troubleshooting under `cluster.k8s.io/v1`; `linux-pod`: RHEL/System Administration/Networking/Storage/Processes/Users/Permissions/SELinux; `observability-pod`: Prometheus/Grafana/Node Exporter/Metrics/Alerting/Monitoring). `cloud-pod` and `automation-pod` are grounded in the real old-site work history (AWS IAM/Lambda/API Gateway/Serverless Framework, Azure/AKS; Selenium/API testing/Python, GitHub Actions/Jenkins/Git) rather than the generic concept lists used for `ansible-pod`/`terraform-pod`.
- `node-03 / Experience` represents career history as four role pods — `quality-engineering-pod`, `automation-role-pod` (displayed name `automation-pod`; distinct id from node-02's `automation-pod` because it's a different namespace, `experience` vs `skills` — same k8s-style name-reuse-across-namespaces the topology already implies), `infrastructure-pod`, `devops-transition-pod` (`status: 'pending'`) — each with Role/Responsibilities/Technologies/Key achievements sourced from the real old-master Work Experience section (Code IT India, CCUBE, RealPage Inc. QE-II → QE-III), plus the existing `career-rollout` pod (kind `timeline`, unchanged) and a `.node-progression` stage strip on the node card itself (Quality Engineering → Automation → Infrastructure → DevOps → SRE).
- `node-04 / Projects` has seven real, verifiable projects rendered via the `ProjectPod` component: the original `docker-compose-infra` and `openshift-learning-series` (Problem/Solution/Challenges/Results write-ups from the old site), plus five GitHub repos Zaheer provided directly — `flask-cicd-pipeline`, `microservices-architecture`, `k8s-ai-agent`, `aws-terraform-infrastructure`, `monitoring-alerting-stack`. Every fact in those five (services, tools, config, patterns) was sourced by fetching each repo's own README (via raw.githubusercontent.com) — nothing invented. These replace an earlier "Kubernetes Platform" (EKS/Helm/Argo CD) / "Observability Stack" (Grafana/Prometheus/OpenTelemetry) pair that Zaheer confirmed had no real project behind it.
- `node-05 / Certifications` has eight pods. Four are real, completed/in-progress Red Hat/IIEC items: `docker-certification`, `openshift-training`, `ansible-training` (all `status: 'healthy'` → "Running"), and `openshift-exam-prep` (`status: 'pending'`, `statusLabel: 'Provisioning'` — EX280 not yet taken). Four more — `cka-pod`, `rhcsa-rhce-pod`, `terraform-cert-pod`, `aws-sa-pod` — were added after Zaheer confirmed he is actually pursuing CKA, RHCSA/RHCE, a Terraform certification, and AWS Solutions Architect; all four are `status: 'pending'` / `statusLabel: 'Provisioning'`, with no invented exam dates or completion percentages — the in-progress visual is an intentionally indeterminate `.provisioning-bar` sweep, not a fabricated progress percentage.
- `PortfolioPod` gained an optional `url` field (`data/types.ts`) for pods backed by a real external source (repo, article) — rendered in `PodDetail`/`ProjectPod` only when present, labeled via `linkLabel` based on the destination domain.
- `node-03 / Experience` has a `career-rollout` pod (kind `timeline`) presenting the career progression Zaheer described (Quality Engineering → ... → Cloud Platform Architect) as a Kubernetes rollout still in progress toward its desired revision (`status: 'pending'`, i.e. not yet at the destination).
- Pod/status labels ("Running", "Rolling out", "Degraded", "Terminated") are now driven by `statusLabels` in `data/types.ts` instead of being hardcoded per component — required so the `pending` `career-rollout` pod renders correctly, and removes a latent bug where every pod always said "Running" regardless of its real `status`.
- A production-ready external-access surface: `External access` panel (`kind: Ingress` framing) linking to GitHub, LinkedIn, and email, backed by `externalAccess`/`IngressEndpoint` in `data/cluster.ts` and `data/types.ts`.
- SEO/meta pass on `index.html`: title, description, OG/Twitter tags, canonical URL, a new brand-consistent favicon (reuses the in-app "K" mark instead of the old terminal-style icon), and a Person JSON-LD block.
- GitHub Pages deploy workflow (`.github/workflows/deploy.yml`) now actually builds the app (`npm ci && npm run build`) in a dedicated `build` job and publishes `./dist` (not the repo root), with a separate `deploy` job depending on it. This is a real fix as of 2026-09-04 — an earlier version of this doc claimed this was already done, but the workflow was still uploading the raw repo root with no build step, which would have shipped a non-functional page.
- `node.usage.pods` values now match the real pod counts per node (previously out of sync for `identity` and `engineering`).
- The LinkedIn URL, GitHub handle, and email used in `externalAccess` and the JSON-LD block were confirmed current by Zaheer on 2026-09-04.
- URL deep linking: `App.tsx` reads `?node=&pod=` on load (validated against real `nodes`/`pods`, falling back to defaults for anything stale/invalid) and keeps the URL in sync via `history.replaceState` as selection changes — no extra history entries per click.
- Per-pod event history: `PortfolioPod.events?` (see above) — populated for identity, experience, project, and certification pods; `App.tsx`'s `selectionEvents` prefers `selectedPod.events` over the generic node-derived stream when present.
- A social preview image: `public/og-image.svg` (1200×630, on-brand dark/gradient "K" mark), referenced by `og:image`/`twitter:image` in `index.html`. It's SVG-only — no image rasterizer (ImageMagick/rsvg-convert/PIL) was available in the build environment, and some scrapers (notably older Twitter/X) render OG images more reliably as PNG/JPG than SVG. Converting `og-image.svg` to a 1200×630 PNG and swapping the `index.html` references is a quick follow-up if social-preview fidelity matters.
- Automated interaction tests: Vitest + React Testing Library (`npm run test`), jsdom environment configured in `vite.config.ts`, setup file at `src/setupTests.ts`. Covers `podStatusLabel` override behavior (`src/data/types.test.ts`) and dashboard rendering + URL-driven selection (`src/App.test.tsx`).

Not yet implemented / needs your input:

- Dates for the certifications/projects in `node-05` / `node-04` — none were available, so none are shown; the UI only states issuer/track, not "earned on X date".
- Real target exam dates or completion percentages for the four in-progress node-05 certs (`cka-pod`, `rhcsa-rhce-pod`, `terraform-cert-pod`, `aws-sa-pod`) — the `targetDate`/`progress` schema fields exist (see above) but are unset everywhere; none invented. The provisioning bar stays deliberately indeterminate until real values exist.
- Converting `public/og-image.svg` to a rasterized PNG for broader social-scraper compatibility (see above).
- Deciding whether `dist/` should be removed from git history (`git rm -r --cached dist`) now that CI builds it — see `.gitignore`.
- Mobile responsiveness was reviewed via the existing CSS breakpoints (1180/820/780/520/460px across topology, sidebar, hero, metrics, node grid, and boot screen) but not visually verified in a real browser/device in this session — no browser tool was available. Worth a manual pass before a major visual change ships.

## Design constraints

- Preserve the dark, restrained, modern SaaS/Kubernetes-dashboard direction.
- Use status colors and subtle motion only to communicate system state.
- Avoid Matrix green, excessive neon, terminal-heavy copy, random timing, and generic portfolio layouts.
- Respect the existing `prefers-reduced-motion` CSS block.
- Keep mobile topology usable: it becomes a two-column then one-column node grid.

## Suggested next work

1. Convert `public/og-image.svg` to a rasterized PNG for broader social-scraper compatibility.
2. Add real target exam dates / completion percentages to the four in-progress node-05 certs once they exist (`targetDate`/`progress` fields are ready).
3. Do a manual mobile/responsive pass in a real browser — the breakpoints exist and look sound on read-through, but haven't been visually verified this session.
4. Decide whether `dist/` should be removed from git history (`git rm -r --cached dist`) now that CI builds it — see `.gitignore`.
5. Decide when/how to point `.github/workflows/deploy.yml`'s branch trigger at this work (Zaheer is handling the branch/Actions update separately).

## Guardrails

- Do not remove existing user-facing content without explicit instruction.
- Do not replace the custom CSS with a generic component library.
- Keep `npm run build` and `npm run lint` clean.
