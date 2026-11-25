// Edit these before launch. Anything left empty is hidden on the site.
export const site = {
  name: 'Axiom',
  domain: 'axiom.co.il',
  email: 'hello@axiom.co.il', // shown on the contact page and in the footer
  phone: '', // e.g. '+972-50-000-0000'
  whatsapp: '', // digits only with country code, e.g. '972500000000'
  // The contact form posts straight to this Discord webhook. Set it in .env (see .env.example).
  // It is baked into the built files at build time, so treat it as public: see README.
  discordWebhook: (import.meta.env.VITE_DISCORD_WEBHOOK_URL || '').trim(),
}
