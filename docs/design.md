# Awesome JEV design contract

Product UI contract for [awesomejev.cc](https://awesomejev.cc). Stack: Vite + React + Tailwind + shadcn base-nova + Geist + Phosphor.

Upstream inspiration: [Vercel Geist](https://vercel.com/geist) spacing and typography. The long-form [`vercel.com/design.md`](https://vercel.com/design.md) targets report sites; this file is the **product** UI contract for Awesome JEV.

## Principles

- Calm, monochrome, Geist typography. No decorative gradients, glows, or stock illustration.
- Content is TypeSafe System One / **Jev** (typed decisions). Never JAV / Japanese AV framing.
- Prefer shadcn base-nova primitives (`Card`, `Button`, `Badge`, `Input`, `ToggleGroup`, …) over hand-rolled chrome.
- Icons: Phosphor only.

## Spacing (4px base)

All padding, margin, and gap values must land on the **4px grid**:

| Token | px |
| --- | --- |
| 1 | 4 |
| 2 | 8 |
| 3 | 12 |
| 4 | 16 |
| 6 | 24 |
| 8 | 32 |
| 10 | 40 |
| 16 | 64 |
| 24 | 96 |

Rhythm:

- **Within a group**: 8px (`gap-2`)
- **Between groups**: 16px (`gap-4`)
- **Between sections**: 32–40px (`gap-8` / `gap-10`)
- **Card padding**: prefer 24px (`p-6`); compact 16px (`p-4`)

Avoid off-grid values such as `gap-1.5` (6px), `mt-0.5` (2px), `mb-5` / `px-5` (20px), or `0.625rem` radius (10px). Snap to the nearest token above.

Tailwind defaults already use a 4px unit (`spacing.1 = 0.25rem`). Prefer scale utilities (`gap-2`, `p-4`, `mb-6`) over arbitrary `text-[13px]` / `p-[5px]` unless there is a documented exception.

## Radius

Prefer **8px** (`rounded-lg` / `--radius: 0.5rem`) or **12px** (`rounded-xl` / `0.75rem`). Do not use 10px.

## Typography

- UI: Geist Sans (variable)
- Code / ids: Geist Mono
- Prefer `text-xs` / `text-sm` / `text-base` over one-off pixel sizes

## Surfaces

Default shadcn semantic tokens (`background`, `foreground`, `muted`, `border`, `card`). Light + system dark via existing CSS. No second brand accent beyond foreground/background contrast.

## Open Graph

- Asset: `public/og.png` (1200×630)
- Absolute URL: `https://awesomejev.cc/og.png`
- Wired in `index.html` (`og:*` + `twitter:*`)
