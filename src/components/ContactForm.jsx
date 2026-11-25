import { useEffect, useId, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { site } from '../config'
import { sendToDiscord } from '../lib/sendToDiscord'
import { Icon } from './Icons'

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
const COOLDOWN_MS = 30000
const STORE_KEY = 'axiom-last-send'

const fieldCls =
  'w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-[16px] text-fg outline-none transition duration-200 placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-warn'

const empty = { name: '', business: '', email: '', phone: '', type: '', message: '', website: '' }

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-warn">
          {error}
        </p>
      )}
    </div>
  )
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/**
 * The form posts straight to a Discord webhook (see src/lib/sendToDiscord.js and the README).
 * States: idle, sending, sent, error. A hidden honeypot field and a 30 second cooldown keep casual spam out.
 */
export default function ContactForm() {
  const { t, lang } = useI18n()
  const f = t.contact.form
  const uid = useId()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [message, setMessage] = useState('')
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) }
  const resultRef = useRef(null)

  // Move focus to the result so keyboard and screen reader users land on it.
  useEffect(() => {
    if (status === 'sent' || status === 'error') resultRef.current?.focus()
  }, [status])

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = f.required
    if (!values.email.trim()) next.email = f.required
    else if (!emailOk(values.email.trim())) next.email = f.emailInvalid
    if (!values.message.trim()) next.message = f.required
    return next
  }

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const next = validate()
    setErrors(next)
    const first = ['name', 'email', 'message'].find((k) => next[k])
    if (first) {
      refs[first].current?.focus()
      return
    }

    // The honeypot is invisible to people. If it has a value, a bot filled it: look successful, send nothing.
    if (values.website) {
      setStatus('sent')
      return
    }

    let last = 0
    try {
      last = Number(localStorage.getItem(STORE_KEY)) || 0
    } catch {
      /* storage can be unavailable; the cooldown is a convenience */
    }
    if (Date.now() - last < COOLDOWN_MS) {
      setMessage(f.wait)
      setStatus('error')
      return
    }

    setStatus('sending')
    const result = await sendToDiscord(values, lang)

    if (result.status === 'ok') {
      try {
        localStorage.setItem(STORE_KEY, String(Date.now()))
      } catch {
        /* ignore */
      }
      setValues(empty)
      setStatus('sent')
    } else if (result.status === 'unset') {
      // No webhook configured (for example a fresh clone). Fall back to the visitor's email app.
      console.warn('[axiom] VITE_DISCORD_WEBHOOK_URL is not set; opening a mailto link instead. See README.')
      const body = [
        `${f.name}: ${values.name.trim()}`,
        values.business.trim() && `${f.business}: ${values.business.trim()}`,
        values.type && `${f.type}: ${values.type}`,
        `${f.email}: ${values.email.trim()}`,
        values.phone.trim() && `${f.phone}: ${values.phone.trim()}`,
        '',
        values.message.trim(),
      ]
        .filter((l) => l !== false)
        .join('\n')
      setStatus('idle')
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`
    } else {
      setMessage(result.status === 'rate' ? f.rate : f.errorText)
      setStatus('error')
    }
  }

  const id = (k) => `${uid}-${k}`
  const a11y = (k) => ({ 'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? `${id(k)}-err` : undefined })
  const sending = status === 'sending'

  if (status === 'sent') {
    return (
      <div className="page-in grid place-items-center gap-5 rounded-[1.75rem] border border-line bg-surface px-6 py-20 text-center sm:px-9">
        <span className="grid size-16 place-items-center rounded-full bg-accent text-on-accent">
          <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path className="tick-draw" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <div role="status">
          <h2 ref={resultRef} tabIndex={-1} className="text-3xl font-semibold track-display outline-none">
            {f.sentTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-lg text-muted">{f.sentText}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 inline-flex h-11 items-center rounded-full border border-line px-6 text-[15px] transition hover:bg-bg"
        >
          {f.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate aria-busy={sending} className="spot grid gap-5 rounded-[1.75rem] border border-line bg-surface p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id('name')} label={f.name} error={errors.name}>
          <input ref={refs.name} id={id('name')} name="name" autoComplete="name" required maxLength={80} value={values.name} onChange={set('name')} className={fieldCls} {...a11y('name')} />
        </Field>
        <Field id={id('business')} label={f.business}>
          <input id={id('business')} name="business" autoComplete="organization" maxLength={80} value={values.business} onChange={set('business')} className={fieldCls} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id('email')} label={f.email} error={errors.email}>
          <input ref={refs.email} id={id('email')} name="email" type="email" dir="ltr" autoComplete="email" inputMode="email" required maxLength={120} value={values.email} onChange={set('email')} className={`${fieldCls} text-start`} {...a11y('email')} />
        </Field>
        <Field id={id('phone')} label={f.phone}>
          <input id={id('phone')} name="phone" type="tel" dir="ltr" autoComplete="tel" inputMode="tel" maxLength={30} value={values.phone} onChange={set('phone')} className={`${fieldCls} text-start`} />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 block text-[15px] font-medium">{f.type}</legend>
        <div className="flex flex-wrap gap-2">
          {f.types.map((label) => (
            <label key={label} className="cursor-pointer">
              <input type="radio" name="type" value={label} checked={values.type === label} onChange={set('type')} className="peer sr-only" />
              <span className="inline-flex h-11 items-center rounded-full border border-line bg-bg px-5 text-[15px] text-muted transition duration-200 hover:text-fg peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id={id('message')} label={f.message} error={errors.message}>
        <textarea ref={refs.message} id={id('message')} name="message" rows={5} required maxLength={3000} value={values.message} onChange={set('message')} className={`${fieldCls} resize-y`} {...a11y('message')} />
      </Field>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. Only bots fill it. */}
      <div aria-hidden="true" className="absolute -start-[9999px] top-0 h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </label>
      </div>

      {status === 'error' && (
        <div role="alert" className="rounded-2xl border border-warn/50 bg-warn/10 px-5 py-4">
          <p ref={resultRef} tabIndex={-1} className="font-medium outline-none">
            {f.errorTitle}
          </p>
          <p className="mt-1 text-[15px] text-muted">
            {message}
            {site.email && (
              <>
                {' '}
                <a href={`mailto:${site.email}`} dir="ltr" className="text-fg underline underline-offset-4">
                  {site.email}
                </a>
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-7 text-[15px] font-medium text-on-accent transition duration-300 ease-out-expo hover:brightness-110 active:scale-[0.97] disabled:cursor-wait disabled:opacity-80"
        >
          {sending ? <Spinner /> : null}
          {sending ? f.sending : f.send}
        </button>
        <p className="text-sm text-muted">{f.hint}</p>
      </div>
    </form>
  )
}
