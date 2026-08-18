import type { PortfolioPod } from '../data/types'
import { podStatusLabel } from '../data/types'
import { linkLabel } from '../data/linkLabel'
import { StatusBadge } from './StatusBadge'

// Renders `PortfolioPod.details` — labeled bullet lists for longer-form content
// (Responsibilities, Key achievements, Key technical decisions, What I learned) that
// doesn't fit the single-line metadata grid. Shared by PodDetail and ProjectPod.
export function DetailGroups({ groups }: { groups: NonNullable<PortfolioPod['details']> }) {
  return <div className="pod-detail__details">
    {groups.map((group) => (
      <div key={group.label} className="pod-detail__detail-group">
        <span className="eyebrow">{group.label}</span>
        <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    ))}
  </div>
}

export function PodDetail({ pod, nodeName }: { pod: PortfolioPod; nodeName: string }) {
  const label = podStatusLabel(pod)
  const isProvisioning = pod.kind === 'certification' && pod.status === 'pending'
  return <div className="pod-detail">
    <div className="pod-detail__heading"><div><p className="eyebrow">Pod / {pod.namespace}</p><h2>{pod.name}</h2></div><StatusBadge status={pod.status} label={label} /></div>
    <p className="pod-detail__summary">{pod.summary}</p>
    <dl className="pod-detail__metadata"><div><dt>Node</dt><dd>{nodeName}</dd></div><div><dt>Status</dt><dd className={`pod-detail__running pod-detail__running--${pod.status}`}><i />{label}</dd></div>{pod.metadata?.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
    {isProvisioning && <div className="provisioning-bar" role="progressbar" aria-label="Provisioning in progress"><i /><span>rollout in progress — not yet scheduled complete</span></div>}
    {pod.capabilities && <div className="capability-map"><span className="eyebrow">Capability map</span><div className="capability-map__groups">{pod.capabilities.map((group) => (
      <div key={group.apiGroup} className="capability-group">
        <span className="capability-group__label">kind: {group.apiGroup}</span>
        <div className="capability-group__items">{group.items.map((item) => <div key={item} className="capability-tile"><span>{item.slice(0, 1)}</span>{item}</div>)}</div>
      </div>
    ))}</div></div>}
    {pod.details && <DetailGroups groups={pod.details} />}
    <div className="pod-detail__stack"><span>Container capabilities</span><div>{pod.technologies.map((technology) => <b key={technology}>{technology}</b>)}</div></div>
    {pod.url && <a className="pod-detail__link" href={pod.url} target="_blank" rel="noreferrer noopener">{linkLabel(pod.url)}</a>}
  </div>
}
