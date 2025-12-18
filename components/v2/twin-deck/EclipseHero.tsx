/**
 * Eclipse Hero - Twin Deck System
 * FULL HERO SWIPE: The entire hero section reveals Moonlight vs Sunlight
 */

'use client'

import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function EclipseHero() {
    const [revealPosition, setRevealPosition] = useState(50) // Start at 50% reveal
    const [isDragging, setIsDragging] = useState(false) // Track if user is actively dragging
    const controls = useAnimation()

    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        setIsDragging(true)
        const section = e.currentTarget
        const rect = section.getBoundingClientRect()

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const x = moveEvent.clientX - rect.left
            const percentage = (x / rect.width) * 100
            setRevealPosition(Math.max(0, Math.min(100, percentage)))
        }

        const handleMouseUp = () => {
            setIsDragging(false)
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    // Click handlers to snap with visible margins (5% desktop, 2% mobile)
    const snapToMoonlight = () => {
        // 95% = almost full Moonlight but slider still visible
        setRevealPosition(95)
    }

    const snapToSunlight = () => {
        // 5% = almost full Sunlight but slider still visible
        setRevealPosition(5)
    }

    return (
        <section
            className="relative w-full h-screen -mt-16 overflow-hidden select-none"
            style={{ cursor: isDragging ? 'ew-resize' : 'default' }}
            onMouseDown={handleMouseDown}
        >
            {/* SUNLIGHT HERO (Right/Background) - Full Hero with Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/images/about/hggamplay1.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />

                {/* Stronger dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-orange-800/50 to-yellow-900/60" />

                {/* Sun Rays Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(251,191,36,0.3)_50%,_transparent_100%)]" />
                </div>

                {/* Sunlight Content - Hide when Moonlight is dominant (> 60%) */}
                <div
                    className="relative z-10 flex flex-col items-center justify-center h-full px-4 transition-opacity duration-300"
                    style={{ opacity: revealPosition > 60 ? 0 : 1 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Sun className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-2xl mb-8" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-full text-4xl sm:text-5xl md:text-7xl font-bold text-center drop-shadow-2xl mb-6 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl max-w-4xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(254, 243, 199, 0.85) 100%)',
                            backdropFilter: 'blur(12px)',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
                            color: '#1f2937' // Dark gray text
                        }}
                    >
                        The Sunlight Path
                    </motion.h1>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="w-full text-xl md:text-3xl text-center max-w-3xl drop-shadow-lg font-light px-6 py-3 rounded-xl"
                        style={{
                            background: 'rgba(254, 249, 195, 0.75)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(251, 191, 36, 0.4)',
                            color: '#92400e' // Dark amber text
                        }}
                    >
                        Active • Projective • The Answer • The Cure
                    </motion.p>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="w-full text-lg md:text-xl text-center max-w-2xl mt-6 px-6 py-3 rounded-lg"
                        style={{
                            background: 'rgba(254, 252, 232, 0.7)',
                            backdropFilter: 'blur(6px)',
                            color: '#78350f' // Dark amber-900 text
                        }}
                    >
                        "The light that transforms what is into what can be"
                    </motion.p>
                </div>
            </div>

            {/* MOONLIGHT HERO (Left/Foreground) - Clipped Reveal with Image */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - revealPosition}% 0 0)` }}
            >
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900 via-purple-800 to-slate-900">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/images/about/gardencard1.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />

                    {/* Stronger dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-purple-900/60 to-slate-900/70" />

                    {/* Stars Pattern */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
                        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>

                    {/* Moonlight Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.3)_0%,_transparent_70%)]" />

                    {/* Moonlight Content - Hide when Sunlight is dominant (< 40%) */}
                    <div
                        className="relative z-10 flex flex-col items-center justify-center h-full px-4 transition-opacity duration-300"
                        style={{ opacity: revealPosition < 40 ? 0 : 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Moon className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-2xl mb-8" />
                        </motion.div>

                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="w-full text-4xl sm:text-5xl md:text-7xl font-bold text-center text-white drop-shadow-2xl mb-6 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl max-w-4xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.75) 0%, rgba(99, 102, 241, 0.65) 100%)',
                                backdropFilter: 'blur(12px)',
                                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.6)'
                            }}
                        >
                            The Moonlight Path
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="w-full text-xl md:text-3xl text-center text-white max-w-3xl drop-shadow-lg font-light px-6 py-3 rounded-xl"
                            style={{
                                background: 'rgba(88, 28, 135, 0.6)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(167, 139, 250, 0.3)'
                            }}
                        >
                            Receptive • Reflective • The Question • The Wound
                        </motion.p>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="w-full text-lg md:text-xl text-center text-white max-w-2xl mt-6 px-6 py-3 rounded-lg"
                            style={{
                                background: 'rgba(55, 48, 163, 0.5)',
                                backdropFilter: 'blur(6px)'
                            }}
                        >
                            "The vessel that holds the shadow before the light arrives"
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Center Divider Line with Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-40 pointer-events-none"
                style={{ left: `${revealPosition}%` }}
            >
                {/* Drag Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-gray-200 pointer-events-auto">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                        </svg>
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Instruction Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 text-center"
            >
                <p className="text-white text-sm md:text-base drop-shadow-lg font-semibold">
                    ← Drag to reveal the dual path →
                </p>
            </motion.div>

            {/* Side Labels - NOW CLICKABLE */}
            <button
                onClick={snapToMoonlight}
                className="absolute bottom-8 left-8 z-40 flex items-center gap-2 bg-indigo-900/90 backdrop-blur-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-800 transition-colors duration-200 hover:scale-105 transform"
            >
                <Moon className="w-5 h-5 text-purple-200" />
                <span className="text-white font-semibold">Moonlight</span>
            </button>

            <button
                onClick={snapToSunlight}
                className="absolute bottom-8 right-8 z-40 flex items-center gap-2 bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-amber-600 transition-colors duration-200 hover:scale-105 transform"
            >
                <Sun className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Sunlight</span>
            </button>
        </section>
    )
}
