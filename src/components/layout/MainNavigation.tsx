import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { navTabs } from '../../content/site'

function isActive(pathname: string, match: readonly string[]) {
  return match.some((m) => (m === '/' ? pathname === '/' : pathname === m || pathname.startsWith(`${m}/`)))
}

/**
 * Route-based navigation. Uses <nav> + links with aria-current (the correct
 * semantics for navigation that changes the URL), with a sliding indicator.
 */
export function MainNavigation() {
  const { pathname } = useLocation()
  const listRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  const [animate, setAnimate] = useState(false)

  const activeIndex = navTabs.findIndex((t) => isActive(pathname, t.match))

  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeIndex]
      if (!el) return setIndicator(null)
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    // Keep the active tab visible in the horizontally scrolling mobile bar.
    const el = linkRefs.current[activeIndex]
    const list = listRef.current
    if (el && list && list.scrollWidth > list.clientWidth) {
      const target = el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2
      list.scrollTo({ left: target, behavior: animate ? 'smooth' : 'auto' })
    }
    const ro = new ResizeObserver(measure)
    if (list) ro.observe(list)
    document.fonts?.ready.then(measure)
    // Enable the slide transition only after the first placement.
    const id = requestAnimationFrame(() => setAnimate(true))
    return () => {
      ro.disconnect()
      cancelAnimationFrame(id)
    }
  }, [activeIndex, animate])

  return (
    <nav aria-label="Main" className="-mx-5 md:mx-0">
      <ul
        ref={listRef}
        className="relative flex gap-1 overflow-x-auto px-3 [scrollbar-width:none] md:gap-0.5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {navTabs.map((tab, i) => {
          const active = i === activeIndex
          return (
            <li key={tab.to} className="shrink-0">
              <Link
                ref={(el) => {
                  linkRefs.current[i] = el
                }}
                to={tab.to}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-11 items-center rounded-sm px-2.5 text-[14px] whitespace-nowrap transition-colors duration-150 md:h-16 md:px-3 ${
                  active ? 'font-medium text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <span className="relative">
                  {tab.label}
                </span>
              </Link>
            </li>
          )
        })}
        {indicator && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 h-[2px] bg-ink"
            style={{
              left: indicator.left + 10,
              width: indicator.width - 20,
              transition: animate ? 'left 240ms var(--ease-out-soft), width 240ms var(--ease-out-soft)' : 'none',
            }}
          />
        )}
      </ul>
    </nav>
  )
}
