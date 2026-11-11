import { Plus } from 'lucide-react'
import type { CurriculumBoard } from '../../content/types'
import { topicHref } from '../../content/curriculum'
import { TopicLink } from './TopicLink'

interface CurriculumAccordionProps {
  board: CurriculumBoard
  open: boolean
  onToggle: () => void
}

/**
 * Exam-board card (accordion trigger). The matching panel is rendered
 * separately by <CurriculumPanel> so that cards can sit side by side on
 * desktop while the expanded topic list uses the full content width.
 */
export function CurriculumCard({ board, open, onToggle }: CurriculumAccordionProps) {
  const topicCount = board.groups.reduce((n, g) => n + g.topics.length, 0)

  return (
    <h2 className="h-full">
      <button
        type="button"
        id={`${board.slug}-trigger`}
        aria-expanded={open}
        aria-controls={`${board.slug}-panel`}
        onClick={onToggle}
        className={`group relative flex h-full w-full flex-col rounded-lg border bg-card p-6 text-left transition-[border-color,box-shadow] duration-200 md:p-8 ${
          open
            ? 'border-ink shadow-[0_1px_0_0_var(--color-ink)]'
            : 'border-line hover:border-line-strong hover:shadow-[0_6px_24px_-12px_rgba(23,23,23,0.18)]'
        }`}
      >
        <span className="flex items-start justify-between gap-6">
          <span className="eyebrow">{board.board}</span>
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
              open ? 'rotate-45 border-ink bg-ink text-paper' : 'border-line-strong text-ink group-hover:border-ink'
            }`}
          >
            <Plus className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </span>
        <span className="mt-6 block font-mono text-[44px] leading-none font-medium tracking-[-0.04em] text-ink md:mt-10 md:text-[56px]">
          {board.code}
        </span>
        <span className="sr-only"> {board.qualification}</span>
        <span className="mt-4 block max-w-[46ch] text-[15px] leading-relaxed font-normal text-muted">
          {board.description}
        </span>
        <span className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-4 font-mono text-[12px] font-normal text-muted md:mt-auto md:pt-5">
          <span>{topicCount} topics</span>
          {board.facts?.map((f) => (
            <span key={f} className="flex items-center gap-4">
              <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
              {f}
            </span>
          ))}
          <span className="ml-auto text-ink-soft">{open ? 'Hide topics' : 'View topics'}</span>
        </span>
      </button>
    </h2>
  )
}

export function CurriculumPanel({ board, open }: { board: CurriculumBoard; open: boolean }) {
  const longGroups = board.groups.some((g) => g.topics.length > 6)
  return (
    <div
      id={`${board.slug}-panel`}
      role="region"
      aria-labelledby={`${board.slug}-trigger`}
      data-open={open}
      inert={!open}
      className="collapse-grid md:order-1 md:col-span-2"
    >
      <div>
        <div className="mt-4 mb-2 rounded-lg border border-line bg-card px-6 py-6 md:mt-6 md:mb-4 md:px-10 md:py-9">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-5">
            <p className="text-[15px] font-semibold text-ink">
              {board.board} <span className="font-mono font-medium">{board.code}</span>
              <span className="font-normal text-muted">: syllabus topics</span>
            </p>
            {board.specUrl && (
              <a
                href={board.specUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Official specification ↗
              </a>
            )}
          </div>

          {/* Long groups get full-width, two-column lists; many short groups sit in a grid. */}
          <div className={`mt-6 grid gap-x-14 gap-y-8 ${longGroups ? '' : 'lg:grid-cols-2'}`}>
            {board.groups.map((group, gi) => (
              <div key={gi}>
                {group.title && <h3 className="eyebrow mb-2">{group.title}</h3>}
                <ul className={longGroups ? 'lg:columns-2 lg:gap-14' : undefined}>
                  {group.topics.map((t) => (
                    <li key={t.slug} className="break-inside-avoid">
                      <TopicLink topic={t} to={topicHref(board, t)} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
