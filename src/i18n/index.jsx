import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import he from './he'
import ar from './ar'
import en from './en'

export const dictionaries = { he, ar, en }
export const languages = ['he', 'ar', 'en']

const I18nContext = createContext(null)

function initialLang() {
  const current = document.documentElement.lang
  return languages.includes(current) ? current : 'he'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  const setLang = useCallback((next) => {
    if (!languages.includes(next)) return
    setLangState(next)
    try {
      localStorage.setItem('axiom-lang', next)
    } catch {
      /* private mode: the choice just will not persist */
    }
  }, [])

  const dir = lang === 'en' ? 'ltr' : 'rtl'

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
  }, [lang, dir])

  const value = useMemo(() => ({ lang, dir, setLang, t: dictionaries[lang] }), [lang, dir, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
