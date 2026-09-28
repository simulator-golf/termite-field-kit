# Termite Field Kit

A field reference for wood-destroying insect (WDI) inspectors, served as one public page:

- **Photo check** — upload up to 4 photos and get a preliminary read on whether the damage
  looks like subterranean termites, drywood termites, carpenter ants, water damage/decay,
  or something else, with what supports the call, what to check on site, and what photos
  would help.
- **Field ID guide**, **questions to ask** the homeowner, **knockout factors**, and an
  **FAQ**.

Results are a preliminary read from photos only; the inspector on site makes the call.

## How it works

The page is a static file, `public/field-kit.html`, served at `/` by a rewrite in
`next.config.ts`. Its photo check posts to `/api/analyze`
(`src/app/api/analyze/route.ts`), which sends the photos to Claude through the Anthropic
API and returns a structured result. Photos are shrunk in the browser to 1600px on the
long side before upload, so large phone photos stay under the host's request size limit.
Nothing is stored.

## Setup

```bash
npm install
ANTHROPIC_API_KEY=sk-ant-... npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Yes | API key from [console.anthropic.com](https://console.anthropic.com). Each photo check is billed to this key. Without it the page still loads, but the photo check reports that it isn't set up. |
| `DAMAGE_CHECK_ACCESS_CODE` | No | If set, the photo check asks for this code before it runs, so only people you give the code to can spend your API credit. Leave unset to let anyone with the link use it. |

## Cost controls

The site is public and each check costs API credit, so `/api/analyze` caps each visitor
at 10 checks per 10 minutes (best effort; on serverless hosts the count is per server
instance) and can require `DAMAGE_CHECK_ACCESS_CODE`. Setting a monthly spend limit on the
API key in the Anthropic Console is a good backstop.

## Deployment

Deploys to Vercel (or any Node host) with no database: import the repository as a new
project, add the environment variables above, and deploy.

## Editing the content

The FAQ, field ID guide, questions and knockout factors are plain HTML in
`public/field-kit.html` — edit the text there and redeploy.
