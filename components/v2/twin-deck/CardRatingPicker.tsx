/**
 * Card Rating Picker - Circular reaction buttons
 * Facebook-style reactions for tarot cards
 */

'use client'

import React, { useState } from 'react'
import { Heart, ThumbsUp, Star, Frown, Flame } from 'lucide-react'
import { motion } from 'framer-motion'

export type ReactionType = 'love' | 'like' | 'wow' | 'sad' | 'fire'

interface Reaction {
    type: ReactionType
    icon: React.ReactNode
    color: string
    hoverColor: string
}

const REACTIONS: Reaction[] = [
    {
        type: 'love',
        icon: <Heart className="w-4 h-4" />,
        color: 'text-pink-500',
        hoverColor: 'hover:bg-pink-100 dark:hover:bg-pink-900/30'
    },
    {
        type: 'like',
        icon: <ThumbsUp className="w-4 h-4" />,
        color: 'text-blue-500',
        hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
    },
    {
        type: 'wow',
        icon: <Star className="w-4 h-4" />,
        color: 'text-yellow-500',
        hoverColor: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
    },
    {
        type: 'sad',
        icon: <Frown className="w-4 h-4" />,
        color: 'text-gray-500',
        hoverColor: 'hover:bg-gray-100 dark:hover:bg-gray-900/30'
    },
    {
        type: 'fire',
        icon: <Flame className="w-4 h-4" />,
        color: 'text-orange-500',
        hoverColor: 'hover:bg-orange-100 dark:hover:bg-orange-900/30'
    }
]

interface CardRatingPickerProps {
    cardId: string
    initialCounts?: Record<ReactionType, number>
    onRate?: (cardId: string, reaction: ReactionType) => void
    compact?: boolean
}

export function CardRatingPicker({
    cardId,
    initialCounts = { love: 0, like: 0, wow: 0, sad: 0, fire: 0 },
    onRate,
    compact = false
}: CardRatingPickerProps) {
    const [counts, setCounts] = useState(initialCounts)
    const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null)

    const handleReaction = async (reactionType: ReactionType) => {
        // Optimistic update
        const newCounts = { ...counts }

        // Remove previous selection
        if (selectedReaction) {
            newCounts[selectedReaction] = Math.max(0, newCounts[selectedReaction] - 1)
        }

        // Add new selection (or remove if clicking same reaction)
        if (selectedReaction === reactionType) {
            setSelectedReaction(null)
        } else {
            newCounts[reactionType] = newCounts[reactionType] + 1
            setSelectedReaction(reactionType)
        }

        setCounts(newCounts)

        // Call API
        if (onRate) {
            onRate(cardId, reactionType)
        }

        // TODO: Send to API endpoint
        try {
            await fetch('/api/ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardId,
                    reaction: reactionType
                })
            })
        } catch (error) {
            console.error('Failed to save rating:', error)
            // Revert on error
            setCounts(initialCounts)
        }
    }

    return (
        <div className={`flex items-center gap-1 ${compact ? 'flex-wrap' : 'justify-center'}`}>
            {REACTIONS.map((reaction) => {
                const count = counts[reaction.type]
                const isSelected = selectedReaction === reaction.type

                return (
                    <motion.button
                        key={reaction.type}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleReaction(reaction.type)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`
                            relative flex items-center gap-1 rounded-full p-2
                            transition-colors
                            ${reaction.hoverColor}
                            ${isSelected ? 'bg-white/20 dark:bg-black/20 ring-2 ring-white/50' : ''}
                        `}
                        title={reaction.type}
                    >
                        <span className={reaction.color}>
                            {reaction.icon}
                        </span>
                        {count > 0 && (
                            <span className={`text-xs font-semibold ${reaction.color}`}>
                                {count}
                            </span>
                        )}
                    </motion.button>
                )
            })}
        </div>
    )
}
