// Axiom logo geometry (from Visual Identity/Logo/SVG). Colors come from the page theme.
const LETTERS = "M23.5 73.2Q17.23 73.2 13.12 71.15Q9 69.1 7 65.64Q5 62.19 5 58.09Q5 53.28 7.49 49.8Q9.98 46.33 14.81 44.41Q19.63 42.49 26.59 42.49H39.49Q39.49 38.43 38.24 35.77Q36.99 33.12 34.56 31.77Q32.12 30.42 28.53 30.42Q24.21 30.42 21.06 32.47Q17.91 34.52 17.21 38.54H6.13Q6.7 33.1 9.8 29.25Q12.9 25.39 17.84 23.29Q22.78 21.2 28.56 21.2Q35.57 21.2 40.52 23.65Q45.46 26.11 48.07 30.64Q50.69 35.17 50.69 41.5V72H41.06L40.01 63.78Q38.99 65.79 37.45 67.51Q35.91 69.22 33.9 70.49Q31.88 71.76 29.29 72.48Q26.71 73.2 23.5 73.2ZM25.85 64.27Q28.94 64.27 31.36 63.11Q33.77 61.94 35.49 59.93Q37.2 57.91 38.11 55.36Q39.03 52.8 39.2 50.02V49.95H27.75Q23.85 49.95 21.41 50.89Q18.97 51.83 17.88 53.48Q16.79 55.13 16.79 57.27Q16.79 59.46 17.87 61.04Q18.94 62.62 20.98 63.44Q23.02 64.27 25.85 64.27Z  M115.09 72V22.4H126.29V72ZM120.7 13.49Q117.56 13.49 115.54 11.55Q113.52 9.61 113.52 6.69Q113.52 3.74 115.54 1.87Q117.56 0 120.7 0Q123.81 0 125.86 1.87Q127.92 3.74 127.92 6.69Q127.92 9.61 125.86 11.55Q123.81 13.49 120.7 13.49Z M162.24 73.2Q155.19 73.2 149.49 69.94Q143.79 66.67 140.48 60.81Q137.16 54.94 137.16 47.24Q137.16 39.43 140.51 33.56Q143.86 27.7 149.59 24.45Q155.31 21.2 162.37 21.2Q169.51 21.2 175.21 24.45Q180.91 27.7 184.22 33.54Q187.54 39.39 187.54 47.23Q187.54 54.97 184.19 60.82Q180.84 66.67 175.11 69.94Q169.39 73.2 162.24 73.2ZM162.28 63.55Q166 63.55 169.12 61.73Q172.24 59.9 174.17 56.24Q176.1 52.58 176.1 47.19Q176.1 41.74 174.21 38.12Q172.31 34.5 169.19 32.67Q166.07 30.85 162.39 30.85Q158.8 30.85 155.63 32.67Q152.46 34.5 150.53 38.13Q148.6 41.76 148.6 47.21Q148.6 52.58 150.53 56.24Q152.46 59.9 155.56 61.73Q158.66 63.55 162.28 63.55Z M197.87 72V22.4H207.82L208.71 29.31Q211.11 25.5 215.08 23.35Q219.05 21.2 224.18 21.2Q228 21.2 231.13 22.2Q234.25 23.2 236.65 25.24Q239.06 27.28 240.59 30.35Q243.32 26.06 247.89 23.63Q252.45 21.2 257.75 21.2Q264 21.2 268.45 23.71Q272.9 26.22 275.25 31.22Q277.6 36.23 277.6 43.64V72H266.5V44.74Q266.5 37.87 263.8 34.28Q261.09 30.69 255.73 30.69Q252.09 30.69 249.28 32.54Q246.48 34.4 244.91 37.87Q243.34 41.34 243.34 46.36V72H232.17V44.74Q232.17 37.87 229.46 34.28Q226.76 30.69 221.29 30.69Q217.78 30.69 215 32.54Q212.22 34.4 210.65 37.87Q209.07 41.34 209.07 46.36V72Z"
const WORD_BACK = ["57,22.4 69.8,22.4 80.42,36.47 74.02,44.96", "90.2,49.44 107.22,72 94.42,72 83.8,57.93"]
const WORD_FRONT = "94.42,22.4 107.22,22.4 69.8,72 57,72"
const MARK_BACK = ["0,0 20.5,0 37.38,22.7 27.13,36.48", "52.87,43.52 80,80 59.5,80 42.62,57.3"]
const MARK_FRONT = "59.5,0 80,0 20.5,80 0,80"

/** Full wordmark. Ink follows currentColor, the crossing stroke follows --c-accent. */
export function Logo({ className = '', title = 'Axiom' }) {
  return (
    <svg viewBox="0 0 286.3 75" role="img" aria-label={title} className={className} fill="none">
      <g transform="translate(1.5 1.5)">
        <path d={LETTERS} fill="currentColor" />
        {WORD_BACK.map((p) => (
          <polygon key={p} points={p} fill="currentColor" />
        ))}
        <polygon points={WORD_FRONT} style={{ fill: 'var(--c-accent)' }} />
      </g>
    </svg>
  )
}

/** The x on its own. */
export function Mark({ className = '', title = 'Axiom' }) {
  return (
    <svg viewBox="0 0 80 80" role="img" aria-label={title} className={className} fill="none">
      {MARK_BACK.map((p) => (
        <polygon key={p} points={p} fill="currentColor" />
      ))}
      <polygon points={MARK_FRONT} style={{ fill: 'var(--c-accent)' }} />
    </svg>
  )
}

/**
 * The crossing, split into two groups so each stroke can slide on its own axis.
 * Used by the hero (on load) and by the scroll-linked bridge section.
 * Groups: .cx-back (navy strokes, slides along "\\"), .cx-front (accent stroke, slides along "/").
 */
export function CrossingX({ className = '', backStyle, frontStyle, backClass = '', frontClass = '' }) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className={className} fill="none" style={{ overflow: 'visible' }}>
      <g className={backClass} style={backStyle}>
        {MARK_BACK.map((p) => (
          <polygon key={p} points={p} fill="currentColor" />
        ))}
      </g>
      <g className={frontClass} style={frontStyle}>
        <polygon points={MARK_FRONT} style={{ fill: 'var(--c-accent)' }} />
      </g>
    </svg>
  )
}
