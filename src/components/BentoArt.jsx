/** Small line illustrations for the four cards. All colors come from theme variables. */
const stroke = { stroke: 'var(--c-line)', strokeWidth: 1.5 }

export function SoftwareArt() {
  return (
    <svg viewBox="0 0 320 150" className="h-full w-full" aria-hidden="true">
      <g className="transition duration-700 ease-out-expo group-hover:-translate-x-3 group-hover:-translate-y-2">
        <rect x="46" y="14" width="170" height="104" rx="14" fill="var(--c-surface-2)" {...stroke} />
      </g>
      <g className="transition duration-700 ease-out-expo">
        <rect x="70" y="30" width="170" height="104" rx="14" fill="var(--c-bg)" {...stroke} />
        <rect x="86" y="46" width="60" height="8" rx="4" fill="var(--c-line)" />
        <rect x="86" y="64" width="110" height="6" rx="3" fill="var(--c-line)" />
        <rect x="86" y="78" width="88" height="6" rx="3" fill="var(--c-line)" />
      </g>
      <g className="transition duration-700 ease-out-expo group-hover:translate-x-3 group-hover:translate-y-2">
        <rect x="104" y="46" width="170" height="104" rx="14" fill="var(--c-surface)" stroke="var(--c-accent)" strokeWidth="1.5" />
        <rect x="104" y="46" width="170" height="26" rx="14" fill="var(--c-accent)" opacity=".14" />
        <circle cx="120" cy="59" r="3.5" fill="var(--c-accent)" />
        <rect x="120" y="86" width="64" height="30" rx="8" fill="var(--c-accent)" />
        <rect x="192" y="86" width="64" height="30" rx="8" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export function HardwareArt() {
  const pins = Array.from({ length: 5 }, (_, i) => 118 + i * 22)
  return (
    <svg viewBox="0 0 320 150" className="h-full w-full" aria-hidden="true">
      <g stroke="var(--c-line)" strokeWidth="2.2" strokeLinecap="round">
        {pins.map((p, i) => (
          <g key={p}>
            <path d={`M${p} 20v22M${p} 108v22`} style={i === 2 ? { stroke: 'var(--c-accent)', animation: 'blink 2.2s ease-in-out infinite' } : undefined} />
            <path d={`M96 ${34 + i * 20}h-22M224 ${34 + i * 20}h22`} style={i === 3 ? { stroke: 'var(--c-accent)', animation: 'blink 2.2s ease-in-out .8s infinite' } : undefined} />
          </g>
        ))}
      </g>
      <rect x="96" y="42" width="128" height="66" rx="12" fill="var(--c-surface)" stroke="var(--c-fg)" strokeWidth="1.6" />
      <rect x="116" y="58" width="36" height="34" rx="6" fill="var(--c-accent)" opacity=".16" stroke="var(--c-accent)" strokeWidth="1.4" />
      <path d="M168 66h36M168 76h28M168 86h34" stroke="var(--c-line)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function ConnectionArt() {
  const d = 'M62 75 C 120 75, 120 75, 160 75 S 220 75, 258 75'
  return (
    <svg viewBox="0 0 320 150" className="h-full w-full" aria-hidden="true">
      <path d={d} fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" style={{ animation: 'dash-flow 1.4s linear infinite' }} />
      <circle r="4.5" fill="var(--c-accent)">
        <animateMotion dur="2.6s" repeatCount="indefinite" path={d} />
      </circle>
      <g>
        <rect x="26" y="48" width="48" height="54" rx="10" fill="var(--c-surface)" {...stroke} />
        <rect x="35" y="58" width="30" height="20" rx="4" fill="var(--c-line)" />
        <rect x="35" y="84" width="20" height="5" rx="2.5" fill="var(--c-line)" />
      </g>
      <g>
        <rect x="246" y="48" width="48" height="54" rx="10" fill="var(--c-surface)" {...stroke} />
        <rect x="255" y="58" width="30" height="8" rx="3" fill="var(--c-line)" />
        <rect x="255" y="74" width="30" height="20" rx="4" fill="var(--c-accent)" opacity=".18" stroke="var(--c-accent)" strokeWidth="1.2" />
      </g>
      <rect x="140" y="58" width="40" height="34" rx="9" fill="var(--c-bg)" stroke="var(--c-accent)" strokeWidth="1.5" />
      <path d="M152 75h16M163 69l6 6-6 6" fill="none" stroke="var(--c-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SupportArt() {
  return (
    <svg viewBox="0 0 320 150" className="h-full w-full" aria-hidden="true">
      {[0, 1.1, 2.2].map((delay) => (
        <circle key={delay} cx="160" cy="75" r="30" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" style={{ transformOrigin: '160px 75px', animation: `ring 3.3s ease-out ${delay}s infinite` }} />
      ))}
      <circle cx="160" cy="75" r="34" fill="var(--c-surface)" {...stroke} />
      <circle cx="160" cy="75" r="22" fill="var(--c-accent)" />
      <path d="m150 75.5 7 7 13-14" fill="none" stroke="var(--c-on-accent)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="var(--c-line)">
        <rect x="40" y="62" width="64" height="8" rx="4" />
        <rect x="40" y="80" width="44" height="8" rx="4" />
        <rect x="216" y="62" width="64" height="8" rx="4" />
        <rect x="236" y="80" width="44" height="8" rx="4" />
      </g>
    </svg>
  )
}
