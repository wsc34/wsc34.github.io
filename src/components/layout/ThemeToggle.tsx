import { Moon, Sun } from 'lucide-react'
import { setTheme, useTheme } from '../../lib/theme'

/** Switches between light and dark. Until clicked, the site follows the system setting. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={`h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-wash hover:text-ink ${className}`}
    >
      {theme === 'dark' ? (
        <Sun aria-hidden="true" className="h-[17px] w-[17px]" strokeWidth={1.75} />
      ) : (
        <Moon aria-hidden="true" className="h-[17px] w-[17px]" strokeWidth={1.75} />
      )}
    </button>
  )
}
