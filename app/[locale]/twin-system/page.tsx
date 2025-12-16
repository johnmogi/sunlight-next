/**
 * Twin Deck System Landing Page
 * The new portal for Stereoscopic Vision
 */

import { EclipseHero } from '@/components/v2/twin-deck/EclipseHero'
import { CardRevealSlider, CardPair } from '@/components/v2/twin-deck/CardRevealSlider'
import { MajorArcanaGallery } from '@/components/v2/twin-deck/MajorArcanaGallery'

// Example card pairs - using new sample images
const exampleCardPairs: CardPair[] = [
    {
        name: 'The Magician',
        moonlightImage: '/images/about/gardencard1.jpg',
        sunlightImage: '/images/about/hggamplay1.jpg',
        moonlightCaption: 'Receptive Vessel',
        sunlightCaption: 'Active Force',
        description: 'Swipe to see how the same archetype transforms between Moonlight (feminine/receptive) and Sunlight (masculine/projective)',
    },
]

export default function TwinSystemPage() {
    return (
        <main className="min-h-screen">
            {/* Full Hero Swipe - Above the fold */}
            <EclipseHero />

            {/* Major Arcana Gallery */}
            <MajorArcanaGallery />

            {/* Card Reveal Slider - Separate section below */}
            <section className="container mx-auto px-4 py-16 md:py-24 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">
                            See the Difference
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Experience how each card embodies dual physics
                        </p>
                    </div>

                    <CardRevealSlider cardPair={exampleCardPairs[0]} />
                </div>
            </section>

            {/* Placeholder for upcoming sections */}
            <div className="container mx-auto px-4 py-16 text-center bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400">
                    More sections coming: Stereoscopic Vision Explainer, Dual Physics Tabs, Synthesis CTA...
                </p>
            </div>
        </main>
    )
}

