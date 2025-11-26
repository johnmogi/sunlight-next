export const locales = ['en', 'he', 'es', 'fr', 'ar'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: '🇺🇸 English',
  he: '🇮🇱 עברית',
  es: '🇪🇸 Español',
  fr: '🇫🇷 Français',
  ar: '🇸🇦 العربية',
}

export const rtlLocales: Locale[] = ['he', 'ar']

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale)
}
