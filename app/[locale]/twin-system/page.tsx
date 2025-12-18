/**
 * Twin Deck System Landing Page
 * The new portal for Stereoscopic Vision
 */

'use client'

import * as React from 'react'
import { DualVideoSwiper } from '@/components/v2/twin-deck/DualVideoSwiper'
import { MajorArcanaGallery } from '@/components/v2/twin-deck/MajorArcanaGallery'
import { TwinSystemHeader } from '@/components/v2/twin-deck/TwinSystemHeader'
import { TwinAboutSection } from '@/components/v2/twin-deck/TwinAboutSection'
import { CompleteDeck } from '@/components/complete-deck'
import { HiddenGardenGame } from '@/components/HiddenGardenGame'
import { type Locale } from '@/lib/i18n'

// Import i18n messages
import enMessages from '@/messages/en.json'
import heMessages from '@/messages/he.json'
import esMessages from '@/messages/es.json'
import frMessages from '@/messages/fr.json'
import arMessages from '@/messages/ar.json'

const messagesMap = {
    en: enMessages,
    he: heMessages,
    es: esMessages,
    fr: frMessages,
    ar: arMessages,
}
export default function TwinSystemPage({ params }: { params: Promise<{ locale: string }> }) {
    const [locale, setLocale] = React.useState<Locale>('en')

    React.useEffect(() => {
        params.then((p) => setLocale(p.locale as Locale))
    }, [params])

    const messages = messagesMap[locale] || enMessages

    return (
        <main className="min-h-screen pt-0">
            {/* Navigation Header */}
            <TwinSystemHeader locale={locale} />

            {/* Full Hero Swipe - Above the fold */}
            <DualVideoSwiper />

            {/* About Section - Dual Path Philosophy */}
            <TwinAboutSection />

            {/* Major Arcana Gallery */}
            <MajorArcanaGallery />

            {/* Sunlight Deck Collection */}
            <section id="sunlight-collection" className="py-16 bg-white dark:bg-gray-900">
                <CompleteDeck messages={messages} locale={locale} />
            </section>

            {/* Hidden Garden Game Section */}
            <HiddenGardenGame messages={messages} />
        </main>
    )
}
