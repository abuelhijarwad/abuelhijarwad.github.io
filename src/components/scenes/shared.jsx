/**
 * Scenes are drawn on a 100 x 62.5 board. 1em equals 1% of the board width
 * (see .scene / .scene-root in index.css), so a scene scales like an image
 * yet stays crisp, themeable and translatable.
 *
 * Rule of thumb used in these files: boxes are sized in em and carry no font-size,
 * text leaves carry the font-size and no em-based box sizes. That keeps em from compounding.
 */
export const at = (left, top, width, height, extra = {}) => ({
  position: 'absolute',
  left: `${left}em`,
  top: `${top}em`,
  ...(width != null && { width: `${width}em` }),
  ...(height != null && { height: `${height}em` }),
  ...extra,
})

/**
 * Every scene has its own palette, applied as CSS variables on the scene root (see themeStyle).
 * sa: accent, sd: deeper accent, ss: soft tint of the accent, dv: dark device body and text,
 * dv2: lighter dark, dv0: darkest, sp: screen paper, sm: hairlines.
 */
export const themes = {
  restaurant: { sa: '#ff5a36', sd: '#c9381a', ss: '#ffe8e0', dv: '#2b1612', dv2: '#4a2a22', dv0: '#170a08', sp: '#fffaf8', sm: '#efd9d1' },
  bakery: { sa: '#d9861c', sd: '#a2600c', ss: '#ffefd2', dv: '#33210f', dv2: '#573a1c', dv0: '#1d1208', sp: '#fffbf3', sm: '#ecdcc3' },
  warehouse: { sa: '#0fa37f', sd: '#0a735a', ss: '#d8f5ec', dv: '#0c2b27', dv2: '#154540', dv0: '#061a17', sp: '#f5fbf9', sm: '#d3e6e1' },
  retail: { sa: '#7c5cff', sd: '#5a3bdb', ss: '#ece7ff', dv: '#1d1745', dv2: '#2f2670', dv0: '#0f0b2a', sp: '#faf8ff', sm: '#dfd9f3' },
  queue: { sa: '#e63e7c', sd: '#b81f5a', ss: '#ffe3ee', dv: '#2a1021', dv2: '#46203a', dv0: '#170812', sp: '#fff8fb', sm: '#f0d6e1' },
}
export const themeStyle = (t) => ({ '--sa': t.sa, '--sd': t.sd, '--ss': t.ss, '--dv': t.dv, '--dv2': t.dv2, '--dv0': t.dv0, '--sp': t.sp, '--sm': t.sm })

/** Primary buttons: a soft diagonal fill, a tinted glow and a thin highlight on the top edge. */
export const btnFill = {
  background: 'linear-gradient(135deg, var(--sa), var(--sd))',
  boxShadow: '0 .6em 1.6em -.6em color-mix(in oklab, var(--sa) 80%, transparent), inset 0 .1em 0 rgba(255,255,255,.3)',
}

export const ink = 'var(--dv)'
export const paper = 'var(--sp)'
export const cobalt = 'var(--sa)'
export const mist = 'var(--sm)'

/** Soft glow behind a scene so the devices feel lit rather than pasted. */
export function Glow({ x = 50, y = 50, size = 60, opacity = 0.22 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        ...at(x - size / 2, y - size / 2, size, size),
        borderRadius: '50%',
        background: `radial-gradient(closest-side, var(--sa, var(--c-accent)), transparent)`,
        opacity,
        filter: 'blur(2em)',
      }}
    />
  )
}

/** A device body: dark bezel with a light screen. Children render inside the screen. */
export function Device({ style, radius = 3, bezel = 1, screenBg = paper, children, className = '' }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        padding: `${bezel}em`,
        borderRadius: `${radius}em`,
        background: ink,
        boxShadow: '0 3em 5em -2em color-mix(in oklab, var(--dv0) 75%, transparent), inset 0 0 0 .12em rgba(255,255,255,.12)',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: `${radius - bezel * 0.7}em`, background: screenBg, color: ink }}>
        {children}
        {/* A faint reflection across the glass */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(120deg, rgba(255,255,255,.14), rgba(255,255,255,0) 38%)' }} />
      </div>
    </div>
  )
}
