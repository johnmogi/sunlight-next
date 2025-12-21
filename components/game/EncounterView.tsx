import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardData, Tile } from './types';

interface EncounterViewProps {
    encounter: Tile;
    hand: CardData[];
    onResolve: (result: 'WIN' | 'LOSS') => void;
}

export function EncounterView({ encounter, hand, onResolve }: EncounterViewProps) {
    const [roll, setRoll] = useState<number | null>(null);
    const [modifier, setModifier] = useState(0);
    const [cardsPlayed, setCardsPlayed] = useState<string[]>([]);

    // Multi-Round State
    const [enemyResolve, setEnemyResolve] = useState(20); // Hardcoded Enemy HP for MVP
    const [turn, setTurn] = useState<'PLAYER' | 'ENEMY'>('PLAYER');
    const [logs, setLogs] = useState<string[]>(["The discussion begins."]);

    const challengeRating = 4; // Damage dealt by enemy

    const getAffinityModifier = (cardSuit: string | undefined, encounterSuit: string | undefined): { value: number, label: string, color: string } => {
        if (!cardSuit || !encounterSuit) return { value: 1, label: "Neutral", color: "text-slate-400" };
        if (cardSuit === 'ether' || encounterSuit === 'ether') return { value: 2, label: "Pure", color: "text-purple-400" };
        if (cardSuit === encounterSuit) return { value: 2, label: "Resonance", color: "text-amber-400" };
        if (
            (cardSuit === 'vessels' && encounterSuit === 'roses') ||
            (cardSuit === 'roses' && encounterSuit === 'leaves') ||
            (cardSuit === 'leaves' && encounterSuit === 'crystals') ||
            (cardSuit === 'crystals' && encounterSuit === 'vessels')
        ) return { value: 3, label: "Super Effective!", color: "text-green-400" };

        if (
            (cardSuit === 'roses' && encounterSuit === 'vessels') ||
            (cardSuit === 'leaves' && encounterSuit === 'roses') ||
            (cardSuit === 'crystals' && encounterSuit === 'leaves') ||
            (cardSuit === 'vessels' && encounterSuit === 'crystals')
        ) return { value: 0, label: "Ineffective", color: "text-red-400" };

        return { value: 1, label: "Neutral", color: "text-slate-400" };
    };

    // Dice Rolling Mechanic (Player Attack)
    const handleRoll = () => {
        const result = Math.floor(Math.random() * 6) + 1;
        setRoll(result);

        setTimeout(() => {
            const damage = result + modifier;
            const newEnemyResolve = Math.max(0, enemyResolve - damage);
            setEnemyResolve(newEnemyResolve);
            setLogs(prev => [...prev, `You argued with ${damage} power!`]);

            if (newEnemyResolve === 0) {
                setTimeout(() => onResolve('WIN'), 1000);
            } else {
                setTurn('ENEMY');
                setRoll(null);
                setModifier(0);
                setCardsPlayed([]); // Reset played cards for next turn
                handleEnemyTurn();
            }
        }, 1000);
    };

    const handleEnemyTurn = () => {
        setTimeout(() => {
            setLogs(prev => [...prev, `The Blockage retorts! -${challengeRating} Resolve.`]);
            // In a real app we'd dispatch damage to player here
            // For MVP, we'll just check loss condition conceptually or rely on the parent to handle it on 'LOSS'
            // For now, let's just switch back to Player
            setTurn('PLAYER');
            // Check Loss condition? (Assumed handled by parent resolve for now, but UI should show it)
            // Ideally we call onResolve('DAMAGE') but the interface is WIN/LOSS. 
            // We'll leave damage tracking to this local view for now or assume Player has lots of HP.
        }, 2000);
    };

    const handlePlayCard = (cardId: string) => {
        if (turn !== 'PLAYER' || roll !== null) return;
        if (cardsPlayed.includes(cardId)) return;

        const card = hand.find(c => c.id === cardId);
        if (!card) return;

        const affinity = getAffinityModifier(card.suit, encounter.cardContent.suit);

        setCardsPlayed([...cardsPlayed, cardId]);
        setModifier(prev => prev + affinity.value);
    };

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4">

            {/* Header */}
            <div className="absolute top-8 text-center w-full max-w-4xl flex justify-between items-center px-12">
                <div>
                    <h2 className="text-3xl font-serif text-amber-100 mb-2">{encounter.cardContent.name}</h2>
                    <div className="text-slate-400 text-sm">Round {logs.length}</div>
                </div>

                {/* Enemy HP Bar */}
                <div className="w-64">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Blocage Resolve</span>
                        <span>{enemyResolve}/20</span>
                    </div>
                    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <motion.div
                            className="h-full bg-red-500"
                            initial={{ width: "100%" }}
                            animate={{ width: `${(enemyResolve / 20) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Log */}
            <div className="absolute top-32 w-full max-w-lg h-24 overflow-y-auto pointer-events-none text-center text-sm text-slate-500 font-mono">
                {logs.slice(-3).map((l, i) => <div key={i}>{l}</div>)}
            </div>

            {/* Center: Battlefield */}
            <div className="flex flex-col md:flex-row items-center gap-12 mt-20 w-full max-w-4xl justify-center">

                {/* Enemy Card */}
                <motion.div
                    animate={{ scale: turn === 'ENEMY' ? 1.1 : 1 }}
                    className="w-64 h-96 relative group"
                >
                    <img
                        src={encounter.cardContent.image}
                        className={`w-full h-full object-cover rounded-xl border-2 shadow-2xl transition-colors duration-500 ${turn === 'ENEMY' ? 'border-red-500 shadow-red-500/50' : 'border-purple-400/50'}`}
                    />
                </motion.div>

                {/* Dice/Action Panel */}
                <div className="w-64 h-96 flex flex-col items-center justify-center bg-slate-900/50 border border-slate-700 rounded-xl p-6 relative">

                    {turn === 'PLAYER' ? (
                        <>
                            <div className="w-24 h-24 bg-slate-800 rounded-xl flex items-center justify-center border-2 border-slate-600 mb-6 relative">
                                {roll ? (
                                    <motion.span
                                        key={roll}
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-5xl font-bold text-white"
                                    >
                                        {roll}
                                    </motion.span>
                                ) : (
                                    <span className="text-4xl text-slate-700 animate-pulse">?</span>
                                )}
                                {modifier > 0 && (
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">+{modifier}</div>
                                )}
                            </div>

                            {!roll && (
                                <Button onClick={handleRoll} size="lg" className="w-full bg-amber-600 hover:bg-amber-500 font-bold">
                                    Make Point
                                </Button>
                            )}
                        </>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-red-400 font-bold text-xl mb-4 animate-pulse">Opponent's Turn...</h3>
                            <p className="text-slate-400 text-sm">The Blockage is formulating a counter-argument...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Player Hand */}
            <div className={`absolute bottom-4 left-0 right-0 p-4 transition-opacity duration-500 ${turn === 'ENEMY' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <div className="max-w-4xl mx-auto">
                    <p className="text-slate-400 text-sm mb-2 text-center uppercase tracking-widest">{turn === 'PLAYER' ? "Your Turn - Support your Argument" : "Wait..."}</p>
                    <div className="flex gap-4 justify-center items-end h-40">
                        <AnimatePresence>
                            {hand.map((card, index) => {
                                const isPlayed = cardsPlayed.includes(card.id);
                                if (isPlayed) return null;

                                const affinity = getAffinityModifier(card.suit, encounter.cardContent.suit);

                                return (
                                    <motion.div
                                        key={card.id}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -40, scale: 1.1, zIndex: 10 }}
                                        onClick={() => handlePlayCard(card.id)}
                                        className={`w-24 h-36 bg-slate-800 rounded-lg border-2 border-slate-600 shadow-xl cursor-pointer overflow-visible relative group transition-all hover:border-blue-400`}
                                    >
                                        <img src={card.image} className="w-full h-full object-cover rounded-md" />

                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                            <span className={`font-bold ${affinity.color}`}>{affinity.label} (+{affinity.value})</span>
                                        </div>

                                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-[10px] text-white uppercase font-bold border border-white/20">
                                            {card.suit ? card.suit[0] : 'E'}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                        {hand.length === 0 && <div className="text-slate-600 italic">Empty Hand</div>}
                    </div>
                </div>
            </div>

        </div>
    );
}
