import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * A very small history-API router: enough for three pages and in-page anchors.
 * Deep links work because vercel.json (and `vite preview`) fall back to index.html.
 */
const RouterContext = createContext(null)

const read = () => ({
  path: window.location.pathname.replace(/\/+$/, '') || '/',
  hash: window.location.hash,
})

export function Router({ children }) {
  const [loc, setLoc] = useState(read)
  const [tick, setTick] = useState(0) // changes on every navigation, even to the same URL

  useEffect(() => {
    const onPop = () => {
      setLoc(read())
      setTick((n) => n + 1)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to) => {
    const url = new URL(to, window.location.origin)
    window.history.pushState(null, '', url.pathname + url.search + url.hash)
    setLoc(read())
    setTick((n) => n + 1)
  }, [])

  // After each navigation: scroll to the anchor if there is one, otherwise to the top.
  useEffect(() => {
    if (loc.hash) {
      const el = document.getElementById(loc.hash.slice(1))
      if (el) {
        const id = requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return () => cancelAnimationFrame(id)
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [tick, loc.hash])

  const value = useMemo(() => ({ ...loc, navigate }), [loc, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used inside <Router>')
  return ctx
}

export function Link({ to, children, onClick, className, ...rest }) {
  const { navigate, path, hash } = useRouter()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (rest.target && rest.target !== '_self') return
    e.preventDefault()
    navigate(to)
  }
  const target = new URL(to, window.location.origin)
  const active = target.pathname.replace(/\/+$/, '') === path && (target.hash || '') === (hash || '')
  return (
    <a href={to} onClick={handle} className={className} aria-current={active && !target.hash ? 'page' : undefined} {...rest}>
      {children}
    </a>
  )
}
