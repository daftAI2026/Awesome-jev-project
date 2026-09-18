# Architecture

## Theme

Searchable directory of curated **GitHub projects** and **X posts** about TypeSafe AI’s System One model **[Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)** — typed decisions, SDKs, demos, and integrations.

## Stack

| Layer | Choice |
| --- | --- |
| UI | Vite + React 19 + TypeScript |
| Styling | Tailwind CSS 4 + shadcn **base-nova** (Base UI primitives under `@/components/ui/*`) |
| Icons | Phosphor (`@phosphor-icons/react`) |
| Search | Fuse.js over `data/items.json` |
| Deploy | Cloudflare Workers static assets (`wrangler.toml` → `./dist`, SPA `not_found_handling`) |

Design stays monochrome / restrained: no decorative gradients. See [design.md](design.md).

## Information architecture

```
Header
  ├── Title + GitHub (ghost icon Button)
  └── Search (top-right on sm+)
Main
  ├── Section: GitHub 开源  → restrained Card grid
  └── Section: X 动态       → compact tweet-style Cards
Footer
  └── Links-only notice (Alert)
```

- **Search** lives in the header (top-right on wider viewports). Query filters all boards via Fuse.js (`src/lib/search.ts`).
- **Section boards** are type-scoped lists (`github` / `x` / `tiktok`). Empty sections show “No items yet.”
- Cards link out (`target="_blank"`) to the original GitHub repo or X post — this site does not host media.

## Workers auto-deploy

[`wrangler.toml`](../wrangler.toml) serves the Vite build as Workers **assets** with SPA fallback.

Typical Git-connected Workers Builds flow:

1. Push to `main`
2. `npm run build` (`tsc -b && vite build`) → `dist/`
3. `npx wrangler deploy`

Local:

```bash
npm install
npm run dev      # Vite
npm run build
npm run deploy   # build + wrangler deploy
```

## Key source paths

| Path | Role |
| --- | --- |
| `data/items.json` | Canonical directory data |
| `src/lib/types.ts` | `DirectoryItem` / `SourceMeta` |
| `src/components/ItemCard.tsx` | GitHub + X card UIs |
| `src/App.tsx` | Header, search, section boards |
