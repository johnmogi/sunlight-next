'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Settings, LogOut, Play, Swords } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { TAROT_CARDS } from '@/lib/card-sets/set-update129'

export default function GameCanvas() {
    const t = useTranslations('game')
    type GameState = 'LOADING' | 'MENU' | 'INTRO' | 'CHARACTER_SELECT' | 'MAP' | 'EVENT' | 'COMBAT' | 'BOSS' | 'VICTORY' | 'GAME_OVER'
    const [gameState, setGameState] = useState<GameState>('LOADING')
    const [musicEnabled, setMusicEnabled] = useState(true)
    const [activeNode, setActiveNode] = useState(0)
    const [encounterCard, setEncounterCard] = useState<typeof TAROT_CARDS[0] | null>(null)

    // Node Graph Definition
    const nodes = [
        { id: 0, x: 50, y: 80, connections: [1, 2], status: 'completed' }, // Start
        { id: 1, x: 30, y: 60, connections: [3], status: 'locked' },
        { id: 2, x: 70, y: 60, connections: [4], status: 'locked' },
        { id: 3, x: 20, y: 40, connections: [5], status: 'locked' },
        { id: 4, x: 80, y: 40, connections: [5], status: 'locked' },
        { id: 5, x: 50, y: 20, connections: [], status: 'locked' }, // Boss/Goal
    ]

    const selectNode = (nodeId: number) => {
        setActiveNode(nodeId)
        // Pick random card for event
        const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)]
        setEncounterCard(randomCard)
        setGameState('EVENT')
    }

    // Simulation of asset loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setGameState('MENU')
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    const startGame = () => {
        setGameState('INTRO')
    }

    return (
        <div className="fixed inset-0 w-full h-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center overflow-hidden font-sans select-none z-50">
            <AnimatePresence mode="wait">

                {/* LOADING STATE */}
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
                                    onClick={startGame}
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
                            <p className="absolute bottom-8 text-slate-500 text-xs">MVP v0.2.1 - Hidden Garden Build</p>
                        </div>
                    </motion.div>
                )}

                {/* INTRO STATE - Scrolling Story */}
                {gameState === 'INTRO' && (
                    <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center w-full h-full bg-[url('/images/about/hgintro.jpg')] bg-cover bg-center relative px-6 overflow-hidden">
                        <div className="absolute inset-0 bg-black/80 z-0" />

                        <div className="z-10 h-3/4 w-full max-w-2xl overflow-y-auto pr-4 scrollbar-hide flex flex-col items-center text-center relative mask-image-gradient">
                            <motion.div
                                initial={{ y: 300 }}
                                animate={{ y: -100 }}
                                transition={{ duration: 15, ease: "linear" }}
                                className="flex flex-col gap-12 pt-20 pb-20"
                            >
                                <p className="text-2xl text-amber-100 font-serif leading-relaxed opacity-90">
                                    "You opened up a book..."
                                </p>
                                <p className="text-xl text-slate-300 font-serif leading-relaxed">
                                    The pages smell of old earth and rain. The ink shimmers, alive.
                                </p>
                                <p className="text-xl text-slate-300 font-serif leading-relaxed">
                                    "I welcome you."
                                </p>
                                <div className="text-slate-500 italic text-sm mt-8 animate-pulse">
                                    Lily is flipping through her diary...
                                </div>
                            </motion.div>
                        </div>

                        <div className="z-20 absolute bottom-12 w-full max-w-md">
                            <Button onClick={() => setGameState('CHARACTER_SELECT')} size="lg" className="bg-amber-600 hover:bg-amber-500 w-full shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                                Enter the Dream
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* CHARACTER SELECT STATE */}
                {gameState === 'CHARACTER_SELECT' && (
                    <motion.div key="char_select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center w-full h-full bg-[url('/images/about/hgcharacterselect.jpg')] bg-cover bg-center relative">
                        <div className="absolute inset-0 bg-black/60 z-0" />
                        <div className="z-10 flex flex-col items-center w-full max-w-6xl px-4">
                            <h2 className="text-4xl text-slate-100 mb-12 font-bold drop-shadow-lg">Choose Your Vessel</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full">
                                {['The Daydreamer', 'The Magician', 'The High Priestess'].map((char, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05, y: -10 }}
                                        className="w-full aspect-[2/3] bg-slate-800/80 border-2 border-slate-600 rounded-xl flex flex-col items-center justify-center hover:border-amber-400 cursor-pointer transition-all shadow-2xl relative overflow-hidden group"
                                        onClick={() => setGameState('MAP')}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                        <span className="text-2xl font-bold text-amber-100 relative z-10 font-serif">{char}</span>
                                        <p className="text-xs text-slate-400 mt-2 relative z-10 group-hover:text-amber-300">Click to Select</p>
                                    </motion.div>
                                ))}
                            </div>
                            <Button variant="ghost" onClick={() => setGameState('MENU')} className="text-slate-400 hover:text-white z-10">Back to Menu</Button>
                        </div>
                    </motion.div>
                )}

                {/* MAP STATE - Refined Node Graph */}
                {gameState === 'MAP' && (
                    <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full h-full p-4 bg-[url('/images/about/hggameplay.jpg')] bg-cover bg-center relative">
                        <div className="absolute inset-0 bg-slate-950/80 z-0" />

                        <div className="z-10 w-full max-w-5xl h-full flex flex-col items-center justify-center">
                            <h2 className="text-2xl text-slate-300 mb-8 font-serif tracking-widest uppercase">The Garden Map</h2>

                            <div className="relative w-full aspect-video bg-black/40 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden p-8">
                                {/* Connections */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    {nodes.map(node =>
                                        node.connections.map(targetId => {
                                            const target = nodes.find(n => n.id === targetId)
                                            if (!target) return null
                                            return (
                                                <line
                                                    key={`${node.id}-${targetId}`}
                                                    x1={`${node.x}%`} y1={`${node.y}%`}
                                                    x2={`${target.x}%`} y2={`${target.y}%`}
                                                    stroke="#94a3b8"
                                                    strokeWidth="2"
                                                    strokeDasharray="5,5"
                                                    className="opacity-50"
                                                />
                                            )
                                        })
                                    )}
                                </svg>

                                {/* Nodes */}
                                {nodes.map((node) => (
                                    <motion.div
                                        key={node.id}
                                        className={`absolute w-16 h-24 -ml-8 -mt-12 rounded-md border-2 shadow-lg cursor-pointer transition-all flex items-center justify-center
                                            ${node.id === 5 ? 'border-red-500 bg-red-950/80' : 'border-slate-600 bg-slate-800/80 hover:border-amber-400 hover:scale-110'}
                                         `}
                                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                        onClick={() => selectNode(node.id)}
                                    >
                                        {node.id === 5 ? <span className="text-2xl">💀</span> : <div className="w-full h-full bg-[url('/images/about/hgcard.jpg')] bg-cover opacity-60" />}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 flex gap-4">
                                <Button variant="outline" onClick={() => setGameState('MENU')} className="bg-black/50 text-slate-300 border-slate-700">Menu</Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* EVENT STATE - Real Card Integration */}
                {gameState === 'EVENT' && (
                    <motion.div key="event" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center w-full h-full bg-slate-950 relative">
                        <div className="absolute inset-0 bg-[url('/images/about/hggameplay2.jpg')] bg-cover bg-center opacity-20" />
                        <h2 className="text-3xl text-purple-300 mb-8 font-serif z-10">Event Encounter</h2>

                        <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                                initial={{ rotateY: 90 }}
                                animate={{ rotateY: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-64 h-96 bg-slate-800 border-4 border-purple-500/50 rounded-xl mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden"
                            >
                                {encounterCard ? (
                                    <img src={encounterCard.image} alt={encounterCard.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-black flex items-center justify-center text-slate-600">Loading...</div>
                                )}
                            </motion.div>

                            <h3 className="text-2xl text-amber-200 mb-2 font-bold">{encounterCard?.name}</h3>
                            <p className="text-slate-300 text-sm max-w-md text-center italic mb-8 px-4 bg-black/50 p-2 rounded">
                                {encounterCard?.meaning}
                            </p>

                            <div className="flex items-center gap-4 bg-black/60 p-4 rounded-lg border border-white/10 backdrop-blur-md">
                                <span className="text-slate-400 uppercase text-xs font-bold">Challenge</span>
                                <div className="w-12 h-12 bg-white text-black rounded font-bold text-2xl flex items-center justify-center shadow-lg">4</div>
                                <span className="text-slate-500">vs</span>
                                <motion.div
                                    className="w-12 h-12 bg-amber-500 text-black rounded font-bold text-2xl flex items-center justify-center shadow-lg"
                                    animate={{ rotate: [0, 10, -10, 10, 0], y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    ?
                                </motion.div>
                            </div>

                            <Button onClick={() => setGameState('COMBAT')} size="lg" className="bg-purple-600 hover:bg-purple-500 text-white min-w-[200px] mt-8 shadow-xl">
                                Roll Dice (1d6)
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* COMBAT/DISCUSSION STATE */}
                {gameState === 'COMBAT' && (
                    <motion.div key="combat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center justify-center bg-[url('/images/about/hgcombat.jpg')] bg-cover bg-center relative">
                        <div className="absolute inset-0 bg-black/80 z-0" />

                        <div className="z-10 w-full max-w-5xl px-8 flex flex-col items-center">
                            <h2 className="text-4xl text-blue-400 mb-12 font-black tracking-[0.2em] drop-shadow-lg">DISCUSSION</h2>

                            <div className="flex justify-between w-full mb-16 items-center">
                                {/* Player */}
                                <div className="text-center group relative">
                                    <div className="w-40 h-56 bg-amber-900/80 rounded-lg mb-6 border-2 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('/images/about/hgacecards1.jpg')] bg-cover opacity-60" />
                                    </div>
                                    <p className="text-amber-100 font-bold text-xl mb-2">Daydreamer</p>
                                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-600"><div className="bg-blue-500 h-full w-3/4 shadow-[0_0_10px_#3b82f6]"></div></div>
                                    <span className="text-blue-400 text-sm mt-1 block">75% Lucidity</span>
                                </div>

                                {/* VS */}
                                <div className="text-2xl font-bold text-slate-500 italic">discussing with</div>

                                {/* Enemy */}
                                <div className="text-center relative">
                                    <div className="w-40 h-56 bg-slate-900/80 rounded-lg mb-6 border-2 border-slate-500/50 shadow-[0_0_30px_rgba(100,116,139,0.2)] flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-[url('/images/about/hgcombat3.jpg')] bg-cover opacity-80 mix-blend-overlay" />
                                        <span className="text-6xl z-10">👤</span>
                                    </div>
                                    <p className="text-slate-200 font-bold text-xl mb-2">Lost Soul</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <Button onClick={() => setGameState('BOSS')} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30 text-white px-8 py-6 text-xl shadow-lg transform hover:scale-105 transition-all">
                                    <span className="mr-2">🗣️</span> Discuss
                                </Button>
                                <Button onClick={() => setGameState('MAP')} variant="outline" size="lg" className="bg-transparent border-slate-600 text-slate-400 hover:bg-slate-800 py-6">
                                    Wake Up
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* BOSS STATE */}
                {gameState === 'BOSS' && (
                    <motion.div key="boss" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                        <h2 className="text-5xl text-red-600 font-black mb-8 uppercase drop-shadow-[0_0_25px_rgba(220,38,38,0.8)]">FINAL BOSS</h2>
                        <div className="w-64 h-64 bg-black border-4 border-red-600 rounded-full mx-auto mb-8 flex items-center justify-center animate-pulse">
                            <span className="text-6xl">💀</span>
                        </div>
                        <Button onClick={() => setGameState('VICTORY')} size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xl px-12 py-6">
                            Defeat the Darkness
                        </Button>
                    </motion.div>
                )}

                {/* VICTORY STATE */}
                {gameState === 'VICTORY' && (
                    <motion.div key="victory" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                        <h2 className="text-6xl text-yellow-400 font-bold mb-6">VICTORY!</h2>
                        <p className="text-2xl text-slate-300 mb-12">The Garden has been restored.</p>
                        <Button onClick={() => setGameState('MENU')} size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
                            Return to Menu
                        </Button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )
}
