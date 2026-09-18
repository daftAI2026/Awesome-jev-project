export type ItemType = 'github' | 'x' | 'tiktok'

/** GitHub, X, and TikTok collectors may emit null for unknown fields. */
export interface SourceMeta {
  stars?: number | null
  forks?: number | null
  openIssues?: number | null
  language?: string | null
  author?: string | null
  handle?: string | null
  likes?: number | null
  date?: string | null
  repo?: string | null
  /** X: image / media URLs attached to the post (first used as card preview). */
  mediaUrls?: string[] | null
  /** Optional profile avatar URL (X or GitHub). */
  avatarUrl?: string | null
}

export interface DirectoryItem {
  id: string
  type: ItemType
  title: string
  summary: string
  tags: string[]
  url: string
  sourceMeta: SourceMeta
}

export type FilterType = 'all' | ItemType

export type GithubSort = 'stars' | 'date' | 'name'
export type XSort = 'date' | 'likes'
