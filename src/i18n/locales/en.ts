export const en = {
  githubCount: '{count} GitHub projects indexed',
  tagline:
    "Curated GitHub projects and X posts about TypeSafe AI's System One model Jev — typed decisions, SDKs, demos, integrations.",
  searchPlaceholder: 'Search…',
  searchLabel: 'Search',
  skipToContent: 'Skip to content',
  openGithub: 'Open source on GitHub',
  languageToggle: 'Language',
  sectionGithub: 'GitHub Open Source',
  sectionX: 'X Posts',
  sectionTikTok: 'TikTok Posts',
  zoneLabel: 'Content zone',
  zoneAll: 'All',
  zoneGithub: 'GitHub',
  zoneX: 'X',
  zoneTikTok: 'TikTok',
  resultCount: '{count} result',
  resultCountPlural: '{count} results',
  emptySearch: 'No matches. Try another query.',
  emptySection: 'No items yet.',
  footerTitle: 'Community directory',
  footerDescription:
    'TypeSafe Jev / System One projects and discussion Launch post: typesafe.ai/blog/introducing-system-one-models-and-jev. Live API sync is future work; content today is static seed data plus weekday collector updates.',
  sortStars: 'Stars',
  sortDate: 'Date',
  sortName: 'Name',
  sortLikes: 'Likes',
  sortGithubLabel: 'Sort GitHub items',
  sortXLabel: 'Sort X items',
  sortTikTokLabel: 'Sort TikTok items',
} as const

export type MessageKey = keyof typeof en
export type Messages = { [K in MessageKey]: string }
