/**
 * Safely resolves public asset paths for GitHub Pages subpath deployment (/saish-portfolio/).
 * Guaranteed idempotent: passing an already-resolved path returns it unchanged.
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

  const base = import.meta.env.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base : base + '/'

  // If path already starts with base URL (e.g. '/saish-portfolio/'), return as-is
  if (cleanBase !== '/' && path.startsWith(cleanBase)) {
    return path
  }

  // Also check if path starts with base without leading slash (e.g. 'saish-portfolio/')
  const baseWithoutLeadingSlash = cleanBase.replace(/^\//, '')
  if (baseWithoutLeadingSlash && path.startsWith(baseWithoutLeadingSlash)) {
    return '/' + path
  }

  const cleanPath = path.replace(/^\.\//, '').replace(/^\//, '')
  return cleanBase + cleanPath
}
