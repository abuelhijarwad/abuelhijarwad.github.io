import { useEffect } from 'react'
import { useI18n } from '../i18n'

/** Updates <title> and the description meta tag when the page or language changes. */
export function usePageMeta(page) {
  const { t } = useI18n()
  const meta = t.meta[page]
  useEffect(() => {
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.desc)
  }, [meta])
}
