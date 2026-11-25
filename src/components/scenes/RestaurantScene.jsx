import { useI18n } from '../../i18n'
import { themes, themeStyle, at, Glow, Device, btnFill, ink, mist } from './shared'

const statuses = ['free', 'busy', 'free', 'selected', 'ready', 'busy', 'free', 'busy']
const tile = {
  free: { bg: '#ffffff', fg: 'color-mix(in oklab, var(--dv) 62%, #fff)', border: mist },
  busy: { bg: 'var(--ss)', fg: 'var(--sd)', border: 'var(--ss)' },
  selected: { bg: 'var(--sa)', fg: '#ffffff', border: 'var(--sa)' },
  ready: { bg: '#d6f3e4', fg: '#0e7a4f', border: '#d6f3e4' },
}

function Ticket({ delay, tone, no, time, lines, done, label }) {
  const tones = { green: '#1fa86e', amber: '#e0a02b', cobalt: 'var(--sa)' }
  return (
    <div
      style={{
        width: '10.6em',
        height: '17em',
        borderRadius: '1.2em',
        background: 'var(--dv2)',
        overflow: 'hidden',
        animation: `ticket-pop .7s var(--ease-out-expo) both`,
        animationDelay: `${delay}s`,
        position: 'relative',
      }}
    >
      <div style={{ background: tones[tone], color: 'var(--dv0)', padding: '.7em 1em', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.5em', lineHeight: 1.1 }}>
        <span>{no}</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
      </div>
      <div style={{ padding: '1em', display: 'grid', gap: '.7em' }}>
        {lines.map((l) => (
          <div key={l} dir="auto" style={{ color: 'var(--ss)', fontSize: '1.45em', lineHeight: 1.15 }}>
            {l}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', insetInline: 0, bottom: 0, padding: '.8em 1em', fontSize: '1.25em', fontWeight: 600, color: done ? '#7ee2b1' : 'var(--ss)' }}>
        {label}
      </div>
    </div>
  )
}

export default function RestaurantScene() {
  const { t } = useI18n()
  const s = t.scene.restaurant
  return (
    <div className="scene-root absolute inset-0 overflow-hidden" dir="ltr" style={themeStyle(themes.restaurant)}>
      {/* The devices sit a little low on the board so the picture is optically centered. */}
      <div style={{ position: 'absolute', inset: 0, transform: 'translateY(3.4em)' }}>
      <Glow x={30} y={36} size={55} opacity={0.2} />
      <Glow x={78} y={30} size={40} opacity={0.14} />

      {/* Waiter tablet */}
      <Device style={at(5, 11, 47, 36)} radius={3.2} bezel={1}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.6em 2em .6em' }}>
          <span dir="auto" style={{ fontSize: '2.2em', fontWeight: 700, letterSpacing: '-.01em' }}>{s.tables}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '.6em' }}>
            <i style={{ width: '.9em', height: '.9em', borderRadius: '50%', background: '#1fa86e', display: 'block' }} />
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.1em', padding: '.8em 2em' }}>
          {statuses.map((st, i) => {
            const c = tile[st]
            return (
              <div key={i} style={{ position: 'relative', height: '6.4em', borderRadius: '1.3em', background: c.bg, border: `.12em solid ${c.border}`, display: 'grid', placeItems: 'center' }}>
                {st === 'selected' && (
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '1.3em', border: '.3em solid var(--sa)', animation: 'ring 2.4s ease-out infinite' }} />
                )}
                <span style={{ color: c.fg, fontSize: '2.6em', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
              </div>
            )
          })}
        </div>
        <div style={{ position: 'absolute', insetInline: 0, bottom: 0, height: '8.6em', background: '#fff', borderTop: `.12em solid ${mist}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2em' }}>
          <div style={{ display: 'grid', gap: '.3em' }}>
            <span dir="auto" style={{ fontSize: '1.9em', fontWeight: 700 }}>{s.table} 4</span>
            <span dir="auto" style={{ fontSize: '1.4em', color: 'color-mix(in oklab, var(--dv) 62%, #fff)' }}>{s.items[0]} ×2, {s.items[2]}</span>
          </div>
          <span
            dir="auto"
            style={{ ...btnFill, color: '#fff', fontSize: '1.6em', fontWeight: 600, padding: '.55em 1.1em', borderRadius: 999, animation: 'press 4.8s ease-in-out infinite' }}
          >
            {s.send}
          </span>
        </div>
      </Device>

      {/* Connection from the tablet to the kitchen */}
      <svg viewBox="0 0 100 62.5" className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
        <path d="M49.6 41.7 C55 41.7 54 25 59.4 25" fill="none" stroke="var(--sa)" strokeWidth=".45" strokeLinecap="round" strokeDasharray="1.2 1.2" style={{ animation: 'dash-flow 1.2s linear infinite' }} />
        <circle r=".95" fill="var(--sa)">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M49.6 41.7 C55 41.7 54 25 59.4 25" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="3.2s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Kitchen display */}
      <div style={at(58, 6, 38, 31)}>
        <div style={{ position: 'absolute', inset: 0, bottom: '3.5em', borderRadius: '2em', padding: '.9em', background: 'var(--dv0)', boxShadow: '0 3em 5em -2em rgba(5,16,31,.6), inset 0 0 0 .12em rgba(255,255,255,.1)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '1.4em', background: ink, overflow: 'hidden', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2em 1.6em .8em' }}>
              <span dir="auto" style={{ color: 'var(--sp)', fontSize: '1.9em', fontWeight: 700 }}>{s.kitchen}</span>
              <span style={{ color: 'var(--ss)', fontSize: '1.4em', fontVariantNumeric: 'tabular-nums' }}>14:32</span>
            </div>
            <div style={{ display: 'flex', gap: '1em', padding: '.4em 1.6em' }}>
              <Ticket delay={0.4} tone="green" no="T7" time="08:40" lines={[s.items[1], s.items[3]]} done label={s.ready} />
              <Ticket delay={1.1} tone="amber" no="T2" time="03:12" lines={[s.items[0], s.items[1]]} label={s.cooking} />
              <Ticket delay={2.6} tone="cobalt" no="T4" time="00:04" lines={[`${s.items[0]} ×2`, s.items[2]]} label={s.cooking} />
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: '50%', bottom: '1em', width: '5em', height: '2.6em', transform: 'translateX(-50%)', background: 'var(--dv)', boxShadow: 'inset 0 0 0 .12em rgba(255,255,255,.1)' }} />
        <div style={{ position: 'absolute', left: '50%', bottom: 0, width: '14em', height: '1.2em', transform: 'translateX(-50%)', borderRadius: '.6em', background: 'var(--dv)', boxShadow: 'inset 0 0 0 .12em rgba(255,255,255,.1)' }} />
      </div>
      </div>
    </div>
  )
}
