import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

/** Same key as the inline script in index.html, which applies it before first paint. */
const STORAGE_KEY = 'wsc34.theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'
const listeners = new Set<() => void>()

/** The theme currently showing: an explicit choice, otherwise the system setting. */
export function getTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* storage unavailable: the choice lasts for this visit only */
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const mql = window.matchMedia(DARK_QUERY)
  mql.addEventListener('change', listener)
  return () => {
    listeners.delete(listener)
    mql.removeEventListener('change', listener)
  }
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme)
}
