import { Link } from '../router'
import { useI18n } from '../i18n'
import { site } from '../config'
import { Logo } from './Logo'
import Container from './Container'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-6 w-auto text-fg" />
          <p className="mt-5 max-w-xs text-[15px] text-muted">{t.footer.tagline}</p>
        </div>
        <nav aria-label={t.footer.pages} className="flex flex-col gap-3 text-[15px]">
          <p className="font-medium">{t.footer.pages}</p>
          <Link to="/#solutions" className="text-muted transition hover:text-fg">{t.nav.solutions}</Link>
          <Link to="/#process" className="text-muted transition hover:text-fg">{t.nav.process}</Link>
          <Link to="/about" className="text-muted transition hover:text-fg">{t.nav.about}</Link>
          <Link to="/team" className="text-muted transition hover:text-fg">{t.nav.team}</Link>
          <Link to="/contact" className="text-muted transition hover:text-fg">{t.nav.contact}</Link>
        </nav>
        <div className="flex flex-col gap-3 text-[15px]">
          <p className="font-medium">{t.footer.contact}</p>
          {site.email && (
            <a href={`mailto:${site.email}`} dir="ltr" className="w-fit text-muted transition hover:text-fg">
              {site.email}
            </a>
          )}
          {site.phone && (
            <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} dir="ltr" className="w-fit text-muted transition hover:text-fg">
              {site.phone}
            </a>
          )}
          <p className="text-muted">{t.contact.info.locationValue}</p>
        </div>
      </Container>
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 text-[13px] text-muted">
          <p>
            © {year} Axiom. {t.footer.rights}
          </p>
          <p dir="ltr">{site.domain}</p>
        </div>
      </Container>
      <div aria-hidden="true" className="foot-mark pointer-events-none mx-auto mt-4 w-full max-w-[920px] select-none px-5 text-fg sm:px-8">
        <Logo className="block h-auto w-full" title="" />
      </div>
    </footer>
  )
}
