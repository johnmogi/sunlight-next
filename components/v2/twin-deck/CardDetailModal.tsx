/**
 * Card Detail Modal - Full screen card view with ratings and comments
 */

'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import { CardRatingPicker } from './CardRatingPicker'
import { CardCommentSection } from '@/components/card-comment-section'

interface CardDetailModalProps {
    isOpen: boolean
    onClose: () => void
    card: {
        id: string
        name: string
        number: number
        image: string
        meaning: string
        type: string
    }
    deckType?: 'moonlight' | 'sunlight'
    messages: any
}

export function CardDetailModal({
    isOpen,
    onClose,
    card,
    deckType = 'sunlight',
    messages
}: CardDetailModalProps) {
    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', handleEsc)
            // Lock body scroll
            document.body.style.overflow = 'hidden'
        }

        return () => {
            window.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    const isDarkMode = deckType === 'moonlight'

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Scrollable Content - Two Column Layout */}
                            <div className="overflow-y-auto max-h-[90vh] overscroll-contain">
                                <div className="grid md:grid-cols-2 gap-0">
                                    {/* Left Column - Card Image (Full Height on Desktop) */}
                                    <div className="relative bg-gradient-to-br from-slate-900 to-purple-900 md:sticky md:top-0 md:h-[90vh]">
                                        {/* Deck Type Badge */}
                                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-black/50">
                                            {isDarkMode ? (
                                                <Moon className="w-5 h-5 text-purple-200" />
                                            ) : (
                                                <Sun className="w-5 h-5 text-amber-400" />
                                            )}
                                            <span className="text-white font-semibold text-sm">
                                                {isDarkMode ? 'Moonlight' : 'Sunlight'}
                                            </span>
                                        </div>

                                        {/* Card Number Badge */}
                                        <div className="absolute top-4 right-4 z-10 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                            <span className="text-white font-bold text-lg">{card.number}</span>
                                        </div>

                                        {/* Card Image Container - Centered and Properly Sized */}
                                        <div className="flex items-center justify-center p-8 h-full min-h-[60vh] md:min-h-[90vh]">
                                            <div className="relative w-full max-w-md aspect-[2/3]">
                                                <Image
                                                    src={`/images/cards/${card.image}`}
                                                    alt={card.name}
                                                    fill
                                                    className="object-contain rounded-xl shadow-2xl"
                                                    priority
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Card Info and Interactions */}
                                    <div className="p-6 md:p-8 space-y-6 bg-white dark:bg-gray-900">
                                        {/* Card Title */}
                                        <div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                                                {card.name}
                                            </h2>
                                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                                {card.meaning}
                                            </p>
                                        </div>

                                        {/* Ratings Section */}
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                                How does this card resonate with you?
                                            </h3>
                                            <CardRatingPicker cardId={card.id} />
                                        </div>

                                        {/* Comments Section */}
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                                Discussion
                                            </h3>
                                            <CardCommentSection
                                                cardId={card.id}
                                                cardName={card.name}
                                                isExpanded={true}
                                                onToggle={() => { }}
                                                messages={messages}
                                            />
                                        </div>

                                        {/* Additional Card Info */}
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                                Interpretation
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {/* TODO: Add detailed card interpretation */}
                                                This card represents {card.meaning.toLowerCase()}.
                                                In a reading, it invites you to explore the depths of its meaning
                                                and how it resonates with your current journey.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
