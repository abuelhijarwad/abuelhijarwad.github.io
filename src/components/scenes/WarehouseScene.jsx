import { useI18n } from '../../i18n'
import { themes, themeStyle, at, Glow, Device, ink, mist } from './shared'

const paperScreen = 'var(--sp)'

const rows = [
  [8, 6, 9, 7],
  [7, 9, 6, 8],
  [9, 7, 8, 6],
]
const heights = [
  [7, 9, 6, 8],
  [8, 6, 9, 7],
  [6, 8, 7, 9],
]

export default function WarehouseScene() {
  const { t } = useI18n()
  const s = t.scene.warehouse
  const stock = [
    [s.items[0], 48, 62],
    [s.items[1], 120, 90],
    [s.items[2], 64, 48],
    [s.items[3], 32, 30],
  ]
  return (
    <div className="scene-root absolute inset-0 overflow-hidden" dir="ltr" style={themeStyle(themes.warehouse)}>
      <Glow x={26} y={36} size={52} opacity={0.2} />
      <Glow x={82} y={30} size={36} opacity={0.14} />

      {/* Shelving */}
      <div style={at(4, 7, 38, 49)}>
        {[0, 1].map((p) => (
          <i key={p} style={{ position: 'absolute', top: 0, bottom: 0, [p ? 'right' : 'left']: 0, width: '1.1em', borderRadius: '.4em', background: 'color-mix(in oklab, var(--c-fg) 70%, transparent)' }} />
        ))}
        {rows.map((row, r) => (
          <div key={r} style={{ position: 'absolute', left: '1.1em', right: '1.1em', top: `${r * 16.2 + 1.2}em`, height: '14.6em' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '1em', borderRadius: '.3em', background: 'color-mix(in oklab, var(--c-fg) 55%, transparent)' }} />
            <div style={{ position: 'absolute', left: '1.6em', right: '1.6em', bottom: '1em', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              {row.map((w, c) => {
                const target = r === 1 && c === 3
                return (
                  <div
                    key={c}
                    style={{
                      width: `${w}em`,
                      height: `${heights[r][c]}em`,
                      borderRadius: '.8em',
                      background: target ? '#ffffff' : 'var(--c-surface)',
                      boxShadow: target ? '0 0 0 .3em var(--sa), 0 0 2.4em var(--sa)' : 'inset 0 0 0 .12em var(--c-line)',
                      position: 'relative',
                      overflow: target ? 'visible' : 'hidden',
                    }}
                  >
                    {target && <i style={{ position: 'absolute', inset: 0, borderRadius: '.8em', border: '.3em solid var(--sa)', animation: 'ring 1.5s ease-out infinite' }} />}
                    <i style={{ position: 'absolute', left: '15%', right: '15%', top: '22%', height: '.9em', borderRadius: '.3em', background: target ? 'var(--sa)' : 'var(--c-line)' }} />
                    <i style={{ position: 'absolute', left: '15%', width: '40%', top: '46%', height: '.6em', borderRadius: '.3em', background: 'var(--c-line)' }} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Scanner beam, aimed at the highlighted box */}
      <div style={at(39.6, 31.2, 6.6, 7)}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '.45em',
            borderRadius: '.3em',
            background: 'linear-gradient(270deg, var(--sa), transparent)',
            boxShadow: '0 0 1.2em var(--sa)',
            ['--sweep']: '6.4em',
            animation: 'laser 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Handheld scanner */}
      <div style={at(47, 29.5, 15, 28, { transform: 'rotate(-6deg)', transformOrigin: '50% 100%' })}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: '13em', height: '7.2em', borderRadius: '2.4em 2.4em 1em 1em', background: ink, boxShadow: 'inset 0 0 0 .12em rgba(255,255,255,.12)' }} />
        <i style={{ position: 'absolute', left: '-.6em', top: '2.2em', width: '1.6em', height: '3em', borderRadius: '.5em', background: 'var(--dv0)', boxShadow: '0 0 1em var(--sa)' }} />
        <div style={{ position: 'absolute', left: '2em', top: '6.4em', width: '11em', height: '21.6em', borderRadius: '1.6em 1.6em 3em 3em', background: 'linear-gradient(var(--dv2),var(--dv))', boxShadow: '0 3em 5em -2em rgba(5,16,31,.6), inset 0 0 0 .12em rgba(255,255,255,.12)' }} />
        <div style={{ position: 'absolute', left: '3em', top: '7.8em', width: '9em', height: '8em', borderRadius: '1.2em', background: paperScreen, padding: '.8em', display: 'grid', alignContent: 'center', gap: '.3em', color: ink }}>
          <span dir="auto" style={{ fontSize: '1.2em', fontWeight: 700, color: '#0e7a4f' }}>✓ {s.scanned}</span>
          <span style={{ fontSize: '1.15em', color: 'color-mix(in oklab, var(--dv) 62%, #fff)', fontVariantNumeric: 'tabular-nums' }}>SKU 4821</span>
        </div>
        <i style={{ position: 'absolute', left: '5em', top: '18.4em', width: '5em', height: '2.2em', borderRadius: '1.1em', background: 'var(--sa)' }} />
      </div>

      {/* Inventory panel */}
      <Device style={at(64, 9, 33, 38)} radius={3} bezel={0.9} screenBg="#ffffff">
        <div style={{ padding: '2em 2em 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span dir="auto" style={{ fontSize: '2.1em', fontWeight: 700 }}>{s.stock}</span>
          <i style={{ width: '.9em', height: '.9em', borderRadius: '50%', background: '#1fa86e', display: 'block' }} />
        </div>
        <div style={{ padding: '1.4em 2em', display: 'grid', gap: '1.1em' }}>
          {stock.map(([name, qty, pct], i) => {
            const live = i === 2
            return (
              <div key={name} style={{ position: 'relative', borderRadius: '1em', padding: '.7em .9em', margin: '-.7em -.9em' }}>
                {live && <i style={{ position: 'absolute', inset: 0, borderRadius: '1em', background: 'var(--sa)', opacity: 0, animation: 'flash 3s ease-in-out infinite' }} />}
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span dir="auto" style={{ fontSize: '1.5em', fontWeight: 600 }}>{name}</span>
                  <span style={{ position: 'relative', fontSize: '1.7em', fontWeight: 700, fontVariantNumeric: 'tabular-nums', minWidth: '2.2em', textAlign: 'right' }}>
                    {live ? (
                      <>
                        <span style={{ animation: 'swap-a 3s ease-in-out infinite' }}>{qty}</span>
                        <span style={{ position: 'absolute', right: 0, animation: 'swap-b 3s ease-in-out infinite' }}>{qty - 1}</span>
                      </>
                    ) : (
                      qty
                    )}
                  </span>
                </div>
                <div style={{ position: 'relative', marginTop: '.7em', height: '.7em', borderRadius: '.4em', background: mist }}>
                  <i style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, borderRadius: '.4em', background: 'var(--sa)' }} />
                </div>
              </div>
            )
          })}
        </div>
      </Device>
    </div>
  )
}

