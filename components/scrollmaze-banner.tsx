"use client"

import * as React from "react"
import { Dice5, Swords, BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScrollMazeBannerProps {
  messages: any
  onLearnMore?: () => void
}

export function ScrollMazeBanner({ messages, onLearnMore }: ScrollMazeBannerProps) {
  const features = [
    {
      icon: Dice5,
      title: messages.scrollMaze?.feature1Title || "Dungeon Exploration",
      description: messages.scrollMaze?.feature1Desc || "Lay out cards face-down to create an ever-changing maze. Flip cards to reveal rooms, roll dice to determine encounters."
    },
    {
      icon: Swords,
      title: messages.scrollMaze?.feature2Title || "Elemental Combat",
      description: messages.scrollMaze?.feature2Desc || "Battle monsters using the five-element system. Water douses fire, fire evaporates water - master the cycles to win."
    },
    {
      icon: BookOpen,
      title: messages.scrollMaze?.feature3Title || "Learn Through Play",
      description: messages.scrollMaze?.feature3Desc || "Understanding each card's meaning gives you tactical advantage. Learn tarot through engaging gameplay, not memorization."
    }
  ]

  return (
    <section id="scroll-maze" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/scrollmaze-cover.jpg"
          alt="ScrollMaze Board Game"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-purple-900/80 to-slate-900/90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-300" />
            <span className="text-sm font-medium text-purple-200">
              {messages.scrollMaze?.badge || "Phase 3"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            {messages.scrollMaze?.title || "Coming Soon: Scroll Maze"}
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {messages.scrollMaze?.subtitle || "Transform the Sunlight Tarot into a roguelike adventure game"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-3 mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-400/30 rounded-2xl p-8">
          <p className="text-lg text-gray-200 mb-6">
            {messages.scrollMaze?.stretchGoal || "Stretch goal for our crowdfunding campaign - help us bring this vision to life!"}
          </p>

          {onLearnMore && (
            <Button
              onClick={onLearnMore}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-purple-500/50 transition-all"
            >
              {messages.scrollMaze?.ctaButton || "Join the Adventure"}
            </Button>
          )}
        </div>

        {/* Decorative element */}
        <div className="mt-12 text-center opacity-50">
          <div className="inline-flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
