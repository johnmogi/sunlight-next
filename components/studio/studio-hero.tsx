"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface StudioHeroProps {
    messages: any
}

export function StudioHero({ messages }: StudioHeroProps) {
    const ref = React.useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

    return (
        <div ref={ref} className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Parallax */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <Image
                    src="/images/CTA/Kickstarter_campaign_hero_golden-hour_flatlay_on_weathered_wo_4a9c8c21-4bb9-4405-92e6-2f1afd02976b_3.png"
                    alt="Studio Workshop"
                    fill
                    className="object-cover opacity-80 dark:opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-transparent to-transparent" />
            </motion.div>

            <div className="container relative z-10 px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 text-slate-800 dark:text-slate-100 drop-shadow-lg"
                >
                    {messages.studio?.hero?.title || "The Wisdom Lab"}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto drop-shadow-md font-medium"
                >
                    {messages.studio?.hero?.subtitle || "Step behind the curtain. Explore blueprints, sketches, and the unfinished dreams of Sunlight."}
                </motion.p>
            </div>
        </div>
    )
}
