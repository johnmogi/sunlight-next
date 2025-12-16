/**
 * DualSplit CTA Demo
 * Shows how to use the dual-split layout for a Call-to-Action section
 */

'use client'

import { DualSplit, DualSplitContent } from './DualSplit'
import { Button } from '@/components/v2/core'
import { Moon, Sun, Heart, Star } from 'lucide-react'

export function DualSplitCTADemo() {
    return (
        <div className="space-y-12">
            {/* Example 1: 50/50 CTA */}
            <DualSplit
                minHeight="500px"
                moonContent={
                    <DualSplitContent align="center">
                        <div className="space-y-6 max-w-lg">
                            <div className="flex items-center justify-center">
                                <Moon className="w-16 h-16 text-purple-300" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                                Moon Journey
                            </h2>
                            <p className="text-xl text-purple-200">
                                Explore the mysteries of the night. Discover your inner wisdom through reflection and intuition.
                            </p>
                            <Button variant="outline" className="bg-white/10 border-purple-300 text-white hover:bg-white/20">
                                Begin Moon Path
                            </Button>
                        </div>
                    </DualSplitContent>
                }
                sunContent={
                    <DualSplitContent align="center">
                        <div className="space-y-6 max-w-lg">
                            <div className="flex items-center justify-center">
                                <Sun className="w-16 h-16 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                                Sun Journey
                            </h2>
                            <p className="text-xl text-white/90">
                                Embrace the power of day. Take action, create boldly, and shine your light into the world.
                            </p>
                            <Button variant="primary" className="bg-white text-orange-600 hover:bg-white/90">
                                Begin Sun Path
                            </Button>
                        </div>
                    </DualSplitContent>
                }
            />

            {/* Example 2: 40/60 Feature Showcase */}
            <DualSplit
                splitRatio="40-60"
                minHeight="400px"
                moonContent={
                    <DualSplitContent align="left" padding="lg">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-purple-100">
                                Night Features
                            </h3>
                            <ul className="space-y-3 text-purple-200">
                                <li className="flex items-start gap-3">
                                    <Star className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span>Deep introspection and meditation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Star className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span>Dream interpretation tools</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Star className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span>Lunar calendar integration</span>
                                </li>
                            </ul>
                        </div>
                    </DualSplitContent>
                }
                sunContent={
                    <DualSplitContent align="right" padding="lg">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-white">
                                Day Features
                            </h3>
                            <ul className="space-y-3 text-white/90">
                                <li className="flex items-start gap-3">
                                    <Heart className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span>Energy-boosting affirmations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Heart className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span>Daily action planners</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Heart className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span>Solar-powered productivity</span>
                                </li>
                            </ul>
                        </div>
                    </DualSplitContent>
                }
            />

            {/* Example 3: Vertical Split (Mobile-first) */}
            <DualSplit
                orientation="vertical"
                minHeight="800px"
                reverseMobile
                moonContent={
                    <DualSplitContent align="center" padding="xl">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-purple-100">
                                Moonlight Reflection
                            </h3>
                            <p className="text-lg text-purple-200 max-w-md">
                                The stillness of night brings clarity. Listen to the whispers of your soul.
                            </p>
                        </div>
                    </DualSplitContent>
                }
                sunContent={
                    <DualSplitContent align="center" padding="xl">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-white">
                                Sunlight Action
                            </h3>
                            <p className="text-lg text-white/90 max-w-md">
                                The warmth of day inspires movement. Step forward with courage and purpose.
                            </p>
                        </div>
                    </DualSplitContent>
                }
            />
        </div>
    )
}
