import type { PortfolioPod } from '../data/types'
import { StatusBadge } from './StatusBadge'

export function PodDetail({ pod, nodeName }: { pod: PortfolioPod; nodeName: string }) {
  return <div className="pod-detail">
    <div className="pod-detail__heading"><div><p className="eyebrow">Pod / {pod.namespace}</p><h2>{pod.name}</h2></div><StatusBadge status={pod.status} label="Running" /></div>
    <p className="pod-detail__summary">{pod.summary}</p>
    <dl className="pod-detail__metadata"><div><dt>Node</dt><dd>{nodeName}</dd></div><div><dt>Status</dt><dd className="pod-detail__running"><i />Running</dd></div>{pod.metadata?.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
    <div className="pod-detail__stack"><span>Container capabilities</span><div>{pod.technologies.map((technology) => <b key={technology}>{technology}</b>)}</div></div>
  </div>
}
