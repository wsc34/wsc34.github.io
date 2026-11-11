import { useEffect } from 'react'
import { site } from '../content/site'

/** Sets the browser tab title and meta description for the current page. */
export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.titleSuffix}` : `${site.name} — Portfolio & Computer Science Resources`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description ?? site.description)
  }, [title, description])
}

export function formatDate(iso?: string) {
  if (!iso) return undefined
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
