# Contributing

Thanks for helping curate **Awesome JEV** — a directory of **GitHub projects and X posts** about **TypeSafe AI’s System One model [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)** (typed decisions, SDKs, demos, integrations).

## Add items via `data/items.json`

All site content is seeded from [`data/items.json`](data/items.json). Prefer editing that file (or letting the collector merge into it) over hand-editing the README list alone.

### Schema (`DirectoryItem`)

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Stable unique id, e.g. `gh-owner-repo` or `x-<tweetId>` |
| `type` | `"github"` \| `"x"` | Controls which board / card style |
| `title` | `string` | Repo name or short post title |
| `summary` | `string` | One–two sentence description (X: post body) |
| `tags` | `string[]` | Lowercase tokens; used by search (prefer `jev`, `sdk`, `agent`, …) |
| `url` | `string` | Canonical link (repo or original tweet) |
| `sourceMeta` | `object` | See [`docs/data-model.md`](docs/data-model.md) |

### `sourceMeta` (common)

- **GitHub:** `stars`, `forks`, `openIssues`, `language`, `author`, `repo`, optional `avatarUrl`
- **X:** `handle`, `date`, `likes`, optional `mediaUrls` (image URLs), optional `avatarUrl`

Do not invent fake tweet URLs. If you lack a real `url`, skip the item. Never commit `PLACEHOLDER` entries.

## Theme

**In scope:** TypeSafe AI, System One models, **Jev**, official/community SDKs, agent skills, browser & computer-use demos, MCP connectors, routers, awesome-lists, and high-signal discussion with outbound links (e.g. typesafe.ai, GitHub, docs).

**Out of scope:** Unrelated projects or anything that does not clearly connect to TypeSafe / System One / Jev.

## PR hygiene

- One project (or one coherent batch of related links) per PR when possible.
- Include a short summary and useful tags.
- Prefer **real, maintained** open-source projects (or high-signal X posts via the collector).
- Keep the README awesome-list section in sync when adding notable GitHub projects.
- Run `npm run build` locally if you touch TypeScript / UI.

## Not allowed

- Invented or PLACEHOLDER URLs / tweet IDs.
- Hosting or embedding media files in this repo (thumbnails must be remote URLs only, e.g. X CDN).
- Scraped credentials, paywalled dumps, or clearly abusive ToS violations.

## Docs

- Architecture: [`docs/architecture.md`](docs/architecture.md)
- Data model: [`docs/data-model.md`](docs/data-model.md)
- Collector: [`docs/collector.md`](docs/collector.md)
