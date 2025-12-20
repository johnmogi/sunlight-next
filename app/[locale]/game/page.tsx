import GameCanvas from '@/components/game/GameCanvas'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'

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

export const metadata: Metadata = {
    title: 'Card Quest | Early Access',
    description: 'A new card-based adventure.',
}

export default async function GamePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const messages = messagesMap[locale as keyof typeof messagesMap] || enMessages

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <GameCanvas />
        </NextIntlClientProvider>
    )
}
