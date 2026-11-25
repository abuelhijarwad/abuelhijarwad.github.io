import { useRef } from 'react'
import { useI18n } from '../i18n'
import Container from './Container'
import Button from './Button'
import { CrossingX } from './Logo'

/** The headline rises word by word while the crossing assembles. This is the page's one load sequence. */
function Headline({ lines }) {
  let i = 0
  return (
    <h1 className="text-balance text-[clamp(2.5rem,6.8vw,5rem)] font-semibold leading-display track-display">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi, arr) => (
            <span key={wi}>
              <span className="hero-word" style={{ '--i': i++ }}>
                <span>{word}</span>
              </span>
              {wi < arr.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const ref = useRef(null)
  // A large soft light trails the pointer. The value is a CSS variable, so React never re-renders for it.
  const onMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--gx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--gy', `${e.clientY - r.top}px`)
  }
  return (
    <section ref={ref} onPointerMove={onMove} className="relative overflow-clip pb-16 pt-32 md:pb-24 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow" />
      </div>
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative z-10">
          <Headline lines={t.hero.title} />
          <p className="hero-fade mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-xl" style={{ '--d': '900ms' }}>
            {t.hero.sub}
          </p>
          <div className="hero-fade mt-9 flex flex-wrap gap-3" style={{ '--d': '1050ms' }}>
            <Button to="/contact">{t.hero.primary}</Button>
            <Button to="/#solutions" variant="secondary">
              {t.hero.secondary}
            </Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none text-fg max-lg:absolute max-lg:-top-16 max-lg:end-[-14%] max-lg:w-[72%] max-lg:opacity-[0.09] lg:justify-self-end lg:w-full lg:max-w-[460px]"
        >
          <CrossingX className="block aspect-square w-full" backClass="cx-back-in" frontClass="cx-front-in" />
        </div>
      </Container>
    </section>
  )
}
