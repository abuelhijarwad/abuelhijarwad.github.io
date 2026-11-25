import { useI18n } from '../../i18n'
import { Logo } from '../Logo'
import { themes, themeStyle, at, Glow, Device, btnFill, ink, mist } from './shared'

/* Simple food icons, drawn on a 48 grid. */
const icons = [
  // baguette
  <g key="b" transform="rotate(-35 24 24)">
    <rect x="3" y="16" width="42" height="16" rx="8" fill="#d9a15b" />
    <path d="M14 17l-3 14M24 17l-3 14M34 17l-3 14" stroke="#a96d2f" strokeWidth="2" strokeLinecap="round" />
  </g>,
  // croissant
  <g key="c">
    <path d="M5 31C6 19 14 12 24 12s18 7 19 19c-4 0-7-2-9-5-3 3-6 4-10 4s-7-1-10-4c-2 3-5 5-9 5Z" fill="#e3a756" />
    <path d="M16 15l3 12M24 12v15M32 15l-3 12" stroke="#b97a30" strokeWidth="1.8" strokeLinecap="round" />
  </g>,
  // pita
  <g key="p">
    <circle cx="24" cy="24" r="16" fill="#ecc98f" />
    <path d="M12 21c4-4 7 2 12-1s8 2 12-1M13 29c4-3 7 2 11 0s7 1 11-1" stroke="#c99a58" strokeWidth="2" fill="none" strokeLinecap="round" />
  </g>,
  // cookie
  <g key="k">
    <circle cx="24" cy="24" r="16" fill="#d49a5f" />
    <circle cx="18" cy="19" r="2.2" fill="#5a3418" />
    <circle cx="30" cy="22" r="2.2" fill="#5a3418" />
    <circle cx="22" cy="30" r="2.2" fill="#5a3418" />
    <circle cx="31" cy="31" r="1.8" fill="#5a3418" />
  </g>,
  // bagel
  <g key="g">
    <circle cx="24" cy="24" r="12.5" fill="none" stroke="#dba35a" strokeWidth="9" />
    <circle cx="14" cy="14" r="1" fill="#fff4dc" />
    <circle cx="33" cy="15" r="1" fill="#fff4dc" />
    <circle cx="35" cy="30" r="1" fill="#fff4dc" />
    <circle cx="19" cy="35" r="1" fill="#fff4dc" />
  </g>,
  // cake slice
  <g key="a">
    <path d="M7 36h34V24H7Z" fill="#f6dccb" />
    <path d="M7 24c3-9 31-9 34 0Z" fill="#b9633f" />
    <circle cx="24" cy="14" r="3.2" fill="#e5484d" />
  </g>,
]
const prices = [9, 7, 3, 5, 6, 15]

export default function BakeryScene() {
  const { t } = useI18n()
  const s = t.scene.bakery
  const cart = [
    [s.cart[0], 7],
    [s.cart[1], 9],
    [s.cart[2], 5],
  ]
  return (
    <div className="scene-root absolute inset-0 overflow-hidden" dir="ltr" style={themeStyle(themes.bakery)}>
      <Glow x={32} y={34} size={58} opacity={0.2} />
      <Glow x={80} y={50} size={34} opacity={0.14} />

      {/* Sales screen */}
      <Device style={at(4, 8, 58, 43)} radius={3.4} bezel={1}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '38em', padding: '2em' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(2,1fr)', gap: '1.2em', height: '100%' }}>
            {icons.map((icon, i) => (
              <div key={i} style={{ background: '#fff', border: `.12em solid ${mist}`, borderRadius: '1.6em', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '.5em' }}>
                <svg viewBox="0 0 48 48" style={{ width: '7em', height: '7em' }} aria-hidden="true">
                  {icon}
                </svg>
                <span dir="auto" style={{ fontSize: '1.5em', fontWeight: 600 }}>{s.products[i]}</span>
                <span style={{ fontSize: '1.35em', color: 'color-mix(in oklab, var(--dv) 62%, #fff)', fontVariantNumeric: 'tabular-nums' }}>₪{prices[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '17em', background: '#fff', borderInlineStart: `.12em solid ${mist}`, padding: '2em 1.6em', display: 'flex', flexDirection: 'column' }}>
          <span dir="auto" style={{ fontSize: '1.9em', fontWeight: 700 }}>{s.order}</span>
          <div style={{ marginTop: '1.6em', display: 'grid', gap: '1.1em' }}>
            {cart.map(([name, price]) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', gap: '.5em', fontSize: '1.45em' }}>
                <span dir="auto">{name}</span>
                <span style={{ color: 'color-mix(in oklab, var(--dv) 62%, #fff)', fontVariantNumeric: 'tabular-nums' }}>₪{price}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `.12em solid ${mist}`, paddingTop: '1em' }}>
            <span dir="auto" style={{ fontSize: '1.45em', color: 'color-mix(in oklab, var(--dv) 62%, #fff)' }}>{s.total}</span>
            <span style={{ fontSize: '2.6em', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>₪21</span>
          </div>
          <span dir="auto" style={{ marginTop: '1.2em', textAlign: 'center', ...btnFill, color: '#fff', fontSize: '1.7em', fontWeight: 600, padding: '.7em 0', borderRadius: 999, animation: 'press 9s ease-in-out infinite' }}>
            {s.pay}
          </span>
        </div>
      </Device>

      {/* Receipt printer with paper coming out */}
      <div style={at(68, 3, 24, 36, { overflow: 'hidden' })} aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            left: '3.5em',
            bottom: 0,
            width: '17em',
            height: '31em',
            animation: 'print-cycle 9s ease-in-out infinite',
          }}
        >
          <div
            style={{
              height: '100%',
              background: '#ffffff',
              color: ink,
              padding: '2.6em 1.6em 1.6em',
              boxShadow: '0 1em 3em -1em rgba(5,16,31,.35)',
              clipPath: 'polygon(0 0,5% 1.6%,10% 0,15% 1.6%,20% 0,25% 1.6%,30% 0,35% 1.6%,40% 0,45% 1.6%,50% 0,55% 1.6%,60% 0,65% 1.6%,70% 0,75% 1.6%,80% 0,85% 1.6%,90% 0,95% 1.6%,100% 0,100% 100%,0 100%)',
            }}
          >
            <Logo className="mx-auto h-[2.8em] w-auto" title="axiom" />
            <div style={{ marginTop: '1.6em', borderTop: `.2em dashed ${mist}` }} />
            <div style={{ marginTop: '1.4em', display: 'grid', gap: '.9em' }}>
              {cart.map(([name, price]) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25em' }}>
                  <span dir="auto">{name}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{price}.00</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.4em', borderTop: `.2em dashed ${mist}`, paddingTop: '1.2em', display: 'flex', justifyContent: 'space-between', fontSize: '1.5em', fontWeight: 700 }}>
              <span dir="auto">{s.total}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>21.00</span>
            </div>
            <div dir="auto" style={{ marginTop: '2em', textAlign: 'center', fontSize: '1.25em', color: 'color-mix(in oklab, var(--dv) 62%, #fff)' }}>{s.thanks}</div>
          </div>
        </div>
      </div>
      <div style={at(66, 38, 28, 13)}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '2.4em', background: 'linear-gradient(var(--dv2),var(--dv))', boxShadow: '0 3em 5em -2em rgba(5,16,31,.6), inset 0 0 0 .12em rgba(255,255,255,.12)' }} />
        <div style={{ position: 'absolute', left: '2.5em', right: '2.5em', top: '.9em', height: '1.1em', borderRadius: '.6em', background: 'var(--dv0)' }} />
        <i style={{ position: 'absolute', right: '2.4em', bottom: '2em', width: '1em', height: '1em', borderRadius: '50%', background: '#34c98a', animation: 'blink 1.8s ease-in-out infinite' }} />
        <i style={{ position: 'absolute', left: '2.4em', bottom: '2em', width: '5em', height: '.9em', borderRadius: '.5em', background: 'rgba(255,255,255,.14)' }} />
      </div>
    </div>
  )
}
