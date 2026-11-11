import type { ReactNode } from 'react'

interface CVSectionProps {
  id: string
  number: string
  title: string
  children: ReactNode
}

/** A CV section in the side column: numbered label above its content. */
export function CVSection({ id, number, title, children }: CVSectionProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="border-t border-line py-7">
      <p className="font-mono text-[11.5px] text-accent">{number}</p>
      <h2 id={`${id}-title`} className="mt-1 scroll-mt-24 text-[15.5px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h2>
      <div className="mt-4 min-w-0">{children}</div>
    </section>
  )
}
