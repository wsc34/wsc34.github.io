import { useEffect, useState } from 'react'
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useLocation } from 'react-router'
import { PortfolioColumn } from '../portfolio/PortfolioColumn'
import { IndexMenu, indexTitleFor } from './IndexMenu'
import { DESKTOP_QUERY, useMediaQuery } from '../../lib/useMediaQuery'

/* Column widths on desktop (px). The width animates between them, which is
   what makes the portfolio "morph" into the index when you change tab. */
const WIDTH = { profile: 312, index: 248, collapsed: 44 }
const STORAGE_KEY = 'wsc34.index-collapsed'

function readCollapsed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Left-hand column shared by every page.
 * - On the Personal home page it shows the portfolio.
 * - On every other page it becomes a collapsible index for that tab.
 * On small screens the portfolio stacks above the articles and the index
 * becomes a "Contents" drop-down at the top of the page.
 */
export function SideColumn() {
  const { pathname } = useLocation()
  const desktop = useMediaQuery(DESKTOP_QUERY)
  const mode = pathname === '/' ? 'profile' : 'index'
  const [collapsed, setCollapsed] = useState(readCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMobileOpen(false), [pathname])

  const toggleCollapsed = () => {
    setCollapsed((v) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, v ? '0' : '1')
      } catch {
        /* storage unavailable: keep the in-memory state only */
      }
      return !v
    })
  }

  const title = indexTitleFor(pathname)

  /* ---------------- Small screens ---------------- */
  if (!desktop) {
    if (mode === 'profile') {
      return (
        <aside aria-label="Profile" className="pt-10">
          <PortfolioColumn desktop={false} />
        </aside>
      )
    }
    return (
      <nav aria-label={`${title} index`} className="mt-4 rounded-md border border-line bg-card">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-index"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-11 w-full items-center justify-between px-4 text-[14px]"
        >
          <span>
            <span className="eyebrow mr-2">Index</span>
            <span className="font-medium text-ink">{title}</span>
          </span>
          <ChevronDown aria-hidden="true" className={`h-4 w-4 text-muted transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>
        <div id="mobile-index" className="collapse-grid" data-open={mobileOpen} inert={!mobileOpen}>
          <div>
            <div className="max-h-[60dvh] overflow-y-auto border-t border-line px-4 pt-4 pb-5">
              <IndexMenu />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  /* ---------------- Desktop ---------------- */
  const isCollapsed = mode === 'index' && collapsed
  const width = mode === 'profile' ? WIDTH.profile : isCollapsed ? WIDTH.collapsed : WIDTH.index

  return (
    <aside
      aria-label={mode === 'profile' ? 'Profile' : `${title} index`}
      className="shrink-0 overflow-x-clip border-r border-line transition-[width] duration-300 ease-[var(--ease-out-soft)]"
      style={{ width }}
    >
      <div
        className={
          mode === 'index'
            ? 'sticky top-16 max-h-[calc(100dvh-4rem)] overflow-x-hidden overflow-y-auto overscroll-contain pt-14 pr-6 pb-10 pl-1 [scrollbar-width:thin]'
            : 'pt-14 pr-8 pb-10'
        }
      >
        {/* Keyed so the contents fade in as the column changes shape. */}
        <div key={`${mode}-${isCollapsed}`} className="side-fade" style={{ width: Math.max(width - (mode === 'index' ? 28 : 32), 32) }}>
          {mode === 'profile' ? (
            <PortfolioColumn desktop />
          ) : isCollapsed ? (
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-expanded={false}
              aria-label={`Show ${title} index`}
              title="Show index"
              className="-ml-1.5 flex h-8 w-8 items-center justify-center rounded-sm text-muted transition-colors hover:bg-wash hover:text-ink"
            >
              <PanelLeftOpen aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between gap-2">
                <p className="eyebrow">
                  Index <span className="text-line-strong">/</span> <span className="text-ink-soft">{title}</span>
                </p>
                <button
                  type="button"
                  onClick={toggleCollapsed}
                  aria-expanded={true}
                  aria-label={`Hide ${title} index`}
                  title="Hide index"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-wash hover:text-ink"
                >
                  <PanelLeftClose aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              <IndexMenu />
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
