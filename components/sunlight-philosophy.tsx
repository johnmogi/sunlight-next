"use client"


import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

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
  const isRTL = locale === "he"

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
                {messages.aboutContent?.tabs?.system || "The System"}
              </TabsTrigger>
              <TabsTrigger
                value="suits"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                {messages.aboutContent?.tabs?.suits || "The Suits"}
              </TabsTrigger>
              <TabsTrigger
                value="philosophy"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                {messages.aboutContent?.tabs?.vision || "The Vision"}
              </TabsTrigger>
              <TabsTrigger
                value="healing"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                {messages.aboutContent?.tabs?.healing || "Healing Path"}
              </TabsTrigger>
              <TabsTrigger
                value="zeroPoint"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                {messages.aboutContent?.tabs?.zeroPoint || "Zero Point"}
              </TabsTrigger>
              <TabsTrigger
                value="guide"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                {messages.aboutContent?.tabs?.guide || "Daily Guide"}
              </TabsTrigger>
              <TabsTrigger
                value="game"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                {messages.aboutContent?.tabs?.game || "Hidden Garden"}
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white py-3"
              >
                {messages.aboutContent?.tabs?.community || "Community"}
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: The System */}
            <TabsContent value="system" className="mt-0">
              <Card className="border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 bg-card/50 backdrop-blur">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left: Sun Card Concept */}
                  <div className="space-y-4">
                    <h3 className={cn("text-2xl font-bold mb-4", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.system?.zeroPointTitle || "The Zero Point"}</h3>
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
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">{messages.aboutContent?.system?.zeroPointTitle || "The Zero Point"}</DialogTitle>
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
                    <p className={cn("text-sm text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                      {messages.aboutContent?.system?.zeroPointDesc}
                    </p>
                  </div>

                  {/* Right: Major Arcana Cycle */}
                  <div className="space-y-4">
                    <h3 className={cn("text-2xl font-bold mb-4", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.system?.aetherTitle || "The Aether Journey"}</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden shadow-lg border border-amber-200 dark:border-amber-700 cursor-pointer group">
                          <Image
                            src={isRTL ? "/images/gardenheb.png" : "/images/about/selected/etherinfo.jpg"}
                            alt="Major Arcana Cycle"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">{messages.aboutContent?.system?.aetherTitle || "Major Arcana Cycle"}</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src={isRTL ? "/images/gardenheb.png" : "/images/about/selected/etherinfo.jpg"}
                            alt="Major Arcana Cycle"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className={cn("text-sm text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                      {messages.aboutContent?.system?.aetherDesc}
                    </p>
                  </div>
                </div>

                {/* Five Elements Quick Reference */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="text-xl font-semibold mb-4 text-center">{messages.aboutContent?.system?.elementsTitle || "The Five Elements"}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { elementKey: "aether", symbol: "⊙", color: "from-purple-500 to-pink-500" },
                      { elementKey: "air", symbol: "△", color: "from-sky-400 to-blue-500" },
                      { elementKey: "fire", symbol: "▽", color: "from-red-500 to-orange-500" },
                      { elementKey: "water", symbol: "◇", color: "from-cyan-400 to-blue-600" },
                      { elementKey: "earth", symbol: "□", color: "from-amber-600 to-yellow-700" }
                    ].map((item) => (
                      <div
                        key={item.elementKey}
                        className="bg-gradient-to-br from-card to-muted rounded-lg p-4 text-center border border-border hover:border-amber-400 transition-colors"
                      >
                        <div className={`text-3xl mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.symbol}
                        </div>
                        <h5 className="font-bold text-sm">{messages.aboutContent?.system?.elements?.[item.elementKey]?.name}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{messages.aboutContent?.system?.elements?.[item.elementKey]?.suit}</p>
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
                      <h3 className="text-xl font-bold">{messages.aboutContent?.suits?.coins?.title}</h3>
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
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">{messages.aboutContent?.suits?.coins?.title}</DialogTitle>
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
                    <p className={cn("text-xs text-muted-foreground", isRTL ? "text-right" : "text-left")}>
                      {messages.aboutContent?.suits?.coins?.desc}
                    </p>
                  </div>

                  {/* Roses */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">△</span>
                      <h3 className="text-xl font-bold">{messages.aboutContent?.suits?.roses?.title}</h3>
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
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">{messages.aboutContent?.suits?.roses?.title}</DialogTitle>
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
                    <p className={cn("text-xs text-muted-foreground", isRTL ? "text-right" : "text-left")}>
                      {messages.aboutContent?.suits?.roses?.desc}
                    </p>
                  </div>

                  {/* Crystals */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">▽</span>
                      <h3 className="text-xl font-bold">{messages.aboutContent?.suits?.cards?.title}</h3>
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
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">{messages.aboutContent?.suits?.cards?.title}</DialogTitle>
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
                    <p className={cn("text-xs text-muted-foreground", isRTL ? "text-right" : "text-left")}>
                      {messages.aboutContent?.suits?.cards?.desc}
                    </p>
                  </div>

                  {/* Ether 3 - Additional Visual */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">⊙</span>
                      <h3 className="text-xl font-bold">{messages.aboutContent?.suits?.aether?.title}</h3>
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
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">{messages.aboutContent?.suits?.aether?.title}</DialogTitle>
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
                    <p className={cn("text-xs text-muted-foreground", isRTL ? "text-right" : "text-left")}>
                      {messages.aboutContent?.suits?.aether?.desc}
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
                    <h3 className={cn("text-2xl font-bold", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.vision?.lighthouseTitle || "The Rebuilt Lighthouse"}</h3>
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
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">{messages.aboutContent?.vision?.lighthouseTitle || "The Rebuilt Lighthouse"}</DialogTitle>
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
                    <p className={cn("text-sm text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                      {messages.aboutContent?.vision?.lighthouseDesc}
                    </p>
                  </div>

                  {/* Right: Key Principles */}
                  <div className="space-y-6">
                    <h3 className={cn("text-2xl font-bold", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.vision?.principlesTitle || "Core Principles"}</h3>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                        <h4 className={cn("font-semibold text-amber-700 dark:text-amber-400 mb-2", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.vision?.principles?.unity?.title}</h4>
                        <p className={cn("text-sm text-muted-foreground", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.vision?.principles?.unity?.desc}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                        <h4 className={cn("font-semibold text-amber-700 dark:text-amber-400 mb-2", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.vision?.principles?.rosetta?.title}</h4>
                        <p className={cn("text-sm text-muted-foreground", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.vision?.principles?.rosetta?.desc}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                        <h4 className={cn("font-semibold text-amber-700 dark:text-amber-400 mb-2", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.vision?.principles?.enneagram?.title}</h4>
                        <p className={cn("text-sm text-muted-foreground", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.vision?.principles?.enneagram?.desc}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                        <h4 className={cn("font-semibold text-amber-700 dark:text-amber-400 mb-2", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.vision?.principles?.vertical?.title}</h4>
                        <p className={cn("text-sm text-muted-foreground", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.vision?.principles?.vertical?.desc}
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
                    <h3 className="text-2xl md:text-3xl font-bold">{messages.aboutContent?.healing?.title || "A Tarot for Healing, Not Fear"}</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {messages.aboutContent?.healing?.subtitle}
                    </p>
                  </div>

                  {/* Comparison Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Traditional Approach */}
                    <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border-2 border-slate-300 dark:border-slate-700">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-slate-700 text-white rounded-full text-sm font-semibold">
                          {messages.aboutContent?.healing?.traditional?.badge || "Traditional Tarot"}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className={cn("text-lg font-bold mb-2 text-slate-800 dark:text-slate-200", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.healing?.traditional?.death?.title}</h4>
                          <p className={cn("text-sm text-slate-600 dark:text-slate-400", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.healing?.traditional?.death?.desc}
                          </p>
                        </div>

                        <div>
                          <h4 className={cn("text-lg font-bold mb-2 text-slate-800 dark:text-slate-200", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.healing?.traditional?.devil?.title}</h4>
                          <p className={cn("text-sm text-slate-600 dark:text-slate-400", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.healing?.traditional?.devil?.desc}
                          </p>
                        </div>

                        <div>
                          <h4 className={cn("text-lg font-bold mb-2 text-slate-800 dark:text-slate-200", isRTL ? "text-right" : "text-left")}>{messages.aboutContent?.healing?.traditional?.tower?.title}</h4>
                          <p className={cn("text-sm text-slate-600 dark:text-slate-400", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.healing?.traditional?.tower?.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sunlight Approach */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-sm font-semibold">
                          {messages.aboutContent?.healing?.sunlight?.badge || "Sunlight Tarot"}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className={cn("text-lg font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.healing?.sunlight?.tree?.title}
                          </h4>
                          <p className={cn("text-sm text-slate-700 dark:text-slate-300", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.healing?.sunlight?.tree?.desc}
                          </p>
                        </div>

                        <div>
                          <h4 className={cn("text-lg font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.healing?.sunlight?.merkaba?.title}
                          </h4>
                          <p className={cn("text-sm text-slate-700 dark:text-slate-300", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.healing?.sunlight?.merkaba?.desc}
                          </p>
                        </div>

                        <div>
                          <h4 className={cn("text-lg font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.healing?.sunlight?.lighthouse?.title}
                          </h4>
                          <p className={cn("text-sm text-slate-700 dark:text-slate-300", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.healing?.sunlight?.lighthouse?.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Banner */}
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg p-6 text-center">
                    <p className="text-lg font-semibold">
                      {messages.aboutContent?.healing?.banner}
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
                      {messages.aboutContent?.tabs?.zeroPointTitle || "Zero Point Creation"}
                    </h3>
                    <p className="text-xl text-muted-foreground font-medium">
                      {messages.zeroPoint?.subtitle || "Inner Love & Self-Realization"}
                    </p>
                  </div>

                  {/* Section 1: Source */}
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 space-y-4">
                      <h4 className={cn("text-2xl font-semibold text-amber-700 dark:text-amber-400", isRTL ? "text-right" : "text-left")}>
                        {messages.zeroPoint?.source?.title}
                      </h4>
                      <p className={cn("text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                        {messages.zeroPoint?.source?.text}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="order-1 md:order-2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group">
                          <Image
                            src={isRTL ? "/images/tarotheb.png" : "/images/unnamed.png"}
                            alt="Zero Point Source"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <DialogTitle className="sr-only">Zero Point Source</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src={isRTL ? "/images/tarotheb.png" : "/images/unnamed.png"}
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
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
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
                      <h4 className={cn("text-2xl font-semibold text-amber-700 dark:text-amber-400", isRTL ? "text-right" : "text-left")}>
                        {messages.zeroPoint?.innerSun?.title}
                      </h4>
                      <p className={cn("text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                        {messages.zeroPoint?.innerSun?.text}
                      </p>
                    </div>
                  </div>

                  {/* Section 3: Realization */}
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 space-y-4">
                      <h4 className={cn("text-2xl font-semibold text-amber-700 dark:text-amber-400", isRTL ? "text-right" : "text-left")}>
                        {messages.zeroPoint?.realization?.title}
                      </h4>
                      <p className={cn("text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                        {messages.zeroPoint?.realization?.text}
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
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
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

            {/* Tab 6: Daily Guide */}
            <TabsContent value="guide" className="mt-0">
              <Card className="border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 bg-card/50 backdrop-blur">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Left: Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className={cn("text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2", isRTL ? "text-right" : "text-left")}>
                        {messages.aboutContent?.guide?.title}
                      </h3>
                      <p className={cn("text-lg font-medium text-amber-700 dark:text-amber-400", isRTL ? "text-right" : "text-left")}>
                        {messages.aboutContent?.guide?.subtitle}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                        <h4 className={cn("font-bold text-slate-800 dark:text-slate-200 mb-2", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.guide?.role?.title}
                        </h4>
                        <p className={cn("text-sm text-muted-foreground leading-relaxed mb-2", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.guide?.role?.desc}
                        </p>
                        <p className={cn("text-xs font-semibold text-amber-600 dark:text-amber-500", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.guide?.role?.concept}
                        </p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                        <h4 className={cn("font-bold text-slate-800 dark:text-slate-200 mb-2", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.guide?.structure?.title}
                        </h4>
                        <p className={cn("text-sm text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.guide?.structure?.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Image */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group">
                        <Image
                          src="/images/cards/eather/httpss.mj.run5NH0Y7Xq1VA_Lilys_Diary__Guide_for_Lucid_Dreamin_fafd56d6-e901-45f9-86ff-0c513bb0e9fa_0.jpg"
                          alt="Lily's Guide"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                      <DialogTitle className="sr-only">Lily's Guide</DialogTitle>
                      <div className="relative w-full h-[80vh]">
                        <Image
                          src="/images/cards/eather/httpss.mj.run5NH0Y7Xq1VA_Lilys_Diary__Guide_for_Lucid_Dreamin_fafd56d6-e901-45f9-86ff-0c513bb0e9fa_0.jpg"
                          alt="Lily's Guide"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 7: Hidden Garden Game */}
            <TabsContent value="game" className="mt-0">
              <Card className="border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 bg-card/50 backdrop-blur">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Left: Image (Swapped for variety) */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group order-2 lg:order-1">
                        <Image
                          src="/images/CTA/Board_game_box_cover_for_Scroll_Maze_showing_adventure_throug_a1155554-e458-41ed-bca4-1d1d203ccedb_3.png"
                          alt="The Hidden Garden Game"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                      <DialogTitle className="sr-only">The Hidden Garden Game</DialogTitle>
                      <div className="relative w-full h-[80vh]">
                        <Image
                          src="/images/CTA/Board_game_box_cover_for_Scroll_Maze_showing_adventure_throug_a1155554-e458-41ed-bca4-1d1d203ccedb_3.png"
                          alt="The Hidden Garden Game"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Right: Content */}
                  <div className="space-y-6 order-1 lg:order-2">
                    <div>
                      <h3 className={cn("text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2", isRTL ? "text-right" : "text-left")}>
                        {messages.aboutContent?.game?.title}
                      </h3>
                      <p className={cn("text-lg font-medium text-amber-700 dark:text-amber-400", isRTL ? "text-right" : "text-left")}>
                        {messages.aboutContent?.game?.subtitle}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                        <h4 className={cn("font-bold text-slate-800 dark:text-slate-200 mb-2", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.game?.premise?.title}
                        </h4>
                        <p className={cn("text-sm text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.game?.premise?.desc}
                        </p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                        <h4 className={cn("font-bold text-slate-800 dark:text-slate-200 mb-2", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.game?.mechanics?.title}
                        </h4>
                        <p className={cn("text-sm text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.game?.mechanics?.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 8: Community */}
            <TabsContent value="community" className="mt-0">
              <Card className="border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 bg-card/50 backdrop-blur">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Left: Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className={cn("text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2", isRTL ? "text-right" : "text-left")}>
                        {messages.aboutContent?.community?.title}
                      </h3>
                      <p className={cn("text-lg font-medium text-amber-700 dark:text-amber-400", isRTL ? "text-right" : "text-left")}>
                        {messages.aboutContent?.community?.subtitle}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                        <h4 className={cn("font-bold text-slate-800 dark:text-slate-200 mb-2", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.community?.participation?.title}
                        </h4>
                        <p className={cn("text-sm text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.community?.participation?.desc}
                        </p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                        <h4 className={cn("font-bold text-slate-800 dark:text-slate-200 mb-2", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.community?.openSource?.title}
                        </h4>
                        <p className={cn("text-sm text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                          {messages.aboutContent?.community?.openSource?.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Image */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative aspect-[16/9] w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group">
                        <Image
                          src="/images/CTA/Kickstarter_campaign_hero_golden-hour_flatlay_on_weathered_wo_4a9c8c21-4bb9-4405-92e6-2f1afd02976b_3.png"
                          alt="Community & Co-Creation"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">{messages.aboutContent?.expand || "Expand"}</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                      <DialogTitle className="sr-only">Community & Co-Creation</DialogTitle>
                      <div className="relative w-full h-[80vh]">
                        <Image
                          src="/images/CTA/Kickstarter_campaign_hero_golden-hour_flatlay_on_weathered_wo_4a9c8c21-4bb9-4405-92e6-2f1afd02976b_3.png"
                          alt="Community & Co-Creation"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
