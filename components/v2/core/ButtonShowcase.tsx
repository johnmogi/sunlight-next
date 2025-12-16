/**
 * Example: Using V2 Button Component
 * This demonstrates the new component architecture
 */

'use client'

import { Button } from './Button'
import { Heart, Star, Download } from 'lucide-react'

export function ButtonShowcase() {
    return (
        <div className="space-y-8 p-8">
            <h2 className="text-3xl font-bold">V2 Button Component</h2>

            {/* Variants */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Variants</h3>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="accent">Accent</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="outline">Outline</Button>
                </div>
            </section>

            {/* Sizes */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                </div>
            </section>

            {/* With Icons */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">With Icons</h3>
                <div className="flex flex-wrap gap-4">
                    <Button leftIcon={<Heart className="w-4 h-4" />}>Like</Button>
                    <Button variant="accent" rightIcon={<Star className="w-4 h-4" />}>
                        Favorite
                    </Button>
                    <Button
                        variant="outline"
                        leftIcon={<Download className="w-4 h-4" />}
                        rightIcon={<Star className="w-4 h-4" />}
                    >
                        Download & Star
                    </Button>
                </div>
            </section>

            {/* States */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">States</h3>
                <div className="flex flex-wrap gap-4">
                    <Button loading>Loading...</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant="accent" loading>
                        Processing
                    </Button>
                </div>
            </section>
        </div>
    )
}
