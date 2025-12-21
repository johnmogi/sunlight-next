'use client';

import React, { useState } from 'react';
import { createTopology, ShapeType } from '@/lib/game/generators/topologyGenerator';
import { generateEntity } from '@/lib/game/generators/entityGenerator';
import { generateStoryBeat } from '@/lib/game/generators/storyGenerator';
import { simulateEncounter, CombatLog } from '@/lib/game/generators/combatSimulator';
import { PlayerState, EncounterState } from '@/components/game/types';

export default function SimulationPage() {
    const [logs, setLogs] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const log = (msg: string) => setLogs(prev => [...prev, msg]);
    const clearLogs = () => setLogs([]);

    const runFullSimulation = () => {
        setIsRunning(true);
        clearLogs();
        log('--- HIDDEN GARDEN ENGINE (v2.0) INITIALIZATION ---');

        // 1. TOPOLOGY TEST
        log('\n--- 1. TOPOLOGY GENERATION ---');
        const layouts: ShapeType[] = ['GRID_3x3', 'SPIRAL', 'DIAMOND'];
        layouts.forEach(layout => {
            const map = createTopology(layout);
            log(`> Generating ${layout}: Success. Nodes: ${map.length}`);
            if (map.length > 0) log(`  First Node: ${map[0].id} at (${map[0].position.x}, ${map[0].position.y})`);
        });

        // 2. ENTITY TEST
        log('\n--- 2. ENTITY GENERATION ---');
        const archetype = 'The Weaver';
        const player = generateEntity(archetype, 'PLAYER') as PlayerState;
        log(`> Generated Player: ${archetype}`);
        log(`  Mastery: Fire ${player.mastery.passion}, Water ${player.mastery.empathy}`);
        log(`  Deck Size: ${player.deck.length}`);

        const enemy = generateEntity('1', 'ENEMY') as EncounterState;
        log(`> Generated Enemy: ${enemy.cardContent.name} (Tier 1)`);
        log(`  Density: ${enemy.currentResistance}, Intent: ${enemy.intent}`);

        // 3. NARRATIVE TEST
        log('\n--- 3. NARRATIVE BEATS ---');
        const intro = generateStoryBeat(1, 'INTRO', archetype);
        const combatBeat = generateStoryBeat(1, 'COMBAT', archetype);
        log(`> Intro: "${intro}"`);
        log(`> Combat Flavor: "${combatBeat}"`);

        // 4. COMBAT DEEP SIM
        log('\n--- 4. DEEP SIMULATION (COMBAT) ---');
        log(`  Simulating ${archetype} vs ${enemy.cardContent.name}...`);

        const battleLogs = simulateEncounter(player, enemy);

        battleLogs.forEach(turn => {
            log(`\n[Turn ${turn.turn}]`);
            turn.log.forEach(l => log(`  ${l}`));
            if (turn.winner) log(`  => RESULT: ${turn.winner} WINS`);
        });

        setIsRunning(false);
    };

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-amber-50 font-mono text-sm">
            <h1 className="text-2xl mb-4 text-amber-500 font-bold border-b border-amber-900 pb-2">HGE Deep Simulation</h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={runFullSimulation}
                    disabled={isRunning}
                    className="px-6 py-3 bg-amber-700 hover:bg-amber-600 rounded text-amber-100 font-bold disabled:opacity-50 transition-colors"
                >
                    {isRunning ? 'Running Sim...' : 'Run Deep Sim'}
                </button>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 h-[600px] overflow-y-auto shadow-inner">
                {logs.length === 0 && <p className="text-slate-600 italic">Ready to simulate...</p>}
                {logs.map((l, i) => (
                    <div key={i} className={`mb-1 ${l.startsWith('>') || l.startsWith('-') ? 'text-amber-300 font-bold' : 'text-slate-300'}`}>
                        {l}
                    </div>
                ))}
            </div>
        </div>
    );
}
