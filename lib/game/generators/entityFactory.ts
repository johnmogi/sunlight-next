import { PlayerState, EncounterState, CardData } from '@/components/game/types';
import { TAROT_CARDS } from '@/lib/card-sets/set-update129';

// Default / Base Player
const BASE_PLAYER: PlayerState = {
    currentTileId: '0', // Start at 0
    lucidity: 100,
    maxLucidity: 100,
    focus: 3,
    maxFocus: 3,
    clarity: 0,
    composure: 0,
    statuses: [],
    mastery: {
        empathy: 1,
        logic: 1,
        passion: 1,
        resilience: 1
    },
    hand: [],
    deck: [],
    discard: [],
    inventory: {
        artifacts: [],
        keys: 0
    }
};

export function createPlayer(archetypeId: string): PlayerState {
    const player = { ...BASE_PLAYER };

    // 1. Apply Elemental Mastery & Starting Deck
    // We try to find 3 cards of the relevant suit + 1 neutral (Major Arcana)

    let suitFilter = '';

    switch (archetypeId) {
        case 'The Navigator':
            player.mastery.empathy = 3; // Water
            suitFilter = 'vessels';
            break;
        case 'The Builder':
            player.mastery.resilience = 3; // Earth
            suitFilter = 'crystals';
            break;
        case 'The Weaver':
            player.mastery.passion = 3; // Fire
            suitFilter = 'leaves';
            break;
        default:
            suitFilter = 'vessels'; // Default
    }

    // Build Deck
    // Get 3 cards of the suit (Ace, 2, 3 usually)
    const suitCards = TAROT_CARDS.filter(c => c.suit === suitFilter && c.type === 'minor').slice(0, 3);
    // Get 1 Neutral (Major Arcana)
    const neutralCard = TAROT_CARDS.find(c => c.type === 'major') || suitCards[0];

    // Map to CardData
    player.deck = [...suitCards, neutralCard].map(mapToCardData);

    return player;
}

export function createEnemy(tier: number): EncounterState {
    // Generate a Moonlight Form
    const baseDensity = 10 * tier;
    const damage = 5 * tier;

    // Pick a random card to represent the enemy
    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];

    return {
        id: `enemy-${Date.now()}`,
        cardContent: mapToCardData(randomCard),
        currentResistance: baseDensity,
        maxResistance: baseDensity,
        intent: 'Confuse',
        nextMoveDamage: damage,
        statuses: []
    };
}

// Helper to map raw JSON to CardData interface
export function mapToCardData(raw: any): CardData {
    return {
        id: raw.id,
        name: raw.name,
        type: raw.type === 'major' ? 'Major' : 'Minor', // Capitalize
        suit: raw.suit,
        value: raw.number,
        image: raw.image,
        cost: 1, // Default cost
        description: raw.meaning, // Use meaning as description
        meaning: raw.meaning,
        visualDesc: raw.visualDesc,
        challengeRating: raw.number
    };
}
