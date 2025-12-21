import { PlayerState, EncounterState, CardData } from '@/components/game/types';
import { TAROT_CARDS } from '@/lib/card-sets/set-update129';

// --- ELEMENTAL DICE LOGIC ---
// In HGE, Mastery dictates the Size or Quantity of dice.
// For MVP: Value = Bonus to D6 roll.
export interface ElementalStats {
    empathy: number;    // Water
    logic: number;      // Roses/Air
    passion: number;    // Fire/Leaves
    resilience: number; // Earth/Crystals
}

// Default / Base Player
const BASE_PLAYER: PlayerState = {
    currentTileId: '0',
    lucidity: 100,
    maxLucidity: 100,
    focus: 3,
    maxFocus: 3,
    clarity: 0,
    composure: 0,
    statuses: [],
    mastery: { empathy: 1, logic: 1, passion: 1, resilience: 1 },
    hand: [],
    deck: [],
    discard: [],
    inventory: { artifacts: [], keys: 0 }
};

// --- ENTITY GENERATOR ---

export function generateEntity(id: string, type: 'PLAYER' | 'ENEMY', act: number = 1): PlayerState | EncounterState {
    if (type === 'PLAYER') return createPlayerEntity(id);
    return createEnemyEntity(id, act); // Treat id as Tier/Level input for enemy
}

function createPlayerEntity(archetypeId: string): PlayerState {
    const player = { ...BASE_PLAYER };

    // Archetype Logic with Elemental Mastery
    switch (archetypeId) {
        case 'The Navigator':
            player.mastery.empathy = 3;  // Water Primary
            player.mastery.logic = 2;    // Air Secondary
            break;
        case 'The Builder':
            player.mastery.resilience = 3; // Earth Primary
            player.mastery.passion = 2;    // Fire Secondary
            break;
        case 'The Weaver':
            player.mastery.passion = 3;   // Fire Primary
            player.mastery.empathy = 2;   // Water Secondary
            break;
        default:
            player.mastery.empathy = 2;
    }

    // Deck Building (Based on Primary Element)
    const primarySuit = getSuitForMastery(player.mastery);
    player.deck = buildArchetypeDeck(primarySuit);

    return player;
}

function createEnemyEntity(tierInput: string, act: number = 1): EncounterState {
    const tier = parseInt(tierInput) || 1;

    // Pick a card to be the Shadow
    const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];

    // Convert Card Suit/Number to Enemy Stats
    // e.g. Ace (1) = Weak, 10 = Strong
    const cardValue = (card.number || 1) + (card.type === 'major' ? 5 : 0);

    // Act Scaling
    const actMultiplier = 1 + ((act - 1) * 0.5); // Act 1 = 1x, Act 2 = 1.5x

    const density = Math.floor(((10 * tier) + (cardValue * 2)) * actMultiplier);
    const damage = Math.floor(((3 * tier) + Math.floor(cardValue / 2)) * actMultiplier);

    return {
        id: `shadow-${card.id}-${Date.now()}`,
        cardContent: mapToCardData(card),
        currentResistance: density,
        maxResistance: density,
        intent: generateIntent(card.suit),
        nextMoveDamage: damage,
        statuses: []
    };
}

// --- HELPERS ---

function getSuitForMastery(mastery: ElementalStats): string {
    if (mastery.passion >= 3) return 'leaves';
    if (mastery.resilience >= 3) return 'crystals';
    if (mastery.logic >= 3) return 'roses';
    return 'vessels';
}

function buildArchetypeDeck(suit: string): CardData[] {
    const suitCards = TAROT_CARDS
        .filter(c => c.suit === suit && c.type === 'minor')
        .slice(0, 4) // Get first 4 cards
        .map(mapToCardData);

    // Add a Major Arcana "Ultimate"
    const major = TAROT_CARDS.find(c => c.type === 'major');
    if (major) suitCards.push(mapToCardData(major));

    return suitCards;
}

function generateIntent(suit: string | undefined): string {
    switch (suit) {
        case 'leaves': return 'Burn';
        case 'crystals': return 'Harden';
        case 'vessels': return 'Flood';
        case 'roses': return 'Confuse';
        default: return 'Obscure';
    }
}

export function mapToCardData(raw: any): CardData {
    return {
        id: raw.id,
        name: raw.name,
        type: raw.type === 'major' ? 'Major' : 'Minor',
        suit: raw.suit,
        value: raw.number,
        image: raw.image,
        cost: 1, // Default focus cost
        description: raw.meaning,
        meaning: raw.meaning,
        visualDesc: raw.visualDesc,
        challengeRating: raw.number || 1
    };
}
