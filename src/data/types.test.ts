import { describe, expect, it } from 'vitest'
import { podStatusLabel } from './types'

describe('podStatusLabel', () => {
  it('returns the generic status label when no override is set', () => {
    expect(podStatusLabel({ status: 'healthy' })).toBe('Running')
    expect(podStatusLabel({ status: 'pending' })).toBe('Rolling out')
  })

  it('prefers a pod-specific statusLabel override', () => {
    expect(podStatusLabel({ status: 'pending', statusLabel: 'Provisioning' })).toBe('Provisioning')
  })
})
