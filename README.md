# Axiom website (site v1)

Company website for Axiom: software and hardware, built together, for any kind of business.

Stack: Vite, React (plain JavaScript, no TypeScript), Tailwind CSS v4.

## Run it

Requires Node 20.19+ or 22.12+.

```bash
npm install
cp .env.example .env   # then paste your Discord webhook URL (see below)
npm run dev            # http://localhost:5173
npm run build          # production build in dist/
npm run preview        # serve the production build locally
```

## What is in it

- Pages: Home, About, Team, Contact, and a 404 (`/`, `/about`, `/team`, `/contact`).
- Languages: Hebrew (default), Arabic, English. Switch from the header. The choice is remembered, and `lang` and `dir` on `<html>` change with it (Hebrew and Arabic are right-to-left).
- Theme: light and dark. Follows the system setting until the visitor presses the toggle, then their choice is remembered.
- Home: an auto-rotating showcase (restaurants, bakeries, warehouses, retail, service) with a progress bar, pause button, swipe and arrow keys; a band of 20 business types; the moment where the two strokes of the Axiom mark cross (it plays once, by itself, when it comes into view, and never holds the scroll); four solution cards; a four-step process whose line draws itself.
- Light that follows the pointer: any element with the `.spot` class gets a glow and a lit edge under the mouse (one listener for the whole page, see `src/hooks/useSpotlight.js`). Add `spot` to a new card and it works.
- Other touches: a soft light and dot grid in the hero, headings that rise word by word, a reading-progress line under the header, page transitions, a large faint wordmark in the footer.
- Responsive from 320px phones to wide desktops. Motion respects "reduce motion".

## Contact form: Discord webhook

The form posts straight from the visitor's browser to a Discord channel, as one embed (name, business, type, email, phone, site language, message).

1. In Discord: channel settings > Integrations > Webhooks > New webhook > Copy webhook URL.
2. Put it in `.env`:
   ```
   VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/....
   ```
3. On Vercel (or any host): add the same variable in the project's environment variables, then redeploy. Vite reads it at build time.

If the variable is empty the form falls back to opening the visitor's email app, and logs a warning in the console.

Be aware of one limit of this approach: the webhook URL ends up in the built JavaScript, so anyone who opens the browser tools can read it and post to that channel. What is already in place: a hidden honeypot field, a 30 second cooldown per browser, length limits, and `allowed_mentions` switched off so nothing typed in the form can ping `@everyone`. If spam ever becomes a problem: put the webhook channel where only the team can see it, delete and re-create the webhook (the old link stops working), or move the call into a small serverless function (for example `api/contact.js` on Vercel) so the URL stays on the server. Only `src/lib/sendToDiscord.js` would change.

## Before launch: edit these

1. `src/config.js` holds the email, phone and WhatsApp. Empty values are hidden on the site. The email is a placeholder (`hello@axiom.co.il`): change it to the real one.
2. `src/team.js` holds the CEO and team members: names in three languages (please check the spelling), photo path, links. Put photos in `public/team/`. The CEO's bio text is in the language files under `team.ceo`.
3. Hebrew and Arabic copy was written for this site and should be read by a native speaker before launch. All text lives in `src/i18n/he.js`, `ar.js` and `en.js`, with the same structure in each file.
4. `public/sitemap.xml` and the JSON-LD block in `index.html` assume the domain `https://axiom.co.il`.

## Project layout

```
src/
  config.js            contact details, webhook (from .env)
  team.js              CEO and team members
  i18n/                he / ar / en dictionaries and the language provider
  theme.jsx            light, dark and system theme
  router.jsx           small history-API router (pages, in-page anchors)
  index.css            brand tokens, Tailwind theme, animations, pointer light
  lib/sendToDiscord.js posts the contact form to the webhook
  components/          Navbar, Hero, Showcase, Industries, Bridge, What, Process, ContactForm, ...
    scenes/            the five illustrated scenes used by the showcase
  pages/               Home, About, Team, Contact, NotFound
  hooks/               in-view, pointer light, page title
public/                favicons, web manifest, robots.txt, sitemap.xml
```

Brand colors and fonts come from the Visual Identity folder (`brand-tokens.css`). Colors are CSS variables in `src/index.css`, so changing a token changes both themes.

## Deploying

Any static host works. The site is a single-page app, so unknown paths must serve `index.html`. `vercel.json` already does that for Vercel. On other hosts add the equivalent rewrite.

### GitHub Pages (already set up)

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

1. Create a public repository and push this folder to its `main` branch.
2. Repository Settings > Pages > Source: **GitHub Actions**.
3. Optional: Settings > Secrets and variables > Actions > New repository secret, name `VITE_DISCORD_WEBHOOK_URL`, value your webhook. Then run the workflow again (Actions > Deploy site > Run workflow).
4. The site appears at `https://<user>.github.io/<repo>/` only if the repository is named `<user>.github.io`; for any other repository name use a custom domain (below), because the site expects to live at the root of its address.

Custom domain such as `www.axiom.co.il`: add a file `public/CNAME` containing just the domain, set the same domain in Settings > Pages, and create a DNS `CNAME` record pointing to `<user>.github.io`.

## Fonts

DM Sans (Latin), Heebo (Hebrew) and IBM Plex Sans Arabic (Arabic), installed through Fontsource, so no requests go to Google Fonts.
