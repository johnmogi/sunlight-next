import { notFound } from "next/navigation"
import { locales, isRTL, type Locale } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

async function getMessages(locale: Locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const validLocale = locale as Locale
  const messages = await getMessages(validLocale)
  const direction = isRTL(validLocale) ? 'rtl' : 'ltr'

  return (
    <div dir={direction} className="min-h-screen flex flex-col">
      <Header locale={validLocale} messages={messages} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
