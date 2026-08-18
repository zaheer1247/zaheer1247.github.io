import type { ClusterConfig, ClusterEvent, ClusterNode, PortfolioPod, ProfileSection } from './types'

export const cluster: ClusterConfig = {
  name: 'zaheer-platform', environment: 'production', version: 'v1.30.2', status: 'healthy', region: 'ap-south-1',
}

export const nodes: ClusterNode[] = [
  { id: 'control-plane', name: 'control-plane-01', role: 'Control plane', status: 'healthy', labels: ['scheduler', 'api-server'], usage: { cpu: 32, memory: 41, pods: 4 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
  { id: 'workload-devops', name: 'workload-devops-01', role: 'DevOps workloads', status: 'healthy', labels: ['ci-cd', 'automation'], usage: { cpu: 54, memory: 63, pods: 5 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
  { id: 'workload-sre', name: 'workload-sre-01', role: 'SRE workloads', status: 'healthy', labels: ['observability', 'reliability'], usage: { cpu: 47, memory: 38, pods: 4 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
]

export const pods: PortfolioPod[] = [
  { id: 'profile', name: 'profile-service', namespace: 'profile', kind: 'profile', status: 'healthy', nodeId: 'control-plane', title: 'Cloud Platform Architect', summary: 'A career built from quality engineering to dependable cloud platforms.', technologies: ['Kubernetes', 'Cloud', 'SRE'] },
  { id: 'automation', name: 'automation-engine', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'workload-devops', title: 'Test Automation', summary: 'Reliable quality systems and automation engineering.', technologies: ['Selenium', 'API Testing', 'Python'] },
  { id: 'cicd', name: 'delivery-pipeline', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'workload-devops', title: 'CI/CD', summary: 'Repeatable, visible software delivery pipelines.', technologies: ['GitHub Actions', 'Jenkins', 'Git'] },
  { id: 'kubernetes', name: 'kubernetes-platform', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'workload-sre', title: 'Kubernetes', summary: 'Secure, observable platform operations at scale.', technologies: ['EKS', 'Helm', 'Argo CD'] },
  { id: 'observability', name: 'observability-stack', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'workload-sre', title: 'Observability', summary: 'Actionable telemetry and reliability practices.', technologies: ['Grafana', 'Prometheus', 'OpenTelemetry'] },
]

export const events: ClusterEvent[] = [
  { id: 'event-1', timestamp: '12:48:32', level: 'success', reason: 'ClusterReady', resource: 'cluster/zaheer-platform', message: 'All platform services are healthy.' },
  { id: 'event-2', timestamp: '12:48:24', level: 'normal', reason: 'Scheduled', resource: 'pod/kubernetes-platform', message: 'Successfully assigned to workload-sre-01.' },
  { id: 'event-3', timestamp: '12:48:19', level: 'normal', reason: 'Started', resource: 'pod/delivery-pipeline', message: 'Container started and reporting readiness.' },
  { id: 'event-4', timestamp: '12:48:08', level: 'success', reason: 'NodeReady', resource: 'node/workload-sre-01', message: 'Node transitioned to Ready.' },
]

export const profileSections: ProfileSection[] = [
  { id: 'profile', label: 'Profile', title: 'Platform-minded engineering', summary: 'The operating model and professional overview.', namespace: 'profile' },
  { id: 'skills', label: 'Capabilities', title: 'Systems and tools', summary: 'Technical capabilities grouped as platform workloads.', namespace: 'skills' },
  { id: 'experience', label: 'Experience', title: 'Deployment history', summary: 'Career milestones and delivery impact.', namespace: 'experience' },
  { id: 'projects', label: 'Projects', title: 'Workloads', summary: 'Selected platform and automation projects.', namespace: 'projects' },
]
