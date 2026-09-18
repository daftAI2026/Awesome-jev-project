import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import type { FilterType } from '@/lib/types'

const ZONE_LABEL: Record<FilterType, 'zoneAll' | 'zoneGithub' | 'zoneX' | 'zoneYoutube'> =
  {
    all: 'zoneAll',
    github: 'zoneGithub',
    x: 'zoneX',
    youtube: 'zoneYoutube',
  }

export function ZoneNav({
  zone,
  zones,
  counts,
  onZoneChange,
}: {
  zone: FilterType
  zones: FilterType[]
  counts: Record<FilterType, number>
  onZoneChange: (zone: FilterType) => void
}) {
  const { t } = useI18n()

  return (
    <nav aria-label={t('zoneLabel')} className="flex flex-col gap-2">
      {zones.map((id) => {
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
            <span>{t(ZONE_LABEL[id])}</span>
            <span className="tabular-nums text-xs text-muted-foreground">
              {counts[id]}
            </span>
          </Button>
        )
      })}
    </nav>
  )
}
