import { useState } from 'react'
import { ClusterBoot } from './components/ClusterBoot'
import { hasCompletedIntro } from './data/intro'
import { ClusterHeader } from './components/ClusterHeader'
import { EventLog } from './components/EventLog'
import { MetricCard } from './components/MetricCard'
import { Node } from './components/Node'
import { Panel } from './components/Panel'
import { PodDetail } from './components/PodDetail'
import { ProjectPod } from './components/ProjectPod'
import { StatusBadge } from './components/StatusBadge'
import { cluster, events, externalAccess, nodes, pods, profileSections } from './data/cluster'
import { podStatusLabel } from './data/types'

export default function App() {
  const [introComplete, setIntroComplete] = useState(hasCompletedIntro)
  const [selectedNodeId, setSelectedNodeId] = useState(nodes[0].id)
  const [selectedPodId, setSelectedPodId] = useState('profile')
  const runningPods = pods.filter((pod) => pod.status === 'healthy').length
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? nodes[0]
  const selectedPods = pods.filter((pod) => pod.nodeId === selectedNode.id)
  const selectedPod = selectedPods.find((pod) => pod.id === selectedPodId) ?? selectedPods[0]
  // The "Scheduled" line is derived from the selected node's actual first pod (not a
  // hardcoded name) so the activity log can never point at a pod that no longer exists.
  const firstSelectedPod = selectedPods[0]
  const selectionEvents = [
    { id: `selected-${selectedNode.id}`, timestamp: 'now', level: 'success' as const, reason: 'NodeSelected', resource: `node/${selectedNode.name}`, message: `${selectedNode.role} workload pool is in focus.` },
    ...(firstSelectedPod ? [{ id: `${selectedNode.id}-scheduled`, timestamp: '12:48:24', level: 'normal' as const, reason: 'Scheduled', resource: `pod/${firstSelectedPod.name}`, message: `Successfully assigned to ${selectedNode.name}.` }] : []),
    ...events.map((event) => ({ ...event, id: `${selectedNode.id}-${event.id}`, resource: event.resource.includes('workload') ? `node/${selectedNode.name}` : event.resource })),
  ]

  if (!introComplete) return <ClusterBoot onComplete={() => setIntroComplete(true)} />

  return <div className="app-shell">
    <ClusterHeader cluster={cluster} />
    <main id="overview">
      <section className="hero"><div><p className="eyebrow eyebrow--accent">{cluster.environment} / {cluster.name}</p><h1>Engineering reliable platforms,<br /><em>from quality to cloud.</em></h1><p className="hero__copy">An interactive portfolio modeled as a healthy Kubernetes cluster. Explore it node by node, pod by pod.</p></div><div className="hero__status"><span className="pulse-dot" /> <span>System status: all services operational</span></div></section>
      <section className="metrics" aria-label="Cluster metrics"><MetricCard label="Cluster health" value="100%" detail="All services available" /><MetricCard label="Active nodes" value={`${nodes.length}`} detail={`Identity to Certifications · ${nodes.length} workload pools`} /><MetricCard label="Running pods" value={`${runningPods}`} detail="Portfolio workloads online" /><MetricCard label="Platform focus" value="SRE" detail="Cloud-native engineering" /></section>
      <section className="cluster-explorer" aria-label="Interactive Kubernetes cluster"><Panel title="Cluster topology" action={<span className="panel__hint">select a worker node</span>} className="topology topology--interactive"><div className="topology-scroll"><div className="control-plane"><div className="control-plane__line" /><div className="control-plane__card"><span className="control-plane__icon">✦</span><div><p className="eyebrow">Control plane</p><strong>kube-system</strong></div><StatusBadge status="healthy" label="Healthy" /></div></div><div className="topology-connector"><div className="topology-connector__drops" aria-hidden="true">{nodes.map((node) => <span key={node.id} className="topology-connector__drop" />)}</div></div><div className="nodes--cluster">{nodes.map((node) => <Node key={node.id} node={node} pods={pods.filter((pod) => pod.nodeId === node.id)} selected={node.id === selectedNodeId} selectedPodId={selectedPodId} dimmed={node.id !== selectedNodeId} onSelect={() => { setSelectedNodeId(node.id); setSelectedPodId(pods.find((pod) => pod.nodeId === node.id)?.id ?? selectedPodId) }} onPodSelect={(pod) => { setSelectedNodeId(node.id); setSelectedPodId(pod.id) }} />)}</div></div></Panel><div className="cluster-sidebar"><Panel title="Node activity" action={<span className="panel__hint">Live</span>}><EventLog events={selectionEvents} /></Panel><Panel title="Pod detail" action={<StatusBadge status={selectedPod.status} label={podStatusLabel(selectedPod)} />}>{selectedPod.kind === 'project' ? <ProjectPod pod={selectedPod} nodeName={selectedNode.name} /> : <PodDetail pod={selectedPod} nodeName={selectedNode.name} />}</Panel></div></section>
      <section className="content-grid content-grid--bottom">
        <Panel title="Portfolio services"><div className="services">{profileSections.map((section, index) => <article key={section.id}><span>0{index + 1}</span><div><h3>{section.label}</h3><p>{section.summary}</p></div></article>)}</div></Panel>
        <Panel title="External access" action={<span className="panel__hint">kind: Ingress</span>}>
          <ul className="ingress-list">
            {externalAccess.map((route) => (
              <li key={route.id}>
                <div className="ingress-list__top"><span className="ingress-list__host">{route.host}</span><StatusBadge status={route.status} label="Reachable" /></div>
                <a className="ingress-list__link" href={route.url} target="_blank" rel="noreferrer noopener">{route.service}</a>
                <p>{route.description}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </main>
    <footer>zaheer-platform <span>•</span> production-ready foundation <span>•</span> <span style={{ whiteSpace: 'nowrap' }}>© {new Date().getFullYear()}</span></footer>
  </div>
}
