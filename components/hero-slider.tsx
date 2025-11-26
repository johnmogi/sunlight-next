"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

interface HeroSliderProps {
  messages: any
  onJoinClick: () => void
}

const heroImages = [
  "/images/hero/Professional_product_photography_showing_complete_Sunlight_Ta_248c090a-1c66-4314-af24-c42e4cbe4a2c_3.jpg",
  "/images/hero/Professional_product_photography_showing_complete_Sunlight_Ta_dab0b734-af2d-4d1c-83fe-70f39c7759f0_0.jpg",
  "/images/hero/Lifestyle_product_photography_showing_hands_interacting_with__1749cf23-e461-4e12-b6bd-7b8b13fdc29e_3.jpg",
  "/images/hero/httpss.mj.run0IQrGhxpiSk_httpss.mj.rung4W2tiBad54_Professiona_61a0086b-6914-459c-b962-717197bcb3d8_2.jpg"
]

export function HeroSlider({ messages, onJoinClick }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
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
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            {messages.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            {messages.hero.subtitle}
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              onClick={onJoinClick}
              className="text-lg px-8 py-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {messages.hero.cta}
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
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
      </div>
    </section>
  )
}
