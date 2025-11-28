"use client"

import * as React from "react"
import { Music } from "lucide-react"

interface SpotifySectionProps {
  messages: any
}

export function SpotifySection({ messages }: SpotifySectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Music className="h-8 w-8 text-green-500" />
              <h2 className="text-3xl md:text-4xl font-bold">
                {messages.spotify?.title || "Listen & Learn"}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              {messages.spotify?.subtitle || "Hebrew podcast about the SunLight Tarot journey"}
            </p>
          </div>

          {/* Spotify Embed */}
          <div className="rounded-lg overflow-hidden shadow-2xl border border-border">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/episode/6clnzu4kCuAMg3xvL0pOgd?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            🇮🇱 Hebrew Version | פודקאסט בעברית
          </p>
        </div>
      </div>
    </section>
  )
}
