import { useI18n } from '../../i18n'
import { themes, themeStyle, at, Glow, Device, ink, mist } from './shared'

const plank = 'color-mix(in oklab, var(--c-fg) 55%, transparent)'
const post = 'color-mix(in oklab, var(--c-fg) 70%, transparent)'

/** A few simple shelf goods. All sizes in em, anchored by their bottom edge. */
function Good({ kind, x, base }) {
  const shared = { position: 'absolute', left: `${x}em` }
  if (kind === 'bottle')
    return (
      <div style={{ ...shared, top: `${base - 13}em`, width: '7em', height: '13em', marginLeft: '-3.5em' }}>
        <i style={{ position: 'absolute', left: '2em', top: 0, width: '3em', height: '3em', borderRadius: '.5em .5em 0 0', background: 'var(--sd)' }} />
        <i style={{ position: 'absolute', left: 0, top: '2.6em', width: '7em', height: '10.4em', borderRadius: '1.6em 1.6em .8em .8em', background: 'var(--sa)' }} />
        <i style={{ position: 'absolute', left: '.9em', top: '6em', width: '5.2em', height: '3.6em', borderRadius: '.6em', background: '#fff', opacity: 0.92 }} />
      </div>
    )
  if (kind === 'jar')
    return (
      <div style={{ ...shared, top: `${base - 10}em`, width: '9em', height: '10em', marginLeft: '-4.5em' }}>
        <i style={{ position: 'absolute', left: '-.3em', top: 0, width: '9.6em', height: '2em', borderRadius: '.6em', background: 'var(--sd)' }} />
        <i style={{ position: 'absolute', left: 0, top: '1.8em', width: '9em', height: '8.2em', borderRadius: '1.2em 1.2em 1.6em 1.6em', background: '#e0a02b' }} />
        <i style={{ position: 'absolute', left: '1.2em', top: '4.2em', width: '6.6em', height: '3em', borderRadius: '.6em', background: '#fff', opacity: 0.9 }} />
      </div>
    )
  if (kind === 'bag')
    return (
      <div style={{ ...shared, top: `${base - 12}em`, width: '9em', height: '12em', marginLeft: '-4.5em' }}>
        <i style={{ position: 'absolute', inset: 0, borderRadius: '.8em', background: 'var(--sd)', clipPath: 'polygon(6% 0,94% 0,100% 100%,0 100%)' }} />
        <i style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '1.2em', background: 'var(--sa)', clipPath: 'polygon(6% 0,94% 0,95% 100%,5% 100%)' }} />
        <i style={{ position: 'absolute', left: '1.6em', top: '4em', width: '5.8em', height: '4.4em', borderRadius: '.7em', background: '#e0a02b' }} />
      </div>
    )
  return (
    <div style={{ ...shared, top: `${base - 9}em`, width: '8em', height: '9em', marginLeft: '-4em' }}>
      <i style={{ position: 'absolute', inset: 0, borderRadius: '.9em', background: '#d6f3e4', boxShadow: `inset 0 0 0 .12em ${mist}` }} />
      <i style={{ position: 'absolute', left: '1.2em', top: '2em', width: '5.6em', height: '1em', borderRadius: '.4em', background: '#1fa86e' }} />
      <i style={{ position: 'absolute', left: '1.2em', top: '4em', width: '3.6em', height: '.8em', borderRadius: '.4em', background: '#0e7a4f', opacity: 0.4 }} />
    </div>
  )
}

function Tag({ x, y, price, next, caption, led }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x - 7.2}em`,
        top: `${y}em`,
        width: '14.4em',
        height: next ? '7.4em' : '6em',
        borderRadius: '1em',
        background: '#fff',
        boxShadow: next ? '0 0 0 .3em var(--sa), 0 0 2em -.2em var(--sa)' : `inset 0 0 0 .12em ${mist}`,
        color: ink,
      }}
    >
      {next && <i style={{ position: 'absolute', inset: 0, borderRadius: '1em', border: '.3em solid var(--sa)', animation: 'ring 1.6s ease-out infinite' }} />}
      {next && (
        <span dir="auto" style={{ position: 'absolute', left: '1.1em', top: '.7em', fontSize: '1.15em', fontWeight: 700, color: 'var(--sa)' }}>
          {caption}
        </span>
      )}
      <span style={{ position: 'absolute', left: '1.1em', bottom: next ? '.6em' : '50%', transform: next ? 'none' : 'translateY(50%)', fontSize: '2.4em', fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {next ? (
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ animation: 'swap-a 4s ease-in-out infinite', display: 'inline-block' }}>{price}</span>
            <span style={{ position: 'absolute', left: 0, top: 0, animation: 'swap-b 4s ease-in-out infinite' }}>{next}</span>
          </span>
        ) : (
          price
        )}
      </span>
      <i style={{ position: 'absolute', right: '1.1em', top: '1.1em', width: '.8em', height: '.8em', borderRadius: '50%', background: led ? '#34c98a' : mist, animation: led ? 'blink 2.2s ease-in-out infinite' : undefined }} />
    </div>
  )
}

const rows = [
  { base: 19, goods: ['bottle', 'jar', 'bag'], prices: ['₪12', '₪28', '₪19'], next: '₪24' },
  { base: 43, goods: ['box', 'bag', 'bottle'], prices: ['₪9', '₪35', '₪16'] },
]
const cols = [9, 29, 49]

export default function RetailScene() {
  const { t } = useI18n()
  const s = t.scene.retail
  return (
    <div className="scene-root absolute inset-0 overflow-hidden" dir="ltr" style={themeStyle(themes.retail)}>
      <Glow x={30} y={34} size={56} opacity={0.18} />
      <Glow x={82} y={30} size={34} opacity={0.14} />

      {/* Shelving with electronic price tags */}
      <div style={at(3, 4.5, 58, 53.5)}>
        {[0, 1].map((p) => (
          <i key={p} style={{ position: 'absolute', top: 0, bottom: 0, [p ? 'right' : 'left']: 0, width: '1.1em', borderRadius: '.4em', background: post }} />
        ))}
        {rows.map((row, r) => (
          <div key={r}>
            <i style={{ position: 'absolute', left: '1.1em', right: '1.1em', top: `${row.base}em`, height: '1.3em', borderRadius: '.3em', background: plank }} />
            {row.goods.map((g, c) => (
              <Good key={c} kind={g} x={cols[c]} base={row.base} />
            ))}
            {row.prices.map((p, c) => {
              const hot = r === 0 && c === 1
              return <Tag key={c} x={cols[c]} y={row.base + 2.2} price={p} next={hot ? row.next : undefined} caption={s.sale} led={hot} />
            })}
          </div>
        ))}
      </div>

      {/* Contactless rings above the terminal */}
      <div style={at(77.5, 0.5, 7, 7)} aria-hidden="true">
        {[0, 0.8, 1.6].map((d) => (
          <i key={d} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '.25em solid var(--sa)', animation: 'ring 2.4s ease-out infinite', animationDelay: `${d}s` }} />
        ))}
        <i style={{ position: 'absolute', left: '2.6em', top: '2.6em', width: '1.8em', height: '1.8em', borderRadius: '50%', background: 'var(--sa)' }} />
      </div>

      {/* Checkout terminal */}
      <Device style={at(67, 9, 28, 42)} radius={3} bezel={0.9} screenBg="#ffffff">
        <div style={{ padding: '2.2em 2em 0' }}>
          <span dir="auto" style={{ fontSize: '1.5em', color: 'color-mix(in oklab, var(--dv) 62%, #fff)' }}>{s.total}</span>
          <div style={{ marginTop: '.4em', fontSize: '3.6em', fontWeight: 700, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums' }}>₪84.00</div>
        </div>
        <div style={{ margin: '2em 2em 0', display: 'grid', gap: '1.1em' }}>
          {[78, 64, 70].map((w, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <i style={{ width: `${w * 0.5}%`, height: '.8em', borderRadius: '.4em', background: mist }} />
              <i style={{ width: '4em', height: '.8em', borderRadius: '.4em', background: mist }} />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: '2em', right: '2em', bottom: '2.2em', height: '5.4em', borderRadius: '1.2em', background: '#d6f3e4', color: '#0e7a4f', display: 'grid', placeItems: 'center' }}>
          <span dir="auto" style={{ fontSize: '1.9em', fontWeight: 700 }}>✓ {s.paid}</span>
        </div>
      </Device>
    </div>
  )
}
