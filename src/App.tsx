import { ClusterHeader } from './components/ClusterHeader'
import { EventLog } from './components/EventLog'
import { MetricCard } from './components/MetricCard'
import { Node } from './components/Node'
import { Panel } from './components/Panel'
import { Pod } from './components/Pod'
import { cluster, events, nodes, pods, profileSections } from './data/cluster'

export default function App() {
  const runningPods = pods.filter((pod) => pod.status === 'healthy').length

  return <div className="app-shell">
    <ClusterHeader cluster={cluster} />
    <main id="overview">
      <section className="hero"><div><p className="eyebrow eyebrow--accent">{cluster.environment} / {cluster.name}</p><h1>Engineering reliable platforms,<br /><em>from quality to cloud.</em></h1><p className="hero__copy">An interactive portfolio modeled as a healthy Kubernetes cluster. Explore the platform foundations as they take shape.</p></div><div className="hero__status"><span className="pulse-dot" /> <span>System status: all services operational</span></div></section>
      <section className="metrics" aria-label="Cluster metrics"><MetricCard label="Cluster health" value="100%" detail="All services available" /><MetricCard label="Active nodes" value={`${nodes.length}`} detail="Across 2 workload pools" /><MetricCard label="Running pods" value={`${runningPods}`} detail="Portfolio workloads online" /><MetricCard label="Platform focus" value="SRE" detail="Cloud-native engineering" /></section>
      <section className="content-grid"><Panel title="Cluster topology" action={<span className="panel__hint">3 nodes / {pods.length} pods</span>} className="topology"><div className="nodes">{nodes.map((node) => <Node key={node.id} node={node} podCount={pods.filter((pod) => pod.nodeId === node.id).length} />)}</div></Panel><Panel title="Recent events" action={<span className="panel__hint">Live stream</span>}><EventLog events={events} /></Panel></section>
      <section className="content-grid content-grid--bottom"><Panel title="Deployed workloads" action={<span className="panel__hint">Namespace: portfolio</span>}><div className="pods">{pods.map((pod) => <Pod key={pod.id} pod={pod} />)}</div></Panel><Panel title="Portfolio services"><div className="services">{profileSections.map((section, index) => <article key={section.id}><span>0{index + 1}</span><div><h3>{section.label}</h3><p>{section.summary}</p></div></article>)}</div></Panel></section>
    </main>
    <footer>zaheer-platform <span>•</span> production-ready foundation <span>•</span> © 2026</footer>
  </div>
}
