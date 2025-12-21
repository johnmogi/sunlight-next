import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Artifact } from './types';

// Garden Artifacts
const ARTIFACTS: Artifact[] = [
    {
        id: 'mask',
        name: 'The Golden Mask',
        description: 'Start every debate with +1 Focus. (Pharaoh\'s Sight)',
        effect: (s) => ({ ...s, maxFocus: s.maxFocus + 1, focus: s.maxFocus + 1 })
    },
    {
        id: 'butterfly',
        name: 'The Blue Butterfly',
        description: 'Once per encounter, reshuffle your hand. (Transformation)',
        effect: (s) => s // Handled in EncounterView
    },
    {
        id: 'thorn',
        name: 'The Obsidian Thorn',
        description: 'Whenever you take Lucidity damage, deal 3 Clarity back. (Pain brings Focus)',
        effect: (s) => s // Handled in EncounterView
    }
];

interface BoonSelectionProps {
    onSelectBoon: (artifactId: string) => void;
}

export function BoonSelection({ onSelectBoon }: BoonSelectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center w-full h-full p-8 bg-[url('/images/about/hgintro.jpg')] bg-cover bg-center relative"
        >
            <div className="absolute inset-0 bg-black/80 z-0" />

            <div className="z-10 w-full max-w-4xl flex flex-col items-center">
                <h2 className="text-3xl font-serif text-amber-100 mb-4">Choose an Artifact</h2>
                <p className="text-slate-400 mb-12 text-center max-w-lg">
                    "Take this. It is a piece of the sunlight you remember."
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {ARTIFACTS.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -10, scale: 1.05 }}
                            className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl flex flex-col items-center text-center hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all cursor-pointer group"
                            onClick={() => onSelectBoon(item.id)}
                        >
                            <div className="w-20 h-20 bg-black rounded-full mb-4 flex items-center justify-center border border-slate-600 group-hover:border-amber-400">
                                <span className="text-4xl">
                                    {item.id === 'mask' && '🎭'}
                                    {item.id === 'butterfly' && '🦋'}
                                    {item.id === 'thorn' && '🌹'}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-amber-200 mb-2">{item.name}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                            <Button variant="ghost" className="mt-6 text-amber-500 hover:text-amber-400 hover:bg-amber-950/30 w-full">
                                Accept Gift
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
