import type { ReactNode } from 'react'

interface TimelineEntryProps {
  dates: string
  title: string
  subtitle?: string
  meta?: string
  children?: ReactNode
  last?: boolean
}

/** One entry in a vertical timeline (education or work). */
export function TimelineEntry({ dates, title, subtitle, meta, children, last }: TimelineEntryProps) {
  return (
    <li className="relative grid gap-1 pl-7 sm:grid-cols-[150px_1fr] sm:gap-8 sm:pl-0">
      {/* Timeline rail & node: on the left edge on mobile, between columns on desktop */}
      <span
        aria-hidden="true"
        className={`absolute top-[9px] left-[3px] w-px bg-line sm:left-[166px] ${last ? 'h-0' : 'bottom-[-40px]'}`}
      />
      <span
        aria-hidden="true"
        className="absolute top-[6px] left-0 h-[7px] w-[7px] rounded-full border border-accent bg-paper sm:left-[163px]"
      />
      <p className="font-mono text-[12.5px] leading-6 text-muted">{dates}</p>
      <div className="sm:pl-6">
        <h3 className="text-[16.5px] leading-6 font-semibold tracking-[-0.01em] text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[15px] text-ink-soft">{subtitle}</p>}
        {meta && <p className="mt-0.5 text-[14px] text-muted">{meta}</p>}
        {children && <div className="mt-3 text-[15px] leading-relaxed text-muted">{children}</div>}
      </div>
    </li>
  )
}
