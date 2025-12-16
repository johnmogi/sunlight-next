"use client"

import * as React from "react"
import { type Locale } from "@/lib/i18n"
import { StudioHero } from "@/components/studio/studio-hero"
import { RoadmapSection } from "@/components/studio/roadmap-section"
import { StudioTabs } from "@/components/studio/studio-tabs"
import { CardLab } from "@/components/studio/card-lab"

// Importing messages directly for now (client-side)
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

export default function StudioPage({ params }: { params: Promise<{ locale: string }> }) {
    const [locale, setLocale] = React.useState<Locale>("en")

    React.useEffect(() => {
        params.then((p) => setLocale(p.locale as Locale))
    }, [params])

    const messages = messagesMap[locale] || enMessages

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Hero: "Behind the Scenes" */}
            <StudioHero messages={messages} />

            {/* Roadmap: Status Board */}
            <RoadmapSection messages={messages} locale={locale} />

            {/* Tabs: Unfinished Products (Shirts, Coloring, etc.) */}
            <StudioTabs messages={messages} locale={locale} />

            {/* Gallery: Card Lab (Sketches, Clay, Unfinished) */}
            <CardLab messages={messages} locale={locale} />
        </div>
    )
}
