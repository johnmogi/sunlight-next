"use strict";

import * as React from "react"
import Image from "next/image"
import { TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface GuideTabProps {
    messages: any
    isRTL: boolean
}

export function GuideTab({ messages, isRTL }: GuideTabProps) {
    const images = [
        "/images/about/lilicover.jpg",
        "/images/_Card_6_-_The_Lovers_Union_page_is_two_pages_glued_together_w_fabe78c3-cc46-4773-a149-8219dd0e2fef_3.jpg",
        "/images/_Sunlight_Tarot_Diary_by_Lili_age_eternal_11_Card-by-card_one_39ffbbf7-7c3a-44ec-bf67-3c6e34f3febd_0.jpg",
        "/images/_Card_1_-_The_Night_Awakener_drawn_with_purple_gel_pen_at_317_812df155-6301-4d09-9372-fa610eda2114_1.jpg",
        "/images/_4_of_Roses_page_has_actual_frost_on_it_because_I_left_the_di_69119697-cb01-45b4-9973-2f10356afcb8_2.jpg",
        "/images/httpss.mj.run1B2VIygDsqc_photorealistic_tarot_card_portrait_1_2b5d2ddf-1836-4d14-8400-7cf127e29c1b_3.jpg"
    ]

    return (
        <TabsContent value="guide" className="mt-0">
            <Card className="border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 bg-card/50 backdrop-blur">
                <div className="grid lg:grid-cols-2 gap-8 items-start">

                    {/* Left Column: Image Gallery (Uniform Grid) */}
                    <div className="space-y-4">
                        <h3 className={cn("text-xl font-bold text-amber-900 dark:text-amber-100 mb-4", isRTL ? "text-right" : "text-left")}>
                            {messages.aboutContent?.guide?.galleryTitle || "Lily's Diary Pages"}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {images.map((src, i) => (
                                <Dialog key={i}>
                                    <DialogTrigger asChild>
                                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:opacity-90 hover:scale-105 transition-all transform shadow-sm group">
                                            <Image
                                                src={src}
                                                alt={`Diary Page ${i + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                                                    Expand
                                                </span>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                                        <DialogTitle className="sr-only">Diary Page {i + 1}</DialogTitle>
                                        <div className="relative w-full h-[80vh]">
                                            <Image
                                                src={src}
                                                alt={`Diary Page ${i + 1}`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Report Content (Cards) */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className={cn("text-3xl font-bold text-amber-700 dark:text-amber-500", isRTL ? "text-right" : "text-left")}>
                                {messages.aboutContent?.guide?.title || "Guide Title"}
                            </h3>
                            <p className={cn("text-xl font-medium text-amber-800 dark:text-amber-400", isRTL ? "text-right" : "text-left")}>
                                {messages.aboutContent?.guide?.subtitle || "Subtitle"}
                            </p>
                            <p className={cn("text-muted-foreground leading-relaxed", isRTL ? "text-right" : "text-left")}>
                                {messages.aboutContent?.guide?.intro || "Intro text..."}
                            </p>
                        </div>

                        <div className={cn("border-b border-amber-200 dark:border-amber-800 pb-4", isRTL ? "text-right" : "text-left")}>
                            <h4 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                                {messages.aboutContent?.guide?.reportTitle || "Report Title"}
                            </h4>
                            <p className="text-muted-foreground mt-2">
                                {messages.aboutContent?.guide?.reportIntro}
                            </p>
                        </div>

                        {/* Section 1 Card */}
                        {messages.aboutContent?.guide?.section1?.title && (
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-amber-200 dark:border-amber-800 shadow-sm">
                                <h5 className={cn("text-lg font-bold text-amber-800 dark:text-amber-200 mb-2", isRTL ? "text-right" : "text-left")}>
                                    {messages.aboutContent?.guide?.section1?.title}
                                </h5>
                                <p className={cn("text-sm text-muted-foreground mb-4", isRTL ? "text-right" : "text-left")}>
                                    {messages.aboutContent?.guide?.section1?.desc}
                                </p>
                                {messages.aboutContent?.guide?.section1?.table && (
                                    <div className="overflow-x-auto bg-white/40 dark:bg-black/20 rounded-lg p-2">
                                        <table className="w-full text-sm text-left rtl:text-right border-collapse">
                                            <thead className="text-xs uppercase text-amber-900/70 dark:text-amber-100/70 border-b border-amber-200 dark:border-amber-800">
                                                <tr>
                                                    {messages.aboutContent?.guide?.section1?.table?.headers?.map((h: string, i: number) => (
                                                        <th key={i} className="px-3 py-2 whitespace-nowrap">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-amber-100 dark:divide-amber-900/30">
                                                {messages.aboutContent?.guide?.section1?.table?.rows?.map((row: any, i: number) => (
                                                    <tr key={i} className="hover:bg-amber-100/30 dark:hover:bg-amber-900/10 transition-colors">
                                                        <td className="px-3 py-2 font-medium">{row.col1}</td>
                                                        <td className="px-3 py-2">{row.col2}</td>
                                                        <td className="px-3 py-2 text-muted-foreground">{row.col3}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Section 2 Card */}
                        {messages.aboutContent?.guide?.section2?.title && (
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-amber-200 dark:border-amber-800 shadow-sm">
                                <h5 className={cn("text-lg font-bold text-amber-800 dark:text-amber-200 mb-2", isRTL ? "text-right" : "text-left")}>
                                    {messages.aboutContent?.guide?.section2?.title}
                                </h5>
                                <p className={cn("text-sm text-muted-foreground mb-4", isRTL ? "text-right" : "text-left")}>
                                    {messages.aboutContent?.guide?.section2?.desc}
                                </p>
                                {messages.aboutContent?.guide?.section2?.table && (
                                    <div className="overflow-x-auto bg-white/40 dark:bg-black/20 rounded-lg p-2">
                                        <table className="w-full text-sm text-left rtl:text-right border-collapse">
                                            <thead className="text-xs uppercase text-amber-900/70 dark:text-amber-100/70 border-b border-amber-200 dark:border-amber-800">
                                                <tr>
                                                    {messages.aboutContent?.guide?.section2?.table?.headers?.map((h: string, i: number) => (
                                                        <th key={i} className="px-3 py-2 whitespace-nowrap">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-amber-100 dark:divide-amber-900/30">
                                                {messages.aboutContent?.guide?.section2?.table?.rows?.map((row: any, i: number) => (
                                                    <tr key={i} className="hover:bg-amber-100/30 dark:hover:bg-amber-900/10 transition-colors">
                                                        <td className="px-3 py-2 font-medium">{row.col1}</td>
                                                        <td className="px-3 py-2">{row.col2}</td>
                                                        <td className="px-3 py-2 text-muted-foreground">{row.col3}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Section 3 Card */}
                        {messages.aboutContent?.guide?.section3?.title && (
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-amber-200 dark:border-amber-800 shadow-sm">
                                <h5 className={cn("text-lg font-bold text-amber-800 dark:text-amber-200 mb-3", isRTL ? "text-right" : "text-left")}>
                                    {messages.aboutContent?.guide?.section3?.title}
                                </h5>
                                {messages.aboutContent?.guide?.section3?.quote && (
                                    <blockquote className="p-3 my-2 border-s-4 border-amber-500 bg-white/50 dark:bg-black/20 rounded-r-lg">
                                        <p className="text-sm italic font-medium text-amber-900 dark:text-amber-100">
                                            {messages.aboutContent?.guide?.section3?.quote}
                                        </p>
                                    </blockquote>
                                )}
                                <div className="mt-4">
                                    <h6 className={cn("font-bold text-sm text-amber-900 dark:text-amber-100 mb-2", isRTL ? "text-right" : "text-left")}>
                                        {messages.aboutContent?.guide?.section3?.toolsTitle}
                                    </h6>
                                    {messages.aboutContent?.guide?.section3?.tools && (
                                        <ul className={cn("space-y-1 list-disc list-inside text-sm text-muted-foreground", isRTL ? "text-right" : "text-left")}>
                                            {messages.aboutContent?.guide?.section3?.tools?.map((tool: string, i: number) => (
                                                <li key={i}>{tool}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </Card>
        </TabsContent>
    )
}
