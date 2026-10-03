/**
 * Safely resolves public asset paths for GitHub Pages subpath deployment (/saish-portfolio/).
 */
export function getPublicUrl(path: string): string {
  if (!path) return ''
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:')
  ) {
    return path
  }

  const cleanPath = path.replace(/^\.\//, '').replace(/^\//, '')
  const base = import.meta.env.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base : base + '/'

  return cleanBase + cleanPath
}
