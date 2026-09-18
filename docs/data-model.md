# Data model

Canonical store: [`data/items.json`](../data/items.json) — a JSON array of `DirectoryItem`.

Types live in [`src/lib/types.ts`](../src/lib/types.ts).

## `DirectoryItem`

```ts
interface DirectoryItem {
  id: string
  type: 'github' | 'x' | 'youtube'
  title: string
  summary: string
  tags: string[]
  url: string
  sourceMeta: SourceMeta
}
```

| Field | Meaning |
| --- | --- |
| `id` | Stable unique key for React lists and collector upserts |
| `type` | Board + card style |
| `title` | Display title (repo name / short headline) — **not** translated by the UI |
| `summary` | Description; for X this is usually the post text — **not** translated by the UI |
| `tags` | Free-form tokens for Fuse search |
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
  mediaUrls?: string[] | null  // first URL used as tweet card image
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
- **`mediaUrls`** — remote image URLs from the post; the UI shows the **first** image inside the social / video card. Never commit binary media into this repo.
- **`avatarUrl`** — optional; reserved for future avatar chrome
- YouTube rows use `type: "youtube"`, `sourceMeta.videoId`, `sourceMeta.views`, and a watch URL. Thumbnail is the first `mediaUrls` entry or `https://i.ytimg.com/vi/{videoId}/hqdefault.jpg`.

### Collector note

When upserting GitHub rows, include `forks` and `openIssues` alongside `stars` whenever the API provides them. Leave existing X rows (`type: "x"`) untouched unless updating that post.

## UI sort (client-only)

Persisted in `localStorage`:

| Section | Key | Default | Options |
| --- | --- | --- | --- |
| GitHub | `awesome-jev-github-sort` | `stars` | `stars` \| `date` \| `name` |
| X | `awesome-jev-x-sort` | `date` (newest first) | `date` \| `likes` |
| YouTube | `awesome-jev-youtube-sort` | `date` (newest first) | `date` \| `views` |

Missing numeric fields sort as `0`; missing dates sort last.

## Consumption

`App.tsx` imports `data/items.json`, casts to `DirectoryItem[]`, filters by `type` into section boards, applies user sort after search, and passes each item to `ItemCard`.
