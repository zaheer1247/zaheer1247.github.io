import { useCallback, useEffect, useMemo, useState } from 'react'
import { bootResources, bootSequence, bootWorkloadTotal, type BootResourceState, type BootStep } from '../data/bootSequence'
import { nodes } from '../data/cluster'
import { markIntroComplete } from '../data/intro'

function initialResourceState(stepIndex: number, resource: string): BootResourceState {
  const match = bootSequence.slice(0, stepIndex + 1).filter((step) => step.resource === resource).at(-1)
  return match?.state ?? 'queued'
}

function formatElapsed(index: number) { return `00:${String(Math.min(index + 1, 59)).padStart(2, '0')}` }

export function ClusterBoot({ onComplete }: { onComplete: () => void }) {
  const [stepIndex, setStepIndex] = useState(0)
  const activeStep = bootSequence[stepIndex]
  const events = bootSequence.slice(0, stepIndex + 1)
  const progress = Math.round(((stepIndex + 1) / bootSequence.length) * 100)
  const systems = useMemo(() => bootResources.map((resource) => ({ ...resource, state: initialResourceState(stepIndex, resource.resource) })), [stepIndex])

  const finish = useCallback(() => { markIntroComplete(); onComplete() }, [onComplete])

  useEffect(() => {
    if (stepIndex >= bootSequence.length - 1) {
      const completion = window.setTimeout(finish, 1100)
      return () => window.clearTimeout(completion)
    }
    const next = window.setTimeout(() => setStepIndex((index) => index + 1), bootSequence[stepIndex + 1].after)
    return () => window.clearTimeout(next)
  }, [finish, stepIndex])

  return <main className="boot-screen" aria-label="Cluster boot sequence">
    <div className="boot-screen__ambient" />
    <header className="boot-header"><div className="brand"><span className="brand__mark">K</span><span>platform<span>/</span>portfolio</span></div><button className="skip-button" onClick={finish}>Skip intro <span>→</span></button></header>
    <section className="boot-layout">
      <div className="boot-intro"><p className="eyebrow eyebrow--accent">production cluster / boot sequence</p><h1>Bringing the platform<br /><em>online.</em></h1><p>Initializing the systems behind a cloud-native engineering portfolio.</p><div className="boot-progress"><div><span>{activeStep.phase}</span><b>{progress}%</b></div><i><i style={{ width: `${progress}%` }} /></i></div></div>
      <div className="boot-cluster" aria-live="polite"><div className="boot-cluster__top"><div><span className="eyebrow">Cluster</span><strong>zaheer-platform</strong></div><span className={`boot-state boot-state--${activeStep.state}`}>{activeStep.phase}</span></div><div className="boot-services">{systems.map((system) => <div key={system.label}><span className={`resource-dot resource-dot--${system.state}`} />{system.label}<small>{system.state === 'queued' ? 'Waiting' : 'Ready'}</small></div>)}</div><div className="boot-nodes"><p className="eyebrow">Worker nodes</p>{nodes.map((node, index) => { const state = stepIndex < 5 + index ? 'not-ready' : stepIndex < 7 + index ? 'initializing' : 'ready'; return <div key={node.id}><span className={`resource-dot resource-dot--${state}`} /><strong>{node.name} / {node.role}</strong><small>{state === 'not-ready' ? 'NotReady' : state === 'initializing' ? 'Initializing' : 'Ready'}</small></div> })}</div><div className="boot-workload"><span className={`resource-dot resource-dot--${stepIndex < 10 ? 'pending' : stepIndex < 12 ? 'creating' : 'running'}`} /><div><span>portfolio-workloads</span><small>{stepIndex < 10 ? 'Pending' : stepIndex < 12 ? 'ContainerCreating' : 'Running'}</small></div><b>{stepIndex < 10 ? `0/${bootWorkloadTotal}` : stepIndex < 12 ? `1/${bootWorkloadTotal}` : `${bootWorkloadTotal}/${bootWorkloadTotal}`}</b></div></div>
      <section className="boot-events"><header><span className="eyebrow">Live event stream</span><span className="boot-live"><i />streaming</span></header><ol>{events.slice(-7).map((event: BootStep, index) => <li key={event.id}><time>{formatElapsed(Math.max(0, stepIndex - 6 + index))}</time><span className="event-marker event-marker--success" /><div><strong>Normal <b>{event.reason}</b></strong><p>{event.message}</p><small>{event.resource}</small></div></li>)}</ol></section>
    </section>
    <footer className="boot-footer"><span>kubernetes {activeStep.kind} reconciliation</span><span>deterministic startup sequence</span></footer>
  </main>
}
