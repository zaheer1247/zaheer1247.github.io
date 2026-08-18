import type { ClusterConfig, ClusterEvent, ClusterNode, PortfolioPod, ProfileSection } from './types'

export const cluster: ClusterConfig = {
  name: 'zaheer-platform', environment: 'production', version: 'v1.30.2', status: 'healthy', region: 'ap-south-1',
}

export const nodes: ClusterNode[] = [
  { id: 'identity', name: 'node-01', role: 'Identity', status: 'healthy', labels: ['profile', 'leadership'], description: 'The professional identity and cloud-platform point of view.', usage: { cpu: 22, memory: 31, pods: 2 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
  { id: 'engineering', name: 'node-02', role: 'Engineering', status: 'healthy', labels: ['automation', 'ci-cd'], description: 'The systems, practices, and engineering foundation.', usage: { cpu: 54, memory: 63, pods: 3 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
  { id: 'experience', name: 'node-03', role: 'Experience', status: 'healthy', labels: ['linux', 'infrastructure'], description: 'Career progression from quality engineering to platform operations.', usage: { cpu: 47, memory: 38, pods: 2 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
  { id: 'projects', name: 'node-04', role: 'Projects', status: 'healthy', labels: ['kubernetes', 'cloud'], description: 'Hands-on workloads that demonstrate platform engineering outcomes.', usage: { cpu: 41, memory: 45, pods: 2 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
  { id: 'certifications', name: 'node-05', role: 'Certifications', status: 'healthy', labels: ['verified', 'learning'], description: 'Verified cloud-native expertise and continued learning.', usage: { cpu: 19, memory: 27, pods: 2 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
]

export const pods: PortfolioPod[] = [
  { id: 'profile', name: 'profile-pod', namespace: 'identity', kind: 'profile', status: 'healthy', nodeId: 'identity', title: 'Zaheer Abbas', summary: 'Quality Engineer III building toward reliable cloud platforms.', technologies: ['Selenium', 'Linux', 'Kubernetes'], metadata: [{ label: 'Role', value: 'Quality Engineer III' }, { label: 'Runtime', value: '11+ years' }, { label: 'Career target', value: 'Cloud Platform Architect' }, { label: 'Operating model', value: 'DevOps / SRE' }] },
  { id: 'about', name: 'about-pod', namespace: 'identity', kind: 'profile', status: 'healthy', nodeId: 'identity', title: 'Core background', summary: 'A broad systems foundation from software quality to cloud-native operations.', technologies: ['Testing', 'Automation', 'Infrastructure'], metadata: [{ label: 'Domain', value: 'Software engineering' }, { label: 'Primary focus', value: 'Quality & automation' }, { label: 'Platform layer', value: 'Infrastructure & DevOps' }] },
  { id: 'education', name: 'education-pod', namespace: 'identity', kind: 'profile', status: 'healthy', nodeId: 'identity', title: 'Learning foundation', summary: 'Structured learning and practical capability development across the platform stack.', technologies: ['Linux', 'Cloud', 'Kubernetes'], metadata: [{ label: 'Learning mode', value: 'Continuous' }, { label: 'Current track', value: 'Cloud-native platforms' }, { label: 'Validation', value: 'Hands-on delivery' }] },
  { id: 'career', name: 'career-pod', namespace: 'identity', kind: 'role', status: 'healthy', nodeId: 'identity', title: 'Career trajectory', summary: 'A deliberate path from quality systems to cloud platform architecture.', technologies: ['DevOps', 'SRE', 'Cloud'], metadata: [{ label: 'Origin', value: 'Software testing' }, { label: 'Progression', value: 'Automation → Infrastructure → Kubernetes' }, { label: 'Destination', value: 'Cloud Platform Architect' }] },
  { id: 'automation', name: 'automation-engine', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'engineering', title: 'Test Automation', summary: 'Reliable quality systems and automation engineering.', technologies: ['Selenium', 'API Testing', 'Python'] },
  { id: 'cicd', name: 'delivery-pipeline', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'engineering', title: 'CI/CD', summary: 'Repeatable, visible software delivery pipelines.', technologies: ['GitHub Actions', 'Jenkins', 'Git'] },
  { id: 'linux', name: 'linux-foundations', namespace: 'experience', kind: 'role', status: 'healthy', nodeId: 'experience', title: 'Linux & Infrastructure', summary: 'The operating systems and infrastructure foundations.', technologies: ['Linux', 'Networking', 'IaC'] },
  { id: 'sre', name: 'sre-practice', namespace: 'experience', kind: 'role', status: 'healthy', nodeId: 'experience', title: 'DevOps / SRE', summary: 'Reliability, observability, and scalable operations.', technologies: ['Grafana', 'Prometheus', 'SLOs'] },
  { id: 'kubernetes', name: 'kubernetes-platform', namespace: 'projects', kind: 'project', status: 'healthy', nodeId: 'projects', title: 'Kubernetes Platform', summary: 'Secure, observable platform operations at scale.', technologies: ['EKS', 'Helm', 'Argo CD'] },
  { id: 'observability', name: 'observability-stack', namespace: 'projects', kind: 'project', status: 'healthy', nodeId: 'projects', title: 'Observability Stack', summary: 'Actionable telemetry and reliability practices.', technologies: ['Grafana', 'Prometheus', 'OpenTelemetry'] },
  { id: 'cka', name: 'cka-certification', namespace: 'certifications', kind: 'certification', status: 'healthy', nodeId: 'certifications', title: 'Kubernetes Certification', summary: 'Verified cloud-native operational capability.', technologies: ['Kubernetes', 'Security'] },
  { id: 'cloud', name: 'cloud-certification', namespace: 'certifications', kind: 'certification', status: 'healthy', nodeId: 'certifications', title: 'Cloud Certification', summary: 'Cloud architecture and platform expertise.', technologies: ['Cloud', 'Architecture'] },
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
