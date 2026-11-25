import { useI18n } from '../i18n'
import Container from './Container'
import RevealText from './RevealText'
import Button from './Button'
import { CrossingX } from './Logo'

export default function CtaBand({ title, button }) {
  const { t } = useI18n()
  return (
    <section className="pb-24 md:pb-32">
      <Container>
        <div className="spot spot-inv spot-soft relative overflow-hidden rounded-[2rem] bg-fg px-7 py-16 text-bg sm:px-14 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 end-[-8%] w-[min(60%,420px)] text-bg opacity-[0.12]">
            <CrossingX className="block aspect-square w-full" />
          </div>
          <div className="relative max-w-2xl">
            <RevealText as="h2" className="text-balance text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.1] track-display">
              {title ?? t.cta.title}
            </RevealText>
            <Button to="/contact" variant="inverse" className="mt-9">
              {button ?? t.cta.button}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
