import { Icon } from './Icons'
import { useTheme } from '../theme'
import { useI18n } from '../i18n'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t.ui.toLight : t.ui.toDark}
      title={dark ? t.ui.toLight : t.ui.toDark}
      className={`relative grid size-9 place-items-center overflow-hidden rounded-full border border-line bg-surface/60 text-fg transition hover:bg-surface ${className}`}
    >
      <span className={`absolute transition duration-500 ease-out-expo ${dark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
        <Icon name="sun" className="size-[18px]" />
      </span>
      <span className={`absolute transition duration-500 ease-out-expo ${dark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
        <Icon name="moon" className="size-[18px]" />
      </span>
    </button>
  )
}
