import type { PortfolioPod } from '../data/types'
import { podStatusLabel } from '../data/types'
import { StatusBadge } from './StatusBadge'

export function Pod({ pod }: { pod: PortfolioPod }) {
  return <article className="pod-card"><div className="pod-card__icon">{pod.kind.slice(0, 1)}</div><div className="pod-card__content"><div><p className="eyebrow">{pod.namespace}</p><h3>{pod.title}</h3></div><p>{pod.summary}</p><div className="pod-card__footer"><span>{pod.technologies.slice(0, 2).join(' · ')}</span><StatusBadge status={pod.status} label={podStatusLabel(pod)} /></div></div></article>
}
