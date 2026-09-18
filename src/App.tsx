import { useCallback, useEffect, useMemo, useState } from 'react'
import { GithubLogo, Info } from '@phosphor-icons/react'
import itemsData from '../data/items.json'
import { ItemCard } from '@/components/ItemCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useI18n } from '@/i18n'
import { searchItems } from '@/lib/search'
import { sortGithubItems, sortXItems } from '@/lib/sort'
import type {
  DirectoryItem,
  FilterType,
  GithubSort,
  ItemType,
  XSort,
} from '@/lib/types'

const items = itemsData as DirectoryItem[]

const GITHUB_SORT_KEY = 'awesome-jev-github-sort'
const X_SORT_KEY = 'awesome-jev-x-sort'
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

function readStoredZone(): FilterType {
  try {
    const v = localStorage.getItem(ZONE_KEY)
    if (v === 'all' || v === 'github' || v === 'x' || v === 'tiktok') return v
  } catch {
    /* ignore */
  }
  return 'all'
}

export default function App() {
  const { locale, setLocale, t } = useI18n()
  const [query, setQuery] = useState('')
  const [githubSort, setGithubSort] = useState<GithubSort>(readStoredGithubSort)
  const [xSort, setXSort] = useState<XSort>(readStoredXSort)
  const [zone, setZone] = useState<FilterType>(readStoredZone)

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
      localStorage.setItem(ZONE_KEY, zone)
    } catch {
      /* ignore */
    }
  }, [zone])

  const onGithubSortChange = useCallback((groupValue: string[]) => {
    const next = groupValue[0] as GithubSort | undefined
    if (next === 'stars' || next === 'date' || next === 'name') {
      setGithubSort(next)
    }
  }, [])

  const onXSortChange = useCallback((groupValue: string[]) => {
    const next = groupValue[0] as XSort | undefined
    if (next === 'date' || next === 'likes') {
      setXSort(next)
    }
  }, [])

  const onZoneChange = useCallback((groupValue: string[]) => {
    const next = groupValue[0] as FilterType | undefined
    if (next === 'all' || next === 'github' || next === 'x' || next === 'tiktok') {
      setZone(next)
    }
  }, [])

  const matched = useMemo(
    () => searchItems(items, query, zone, []),
    [query, zone],
  )

  const sections = useMemo(() => {
    const sectionIds: ItemType[] =
      zone === 'all' ? ['github', 'x', 'tiktok'] : [zone]
    const defs: { id: ItemType; title: string }[] = sectionIds.map((id) => ({
      id,
      title:
        id === 'github'
          ? t('sectionGithub')
          : id === 'x'
            ? t('sectionX')
            : t('sectionTikTok'),
    }))
    return defs
      .map((section) => {
        let sectionItems = matched.filter((item) => item.type === section.id)
        if (section.id === 'github') {
          sectionItems = sortGithubItems(sectionItems, githubSort)
        } else {
          sectionItems = sortXItems(sectionItems, xSort)
        }
        return { ...section, items: sectionItems }
      })
      .filter((section) => section.items.length > 0 || !query.trim())
  }, [matched, query, zone, githubSort, xSort, t])

  const hasQuery = query.trim().length > 0
  const totalMatched = matched.length
  const resultLabel =
    totalMatched === 1
      ? t('resultCount', { count: totalMatched })
      : t('resultCountPlural', { count: totalMatched })

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 pb-20 pt-8 sm:px-8 sm:pt-10">
      <a href="#main" className="skip-link sr-only">
        {t('skipToContent')}
      </a>

      <header className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[1.5rem]">
              Awesome JEV
            </h1>
            <Button
              variant="ghost"
              size="icon"
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
              <GithubLogo className="size-4" weight="regular" aria-hidden />
            </Button>
            <div
              className="ml-1 flex items-center gap-0.5"
              role="group"
              aria-label={t('languageToggle')}
            >
              <Button
                variant={locale === 'zh' ? 'secondary' : 'ghost'}
                size="xs"
                onClick={() => setLocale('zh')}
                aria-pressed={locale === 'zh'}
              >
                中文
              </Button>
              <Button
                variant={locale === 'en' ? 'secondary' : 'ghost'}
                size="xs"
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
              >
                EN
              </Button>
            </div>
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:text-[14px]">
            {t('tagline')}
          </p>
        </div>

        <div className="w-full shrink-0 space-y-2 sm:w-64 md:w-72">
          <label htmlFor="directory-search" className="sr-only">
            {t('searchLabel')}
          </label>
          <Input
            id="directory-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            autoComplete="off"
            className="h-9 text-[13px]"
          />
          <ToggleGroup
            value={[zone]}
            onValueChange={onZoneChange}
            variant="outline"
            size="sm"
            aria-label={t('zoneLabel')}
            className="w-full"
          >
            <ToggleGroupItem value="all" className="flex-1">
              {t('zoneAll')}
            </ToggleGroupItem>
            <ToggleGroupItem value="github" className="flex-1">
              {t('zoneGithub')}
            </ToggleGroupItem>
            <ToggleGroupItem value="x" className="flex-1">
              {t('zoneX')}
            </ToggleGroupItem>
            <ToggleGroupItem value="tiktok" className="flex-1">
              {t('zoneTikTok')}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </header>

      {hasQuery && (
        <p className="mb-6 text-[13px] text-muted-foreground tabular-nums">
          {resultLabel}
        </p>
      )}

      <main id="main" className="flex-1 space-y-14" tabIndex={-1}>
        {hasQuery && totalMatched === 0 ? (
          <p className="py-10 text-[15px] text-muted-foreground">
            {t('emptySearch')}
          </p>
        ) : (
          sections.map((section, index) => (
            <section key={section.id} aria-labelledby={`section-${section.id}`}>
              {index > 0 && <Separator className="mb-10" />}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-baseline gap-3">
                  <h2
                    id={`section-${section.id}`}
                    className="text-[15px] font-medium tracking-tight text-foreground"
                  >
                    {section.title}
                  </h2>
                  <span className="text-[12px] tabular-nums text-muted-foreground">
                    {section.items.length}
                  </span>
                </div>

                {section.id === 'github' ? (
                  <ToggleGroup
                    value={[githubSort]}
                    onValueChange={onGithubSortChange}
                    variant="outline"
                    size="sm"
                    aria-label={t('sortGithubLabel')}
                  >
                    <ToggleGroupItem value="stars">{t('sortStars')}</ToggleGroupItem>
                    <ToggleGroupItem value="date">{t('sortDate')}</ToggleGroupItem>
                    <ToggleGroupItem value="name">{t('sortName')}</ToggleGroupItem>
                  </ToggleGroup>
                ) : (
                  <ToggleGroup
                    value={[xSort]}
                    onValueChange={onXSortChange}
                    variant="outline"
                    size="sm"
                    aria-label={
                      section.id === 'tiktok'
                        ? t('sortTikTokLabel')
                        : t('sortXLabel')
                    }
                  >
                    <ToggleGroupItem value="date">{t('sortDate')}</ToggleGroupItem>
                    <ToggleGroupItem value="likes">{t('sortLikes')}</ToggleGroupItem>
                  </ToggleGroup>
                )}
              </div>

              {section.items.length === 0 ? (
                <p className="text-[14px] text-muted-foreground">
                  {t('emptySection')}
                </p>
              ) : section.id === 'x' || section.id === 'tiktok' ? (
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

      <footer className="mt-16 pt-8">
        <Separator className="mb-8" />
        <Alert>
          <Info weight="regular" aria-hidden />
          <AlertTitle>{t('footerTitle')}</AlertTitle>
          <AlertDescription>{t('footerDescription')}</AlertDescription>
        </Alert>
      </footer>
    </div>
  )
}
