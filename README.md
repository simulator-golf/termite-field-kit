# Termite Field Kit

A field reference for wood-destroying insect (WDI) inspectors, served as one public page:

- **Damage photos** — example photos of termite, carpenter ant and wood rot damage, each
  with a note on what to look for.
- **Side by side** — termites vs. carpenter ants, termites vs. rot, and carpenter ants vs.
  rot, each with the top three differences.
- **Knockout factors** — the company's knockout list (spray foam on the sill plate, stucco
  below grade, flat roof, crawlspace under 18 in.), each with a diagram of what is and
  isn't a knockout.
- **Field ID guide** comparing the damage types, **questions to ask** the homeowner, and
  an **FAQ**.

The site is private: visitors enter a shared access code before they can see anything.
No accounts, no database and no API keys.

## How it works

The page is a static file, `public/field-kit.html`, served at `/` by a rewrite in
`next.config.ts`.

`src/proxy.ts` checks every request, including the photos, for an access cookie. Without
it, visitors are sent to `/unlock` to enter the code. The correct code sets a cookie for
30 days. The cookie holds a hash of the code, so changing `SITE_ACCESS_CODE` signs
everyone out and they need the new code. Wrong guesses are limited to 10 per 10 minutes
per visitor (best effort; counted per server instance).

If `SITE_ACCESS_CODE` isn't set, the site stays locked and the unlock page says the code
hasn't been set up.

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `SITE_ACCESS_CODE` | Yes | The code people enter to open the site. Share it only with the people who should see the site. Change it to cut off everyone who had the old one. |

## Adding or changing photos

Photos live in `public/gallery/` and are referenced by file name from the "Damage photos"
and "Side by side" sections of `public/field-kit.html`. To swap a photo, replace the file
with one of the same name (JPEG, ideally under 1400px wide and under 300 KB) and
redeploy. To add one, copy an existing `<figure class="shot">` block in the HTML and point
it at the new file. A card whose file is missing shows "Photo coming soon".

Each card has a `<p class="credit"></p>` line for the photographer credit and license,
e.g. `Photo: Jane Doe, CC BY-SA 4.0`. Only use photos you own or whose license allows reuse
on a public site.

Wood-boring beetles are covered in the field ID table but don't have a photo section yet.

## Editing the knockout factors

Each knockout factor is an `<article class="kf">` in the "Knockout factors" section of
`public/field-kit.html`, with the rule text and two inline SVG diagrams ("Knockout" and
"Not a knockout"). To add one, copy an existing article and change the text; a photo can
go in place of a diagram as an `<img src="/gallery/...">`.

## Editing the content

The FAQ, field ID guide, questions and knockout factors are plain HTML in
`public/field-kit.html` — edit the text there and redeploy.

## Setup

```bash
npm install
SITE_ACCESS_CODE=your-code npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deploys to Vercel (or any Node host): import the repository as a new project, add
`SITE_ACCESS_CODE` under Settings → Environment Variables, and deploy. After changing the
variable, redeploy for it to take effect.
