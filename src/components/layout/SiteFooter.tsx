import { Link } from 'react-router'
import { navTabs, site } from '../../content/site'
import { contactLinks } from '../../content/profile'

export function SiteFooter() {
  const year = new Date().getFullYear()
  const liveLinks = contactLinks.filter((l) => l.href)

  return (
    <footer className="mt-28 border-t border-line">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link to="/" className="font-mono text-[15px] font-medium text-ink">
            {site.name}
          </Link>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">{site.footerLine}</p>
          <p className="mt-6 font-mono text-[12px] text-faint">
            © {year} {site.copyrightName}. Set in Inter, IBM Plex Mono & Newsreader.
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-14">
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-[14px] sm:grid-cols-1">
              {navTabs.map((t) => (
                <li key={t.to}>
                  <Link to={t.to} className="text-muted transition-colors hover:text-ink">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {liveLinks.length > 0 && (
            <ul className="grid gap-2 text-[14px]">
              {liveLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-muted transition-colors hover:text-ink" rel="me noopener">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
