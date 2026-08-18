import { pods } from './cluster'

export type BootResourceKind = 'system' | 'node' | 'pod' | 'deployment' | 'cluster'
export type BootResourceState = 'queued' | 'not-ready' | 'initializing' | 'pending' | 'creating' | 'ready' | 'running' | 'healthy'

export interface BootStep {
  id: string
  after: number
  phase: string
  reason: string
  resource: string
  message: string
  kind: BootResourceKind
  state: BootResourceState
}

export const bootSequence: BootStep[] = [
  { id: 'initialize', after: 0, phase: 'Initializing cluster', reason: 'ClusterInitialized', resource: 'cluster/zaheer-platform', message: 'Cluster control plane initialized.', kind: 'cluster', state: 'initializing' },
  { id: 'api', after: 700, phase: 'Starting control plane', reason: 'APIServerReady', resource: 'component/kube-apiserver', message: 'Kubernetes API server is accepting requests.', kind: 'system', state: 'ready' },
  { id: 'scheduler', after: 650, phase: 'Starting control plane', reason: 'SchedulerReady', resource: 'component/kube-scheduler', message: 'Scheduler leader election complete.', kind: 'system', state: 'ready' },
  { id: 'controller', after: 650, phase: 'Starting control plane', reason: 'ControllerManagerReady', resource: 'component/kube-controller-manager', message: 'Controller manager is reconciling resources.', kind: 'system', state: 'ready' },
  { id: 'dns', after: 650, phase: 'Starting platform services', reason: 'CoreDNSReady', resource: 'deployment/coredns', message: 'CoreDNS deployment is available.', kind: 'deployment', state: 'ready' },
  { id: 'node-1-not-ready', after: 700, phase: 'Joining worker nodes', reason: 'NodeRegistered', resource: 'node/node-01', message: 'Node registered with cluster.', kind: 'node', state: 'not-ready' },
  { id: 'node-1-init', after: 450, phase: 'Joining worker nodes', reason: 'NodeInitializing', resource: 'node/node-01', message: 'Kubelet reporting initialization status.', kind: 'node', state: 'initializing' },
  { id: 'node-1-ready', after: 500, phase: 'Joining worker nodes', reason: 'NodeReady', resource: 'node/node-01', message: 'Node transitioned to Ready.', kind: 'node', state: 'ready' },
  { id: 'node-2-ready', after: 650, phase: 'Joining worker nodes', reason: 'NodeReady', resource: 'node/node-02', message: 'Node transitioned to Ready.', kind: 'node', state: 'ready' },
  { id: 'node-3-ready', after: 550, phase: 'Joining worker nodes', reason: 'NodeReady', resource: 'node/node-03', message: 'Node transitioned to Ready.', kind: 'node', state: 'ready' },
  { id: 'pod-pending', after: 650, phase: 'Scheduling portfolio workloads', reason: 'PodScheduled', resource: 'pod/profile-service', message: 'Successfully assigned to control-plane-01.', kind: 'pod', state: 'pending' },
  { id: 'pod-creating', after: 500, phase: 'Scheduling portfolio workloads', reason: 'ContainerCreating', resource: 'pod/profile-service', message: 'Creating container runtime resources.', kind: 'pod', state: 'creating' },
  { id: 'pod-running', after: 600, phase: 'Scheduling portfolio workloads', reason: 'ContainerStarted', resource: 'pod/profile-service', message: 'Container started and passing readiness checks.', kind: 'pod', state: 'running' },
  { id: 'pods-running', after: 650, phase: 'Scheduling portfolio workloads', reason: 'ContainerStarted', resource: 'pods/portfolio-workloads', message: `${pods.length - 1} supporting workload pods are running.`, kind: 'pod', state: 'running' },
  { id: 'deployment', after: 700, phase: 'Verifying deployments', reason: 'DeploymentAvailable', resource: 'deployment/portfolio-services', message: 'Minimum availability reached.', kind: 'deployment', state: 'healthy' },
  { id: 'healthy', after: 900, phase: 'Cluster ready', reason: 'ClusterHealthy', resource: 'cluster/zaheer-platform', message: 'All nodes and portfolio workloads are healthy.', kind: 'cluster', state: 'healthy' },
]

export const bootResources = [
  { label: 'API server', resource: 'component/kube-apiserver' },
  { label: 'Scheduler', resource: 'component/kube-scheduler' },
  { label: 'Controller manager', resource: 'component/kube-controller-manager' },
  { label: 'CoreDNS', resource: 'deployment/coredns' },
] as const

// Total portfolio workload pods the boot sequence claims to schedule — sourced from the
// real pods array so the boot narrative can never drift from the dashboard again.
export const bootWorkloadTotal = pods.length
