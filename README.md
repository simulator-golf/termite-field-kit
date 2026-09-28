# Termite Field Kit

A field reference for wood-destroying insect (WDI) inspectors, served as one public page:

- **Damage photos** — example photos of termite, carpenter ant and wood rot damage, each
  with a note on what to look for.
- **Side by side** — termites vs. carpenter ants, termites vs. rot, and carpenter ants vs.
  rot, each with the top three differences.
- **Field ID guide** comparing the damage types side by side, **questions to ask** the
  homeowner, **knockout factors**, and an **FAQ**.

No accounts, no database and no API keys — it's a static page.

## How it works

The page is a static file, `public/field-kit.html`, served at `/` by a rewrite in
`next.config.ts`.

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

## Editing the content

The FAQ, field ID guide, questions and knockout factors are plain HTML in
`public/field-kit.html` — edit the text there and redeploy.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deploys to Vercel (or any Node host) with no configuration: import the repository as a
new project and deploy.
