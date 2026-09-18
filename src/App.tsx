import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { GithubLogo, Info, List, MagnifyingGlass } from '@phosphor-icons/react'
import itemsData from '../data/items.json'
import xData from '../data/x.json'
import { ItemCard } from '@/components/ItemCard'
import { ZoneNav } from '@/components/ZoneNav'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useI18n } from '@/i18n'
import { countByType, countGithubProjects } from '@/lib/counts'
import { searchItems } from '@/lib/search'
import { sortGithubItems, sortXItems, sortYoutubeItems } from '@/lib/sort'
import { cn } from 'cn'
import type {
  DirectoryItem,
  FilterType,
  GithubSort,
  XSort,
  YoutubeSort,
} from '@/lib/types'

const items = [
  ...(itemsData as DirectoryItem[]),
  ...(xData as DirectoryItem[]),
]
const githubProjectCount = countGithubProjects(items)
const zoneCounts: Record<FilterType, number> = {
  github: countByType(items, 'github'),
  x: countByType(items, 'x'),
  youtube: countByType(items, 'youtube'),
}
const visibleZones: FilterType[] = [
  'github',
  'x',
  ...(zoneCounts.youtube > 0 ? (['youtube'] as const) : []),
]

const GITHUB_SORT_KEY = 'awesome-jev-github-sort'
const X_SORT_KEY = 'awesome-jev-x-sort'
const YOUTUBE_SORT_KEY = 'awesome-jev-youtube-sort'
const ZONE_KEY = 'awesome-jev-zone'

function readStoredGithubSort(): GithubSort {
  try {
    const v = localStorage.getItem(GITHUB_SORT_KEY)
    if (v === 'stars' || v === 'date' || v === 'name') return v
  } catch {
    /* ignore */
  }
  return 'stars'
}

function readStoredXSort(): XSort {
  try {
    const v = localStorage.getItem(X_SORT_KEY)
    if (v === 'date' || v === 'likes') return v
  } catch {
    /* ignore */
  }
  return 'date'
}

function readStoredYoutubeSort(): YoutubeSort {
  try {
    const v = localStorage.getItem(YOUTUBE_SORT_KEY)
    if (v === 'date' || v === 'views') return v
  } catch {
    /* ignore */
  }
  return 'date'
}

function readStoredZone(): FilterType {
  try {
    const v = localStorage.getItem(ZONE_KEY)
    if (v === 'github' || v === 'x' || v === 'youtube') return v
  } catch {
    /* ignore */
  }
  return 'github'
}

function RankTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'border-b-2 pb-1 text-sm transition-colors',
        active
          ? 'border-foreground text-foreground'
          : 'border-transparent text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}

export default function App() {
  const { locale, setLocale, t } = useI18n()
  const [query, setQuery] = useState('')
  const [githubSort, setGithubSort] = useState<GithubSort>(readStoredGithubSort)
  const [xSort, setXSort] = useState<XSort>(readStoredXSort)
  const [youtubeSort, setYoutubeSort] = useState<YoutubeSort>(
    readStoredYoutubeSort,
  )
  const [zone, setZone] = useState<FilterType>(readStoredZone)
  const [zoneOpen, setZoneOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      localStorage.setItem(GITHUB_SORT_KEY, githubSort)
    } catch {
      /* ignore */
    }
  }, [githubSort])

  useEffect(() => {
    try {
      localStorage.setItem(X_SORT_KEY, xSort)
    } catch {
      /* ignore */
    }
  }, [xSort])

  useEffect(() => {
    try {
      localStorage.setItem(YOUTUBE_SORT_KEY, youtubeSort)
    } catch {
      /* ignore */
    }
  }, [youtubeSort])

  useEffect(() => {
    try {
      localStorage.setItem(ZONE_KEY, zone)
    } catch {
      /* ignore */
    }
  }, [zone])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (zone !== 'github') return
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }
      const target = event.target as HTMLElement | null
      const tag = target?.tagName
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target?.isContentEditable
      ) {
        return
      }
      event.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zone])

  const onZoneChange = useCallback((next: FilterType) => {
    setZone(next)
    setZoneOpen(false)
  }, [])

  const socialZone = zone === 'x'
  const youtubeZone = zone === 'youtube'

  const matched = useMemo(() => {
    if (zone === 'github') {
      return searchItems(items, query, 'github', [])
    }
    return items.filter((item) => item.type === zone)
  }, [query, zone])

  const sections = useMemo(() => {
    const title =
      zone === 'github'
        ? t('sectionGithub')
        : zone === 'x'
          ? t('sectionX')
          : t('sectionYoutube')
    let sectionItems = matched
    if (zone === 'github') {
      sectionItems = sortGithubItems(sectionItems, githubSort)
    } else if (zone === 'youtube') {
      sectionItems = sortYoutubeItems(sectionItems, youtubeSort)
    } else {
      sectionItems = sortXItems(sectionItems, xSort)
    }
    return [{ id: zone, title, items: sectionItems }]
  }, [matched, zone, githubSort, xSort, youtubeSort, t])

  const githubSearching = zone === 'github'
  const hasQuery = githubSearching && query.trim().length > 0
  const totalMatched = matched.length
  const resultLabel =
    totalMatched === 1
      ? t('resultCount', { count: totalMatched })
      : t('resultCountPlural', { count: totalMatched })

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="skip-link sr-only">
        {t('skipToContent')}
      </a>

      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <h1 className="truncate text-lg font-medium tracking-tight text-foreground">
              Awesome JEV
            </h1>
            <Button
              variant="ghost"
              size="icon-sm"
              nativeButton={false}
              render={
                <a
                  href="https://github.com/daftAI2026/awesome-jev"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              aria-label={t('openGithub')}
              className="text-muted-foreground"
            >
              <GithubLogo className="size-4" weight="fill" aria-hidden />
            </Button>
          </div>
          <div
            className="flex shrink-0 items-center gap-2"
            role="group"
            aria-label={t('languageToggle')}
          >
            <Button
              variant={locale === 'zh' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setLocale('zh')}
              aria-pressed={locale === 'zh'}
            >
              中文
            </Button>
            <Button
              variant={locale === 'en' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setLocale('en')}
              aria-pressed={locale === 'en'}
            >
              EN
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10 lg:py-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ZoneNav
              zone={zone}
              zones={visibleZones}
              counts={zoneCounts}
              onZoneChange={onZoneChange}
            />
          </div>
        </aside>

        <div className="min-w-0">
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {t('tagline')}
          </p>

          <div className="mb-6">
            {githubSearching && (
              <div className="relative">
                <MagnifyingGlass
                  className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-muted-foreground"
                  weight="fill"
                  aria-hidden
                />
                <label htmlFor="directory-search" className="sr-only">
                  {t('searchLabel')}
                </label>
                <Input
                  ref={searchRef}
                  id="directory-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  autoComplete="off"
                  className="h-12 rounded-none border-0 border-b border-border bg-transparent px-8 py-3 text-base shadow-none focus-visible:border-foreground focus-visible:ring-0 md:text-sm dark:bg-transparent"
                />
                <kbd
                  className="pointer-events-none absolute inset-y-0 right-0 hidden items-center sm:flex"
                  title={t('searchHint')}
                >
                  <span className="rounded-lg border border-border px-2 py-1 font-mono text-xs text-muted-foreground">
                    /
                  </span>
                </kbd>
              </div>
            )}
            <div
              className={cn(
                'flex flex-wrap items-center gap-4',
                githubSearching && 'mt-4',
              )}
            >
              <Sheet open={zoneOpen} onOpenChange={setZoneOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden"
                      aria-label={t('openZones')}
                    />
                  }
                >
                  <List className="size-4" weight="fill" aria-hidden />
                  {zone === 'github'
                    ? t('zoneGithub')
                    : zone === 'x'
                      ? t('zoneX')
                      : t('zoneYoutube')}
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetHeader className="sr-only">
                    <SheetTitle>{t('zoneLabel')}</SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-4">
                    <ZoneNav
                      zone={zone}
                      zones={visibleZones}
                      counts={zoneCounts}
                      onZoneChange={onZoneChange}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <div
                className="flex gap-4"
                role="tablist"
                aria-label={t('rankLabel')}
              >
                {youtubeZone ? (
                  <>
                    <RankTab
                      active={youtubeSort === 'date'}
                      onClick={() => setYoutubeSort('date')}
                    >
                      {t('sortDate')}
                    </RankTab>
                    <RankTab
                      active={youtubeSort === 'views'}
                      onClick={() => setYoutubeSort('views')}
                    >
                      {t('sortViews')}
                    </RankTab>
                  </>
                ) : socialZone ? (
                  <>
                    <RankTab
                      active={xSort === 'date'}
                      onClick={() => setXSort('date')}
                    >
                      {t('sortDate')}
                    </RankTab>
                    <RankTab
                      active={xSort === 'likes'}
                      onClick={() => setXSort('likes')}
                    >
                      {t('sortLikes')}
                    </RankTab>
                  </>
                ) : (
                  <>
                    <RankTab
                      active={githubSort === 'stars'}
                      onClick={() => setGithubSort('stars')}
                    >
                      {t('sortStars')}
                      <span className="ml-1 tabular-nums text-muted-foreground">
                        ({githubProjectCount})
                      </span>
                    </RankTab>
                    <RankTab
                      active={githubSort === 'date'}
                      onClick={() => setGithubSort('date')}
                    >
                      {t('sortDate')}
                    </RankTab>
                    <RankTab
                      active={githubSort === 'name'}
                      onClick={() => setGithubSort('name')}
                    >
                      {t('sortName')}
                    </RankTab>
                  </>
                )}
              </div>
            </div>
          </div>

          {hasQuery && (
            <p className="mb-6 text-sm text-muted-foreground tabular-nums">
              {resultLabel}
            </p>
          )}

          <main id="main" className="space-y-12" tabIndex={-1}>
            {hasQuery && totalMatched === 0 ? (
              <p className="py-10 text-sm text-muted-foreground">
                {t('emptySearch')}
              </p>
            ) : (
              sections.map((section, index) => (
                <section
                  key={section.id}
                  aria-labelledby={`section-${section.id}`}
                >
                  {index > 0 && <Separator className="mb-10" />}
                  <h2 id={`section-${section.id}`} className="sr-only">
                    {section.title}
                  </h2>

                  {section.items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {t('emptySection')}
                    </p>
                  ) : section.id === 'x' || section.id === 'youtube' ? (
                    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                      {section.items.map((item) => (
                        <li key={item.id} className="mb-4 break-inside-avoid">
                          <ItemCard item={item} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {section.items.map((item) => (
                        <li key={item.id} className="min-w-0">
                          <ItemCard item={item} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))
            )}
          </main>
        </div>
      </div>

      <footer className="mx-auto w-full max-w-6xl px-4 pt-8 pb-20 sm:px-8">
        <Separator className="mb-8" />
        <Alert>
          <Info weight="fill" aria-hidden />
          <AlertTitle>{t('footerTitle')}</AlertTitle>
          <AlertDescription>{t('footerDescription')}</AlertDescription>
        </Alert>
      </footer>
    </div>
  )
}
