import { PlaceholderPage } from '../components/ui/PlaceholderPage'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <PlaceholderPage
      crumbs={[{ label: 'wsc34', to: '/' }, { label: '404' }]}
      eyebrow="Error 404"
      title="This page could not be found"
      description={<p>The link may be out of date, or the page may have moved. Try one of the main sections above.</p>}
      back={{ label: 'Back to the homepage', to: '/' }}
    />
  )
}
