"use client"

import * as React from "react"
import { HeroSlider } from "@/components/hero-slider"
import { MediaTabs } from "@/components/media-tabs"
import { AboutSection } from "@/components/about-section"
import { CompleteDeck } from "@/components/complete-deck"
import { DailySpread } from "@/components/daily-spread"
import { ScrollMazeBanner } from "@/components/scrollmaze-banner"
import { type Locale } from "@/lib/i18n"
import { TAROT_CARDS } from "@/lib/tarot-cards"

// This will be replaced with server-side messages in production
// For now, importing directly
import enMessages from "@/messages/en.json"
import heMessages from "@/messages/he.json"

const messagesMap = {
  en: enMessages,
  he: heMessages,
  es: enMessages, // TODO: Add Spanish translations
  fr: enMessages, // TODO: Add French translations
  ar: heMessages, // TODO: Add Arabic translations (using Hebrew RTL for now)
}

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = React.useState<Locale>("en")

  React.useEffect(() => {
    params.then((p) => setLocale(p.locale as Locale))
  }, [params])

  const messages = messagesMap[locale] || enMessages

  return (
    <div className="min-h-screen">
      <HeroSlider messages={messages} />

      {/* About Section with Tabs + Accordions */}
      <AboutSection messages={messages} />

      {/* Complete Deck with Voting */}
      <CompleteDeck messages={messages} cards={TAROT_CARDS} />

      {/* ScrollMaze Banner */}
      <ScrollMazeBanner messages={messages} />

      {/* Daily Spread */}
      <DailySpread messages={messages} cards={TAROT_CARDS} />

      {/* Media Section (Tabbed: Podcast + Video) */}
      <MediaTabs messages={messages} locale={locale} />
    </div>
  )
}
