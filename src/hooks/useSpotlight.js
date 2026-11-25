import { useEffect } from 'react'

/**
 * One listener for the whole page. Any element with the `.spot` class gets --mx / --my
 * (the pointer position inside it), which the CSS turns into a glow and a lit edge.
 * No per-card handlers, no React re-renders, and new cards work without extra code.
 */
export function useGlobalSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    let frame = 0
    let last = null
    const apply = () => {
      frame = 0
      if (!last) return
      const el = last.target instanceof Element ? last.target.closest('.spot') : null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${last.x - r.left}px`)
      el.style.setProperty('--my', `${last.y - r.top}px`)
    }
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      last = { target: e.target, x: e.clientX, y: e.clientY }
      if (!frame) frame = requestAnimationFrame(apply)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
