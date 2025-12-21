import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GAME_CONFIG } from './gameConfig';

interface DiceD10Props {
    onRollComplete: (result: number) => void;
    triggerRoll: () => number; // Function to get the result immediately for animation
}

export function DiceD10({ onRollComplete, triggerRoll }: DiceD10Props) {
    const [result, setResult] = useState<number | null>(null);
    const [isRolling, setIsRolling] = useState(true);

    useEffect(() => {
        // Start roll sequence
        const finalResult = triggerRoll();

        // "Spin" animation logic (fake numbers)
        let count = 0;
        const interval = setInterval(() => {
            setResult(Math.floor(Math.random() * 10) + 1);
            count++;
            if (count > 15) { // Stop after 15 ticks (~1.5s)
                clearInterval(interval);
                setResult(finalResult);
                setIsRolling(false);

                // Wait a moment before completing
                setTimeout(() => {
                    onRollComplete(finalResult);
                }, 1000);
            }
        }, 80);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0, rotate: 360 }}
                animate={{ scale: 1, rotate: 0 }}
                className="flex flex-col items-center justify-center"
            >
                <div className="relative w-48 h-48">
                    {/* D10 Shape (CSS/SVG) */}
                    <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-[0_0_30px_rgba(251,191,36,0.6)] ${isRolling ? 'animate-pulse' : ''}`}>
                        <polygon points="50,5 90,50 50,95 10,50" fill={isRolling ? "#1e293b" : "#451a03"} stroke="#f59e0b" strokeWidth="2" />
                        <line x1="50" y1="5" x2="50" y2="95" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
                        <line x1="10" y1="50" x2="90" y2="50" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
                    </svg>

                    {/* Number */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-6xl font-bold font-serif ${isRolling ? 'text-slate-400' : 'text-amber-100'}`}>
                            {result || "?"}
                        </span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <h2 className="text-2xl font-serif text-amber-100 tracking-widest">FATE ROLL</h2>
                    {!isRolling && (
                        <p className="text-amber-400 font-mono mt-2">
                            {result! <= 4 && GAME_CONFIG.text.events.combat}
                            {result! >= 5 && result! <= 7 && GAME_CONFIG.text.events.trap}
                            {result! >= 8 && GAME_CONFIG.text.events.treasure}
                        </p>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
