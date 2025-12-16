"use client"

import * as React from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Shirt, BookOpen, Palette, Flower, PenTool } from "lucide-react"

interface StudioTabsProps {
    messages: any
    locale: string
}

export function StudioTabs({ messages, locale }: StudioTabsProps) {
    // Mock data derived from file list
    const shirts = [
        "/images/artwork/artwork/httpss.mj.run2RpvdRkIFDI_white_background_t_shirt_tarot_card__d0af452d-bcd6-49f2-84f1-2cce777d5a02_1.jpg",
        "/images/artwork/artwork/httpss.mj.run8e7LB-iVmDk_white_background_t_shirt_tarot_card__db4b5c90-30fc-4d9c-a292-9f96750f5e15_2.jpg",
        "/images/artwork/artwork/httpss.mj.runQ4-HyBl99es_white_background_t_shirt_tarot_card__6e2d6c36-2606-409f-ad41-6233e20073dc_2.jpg"
    ]

    const coloringPages = [
        "/images/coloringbook/childrens_coloring_book_page_coloring_book_cover_powerful_Ind_d0657514-fbe2-4d2c-8ea4-526722d048f3_0.jpg",
        "/images/coloringbook/childrens_coloring_book_page_coloring_book_cover_young_advent_4197afa7-2a0b-4b9f-ad83-956351fb5cf7_0.jpg",
        "/images/coloringbook/childrens_coloring_book_page_white_background_black_outline_o_0a21774c-5a6f-4460-81dc-68c2acf9a652_0.jpg",
        "/images/coloringbook/The_Day_Dreamer_tarot_card_coloring_book_line_art_white_backg_d6a8b0b8-365b-4ecd-8681-b8edf9d6d70e_0.jpg"
    ]

    const artwork = [
        "/images/artwork/artwork/Cover_3_-_Galactic_Rose_Tree_of_Life_Lush_Tree_of_Life_whose__4301ae5e-1982-4dbf-8c41-7c0d0498e967_2.jpg",
        "/images/artwork/artwork/Double_exposure_art_extreme_close-up_of_a_Sunflowers_center_w_c8930872-cada-4121-90c9-0ddcf898320f_2.jpg",
        "/images/artwork/artwork/pure_soft_watercolor_movie_poster_no_outlines_no_ink_Lili_flo_1ebc84eb-e9a8-4ac7-afbe-50a3fec483a1_1.jpg",
        "/images/artwork/artwork/pure_soft_watercolor_painting_double_exposure_tarot_card_no_i_10b0bbc3-61c3-46fc-8924-c9ecb4e59af8_0.jpg"
    ]

    return (
        <section className="py-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {messages.studio?.tabs?.title || "The Creative Lab"}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {messages.studio?.tabs?.subtitle || "Explore the prototypes, the art, and the daily inspiration."}
                    </p>
                </div>

                <Tabs defaultValue="shirts" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
                        <TabsTrigger value="shirts" className="gap-2"><Shirt className="w-4 h-4" /> Apparel</TabsTrigger>
                        <TabsTrigger value="coloring" className="gap-2"><Palette className="w-4 h-4" /> Coloring</TabsTrigger>
                        <TabsTrigger value="artwork" className="gap-2"><Flower className="w-4 h-4" /> Artwork</TabsTrigger>
                        <TabsTrigger value="diary" className="gap-2"><BookOpen className="w-4 h-4" /> Diary</TabsTrigger>
                    </TabsList>

                    {/* SHIRTS CONTENT */}
                    <TabsContent value="shirts" className="focus:outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {shirts.map((src, i) => (
                                <div key={i} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                                    <Image src={src} alt={`Shirt Design ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white font-medium text-sm">Design Prototype #{i + 1}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center text-muted-foreground">
                            <p>Limited Edition Sunlight Apparel. Coming soon to the backers.</p>
                        </div>
                    </TabsContent>

                    {/* COLORING CONTENT */}
                    <TabsContent value="coloring" className="focus:outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coloringPages.map((src, i) => (
                                <div key={i} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-white border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all cursor-pointer">
                                    <Image src={src} alt={`Coloring Page ${i + 1}`} fill className="object-cover opacity-90 group-hover:opacity-100" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-bold text-slate-800 shadow-sm">Preview</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center text-muted-foreground">
                            <p>Downloadable high-res pages available for Inner Circle members.</p>
                        </div>
                    </TabsContent>

                    {/* ARTWORK CONTENT */}
                    <TabsContent value="artwork" className="focus:outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {artwork.map((src, i) => (
                                <div key={i} className="group relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg">
                                    <Image src={src} alt={`Artwork ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center text-muted-foreground">
                            <p>Concepts and visions from the Sunlight studio.</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="diary" className="min-h-[400px] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div className="relative h-48 w-full">
                            <Image
                                src="/images/tilt-shifted_golden-ratio_lifestyle_bundle_banner_open_guideb_278aa4d9-7695-49be-b98d-45423fff3833_0.jpg"
                                alt="Diary Banner"
                                fill
                                className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
                            <div className="absolute bottom-4 left-6">
                                <h3 className="text-2xl font-serif font-bold flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-amber-600" />
                                    Lily's Diary
                                </h3>
                            </div>
                        </div>

                        <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
                            <div className="prose dark:prose-invert">
                                <p className="italic text-lg text-slate-600 dark:text-slate-300">
                                    "Today the cards felt different. Lighter. As if the ink itself was waking up... I can hear them whispering when the house is quiet."
                                </p>
                                <p className="text-sm font-mono text-slate-400 mt-4">Entry #001 - The Awakening</p>
                            </div>
                            <div className="relative aspect-[4/5] rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl rounded-lg overflow-hidden border-4 border-white dark:border-slate-800">
                                <Image
                                    src="/images/about/selected/lilip3.jpg"
                                    alt="Lily Reading"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </TabsContent>

                </Tabs>
            </div>
        </section>
    )
}
