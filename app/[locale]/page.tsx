"use client"

import * as React from "react"
import { HeroSlider } from "@/components/hero-slider"
import { JoinForm } from "@/components/join-form"
import { type Locale } from "@/lib/i18n"

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

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const [isJoinFormOpen, setIsJoinFormOpen] = React.useState(false)
  const messages = messagesMap[params.locale] || enMessages

  return (
    <div className="min-h-screen">
      <HeroSlider
        messages={messages}
        onJoinClick={() => setIsJoinFormOpen(true)}
      />
      <JoinForm
        messages={messages}
        isOpen={isJoinFormOpen}
        onClose={() => setIsJoinFormOpen(false)}
      />

      {/* Placeholder for next sections */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">More sections coming soon...</h2>
          <p className="text-muted-foreground">
            Gallery, Daily Spread, and Collections sections will be added next.
          </p>
        </div>
      </section>
    </div>
  )
}
