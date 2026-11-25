import { useI18n } from '../i18n'
import { useInView } from '../hooks/useInView'
import Container from './Container'
import RevealText from './RevealText'
import { CrossingX } from './Logo'

function Side({ data, className }) {
  return (
    <div className={`max-w-sm ${className}`}>
      <h3 className="text-2xl font-semibold track-tight2 sm:text-3xl">{data.name}</h3>
      <ul className="mt-4 divide-y divide-line border-y border-line text-[15px] text-muted sm:text-base">
        {data.items.map((item) => (
          <li key={item} className="py-2.5">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Signature moment: the two strokes slide in along their own axes and cross, then the two sides appear.
 * It is time-based: it starts once, by itself, when the section comes into view.
 * The page scrolls normally the whole time; nothing is pinned or held.
 */
export default function Bridge() {
  const { t } = useI18n()
  const b = t.bridge
  const [ref, inView] = useInView({ threshold: 0.4, once: true })
  return (
    <section ref={ref} aria-label={b.title} className={`br py-20 md:py-28 ${inView ? 'in' : ''}`}>
      <Container className="flex flex-col items-center gap-10 md:gap-14">
        <RevealText as="h2" className="text-balance text-center text-[clamp(1.9rem,5vw,3.6rem)] font-semibold leading-[1.08] track-display">
          {b.title}
        </RevealText>

        <div className="grid w-full items-center gap-8 max-md:justify-items-center md:grid-cols-[1fr_auto_1fr] md:gap-14">
          <div className="max-md:hidden md:justify-self-end">
            <Side data={b.software} className="br-a" />
          </div>

          <div className="text-fg" aria-hidden="true">
            <CrossingX className="block aspect-square w-[min(56vw,16rem)] md:w-[min(28vw,20rem)]" backClass="br-back" frontClass="br-front" />
          </div>

          <div className="max-md:hidden md:justify-self-start">
            <Side data={b.hardware} className="br-b" />
          </div>

          {/* Phones: both sides sit under the mark */}
          <div className="grid w-full grid-cols-2 gap-5 md:hidden">
            <Side data={b.software} className="br-a" />
            <Side data={b.hardware} className="br-b" />
          </div>
        </div>

        <p className="br-cap text-center text-lg text-muted sm:text-xl">{b.caption}</p>
      </Container>
    </section>
  )
}
