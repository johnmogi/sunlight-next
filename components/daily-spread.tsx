"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Sparkles, Sun, Moon, ChevronLeft, ChevronRight, X, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Prevent hydration errors by only rendering dialogs on client
function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

import { TAROT_CARDS as defaultCards } from "@/lib/card-sets/set-default"
import { TAROT_CARDS as newCards } from "@/lib/card-sets/set-update112"

interface DailySpreadProps {
  messages: any
}

interface DrawnCard {
  id: string
  name: string
  image: string
  type: string
  meaning: string
  reading: string
}

const cardTips = [
  {
    icon: "💭",
    text: "Reflection Card: Randomly drawn to show what requires your contemplation today. If it doesn't resonate, draw another until you find your match."
  },
  {
    icon: "⚡",
    text: "Activation Card: Choose the card that calls to you for action today. Let your intuition guide your selection."
  },
  {
    icon: "🌅",
    text: "Morning Ritual: Draw your Reflection card first thing in the morning to set your contemplative tone for the day."
  },
  {
    icon: "🌙",
    text: "Evening Practice: Choose your Activation card in the evening and carry its energy into tomorrow's actions."
  },
  {
    icon: "✨",
    text: "Trust the Process: If a card doesn't resonate immediately, take a moment to breathe and look deeper. Sometimes the message reveals itself slowly."
  }
]

export function DailySpread({ messages }: DailySpreadProps) {
  const hasMounted = useHasMounted()
  const sectionRef = React.useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  const [reflectionCard, setReflectionCard] = React.useState<DrawnCard | null>(null)
  const [activationCard, setActivationCard] = React.useState<DrawnCard | null>(null)
  const [isChoosingActivation, setIsChoosingActivation] = React.useState(false)
  const [selectedCardForDetail, setSelectedCardForDetail] = React.useState<DrawnCard | null>(null)
  const [currentTipIndex, setCurrentTipIndex] = React.useState(0)
  const [isFlipping, setIsFlipping] = React.useState(false)
  const [cards, setCards] = React.useState<any[]>([])

  React.useEffect(() => {
    setCards(newCards)
  }, [])

  const drawRandomCard = () => {
    if (isFlipping) return

    setIsFlipping(true)
    const randomIndex = Math.floor(Math.random() * cards.length)
    const card = cards[randomIndex]

    setTimeout(() => {
      setReflectionCard({
        id: card.id,
        name: card.name,
        image: card.image.startsWith('/') ? card.image : `/images/cards/${card.image}`,
        type: card.suit || card.type || "Major Arcana",
        meaning: card.meaning || "A card of transformation and growth",
        reading: card.keywords?.join(", ") || "Reflection, Growth, Awareness"
      })
      setIsFlipping(false)
    }, 600)
  }

  const chooseActivationCard = (card: any) => {
    setActivationCard({
      id: card.id,
      name: card.name,
      image: card.image.startsWith('/') ? card.image : `/images/cards/${card.image}`,
      type: card.suit || card.type || "Major Arcana",
      meaning: card.meaning || "A card of action and manifestation",
      reading: card.keywords?.join(", ") || "Action, Manifestation, Power"
    })
    setIsChoosingActivation(false)
  }

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % cardTips.length)
  }

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + cardTips.length) % cardTips.length)
  }

  const openCardDetail = (card: DrawnCard) => {
    setSelectedCardForDetail(card)
  }

  return (
    <section id="daily-spread" ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 opacity-35 dark:opacity-25 will-change-transform"
      >
        <Image
          src="/images/CTA/same_as_2_but_add_subtle_floating_petals_and_gentle_sunrise_r_c4c022dd-210e-49f1-9fdd-95c6097bd155_2.png"
          alt="Daily Spread Background"
          fill
          className="object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-amber-50/80 dark:from-slate-900/90 dark:via-slate-900/50 dark:to-slate-900/90" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {messages.daily.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {messages.daily.description}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            {messages.daily.intro}
          </p>
        </motion.div>

        {/* Card Tips Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative bg-gradient-to-r from-amber-100 to-orange-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 shadow-lg">
            <button
              onClick={prevTip}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-600/80 hover:bg-white dark:hover:bg-slate-600 rounded-full p-2 transition-all shadow-md"
              aria-label="Previous tip"
            >
              <ChevronLeft className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTipIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-4 px-12"
              >
                <div className="text-4xl flex-shrink-0">{cardTips[currentTipIndex].icon}</div>
                <p className="text-center text-gray-700 dark:text-gray-200 font-medium">
                  {cardTips[currentTipIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={nextTip}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-600/80 hover:bg-white dark:hover:bg-slate-600 rounded-full p-2 transition-all shadow-md"
              aria-label="Next tip"
            >
              <ChevronRight className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </button>

            {/* Tip Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {cardTips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTipIndex(index)}
                  className={`transition-all duration-300 rounded-full ${index === currentTipIndex
                    ? "w-8 h-2 bg-amber-600 dark:bg-amber-400"
                    : "w-2 h-2 bg-amber-300 dark:bg-slate-500 hover:bg-amber-400 dark:hover:bg-slate-400"
                    }`}
                  aria-label={`Go to tip ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card Spread */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Reflection Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Moon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {messages.daily.reflectionTitle}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {messages.daily.reflectionDesc}
              </p>
            </div>

            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              <AnimatePresence mode="wait">
                {reflectionCard ? (
                  <motion.div
                    key={reflectionCard.id}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 cursor-pointer rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
                    onClick={() => openCardDetail(reflectionCard)}
                  >
                    <Image
                      src={reflectionCard.image}
                      alt={reflectionCard.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center"
                  >
                    <Moon className="w-24 h-24 text-white/40" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center">
              <Button
                onClick={drawRandomCard}
                disabled={isFlipping}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {reflectionCard ? messages.daily.redrawBtn : messages.daily.drawBtn}
              </Button>
            </div>
          </motion.div>

          {/* Activation Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Sun className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {messages.daily.activationTitle}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {messages.daily.activationDesc}
              </p>
            </div>

            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              <AnimatePresence mode="wait">
                {activationCard ? (
                  <motion.div
                    key={activationCard.id}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 cursor-pointer rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
                    onClick={() => openCardDetail(activationCard)}
                  >
                    <Image
                      src={activationCard.image}
                      alt={activationCard.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-2xl flex items-center justify-center"
                  >
                    <Sun className="w-24 h-24 text-white/40" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center">
              <Button
                onClick={() => setIsChoosingActivation(true)}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-6 text-lg shadow-lg"
              >
                <Sun className="mr-2 h-5 w-5" />
                {activationCard ? messages.daily.rechooseBtn : messages.daily.chooseBtn}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Card Selection Modal - Only render on client */}
        {hasMounted && (
          <Dialog open={isChoosingActivation} onOpenChange={setIsChoosingActivation}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  {messages.daily.modalTitle}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-6">
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    onClick={() => chooseActivationCard(card)}
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={card.image.startsWith('/') ? card.image : `/images/cards/${card.image}`}
                        alt={card.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-800">
                      <p className="text-xs font-medium text-center truncate">
                        {card.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Card Detail Modal - Only render on client */}
        {hasMounted && (
          <Dialog open={!!selectedCardForDetail} onOpenChange={() => setSelectedCardForDetail(null)}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="sr-only">
                  {selectedCardForDetail?.name || 'Card Details'}
                </DialogTitle>
              </DialogHeader>
              {selectedCardForDetail && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Card Image */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={selectedCardForDetail.image}
                      alt={selectedCardForDetail.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Card Info */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedCardForDetail.name}
                      </h2>
                      <p className="text-lg text-amber-600 dark:text-amber-400 font-semibold">
                        {selectedCardForDetail.type}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        {messages.cardDetail?.meaning || 'Meaning'}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedCardForDetail.meaning}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {messages.cardDetail?.keywords || 'Keywords'}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedCardForDetail.reading}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
