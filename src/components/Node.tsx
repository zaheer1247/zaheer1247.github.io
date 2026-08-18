import type { ClusterNode } from '../data/types'
import { StatusBadge } from './StatusBadge'

export function Node({ node, podCount }: { node: ClusterNode; podCount: number }) {
  return <article className="node-card"><div className="node-card__top"><div><p className="eyebrow">{node.role}</p><h3>{node.name}</h3></div><StatusBadge status={node.status} label="Ready" /></div><div className="node-card__labels">{node.labels.map((label) => <span key={label}>{label}</span>)}</div><div className="usage"><span>CPU <b>{node.usage.cpu}%</b></span><div><i style={{ width: `${node.usage.cpu}%` }} /></div><span>Memory <b>{node.usage.memory}%</b></span><div><i style={{ width: `${node.usage.memory}%` }} /></div></div><footer><span>{podCount} pods running</span><span>{node.usage.pods}/{node.capacity.pods} capacity</span></footer></article>
}
