import type { Article } from '../../content/types'
import { formatDate } from '../../lib/useDocumentTitle'

/** Category · date · reading time, in small monospace. */
export function ArticleMeta({
  article,
  className = '',
  compact = false,
}: {
  article: Article
  className?: string
  /** Hide reading time (used on grid cards). */
  compact?: boolean
}) {
  const date = formatDate(article.date)
  const parts = [
    article.category && <span key="c" className="text-accent">{article.category}</span>,
    date && (
      <time key="d" dateTime={article.date}>
        {date}
      </time>
    ),
    !compact && article.readingMinutes && <span key="r">{article.readingMinutes} min read</span>,
  ].filter(Boolean)

  if (!parts.length) return null
  return (
    <p className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[12px] tracking-[0.01em] text-muted ${className}`}>
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-2.5">
          {i > 0 && <span aria-hidden="true" className="text-line-strong">/</span>}
          {p}
        </span>
      ))}
    </p>
  )
}
