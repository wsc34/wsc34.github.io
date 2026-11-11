import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { adjacentTopics, findTopic, levelLabels, topicHref } from '../content/curriculum'
import { PlaceholderPage } from '../components/ui/PlaceholderPage'
import { NotFoundPage } from './NotFoundPage'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/**
 * Resource page for a single syllabus topic. If the topic has a
 * `documentUrl` it links to it; otherwise it shows "Resource coming soon".
 */
export function ResourcePage() {
  const { level = '', board: boardSlug = '', topic: topicSlug = '' } = useParams()
  const found = findTopic(level, boardSlug, topicSlug)
  useDocumentTitle(found ? `${found.topic.title} · ${found.board.board} ${found.board.code}` : 'Resource not found')

  if (!found) return <NotFoundPage />
  const { board, group, topic } = found
  const levelInfo = levelLabels[board.level]
  const backTo = `${levelInfo.path}?open=${board.slug}`
  const { prev, next } = adjacentTopics(board, topic.slug)

  return (
    <PlaceholderPage
      crumbs={[
        { label: levelInfo.label, to: backTo },
        { label: `${board.board} ${board.code}`, to: backTo },
        { label: topic.number },
      ]}
      eyebrow={`${board.board} ${board.code} · ${topic.number}${group.title ? ` · ${group.title}` : ''}`}
      title={topic.title}
      status={topic.documentUrl ? undefined : 'Resource coming soon'}
      description={
        topic.documentUrl ? (
          <p>{topic.description ?? 'Notes and materials for this topic.'}</p>
        ) : (
          <p>
            {topic.description && <span className="block text-ink-soft">{topic.description}.</span>}
            Notes, worked examples and practice questions for this topic are being prepared. Check back soon.
          </p>
        )
      }
      back={{ label: `Back to ${board.board} ${board.code}`, to: backTo }}
      aside={
        <nav aria-label="Other topics" className="self-start rounded-lg border border-line bg-card p-6">
          <p className="eyebrow">Continue browsing</p>
          <ul className="mt-4 divide-y divide-line">
            {[
              prev && { label: 'Previous', t: prev },
              next && { label: 'Next', t: next },
            ]
              .filter((x): x is { label: string; t: NonNullable<typeof prev> } => Boolean(x))
              .map(({ label, t }) => (
                <li key={label}>
                  <Link to={topicHref(board, t)} className="group flex items-center justify-between gap-4 py-3.5">
                    <span className="min-w-0">
                      <span className="block font-mono text-[11.5px] text-faint">
                        {label} · {t.number}
                      </span>
                      <span className="mt-0.5 block truncate text-[15px] font-medium text-ink group-hover:text-accent">
                        {t.title}
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      }
    >
      {topic.documentUrl && (
        <a
          href={topic.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-[14px] font-medium text-paper transition-colors hover:bg-accent-strong"
        >
          Open resource
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
      )}
    </PlaceholderPage>
  )
}
