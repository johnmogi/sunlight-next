/**
 * Major Arcana Gallery - Interactive display with swipeable cards
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DUAL_PATH_CARDS } from '@/lib/card-sets/set-dual-path'
import { CardRatingPicker } from './CardRatingPicker'
import { CardDetailModal } from './CardDetailModal'
import { CardCommentSection } from '@/components/card-comment-section'
import { SwipeableCard } from './SwipeableCard'

export function MajorArcanaGallery() {
    // Filter for major arcana only (type === 'major')
    const majorArcana = DUAL_PATH_CARDS.filter(card => card.type === 'major')

    // Modal state
    const [selectedCard, setSelectedCard] = useState<typeof majorArcana[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Expanded comments state for each card
    const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({})

    const handleCardClick = (card: typeof majorArcana[0]) => {
        setSelectedCard(card)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedCard(null), 300)
    }

    const toggleComments = (cardId: string) => {
        setExpandedComments(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }))
    }

    // Mock messages for comments (TODO: get from i18n)
    const messages = {
        cardDetail: {
            noComments: 'No comments yet. Be the first!',
            yourName: 'Your name',
            yourComment: 'Add a comment...',
            postComment: 'Post Comment'
        }
    }

    return (
        <>
            <section className="relative w-full py-16 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
                {/* Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            The Major Arcana
                        </h2>
                        <p className="text-lg md:text-xl text-purple-200 max-w-3xl mx-auto">
                            Drag each card to reveal both Moonlight and Sunlight paths. Click for full details.
                        </p>
                    </motion.div>
                </div>

                {/* Card Grid - More Compact: 4 columns */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {majorArcana.map((card, index) => {
                            const isCommentsExpanded = expandedComments[card.id]

                            return (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                    className="space-y-3"
                                >
                                    {/* Swipeable Card */}
                                    <SwipeableCard
                                        cardId={card.id}
                                        cardNumber={card.number}
                                        cardName={card.name}
                                        cardMeaning={card.meaning}
                                        moonlightImage={card.moonlightImage}
                                        sunlightImage={card.sunlightImage}
                                        onCardClick={() => handleCardClick(card)}
                                    />

                                    {/* Ratings - Below Card */}
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
                                        <CardRatingPicker
                                            cardId={card.id}
                                            compact={true}
                                        />
                                    </div>

                                    {/* Comments Section - Inline */}
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
                                        <CardCommentSection
                                            cardId={card.id}
                                            cardName={card.name}
                                            isExpanded={isCommentsExpanded}
                                            onToggle={() => toggleComments(card.id)}
                                            messages={messages}
                                        />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Bottom decoration */}
                <div className="mt-12 flex justify-center">
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
                </div>
            </section>

            {/* Card Detail Modal */}
            {selectedCard && (
                <CardDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    card={selectedCard}
                    deckType="moonlight"
                    messages={messages}
                />
            )}
        </>
    )
}
