export type Element = 'roses' | 'leaves' | 'vessels' | 'crystals' | 'ether';
export type ArcanaType = 'Major' | 'Minor';

export interface Boon {
    id: string;
    name: string;
    description: string;
    effect: (state: PlayerState) => PlayerState;
}

export interface CardData {
    id: string;
    name: string;
    type: ArcanaType;
    suit?: Element; // Undefined for Major Arcana
    value?: number; // 0-22 for Major, 1-10 for Minor
    image: string; // Path to asset

    // Narrative & Gameplay
    meaning: string;
    visualDesc?: string;

    // Encounter Logic
    challengeRating?: number; // 1-10 difficulty
}

export interface Tile {
    id: string; // unique ID (e.g., "0", "1", "2")
    position: { x: number, y: number }; // Percentage (0-100) for visual rendering
    isFlipped: boolean;
    isOccupied: boolean; // Is the player currently here?
    isCleared: boolean; // Has the encounter been resolved?
    cardContent: CardData;
    connectedTo: string[]; // IDs of neighboring tiles (Graph Edges)
}

export interface PlayerState {
    currentTileId: string;
    resolve: number; // Health/Sanity (0-100)
    maxResolve: number;

    // Stats (RPG Elements)
    stats: {
        empathy: number;    // Water/Vessel affinity
        logic: number;      // Air/Rose affinity
        passion: number;    // Fire/Vine affinity
        resilience: number; // Earth/Crystal affinity
    };

    hand: CardData[]; // Cards currently held for use
    deck: CardData[]; // Draw pile
    discard: CardData[]; // Used cards

    inventory: {
        boons: Boon[]; // IDs of collected boons
        keys: number;
        dryFlowers: number;
    };
}

export type GameState = 'LOADING' | 'MENU' | 'INTRO' | 'CHARACTER_SELECT' | 'BOON_SELECT' | 'MAP' | 'ENCOUNTER' | 'BOSS' | 'VICTORY' | 'GAME_OVER';
