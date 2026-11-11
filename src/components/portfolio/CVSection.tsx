import type { ReactNode } from 'react'

interface CVSectionProps {
  id: string
  number: string
  title: string
  children: ReactNode
}

/**
 * A CV section: numbered label in the left column, content on the right.
 * Collapses to a single column on small screens.
 */
export function CVSection({ id, number, title, children }: CVSectionProps) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="grid gap-6 border-t border-line py-12 md:grid-cols-[220px_1fr] md:gap-10 md:py-14"
    >
      <div>
        <p className="font-mono text-[12px] text-accent">{number}</p>
        <h2 id={`${id}-title`} className="mt-1.5 text-[19px] font-semibold tracking-[-0.015em] text-ink">
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
