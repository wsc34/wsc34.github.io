import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { SideColumn } from './SideColumn'

export function SiteLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader />
      {/* Side column (portfolio or tab index) + the page itself. */}
      <div className="container-site flex flex-1 flex-col lg:flex-row lg:gap-12">
        <SideColumn />
        <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
          {/* Keyed so each route fades in gently. */}
          <div key={pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  )
}
