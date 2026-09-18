# Architecture

## Theme

Searchable directory of curated **GitHub projects** and **X posts** about TypeSafe AI’s System One model **[Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)** — typed decisions, SDKs, demos, and integrations.

## Stack

| Layer | Choice |
| --- | --- |
| UI | Vite + React 19 + TypeScript |
| Styling | Tailwind CSS 4 + shadcn **base-nova** (Base UI primitives under `@/components/ui/*`) |
| Icons | Phosphor (`@phosphor-icons/react`) |
| Search | Fuse.js over `data/items.json` + `data/x.json` |
| Deploy | Cloudflare Workers static assets (`wrangler.toml` → `./dist`, SPA `not_found_handling`) |

Design stays monochrome / restrained: no decorative gradients. See [design.md](design.md).

## Information architecture

```
Sticky header
  └── Title + GitHub + language
Body
  ├── Aside (lg+): source nav — GitHub / X / YouTube
  └── Main
        ├── Search (GitHub only; full-width underline, / to focus)
        ├── Rank tabs (Stars / Date / Name, or Date / Likes / Views)
        ├── Section boards
        └── Footer notice
Mobile
  └── Source nav in a left Sheet (not a floating chip)
```

- **Search** is a full-width underline field on the GitHub board only. Fuse.js (`src/lib/search.ts`) does not filter X or YouTube.
- **Rank** sits under search as a shadcn `ToggleGroup`, not custom underline tabs.
- **Source filter** is a left rail on large screens; below `lg` it opens a shadcn Sheet from the left.
- **Section boards** are type-scoped lists (`github` / `x` / `youtube`). YouTube only appears when the directory has videos. Empty sections show “No items yet.”
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
| `data/items.json` | GitHub + YouTube directory data |
| `data/x.json` | X posts (no tags; links parsed in the card) |
| `src/lib/types.ts` | `DirectoryItem` / `SourceMeta` |
| `src/components/ItemCard.tsx` | GitHub + X card UIs |
| `src/App.tsx` | Header, search, section boards |
