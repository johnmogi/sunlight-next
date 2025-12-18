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
const moonlightImageMap: Record<string, string> = {
    // The Rebuilt Lighthouse (Card 6) - Tower archetype
    // Using full path since it's in /images/moonsunlight/, not /images/cards/
    'major-6': '/images/moonsunlight/towermoon.jpg',

    // Once this works, we can add the rest:
    // 'major-4': '/images/moonsunlight/6risingstar.png', // The Rising Star
    // 'major-5': '/images/moonsunlight/lockedgardenmoon.jpg', // The Lovers' Judgment
    // etc.
}

// Create dual-path cards with different Moonlight/Sunlight images
export const DUAL_PATH_CARDS: DualPathCard[] = TAROT_CARDS.map(card => ({
    ...card,
    // Moonlight images use full path if in moonlight folder, otherwise use relative path
    moonlightImage: moonlightImageMap[card.id] || card.image,
    // Sunlight images use card.image which is just 'cardcollection/...' (relative)
    sunlightImage: card.image,
    suit: card.suit || null
}))

export type { DualPathCard as TarotCard }
