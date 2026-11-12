import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

interface Crumb {
  label: string
  to?: string
}

interface PlaceholderPageProps {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  description: ReactNode
  status?: string
  back: { label: string; to: string }
  children?: ReactNode
  aside?: ReactNode
}

/** Polished holding page for routes whose content is not ready yet. */
export function PlaceholderPage({ crumbs, eyebrow, title, description, status, back, children, aside }: PlaceholderPageProps) {
  return (
    <div className="w-full">
      <nav aria-label="Breadcrumb" className="pt-10 md:pt-14">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px] text-muted">
          {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-line-strong">/</span>}
              {c.to ? (
                <Link to={c.to} className="transition-colors hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink-soft">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className={`grid gap-12 pt-12 md:pt-16 ${aside ? 'xl:grid-cols-[1fr_320px] xl:gap-14' : ''}`}>
        <div className="max-w-[640px]">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-[34px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink md:text-[46px]">{title}</h1>
          {status && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-card py-1 pr-3 pl-2.5 font-mono text-[12px] text-ink-soft">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {status}
            </p>
          )}
          <div className="mt-6 text-[16.5px] leading-relaxed text-muted">{description}</div>
          {/* Actions: any page-specific button first, then the way back, on one aligned row. */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {children}
            <Link
              to={back.to}
              className="group inline-flex h-11 items-center gap-2 rounded-md border border-line-strong bg-card px-4 text-[14px] font-medium text-ink transition-colors duration-150 hover:border-ink"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              {back.label}
            </Link>
          </div>
        </div>
        {aside}
      </div>
    </div>
  )
}
