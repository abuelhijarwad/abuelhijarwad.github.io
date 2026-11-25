import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import { site } from '../config'
import { ceo, members } from '../team'
import Container from '../components/Container'
import RevealText from '../components/RevealText'
import CtaBand from '../components/CtaBand'
import Button from '../components/Button'
import { CrossingX } from '../components/Logo'

/** A portrait. Without a photo it shows the Axiom crossing on a soft grid, so the layout is final from day one. */
function Portrait({ photo, name, className = '' }) {
  return (
    <div className={`dots relative overflow-hidden bg-surface-2 ${className}`}>
      {photo ? (
        <img src={photo} alt={name} width="800" height="1000" loading="lazy" className="absolute inset-0 size-full object-cover" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center text-fg">
          <CrossingX className="block aspect-square w-[46%] opacity-[0.9]" backClass="cx-back-in" frontClass="cx-front-in" />
        </div>
      )}
    </div>
  )
}

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center rounded-full border border-line bg-bg px-5 text-[15px] transition duration-300 hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  )
}

export default function Team() {
  usePageMeta('team')
  const { t, lang } = useI18n()
  const tm = t.team
  const name = ceo.name[lang] ?? ceo.name.en
  const links = [
    ceo.links.linkedin && { href: ceo.links.linkedin, label: 'LinkedIn' },
    ceo.links.github && { href: ceo.links.github, label: 'GitHub' },
    site.email && { href: `mailto:${site.email}`, label: site.email, mail: true },
  ].filter(Boolean)

  return (
    <>
      <section className="pb-14 pt-32 md:pb-20 md:pt-44">
        <Container>
          <RevealText as="h1" threshold={0.2} className="max-w-4xl text-balance text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-display track-display">
            {tm.title}
          </RevealText>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-muted">{tm.sub}</p>
        </Container>
      </section>

      <section aria-label={tm.ceo.role} className="pb-24 md:pb-32">
        <Container>
          <article className="spot grid overflow-hidden rounded-[2rem] border border-line bg-surface md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <Portrait photo={ceo.photo} name={name} className="aspect-[4/3] md:aspect-auto md:min-h-[34rem]" />
            <div className="flex flex-col justify-center gap-9 p-7 sm:p-12 lg:p-16">
              <div>
                <h2 className="text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.08] track-display">{name}</h2>
                <p className="mt-3 text-xl text-accent">{tm.ceo.role}</p>
              </div>

              <div className="grid max-w-xl gap-4 text-[17px] leading-relaxed text-muted sm:text-lg">
                {tm.ceo.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div>
                <h3 className="text-[15px] font-medium">{tm.ceo.focusTitle}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tm.ceo.focus.map((f) => (
                    <li key={f} className="rounded-full border border-line px-4 py-2 text-[14px] text-muted">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="flex flex-wrap gap-2">
                {links.map((l) => (
                  <li key={l.href}>
                    {l.mail ? (
                      <a
                        href={l.href}
                        dir="ltr"
                        className="inline-flex h-10 items-center rounded-full border border-line bg-bg px-5 text-[15px] transition duration-300 hover:border-accent hover:text-accent"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <ExternalLink href={l.href}>{l.label}</ExternalLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Container>
      </section>

      <section aria-label={tm.storyTitle} className="pb-24 md:pb-32">
        <Container className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <RevealText as="h2" className="text-balance text-[clamp(1.9rem,4.2vw,3rem)] font-semibold leading-[1.1] track-display">
            {tm.storyTitle}
          </RevealText>
          <div className="grid gap-5 text-lg leading-relaxed text-muted sm:text-xl">
            {tm.story.map((p, i) => (
              <p key={p} className={i === tm.story.length - 1 ? 'font-medium text-fg' : ''}>
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section aria-label={tm.teamTitle} className="pb-24 md:pb-32">
        <Container>
          <div className="max-w-2xl">
            <RevealText as="h2" className="text-balance text-[clamp(1.9rem,4.2vw,3rem)] font-semibold leading-[1.1] track-display">
              {tm.teamTitle}
            </RevealText>
            <p className="mt-4 text-lg text-muted">{tm.teamSub}</p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => {
              const mName = m.name[lang] ?? m.name.en
              return (
                <li key={m.name.en} className="spot overflow-hidden rounded-[1.75rem] border border-line bg-surface">
                  <Portrait photo={m.photo} name={mName} className="aspect-[4/3]" />
                  <div className="p-6 sm:p-7">
                    <p className="text-2xl font-semibold track-tight2">{mName}</p>
                    <p className="mt-1 text-[17px] text-accent">{m.role[lang] ?? m.role.en}</p>
                    <p className="mt-4 text-[16px] leading-relaxed text-muted">{m.bio[lang] ?? m.bio.en}</p>
                    <p className="mt-4 border-t border-line pt-4 text-[15px] leading-relaxed text-muted">
                      <span className="font-medium text-fg">{tm.study}: </span>
                      {m.study[lang] ?? m.study.en}
                    </p>
                  </div>
                </li>
              )
            })}

            <li
              className={`spot flex flex-col justify-between gap-8 rounded-[1.75rem] border border-dashed border-line bg-surface/50 p-7 sm:p-9 ${
                members.length === 0 ? 'sm:col-span-2 lg:col-span-3 md:flex-row md:items-center' : 'min-h-[18rem]'
              }`}
            >
              {members.length === 0 && (
                <div aria-hidden="true" className="flex -space-x-4 max-md:order-first rtl:space-x-reverse">
                  {[0, 1, 2].map((n) => (
                    <span key={n} className="grid size-16 place-items-center rounded-full border border-dashed border-line bg-bg text-muted/70" style={{ opacity: 1 - n * 0.22 }}>
                      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  ))}
                </div>
              )}
              <div className={members.length === 0 ? 'md:me-auto md:ms-8' : ''}>
                <h3 className="text-2xl font-semibold leading-tight track-tight2">{tm.join.title}</h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">{tm.join.text}</p>
              </div>
              <Button to="/contact" variant="secondary" className="w-fit shrink-0">
                {tm.join.button}
              </Button>
            </li>
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
