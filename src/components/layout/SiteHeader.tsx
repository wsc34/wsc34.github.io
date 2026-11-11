import { Link } from 'react-router'
import { site } from '../../content/site'
import { MainNavigation } from './MainNavigation'
import { ThemeToggle } from './ThemeToggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 supports-[backdrop-filter]:bg-paper/90 supports-[backdrop-filter]:backdrop-blur-sm">
      <div className="container-site flex flex-col md:h-16 md:flex-row md:items-center md:justify-between">
        <div className="flex h-14 items-center justify-between md:h-auto">
          <Link
            to="/"
            className="group inline-flex items-center font-mono text-[17px] font-medium tracking-tight text-ink"
            aria-label={`${site.name}, home`}
          >
            {site.name}
            <span
              aria-hidden="true"
              className="ml-[3px] inline-block h-[15px] w-[7px] translate-y-px bg-accent transition-opacity duration-200 group-hover:[animation:caret-blink_1s_steps(1)_infinite]"
            />
          </Link>
          {/* Small screens: toggle sits beside the logo. */}
          <ThemeToggle className="-mr-2 flex md:hidden" />
        </div>
        <div className="md:flex md:items-center md:gap-3">
          <MainNavigation />
          <ThemeToggle className="hidden md:flex" />
        </div>
      </div>
    </header>
  )
}
