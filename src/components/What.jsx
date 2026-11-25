import { useI18n } from '../i18n'
import RevealText from './RevealText'
import Container from './Container'
import { SoftwareArt, HardwareArt, ConnectionArt, SupportArt } from './BentoArt'

const arts = [SoftwareArt, HardwareArt, ConnectionArt, SupportArt]
// Wide and narrow cards alternate, so the grid reads as one composition rather than four equal tiles.
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

export default function What() {
  const { t } = useI18n()
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <RevealText as="h2" className="text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] track-display">
            {t.what.title}
          </RevealText>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{t.what.sub}</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {t.what.cards.map((card, i) => {
            const Art = arts[i]
            return (
              <article
                key={card.title}
                className={`group spot flex min-h-[21rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-line bg-surface p-7 sm:p-9 ${spans[i]}`}
              >
                <div className="dots grid h-44 place-items-center overflow-hidden rounded-2xl bg-surface-2/60 p-3 sm:h-48">
                  <Art />
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold track-tight2">{card.title}</h3>
                  <p className="mt-2 max-w-md text-[16px] leading-relaxed text-muted">{card.text}</p>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
