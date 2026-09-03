import { render, screen } from '@testing-library/react'
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
    expect(screen.getByText('Quality Engineer III building toward reliable cloud platforms.')).toBeInTheDocument()
  })

  it('selects the node/pod from the URL query string on load', () => {
    window.history.replaceState(null, '', '/?node=projects&pod=k8s-ai-agent')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'k8s-ai-agent' })).toBeInTheDocument()
  })
})
