const introStorageKey = 'zaheer-platform-intro-complete'

export function hasCompletedIntro() {
  return window.localStorage.getItem(introStorageKey) === 'true'
}

export function markIntroComplete() {
  window.localStorage.setItem(introStorageKey, 'true')
}
