import { ArrowUpRight, Download } from 'lucide-react'
import type { ContactLink } from '../../content/types'

interface ContactSectionProps {
  links: ContactLink[]
  cvFile: string
}

export function ContactSection({ links, cvFile }: ContactSectionProps) {
  return (
    <div>
      <ul className="divide-y divide-line border-y border-line">
        {links.map((link) => {
          const isExternal = /^https?:/.test(link.href)
          return (
            <li key={link.label}>
              {link.href ? (
                <a
                  href={link.href}
                  {...(isExternal ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
                  className="group grid grid-cols-[76px_1fr_auto] items-center gap-3 py-2.5"
                >
                  <span className="font-mono text-[11.5px] text-muted">{link.label}</span>
                  <span className="truncate text-[14px] text-ink group-hover:text-accent">{link.value}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </a>
              ) : (
                <div className="grid grid-cols-[76px_1fr] items-center gap-3 py-2.5">
                  <span className="font-mono text-[11.5px] text-muted">{link.label}</span>
                  <span className="text-[14px] text-faint">{link.value || 'Not yet added'}</span>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <div className="mt-5">
        {cvFile ? (
          <a
            href={cvFile}
            download
            className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-[13.5px] font-medium text-paper transition-colors duration-150 hover:bg-accent-strong"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Download CV
          </a>
        ) : (
          <p className="inline-flex h-10 items-center gap-2 rounded-md border border-dashed border-line-strong px-4 text-[13.5px] text-muted">
            <Download aria-hidden="true" className="h-4 w-4 text-faint" />
            CV available on request
          </p>
        )}
      </div>
    </div>
  )
}
