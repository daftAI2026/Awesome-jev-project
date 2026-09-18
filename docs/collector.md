# Collector (JEV 资讯收集)

## Theme

Collect **TypeSafe AI System One** / flagship model **[Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)** signals only — typed, fast decision APIs for software; SDKs, demos, integrations, and discussion with links.

X search should stay on TypeSafe / Jev / System One / typesafe.ai (with links). Do **not** use unrelated keyword families.

## Role

The **JEV 资讯收集** bot syncs curated signals into [`data/items.json`](../data/items.json) (GitHub / YouTube) and [`data/x.json`](../data/x.json) (X posts) so the navigation site stays current without hand-editing every entry.

Intended cadence: **weekday sync** (Mon–Fri) — pull new GitHub finds and high-signal X posts, upsert by stable `id`, open or push a data PR / commit.

## What it writes

Each collected row must match the [`DirectoryItem`](data-model.md) schema:

- GitHub → `type: "github"` with `sourceMeta.repo`, `stars`, `forks`, `openIssues`, `language`, …
- X → append to `data/x.json`, `type: "x"`, with `sourceMeta.handle`, `date`, `likes`, `replies`, `retweets`, `bookmarks`, and optionally `author` / `mediaUrls` / `videoUrls` / `avatarUrl`. Do **not** add `tags`. Prefer original posts, not reply threads. Do not store view counts.

Rules:

- Real URLs only (no invented tweet ids, no `PLACEHOLDER`).
- Prefer posts/repos that clearly mention TypeSafe, System One, or Jev.
- Links only — do not download or commit media binaries; store remote `mediaUrls` and `videoUrls`.

## How the site consumes it

1. Bot / PR updates `data/items.json` and/or `data/x.json`.
2. Vite bundles both JSON files at build time (`App.tsx` concatenates them).
3. Fuse.js search + section boards re-render from that static array.
4. Push to `main` → Workers Builds → `npm run build` → assets deploy.

There is no runtime live API yet; the footer Alert notes that live sync is future work. Until then, weekday collector commits are the refresh path.

## Status / TODO

Seed includes official TypeSafe SDKs/skills, community demos (browser-use Jev Ultrafast, openjev, jevlike, …), MCP/routers, and linked X posts. First incremental TypeSafe sync can upsert from GitHub search + X after this seed lands on `main`.

When X items land, prefer ids like `x-<tweetId>` and set `url` to the original post permalink so tweet cards link correctly.
