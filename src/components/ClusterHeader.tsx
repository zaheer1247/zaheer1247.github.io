import type { ClusterConfig } from '../data/types'
import { StatusBadge } from './StatusBadge'

export function ClusterHeader({ cluster, onReplayBoot }: { cluster: ClusterConfig; onReplayBoot: () => void }) {
  return <header className="cluster-header"><a className="brand" href="#overview"><span className="brand__mark">K</span><span>platform<span>/</span>portfolio</span></a><div className="cluster-header__meta"><span className="hide-mobile">{cluster.region}</span><span className="hide-mobile">{cluster.version}</span><StatusBadge status={cluster.status} label="Cluster healthy" /><button type="button" className="replay-boot" onClick={onReplayBoot} aria-label="Replay boot sequence">↺<span className="hide-mobile"> Boot sequence</span></button></div></header>
}
