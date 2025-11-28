"use client"

import * as React from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AboutSectionProps {
  messages: any
}

export function AboutSection({ messages }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10 dark:opacity-5"
          style={{
            backgroundImage: `url(/images/backgrounds/parallax-bg.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {messages.about?.title || "The SunLight Philosophy"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {messages.about?.description || "A reimagined tarot system based on ancient wisdom and modern understanding"}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="babylon" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-muted/50 p-2">
              <TabsTrigger value="babylon" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
                {messages.aboutTabs?.babylon || "The Babylon Tower"}
              </TabsTrigger>
              <TabsTrigger value="rosetta" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
                {messages.aboutTabs?.rosetta || "The Sun Rosetta"}
              </TabsTrigger>
              <TabsTrigger value="transformations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
                {messages.aboutTabs?.transformations || "Transformations"}
              </TabsTrigger>
              <TabsTrigger value="enneagram" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
                {messages.aboutTabs?.enneagram || "Enneagram"}
              </TabsTrigger>
              <TabsTrigger value="fifth" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
                {messages.aboutTabs?.fifth || "Aether Element"}
              </TabsTrigger>
            </TabsList>

            {/* Babylon Tower Tab */}
            <TabsContent value="babylon" className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
                {/* Hero Image */}
                <div className="relative w-full overflow-hidden rounded-lg" style={{ maxHeight: '500px', height: '500px' }}>
                  <Image
                    src="/images/about/lighthouse.jpg"
                    alt="The Rebuilt Lighthouse"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                </div>

                <h3 className="text-2xl font-bold">
                  {messages.tabContent?.babylonTitle || "The Rebuilt Lighthouse"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Tower of Babylon reimagined as an active lighthouse and vertical paradise. Every crack filled with blooming lavender and climbing roses, inhabitants tending gardens at multiple levels, the bright beacon guiding distant travelers home. Four angels plant seeds at the foundation. This is destruction becoming creation, ruins as fertile ground, architecture serving collective good rather than individual ambition.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="intro">
                    <AccordionTrigger className="text-lg font-semibold">
                      The Tower Reimagined
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <p>
                        The Tower of Babylon reimagined as active lighthouse and vertical paradise. Every crack filled with blooming lavender and climbing roses, inhabitants tending gardens at multiple levels, the bright beacon guiding distant travelers home.
                      </p>
                      <p>
                        Four angels plant seeds at the foundation. This is destruction becoming creation, ruins as fertile ground, architecture serving collective good rather than individual ambition. The gift of guidance freely given.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="principles">
                    <AccordionTrigger className="text-lg font-semibold">
                      Key Principles
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <div>
                          <strong className="text-amber-600 dark:text-amber-400">Unity Through Diversity:</strong>
                          <p className="text-sm text-muted-foreground mt-1">Multiple interpretations strengthening one truth</p>
                        </div>
                        <div>
                          <strong className="text-amber-600 dark:text-amber-400">Vertical Integration:</strong>
                          <p className="text-sm text-muted-foreground mt-1">Connecting base consciousness to higher awareness</p>
                        </div>
                        <div>
                          <strong className="text-amber-600 dark:text-amber-400">Collective Wisdom:</strong>
                          <p className="text-sm text-muted-foreground mt-1">Building together what cannot stand alone</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="language">
                    <AccordionTrigger className="text-lg font-semibold">
                      Universal Language of Symbols
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        Where the original tower fell through confusion of language, our deck reunifies through the universal language of symbols. Each card becomes a step in the ascent, a shared tongue that transcends cultural barriers.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Sun Rosetta Tab */}
            <TabsContent value="rosetta" className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
                {/* Hero Image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/about/sun-rosetta.jpg"
                    alt="The Sun Rosetta Stone"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                </div>

                <h3 className="text-2xl font-bold">
                  {messages.tabContent?.rosettaTitle || "The Sun Rosetta Stone"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Sun is pure consciousness, the origin from which four elemental energies descend to become the four Aces—the Seeds of Light. By centering the Sun as our philosophical anchor, we acknowledge that all spiritual systems ultimately point toward enlightenment. When you place the four Ace cards around the Sun card, a profound hidden teaching reveals itself.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="origin">
                    <AccordionTrigger className="text-lg font-semibold">
                      The Origin Card
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <p>
                        The origin card, pure consciousness radiating as golden light. Four angels orbit this central source, each representing one element descending from unity. This is the Rosetta Stone of the entire deck, showing how air, fire, water, and earth emerge from a single radiant awareness.
                      </p>
                      <p>
                        When you place the four Ace cards around the Sun card, a profound hidden teaching reveals itself about the true nature and limitations of each element.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="consciousness">
                    <AccordionTrigger className="text-lg font-semibold">
                      Pure Consciousness
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        The Sun is pure consciousness, the origin from which four elemental energies descend to become the four Aces—the Seeds of Light. By centering the Sun as our philosophical anchor, we acknowledge that all spiritual systems ultimately point toward enlightenment.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Card Transformations Tab */}
            <TabsContent value="transformations" className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
                {/* Infographic Image */}
                <div className="relative w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src="/images/about/infographiceeng.png"
                    alt="Card Transformations Infographic"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>

                <h3 className="text-2xl font-bold">
                  {messages.tabContent?.transformationsTitle || "Card Transformations"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Sunlight Tarot transforms traditional imagery to create a psychologically healing 'white deck' rather than a fear-based 'black deck.' Where most tarots begin with the Fool's journey from ignorance to wisdom, we begin with the Sun itself. Our cards are designed not for fortune-telling but for lucid dreaming and conscious living.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="white-deck">
                    <AccordionTrigger className="text-lg font-semibold">
                      The White Deck Philosophy
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <p>
                        The Sunlight Tarot transforms traditional imagery to create a psychologically healing 'white deck' rather than a fear-based 'black deck.' Where most tarots begin with the Fool's journey from ignorance to wisdom, we begin with the Sun itself.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="healing">
                    <AccordionTrigger className="text-lg font-semibold">
                      Tarot as Therapeutic Tool
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        Our cards are designed not for fortune-telling but for lucid dreaming and conscious living, transforming dark imagery into empowering symbols that heal rather than frighten. This is tarot as therapeutic tool.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Enneagram Tab */}
            <TabsContent value="enneagram" className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
                <h3 className="text-2xl font-bold">
                  {messages.tabContent?.enneagramTitle || "The Enneagram Integration"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Enneagram, an ancient symbol of nine personality types and spiritual paths, forms the structural backbone of the SunLight system. By combining the rich symbolism of tarot cards with the ancient ninefold system, we have restored the original hidden meanings. This integration transforms readings from fortune-telling to personality mapping, from prediction to self-understanding.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="backbone">
                    <AccordionTrigger className="text-lg font-semibold">
                      Structural Backbone
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <p>
                        The Enneagram, an ancient symbol of nine personality types and spiritual paths, forms the structural backbone of the SunLight system. By combining the rich symbolism of tarot cards with the ancient ninefold system, we have restored the original hidden meanings.
                      </p>
                      <p>
                        The Enneagram provides the missing key that unlocks the deeper wisdom encoded in traditional tarot imagery, revealing connections that earlier systems could only hint at.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="transformation">
                    <AccordionTrigger className="text-lg font-semibold">
                      From Fortune-Telling to Self-Understanding
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        This integration transforms readings from fortune-telling to personality mapping, from prediction to self-understanding. Each spread becomes a mirror of the soul's current position on its journey.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Aether Element Tab */}
            <TabsContent value="fifth" className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
                <h3 className="text-2xl font-bold">
                  {messages.tabContent?.fifthTitle || "The Aether Element"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We have elevated the Major Arcana into the Aether Element - Spirit, Consciousness itself. The Major Arcana IS the Aether Element - the organizing principle that contains and transcends Air, Fire, Water, and Earth. The Aether Element cards describe WHO you are at the level of soul and archetype, while the four elemental suits describe HOW consciousness manifests.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="elevation">
                    <AccordionTrigger className="text-lg font-semibold">
                      Elevating the Major Arcana
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <p>
                        We have elevated the Major Arcana into the Aether Element - Spirit, Consciousness itself. This is not merely reorganization but a fundamental reconception of archetypal wisdom.
                      </p>
                      <p>
                        The Major Arcana IS the Aether Element - the organizing principle that contains and transcends Air, Fire, Water, and Earth. Consciousness is not separate from matter; it's the medium through which all elements manifest.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="manifestation">
                    <AccordionTrigger className="text-lg font-semibold">
                      Consciousness in Manifestation
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        The Aether Element cards describe WHO you are at the level of soul and archetype, while the four elemental suits describe HOW consciousness manifests through thought, will, emotion, and matter.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
