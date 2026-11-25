import { useI18n } from '../i18n'
import Container from './Container'
import RevealText from './RevealText'

/** One row of the marquee. Two identical copies sit side by side and the track moves by exactly one copy. */
function Row({ items, reverse, duration }) {
  const copy = (hidden) => (
    <ul className={`mq-copy flex shrink-0 gap-3 pe-3 ${hidden ? 'mq-dup' : ''}`} aria-hidden={hidden || undefined}>
      {items.map((label) => (
        <li key={label} className="spot whitespace-nowrap rounded-full border border-line bg-surface px-6 py-3.5 text-[17px] sm:px-7 sm:text-lg">
          {label}
        </li>
      ))}
    </ul>
  )
  return (
    <div className={`mq-row overflow-hidden ${reverse ? 'mq-rev' : ''}`} style={{ '--mq-dur': `${duration}s` }}>
      <div className="mq-track">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  )
}

/**
 * The point of this band is breadth: Axiom is not a restaurant company or a warehouse company.
 * Two slow rows of business types, moving in opposite directions, pause under the pointer.
 */
export default function Industries() {
  const { t } = useI18n()
  const i = t.industries
  const half = Math.ceil(i.list.length / 2)
  return (
    <section aria-label={i.title} className="overflow-x-clip pb-12 md:pb-16">
      <Container className="mb-12 max-w-3xl text-center md:mb-14">
        <RevealText as="h2" className="text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] track-display" threshold={0.6}>
          {i.title}
        </RevealText>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">{i.sub}</p>
      </Container>
      <div className="grid gap-3">
        <Row items={i.list.slice(0, half)} duration={70} />
        <Row items={i.list.slice(half)} reverse duration={80} />
      </div>
    </section>
  )
}
