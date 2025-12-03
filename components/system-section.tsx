"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { type Locale } from "@/lib/i18n"

interface SystemSectionProps {
  messages: any
  locale: Locale
}

export function SystemSection({ messages, locale }: SystemSectionProps) {
  // Map locale to infographic image
  const infographicMap: Record<Locale, string> = {
    en: "/images/about/infographiceeng.png",
    es: "/images/about/infographiceesp.png",
    he: "/images/about/infographicheb1.png",
    ar: "/images/about/infographicheb1.png", // Using Hebrew for Arabic until we have Arabic version
    fr: "/images/about/infographiceeng.png", // Using English for French until we have French version
  }

  const infographicPath = infographicMap[locale] || infographicMap.en

  return (
    <section id="system" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {messages.system?.title || "Everything Begins at Zero"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {messages.system?.description || "We start with the Source. The Sun is the Zero Point from which five elements radiate."}
          </p>
        </motion.div>

        {/* Infographic - The Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-10"
        >
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-xl border-2 border-amber-200 dark:border-amber-800">
            <Image
              src={infographicPath}
              alt="The Solar Rosetta Stone - Five Element System"
              fill
              className="object-contain bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900"
              priority
            />
          </div>
        </motion.div>

        {/* Five Elements Grid - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto"
        >
          {[
            { element: "Aether", symbol: "⊙", suit: "Major" },
            { element: "Air", symbol: "△", suit: "Roses" },
            { element: "Fire", symbol: "▽", suit: "Cards" },
            { element: "Water", symbol: "◇", suit: "Hearts" },
            { element: "Earth", symbol: "□", suit: "Coins" }
          ].map((item) => (
            <div
              key={item.element}
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-lg p-4 text-center border border-amber-200 dark:border-amber-800"
            >
              <div className="text-3xl mb-2 text-amber-600">{item.symbol}</div>
              <h3 className="text-lg font-bold text-amber-600">{item.element}</h3>
              <p className="text-xs text-muted-foreground">{item.suit}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
