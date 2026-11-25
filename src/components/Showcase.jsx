import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { useInView } from '../hooks/useInView'
import Container from './Container'
import { Icon } from './Icons'
import RestaurantScene from './scenes/RestaurantScene'
import BakeryScene from './scenes/BakeryScene'
import WarehouseScene from './scenes/WarehouseScene'
import RetailScene from './scenes/RetailScene'
import QueueScene from './scenes/QueueScene'
import { themes, themeStyle } from './scenes/shared'

const scenes = [RestaurantScene, BakeryScene, WarehouseScene, RetailScene, QueueScene]
const themeKeys = ['restaurant', 'bakery', 'warehouse', 'retail', 'queue']
const DURATION = 7000 // ms per slide

/**
 * Auto-rotating showcase. The progress line under each tab is a CSS animation;
 * when it finishes, the next slide opens. So the line and the timer can never drift apart,
 * and pausing the animation pauses the rotation.
 */
export default function Showcase() {
  const { t, dir } = useI18n()
  const count = scenes.length
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState(null)
  const [paused, setPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [rootRef, inView] = useInView({ threshold: 0.3 })
  const reduced = useRef(false)
  const clearPrev = useRef(0)
  const drag = useRef(null)
  const tabRefs = useRef([])
  const listRef = useRef(null)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) setPaused(true) // no autoplay when the system asks for less motion
  }, [])
  useEffect(() => () => clearTimeout(clearPrev.current), [])

  // On narrow screens the tabs scroll sideways. Keep the active one centered by moving the list itself;
  // scrollIntoView would also move the page.
  useEffect(() => {
    const list = listRef.current
    const tab = tabRefs.current[active]
    if (!list || !tab || list.scrollWidth <= list.clientWidth + 1) return
    const left = tab.offsetLeft + tab.offsetWidth / 2 - list.clientWidth / 2
    list.scrollTo({ left, behavior: reduced.current ? 'auto' : 'smooth' })
  }, [active])

  const activeRef = useRef(0)
  const go = useCallback(
    (i) => {
      const next = ((i % count) + count) % count
      const current = activeRef.current
      if (next === current) return
      activeRef.current = next
      setPrev(current)
      setActive(next)
      clearTimeout(clearPrev.current)
      clearPrev.current = setTimeout(() => setPrev(null), 700)
    },
    [count],
  )

  const playing = inView && !paused && !hovering && !focused
  const Active = scenes[active]
  const Prev = prev != null ? scenes[prev] : null
  const slide = t.showcase.slides[active]
  const theme = themes[themeKeys[active]]

  const onKeyDown = (e) => {
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    let target = null
    if (e.key === forward) target = active + 1
    else if (e.key === back) target = active - 1
    else if (e.key === 'Home') target = 0
    else if (e.key === 'End') target = count - 1
    if (target == null) return
    e.preventDefault()
    const i = ((target % count) + count) % count
    go(i)
    tabRefs.current[i]?.focus()
  }

  // Swipe: toward the reading direction goes forward.
  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
    const forward = dir === 'rtl' ? dx > 0 : dx < 0
    go(active + (forward ? 1 : -1))
  }

  return (
    <section
      id="solutions"
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={t.showcase.label}
      className="scroll-mt-20 pb-24 md:pb-32"
      style={themeStyle(theme)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Container>
        <div className="mb-5 flex items-end gap-3 sm:gap-5">
          <div
            ref={listRef}
            role="tablist"
            aria-label={t.showcase.label}
            onKeyDown={onKeyDown}
            className="no-scrollbar relative flex min-w-0 flex-1 gap-4 overflow-x-auto overscroll-x-contain sm:gap-6"
          >
            {t.showcase.tabs.map((label, i) => {
              const on = i === active
              return (
                <button
                  key={label}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={on}
                  aria-controls="showcase-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => go(i)}
                  className="group min-w-[6.5rem] flex-1 shrink-0 text-start sm:min-w-0"
                >
                  <span className="block h-[3px] overflow-hidden rounded-full bg-line">
                    {on && (
                      <i
                        key={`${active}-${reduced.current}`}
                        className={reduced.current ? 'block h-full w-full' : 'tab-fill block h-full w-full'}
                        style={{ background: 'var(--sa)', '--dur': `${DURATION}ms`, animationPlayState: playing ? 'running' : 'paused' }}
                        onAnimationEnd={(e) => e.animationName === 'tab-fill' && go(active + 1)}
                      />
                    )}
                  </span>
                  <span className={`mt-3 block truncate text-[15px] font-medium transition-colors duration-300 sm:text-base ${on ? 'text-fg' : 'text-muted group-hover:text-fg'}`}>
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? t.ui.play : t.ui.pause}
            title={paused ? t.ui.play : t.ui.pause}
            className="mb-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface/60 text-fg transition hover:bg-surface"
          >
            <Icon name={paused ? 'play' : 'pause'} className="size-4" />
          </button>
        </div>

        <div
          id="showcase-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          aria-live={playing ? 'off' : 'polite'}
          className="grid overflow-hidden rounded-[2rem] border border-line bg-surface lg:grid-cols-[5fr_7fr]"
        >
          <div className="spot spot-soft flex flex-col justify-between gap-10 p-7 max-lg:order-2 sm:p-10 lg:p-12">
            <div key={active} className="copy-in">
              <h2 className="text-[1.9rem] font-semibold leading-[1.12] track-display sm:text-[2.4rem] lg:text-[2.6rem]">{slide.title}</h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">{slide.text}</p>
            </div>
            <ul key={`chips-${active}`} className="copy-in flex flex-wrap gap-2" style={{ animationDelay: '120ms' }}>
              {slide.chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border px-3.5 py-1.5 text-[13px] text-fg"
                  style={{ background: 'color-mix(in oklab, var(--sa) 11%, transparent)', borderColor: 'color-mix(in oklab, var(--sa) 32%, transparent)' }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="scene dots relative aspect-[16/10] touch-pan-y select-none overflow-hidden bg-surface-2 max-lg:order-1 w-full transition-[background-color] duration-700 lg:self-stretch"
            style={{ backgroundColor: 'color-mix(in oklab, var(--sa) 9%, var(--c-surface-2))' }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (drag.current = null)}
          >
            {/* The board keeps its 16:10 shape and stays centered if the card grows taller than it. */}
            <div className="absolute inset-x-0 top-1/2 aspect-[16/10] -translate-y-1/2">
              {Prev && (
                <div key={`prev-${prev}`} className="scene-out absolute inset-0" aria-hidden="true">
                  <Prev />
                </div>
              )}
              <div key={`scene-${active}`} className="scene-in absolute inset-0">
                <Active />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-[15px] text-muted">{t.showcase.note}</p>
      </Container>
    </section>
  )
}
