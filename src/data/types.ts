export type HealthStatus = 'healthy' | 'pending' | 'warning' | 'offline'
export type EventLevel = 'normal' | 'success' | 'warning'
export type PodKind = 'profile' | 'skill' | 'role' | 'project' | 'certification' | 'timeline'

// Runtime-state label shown wherever a pod's health status needs a human-readable word
// (status badges, pod list rows, pod detail). Keeps every "Running"-style label driven by
// the pod's actual status instead of being hardcoded in components.
export const statusLabels: Record<HealthStatus, string> = {
  healthy: 'Running',
  pending: 'Rolling out',
  warning: 'Degraded',
  offline: 'Terminated',
}

// Resolves the label actually shown for a pod: its own override if set, otherwise the
// generic status label. Certification pods being actively pursued use this to read
// "Provisioning" instead of the generic "Rolling out" used elsewhere (e.g. a career pod
// mid-transition), without changing what "pending" means everywhere else.
export function podStatusLabel(pod: Pick<PortfolioPod, 'status' | 'statusLabel'>): string {
  return pod.statusLabel ?? statusLabels[pod.status]
}

export interface ClusterConfig {
  name: string
  environment: string
  version: string
  status: HealthStatus
  region: string
}

export interface ClusterNode {
  id: string
  name: string
  role: string
  status: HealthStatus
  labels: string[]
  description: string
  usage: { cpu: number; memory: number; pods: number }
  capacity: { cpu: number; memory: number; pods: number }
  // Optional stage tracker rendered on the node card — a compact, kubectl-rollout-style
  // strip of stages with the current one highlighted, instead of a resume-style timeline.
  progression?: { stages: string[]; currentIndex: number }
}

// A named group of concepts a skill pod covers, labeled like a Kubernetes API group
// (e.g. "workloads/v1") so the concept map reads as part of the cluster metaphor rather
// than a generic bullet list.
export interface CapabilityGroup {
  apiGroup: string
  items: string[]
}

export interface PortfolioPod {
  id: string
  name: string
  namespace: string
  kind: PodKind
  status: HealthStatus
  nodeId: string
  title: string
  summary: string
  technologies: string[]
  metadata?: Array<{ label: string; value: string }>
  // Optional external source link (e.g. a GitHub repo or write-up) for pods backed by
  // real, verifiable evidence rather than descriptive copy alone.
  url?: string
  // Grouped concept map for skill pods (node-02) — rendered as a visual tile grid instead
  // of a long flat technology list.
  capabilities?: CapabilityGroup[]
  // Longer-form structured detail (career-stage pods, project pods) — rendered as labeled
  // bullet lists rather than crammed into the single-line metadata grid.
  details?: Array<{ label: string; items: string[] }>
  // Ordered architecture flow for project pods (e.g. ['Docker Engine', 'compose.yml', ...]),
  // rendered as a small connected-stage diagram reusing the cluster topology's visual language.
  architecture?: string[]
  // Overrides the generic status label for this pod only (e.g. a certification pod that is
  // actively being pursued reads "Provisioning" rather than the generic "Rolling out").
  statusLabel?: string
  // Pod-specific activity history — rendered in the "Node activity" sidebar instead of the
  // generic node-derived event stream when present, so the log can tell a real per-workload
  // story (e.g. a project's build/deploy history) rather than only ever saying "NodeSelected".
  events?: ClusterEvent[]
  // Real target exam date (e.g. '2026-03-15') for an in-progress certification pod. Optional
  // and intentionally left unset until a real date exists — never invent one.
  targetDate?: string
  // Real completion percentage (0-100) for an in-progress certification pod. Optional and
  // intentionally left unset until a real figure exists — the indeterminate provisioning-bar
  // sweep is used whenever this is absent.
  progress?: number
}

export interface ClusterEvent {
  id: string
  timestamp: string
  level: EventLevel
  reason: string
  resource: string
  message: string
}

export interface ProfileSection {
  id: string
  label: string
  title: string
  summary: string
  namespace: string
}

// External endpoints the cluster routes visitors to — modeled as Ingress-style
// routes to backend services rather than a conventional "contact" list.
export interface IngressEndpoint {
  id: string
  host: string
  service: string
  description: string
  url: string
  status: HealthStatus
}
