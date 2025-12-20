/**
 * DualSplit Layout Component - V2
 * Creates a full-width split layout with Moon (left) and Sun (right) themes
 * Perfect for hero sections, CTAs, and feature showcases
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface DualSplitProps {
    /** Moon-themed content (left side) */
    moonContent: React.ReactNode
    /** Sun-themed content (right side) */
    sunContent: React.ReactNode
    /** Optional split ratio (default: 50/50) */
    splitRatio?: '50-50' | '40-60' | '60-40' | '30-70' | '70-30'
    /** Orientation */
    orientation?: 'horizontal' | 'vertical'
    /** Minimum height */
    minHeight?: string
    /** Custom className */
    className?: string
    /** Reverse on mobile (stack Sun first) */
    reverseMobile?: boolean
}

export function DualSplit({
    moonContent,
    sunContent,
    splitRatio = '50-50',
    orientation = 'horizontal',
    minHeight = '600px',
    className,
    reverseMobile = false,
}: DualSplitProps) {
    // Split ratio classes
    const ratioClasses = {
        '50-50': 'md:grid-cols-2',
        '40-60': 'md:grid-cols-[40%_60%]',
        '60-40': 'md:grid-cols-[60%_40%]',
        '30-70': 'md:grid-cols-[30%_70%]',
        '70-30': 'md:grid-cols-[70%_30%]',
    }

    const orientationClasses = orientation === 'vertical'
        ? 'grid-rows-2'
        : `grid ${ratioClasses[splitRatio]}`

    return (
        <section
            className={cn(
                'relative w-full overflow-hidden',
                orientationClasses,
                reverseMobile && 'flex flex-col-reverse md:grid',
                className
            )}
            style={{ minHeight }}
        >
            {/* Moon Side (Left/Top) - Cool tones */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[url('/images/stars-pattern.svg')] opacity-[0.02]" />

                {/* Content */}
                <div className="relative z-10 h-full">
                    {moonContent}
                </div>
            </div>

            {/* Sun Side (Right/Bottom) - Warm tones */}
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-300/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[url('/images/rays-pattern.svg')] opacity-[0.02]" />

                {/* Content */}
                <div className="relative z-10 h-full">
                    {sunContent}
                </div>
            </div>

            {/* Center Divider Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent transform -translate-x-1/2 hidden md:block" />
        </section>
    )
}

/**
 * DualSplitContent - Helper component for content inside split sections
 */
export interface DualSplitContentProps {
    children: React.ReactNode
    align?: 'left' | 'center' | 'right'
    className?: string
    padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export function DualSplitContent({
    children,
    align = 'center',
    className,
    padding = 'lg',
}: DualSplitContentProps) {
    const alignClasses = {
        left: 'items-start text-left',
        center: 'items-center text-center',
        right: 'items-end text-right',
    }

    const paddingClasses = {
        sm: 'p-6',
        md: 'p-8 md:p-12',
        lg: 'p-12 md:p-16',
        xl: 'p-16 md:p-24',
    }

    return (
        <div
            className={cn(
                'flex flex-col justify-center h-full w-full',
                alignClasses[align],
                paddingClasses[padding],
                className
            )}
        >
            {children}
        </div>
    )
}
