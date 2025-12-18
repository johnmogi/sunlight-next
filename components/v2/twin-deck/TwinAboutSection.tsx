/**
 * Twin System About Section
 * Explains the Moonlight vs Sunlight dual-path philosophy
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Sparkles } from 'lucide-react'

export function TwinAboutSection() {
    return (
        <section id="about" className="relative py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Compact Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                        The Dual-Path System
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Every card holds two perspectives: Moonlight (receptive) and Sunlight (projective)
                    </p>
                </motion.div>

                {/* Compact Dual Path Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-6 text-white"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Moon className="w-6 h-6" />
                            <h3 className="text-xl font-bold">Moonlight</h3>
                        </div>
                        <p className="text-sm text-purple-100 mb-2">
                            <strong>Receptive • The Question • The Wound</strong>
                        </p>
                        <p className="text-sm text-purple-200">
                            The feminine principle of introspection and reflection. Exploring shadows before transformation.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Sun className="w-6 h-6" />
                            <h3 className="text-xl font-bold">Sunlight</h3>
                        </div>
                        <p className="text-sm text-amber-50 mb-2">
                            <strong>Active • The Answer • The Cure</strong>
                        </p>
                        <p className="text-sm text-amber-100">
                            The masculine principle of action and manifestation. Transforming shadow into light.
                        </p>
                    </motion.div>
                </div>

                {/* Infographic Placeholder */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-950 dark:to-amber-950 rounded-xl p-8 border-4 border-dashed border-purple-300 dark:border-purple-700 text-center"
                >
                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                        Your Infographic Here
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add your dual-system infographic to explain the transformation
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
