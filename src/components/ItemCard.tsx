import {
  ArrowSquareOut,
  Bug,
  GitFork,
  GithubLogo,
  Heart,
  Star,
} from '@phosphor-icons/react'
import type { DirectoryItem } from '@/lib/types'
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
        {(metaBits.length > 0 || hasMetrics || item.tags.length > 0) && (
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
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
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

/** Compact social card for X and TikTok posts. Whole card links to the source. */
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
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card
        size="sm"
        className="overflow-hidden transition-colors hover:bg-muted/60"
      >
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {body}
          </p>
          {preview && (
            <div className="overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src={preview}
                alt=""
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>
          )}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </a>
  )
}

function XCard({ item }: ItemCardProps) {
  return <SocialCard item={item} />
}

function TikTokCard({ item }: ItemCardProps) {
  return <SocialCard item={item} />
}

export function ItemCard({ item }: ItemCardProps) {
  if (item.type === 'x') {
    return <XCard item={item} />
  }
  if (item.type === 'tiktok') {
    return <TikTokCard item={item} />
  }
  return <GithubCard item={item} />
}
