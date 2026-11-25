import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import Container from '../components/Container'
import Button from '../components/Button'
import { CrossingX } from '../components/Logo'

/** The two strokes of the mark, drawn apart: the link is missing. */
export default function NotFound() {
  usePageMeta('notFound')
  const { t } = useI18n()
  const n = t.notFound
  return (
    <section className="grid min-h-[100svh] place-items-center pb-20 pt-32">
      <meta name="robots" content="noindex" />
      <Container className="flex flex-col items-center text-center">
        <div aria-hidden="true" className="text-fg">
          <CrossingX
            className="block aspect-square w-40 sm:w-52"
            backStyle={{ transform: 'translate(-14%, -14%)', opacity: 0.55 }}
            frontStyle={{ transform: 'translate(14%, -14%)', opacity: 0.55 }}
          />
        </div>
        <h1 className="mt-10 max-w-xl text-balance text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.1] track-display">{n.title}</h1>
        <p className="mt-4 max-w-md text-lg text-muted">{n.text}</p>
        <Button to="/" className="mt-9">
          {n.button}
        </Button>
      </Container>
    </section>
  )
}
