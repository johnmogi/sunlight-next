"use client"

import * as React from "react"
import Image from "next/image"
import { Loader2, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SupportModal } from "@/components/support-modal"

interface HeroSliderProps {
  messages: any
}

// Helper function to access nested properties using dot notation
function getNestedProperty(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || ''
}

const ctaSlides = [
  {
    image: "/images/CTA/cinematic_golden-hour_hero_banner_vast_desert_sunrise_behind__f1615440-53b2-44da-bb83-00a45ca34c4b_1.png",
    titleKey: "cta.slide1.title",
    descriptionKey: "cta.slide1.description",
    ctaKey: "cta.slide1.cta"
  },
  {
    image: "/images/CTA/Kickstarter_campaign_hero_golden-hour_flatlay_on_weathered_wo_4a9c8c21-4bb9-4405-92e6-2f1afd02976b_3.png",
    titleKey: "cta.slide2.title",
    descriptionKey: "cta.slide2.description",
    ctaKey: "cta.slide2.cta"
  },
  {
    image: "/images/CTA/Board_game_box_cover_for_Scroll_Maze_showing_adventure_throug_a1155554-e458-41ed-bca4-1d1d203ccedb_3.png",
    titleKey: "cta.slide3.title",
    descriptionKey: "cta.slide3.description",
    ctaKey: "cta.slide3.cta"
  },
  {
    image: "/images/CTA/Board_game_box_cover_for_Scroll_Maze_showing_adventure_throug_9c5ce8d3-034e-441d-8363-9075040d6ec7_3.png",
    titleKey: "cta.slide4.title",
    descriptionKey: "cta.slide4.description",
    ctaKey: "cta.slide4.cta"
  }
]

function HeroJoinForm({ messages }: { messages: any }) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setName("")
        setEmail("")
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || messages.join.error)
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(messages.join.error)
      setTimeout(() => setStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-2xl">
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          {messages.join.title}
        </h2>
        <p className="text-white/80 text-sm mt-1">
          {messages.join.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder={messages.join.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            className="bg-white/90 border-white/30 flex-1"
          />
          <Input
            type="email"
            placeholder={messages.join.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="bg-white/90 border-white/30 flex-1"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white whitespace-nowrap sm:w-auto w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              messages.join.submit
            )}
          </Button>
        </div>

        <div className="text-center min-h-[20px]">
          {status === 'success' && (
            <div className="flex items-center justify-center gap-2 text-green-300 font-medium text-sm">
              <CheckCircle2 className="h-4 w-4" />
              {messages.join.success}
            </div>
          )}

          {status === 'error' && (
            <p className="text-red-300 font-medium text-sm">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export function HeroSlider({ messages }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isSupportModalOpen, setIsSupportModalOpen] = React.useState(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ctaSlides.length)
    }, 7000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -mt-20">
        {/* Background Slider - Crossfade */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full min-h-[90vh]">
              <Image
                src={ctaSlides[currentSlide].image}
                alt={getNestedProperty(messages, ctaSlides[currentSlide].titleKey) || "SunLight Project"}
                fill
                className="object-cover"
                priority={currentSlide === 0}
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-between py-16 min-h-[90vh]">
          {/* Slide Indicators - Top */}
          <div className="flex space-x-2 pt-4">
            {ctaSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Main Content - Center (Dynamic per slide) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl space-y-8 text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                {getNestedProperty(messages, ctaSlides[currentSlide].titleKey)}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                {getNestedProperty(messages, ctaSlides[currentSlide].descriptionKey)}
              </p>
              <Button
                size="lg"
                onClick={() => setIsSupportModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg px-8 py-6 shadow-2xl"
              >
                {getNestedProperty(messages, ctaSlides[currentSlide].ctaKey)}
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Join Form - Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-4xl pb-4"
          >
            <HeroJoinForm messages={messages} />
          </motion.div>
        </div>
      </section>

      {/* Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        messages={messages}
      />
    </>
  )
}
