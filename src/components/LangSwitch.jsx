import { dictionaries, languages, useI18n } from '../i18n'

export default function LangSwitch({ className = '' }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div role="group" aria-label={t.ui.language} className={`flex rounded-full border border-line bg-surface/60 p-0.5 ${className}`}>
      {languages.map((code) => {
        const d = dictionaries[code]
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={d.name}
            aria-label={d.name}
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`h-8 min-w-8 rounded-full px-2 sm:min-w-9 sm:px-2.5 text-[13px] font-medium transition duration-300 ${
              active ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
            }`}
          >
            {d.label}
          </button>
        )
      })}
    </div>
  )
}
