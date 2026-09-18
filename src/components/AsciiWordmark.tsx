import bannerSrc from '../../scripts/awesome-jev-banner.txt?raw'

const banner = bannerSrc
  .split('\n')
  .filter((ln) => ln.trim().length > 0)
  .join('\n')

export function AsciiWordmark() {
  return (
    <pre
      aria-hidden="true"
      className="overflow-x-auto font-mono text-xs leading-tight tracking-tight whitespace-pre text-foreground lg:text-sm"
    >
      {banner}
    </pre>
  )
}
