import { GAME_CONFIG } from '@/components/game/gameConfig';
import { PlayerState } from '@/components/game/types';

export type EventOutcome = 'COMBAT' | 'FOG' | 'LOOT';

export function resolveFateRoll(roll: number): EventOutcome {
    const { combat, trap, treasure } = GAME_CONFIG.eventThresholds;

    if (roll >= combat[0] && roll <= combat[1]) return 'COMBAT';
    if (roll >= trap[0] && roll <= trap[1]) return 'FOG';
    return 'LOOT';
}

export function applyFogPenalty(player: PlayerState): PlayerState {
    // Current Rule: -1 Focus
    const penalty = 1;
    const newFocus = Math.max(0, player.focus - penalty);
    return {
        ...player,
        focus: newFocus
    };
}

export function generateLoot(): string {
    // MVP: Just return a string description for now 
    const rewards = ['Ancient Coin', 'Small Potion', 'Lost Page'];
    return rewards[Math.floor(Math.random() * rewards.length)];
}
