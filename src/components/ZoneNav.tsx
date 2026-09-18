import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import type { FilterType } from '@/lib/types'

const ZONES: FilterType[] = ['all', 'github', 'x', 'tiktok']

export function ZoneNav({
  zone,
  counts,
  onZoneChange,
}: {
  zone: FilterType
  counts: Record<FilterType, number>
  onZoneChange: (zone: FilterType) => void
}) {
  const { t } = useI18n()
  const labels: Record<FilterType, string> = {
    all: t('zoneAll'),
    github: t('zoneGithub'),
    x: t('zoneX'),
    tiktok: t('zoneTikTok'),
  }

  return (
    <nav aria-label={t('zoneLabel')} className="flex flex-col gap-2">
      {ZONES.map((id) => {
        const selected = zone === id
        return (
          <Button
            key={id}
            type="button"
            variant={selected ? 'secondary' : 'ghost'}
            aria-pressed={selected}
            onClick={() => onZoneChange(id)}
            className={cn(
              'h-8 w-full justify-between gap-4 rounded-lg px-3 font-normal',
              selected ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            <span>{labels[id]}</span>
            <span className="tabular-nums text-xs text-muted-foreground">
              {counts[id]}
            </span>
          </Button>
        )
      })}
    </nav>
  )
}
