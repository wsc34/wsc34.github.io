import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Link, useLocation, useSearchParams } from 'react-router'
import type { ArticleCollection, CurriculumBoard, CurriculumPageContent } from '../../content/types'
import { aLevelPage, gcsePage, levelLabels, topicHref } from '../../content/curriculum'
import { articleHref, articlesByCollection, collectionHref, collections } from '../../content/articles'
import { navTabs } from '../../content/site'

/* ------------------------------------------------------------------ */
/*  Which index belongs to the current URL                            */
/* ------------------------------------------------------------------ */

type IndexTarget =
  | { kind: 'curriculum'; content: CurriculumPageContent }
  | { kind: 'collection'; collection: ArticleCollection }
  | { kind: 'site' }

function under(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export function indexTargetFor(pathname: string): IndexTarget {
  if (under(pathname, ['/a-level', '/resources/a-level'])) return { kind: 'curriculum', content: aLevelPage }
  if (under(pathname, ['/gcse', '/resources/gcse', '/python-emulator'])) return { kind: 'curriculum', content: gcsePage }
  if (under(pathname, ['/super-curricular'])) return { kind: 'collection', collection: 'super-curricular' }
  if (under(pathname, ['/personal'])) return { kind: 'collection', collection: 'personal' }
  return { kind: 'site' }
}

export function indexTitleFor(pathname: string) {
  const t = indexTargetFor(pathname)
  if (t.kind === 'curriculum') return levelLabels[t.content.level].label
  if (t.kind === 'collection') return collections[t.collection].title
  return 'Site'
}

/* ------------------------------------------------------------------ */
/*  Shared link styling                                               */
/* ------------------------------------------------------------------ */

function itemClass(active: boolean) {
  return `-ml-px flex gap-2.5 border-l py-1.5 pl-3 text-[13.5px] leading-snug transition-colors duration-150 ${
    active ? 'border-ink font-medium text-ink' : 'border-transparent text-muted hover:border-line-strong hover:text-ink'
  }`
}

/* ------------------------------------------------------------------ */
/*  Index contents                                                    */
/* ------------------------------------------------------------------ */

function BoardIndex({ board }: { board: CurriculumBoard }) {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const levelPath = levelLabels[board.level].path
  const boardPrefix = `/resources/${board.level}/${board.slug}/`
  const containsActive = pathname.startsWith(boardPrefix)
  const openInPage = pathname === levelPath && (params.get('open') ?? '').split(',').includes(board.slug)
  const [open, setOpen] = useState(containsActive || openInPage)

  // Follow the page: expand when the reader moves into this board.
  useEffect(() => {
    if (containsActive || openInPage) setOpen(true)
  }, [containsActive, openInPage])

  const listId = `index-${board.slug}`
  const showGroupTitles = board.groups.length > 1

  return (
    <li>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${board.board} ${board.code} topics`}
          onClick={() => setOpen((v) => !v)}
          className="-ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-faint transition-colors hover:bg-wash hover:text-ink"
        >
          <ChevronRight aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
        </button>
        <Link
          to={`${levelPath}?open=${board.slug}`}
          className={`text-[14px] font-semibold tracking-[-0.01em] transition-colors hover:text-accent ${containsActive ? 'text-ink' : 'text-ink-soft'}`}
        >
          {board.board} <span className="font-mono text-[12.5px] font-normal text-muted">{board.code}</span>
        </Link>
      </div>

      <div id={listId} className="collapse-grid" data-open={open} inert={!open}>
        <div>
          <div className="mt-1.5 mb-3 ml-2.5 space-y-3">
            {board.groups.map((group, gi) => (
              <div key={gi}>
                {showGroupTitles && group.title && (
                  <p className="mb-1 pl-3 font-mono text-[10.5px] tracking-[0.04em] text-faint uppercase">{group.title}</p>
                )}
                <ul className="border-l border-line">
                  {group.topics.map((t) => {
                    const href = topicHref(board, t)
                    const active = pathname === href
                    return (
                      <li key={t.slug}>
                        <Link to={href} aria-current={active ? 'page' : undefined} className={itemClass(active)}>
                          <span className="w-8 shrink-0 font-mono text-[11.5px] leading-[1.55] text-faint">{t.number}</span>
                          <span className="min-w-0">{t.title}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}

function CurriculumIndex({ content }: { content: CurriculumPageContent }) {
  const { pathname } = useLocation()
  return (
    <ul className="space-y-1.5">
      {content.entries.map((entry, i) =>
        entry.kind === 'board' ? (
          <BoardIndex key={entry.board.slug} board={entry.board} />
        ) : (
          <li key={i}>
            <Link
              to={entry.card.to}
              aria-current={pathname === entry.card.to ? 'page' : undefined}
              className={`flex h-7 items-center gap-2 pl-[26px] text-[14px] font-semibold tracking-[-0.01em] transition-colors hover:text-accent ${
                pathname === entry.card.to ? 'text-ink' : 'text-ink-soft'
              }`}
            >
              {entry.card.title}
              <span className="font-mono text-[11.5px] font-normal text-muted">{entry.card.eyebrow}</span>
            </Link>
          </li>
        ),
      )}
    </ul>
  )
}

function CollectionIndex({ collection }: { collection: ArticleCollection }) {
  const { pathname } = useLocation()
  const articles = articlesByCollection[collection]
  return (
    <div className="space-y-4">
      <ul className="border-l border-line">
        {collection === 'personal' && (
          <li>
            <Link to="/" className={itemClass(false)}>
              Profile
            </Link>
          </li>
        )}
        <li>
          <Link to={collectionHref(collection)} className={itemClass(false)}>
            All articles
          </Link>
        </li>
      </ul>
      <div>
        <p className="mb-1 font-mono text-[10.5px] tracking-[0.04em] text-faint uppercase">Articles</p>
        <ul className="border-l border-line">
          {articles.map((a) => {
            const href = articleHref(a)
            const active = pathname === href
            return (
              <li key={a.slug}>
                <Link to={href} aria-current={active ? 'page' : undefined} className={itemClass(active)}>
                  {a.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function SiteIndex() {
  return (
    <ul className="border-l border-line">
      {navTabs.map((t) => (
        <li key={t.to}>
          <Link to={t.to} className={itemClass(false)}>
            {t.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** The index for whichever tab the current page belongs to. */
export function IndexMenu() {
  const { pathname } = useLocation()
  const target = indexTargetFor(pathname)
  if (target.kind === 'curriculum') return <CurriculumIndex content={target.content} />
  if (target.kind === 'collection') return <CollectionIndex collection={target.collection} />
  return <SiteIndex />
}
