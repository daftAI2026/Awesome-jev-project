export type ItemType = 'github' | 'x' | 'youtube'

/** GitHub, X, and YouTube collectors may emit null for unknown fields. */
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
  /** X / YouTube: remote preview image URLs (first used as card image). */
  mediaUrls?: string[] | null
  /** Optional profile avatar URL (X or GitHub). */
  avatarUrl?: string | null
  /** YouTube: watch id `xxxxxxxxxxx`. */
  videoId?: string | null
  /** YouTube: view count. */
  views?: number | null
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
export type YoutubeSort = 'date' | 'views'
