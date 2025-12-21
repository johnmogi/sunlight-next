export type Element = 'roses' | 'leaves' | 'vessels' | 'crystals' | 'ether';
export type ArcanaType = 'Major' | 'Minor';

export interface Artifact {
    id: string;
    name: string;
    description: string;
    effect: (state: PlayerState) => Partial<PlayerState>; // Returns updates to state
}

export interface CardData {
    id: string;
    name: string;
    type: ArcanaType;
    suit?: Element;
    value?: number; // 0-22 for Major, 1-10 for Minor
    image: string; // Path to asset

    // Gameplay
    cost: number; // Focus Cost
    description: string; // Gameplay effect description

    // Narrative
    meaning: string;
    visualDesc?: string;

    // Encounter Logic
    challengeRating?: number; // 1-10 difficulty / Defense
}

export interface Tile {
    id: string;
    position: { x: number, y: number };
    isFlipped: boolean;
    isOccupied: boolean;
    isCleared: boolean;
    cardContent: CardData;
    connectedTo: string[];
}

export interface StatusEffect {
    id: 'resonance' | 'confusion' | 'blind' | 'clarity' | 'composure';
    name: string;
    value: number;
    icon: string;
}

export interface EncounterState {
    id: string;
    cardContent: CardData;
    currentResistance: number; // Enemy HP (was Resolve)
    maxResistance: number;
    intent: string; // Narrative description of what enemy will do
    nextMoveDamage: number; // Damage to Player Lucidity
    statuses: StatusEffect[];
}

export interface PlayerState {
    currentTileId: string;

    // Core Stats ("The Sleeper")
    lucidity: number; // HP (0-100)
    maxLucidity: number;
    focus: number; // Energy (per turn)
    maxFocus: number;

    // Combat Stats
    clarity: number; // Attack Power (added to Roll)
    composure: number; // Block (reduces incoming damage)
    statuses: StatusEffect[];

    // Elemental Mastery (Tribes)
    mastery: {
        empathy: number;    // Water
        logic: number;      // Air
        passion: number;    // Fire
        resilience: number; // Earth
    };

    hand: CardData[];
    deck: CardData[];
    discard: CardData[];

    inventory: {
        artifacts: Artifact[];
        keys: number;
    };
}

export type GameState = 'LOADING' | 'MENU' | 'INTRO' | 'CHARACTER_SELECT' | 'BOON_SELECT' | 'MAP' | 'EVENT_ROLL' | 'ENCOUNTER' | 'TRAP' | 'LOOT' | 'BOSS' | 'VICTORY' | 'GAME_OVER';
