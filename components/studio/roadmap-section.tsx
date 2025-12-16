"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Map, CheckCircle2, CircleDashed, ArrowRight } from "lucide-react"

interface RoadmapSectionProps {
    messages: any
    locale: string
}

export function RoadmapSection({ messages, locale }: RoadmapSectionProps) {
    const steps = [
        { title: "Phase 1: Assembling the Crew", status: "current", date: "Now", description: "Crowd Soul Funding & Team Building" },
        { title: "Phase 2: The 5 Elements", status: "upcoming", date: "Q1 2025", description: "Structuring the Deck" },
        { title: "Phase 3: The Lighthouse", status: "upcoming", date: "Q2 2025", description: "Building the Community" },
        { title: "Phase 4: Launch", status: "upcoming", date: "Q3 2025", description: "Full Release" },
    ]

    return (
        <section className="py-20 bg-amber-50/50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                        <Map className="w-8 h-8 text-amber-500" />
                        {messages.studio?.roadmap?.title || "The Roadmap"}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {messages.studio?.roadmap?.subtitle || "Where we are, where we've been, and where the light is guiding us next."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-xl border-2 flex flex-col items-center text-center transition-all hover:scale-105 ${step.status === 'current'
                                ? 'bg-white dark:bg-slate-800 border-amber-500 shadow-xl scale-105 z-10'
                                : step.status === 'completed'
                                    ? 'bg-slate-100 dark:bg-slate-900 border-green-500/30 opacity-80'
                                    : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60'
                                }`}
                        >
                            {step.status === 'completed' && <CheckCircle2 className="w-8 h-8 text-green-500 mb-3" />}
                            {step.status === 'current' && <CircleDashed className="w-8 h-8 text-amber-500 mb-3 animate-spin-slow" />}
                            {step.status === 'upcoming' && <ArrowRight className="w-8 h-8 text-slate-400 mb-3" />}

                            <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.date}</p>
                            {step.status === 'current' && (
                                <span className="mt-4 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-full">
                                    We Are Here
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
