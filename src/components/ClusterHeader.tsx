import type { ClusterConfig } from '../data/types'
import { StatusBadge } from './StatusBadge'

export function ClusterHeader({ cluster }: { cluster: ClusterConfig }) {
  return <header className="cluster-header"><a className="brand" href="#overview"><span className="brand__mark">K</span><span>platform<span>/</span>portfolio</span></a><div className="cluster-header__meta"><span className="hide-mobile">{cluster.region}</span><span className="hide-mobile">{cluster.version}</span><StatusBadge status={cluster.status} label="Cluster healthy" /></div></header>
}
