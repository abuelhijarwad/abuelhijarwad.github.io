import { createElement, Fragment } from 'react'
import { useInView } from '../hooks/useInView'

/**
 * A heading whose words rise out of a mask the first time it scrolls into view.
 * It plays once, by itself, and never holds the page.
 */
export default function RevealText({ as = 'h2', children, className = '', threshold = 0.5 }) {
  const [ref, inView] = useInView({ threshold, once: true })
  const words = String(children).split(/\s+/).filter(Boolean)
  return createElement(
    as,
    { ref, className: `rw ${inView ? 'in' : ''} ${className}` },
    words.map((w, i) => (
      <Fragment key={i}>
        {i > 0 ? ' ' : null}
        <span className="w">
          <span style={{ '--i': i }}>{w}</span>
        </span>
      </Fragment>
    )),
  )
}
