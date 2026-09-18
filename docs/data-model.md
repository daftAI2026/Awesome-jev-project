# Data model

Canonical stores:

- [`data/items.json`](../data/items.json) — GitHub projects and YouTube explainers
- [`data/x.json`](../data/x.json) — X posts (no tags)

The site concatenates both arrays at build time.

Types live in [`src/lib/types.ts`](../src/lib/types.ts).

## `DirectoryItem`

```ts
interface DirectoryItem {
  id: string
  type: 'github' | 'x' | 'youtube'
  title: string
  summary: string
  tags?: string[]
  url: string
  sourceMeta: SourceMeta
}
```

| Field | Meaning |
| --- | --- |
| `id` | Stable unique key for React lists and collector upserts |
| `type` | Board + card style |
| `title` | Display title (repo name / short headline) — **not** translated by the UI |
| `summary` | Description; for X this is the post text — **not** translated by the UI |
| `tags` | GitHub / YouTube only. X posts omit tags. |
| `url` | Outbound link (repo page or original tweet) |
| `sourceMeta` | Type-specific metadata |

## `SourceMeta`

```ts
interface SourceMeta {
  // GitHub
  stars?: number | null
  forks?: number | null
  openIssues?: number | null
  language?: string | null
  author?: string | null
  repo?: string | null

  // X
  handle?: string | null
  likes?: number | null
  date?: string | null
  mediaUrls?: string[] | null  // first URL used as tweet card image / video poster
  videoUrls?: string[] | null  // remote mp4 URLs; first plays in the card
  avatarUrl?: string | null    // optional profile image
}
```

### GitHub fields

- `repo` — `owner/name`
- `stars`, `forks`, `openIssues`, `language`, `author` — display meta on restrained cards (Phosphor Star / GitFork / Bug)
- Prefer populating from the public GitHub repo API: `stargazers_count` → `stars`, `forks_count` → `forks`, `open_issues_count` → `openIssues`
- Collectors may emit `null` when unknown
- Optional `date` (YYYY-MM-DD) supports the section “Date” sort

### X / YouTube / media

- `handle` — `@user` or `user` (UI normalizes `@`)
- `date` — ISO or short display string (YYYY-MM-DD preferred for sorting)
- `likes` — engagement count
- **`mediaUrls`** — remote image URLs from the post; the UI shows the **first** image inside the social card (or as the `<video poster>`). Never commit binary media into this repo.
- **`videoUrls`** — remote mp4 URLs from the post; the UI plays the **first** with native `<video controls playsInline preload="metadata">`. No autoplay.
- **`avatarUrl`** — optional; reserved for future avatar chrome
- YouTube rows use `type: "youtube"`, `sourceMeta.videoId`, `sourceMeta.views`, and a watch URL. Thumbnail is the first `mediaUrls` entry or `https://i.ytimg.com/vi/{videoId}/hqdefault.jpg`.

### Collector note

When upserting GitHub rows, include `forks` and `openIssues` alongside `stars` whenever the API provides them. Upsert X posts into `data/x.json` (never `items.json`), without `tags`. URLs and `@mentions` in `summary` are parsed into links in the tweet card.

## UI sort (client-only)

Persisted in `localStorage`:

| Section | Key | Default | Options |
| --- | --- | --- | --- |
| GitHub | `awesome-jev-github-sort` | `stars` | `stars` \| `date` \| `name` |
| X | `awesome-jev-x-sort` | `date` (newest first) | `date` \| `likes` |
| YouTube | `awesome-jev-youtube-sort` | `date` (newest first) | `date` \| `views` |

Missing numeric fields sort as `0`; missing dates sort last.

## Consumption

`App.tsx` imports `data/items.json` and `data/x.json`, concatenates them, filters by `type` into section boards, applies user sort after search, and passes each item to `ItemCard`.
