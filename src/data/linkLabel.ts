// Labels an external pod.url based on where it actually points, so a LinkedIn write-up is
// never mislabeled as a GitHub repo. Kept in its own module (not a .tsx component file) so
// it doesn't trip the react-refresh "only export components" lint rule.
export function linkLabel(url: string): string {
  if (url.includes('github.com')) return 'View on GitHub ↗'
  if (url.includes('linkedin.com')) return 'Read the write-up ↗'
  return 'View source ↗'
}
