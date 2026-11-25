import { useEffect, useRef, useState } from 'react'

/**
 * True while the element is on screen.
 * With `once: true` it turns true the first time the element is seen and stays true,
 * which is what one-shot entrance animations need.
 */
export function useInView({ once = false, ...options } = { threshold: 0.25 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (once) io.disconnect()
      } else if (!once) {
        setInView(false)
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, inView]
}
