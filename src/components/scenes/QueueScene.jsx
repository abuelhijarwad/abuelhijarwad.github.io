import { useI18n } from '../../i18n'
import { themes, themeStyle, at, Glow, Device, btnFill, ink, paper } from './shared'

/** Two stacked labels that trade places; the keyframes live in index.css. */
function Swap({ a, b, d = 4, style }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', ...style }}>
      <span style={{ display: 'inline-block', animation: `swap-a ${d}s ease-in-out infinite` }}>{a}</span>
      <span style={{ position: 'absolute', left: 0, top: 0, animation: `swap-b ${d}s ease-in-out infinite` }}>{b}</span>
    </span>
  )
}

const before = ['A-25', 'A-26', 'A-27']
const after = ['A-26', 'A-27', 'A-28']

export default function QueueScene() {
  const { t } = useI18n()
  const s = t.scene.queue
  return (
    <div className="scene-root absolute inset-0 overflow-hidden" dir="ltr" style={themeStyle(themes.queue)}>
      <Glow x={20} y={32} size={46} opacity={0.2} />
      <Glow x={72} y={26} size={52} opacity={0.16} />

      {/* Ticket kiosk */}
      <div style={at(5, 5, 25, 53)}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '3em', background: 'linear-gradient(var(--dv2),var(--dv))', boxShadow: '0 3em 5em -2em rgba(5,16,31,.6), inset 0 0 0 .12em rgba(255,255,255,.12)' }} />
        <div style={{ position: 'absolute', left: '2em', right: '2em', top: '2.2em', height: '16em', borderRadius: '1.6em', background: paper, color: ink, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: '1.2em' }}>
          <span dir="auto" style={{ fontSize: '1.6em', fontWeight: 700 }}>{s.take}</span>
          <i style={{ ...btnFill, width: '10em', height: '5em', borderRadius: '1.4em', display: 'grid', placeItems: 'center', animation: 'press 4s ease-in-out infinite', animationDelay: '-2.82s' }}>
            <svg viewBox="0 0 24 24" style={{ width: '2.8em', height: '2.8em' }} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z" />
              <path d="M13 6v12" strokeDasharray="2 2.4" />
            </svg>
          </i>
        </div>
        <div style={{ position: 'absolute', left: '2.6em', right: '2.6em', top: '20.6em', height: '1.1em', borderRadius: '.6em', background: 'var(--dv0)' }} />
        {/* The ticket slides out of the slot */}
        <div style={{ position: 'absolute', left: '4.5em', top: '21.6em', width: '16em', height: '26em', overflow: 'hidden' }} aria-hidden="true">
          <div
            style={{
              position: 'absolute',
              left: '2em',
              top: 0,
              width: '12em',
              height: '21em',
              background: '#fff',
              color: ink,
              padding: '2em 1.2em',
              textAlign: 'center',
              boxShadow: '0 1em 3em -1em rgba(5,16,31,.35)',
              clipPath: 'polygon(0 0,100% 0,100% 96%,92% 100%,83% 96%,75% 100%,66% 96%,58% 100%,50% 96%,42% 100%,33% 96%,25% 100%,17% 96%,8% 100%,0 96%)',
              animation: 'ticket-out 4s ease-in-out infinite',
            }}
          >
            <div style={{ fontSize: '3.4em', fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>A-27</div>
            <div style={{ margin: '1.4em 0 1em', borderTop: '.2em dashed var(--sm)' }} />
            <i style={{ display: 'block', margin: '0 auto .7em', width: '70%', height: '.8em', borderRadius: '.4em', background: 'var(--sm)' }} />
            <i style={{ display: 'block', margin: '0 auto', width: '45%', height: '.8em', borderRadius: '.4em', background: 'var(--sm)' }} />
          </div>
        </div>
      </div>

      {/* Waiting-room display */}
      <Device style={at(36, 6, 60, 34)} radius={2.4} bezel={0.9} screenBg="var(--dv)">
        <div style={{ position: 'absolute', left: '3em', top: '2.6em', color: '#fff' }}>
          <span dir="auto" style={{ fontSize: '1.8em', color: 'var(--ss)' }}>{s.serving}</span>
          <div style={{ marginTop: '.5em', fontSize: '8em', fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            <Swap a="A-24" b="A-25" />
          </div>
          <span dir="auto" style={{ display: 'inline-block', marginTop: '1.6em', padding: '.5em 1.3em', borderRadius: '2em', ...btnFill, fontSize: '1.7em', fontWeight: 700 }}>
            {s.counter} 2
          </span>
        </div>
        <div style={{ position: 'absolute', right: '2.6em', top: '2.6em', bottom: '2.6em', width: '19em', color: '#fff' }}>
          <span dir="auto" style={{ fontSize: '1.7em', color: 'var(--ss)' }}>{s.next}</span>
          <div style={{ marginTop: '1.4em', display: 'grid', gap: '1.1em' }}>
            {before.map((n, i) => (
              <div key={n} style={{ borderRadius: '1.2em', background: 'rgba(255,255,255,.08)', padding: '.7em 1.4em', fontSize: '2.5em', fontWeight: 600, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', opacity: 1 - i * 0.18 }}>
                <Swap a={n} b={after[i]} />
              </div>
            ))}
          </div>
        </div>
      </Device>

      {/* Staff screen */}
      <Device style={at(51, 44, 30, 14.5)} radius={2.4} bezel={0.8} screenBg="#ffffff">
        <div style={{ position: 'absolute', inset: 0, padding: '0 2em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span dir="auto" style={{ fontSize: '1.7em', fontWeight: 700 }}>{s.counter} 2</span>
          <span dir="auto" style={{ display: 'inline-block', padding: '.7em 1.6em', borderRadius: '2em', ...btnFill, color: '#fff', fontSize: '1.6em', fontWeight: 700, animation: 'press 4s ease-in-out infinite', animationDelay: '-1.42s' }}>
            {t.ui.next}
          </span>
        </div>
      </Device>
    </div>
  )
}
