import type { MouseEvent } from 'react'
import { parseTweetText } from '@/lib/tweet-text'

function stopCardNav(event: MouseEvent<HTMLAnchorElement>) {
  event.stopPropagation()
}

export function TweetBody({ text }: { text: string }) {
  const parts = parseTweetText(text)
  return (
    <p className="text-sm leading-relaxed break-words whitespace-pre-wrap text-foreground">
      {parts.map((part, i) => {
        if (part.kind === 'text') {
          return <span key={i}>{part.value}</span>
        }
        return (
          <a
            key={i}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stopCardNav}
            className="text-foreground underline decoration-border underline-offset-2 hover:decoration-foreground"
          >
            {part.value}
          </a>
        )
      })}
    </p>
  )
}
