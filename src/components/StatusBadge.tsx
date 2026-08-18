import type { HealthStatus } from '../data/types'

export function StatusBadge({ status, label }: { status: HealthStatus; label?: string }) {
  return <span className={`status-badge status-badge--${status}`}><i />{label ?? status}</span>
}
