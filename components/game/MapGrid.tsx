import React from 'react';
import { motion } from 'framer-motion';
import { Tile } from './types';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility, otherwise remove

interface MapGridProps {
    tiles: Tile[];
    activeTileId: string;
    onTileSelect: (id: string) => void;
}

export function MapGrid({ tiles, activeTileId, onTileSelect }: MapGridProps) {
    // Find the active tile to determine valid moves for highlighting
    const activeTile = tiles.find(t => t.id === activeTileId);
    const validMoves = activeTile ? activeTile.connectedTo : [];

    return (
        <div className="relative w-full aspect-square max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-black/40 backdrop-blur-sm border border-white/10 p-8">

            {/* 1. Connections Layer (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {tiles.map(source =>
                    source.connectedTo.map(targetId => {
                        const target = tiles.find(t => t.id === targetId);
                        if (!target) return null;

                        // Draw line from center to center (rough approx based on % positions)
                        // Note: This draws double lines (A->B and B->A), which is fine visually or can be optimized
                        return (
                            <line
                                key={`${source.id}-${targetId}`}
                                x1={`${source.position.x}%`}
                                y1={`${source.position.y}%`}
                                x2={`${target.position.x}%`}
                                y2={`${target.position.y}%`}
                                stroke="rgba(148, 163, 184, 0.2)" // Slate-400 with opacity
                                strokeWidth="2"
                                strokeDasharray="4,4"
                            />
                        );
                    })
                )}
            </svg>

            {/* 2. Nodes Layer */}
            {tiles.map((tile) => {
                const isCurrent = tile.id === activeTileId;
                const isReachable = validMoves.includes(tile.id);
                const isCompleted = tile.isCleared;

                return (
                    <motion.div
                        key={tile.id}
                        className={cn(
                            "absolute w-16 h-24 -ml-8 -mt-12 rounded-md border-2 shadow-lg flex items-center justify-center transition-all duration-300 z-10",
                            // Styling based on state
                            isCurrent ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-110 z-20" : "",
                            isReachable ? "cursor-pointer hover:scale-105 hover:border-white/50 border-slate-600" : "opacity-60 grayscale border-slate-800",
                            isCompleted ? "border-green-500/50 opacity-80" : ""
                        )}
                        style={{
                            left: `${tile.position.x}%`,
                            top: `${tile.position.y}%`
                        }}
                        onClick={() => isReachable && onTileSelect(tile.id)}
                        whileHover={isReachable ? { scale: 1.1 } : {}}
                    >
                        {/* Card Content - Face Up or Down */}
                        {tile.isFlipped ? (
                            <div className="w-full h-full rounded overflow-hidden relative group">
                                <img
                                    src={tile.cardContent.image}
                                    alt={tile.cardContent.name}
                                    className="w-full h-full object-cover"
                                />
                                {isCurrent && (
                                    <div className="absolute inset-0 bg-amber-500/20 animate-pulse pointer-events-none" />
                                )}
                            </div>
                        ) : (
                            // Face Down Card Back
                            <div className="w-full h-full bg-slate-900 bg-[url('/images/card-back.jpg')] bg-cover rounded flex items-center justify-center">
                                {/* Optional: Add a subtle question mark or symbol */}
                            </div>
                        )}

                        {/* Player Token */}
                        {isCurrent && (
                            <motion.div
                                layoutId="player-token"
                                className="absolute -top-4 w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 border-2 border-white shadow-xl z-30"
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
