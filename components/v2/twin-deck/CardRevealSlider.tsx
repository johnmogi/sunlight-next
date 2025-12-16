/**
 * Card Reveal Slider - Twin Deck System
 * Interactive before/after swipe to compare Moonlight vs Sunlight cards
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import Image from 'next/image'

export interface CardPair {
    name: string
    moonlightImage: string
    sunlightImage: string
    moonlightCaption: string
    sunlightCaption: string
    description?: string
}

interface CardRevealSliderProps {
    cardPair: CardPair
    className?: string
}

export function CardRevealSlider({ cardPair, className = '' }: CardRevealSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50) // Start at 50%
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Handle mouse/touch drag
    const handleMove = (clientX: number) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const percentage = (x / rect.width) * 100

        // Clamp between 0 and 100
        setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }

    const handleMouseDown = () => setIsDragging(true)
    const handleMouseUp = () => setIsDragging(false)

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            handleMove(e.clientX)
        }
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX)
        }
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            document.addEventListener('touchmove', handleTouchMove)
            document.addEventListener('touchend', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleMouseUp)
        }
    }, [isDragging])

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Card Name */}
            {cardPair.name && (
                <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white">
                    {cardPair.name}
                </h3>
            )}

            {/* Description */}
            {cardPair.description && (
                <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {cardPair.description}
                </p>
            )}

            {/* Slider Container */}
            <div
                ref={containerRef}
                className="relative w-full aspect-[3/4] md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                {/* Sunlight Image (Right/Background) */}
                <div className="absolute inset-0">
                    <Image
                        src={cardPair.sunlightImage}
                        alt={`${cardPair.name} - Sunlight`}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Sunlight Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-amber-500/20" />
                </div>

                {/* Moonlight Image (Left/Foreground) - Clipped */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <Image
                        src={cardPair.moonlightImage}
                        alt={`${cardPair.name} - Moonlight`}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Moonlight Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-indigo-500/20" />
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                    style={{ left: `${sliderPosition}%` }}
                >
                    {/* Handle Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-gray-200">
                        {/* Left/Right Arrows */}
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                            </svg>
                            <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-indigo-900/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Moon className="w-5 h-5 text-purple-200" />
                    <span className="text-white font-semibold text-sm">Moonlight</span>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Sun className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold text-sm">Sunlight</span>
                </div>
            </div>

            {/* Captions */}
            <div className="grid md:grid-cols-2 gap-4 text-center text-sm">
                <div className="space-y-1">
                    <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
                        <Moon className="w-4 h-4" />
                        <span>Moonlight: {cardPair.moonlightCaption}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                        <Sun className="w-4 h-4" />
                        <span>Sunlight: {cardPair.sunlightCaption}</span>
                    </div>
                </div>
            </div>

            {/* Instruction hint */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                ← Drag the slider to reveal the difference →
            </p>
        </div>
    )
}
