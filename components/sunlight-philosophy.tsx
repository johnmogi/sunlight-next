"use client"


import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { type Locale } from "@/lib/i18n"

interface SunlightPhilosophyProps {
  messages: any
  locale: Locale
}

export function SunlightPhilosophy({ messages, locale }: SunlightPhilosophyProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
    >
      {/* Subtle Background Gradient */}
      {/* Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 opacity-40 dark:opacity-30 will-change-transform"
      >
        <Image
          src="/images/CTA/cinematic_golden-hour_hero_banner_vast_desert_sunrise_behind__f1615440-53b2-44da-bb83-00a45ca34c4b_1.png"
          alt="Philosophy Background"
          fill
          className="object-cover scale-110"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {messages.philosophy?.title || "The SunLight Philosophy"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {messages.philosophy?.description || "A unified system of consciousness, healing, and awakening"}
          </p>
        </motion.div>

        {/* Tabbed Content - Elegant & Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <Tabs defaultValue="system" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-muted/50 p-2 mb-8">
              <TabsTrigger
                value="system"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                The System
              </TabsTrigger>
              <TabsTrigger
                value="suits"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                The Suits
              </TabsTrigger>
              <TabsTrigger
                value="philosophy"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                The Vision
              </TabsTrigger>
              <TabsTrigger
                value="healing"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                Healing Path
              </TabsTrigger>
              <TabsTrigger
                value="zeroPoint"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                {messages.aboutTabs?.zeroPoint || "Zero Point"}
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: The System */}
            <TabsContent value="system" className="mt-0">
              <Card className="border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 bg-card/50 backdrop-blur">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left: Sun Card Concept */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold mb-4">The Zero Point</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden shadow-lg border border-amber-200 dark:border-amber-700 cursor-pointer group">
                          <Image
                            src="/images/about/selected/suncardconcept.jpg"
                            alt="The Sun - Zero Point"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">The Sun - Zero Point</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/about/selected/suncardconcept.jpg"
                            alt="The Sun - Zero Point"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The Sun is pure consciousness, the origin from which four elemental energies descend. Four angels orbit this central source, each representing one element emerging from unity.
                    </p>
                  </div>

                  {/* Right: Major Arcana Cycle */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold mb-4">The Aether Journey</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden shadow-lg border border-amber-200 dark:border-amber-700 cursor-pointer group">
                          <Image
                            src="/images/about/selected/etherinfo.jpg"
                            alt="Major Arcana Cycle"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">Major Arcana Cycle</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/about/selected/etherinfo.jpg"
                            alt="Major Arcana Cycle"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The Major Arcana (0-9) forms a cyclical journey of present-moment awakening. Not a linear path, but a continuous spiral of consciousness returning to itself.
                    </p>
                  </div>
                </div>

                {/* Five Elements Quick Reference */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="text-xl font-semibold mb-4 text-center">The Five Elements</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { element: "Aether", symbol: "⊙", suit: "Major Arcana", color: "from-purple-500 to-pink-500" },
                      { element: "Air", symbol: "△", suit: "Roses", color: "from-sky-400 to-blue-500" },
                      { element: "Fire", symbol: "▽", suit: "Cards", color: "from-red-500 to-orange-500" },
                      { element: "Water", symbol: "◇", suit: "Hearts", color: "from-cyan-400 to-blue-600" },
                      { element: "Earth", symbol: "□", suit: "Coins", color: "from-amber-600 to-yellow-700" }
                    ].map((item) => (
                      <div
                        key={item.element}
                        className="bg-gradient-to-br from-card to-muted rounded-lg p-4 text-center border border-border hover:border-amber-400 transition-colors"
                      >
                        <div className={`text - 3xl mb - 2 bg - gradient - to - r ${item.color} bg - clip - text text - transparent`}>
                          {item.symbol}
                        </div>
                        <h5 className="font-bold text-sm">{item.element}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{item.suit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 2: The Suits */}
            <TabsContent value="suits" className="mt-0">
              <Card className="border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 bg-card/50 backdrop-blur">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Coins */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">□</span>
                      <h3 className="text-xl font-bold">Coins - Earth/Matter</h3>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden shadow-lg border border-amber-200 dark:border-amber-700 cursor-pointer group">
                          <Image
                            src="/images/about/selected/coins.jpg"
                            alt="Suit of Coins"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">Suit of Coins</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/about/selected/coins.jpg"
                            alt="Suit of Coins"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className="text-xs text-muted-foreground">
                      Path of Manifestation & Abundance. From raw potential to realized wealth through labor and balance.
                    </p>
                  </div>

                  {/* Roses */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">△</span>
                      <h3 className="text-xl font-bold">Roses - Air/Mind</h3>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden shadow-lg border border-amber-200 dark:border-amber-700 cursor-pointer group">
                          <Image
                            src="/images/about/selected/roses.jpg"
                            alt="Suit of Roses"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">Suit of Roses</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/about/selected/roses.jpg"
                            alt="Suit of Roses"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className="text-xs text-muted-foreground">
                      Path of Thought & Communication. The mind's journey through clarity, conflict, and wisdom.
                    </p>
                  </div>

                  {/* Crystals */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">▽</span>
                      <h3 className="text-xl font-bold">Cards - Fire/Will</h3>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden shadow-lg border border-amber-200 dark:border-amber-700 cursor-pointer group">
                          <Image
                            src="/images/about/selected/srystals.jpg"
                            alt="Suit of Cards (Crystals)"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">Suit of Cards (Crystals)</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/about/selected/srystals.jpg"
                            alt="Suit of Cards (Crystals)"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className="text-xs text-muted-foreground">
                      Path of Action & Passion. The will's expression through creative force and transformation.
                    </p>
                  </div>

                  {/* Ether 3 - Additional Visual */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">⊙</span>
                      <h3 className="text-xl font-bold">Aether - Consciousness</h3>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden shadow-lg border border-amber-200 dark:border-amber-700 cursor-pointer group">
                          <Image
                            src="/images/about/selected/ether-3.jpg"
                            alt="Aether Element"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">Aether Element</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/about/selected/ether-3.jpg"
                            alt="Aether Element"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className="text-xs text-muted-foreground">
                      The Fifth Element that contains all others. Pure awareness manifesting as archetypal journeys.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 3: The Philosophy/Vision */}
            <TabsContent value="philosophy" className="mt-0">
              <Card className="border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 bg-card/50 backdrop-blur">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left: Lighthouse Image & Description */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">The Rebuilt Lighthouse</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-lg border border-amber-200 dark:border-amber-700 cursor-pointer group">
                          <Image
                            src="/images/about/lighthouse.jpg"
                            alt="The Rebuilt Lighthouse"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">The Rebuilt Lighthouse</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/about/lighthouse.jpg"
                            alt="The Rebuilt Lighthouse"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The Tower of Babylon reimagined as an active lighthouse and vertical paradise. Every crack filled with blooming lavender and climbing roses, inhabitants tending gardens at multiple levels, the bright beacon guiding distant travelers home.
                    </p>
                  </div>

                  {/* Right: Key Principles */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Core Principles</h3>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Unity Through Diversity</h4>
                        <p className="text-sm text-muted-foreground">
                          Multiple interpretations strengthening one truth. Where the original tower fell through confusion, we reunify through universal symbols.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">The Sun Rosetta</h4>
                        <p className="text-sm text-muted-foreground">
                          By centering the Sun as our philosophical anchor, we acknowledge that all spiritual systems ultimately point toward enlightenment.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Enneagram Integration</h4>
                        <p className="text-sm text-muted-foreground">
                          The ancient ninefold system forms our structural backbone, transforming readings from fortune-telling to self-understanding.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Vertical Integration</h4>
                        <p className="text-sm text-muted-foreground">
                          Connecting base consciousness to higher awareness. Each card becomes a step in the ascent.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 4: Healing Path */}
            <TabsContent value="healing" className="mt-0">
              <Card className="border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 bg-card/50 backdrop-blur">
                <div className="space-y-8">
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl md:text-3xl font-bold">A Tarot for Healing, Not Fear</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      The Sunlight Tarot transforms traditional imagery to create a psychologically healing 'white deck' rather than a fear-based 'black deck.'
                    </p>
                  </div>

                  {/* Comparison Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Traditional Approach */}
                    <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border-2 border-slate-300 dark:border-slate-700">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-slate-700 text-white rounded-full text-sm font-semibold">
                          Traditional Tarot
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">Death → Fear</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            The reaper, the end, the void. Imagery designed to frighten and control.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">Devil → Bondage</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Chains, suffering, matter as prison. Punishment and limitation.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">Tower → Destruction</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Catastrophe, collapse, divine punishment falling from above.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sunlight Approach */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-sm font-semibold">
                          Sunlight Tarot
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Tree of Life → Transformation
                          </h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            Passage through the Kabbalistic Tree. Death as doorway, not destination.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Merkaba → Sacred Descent
                          </h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            Matter as teacher, geometry of incarnation. Body as temple, not trap.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Lighthouse → Guidance
                          </h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            Destruction becoming creation. Ruins as fertile ground, beacon of hope.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Banner */}
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg p-6 text-center">
                    <p className="text-lg font-semibold">
                      This is tarot as therapeutic tool, designed for lucid dreaming and conscious living
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 5: Zero Point */}
            <TabsContent value="zeroPoint" className="mt-0">
              <Card className="border-2 border-amber-200 dark:border-amber-800 overflow-hidden bg-card/80 backdrop-blur">
                <div className="relative p-8 md:p-12 space-y-12">
                  {/* Header Section */}
                  <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                      Zero Point Creation
                    </h3>
                    <p className="text-xl text-muted-foreground font-medium">
                      Inner Love & Self-Realization
                    </p>
                  </div>

                  {/* Section 1: Source */}
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 space-y-4">
                      <h4 className="text-2xl font-semibold text-amber-700 dark:text-amber-400">
                        The Zero Point
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        The zero point is the origin of existence, the unmanifested potential from which all creation springs. It is the silent, still center within every being, the pure consciousness that observes and experiences.
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="order-1 md:order-2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group">
                          <Image
                            src="/images/unnamed.png"
                            alt="Zero Point Source"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">Zero Point Source</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/unnamed.png"
                            alt="Zero Point Source"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Section 2: Inner Sun */}
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group">
                          <Image
                            src="/images/unnamed (1).png"
                            alt="Inner Sun Reactor"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">Inner Sun Reactor</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/unnamed (1).png"
                            alt="Inner Sun Reactor"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div className="space-y-4">
                      <h4 className="text-2xl font-semibold text-amber-700 dark:text-amber-400">
                        The Inner Sun
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        The inner sun is the reactor of love, the source of infinite energy and warmth within the heart. It is the divine spark, the true self, radiating unconditional love and wisdom.
                      </p>
                    </div>
                  </div>

                  {/* Section 3: Realization */}
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 space-y-4">
                      <h4 className="text-2xl font-semibold text-amber-700 dark:text-amber-400">
                        Self-Realization
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        True realization occurs when one wakes up to the inner sun, recognizing the zero point as their true nature. This awakening brings profound peace, clarity, and the ability to manifest one's highest potential.
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="order-1 md:order-2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group">
                          <Image
                            src="/images/mj.png"
                            alt="Self Realization"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">Expand</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">Self Realization</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src="/images/mj.png"
                            alt="Self Realization"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
