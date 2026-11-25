import { Link } from '../router'

const base =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium whitespace-nowrap transition duration-300 ease-out-expo active:scale-[0.97]'
const variants = {
  primary: 'bg-accent text-on-accent hover:brightness-110',
  secondary: 'border border-line bg-surface/60 text-fg hover:bg-surface',
  inverse: 'bg-bg text-fg hover:brightness-95',
}

/** Renders a router link when `to` is given, an <a> for `href`, otherwise a <button>. */
export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
