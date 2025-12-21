import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardData, Element } from './types';

interface BossSequenceProps {
    playerResolve: number;
    hand: CardData[];
    onVictory: () => void;
    onDefeat: () => void;
}

export function BossSequence({ playerResolve, hand, onVictory, onDefeat }: BossSequenceProps) {
    const [phase, setPhase] = useState(0); // 0, 1, 2 (Barriers)
    const [logs, setLogs] = useState<string[]>(["The Shadow Keeper blocks your path."]);
    const [isRolling, setIsRolling] = useState(false);

    // Combat State
    const [cardsPlayed, setCardsPlayed] = useState<string[]>([]);
    const [modifier, setModifier] = useState(0);

    const barriers: { name: string, hp: number, desc: string, suit: Element }[] = [
        { name: "Barrier of Doubt", hp: 5, desc: "A wall of weeping whispers (Water).", suit: 'vessels' },
        { name: "Barrier of Fear", hp: 6, desc: "A paralyzed moment (Fire).", suit: 'roses' },
        { name: "The Core", hp: 7, desc: "The root of the blockage (Earth).", suit: 'crystals' }
    ];

    const currentBarrier = barriers[phase];

    // Affinity Logic (Same as EncounterView)
    const getAffinityModifier = (cardSuit: string | undefined, encounterSuit: string | undefined) => {
        if (!cardSuit || !encounterSuit) return { value: 1, label: "Neutral", color: "text-slate-400" };
        if (cardSuit === 'ether' || encounterSuit === 'ether') return { value: 2, label: "Pure", color: "text-purple-400" };
        if (cardSuit === encounterSuit) return { value: 2, label: "Resonance", color: "text-amber-400" };

        // Counters: Vessels > Roses > Leaves > Crystals > Vessels
        if (
            (cardSuit === 'vessels' && encounterSuit === 'roses') ||
            (cardSuit === 'roses' && encounterSuit === 'leaves') ||
            (cardSuit === 'leaves' && encounterSuit === 'crystals') ||
            (cardSuit === 'crystals' && encounterSuit === 'vessels')
        ) return { value: 3, label: "Critical!", color: "text-green-400" };

        if (
            (cardSuit === 'roses' && encounterSuit === 'vessels') ||
            (cardSuit === 'leaves' && encounterSuit === 'roses') ||
            (cardSuit === 'crystals' && encounterSuit === 'leaves') ||
            (cardSuit === 'vessels' && encounterSuit === 'crystals')
        ) return { value: 0, label: "Weak", color: "text-red-400" };

        return { value: 1, label: "Neutral", color: "text-slate-400" };
    };

    const handlePlayCard = (cardId: string) => {
        if (isRolling) return;
        if (cardsPlayed.includes(cardId)) return;

        const card = hand.find(c => c.id === cardId);
        if (!card) return;

        if (!currentBarrier) return;

        const affinity = getAffinityModifier(card.suit, currentBarrier.suit);
        setCardsPlayed([...cardsPlayed, cardId]);
        setModifier(prev => prev + affinity.value);
        setLogs(prev => [...prev, `Used ${card.name}: ${affinity.label} (+${affinity.value})`]);
    };

    const handleChallenge = () => {
        setIsRolling(true);
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 6) + 1;
            const total = roll + modifier;
            const target = currentBarrier.hp;

            if (total >= target) {
                setLogs(prev => [...prev, `Barrier SHATTERED! (${total} vs ${target})`]);
                if (phase < 2) {
                    setPhase(p => p + 1);
                    setModifier(0);
                    setCardsPlayed([]); // Reset hand usage for next barrier?
                    // Boss still attacks even when barrier breaks? Or stunned?
                    // MVP: Boss is stunned if barrier breaks.
                    setIsRolling(false);
                } else {
                    setTimeout(onVictory, 1000);
                }
            } else {
                setLogs(prev => [...prev, `Attack Failed. (${total} vs ${target})`]);
                // Enemy Turn Logic
                setTimeout(() => {
                    setLogs(prev => [...prev, `The Shadow Strikes! -${5 + phase} Resolve`]); // Boss hits harder each phase
                    // We need a way to propogate damage up to GameEngine or handle it here?
                    // Currently BossSequence only takes playerResolve as prop, doesn't update it.
                    // We need onDamage callback.
                    onDefeat(); // Temporary: Fail = Die for MVP if no onDamage prop.
                    // Actually, let's update the interface to support onDamage logic in next step. 
                    // For now, failure leads to defeat to imply "You failed to break the barrier in time".
                    setIsRolling(false);
                }, 1000);
            }
        }, 1000);
    };

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-slate-100 font-serif">
            <div className="absolute inset-0 bg-[url('/images/about/hgintro.jpg')] bg-cover opacity-20 pointer-events-none" />

            <h2 className="text-4xl text-red-500 mb-8 font-bold tracking-widest uppercase drop-shadow-md z-10">Final Confrontation</h2>

            {/* Boss Visual */}
            <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-red-900/30 rounded-full animate-pulse blur-xl" />
                <span className="text-8xl z-10">💀</span>

                {/* Barriers Orbiting */}
                {barriers.map((b, i) => {
                    if (i < phase) return null;
                    return (
                        <motion.div
                            key={b.name}
                            className={`absolute inset-0 rounded-full border-4 ${i === phase ? 'border-amber-400 opacity-100' : 'border-red-900/40 opacity-30'
                                }`}
                            style={{ scale: 1.2 + (i * 0.3) }}
                            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                            transition={{ duration: 10 + (i * 5), repeat: Infinity, ease: "linear" }}
                        />
                    );
                })}
            </div>

            {/* Status Panel */}
            <div className="z-10 bg-slate-900/90 border border-slate-700 p-6 rounded-xl max-w-lg w-full text-center relative">
                {currentBarrier ? (
                    <>
                        <h3 className="text-2xl text-amber-100">{currentBarrier.name}</h3>
                        <p className="text-slate-400 italic mb-2 text-sm">{currentBarrier.desc}</p>
                        <div className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-500">
                            Weakness: {currentBarrier.suit === 'vessels' ? 'Crystals' : currentBarrier.suit === 'roses' ? 'Vessels' : currentBarrier.suit === 'leaves' ? 'Roses' : 'Leaves'}
                        </div>

                        {/* Roll Preview */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="text-4xl font-bold text-white">?</div>
                            <div className="text-slate-500">+</div>
                            <div className="text-4xl font-bold text-blue-400">{modifier}</div>
                            <div className="text-slate-500">vs</div>
                            <div className="text-4xl font-bold text-red-500">{currentBarrier.hp}</div>
                        </div>

                        <div className="h-16 overflow-y-auto mb-4 bg-black/50 p-2 rounded text-xs text-left font-mono text-green-400 border border-slate-800">
                            {logs.map((l, i) => <div key={i}>{`> ${l}`}</div>)}
                        </div>

                        <Button
                            onClick={handleChallenge}
                            disabled={isRolling}
                            className="w-full bg-red-700 hover:bg-red-600 font-bold"
                        >
                            {isRolling ? "Rolling..." : "Attempt to Break"}
                        </Button>
                        <Button onClick={onVictory} variant="ghost" className="w-full text-slate-700 text-xs mt-2 hover:bg-transparent hover:text-green-500">
                            DEBUG: Win
                        </Button>
                    </>
                ) : (
                    <p className="text-green-500 font-bold text-xl animate-pulse">The Shadow Fades...</p>
                )}
            </div>

            {/* Hand */}
            <div className="absolute bottom-4 left-0 right-0 p-4 z-20">
                <div className="flex gap-2 justify-center items-end h-32">
                    {hand.map((card) => {
                        const isPlayed = cardsPlayed.includes(card.id);
                        if (isPlayed) return null;

                        const affinity = currentBarrier ? getAffinityModifier(card.suit, currentBarrier.suit) : { value: 0, label: '-', color: '' };

                        return (
                            <motion.div
                                key={card.id}
                                whileHover={{ y: -20 }}
                                onClick={() => handlePlayCard(card.id)}
                                className="w-20 h-32 bg-slate-800 rounded border border-slate-600 cursor-pointer relative group"
                            >
                                <img src={card.image} className="w-full h-full object-cover rounded" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className={`font-bold ${affinity.color}`}>{affinity.value > 0 ? `+${affinity.value}` : '0'}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
