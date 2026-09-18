import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { en, type MessageKey, type Messages } from './locales/en'
import { zh } from './locales/zh'

export type Locale = 'en' | 'zh'

const STORAGE_KEY = 'awesome-jev-locale'

const catalogs: Record<Locale, Messages> = { en, zh }

function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'zh') return stored
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined' && /^zh\b/i.test(navigator.language)) {
    return 'zh'
  }
  return 'en'
}

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: MessageKey, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale())

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) => {
      let text = catalogs[locale][key] ?? catalogs.en[key] ?? String(key)
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replaceAll(`{${k}}`, String(v))
        }
      }
      return text
    },
    [locale],
  )

  useEffect(() => {
    const title = catalogs[locale].documentTitle
    const description = catalogs[locale].documentDescription
    document.title = title
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute('content', content)
    }
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
  }, [locale])

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
