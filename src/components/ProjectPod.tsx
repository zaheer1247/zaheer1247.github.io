import type { PortfolioPod } from '../data/types'
import { podStatusLabel } from '../data/types'
import { StatusBadge } from './StatusBadge'
import { DetailGroups } from './PodDetail'
import { linkLabel } from '../data/linkLabel'

// Detail view for kind: 'project' pods — reused across every deployed project workload.
// Presents the project like an inspected Kubernetes workload (heading + status, an
// architecture flow instead of a resume-style description, technologies, and the real
// technical-decision / outcome write-up) rather than a generic portfolio card.
export function ProjectPod({ pod, nodeName }: { pod: PortfolioPod; nodeName: string }) {
  const label = podStatusLabel(pod)
  return <div className="pod-detail project-pod">
    <div className="pod-detail__heading"><div><p className="eyebrow">Workload / {pod.namespace}</p><h2>{pod.name}</h2></div><StatusBadge status={pod.status} label={label} /></div>
    <p className="pod-detail__summary">{pod.summary}</p>
    <dl className="pod-detail__metadata"><div><dt>Node</dt><dd>{nodeName}</dd></div><div><dt>Status</dt><dd className={`pod-detail__running pod-detail__running--${pod.status}`}><i />{label}</dd></div>{pod.metadata?.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>

    {pod.architecture && <div className="architecture-flow">
      <span className="eyebrow">Architecture</span>
      <ol>{pod.architecture.map((stage, index) => (
        <li key={stage}>
          <span className="architecture-flow__index">{String(index + 1).padStart(2, '0')}</span>
          <span className="architecture-flow__stage">{stage}</span>
          {index < pod.architecture!.length - 1 && <span className="architecture-flow__arrow" aria-hidden="true">↓</span>}
        </li>
      ))}</ol>
    </div>}

    {pod.details && <DetailGroups groups={pod.details} />}

    <div className="pod-detail__stack"><span>Technologies</span><div>{pod.technologies.map((technology) => <b key={technology}>{technology}</b>)}</div></div>

    {pod.url && <a className="pod-detail__action" href={pod.url} target="_blank" rel="noreferrer noopener">{linkLabel(pod.url)}</a>}
  </div>
}
