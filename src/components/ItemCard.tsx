import {
  ArrowSquareOut,
  Bug,
  GitFork,
  GithubLogo,
  Heart,
  Play,
  Star,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import type { DirectoryItem } from '@/lib/types'
import { TweetBody } from '@/components/TweetBody'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ItemCardProps {
  item: DirectoryItem
}

function formatCount(n: number): string {
  return n.toLocaleString()
}

function GithubCard({ item }: ItemCardProps) {
  const meta = item.sourceMeta
  const metaBits: string[] = []

  if (meta.repo) metaBits.push(meta.repo)
  if (meta.language) metaBits.push(meta.language)

  const hasMetrics =
    meta.stars != null || meta.forks != null || meta.openIssues != null

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card size="sm" className="h-full transition-colors hover:bg-muted/60">
        <CardHeader>
          <CardTitle className="flex items-start justify-between gap-2 text-sm tracking-tight group-hover:underline group-hover:underline-offset-2">
            <span className="flex min-w-0 items-start gap-2">
              <GithubLogo
                className="mt-1 size-3.5 shrink-0 text-muted-foreground"
                weight="regular"
                aria-hidden
              />
              <span className="min-w-0">{item.title}</span>
            </span>
            <ArrowSquareOut
              className="mt-1 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              weight="regular"
              aria-hidden
            />
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {item.summary}
          </CardDescription>
        </CardHeader>
        {(metaBits.length > 0 || hasMetrics || (item.tags ?? []).length > 0) && (
          <CardContent className="mt-auto space-y-2">
            {metaBits.length > 0 && (
              <p className="font-mono text-xs tabular-nums leading-relaxed text-muted-foreground">
                {metaBits.join(' · ')}
              </p>
            )}
            {hasMetrics && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tabular-nums text-muted-foreground">
                {meta.stars != null && (
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3 shrink-0" weight="regular" aria-hidden />
                    {formatCount(meta.stars)}
                  </span>
                )}
                {meta.forks != null && (
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="size-3 shrink-0" weight="regular" aria-hidden />
                    {formatCount(meta.forks)}
                  </span>
                )}
                {meta.openIssues != null && (
                  <span className="inline-flex items-center gap-1">
                    <Bug className="size-3 shrink-0" weight="regular" aria-hidden />
                    {formatCount(meta.openIssues)}
                  </span>
                )}
              </div>
            )}
            {(item.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(item.tags ?? []).map((tag) => (
                  <Badge key={tag} variant="outline" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </a>
  )
}

/** X post card. Body links stay clickable; the permalink is the header/media. */
function SocialCard({ item }: ItemCardProps) {
  const meta = item.sourceMeta
  const handle = meta.handle
    ? meta.handle.startsWith('@')
      ? meta.handle
      : `@${meta.handle}`
    : null
  const preview =
    meta.mediaUrls && meta.mediaUrls.length > 0 ? meta.mediaUrls[0] : null
  const body = item.summary || item.title

  return (
    <Card
      size="sm"
      className="overflow-hidden transition-colors hover:bg-muted/60"
    >
      <CardHeader className="pb-0">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {handle && (
            <span className="font-medium text-foreground">{handle}</span>
          )}
          {handle && meta.date && (
            <span aria-hidden className="text-muted-foreground/60">
              ·
            </span>
          )}
          {meta.date && (
            <time className="font-mono tabular-nums" dateTime={meta.date}>
              {meta.date}
            </time>
          )}
          {meta.likes != null && (
            <>
              <span aria-hidden className="text-muted-foreground/60">
                ·
              </span>
              <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                <Heart
                  className="size-3 shrink-0"
                  weight="regular"
                  aria-hidden
                />
                {meta.likes.toLocaleString()}
              </span>
            </>
          )}
        </a>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        <TweetBody text={body} />
        {preview && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={preview}
              alt=""
              loading="lazy"
              className="block h-auto w-full"
            />
          </a>
        )}
      </CardContent>
    </Card>
  )
}

function XCard({ item }: ItemCardProps) {
  return <SocialCard item={item} />
}

function YoutubeCard({ item }: ItemCardProps) {
  const meta = item.sourceMeta
  const videoId = meta.videoId
  const preview =
    meta.mediaUrls && meta.mediaUrls.length > 0
      ? meta.mediaUrls[0]
      : videoId
        ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        : null
  const channel = meta.handle || meta.author
  const views = meta.views

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card
        size="sm"
        className={cn(
          'overflow-hidden transition-colors hover:bg-muted/60',
          preview && 'pt-0',
        )}
      >
        {preview && (
          <div className="relative overflow-hidden bg-muted">
            <img
              src={preview}
              alt=""
              loading="lazy"
              className="block aspect-video h-auto w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="flex size-10 items-center justify-center rounded-lg bg-background/90 text-foreground">
                <Play className="size-4" weight="fill" aria-hidden />
              </span>
            </span>
          </div>
        )}
        <CardHeader className="gap-2">
          <CardTitle className="text-sm leading-snug">{item.title}</CardTitle>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {channel && <span className="text-foreground">{channel}</span>}
            {meta.date && (
              <time className="font-mono tabular-nums" dateTime={meta.date}>
                {meta.date}
              </time>
            )}
            {views != null && (
              <span className="font-mono tabular-nums">
                {views.toLocaleString()}
              </span>
            )}
          </div>
        </CardHeader>
        {item.summary ? (
          <CardContent>
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
          </CardContent>
        ) : null}
      </Card>
    </a>
  )
}

export function ItemCard({ item }: ItemCardProps) {
  if (item.type === 'x') {
    return <XCard item={item} />
  }
  if (item.type === 'youtube') {
    return <YoutubeCard item={item} />
  }
  return <GithubCard item={item} />
}
