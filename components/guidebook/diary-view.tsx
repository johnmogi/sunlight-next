"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TAROT_CARDS } from "@/lib/card-sets/set-update129"

export function DiaryView() {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const currentCard = TAROT_CARDS[currentIndex]

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % TAROT_CARDS.length)
    }

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + TAROT_CARDS.length) % TAROT_CARDS.length)
    }

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
                <header className="mb-12 text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
                        <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                        Lily's Guide to Dreaming
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto">
                        "A field guide to the soul's internal biology."
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Card Visual Side */}
                    <div className="relative aspect-[3/4] md:aspect-[2/3] w-full max-w-sm mx-auto perspective-1000">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentCard.id}
                                initial={{ opacity: 0, rotateY: 15, x: 20 }}
                                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                                exit={{ opacity: 0, rotateY: -15, x: -20 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white dark:border-slate-800 bg-white"
                            >
                                <Image
                                    src={currentCard.image}
                                    alt={currentCard.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Paper texture overlay effect */}
                        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-10 bg-[url('/images/paper-texture.jpg')]"></div>
                    </div>

                    {/* Narrative Side */}
                    <div className="space-y-8 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentCard.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <div>
                                    <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-500 font-bold mb-2 block">
                                        Vol 0.1 • Entry #{currentIndex}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                                        {currentCard.name}
                                    </h2>
                                    <div className="h-1 w-20 bg-amber-500 rounded-full"></div>
                                </div>

                                <div className="prose prose-lg dark:prose-invert font-serif leading-relaxed text-slate-600 dark:text-slate-300">
                                    <p>
                                        {currentCard.meaning}
                                    </p>
                                    <blockquote className="border-l-4 border-amber-300 pl-4 italic my-4 text-slate-700 dark:text-slate-200 bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-r-lg">
                                        {currentCard.visualDesc}
                                    </blockquote>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={prevCard}
                                className="rounded-full px-6 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Previous
                            </Button>
                            <div className="text-sm font-medium text-muted-foreground w-16 text-center">
                                {currentIndex + 1} / {TAROT_CARDS.length}
                            </div>
                            <Button
                                variant="default"
                                size="lg"
                                onClick={nextCard}
                                className="rounded-full px-6 bg-amber-600 hover:bg-amber-700 text-white"
                            >
                                Next
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
