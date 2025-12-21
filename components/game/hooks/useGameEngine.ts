import { useState, useCallback } from 'react';
import { Tile, PlayerState, GameState, CardData, EncounterState } from '../types';
import { TAROT_CARDS } from '@/lib/card-sets/set-update129';
import { GAME_CONFIG } from '../gameConfig';
import { createTopology } from '@/lib/game/generators/topologyGenerator';
import { generateEntity } from '@/lib/game/generators/entityGenerator';
import { resolveFateRoll, applyFogPenalty } from '@/lib/game/generators/encounterEngine';

// Initial Player State
const INITIAL_PLAYER: PlayerState = {
    currentTileId: 'start',
    lucidity: 100,
    maxLucidity: 100,
    focus: 3,
    maxFocus: 3,
    clarity: 0,
    composure: 0,
    statuses: [],
    mastery: {
        empathy: 1, // Water
        logic: 1,   // Air
        passion: 1, // Fire
        resilience: 1 // Earth
    },
    hand: [],
    deck: [],
    discard: [],
    inventory: {
        artifacts: [],
        keys: 0
    }
};

export function useGameEngine() {
    const [gameState, setGameState] = useState<GameState>('LOADING');
    const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER);
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [activeEncounter, setActiveEncounter] = useState<EncounterState | null>(null);
    const [eventRollResult, setEventRollResult] = useState<number | null>(null); // New state for D10
    const [currentAct, setCurrentAct] = useState<number>(1); // New Act State

    // --- Actions ---

    const initializeGame = useCallback((archetypeId: string, artifactId: string) => {
        // 1. Generate Map (HGE: Topology)
        const newTiles = createTopology('GRID_3x3');
        setTiles(newTiles);

        // 2. Generate Player (HGE: Entity)
        let newPlayer = generateEntity(archetypeId, 'PLAYER') as PlayerState;

        // Apply Artifacts (Manual Logic for MVP, could be in factory later)
        const artifacts = [];
        let maxFocus = newPlayer.maxFocus;

        if (artifactId === 'mask') {
            maxFocus += 1;
            artifacts.push({ id: 'mask', name: 'The Golden Mask', description: '+1 Focus', effect: (s: any) => s });
        }
        if (artifactId === 'butterfly') {
            artifacts.push({ id: 'butterfly', name: 'The Blue Butterfly', description: 'Reshuffle Hand', effect: (s: any) => s });
        }
        if (artifactId === 'thorn') {
            artifacts.push({ id: 'thorn', name: 'The Obsidian Thorn', description: 'Reflect Damage', effect: (s: any) => s });
        }

        setPlayer({
            ...newPlayer,
            currentTileId: '0',
            maxFocus: maxFocus,
            focus: maxFocus,
            inventory: { ...newPlayer.inventory, artifacts }
        });

        setGameState('MAP');
    }, []);

    const drawCard = (count: number = 1) => {
        setPlayer(prev => {
            if (prev.deck.length < count) {
                return prev;
            }
            const newHand = [...prev.hand, ...prev.deck.slice(0, count)];
            const newDeck = prev.deck.slice(count);
            return { ...prev, hand: newHand, deck: newDeck };
        });
    };

    const moveToTile = (targetTileId: string) => {
        const currentTile = tiles.find(t => t.id === player.currentTileId);
        if (!currentTile || !currentTile.connectedTo.includes(targetTileId)) return;

        setTiles((prev: Tile[]) => prev.map(t => ({
            ...t,
            isOccupied: t.id === targetTileId,
            isFlipped: t.id === targetTileId ? true : t.isFlipped
        })));

        setPlayer((prev: PlayerState) => ({ ...prev, currentTileId: targetTileId }));

        const targetTile = tiles.find(t => t.id === targetTileId);
        if (targetTile?.id === '8') {
            setGameState('BOSS');
            return;
        }

        if (targetTile && !targetTile.isCleared) {
            // Generate Enemy Stats based on the Card and current Act
            // Note: generateEntity expects a Card ID as the seed. targetTile.cardContent.id is the Card ID.
            const enemy = generateEntity(targetTile.cardContent.id, 'ENEMY', currentAct) as EncounterState;
            setActiveEncounter(enemy);

            // V5 Change: Go to Event Roll first, not Encounter
            setGameState('EVENT_ROLL');
            setEventRollResult(null); // Reset
        }
    };

    const resolveEncounter = (result: 'WIN' | 'LOSS') => {
        if (!activeEncounter) return;

        if (result === 'WIN') {
            setTiles((prev: Tile[]) => prev.map(t =>
                t.id === player.currentTileId ? { ...t, isCleared: true } : t
            ));
        } else {
            // Loss penalty: Lose Lucidity
            setPlayer((prev: PlayerState) => ({ ...prev, lucidity: Math.max(0, prev.lucidity - 20) }));
        }

        setPlayer(prev => ({
            ...prev,
            discard: [...prev.discard, ...prev.hand],
            hand: [],
            // Reset Focus/Composure after encounter
            focus: prev.maxFocus, // Reset focus
            composure: 0,
            clarity: 0
        }));

        setGameState('MAP');
        setActiveEncounter(null);
    };

    const triggerEventRoll = () => {
        const roll = Math.floor(Math.random() * GAME_CONFIG.dice.fate) + 1;
        setEventRollResult(roll);
        return roll;
    };

    const completeEventRoll = (roll: number) => {
        const outcome = resolveFateRoll(roll);

        if (outcome === 'COMBAT') {
            drawCard(5);
            setGameState('ENCOUNTER');
        } else if (outcome === 'FOG') {
            setPlayer(prev => applyFogPenalty(prev));
            setGameState('TRAP'); // View uses 'TRAP' for Fog currently
        } else {
            setGameState('LOOT');
        }
    };

    const handleBossVictory = () => {
        // Increment Act
        const nextAct = currentAct + 1;
        setCurrentAct(nextAct);

        // Regenerate Map Difficulty based on Act
        // Act 2 = SPIRAL
        const nextShape = nextAct === 2 ? 'SPIRAL' : 'GRID_3x3';
        const newTiles = createTopology(nextShape);
        setTiles(newTiles);

        // Reset Player Position for new map
        setPlayer(prev => ({
            ...prev,
            currentTileId: '0'
        }));

        setGameState('MAP');
    };

    return {
        gameState,
        setGameState,
        player,
        tiles,
        activeEncounter,
        eventRollResult,
        actions: {
            initializeGame,
            moveToTile,
            resolveEncounter,
            drawCard,
            triggerEventRoll,
            completeEventRoll,
            handleBossVictory
        }
    };
}
