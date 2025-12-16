/**
 * Swipeable Card - Individual card with Moonlight/Sunlight swipe reveal
 * Mini version of the Eclipse Hero swipe functionality
 */

'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Moon, Sun } from 'lucide-react'

interface SwipeableCardProps {
    cardId: string
    cardNumber: number
    cardName: string
    cardMeaning: string
    moonlightImage: string
    sunlightImage: string
    onCardClick: () => void
}

export function SwipeableCard({
    cardId,
    cardNumber,
    cardName,
    cardMeaning,
    moonlightImage,
    sunlightImage,
    onCardClick
}: SwipeableCardProps) {
    const [revealPosition, setRevealPosition] = useState(50) // Start at 50% (showing both)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent card click when starting drag
        setIsDragging(true)

        const handleMove = (moveEvent: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const x = moveEvent.clientX - rect.left
            const percentage = (x / rect.width) * 100
            setRevealPosition(Math.max(0, Math.min(100, percentage)))
        }

        const handleUp = () => {
            setIsDragging(false)
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseup', handleUp)
        }

        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', handleUp)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation()
        setIsDragging(true)

        const handleMove = (moveEvent: TouchEvent) => {
            if (!containerRef.current || !moveEvent.touches[0]) return
            const rect = containerRef.current.getBoundingClientRect()
            const x = moveEvent.touches[0].clientX - rect.left
            const percentage = (x / rect.width) * 100
            setRevealPosition(Math.max(0, Math.min(100, percentage)))
        }

        const handleEnd = () => {
            setIsDragging(false)
            document.removeEventListener('touchmove', handleMove)
            document.removeEventListener('touchend', handleEnd)
        }

        document.addEventListener('touchmove', handleMove)
        document.addEventListener('touchend', handleEnd)
    }

    const handleCardClickInternal = () => {
        if (!isDragging) {
            onCardClick()
        }
    }

    const deckType = revealPosition > 50 ? 'moonlight' : 'sunlight'
    const isDarkMode = deckType === 'moonlight'

    return (
        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            {/* Swipeable Card Image Container */}
            <div
                ref={containerRef}
                className="relative aspect-[2/3] cursor-ew-resize select-none overflow-hidden"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onClick={handleCardClickInternal}
            >
                {/* Sunlight Image (Background) */}
                <div className="absolute inset-0">
                    <Image
                        src={sunlightImage}
                        alt={`${cardName} - Sunlight`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Sunlight Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20" />
                </div>

                {/* Moonlight Image (Foreground - Clipped) */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - revealPosition}% 0 0)` }}
                >
                    <Image
                        src={moonlightImage}
                        alt={`${cardName} - Moonlight`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Moonlight Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/20 to-purple-500/20" />
                </div>

                {/* Divider Line */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none"
                    style={{ left: `${revealPosition}%` }}
                >
                    {/* Mini Handle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-gray-200">
                        <div className="flex items-center gap-0.5">
                            <svg className="w-2 h-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                            </svg>
                            <svg className="w-2 h-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Deck Type Badge */}
                <div className="absolute top-2 right-2 z-10">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm ${isDarkMode
                            ? 'bg-indigo-900/90'
                            : 'bg-amber-500/90'
                        }`}>
                        {isDarkMode ? (
                            <Moon className="w-3 h-3 text-purple-200" />
                        ) : (
                            <Sun className="w-3 h-3 text-white" />
                        )}
                    </div>
                </div>

                {/* Card Number Badge */}
                <div className="absolute top-2 left-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10 pointer-events-none">
                    <span className="text-white font-bold text-xs">{cardNumber}</span>
                </div>

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Card Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
                    <p className="text-white font-bold text-sm mb-1">{cardName}</p>
                    <p className="text-purple-200 text-xs line-clamp-1">{cardMeaning}</p>
                </div>
            </div>
        </div>
    )
}
