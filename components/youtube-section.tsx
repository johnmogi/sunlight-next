"use client"

import * as React from "react"
import { Play } from "lucide-react"

interface YouTubeSectionProps {
  messages: any
}

export function YouTubeSection({ messages }: YouTubeSectionProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Play className="h-8 w-8 text-red-500" />
              <h2 className="text-3xl md:text-4xl font-bold">
                {messages.youtube?.title || "Watch the Journey"}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              {messages.youtube?.subtitle || "Explore the creation process and philosophy behind SunLight Tarot"}
            </p>
          </div>

          {/* YouTube Embed */}
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border border-border bg-black">
            {!isPlaying && (
              <div
                className="absolute inset-0 bg-cover bg-center cursor-pointer group"
                style={{ backgroundImage: `url(https://img.youtube.com/vi/p9U2U91XfiY/maxresdefault.jpg)` }}
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="bg-red-600 rounded-full p-6 group-hover:scale-110 transition-transform">
                    <Play className="h-12 w-12 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
            )}

            {isPlaying && (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/p9U2U91XfiY?autoplay=1&start=171"
                title="SunLight Tarot Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0"
              />
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {messages.youtube?.caption || "An album exploring consciousness and spiritual awakening"}
          </p>
        </div>
      </div>
    </section>
  )
}
