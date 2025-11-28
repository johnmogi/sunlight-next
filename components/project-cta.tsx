"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCtaProps {
  messages: any
}

const ctaSlides = [
  {
    image: "/images/CTA/cinematic_golden-hour_hero_banner_vast_desert_sunrise_behind__f1615440-53b2-44da-bb83-00a45ca34c4b_3.png",
    titleKey: "cta.slide1.title",
    descriptionKey: "cta.slide1.description",
    highlightKey: "cta.slide1.highlight"
  },
  {
    image: "/images/CTA/Kickstarter_campaign_hero_golden-hour_flatlay_on_weathered_wo_4a9c8c21-4bb9-4405-92e6-2f1afd02976b_3.png",
    titleKey: "cta.slide2.title",
    descriptionKey: "cta.slide2.description",
    highlightKey: "cta.slide2.highlight"
  },
  {
    image: "/images/CTA/same_as_2_but_add_subtle_floating_petals_and_gentle_sunrise_r_c4c022dd-210e-49f1-9fdd-95c6097bd155_2.png",
    titleKey: "cta.slide3.title",
    descriptionKey: "cta.slide3.description",
    highlightKey: "cta.slide3.highlight"
  },
  {
    image: "/images/CTA/Board_game_box_cover_for_Scroll_Maze_showing_adventure_throug_a1155554-e458-41ed-bca4-1d1d203ccedb_2.png",
    titleKey: "cta.slide4.title",
    descriptionKey: "cta.slide4.description",
    highlightKey: "cta.slide4.highlight"
  }
]

export function ProjectCta({ messages }: ProjectCtaProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [direction, setDirection] = React.useState(0)

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % ctaSlides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + ctaSlides.length) % ctaSlides.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  // Auto-advance slides
  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 7000)

    return () => clearInterval(timer)
  }, [currentSlide])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-20">
        <div className="relative mx-auto max-w-6xl">
          {/* Slide Content */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={ctaSlides[currentSlide].image}
                    alt={messages[ctaSlides[currentSlide].titleKey] || "SunLight Project"}
                    fill
                    className="object-cover"
                    priority={currentSlide === 0}
                    quality={90}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex h-full items-center">
                  <div className="px-8 md:px-16 max-w-2xl space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                        {messages[ctaSlides[currentSlide].titleKey]}
                      </h2>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                        {messages[ctaSlides[currentSlide].descriptionKey]}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="inline-block"
                    >
                      <div className="bg-gradient-to-r from-amber-500/90 to-orange-600/90 backdrop-blur-sm px-6 py-3 rounded-lg">
                        <p className="text-white font-semibold text-lg">
                          {messages[ctaSlides[currentSlide].highlightKey]}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 transition-all duration-200 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 transition-all duration-200 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {ctaSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-12 h-3 bg-gradient-to-r from-amber-500 to-orange-600"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Phase Overview */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-3">
                Phase 1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {messages.cta.phase1.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {messages.cta.phase1.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-3">
                Phase 2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {messages.cta.phase2.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {messages.cta.phase2.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-3">
                Phase 3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {messages.cta.phase3.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {messages.cta.phase3.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
