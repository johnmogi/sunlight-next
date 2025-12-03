"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface HealingSectionProps {
  messages: any
  id?: string
}

export function HealingSection({ messages, id }: HealingSectionProps) {
  return (
    <section id={id} className="py-16 bg-gradient-to-b from-white to-amber-50/30 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {messages.healing?.title || "A Tarot for Healing, Not Fear"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {messages.healing?.description || "Replacing the old symbols of doom with understanding and regenerative Light."}
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Traditional Approach */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-slate-700 text-white rounded-full text-xs font-semibold">
                Traditional
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">Death → Fear</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              The reaper, the end, the void.
            </p>

            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">Devil → Bondage</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Chains, suffering, matter as prison.
            </p>
          </motion.div>

          {/* Sunlight Approach */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 border-2 border-amber-300 dark:border-amber-700 shadow-lg"
          >
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-semibold">
                Sunlight
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Tree of Life → Transformation</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
              Passage through the Kabbalistic Tree.
            </p>

            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Merkaba → Sacred Descent</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Matter as teacher, geometry of incarnation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
