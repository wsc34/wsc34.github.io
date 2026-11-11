import type { ReactNode } from 'react'

interface TimelineEntryProps {
  dates: string
  title: string
  subtitle?: string
  meta?: string
  children?: ReactNode
  last?: boolean
}

/** One entry in a vertical timeline (education or work), sized for the side column. */
export function TimelineEntry({ dates, title, subtitle, meta, children, last }: TimelineEntryProps) {
  return (
    <li className="relative pl-6">
      <span aria-hidden="true" className={`absolute top-[9px] left-[3px] w-px bg-line ${last ? 'h-0' : 'bottom-[-28px]'}`} />
      <span aria-hidden="true" className="absolute top-[6px] left-0 h-[7px] w-[7px] rounded-full border border-accent bg-paper" />
      <p className="font-mono text-[11.5px] leading-6 text-muted">{dates}</p>
      <h3 className="text-[15px] leading-6 font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      {subtitle && <p className="text-[14px] text-ink-soft">{subtitle}</p>}
      {meta && <p className="text-[13.5px] text-muted">{meta}</p>}
      {children && <div className="mt-2.5 text-[14px] leading-relaxed text-muted">{children}</div>}
    </li>
  )
}
