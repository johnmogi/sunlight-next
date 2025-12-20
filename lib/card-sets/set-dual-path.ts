/**
 * Card data with Moonlight/Sunlight image mappings
 * Extended version of set-default with dual-path images
 * 
 * DEMO: Using one card (The Rebuilt Lighthouse) to show different images work
 */

import { TAROT_CARDS } from './set-default'

export interface DualPathCard {
    id: string
    name: string
    meaning: string
    type: 'major' | 'minor'
    number: number
    suit: string | null
    moonlightImage: string
    sunlightImage: string
}

// Map Moonlight images from moonsunlight folder to corresponding cards
// These use FULL paths because they're outside /images/cards/
// Metadata overrides for swapped cards
const cardOverrides: Record<string, Partial<DualPathCard>> = {
    'major-4': {
        name: "The Reformed Lighthouse",
        meaning: "The restored beacon - the ancient lighthouse-temple rising from the ocean. Victory, homecoming, and the recognition that you were never truly lost.",
        moonlightImage: '/images/moonsunlight/moontower.png',
        sunlightImage: '/images/moonsunlight/suntower.png'
    },
    'major-6': {
        name: "The Rising Star",
        meaning: "Rebel Release - cutting the self-imposed rope. Butterfly metamorphosis and self-awareness in the here-and-now.",
        moonlightImage: '/images/moonsunlight/fallingstar.png',
        sunlightImage: '/images/moonsunlight/6risingstar2.png'
    },
    'major-5': {
        // Name/Meaning from default is fine (Lovers' Judgment / Garden)
        moonlightImage: '/images/moonsunlight/gardenmoon.png',
        sunlightImage: '/images/moonsunlight/gardensun.png'
    },
    'major-0': {
        // Name/Meaning from default is fine (The Sun / Fool)
        moonlightImage: '/images/moonsunlight/moonmoon.jpg',
        sunlightImage: '/images/moonsunlight/sunsun2.jpg'
    }
}

// Create dual-path cards with different Moonlight/Sunlight images
export const DUAL_PATH_CARDS: DualPathCard[] = TAROT_CARDS.map(card => {
    const override = cardOverrides[card.id]
    if (override) {
        return {
            ...card,
            ...override,
            // Ensure images are set found in override, or fallback to default logic (which we don't need if we override all active ones)
            moonlightImage: override.moonlightImage || card.image,
            sunlightImage: override.sunlightImage || card.image
        }
    }

    return {
        ...card,
        moonlightImage: card.image,
        sunlightImage: card.image,
        suit: card.suit || null
    }
})

export type { DualPathCard as TarotCard }
