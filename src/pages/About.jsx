import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import Container from '../components/Container'
import CtaBand from '../components/CtaBand'
import RevealText from '../components/RevealText'
import { CrossingX } from '../components/Logo'

export default function About() {
  usePageMeta('about')
  const { t } = useI18n()
  const a = t.about
  return (
    <>
      <section className="pb-16 pt-32 md:pb-24 md:pt-44">
        <Container>
          <RevealText as="h1" threshold={0.2} className="max-w-4xl text-balance text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-display track-display">
            {a.title}
          </RevealText>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-muted">{a.sub}</p>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container className="grid gap-8 md:grid-cols-2 md:gap-16">
          <p className="text-lg leading-relaxed sm:text-xl">{a.p1}</p>
          <p className="text-lg leading-relaxed text-muted sm:text-xl">{a.p2}</p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="spot grid items-center gap-10 overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:p-14 md:grid-cols-[auto_1fr] md:gap-20">
            <div aria-hidden="true" className="mx-auto w-44 text-fg sm:w-56 md:w-64">
              <CrossingX className="block aspect-square w-full" />
            </div>
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold track-display sm:text-4xl">{a.markTitle}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{a.markText}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <RevealText as="h2" className="text-3xl font-semibold track-display sm:text-4xl">
            {a.principlesTitle}
          </RevealText>
          <dl className="mt-12 grid gap-4 md:grid-cols-3">
            {a.principles.map((p) => (
              <div key={p.title} className="spot rounded-[1.75rem] border border-line bg-surface p-7 sm:p-8">
                <dt className="text-2xl font-semibold track-tight2">{p.title}</dt>
                <dd className="mt-3 max-w-sm text-[16px] leading-relaxed text-muted">{p.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <RevealText as="h2" className="text-3xl font-semibold track-display sm:text-4xl">
            {a.whoTitle}
          </RevealText>
          <ul className="mt-10 flex flex-wrap gap-3">
            {a.who.map((w) => (
              <li key={w} className="spot rounded-full border border-line bg-surface px-6 py-3 text-lg">
                {w}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
