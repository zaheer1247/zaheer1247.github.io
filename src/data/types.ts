export type HealthStatus = 'healthy' | 'pending' | 'warning' | 'offline'
export type EventLevel = 'normal' | 'success' | 'warning'
export type PodKind = 'profile' | 'skill' | 'role' | 'project' | 'certification'

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
