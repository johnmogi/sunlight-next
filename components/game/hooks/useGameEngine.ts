import { useState, useCallback } from 'react';
import { Tile, PlayerState, GameState, CardData } from '../types';
import { TAROT_CARDS } from '@/lib/card-sets/set-update129';

// Initial Player State
const INITIAL_PLAYER: PlayerState = {
    currentTileId: 'start',
    resolve: 100,
    maxResolve: 100,
    stats: {
        empathy: 3,
        logic: 3,
        passion: 3,
        resilience: 3
    },
    hand: [],
    deck: [],
    discard: [],
    inventory: {
        boons: [],
        keys: 0,
        dryFlowers: 0
    }
};

export function useGameEngine() {
    const [gameState, setGameState] = useState<GameState>('LOADING');
    const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER);
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [activeEncounter, setActiveEncounter] = useState<Tile | null>(null);

    // --- Actions ---

    const initializeGame = useCallback((archetypeId: string, boonId: string) => {
        // 1. Create a simple 3x3 Grid Graph
        // Layout: 
        // 0--1--2
        // |  |  |
        // 3--4--5
        // |  |  |
        // 6--7--8

        const newTiles: Tile[] = [];
        const rows = 3;
        const cols = 3;

        // Shuffle Deck for Map and Player
        const fullDeck = [...TAROT_CARDS].sort(() => Math.random() - 0.5);

        // Split: 9 cards for Map, rest for Player Deck
        const mapCards = fullDeck.slice(0, 9);
        const playerDeck = fullDeck.slice(9);

        let cardIndex = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const id = `${r * cols + c}`;

                // Calculate position (centered in 33% grid cells)
                const posX = (c * 33) + 16.5;
                const posY = (r * 33) + 16.5;

                // Determine Neighbors (Graph Edges)
                const connections: string[] = [];
                if (c > 0) connections.push(`${r * cols + (c - 1)}`); // Left
                if (c < cols - 1) connections.push(`${r * cols + (c + 1)}`); // Right
                if (r > 0) connections.push(`${(r - 1) * cols + c}`); // Up
                if (r < rows - 1) connections.push(`${(r + 1) * cols + c}`); // Down

                newTiles.push({
                    id,
                    position: { x: posX, y: posY },
                    isFlipped: id === '0', // Start flipped
                    isOccupied: id === '0', // Start at top-left for MVP
                    isCleared: id === '0', // Start cleared
                    cardContent: mapCards[cardIndex++] as any, // Cast for MVP
                    connectedTo: connections
                });
            }
        }

        setTiles(newTiles);

        // Apply Archetype Stats
        let stats = { ...INITIAL_PLAYER.stats };
        if (archetypeId === 'The Daydreamer') stats.empathy += 2; // Water affinity
        if (archetypeId === 'The Architect') stats.logic += 2;   // Air affinity
        if (archetypeId === 'The Weaver') stats.passion += 2;    // Fire affinity

        // Apply Boon Stats
        if (boonId === 'lantern') stats.logic += 1;
        if (boonId === 'rose') stats.empathy += 1;
        if (boonId === 'key') stats.resilience += 1;

        setPlayer({
            ...INITIAL_PLAYER,
            currentTileId: '0',
            deck: playerDeck as any, // Cast for MVP
            stats: stats
        });
        setGameState('MAP'); // Jump straight to MAP after setup
    }, []);

    const drawCard = (count: number = 1) => {
        setPlayer(prev => {
            if (prev.deck.length < count) {
                // Reshuffle discard (MVP: just ignore empty deck for now)
                return prev;
            }
            const newHand = [...prev.hand, ...prev.deck.slice(0, count)];
            const newDeck = prev.deck.slice(count);
            return { ...prev, hand: newHand, deck: newDeck };
        });
    };

    const moveToTile = (targetTileId: string) => {
        // 1. Validate Adjacency
        const currentTile = tiles.find(t => t.id === player.currentTileId);
        if (!currentTile || !currentTile.connectedTo.includes(targetTileId)) {
            console.warn("Invalid Move: Not connected");
            return;
        }

        // 2. Update Map State
        setTiles((prev: Tile[]) => prev.map(t => ({
            ...t,
            isOccupied: t.id === targetTileId,
            isFlipped: t.id === targetTileId ? true : t.isFlipped // Auto-flip on move for now
        })));

        // 3. Update Player State
        setPlayer((prev: PlayerState) => ({ ...prev, currentTileId: targetTileId }));

        // 4. Trigger Event?
        const targetTile = tiles.find(t => t.id === targetTileId);

        // Special Case: Boss Tile (ID '8' - Bottom Right)
        if (targetTile?.id === '8') {
            setGameState('BOSS');
            return;
        }

        if (targetTile && !targetTile.isCleared) {
            setActiveEncounter(targetTile);
            // Draw initial hand for encounter
            drawCard(3);
            setGameState('ENCOUNTER');
        }
    };

    const resolveEncounter = (result: 'WIN' | 'LOSS') => {
        if (!activeEncounter) return;

        if (result === 'WIN') {
            // Mark tile as clears
            setTiles((prev: Tile[]) => prev.map(t =>
                t.id === activeEncounter.id ? { ...t, isCleared: true } : t
            ));
        } else {
            // Loss penalty
            setPlayer((prev: PlayerState) => ({ ...prev, resolve: Math.max(0, prev.resolve - 20) }));
            // Optional: Retreat logic could go here
        }

        // Discard hand after encounter
        setPlayer(prev => ({
            ...prev,
            discard: [...prev.discard, ...prev.hand],
            hand: []
        }));

        setGameState('MAP');
        setActiveEncounter(null);
    };

    return {
        gameState,
        setGameState,
        player,
        tiles,
        activeEncounter,
        actions: {
            initializeGame,
            moveToTile,
            resolveEncounter,
            drawCard
        }
    };
}
