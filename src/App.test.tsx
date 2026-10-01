import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { markIntroComplete } from './data/intro'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
    markIntroComplete()
    window.history.replaceState(null, '', '/')
  })

  it('renders the dashboard with the default profile pod selected', () => {
    render(<App />)
    expect(screen.getByText('Cluster topology')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'profile-pod' })).toBeInTheDocument()
    expect(screen.getByText('Building toward reliable cloud platforms.')).toBeInTheDocument()
  })

  it('selects the node/pod from the URL query string on load', () => {
    window.history.replaceState(null, '', '/?node=projects&pod=k8s-ai-agent')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'k8s-ai-agent' })).toBeInTheDocument()
  })

  it('surfaces years of experience and a resume download in the hero', () => {
    const { container } = render(<App />)
    const hero = within(container.querySelector('.hero') as HTMLElement)
    expect(hero.getByText('11+ years')).toBeInTheDocument()
    expect(hero.getByText('DevOps / SRE')).toBeInTheDocument()
    const resumeLink = hero.getByRole('link', { name: /download resume/i })
    expect(resumeLink).toHaveAttribute('href', '/zaheer-abbas-resume.pdf')
  })
})
