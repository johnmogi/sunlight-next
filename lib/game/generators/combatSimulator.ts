import { PlayerState, EncounterState, CardData } from '@/components/game/types';

export interface CombatLog {
    turn: number;
    log: string[];
    winner: 'PLAYER' | 'ENEMY' | null;
}

export function simulateEncounter(player: PlayerState, enemy: EncounterState): CombatLog[] {
    const logs: CombatLog[] = [];
    let turnCount = 0;
    let isBattleOver = false;

    // Clone states to avoid mutating valid game state
    let p = JSON.parse(JSON.stringify(player));
    let e = JSON.parse(JSON.stringify(enemy));
    // Ensure deck logic works on clone (re-hydrate if needed, but for sim JSON is fine)

    while (!isBattleOver && turnCount < 20) {
        turnCount++;
        const currentLog: string[] = [];

        // --- PHASE 1: INTENT ---
        currentLog.push(`[Enemy] ${e.cardContent.name} shows intent: ${e.intent} (${e.nextMoveDamage} Dmg)`);

        // --- PHASE 2: PLAYER TURN ---
        // 1. Draw Hand (Simulated: Draw 5)
        const handSize = 5;
        // Mock Draw: Just pick random cards from deck if available, else standard set
        const hand = p.deck.slice(0, handSize);
        currentLog.push(`[Player] Draws hand: ${hand.map((c: any) => c.name).join(', ')}`);

        // 2. Play Cards (AI: Play any matching suit first, then others if affordable)
        let focus = p.maxFocus;
        let clarity = 0; // Attack
        let composure = 0; // Block

        currentLog.push(`[Player] Focus: ${focus}/${p.maxFocus}`);

        for (const card of hand) {
            // AI Logic: Always play if can afford
            if (focus >= card.cost) {
                focus -= card.cost;

                // Card Effects (Simulated)
                // In HGE, Suit decides effect type
                if (card.suit === 'leaves' || card.suit === 'roses') {
                    // Attack
                    const dmg = (card.value || 1) + 2;
                    clarity += dmg;
                    currentLog.push(`> Plays ${card.name} (Attack +${dmg})`);
                } else if (card.suit === 'crystals' || card.suit === 'vessels') {
                    // Block
                    const block = (card.value || 1) + 2;
                    composure += block;
                    currentLog.push(`> Plays ${card.name} (Block +${block})`);
                } else {
                    currentLog.push(`> Plays ${card.name} (Utility - No Effect in Sim)`);
                }
            }
        }

        // --- PHASE 3: EXECUTION (THE ROLL) ---
        // Elemental Dice (D6)
        const roll = Math.floor(Math.random() * 6) + 1;
        const totalAttack = clarity + roll;

        currentLog.push(`[Roll] Elemental Dice (D6): ${roll} + ${clarity} Clarity = ${totalAttack} Total`);

        // Apply Damage to Enemy Density
        const damageDealt = Math.max(0, totalAttack); // Enemy has no block in this MVP
        e.currentResistance -= damageDealt;
        currentLog.push(`[Result] Dealt ${damageDealt} to Density. Enemy at ${e.currentResistance}/${e.maxResistance}`);

        if (e.currentResistance <= 0) {
            logs.push({ turn: turnCount, log: [...currentLog, "*** VICTORY: SHADOW DISSOLVED ***"], winner: 'PLAYER' });
            return logs;
        }

        // --- PHASE 4: ENEMY TURN ---
        const incoming = e.nextMoveDamage;
        const damageToPlayer = Math.max(0, incoming - composure);

        currentLog.push(`[Enemy] Attacks for ${incoming}. Blocked ${composure}. Took ${damageToPlayer} Dmg.`);
        p.lucidity -= damageToPlayer;
        currentLog.push(`[Player] Lucidity: ${p.lucidity}/${p.maxLucidity}`);

        if (p.lucidity <= 0) {
            logs.push({ turn: turnCount, log: [...currentLog, "*** DEFEAT: LUCIDITY LOST ***"], winner: 'ENEMY' });
            return logs;
        }

        logs.push({ turn: turnCount, log: currentLog, winner: null });
    }

    return logs;
}
