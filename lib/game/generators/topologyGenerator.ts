import { Tile, CardData } from '@/components/game/types';
import { mapToCardData } from './entityFactory';
import { TAROT_CARDS } from '@/lib/card-sets/set-update129';

export type ShapeType = 'GRID_3x3' | 'SPIRAL' | 'DIAMOND';

export function createTopology(shape: ShapeType = 'GRID_3x3', cardPool: any[] = TAROT_CARDS): Tile[] {
    // 1. Prepare Deck (Shuffle)
    const shuffledDeck = [...cardPool].sort(() => Math.random() - 0.5);

    switch (shape) {
        case 'SPIRAL':
            return generateSpiral(shuffledDeck);
        case 'DIAMOND':
            return generateDiamond(shuffledDeck);
        case 'GRID_3x3':
        default:
            return generateGrid3x3(shuffledDeck);
    }
}

// --- GENERATORS ---

function generateGrid3x3(deck: any[]): Tile[] {
    const tiles: Tile[] = [];
    const rows = 3;
    const cols = 3;
    let cardIndex = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const id = `${r * cols + c}`;
            const posX = (c * 33) + 16.5;
            const posY = (r * 33) + 16.5;

            const connections: string[] = [];
            // Orthogonal connections
            if (c > 0) connections.push(`${r * cols + (c - 1)}`); // Left
            if (c < cols - 1) connections.push(`${r * cols + (c + 1)}`); // Right
            if (r > 0) connections.push(`${(r - 1) * cols + c}`); // Up
            if (r < rows - 1) connections.push(`${(r + 1) * cols + c}`); // Down

            tiles.push({
                id,
                position: { x: posX, y: posY },
                isFlipped: id === '0',
                isOccupied: id === '0',
                isCleared: id === '0',
                cardContent: mapToCardData(deck[cardIndex++] || deck[0]),
                connectedTo: connections
            });
        }
    }
    return tiles;
}

function generateSpiral(deck: any[]): Tile[] {
    // A linear path that winds inward.
    // Logic: 0 -> 1 -> 2 -> 3 ... -> Center
    // Coordinates: Polar to Cartesian map
    const tiles: Tile[] = [];
    const count = 9;
    let cardIndex = 0;

    // Simple spiral coordinates for 9 nodes
    const coords = [
        { x: 10, y: 10 }, { x: 50, y: 10 }, { x: 90, y: 10 },
        { x: 90, y: 50 }, { x: 90, y: 90 }, { x: 50, y: 90 },
        { x: 10, y: 90 }, { x: 10, y: 50 }, { x: 50, y: 50 } // Center is last
    ];

    for (let i = 0; i < count; i++) {
        const id = `${i}`;
        const connections: string[] = [];
        if (i > 0) connections.push(`${i - 1}`);
        if (i < count - 1) connections.push(`${i + 1}`);

        tiles.push({
            id,
            position: { x: coords[i].x, y: coords[i].y },
            isFlipped: id === '0',
            isOccupied: id === '0',
            isCleared: id === '0',
            cardContent: mapToCardData(deck[cardIndex++] || deck[0]),
            connectedTo: connections
        });
    }
    return tiles;
}

function generateDiamond(deck: any[]): Tile[] {
    // 1 -> 2 -> 1 Branching
    // Node 0 (Start) connects to 1, 2
    // Node 1 connects to 3
    // Node 2 connects to 3
    // Node 3 (End)

    const tiles: Tile[] = [];
    let cardIndex = 0;

    const diamondNodes = [
        { id: '0', x: 10, y: 50, next: ['1', '2'] },
        { id: '1', x: 50, y: 20, next: ['3'] },
        { id: '2', x: 50, y: 80, next: ['3'] },
        { id: '3', x: 90, y: 50, next: [] }
    ];

    diamondNodes.forEach(node => {
        // Back connections calculation is complex here, keeping it simple:
        // In graphs, usually we just need outbound for traversal, but UI draws lines both ways?
        // Let's ensure bidirectional for movement.
        const connections = [...node.next];
        // Find who points to me
        diamondNodes.forEach(other => {
            if (other.next.includes(node.id)) connections.push(other.id);
        });

        tiles.push({
            id: node.id,
            position: { x: node.x, y: node.y },
            isFlipped: node.id === '0',
            isOccupied: node.id === '0',
            isCleared: node.id === '0',
            cardContent: mapToCardData(deck[cardIndex++] || deck[0]),
            connectedTo: connections
        });
    });

    return tiles;
}
