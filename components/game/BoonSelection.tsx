import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Boon } from './types';

// Placeholder Boons for MVP
const STARTING_BOONS: Boon[] = [
    {
        id: 'lantern',
        name: 'The Rusty Lantern',
        description: 'See one step further in the dark. (Reveals adjacent cards without moving)',
        effect: (s) => s // Implementation later
    },
    {
        id: 'flower',
        name: 'Dried White Rose',
        description: 'Restore 20 Resolve when consumed.',
        effect: (s) => ({ ...s, inventory: { ...s.inventory, dryFlowers: s.inventory.keys + 1 } }) // Logic fix later
    },
    {
        id: 'key',
        name: 'Skeleton Key',
        description: 'Unlock one sealed door or chest.',
        effect: (s) => ({ ...s, inventory: { ...s.inventory, keys: s.inventory.keys + 1 } })
    }
];

interface BoonSelectionProps {
    onSelectBoon: (boonId: string) => void;
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
                <h2 className="text-3xl font-serif text-amber-100 mb-4">Take a Gift</h2>
                <p className="text-slate-400 mb-12 text-center max-w-lg">
                    "The path is dark," Lily whispers, offering you three items from her bag.
                    "Choose one. It might help you find what you lost."
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {STARTING_BOONS.map((boon) => (
                        <motion.div
                            key={boon.id}
                            whileHover={{ y: -10, scale: 1.05 }}
                            className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl flex flex-col items-center text-center hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all cursor-pointer group"
                            onClick={() => onSelectBoon(boon.id)}
                        >
                            <div className="w-20 h-20 bg-black rounded-full mb-4 flex items-center justify-center border border-slate-600 group-hover:border-amber-400">
                                <span className="text-4xl">
                                    {boon.id === 'lantern' && '🏮'}
                                    {boon.id === 'flower' && '🥀'}
                                    {boon.id === 'key' && '🗝️'}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-amber-200 mb-2">{boon.name}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{boon.description}</p>
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
