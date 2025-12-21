import { Tile, CardData } from '@/components/game/types';
import { TAROT_CARDS } from '@/lib/card-sets/set-update129';
import { mapToCardData } from './entityFactory';

type LayoutType = 'GRID_3x3' | 'LINEAR_5';

export function createGameMap(layout: LayoutType = 'GRID_3x3'): Tile[] {
    if (layout === 'GRID_3x3') {
        return generateGrid3x3();
    }
    // Default fallback
    return generateGrid3x3();
}

function generateGrid3x3(): Tile[] {
    const tiles: Tile[] = [];
    const rows = 3;
    const cols = 3;

    // 1. Select Cards for the Map
    // We need 9 cards. 
    // - Start Node (0,0) is usually safe or empty in some games, but here it's the entry.
    // - End Node (2,2) is the Boss.
    // - Others are encounters.

    const shuffledDeck = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
    const mapCards = shuffledDeck.slice(0, 9);

    let cardIndex = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const id = `${r * cols + c}`;

            // Calculate connections (Grid Logic)
            const connections: string[] = [];
            if (c > 0) connections.push(`${r * cols + (c - 1)}`); // Left
            if (c < cols - 1) connections.push(`${r * cols + (c + 1)}`); // Right
            if (r > 0) connections.push(`${(r - 1) * cols + c}`); // Up
            if (r < rows - 1) connections.push(`${(r + 1) * cols + c}`); // Down

            // Position for rendering (0-100 scale or similar, but let's stick to simple grid logic)
            // The renderer will map these x/y to pixels.
            // But types.ts expects `position: {x, y}`.
            // Let's use 0-2 integers for logic, renderer handles scaling.
            // Wait, previous code used 33% increments. Let's keep that for compatibility if needed, 
            // OR just store logical coordinates and let View handle it.
            // The prompt says "Assign absolute coordinates (x/y) for future rendering flexibility."
            // PREVIOUS CODE: posX = (c * 33) + 16.5;
            // Let's replicate that to ensure MapGrid.tsx keeps working without changes for now.
            const posX = (c * 33) + 16.5;
            const posY = (r * 33) + 16.5;

            tiles.push({
                id,
                position: { x: posX, y: posY }, // Keeping the % based positioning for now
                isFlipped: id === '0', // Start tile flipped
                isOccupied: id === '0', // Player starts here
                isCleared: id === '0', // Start tile cleared? Maybe not if we want an event there. But usually yes.
                cardContent: mapToCardData(mapCards[cardIndex++]),
                connectedTo: connections
            });
        }
    }

    return tiles;
}
