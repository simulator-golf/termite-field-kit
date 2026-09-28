# Termite Field Kit

A field reference for wood-destroying insect (WDI) inspectors, served as one public page:

- **Damage photos** — example photos of termite, carpenter ant, wood rot and wood-boring
  beetle damage, each with a note on what to look for.
- **Field ID guide** comparing the damage types side by side, **questions to ask** the
  homeowner, **knockout factors**, and an **FAQ**.

No accounts, no database and no API keys — it's a static page.

## How it works

The page is a static file, `public/field-kit.html`, served at `/` by a rewrite in
`next.config.ts`.

## Adding or changing photos

Photos live in `public/gallery/`. Each photo card on the page points at a file name, for
example `/gallery/termite-mud-tubes.jpg`. To add a photo, save it under that exact name
(JPEG, ideally around 1200px wide and under 500 KB) and redeploy. Until a file exists,
its card shows "Photo coming soon".

Each card has an empty `<p class="credit"></p>` line. If a photo isn't yours (for example
from Wikimedia Commons or a university extension site), put the credit and license there,
e.g. `Photo: Jane Doe, CC BY-SA 4.0`, and only use photos whose license allows it.

The expected file names are:

| Section | Files |
| --- | --- |
| Termites | `termite-mud-tubes.jpg`, `termite-galleries.jpg`, `drywood-termite-pellets.jpg` |
| Carpenter ants | `carpenter-ant-galleries.jpg`, `carpenter-ant-frass.jpg`, `carpenter-ant-workers.jpg` |
| Wood rot | `brown-rot.jpg`, `white-rot.jpg`, `rot-at-sill.jpg` |
| Wood-boring beetles | `powderpost-exit-holes.jpg`, `powderpost-frass.jpg`, `old-house-borer.jpg` |

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
