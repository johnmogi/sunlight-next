"use client"

import * as React from "react"
import Image from "next/image"
import { Loader2, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeroSliderProps {
  messages: any
}

const heroImages = [
  "/images/hero/cinematic_golden-hour_hero_banner_vast_desert_sunrise_behind__f1615440-53b2-44da-bb83-00a45ca34c4b_3.jpg",
  "/images/hero/Kickstarter_campaign_hero_golden-hour_flatlay_on_weathered_wo_4a9c8c21-4bb9-4405-92e6-2f1afd02976b_0.jpg",
  "/images/hero/Board_game_box_cover_for_Scroll_Maze_showing_adventure_throug_a1155554-e458-41ed-bca4-1d1d203ccedb_3.jpg",
  "/images/hero/httpss.mj.runrukxtL9LeI4_close-up_lifestyle_product_photograp_d917830c-b80f-4747-b1e8-1a7a9c545c8e_3.jpg",
  "/images/hero/Kickstarter_campaign_hero_golden-hour_flatlay_on_weathered_wo_4a9c8c21-4bb9-4405-92e6-2f1afd02976b_3.jpg"
]

// Inline form component within hero
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

        {/* Status Messages */}
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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-black">
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
          <div className="relative h-full w-full">
            <Image
              src={heroImages[currentSlide]}
              alt="SunLight Tarot Deck"
              fill
              className="object-cover"
              priority={currentSlide === 0}
              quality={90}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-between py-16">
        {/* Slide Indicators - Top */}
        <div className="flex space-x-2 pt-4">
          {heroImages.map((_, index) => (
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

        {/* Main Content - Center */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl space-y-6 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            {messages.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            {messages.hero.subtitle}
          </p>
        </motion.div>

        {/* Join Form - Bottom (Above the Fold) */}
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
  )
}
