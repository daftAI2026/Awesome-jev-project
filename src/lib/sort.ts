import type { DirectoryItem, GithubSort, XSort, YoutubeSort } from './types'

function numOrZero(v: number | null | undefined): number {
  return typeof v === 'number' && !Number.isNaN(v) ? v : 0
}

/** Missing / empty dates sort last for both asc and “newest first”. */
function dateKey(item: DirectoryItem): string | null {
  const d = item.sourceMeta.date
  if (d == null || String(d).trim() === '') return null
  return String(d).slice(0, 10)
}

/** 1-based star rank among GitHub rows. Ties break by title, then id. */
export function githubStarRanks(items: DirectoryItem[]): Map<string, number> {
  const github = items.filter((item) => item.type === 'github')
  github.sort((a, b) => {
    const stars = numOrZero(b.sourceMeta.stars) - numOrZero(a.sourceMeta.stars)
    if (stars !== 0) return stars
    const name = a.title.localeCompare(b.title, undefined, {
      sensitivity: 'base',
    })
    if (name !== 0) return name
    return a.id.localeCompare(b.id)
  })
  const ranks = new Map<string, number>()
  github.forEach((item, i) => {
    ranks.set(item.id, i + 1)
  })
  return ranks
}

export function sortGithubItems(
  items: DirectoryItem[],
  sort: GithubSort,
): DirectoryItem[] {
  const copy = [...items]
  if (sort === 'stars') {
    copy.sort(
      (a, b) => numOrZero(b.sourceMeta.stars) - numOrZero(a.sourceMeta.stars),
    )
  } else if (sort === 'name') {
    copy.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }),
    )
  } else {
    // date — newest first; missing last
    copy.sort((a, b) => {
      const da = dateKey(a)
      const db = dateKey(b)
      if (da == null && db == null) return 0
      if (da == null) return 1
      if (db == null) return -1
      return db.localeCompare(da)
    })
  }
  return copy
}

export function sortYoutubeItems(
  items: DirectoryItem[],
  sort: YoutubeSort,
): DirectoryItem[] {
  const copy = [...items]
  if (sort === 'views') {
    copy.sort(
      (a, b) => numOrZero(b.sourceMeta.views) - numOrZero(a.sourceMeta.views),
    )
  } else {
    copy.sort((a, b) => {
      const da = dateKey(a)
      const db = dateKey(b)
      if (da == null && db == null) return 0
      if (da == null) return 1
      if (db == null) return -1
      return db.localeCompare(da)
    })
  }
  return copy
}

export function sortXItems(items: DirectoryItem[], sort: XSort): DirectoryItem[] {
  const copy = [...items]
  if (sort === 'likes') {
    copy.sort(
      (a, b) => numOrZero(b.sourceMeta.likes) - numOrZero(a.sourceMeta.likes),
    )
  } else {
    // date — newest first; missing last
    copy.sort((a, b) => {
      const da = dateKey(a)
      const db = dateKey(b)
      if (da == null && db == null) return 0
      if (da == null) return 1
      if (db == null) return -1
      return db.localeCompare(da)
    })
  }
  return copy
}
