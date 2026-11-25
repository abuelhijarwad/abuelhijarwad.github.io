import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import { site } from '../config'
import Container from '../components/Container'
import RevealText from '../components/RevealText'
import ContactForm from '../components/ContactForm'
import { Icon } from '../components/Icons'

function InfoRow({ icon, label, value, href }) {
  return (
    <li>
      <a href={href} className="group spot flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-bg text-accent">
          <Icon name={icon} className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-muted">{label}</span>
          <span dir="ltr" className="block truncate text-start text-[16px] font-medium">
            {value}
          </span>
        </span>
      </a>
    </li>
  )
}

export default function Contact() {
  usePageMeta('contact')
  const { t } = useI18n()
  const c = t.contact
  const wa = site.whatsapp.replace(/\D/g, '')
  return (
    <section className="pb-24 pt-32 md:pb-32 md:pt-44">
      <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <RevealText as="h1" threshold={0.2} className="text-balance text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-display track-display">
            {c.title}
          </RevealText>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{c.sub}</p>

          <ul className="mt-10 grid gap-3">
            {site.email && <InfoRow icon="mail" label={c.info.email} value={site.email} href={`mailto:${site.email}`} />}
            {site.phone && <InfoRow icon="phone" label={c.info.phone} value={site.phone} href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} />}
            {wa && <InfoRow icon="chat" label={c.info.whatsapp} value={`+${wa}`} href={`https://wa.me/${wa}`} />}
            <li className="spot flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-bg text-accent">
                <Icon name="pin" className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">{c.info.location}</span>
                <span className="block text-[16px] font-medium">{c.info.locationValue}</span>
              </span>
            </li>
          </ul>

          <div className="mt-14 hidden lg:block">
            <h2 className="text-xl font-semibold track-tight2">{c.nextTitle}</h2>
            <ol className="mt-6 grid gap-5">
              {c.next.map((n, i) => (
                <li key={n.title} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-sm font-semibold tabular-nums">{i + 1}</span>
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="mt-0.5 text-[15px] text-muted">{n.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <ContactForm />
          <div className="mt-12 lg:hidden">
            <h2 className="text-xl font-semibold track-tight2">{c.nextTitle}</h2>
            <ol className="mt-6 grid gap-5">
              {c.next.map((n, i) => (
                <li key={n.title} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-sm font-semibold tabular-nums">{i + 1}</span>
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="mt-0.5 text-[15px] text-muted">{n.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
