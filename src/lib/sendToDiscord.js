import { site } from '../config'

const clip = (value, max) => {
  const s = String(value ?? '').trim()
  return s.length > max ? `${s.slice(0, max - 1)}…` : s
}

/**
 * Posts the contact form to a Discord webhook as one embed.
 * Labels are always English (the team reads them); the message is sent exactly as written.
 * `allowed_mentions: { parse: [] }` stops anything typed in the form from pinging @everyone, @here or roles.
 * Returns { status: 'ok' | 'rate' | 'error' | 'unset', retryAfter? }.
 */
export async function sendToDiscord(data, lang) {
  const url = site.discordWebhook
  if (!/^https:\/\/(?:[a-z]+\.)?discord(?:app)?\.com\/api\/webhooks\//i.test(url)) return { status: 'unset' }

  const fields = [
    ['Name', data.name, true],
    ['Business', data.business, true],
    ['Type', data.type, true],
    ['Email', data.email, true],
    ['Phone', data.phone, true],
    ['Site language', lang, true],
  ]
    .filter(([, value]) => String(value ?? '').trim())
    .map(([name, value, inline]) => ({ name, value: clip(value, 300), inline }))

  const payload = {
    username: 'Axiom website',
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: 'New message from the website',
        description: clip(data.message, 3500),
        color: 0x2f5bff,
        fields,
        footer: { text: site.domain },
        timestamp: new Date().toISOString(),
      },
    ],
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (res.ok) return { status: 'ok' }
    if (res.status === 429) {
      const body = await res.json().catch(() => ({}))
      return { status: 'rate', retryAfter: Math.ceil(Number(body.retry_after) || 5) }
    }
    return { status: 'error', code: res.status }
  } catch {
    return { status: 'error' }
  } finally {
    clearTimeout(timer)
  }
}
