"use client"

import * as React from "react"
import { HeroSlider } from "@/components/hero-slider"
import { SunlightPhilosophy } from "@/components/sunlight-philosophy"
import { MediaTabs } from "@/components/media-tabs"
import { CompleteDeck } from "@/components/complete-deck"
import { DailySpread } from "@/components/daily-spread"
import { HiddenGardenGame } from "@/components/HiddenGardenGame"
import { type Locale } from "@/lib/i18n"

// This will be replaced with server-side messages in production
// For now, importing directly
import enMessages from "@/messages/en.json"
import heMessages from "@/messages/he.json"
import esMessages from "@/messages/es.json"
import frMessages from "@/messages/fr.json"
import arMessages from "@/messages/ar.json"

const messagesMap = {
  en: enMessages,
  he: heMessages,
  es: esMessages,
  fr: frMessages,
  ar: arMessages,
}

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = React.useState<Locale>("en")

  React.useEffect(() => {
    params.then((p) => setLocale(p.locale as Locale))
  }, [params])

  const messages = messagesMap[locale] || enMessages

  return (
    <div className="min-h-screen pt-20">
      {/* Hero - Visual Impact Above the Fold */}
      <HeroSlider messages={messages} />

      {/* Consolidated Philosophy Section - System, Suits, Vision, Healing */}
      <SunlightPhilosophy messages={messages} locale={locale} />

      {/* Complete Deck with Voting */}
      <CompleteDeck messages={messages} locale={locale} />

      {/* ScrollMaze Banner */}
      <HiddenGardenGame messages={messages} />

      {/* Daily Spread */}
      <DailySpread messages={messages} />

      {/* Media Section (Tabbed: Podcast + Video) */}
      <MediaTabs messages={messages} locale={locale} />
    </div>
  )
}
