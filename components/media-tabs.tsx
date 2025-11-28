"use client"

import * as React from "react"
import { Music, Play } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MediaTabsProps {
  messages: any
  locale: string
}

export function MediaTabs({ messages, locale }: MediaTabsProps) {
  const [isYouTubePlaying, setIsYouTubePlaying] = React.useState(false)

  // Only show Hebrew podcast in Hebrew locale
  const showPodcast = locale === 'he'

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {messages.media?.title || "Explore the Journey"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {messages.media?.subtitle || "Dive deeper into the SunLight Tarot through sound and vision"}
            </p>
          </div>

          <Tabs defaultValue={showPodcast ? "podcast" : "video"} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto" style={{ gridTemplateColumns: showPodcast ? '1fr 1fr' : '1fr' }}>
              {showPodcast && (
                <TabsTrigger value="podcast" className="gap-2">
                  <Music className="h-4 w-4" />
                  {messages.media?.podcastTab || "Podcast"}
                </TabsTrigger>
              )}
              <TabsTrigger value="video" className="gap-2">
                <Play className="h-4 w-4" />
                {messages.media?.videoTab || "Video"}
              </TabsTrigger>
            </TabsList>

            {/* Podcast Tab (Hebrew only) */}
            {showPodcast && (
              <TabsContent value="podcast" className="mt-8">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {messages.spotify?.title || "Listen & Learn"}
                  </h3>
                  <p className="text-muted-foreground">
                    {messages.spotify?.subtitle || "Hebrew podcast about the SunLight Tarot journey"}
                  </p>
                </div>

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
              </TabsContent>
            )}

            {/* Video Tab */}
            <TabsContent value="video" className="mt-8">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  {messages.youtube?.title || "Watch the Journey"}
                </h3>
                <p className="text-muted-foreground">
                  {messages.youtube?.subtitle || "Explore the creation process and philosophy"}
                </p>
              </div>

              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border border-border bg-black">
                {!isYouTubePlaying && (
                  <div
                    className="absolute inset-0 bg-cover bg-center cursor-pointer group"
                    style={{ backgroundImage: `url(https://img.youtube.com/vi/p9U2U91XfiY/maxresdefault.jpg)` }}
                    onClick={() => setIsYouTubePlaying(true)}
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-6 group-hover:scale-110 transition-transform">
                        <Play className="h-12 w-12 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                )}

                {isYouTubePlaying && (
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
