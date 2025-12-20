"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface CardLabProps {
    messages: any
    locale: string
}

export function CardLab({ messages, locale }: CardLabProps) {
    const [activeFilter, setActiveFilter] = React.useState('all')

    const cardBacks = [
        "/images/cardbacks/Tarot_card_poster_composition_with_golden_ratio_and_radiant_s_a02d1721-1572-47ff-839b-fb3f667b905f_2.jpg",
        "/images/cardbacks/Tarot_deck_box_cover_design_showing_the_Sun_card_reimagined_a_de799369-9b28-4ca7-8de5-bdcc6f8c1178_1.jpg",
        "/images/cardbacks/full-color_cover_illustration_of_the_sunlight_tarot_deck_feat_aa90b5dc-7876-41f9-a7e5-1b3ed93d66da_0.jpg",
        "/images/cardbacks/httpss.mj.run3QIydYaW0NU_Tarot_deck_box_cover_design_showing__f85dd966-05a2-43c4-976d-7f6a7b65c482_0.jpg"
    ]

    const packaging = [
        "/images/cardbacks/Tarot_Deck_Box_Outer_Box_The_box_that_holds_the_complete_Sunl_71cf3ac0-38d5-4edf-ae27-7c02e41249ad_1.jpg",
        "/images/cardbacks/httpss.mj.runywZYwKIWRfY_Tarot_Deck_Box_Outer_Box_The_box_tha_ef2cb837-7fa7-469b-8d72-bd1cbab540a8_0.jpg"
    ]

    const sketches: string[] = [

    ]

    // Normalize data for the gallery
    const galleryItems = [
        ...cardBacks.map((src, i) => ({ id: `back-${i}`, src, category: 'biomimicry', title: `Card Back Concept #${i + 1}` })),
        ...packaging.map((src, i) => ({ id: `pkg-${i}`, src, category: 'packaging', title: `Packaging Prototype #${i + 1}` })),
        ...sketches.map((src, i) => ({ id: `sketch-${i}`, src, category: 'sketches', title: `Pencil Sketch #${i + 1}` }))

    ]

    const filteredItems = activeFilter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeFilter)

    const filters = [
        { id: 'all', label: 'All Work' },
        { id: 'biomimicry', label: 'Card Backs' },
        { id: 'packaging', label: 'Packaging' },
        { id: 'sketches', label: 'Sketches' },
    ]

    return (
        <section className="py-20 bg-slate-100 dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Work in Progress
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {messages.studio?.lab?.subtitle || "Designing the vessel. Card backs, boxes, and the physical manifestations of the deck."}
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {filters.map((filter) => (
                        <Button
                            key={filter.id}
                            variant={activeFilter === filter.id ? "default" : "outline"}
                            onClick={() => setActiveFilter(filter.id)}
                            className={cn(
                                "transition-all",
                                activeFilter === filter.id && "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                            )}
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <Dialog key={item.id}>
                            <DialogTrigger asChild>
                                <div className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-zoom-in">
                                    <div className="relative aspect-[2/3] overflow-hidden">
                                        <Image
                                            src={item.src}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <span className="text-white text-sm font-medium">{item.title}</span>
                                        </div>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none">
                                <div className="relative aspect-[2/3] w-full h-[80vh]">
                                    <Image src={item.src} alt={item.title} fill className="object-contain" />
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No items found in this category.
                    </div>
                )}

            </div>
        </section>
    )
}
