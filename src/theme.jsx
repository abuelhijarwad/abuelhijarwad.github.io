import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)
const query = '(prefers-color-scheme: dark)'

function readStored() {
  try {
    const v = localStorage.getItem('axiom-theme')
    return v === 'dark' || v === 'light' ? v : null
  } catch {
    return null
  }
}

/**
 * Follows the system setting until the visitor presses the toggle.
 * After that their choice is saved and wins over the system.
 */
export function ThemeProvider({ children }) {
  const [stored, setStored] = useState(readStored)
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setSystemDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const theme = stored ?? (systemDark ? 'dark' : 'light')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0B1F3A' : '#F4F7FB')
  }, [theme])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setStored(next)
    try {
      localStorage.setItem('axiom-theme', next)
    } catch {
      /* ignore */
    }
  }, [theme])

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
