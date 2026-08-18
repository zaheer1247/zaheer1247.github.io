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

`PortfolioPod` also supports (all optional, added while building out node-02 through node-05):

- `capabilities: CapabilityGroup[]` — `{ apiGroup: string; items: string[] }[]`, a grouped concept map rendered as tiles instead of a flat technology list (used by `node-02` skill pods, e.g. `kubernetes-pod`'s groups for Pods/Deployments/Services/... and RBAC/Helm/...).
- `details: Array<{ label: string; items: string[] }>` — longer-form bullet groups (Responsibilities, Key achievements, Key technical decisions, What I learned) rendered by `DetailGroups`.
- `architecture: string[]` — an ordered stage list for `ProjectPod`'s architecture-flow diagram.
- `statusLabel: string` — overrides the generic status label for this one pod (see `podStatusLabel` below).

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
- GitHub Pages deploy workflow (`.github/workflows/deploy.yml`) now actually builds the app (`npm ci && npm run build`) and publishes `dist/`, split into build/deploy jobs. Previously it uploaded the raw repo root with no build step, which would have shipped a non-functional page.
- `node.usage.pods` values now match the real pod counts per node (previously out of sync for `identity` and `engineering`).

Not yet implemented / needs your input:

- Confirmation that the LinkedIn URL, GitHub handle, and email used in `externalAccess` and the JSON-LD block (recovered from the old `master` branch's history) are still current before this goes live.
- Per-pod context-specific event history instead of the current node-derived event stream.
- Navigation/deep links and URL-addressable selection.
- A social preview image (`og:image`) — currently text-only Open Graph/Twitter cards.
- Automated interaction tests.
- Dates for the certifications/projects in `node-05` / `node-04` — none were available, so none are shown; the UI only states issuer/track, not "earned on X date".
- Real target exam dates or completion percentages for the four in-progress node-05 certs (`cka-pod`, `rhcsa-rhce-pod`, `terraform-cert-pod`, `aws-sa-pod`) — none invented; the provisioning bar is deliberately indeterminate. Add them once real dates/percentages exist.

## Design constraints

- Preserve the dark, restrained, modern SaaS/Kubernetes-dashboard direction.
- Use status colors and subtle motion only to communicate system state.
- Avoid Matrix green, excessive neon, terminal-heavy copy, random timing, and generic portfolio layouts.
- Respect the existing `prefers-reduced-motion` CSS block.
- Keep mobile topology usable: it becomes a two-column then one-column node grid.

## Suggested next work

1. Confirm the LinkedIn/GitHub/email links recovered from the old `master` branch are still accurate before pushing.
2. Consider adding URL query state (`?node=identity&pod=profile-pod`) now that the content model is mostly stable.
3. Design a simple `og:image` for social sharing previews.
4. Decide whether `dist/` should be removed from git history (`git rm -r --cached dist`) now that CI builds it — see `.gitignore`.
5. Decide when/how to point `.github/workflows/deploy.yml`'s branch trigger at this work (Zaheer is handling the branch/Actions update separately).

## Guardrails

- Do not remove existing user-facing content without explicit instruction.
- Do not replace the custom CSS with a generic component library.
- Keep `npm run build` and `npm run lint` clean.
