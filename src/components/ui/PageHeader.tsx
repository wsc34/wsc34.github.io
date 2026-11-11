import type { ReactNode } from 'react'

interface PageHeaderProps {
  index: string
  label: string
  title: string
  intro?: string
  children?: ReactNode
}

/** Consistent title block used at the top of each tab. */
export function PageHeader({ index, label, title, intro, children }: PageHeaderProps) {
  return (
    <header className="pt-14 pb-10 md:pt-20 md:pb-12">
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
        <span>{label}</span>
      </p>
      <h1 className="mt-5 max-w-3xl text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] text-ink md:text-[48px]">
        {title}
      </h1>
      {intro && <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted">{intro}</p>}
      {children}
    </header>
  )
}
