"use client"

import * as React from "react"
import Image from "next/image"
import { Loader2, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
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

// NOTE FOR AI: The user wants to change the images.
// Angle 1 (Healing): Use the "Ace of Flowers" prompt - boy pulling a rose from a stone.
// Angle 2 (Dreaming): Use the "Night Awakener" (Lili with book and moon).
// Angle 3 (Building): Use a flat-lay of sketches, pencils, on a wooden table.
const ctaSlides = [
  {
    image: "/images/CTA/Board_game_box_cover_for_Scroll_Maze_showing_adventure_throug_a1155554-e458-41ed-bca4-1d1d203ccedb_3.png",
    titleKey: "hero.builder.title",
    descriptionKey: "hero.builder.subtitle",
    ctaKey: "hero.builder.cta",
    ctaSecondaryKey: "hero.builder.ctaSecondary",
    angle: "builder",
    ctaAction: "scroll",
    ctaTarget: "#complete-deck",
    ctaSecondaryAction: "scroll",
    ctaSecondaryTarget: "#about",
  },
  {
    image: "/images/CTA/cinematic_golden-hour_hero_banner_vast_desert_sunrise_behind__f1615440-53b2-44da-bb83-00a45ca34c4b_1.png",
    titleKey: "hero.healer.title",
    descriptionKey: "hero.healer.subtitle",
    ctaKey: "hero.healer.cta",
    ctaSecondaryKey: "hero.healer.ctaSecondary",
    angle: "healer",
    ctaAction: "scroll",
    ctaTarget: "#complete-deck",
    ctaSecondaryAction: "scroll",
    ctaSecondaryTarget: "#healing-section",
  },
  {
    image: "/images/CTA/Kickstarter_campaign_hero_golden-hour_flatlay_on_weathered_wo_4a9c8c21-4bb9-4405-92e6-2f1afd02976b_3.png",
    titleKey: "hero.dreamer.title",
    descriptionKey: "hero.dreamer.subtitle",
    ctaKey: "hero.dreamer.cta",
    ctaSecondaryKey: "hero.dreamer.ctaSecondary",
    angle: "dreamer",
    ctaAction: "scroll",
    ctaTarget: "#daily-spread",
    ctaSecondaryAction: "modal",
    ctaSecondaryTarget: null,
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
    <div id="join-form" className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border-2 border-white/40 rounded-2xl p-8 shadow-2xl overflow-hidden scroll-mt-20">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/30 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
            {messages.join.title}
          </h2>
          <p className="text-white text-base md:text-lg max-w-3xl mx-auto font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
            {messages.join.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder={messages.join.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
              className="bg-white/95 border-white/40 flex-1 h-12 text-base shadow-sm"
            />
            <Input
              type="email"
              placeholder={messages.join.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="bg-white/95 border-white/40 flex-1 h-12 text-base shadow-sm"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold whitespace-nowrap sm:w-auto w-full h-12 px-8 shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                messages.join.submit
              )}
            </Button>
          </div>

          <div className="text-center min-h-[24px]">
            {status === 'success' && (
              <div className="flex items-center justify-center gap-2 text-green-300 font-semibold text-sm bg-green-900/30 py-2 px-4 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
                {messages.join.success}
              </div>
            )}

            {status === 'error' && (
              <p className="text-red-300 font-semibold text-sm bg-red-900/30 py-2 px-4 rounded-lg">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export function HeroSlider({ messages }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isSupportModalOpen, setIsSupportModalOpen] = React.useState(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ctaSlides.length)
    }, 18000) // 18 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ctaSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ctaSlides.length) % ctaSlides.length)
  }

  const handleCTAClick = (action: "scroll" | "modal" | null, target: string | null) => {
    if (action === 'scroll' && target) {
      document.querySelector(target)?.scrollIntoView({
        behavior: 'smooth'
      });
    } else if (action === 'modal') {
      setIsSupportModalOpen(true);
    }
  };

  const slide = ctaSlides[currentSlide];

  return (
    <>
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Background Slider - Crossfade */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full min-h-[100vh]">
              <Image
                src={slide.image}
                alt={getNestedProperty(messages, slide.titleKey) || "SunLight Project"}
                fill
                className="object-cover"
                priority={currentSlide === 0}
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-between py-20 min-h-[100vh]">
          {/* Main Content - Center (Dynamic per slide) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="flex-1 flex flex-col items-center justify-center max-w-4xl space-y-6 text-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)' }}>
                {getNestedProperty(messages, slide.titleKey)}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)' }}>
                {getNestedProperty(messages, slide.descriptionKey)}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                <Button
                  size="lg"
                  onClick={() => handleCTAClick(slide.ctaAction as any, slide.ctaTarget)}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg px-8 py-6 shadow-2xl"
                >
                  {getNestedProperty(messages, slide.ctaKey)}
                </Button>
                {/* Secondary CTA removed */}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Section: Join Form and Indicators */}
          <div className="w-full max-w-4xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <HeroJoinForm messages={messages} />
            </motion.div>

            {/* Slide Indicators - Bottom */}
            <div className="flex justify-center space-x-3 pb-4">
              {ctaSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                    ? "w-10 bg-white shadow-lg"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
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
