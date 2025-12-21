'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Settings, LogOut, Play } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useGameEngine } from './hooks/useGameEngine'
import { MapGrid } from './MapGrid'
import { BoonSelection } from './BoonSelection'
import { EncounterView } from './EncounterView'
import { BossSequence } from './BossSequence'

export default function GameCanvas() {
    const t = useTranslations('game')

    // Use the new Game Engine Hook
    const { gameState, setGameState, player, tiles, activeEncounter, actions } = useGameEngine()
    const [musicEnabled, setMusicEnabled] = useState(true)

    // Handlers
    const handleStart = () => {
        setGameState('INTRO')
    }

    // Initialize Game State (Fake Loading)
    useEffect(() => {
        if (gameState === 'LOADING') {
            const timer = setTimeout(() => {
                setGameState('MENU')
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [gameState, setGameState])

    const [selectedArchetype, setSelectedArchetype] = useState<string>('The Daydreamer');

    const handleIntroComplete = () => {
        setGameState('CHARACTER_SELECT')
    }

    const handleCharacterSelect = (archetype: string) => {
        setSelectedArchetype(archetype);
        setGameState('BOON_SELECT')
    }

    const handleBoonSelect = (boonId: string) => {
        actions.initializeGame(selectedArchetype, boonId)
    }

    const handleTileSelect = (tileId: string) => {
        actions.moveToTile(tileId)
    }

    return (
        <div className="fixed inset-0 w-full h-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center overflow-hidden font-sans select-none z-50">
            <AnimatePresence mode="wait">

                {/* LOADING STATE - Just a quick spinner before menu */}
                {gameState === 'LOADING' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="w-16 h-16 border-4 border-slate-700 border-t-amber-400 rounded-full animate-spin" />
                        <p className="text-slate-400 text-sm tracking-widest uppercase animate-pulse">{t('loading')}</p>
                    </motion.div>
                )}

                {/* MENU STATE */}
                {gameState === 'MENU' && (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="flex flex-col items-center gap-8 z-10 w-full h-full justify-center bg-[url('/images/about/hgsplash.jpg')] bg-cover bg-center relative"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

                        <div className="z-10 flex flex-col items-center">
                            <h1 className="text-6xl font-bold bg-gradient-to-br from-amber-100 to-amber-600 bg-clip-text text-transparent filter drop-shadow-lg mb-8">
                                THE HIDDEN GARDEN
                            </h1>

                            <div className="flex flex-col gap-4 w-64">
                                <Button
                                    onClick={handleStart}
                                    className="w-full h-12 text-lg bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)] border border-amber-400/30"
                                >
                                    <Play className="w-5 h-5 mr-2" /> {t('start')}
                                </Button>

                                <Button variant="outline" className="w-full h-12 border-slate-700 text-slate-400 cursor-not-allowed bg-black/50">
                                    Load Game (Coming Soon)
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => setMusicEnabled(!musicEnabled)}
                                    className="w-full h-12 text-lg border-slate-700 hover:bg-slate-800 text-slate-300 bg-black/50"
                                >
                                    <Settings className="w-5 h-5 mr-2" /> {musicEnabled ? 'Music: ON' : 'Music: OFF'}
                                </Button>

                                <Button
                                    variant="ghost"
                                    className="w-full h-12 text-slate-400 hover:text-red-400 hover:bg-red-950/20"
                                    onClick={() => window.location.href = '/'}
                                >
                                    <LogOut className="w-5 h-5 mr-2" /> {t('exit')}
                                </Button>
                            </div>
                            <p className="absolute bottom-8 text-slate-500 text-xs">MVP v0.3.0 - Floral Roguelike Build</p>
                        </div>
                    </motion.div>
                )}

                {/* INTRO STATE - Narrative by Lily */}
                {gameState === 'INTRO' && (
                    <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center w-full h-full bg-[url('/images/about/hgintro.jpg')] bg-cover bg-center relative px-6 overflow-hidden">
                        <div className="absolute inset-0 bg-black/80 z-0" />

                        <div className="z-10 h-3/4 w-full max-w-2xl overflow-y-auto pr-4 scrollbar-hide flex flex-col items-center text-center relative mask-image-gradient">
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="flex flex-col gap-8 pt-20"
                            >
                                <p className="text-2xl text-amber-100 font-serif leading-relaxed italic opacity-90">
                                    "I used to think I had to be strong. Wise. Together."
                                </p>
                                <p className="text-xl text-slate-300 font-serif leading-relaxed">
                                    The voice is soft, echoing from a lantern held by a hooded figure.
                                </p>
                                <p className="text-xl text-slate-300 font-serif leading-relaxed">
                                    "But the garden isn't built on perfection. It grows from the rain, the mud, the parts of us we actuallly try to hide."
                                </p>
                                <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-lg mt-8">
                                    <p className="text-amber-500 font-semibold mb-2">Lily (The Guide)</p>
                                    <p className="text-slate-400 italic text-sm">
                                        "I'm not here to fix you. You aren't broken. I'm just here to hold the light while you walk."
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="z-20 absolute bottom-12 w-full max-w-md">
                            <Button onClick={handleIntroComplete} size="lg" className="bg-amber-600 hover:bg-amber-500 w-full shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                                Take the Lantern
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* CHARACTER SELECT STATE */}
                {gameState === 'CHARACTER_SELECT' && (
                    <motion.div key="char_select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center w-full h-full bg-[url('/images/about/hgcharacterselect.jpg')] bg-cover bg-center relative">
                        <div className="absolute inset-0 bg-black/70 z-0" />
                        <div className="z-10 flex flex-col items-center w-full max-w-6xl px-4">
                            <h2 className="text-4xl text-slate-100 mb-8 font-serif">Who are you in this dream?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full">
                                {['The Daydreamer', 'The Architect', 'The Weaver'].map((char, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05, y: -10 }}
                                        className="w-full aspect-[2/3] bg-slate-800/80 border-2 border-slate-600 rounded-xl flex flex-col items-center justify-center hover:border-amber-400 cursor-pointer transition-all shadow-2xl relative overflow-hidden group"
                                        onClick={() => handleCharacterSelect(char)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                        <span className="text-2xl font-bold text-amber-100 relative z-10 font-serif">{char}</span>
                                        <p className="text-xs text-slate-400 mt-2 relative z-10 group-hover:text-amber-300">Select Archetype</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* BOON SELECT STATE */}
                {gameState === 'BOON_SELECT' && (
                    <BoonSelection key="boon" onSelectBoon={handleBoonSelect} />
                )}

                {/* BOSS STATE */}
                {gameState === 'BOSS' && (
                    <BossSequence
                        playerResolve={player.resolve}
                        hand={player.hand}
                        onVictory={() => setGameState('VICTORY')}
                        onDefeat={() => {
                            // Simple loop back for MVP
                            alert("The shadow overpowers you. Try again.");
                        }}
                    />
                )}

                {/* MAP STATE */}
                {gameState === 'MAP' && (
                    <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full h-full p-4 bg-[url('/images/about/hggameplay.jpg')] bg-cover bg-center relative">
                        <div className="absolute inset-0 bg-slate-950/90 z-0" />

                        <div className="z-10 w-full max-w-5xl h-full flex flex-col items-center justify-center">
                            <div className="flex justify-between w-full max-w-2xl mb-6 items-end">
                                <div>
                                    <h2 className="text-2xl text-amber-100 font-serif">The Maze of Reality</h2>
                                    <p className="text-slate-500 text-sm">Explore adjacent cards to find the connection.</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-blue-400 font-bold">Resilience: {player.resolve}%</p>
                                    <p className="text-slate-500 text-xs">Current Logic: {player.stats.logic}</p>
                                </div>
                            </div>

                            {/* THE GRAPH MAP */}
                            <MapGrid
                                tiles={tiles}
                                activeTileId={player.currentTileId}
                                onTileSelect={handleTileSelect}
                            />

                            <div className="mt-8 flex gap-4">
                                <Button variant="outline" onClick={() => setGameState('MENU')} className="bg-black/50 text-slate-300 border-slate-700">Pause Game</Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ENCOUNTER STATE - Dice & Hand Mechanic */}
                {gameState === 'ENCOUNTER' && activeEncounter && (
                    <EncounterView
                        encounter={activeEncounter}
                        hand={player.hand}
                        onResolve={actions.resolveEncounter}
                        key="encounter-view"
                    />
                )}

            </AnimatePresence>
        </div>
    )
}
