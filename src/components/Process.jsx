import { useI18n } from '../i18n'
import { useInView } from '../hooks/useInView'
import Container from './Container'
import RevealText from './RevealText'

/**
 * A real sequence, so the steps are numbered.
 * The line draws itself and lights each step in order, once, when the list comes into view.
 */
export default function Process() {
  const { t } = useI18n()
  const [ref, inView] = useInView({ threshold: 0.3, once: true })
  const steps = t.process.steps
  return (
    <section id="process" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <RevealText as="h2" className="text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] track-display">
            {t.process.title}
          </RevealText>
          <p className="mt-5 text-lg text-muted">{t.process.sub}</p>
        </div>

        <ol ref={ref} className={`pr relative mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8 ${inView ? 'in' : ''}`}>
          {/* Track: vertical below lg, horizontal from lg up */}
          <span aria-hidden="true" className="absolute start-[1.2rem] top-3 bottom-3 w-px bg-line lg:start-0 lg:end-[calc(25%-2.7rem)] lg:bottom-auto lg:top-[1.2rem] lg:h-px lg:w-auto">
            <i className="pr-line pr-line-y absolute inset-0 bg-accent lg:hidden" />
            <i className="pr-line pr-line-x absolute inset-0 hidden bg-accent lg:block" />
          </span>

          {steps.map((step, i) => (
            <li key={step.title} className="relative ps-14 lg:ps-0 lg:pt-16" style={{ '--i': i }}>
              <span className="absolute start-0 top-0 grid size-[2.4rem] place-items-center rounded-full border border-line bg-bg text-[15px] font-semibold tabular-nums">
                <span className="relative">{i + 1}</span>
                <i className="pr-on absolute inset-0 rounded-full bg-accent" />
                <span aria-hidden="true" className="pr-on absolute inset-0 grid place-items-center text-on-accent">
                  {i + 1}
                </span>
              </span>
              <h3 className="text-xl font-semibold track-tight2 sm:text-2xl">{step.title}</h3>
              <p className="mt-2 max-w-xs text-[16px] leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
