import { Fragment } from 'react'
import { useSearchParams } from 'react-router'
import type { CurriculumPageContent } from '../content/types'
import { PageHeader } from '../components/ui/PageHeader'
import { CurriculumCard, CurriculumPanel } from '../components/curriculum/CurriculumAccordion'
import { LinkCard } from '../components/curriculum/LinkCard'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/**
 * Shared landing page for A Level and GCSE. Open panels are stored in the URL
 * (?open=aqa-7517) so returning from a topic page restores the same state.
 */
export function CurriculumPage({ content }: { content: CurriculumPageContent }) {
  useDocumentTitle(content.title, content.intro)
  const [params, setParams] = useSearchParams()
  const openSet = new Set((params.get('open') ?? '').split(',').filter(Boolean))

  const toggle = (slug: string) => {
    const next = new Set(openSet)
    if (next.has(slug)) next.delete(slug)
    else next.add(slug)
    setParams(
      (prev) => {
        const p = new URLSearchParams(prev)
        if (next.size) p.set('open', [...next].join(','))
        else p.delete('open')
        return p
      },
      { replace: true, preventScrollReset: true },
    )
  }

  return (
    <div className="container-site">
      <PageHeader
        index={content.index}
        label={content.level === 'a-level' ? 'A Level' : 'GCSE'}
        title={content.title}
        intro={content.intro}
      />

      {/* Cards sit side by side on desktop; each panel spans the full width beneath them.
          On mobile the DOM order (card, panel, card, panel) gives a natural accordion. */}
      <div className="grid gap-x-6 md:grid-cols-2">
        {content.entries.map((entry, i) => (
          <Fragment key={i}>
            <div className="mb-4 md:mb-0">
              {entry.kind === 'board' ? (
                <CurriculumCard
                  board={entry.board}
                  open={openSet.has(entry.board.slug)}
                  onToggle={() => toggle(entry.board.slug)}
                />
              ) : (
                <LinkCard card={entry.card} />
              )}
            </div>
            {entry.kind === 'board' && <CurriculumPanel board={entry.board} open={openSet.has(entry.board.slug)} />}
          </Fragment>
        ))}
      </div>

      {content.note && (
        <p className="mt-8 max-w-[70ch] font-mono text-[12px] leading-relaxed text-faint">{content.note}</p>
      )}
    </div>
  )
}
