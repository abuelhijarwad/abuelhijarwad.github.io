import { useEffect, useRef, useState } from 'react'
import { Link, useRouter } from '../router'
import { useI18n } from '../i18n'
import { Logo } from './Logo'
import { Icon } from './Icons'
import Container from './Container'
import LangSwitch from './LangSwitch'
import ThemeToggle from './ThemeToggle'
import Button from './Button'

export default function Navbar() {
  const { t } = useI18n()
  const { path, hash } = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const bar = useRef(null)

  const links = [
    { to: '/#solutions', label: t.nav.solutions },
    { to: '/#process', label: t.nav.process },
    { to: '/about', label: t.nav.about },
    { to: '/team', label: t.nav.team },
    { to: '/contact', label: t.nav.contact },
  ]

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.current?.style.setProperty('--sp', max > 0 ? Math.min(1, y / max).toFixed(4) : '0')
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [path])

  // Close the menu after navigating, and on Escape.
  useEffect(() => setOpen(false), [path, hash])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${
          solid ? 'border-b border-line/70 bg-bg/75 backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent'
        }`}
      >
        <Container className="flex h-16 items-center gap-2 sm:gap-3">
          <Link to="/" aria-label={t.nav.home} className="me-auto flex shrink-0 items-center text-fg">
            <Logo className="h-[22px] w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-3.5 py-2 text-[14px] text-muted transition duration-300 hover:bg-surface hover:text-fg aria-[current=page]:bg-surface aria-[current=page]:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:ms-2 sm:gap-2">
            <LangSwitch />
            <ThemeToggle />
            <Button to="/contact" className="ms-1 !h-9 !px-4 !text-[14px] max-lg:hidden">
              {t.nav.cta}
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
              className="grid size-9 place-items-center rounded-full border border-line bg-surface/60 text-fg lg:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} className="size-[18px]" />
            </button>
          </div>
        </Container>
        <span
          ref={bar}
          aria-hidden="true"
          className={`read-bar pointer-events-none absolute inset-x-0 -bottom-px h-[2px] bg-accent transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        />
      </header>

      {/* Mobile and tablet menu */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 bg-bg/95 pt-16 backdrop-blur-2xl transition duration-500 ease-out-expo lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <Container className="flex h-full flex-col justify-between pb-10 pt-8">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
                className={`border-b border-line py-5 text-[2rem] font-semibold leading-tight track-tight2 transition duration-500 ease-out-expo ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Button to="/contact" className="w-full">
            {t.nav.cta}
          </Button>
        </Container>
      </div>
    </>
  )
}
