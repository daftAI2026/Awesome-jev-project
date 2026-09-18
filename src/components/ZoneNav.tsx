import { GithubLogo, XLogo, YoutubeLogo, type Icon } from '@phosphor-icons/react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import type { FilterType } from '@/lib/types'

const ZONE_ICON: Record<FilterType, Icon> = {
  github: GithubLogo,
  x: XLogo,
  youtube: YoutubeLogo,
}

const ZONE_LABEL: Record<FilterType, 'zoneGithub' | 'zoneX' | 'zoneYoutube'> = {
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
        const ZoneIcon = ZONE_ICON[id]
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
            <span className="flex min-w-0 items-center gap-2">
              <ZoneIcon className="size-3.5 shrink-0" weight="fill" aria-hidden />
              <span>{t(ZONE_LABEL[id])}</span>
            </span>
            <span className="tabular-nums text-xs text-muted-foreground">
              {counts[id]}
            </span>
          </Button>
        )
      })}
    </nav>
  )
}
