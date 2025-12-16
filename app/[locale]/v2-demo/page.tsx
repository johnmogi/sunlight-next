/**
 * V2 Demo Page
 * Showcases all the V2 refactored components
 */

import { ButtonShowcase } from '@/components/v2/core/ButtonShowcase'
import { DualSplitCTADemo } from '@/components/v2/layout/DualSplitCTADemo'

export default function V2DemoPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent mb-4">
                        V2 Component Library
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Welcome to the refactored design system! This page showcases the new V2 components built with our unified design tokens.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">
                            Branch: refactor/v2-redesign
                        </span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                            Status: In Development
                        </span>
                    </div>
                </div>

                {/* Design System Info */}
                <div className="mb-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl mb-2">🎨</div>
                        <h3 className="text-lg font-semibold mb-2">Design Tokens</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Unified color palettes, typography, and spacing system
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl mb-2">♿</div>
                        <h3 className="text-lg font-semibold mb-2">Accessible</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            WCAG AA compliant with keyboard navigation and ARIA labels
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl mb-2">📱</div>
                        <h3 className="text-lg font-semibold mb-2">Mobile-First</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Responsive design with touch-optimized interactions
                        </p>
                    </div>
                </div>

                {/* Components Showcase */}
                <div className="space-y-12">
                    {/* Buttons */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <ButtonShowcase />
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        More components coming soon: Card, Input, Modal, and more...
                    </p>
                    <p className="mt-2">
                        File location: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">app/[locale]/v2-demo/page.tsx</code>
                    </p>
                </div>
            </div>

            {/* Full-Width Dual Split Demos (Outside container) */}
            <div className="mt-16">
                <div className="container mx-auto px-4 mb-8">
                    <h2 className="text-4xl font-bold text-center">Dual-Split Moon/Sun Layouts</h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
                        Full-width split layouts perfect for CTAs and hero sections
                    </p>
                </div>
                <DualSplitCTADemo />
            </div>
        </main>
    )
}
