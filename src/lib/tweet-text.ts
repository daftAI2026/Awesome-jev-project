export type TweetPart =
  | { kind: 'text'; value: string }
  | { kind: 'url'; href: string; value: string }
  | { kind: 'mention'; href: string; value: string }

const TOKEN =
  /https?:\/\/[^\s<>"'`]+|@[A-Za-z0-9_]{1,15}(?![A-Za-z0-9_])/g

function splitUrl(raw: string): { href: string; trail: string } {
  let href = raw
  let trail = ''
  while (href.length > 0) {
    const last = href[href.length - 1]
    if (last === '.' || last === ',' || last === ';' || last === ':' || last === '!') {
      trail = last + trail
      href = href.slice(0, -1)
      continue
    }
    if (last === ')' && (href.match(/\(/g) ?? []).length < (href.match(/\)/g) ?? []).length) {
      trail = last + trail
      href = href.slice(0, -1)
      continue
    }
    break
  }
  return { href, trail }
}

export function parseTweetText(text: string): TweetPart[] {
  const parts: TweetPart[] = []
  let last = 0
  for (const match of text.matchAll(TOKEN)) {
    const start = match.index ?? 0
    if (start > last) {
      parts.push({ kind: 'text', value: text.slice(last, start) })
    }
    const token = match[0]
    if (token.startsWith('http')) {
      const { href, trail } = splitUrl(token)
      if (href) {
        parts.push({ kind: 'url', href, value: href })
      }
      if (trail) {
        parts.push({ kind: 'text', value: trail })
      }
    } else {
      const handle = token.slice(1)
      parts.push({
        kind: 'mention',
        href: `https://x.com/${handle}`,
        value: token,
      })
    }
    last = start + token.length
  }
  if (last < text.length) {
    parts.push({ kind: 'text', value: text.slice(last) })
  }
  return parts.length > 0 ? parts : [{ kind: 'text', value: text }]
}
