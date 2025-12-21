import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardData, Tile, StatusEffect, EncounterState } from './types'; // Ensure EncounterState is imported
import { Shield, Zap, Droplets, Leaf, Flame, Hexagon } from 'lucide-react';

interface EncounterViewProps {
    encounter: EncounterState; // Use strict type
    player: PlayerState;
    onResolve: (result: 'WIN' | 'LOSS') => void;
}

export function EncounterView({ encounter, player, onResolve }: EncounterViewProps) {
    // Combat State
    const [enemyResistance, setEnemyResistance] = useState(30);
    const [maxEnemyResistance] = useState(30);

    // Turn State
    const [currentFocus, setCurrentFocus] = useState(player.maxFocus);
    const [turnClarity, setTurnClarity] = useState(0); // Attack Power
    const [turnComposure, setTurnComposure] = useState(0); // Block
    const [turn, setTurn] = useState<'FORMULATE' | 'EXECUTE' | 'RESULT' | 'ENEMY'>('FORMULATE');

    const [logs, setLogs] = useState<string[]>(["The debate begins..."]);
    const [cardsPlayedThisTurn, setCardsPlayedThisTurn] = useState<string[]>([]);
    const [rollResult, setRollResult] = useState<number | null>(null);

    // Artifact State
    const hasButterfly = player.inventory?.artifacts?.some(a => a.id === 'butterfly');
    const hasThorn = player.inventory?.artifacts?.some(a => a.id === 'thorn');
    const [usedButterfly, setUsedButterfly] = useState(false);

    // Constants
    const BASE_ENEMY_DAMAGE = 8; // "Confusion Damage"

    // --- Actions ---

    const handleButterfly = () => {
        if (!hasButterfly || usedButterfly) return;
        setUsedButterfly(true);
        // Reshuffle Logic (Simulated for MVP)
        // Ideally this would emit an event to useGameEngine, but for now we just log it
        // and maybe gain Clarity to represent 'fresh perspective'
        setTurnClarity(prev => prev + 2);
        setLogs(prev => [...prev, "🦋 Blue Butterfly flutters... Hand reshuffled! (+2 Clarity)"]);
    };

    const handlePlayCard = (cardId: string) => {
        if (turn !== 'FORMULATE') return;
        if (currentFocus <= 0) {
            setLogs(prev => [...prev, "Not enough Focus!"]);
            return;
        }
        if (cardsPlayedThisTurn.includes(cardId)) return;

        const card = player.hand.find(c => c.id === cardId);
        if (!card) return;

        // Apply Card Effects
        // MVP Logic based on Suits
        let logMsg = "";

        switch (card.suit) {
            case 'roses': // Fire -> Insight/Damage
                setTurnClarity(prev => prev + 3);
                logMsg = "Added +3 Clarity (Sharpness).";
                break;
            case 'vessels': // Water -> Flow/Draw (Simulated)
                // MVP: Add Clarity + Composure
                setTurnClarity(prev => prev + 1);
                setTurnComposure(prev => prev + 2);
                logMsg = "Added Flow (+1 Clarity, +2 Composure).";
                break;
            case 'crystals': // Earth -> Foundation/Block
                setTurnComposure(prev => prev + 4);
                logMsg = "Added +4 Composure (Foundation).";
                break;
            case 'leaves': // Wood -> Growth
                setTurnClarity(prev => prev + 2);
                setTurnComposure(prev => prev + 1);
                logMsg = "Growing Argument (+2 Clarity, +1 Composure).";
                break;
            default:
                setTurnClarity(prev => prev + 5);
                logMsg = "Major Insight! (+5 Clarity).";
        }

        // Pay Cost
        setCurrentFocus(prev => prev - 1); // MVP: All cards cost 1 Focus
        setCardsPlayedThisTurn(prev => [...prev, cardId]);
        setLogs(prev => [...prev, `> ${card.name}: ${logMsg}`]);
    };

    const handleExecute = () => {
        if (turn !== 'FORMULATE') return;
        setTurn('EXECUTE');

        // Roll Dice
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 6) + 1;
            const total = roll + turnClarity + player.clarity; // Add Base Stats if any
            setRollResult(roll);

            setLogs(prev => [...prev, `Rolling... [${roll}] + ${turnClarity} = ${total} Clarity!`]);

            // Deal Damage
            setTimeout(() => {
                const damage = total; // No enemy block for MVP yet
                const newRes = Math.max(0, enemyResistance - damage);
                setEnemyResistance(newRes);

                setLogs(prev => [...prev, `Shadow Resistance reduced by ${damage}.`]);

                if (newRes <= 0) {
                    setTimeout(() => onResolve('WIN'), 1000);
                } else {
                    setTurn('RESULT');
                    setTimeout(() => endPlayerTurn(), 1000);
                }
            }, 500);
        }, 500);
    };

    const endPlayerTurn = () => {
        setTurn('ENEMY');
        setRollResult(null);

        // Enemy Acts
        setTimeout(() => {
            // Enemy Attack
            const incomingDmg = BASE_ENEMY_DAMAGE;
            const blocked = turnComposure;
            const taken = Math.max(0, incomingDmg - blocked);

            if (taken > 0) {
                setLogs(prev => [...prev, `Moonlight Form deals ${incomingDmg} Confusion! (-${blocked} Blocked)`]);
                // We don't update global player state here in MVP view, 
                // but ideally we'd call onDamage(taken).
                // For MVP Visuals:
                setLogs(prev => [...prev, `>> Lost ${taken} Lucidity!`]);

                // Obsidian Thorn Logic
                if (hasThorn) {
                    const thornDmg = 3;
                    setEnemyResistance(prev => Math.max(0, prev - thornDmg));
                    setLogs(prev => [...prev, `🌹 Obsidian Thorn pricks the Form! -${thornDmg} Density.`]);
                }
            } else {
                setLogs(prev => [...prev, `Moonlight attacks (${incomingDmg}), but your Composure holds!`]);
            }

            // Reset for Next Turn
            setTimeout(() => {
                setTurn('FORMULATE');
                setCurrentFocus(player.maxFocus);
                setTurnClarity(0);
                setTurnComposure(0);
                setCardsPlayedThisTurn([]);
            }, 1000);
        }, 1000);
    };

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 font-sans select-none">

            {/* Header */}
            <div className="absolute top-8 w-full max-w-4xl flex justify-between items-start px-8">
                {/* Enemy Status */}
                <div className="w-1/3">
                    <h2 className="text-2xl font-serif text-amber-100 mb-2">{encounter.cardContent.name} (Moonlight)</h2>
                    <div className="text-red-400 font-bold flex items-center gap-2">
                        <span>Raw Intent: {encounter.intent || 'Unknown'}</span>
                        <span className="text-xs text-slate-500">({encounter.nextMoveDamage} Dmg)</span>
                    </div>
                </div>

                {/* Log */}
                <div className="w-1/3 h-24 overflow-y-auto text-center text-xs text-slate-500 font-mono scrollbar-hide">
                    {logs.slice(-5).map((l, i) => <div key={i}>{l}</div>)}
                </div>

                {/* Player Status */}
                <div className="w-1/3 text-right">
                    <div className="text-sm text-slate-400">Total Argument Power</div>
                    <div className="text-4xl font-bold text-amber-500 flex items-center justify-end gap-2">
                        {turnClarity} <span className="text-sm text-slate-500">Clarity</span>
                    </div>
                </div>
            </div>

            {/* Battle Area */}
            <div className="flex items-center justify-center gap-16 mt-12 w-full max-w-4xl">

                {/* Enemy */}
                <div className="relative group">
                    <motion.div
                        animate={{ scale: turn === 'ENEMY' ? 1.05 : 1 }}
                        className="w-64 h-96"
                    >
                        <img
                            src={encounter.cardContent.image}
                            className={`w-full h-full object-cover rounded-xl border-4 shadow-2xl transition-colors duration-500 ${enemyResistance < 10 ? 'border-amber-500 animate-pulse' : 'border-slate-700'}`}
                        />
                    </motion.div>

                    {/* Enemy Resistance Bar */}
                    <div className="absolute -bottom-6 left-0 right-0 h-4 bg-slate-800 rounded-full border border-slate-600 overflow-hidden">
                        <motion.div
                            className="h-full bg-red-600"
                            initial={{ width: "100%" }}
                            animate={{ width: `${(enemyResistance / maxEnemyResistance) * 100}%` }}
                        />
                    </div>
                    <div className="absolute -bottom-12 left-0 right-0 text-center text-slate-300 font-bold">
                        {enemyResistance} / {maxEnemyResistance} Density
                    </div>
                </div>

                {/* Actions / Dice */}
                <div className="flex flex-col gap-4 items-center justify-center w-48">
                    {turn === 'EXECUTE' && rollResult && (
                        <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-24 h-24 bg-amber-100 rounded-xl flex items-center justify-center text-6xl font-bold text-black border-4 border-amber-600 shadow-2xl"
                        >
                            {rollResult}
                        </motion.div>
                    )}

                    {turn === 'FORMULATE' && (
                        <div className="flex flex-col gap-2 w-full">
                            <Button
                                onClick={handleExecute}
                                size="lg"
                                className="w-full h-16 text-xl bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.4)]"
                            >
                                MAKE POINT
                            </Button>

                            {hasButterfly && !usedButterfly && (
                                <Button
                                    onClick={handleButterfly}
                                    variant="outline"
                                    className="w-full border-blue-400 text-blue-300 hover:bg-blue-900/30"
                                >
                                    🦋 Reshuffle
                                </Button>
                            )}
                        </div>
                    )}
                </div>

            </div>

            {/* Hand Area */}
            <div className={`absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent transition-all duration-500 ${turn !== 'FORMULATE' ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100'}`}>

                {/* Focus Bar */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-4 bg-slate-900/80 px-6 py-2 rounded-full border border-slate-700">
                    <span className="text-slate-400 text-sm uppercase tracking-widest font-bold pt-1">Focus</span>
                    <div className="flex gap-2">
                        {[...Array(player.maxFocus)].map((_, i) => (
                            <div key={i} className={`w-6 h-6 rounded-full border border-amber-500 ${i < currentFocus ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'bg-slate-800'}`} />
                        ))}
                    </div>
                    <div className="w-px h-6 bg-slate-700 mx-2" />
                    <span className="text-blue-400 flex items-center gap-2"><Shield className="w-4 h-4" /> {turnComposure}</span>
                </div>

                <div className="flex gap-4 justify-center items-end h-48 perspective-500">
                    <AnimatePresence>
                        {player.hand.map((card, index) => {
                            const isPlayed = cardsPlayedThisTurn.includes(card.id);
                            if (isPlayed) return null;

                            // Dynamic Style based on Suit
                            let borderColor = "border-slate-600";
                            let badge = "E";
                            if (card.suit === 'vessels') { borderColor = "border-blue-500"; badge = "💧"; }
                            if (card.suit === 'crystals') { borderColor = "border-amber-700"; badge = "🛡️"; }
                            if (card.suit === 'roses') { borderColor = "border-red-500"; badge = "⚔️"; }
                            if (card.suit === 'leaves') { borderColor = "border-green-500"; badge = "🌿"; }

                            return (
                                <motion.div
                                    key={card.id}
                                    initial={{ y: 200, opacity: 0, rotate: (index - player.hand.length / 2) * 5 }}
                                    animate={{ y: 0, opacity: 1, rotate: (index - player.hand.length / 2) * 5 }}
                                    exit={{ y: -100, opacity: 0 }}
                                    whileHover={{ y: -60, scale: 1.2, rotate: 0, zIndex: 50 }}
                                    onClick={() => handlePlayCard(card.id)}
                                    className={`w-32 h-48 bg-slate-900 rounded-xl border-2 ${borderColor} shadow-2xl cursor-pointer relative group transition-all duration-200 transform-gpu`}
                                >
                                    <img src={card.image} className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />

                                    {/* Cost Logic: Assume 1 for MVP */}
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-950 border border-amber-500 rounded-full flex items-center justify-center font-bold text-amber-500 shadow-lg z-20">
                                        1
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-950 border border-slate-500 rounded-full flex items-center justify-center text-lg shadow-lg z-20">
                                        {badge}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

        </div>
    );
}
