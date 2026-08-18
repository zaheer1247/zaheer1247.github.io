import type { ClusterEvent } from '../data/types'

export function EventLog({ events }: { events: ClusterEvent[] }) {
  return <ol className="event-log">{events.map((event) => <li key={event.id}><time>{event.timestamp}</time><span className={`event-marker event-marker--${event.level}`} /><div><strong>{event.reason}</strong><p>{event.message}</p><small>{event.resource}</small></div></li>)}</ol>
}
