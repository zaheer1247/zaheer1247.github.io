import { useState } from 'react'
import { ClusterBoot } from './components/ClusterBoot'
import { hasCompletedIntro } from './data/intro'
import { ClusterHeader } from './components/ClusterHeader'
import { EventLog } from './components/EventLog'
import { MetricCard } from './components/MetricCard'
import { Node } from './components/Node'
import { Panel } from './components/Panel'
import { Pod } from './components/Pod'
import { StatusBadge } from './components/StatusBadge'
import { cluster, events, nodes, pods, profileSections } from './data/cluster'

export default function App() {
  const [introComplete, setIntroComplete] = useState(hasCompletedIntro)
  const [selectedNodeId, setSelectedNodeId] = useState(nodes[0].id)
  const runningPods = pods.filter((pod) => pod.status === 'healthy').length
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? nodes[0]
  const selectedPods = pods.filter((pod) => pod.nodeId === selectedNode.id)
  const selectionEvents = [
    { id: `selected-${selectedNode.id}`, timestamp: 'now', level: 'success' as const, reason: 'NodeSelected', resource: `node/${selectedNode.name}`, message: `${selectedNode.role} workload pool is in focus.` },
    ...events.map((event) => ({ ...event, id: `${selectedNode.id}-${event.id}`, resource: event.resource.includes('workload') ? `node/${selectedNode.name}` : event.resource })),
  ]

  if (!introComplete) return <ClusterBoot onComplete={() => setIntroComplete(true)} />

  return <div className="app-shell">
    <ClusterHeader cluster={cluster} />
    <main id="overview">
      <section className="hero"><div><p className="eyebrow eyebrow--accent">{cluster.environment} / {cluster.name}</p><h1>Engineering reliable platforms,<br /><em>from quality to cloud.</em></h1><p className="hero__copy">An interactive portfolio modeled as a healthy Kubernetes cluster. Explore the platform foundations as they take shape.</p></div><div className="hero__status"><span className="pulse-dot" /> <span>System status: all services operational</span></div></section>
      <section className="metrics" aria-label="Cluster metrics"><MetricCard label="Cluster health" value="100%" detail="All services available" /><MetricCard label="Active nodes" value={`${nodes.length}`} detail="Across 2 workload pools" /><MetricCard label="Running pods" value={`${runningPods}`} detail="Portfolio workloads online" /><MetricCard label="Platform focus" value="SRE" detail="Cloud-native engineering" /></section>
      <section className="cluster-explorer" aria-label="Interactive Kubernetes cluster"><Panel title="Cluster topology" action={<span className="panel__hint">select a worker node</span>} className="topology topology--interactive"><div className="control-plane"><div className="control-plane__line" /><div className="control-plane__card"><span className="control-plane__icon">✦</span><div><p className="eyebrow">Control plane</p><strong>kube-system</strong></div><StatusBadge status="healthy" label="Healthy" /></div></div><div className="topology-connector" /><div className="nodes nodes--cluster">{nodes.map((node) => <Node key={node.id} node={node} pods={pods.filter((pod) => pod.nodeId === node.id)} selected={node.id === selectedNodeId} dimmed={node.id !== selectedNodeId} onSelect={() => setSelectedNodeId(node.id)} />)}</div></Panel><div className="cluster-sidebar"><Panel title="Node activity" action={<span className="panel__hint">Live</span>}><EventLog events={selectionEvents} /></Panel><Panel title={`${selectedNode.role} node`} action={<StatusBadge status={selectedNode.status} label="Ready" />}><div className="node-detail"><p className="eyebrow">{selectedNode.name} / worker node</p><h2>{selectedNode.description}</h2><div className="node-detail__pods"><span>Active workloads</span>{selectedPods.map((pod) => <Pod key={pod.id} pod={pod} />)}</div></div></Panel></div></section>
      <section className="content-grid content-grid--bottom"><Panel title="Portfolio services"><div className="services">{profileSections.map((section, index) => <article key={section.id}><span>0{index + 1}</span><div><h3>{section.label}</h3><p>{section.summary}</p></div></article>)}</div></Panel></section>
    </main>
    <footer>zaheer-platform <span>•</span> production-ready foundation <span>•</span> © 2026</footer>
  </div>
}
