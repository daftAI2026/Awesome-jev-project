import type { DirectoryItem, ItemType } from '@/lib/types'

/** Count directory items by source type (live from data, never hardcode). */
export function countByType(
  items: readonly DirectoryItem[],
  type: ItemType,
): number {
  return items.reduce((n, item) => n + (item.type === type ? 1 : 0), 0)
}

export function countGithubProjects(items: readonly DirectoryItem[]): number {
  return countByType(items, 'github')
}
