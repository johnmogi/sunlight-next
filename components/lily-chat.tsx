"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Send, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface LilyChatProps {
    messages: any
    isRTL: boolean
}

type ChatState = "hidden" | "greeting" | "vote" | "email" | "daydream"

export function LilyChat({ messages, isRTL }: LilyChatProps) {
    const [state, setState] = React.useState<ChatState>("hidden")
    const [email, setEmail] = React.useState("")
    const [isTyping, setIsTyping] = React.useState(false)

    // Initial Appearance Delay
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (state === "hidden") {
                startTyping("greeting")
            }
        }, 3000) // Appear after 3 seconds
        return () => clearTimeout(timer)
    }, [])

    const startTyping = (nextState: ChatState) => {
        setIsTyping(true)
        setTimeout(() => {
            setIsTyping(false)
            setState(nextState)
        }, 1500) // Typing duration
    }

    const handleVoteAction = () => {
        // Scroll to collections/complete-deck
        const element = document.getElementById("complete-deck")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        startTyping("email")
    }

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate submission
        setTimeout(() => {
            startTyping("daydream")
        }, 500)
    }

    const dismiss = () => {
        setState("daydream")
    }

    // Localization Helpers (Safe Access)
    const t = (key: string, fallback: string) => {
        return messages?.lilyChat?.[key] || fallback
    }

    return (
        <div className={cn("fixed bottom-4 z-50 flex items-end gap-3", isRTL ? "left-4 flex-row-reverse" : "right-4 flex-row")}>

            {/* Avatar - Always visible after initial load or in daydream */}
            <AnimatePresence>
                {state !== "hidden" && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="relative cursor-pointer"
                        onClick={() => state === "daydream" && startTyping("greeting")}
                    >
                        <div className={cn("relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg ring-2",
                            state === "daydream" ? "ring-amber-300/50" : "ring-amber-500")}
                        >
                            <Image
                                src="/images/about/lilicover.jpg"
                                alt="Lily"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {state === "daydream" && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                            </span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Bubble Container */}
            <AnimatePresence mode="wait">
                {state !== "hidden" && state !== "daydream" && (
                    <motion.div
                        key="chat-box"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={cn("mb-2 relative max-w-xs md:max-w-sm")}
                    >
                        <Card className="p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-xl border-amber-200 dark:border-amber-800 rounded-2xl rounded-bl-none rtl:rounded-bl-2xl rtl:rounded-br-none">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-amber-600"
                                onClick={dismiss}
                            >
                                <X className="h-3 w-3" />
                            </Button>

                            {/* Typing Indicator */}
                            {isTyping ? (
                                <div className="flex gap-1 h-6 items-center px-1">
                                    <motion.div className="w-2 h-2 bg-amber-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                                    <motion.div className="w-2 h-2 bg-amber-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} />
                                    <motion.div className="w-2 h-2 bg-amber-600 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Greeting State */}
                                    {state === "greeting" && (
                                        <>
                                            <p className="text-sm font-medium text-amber-900 dark:text-amber-100 leading-relaxed">
                                                {t("greeting", "Hi! I'm Lily. I'm exploring the connection between our dreams and reality.")}
                                            </p>
                                            <Button size="sm" onClick={() => startTyping("vote")} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:opacity-90">
                                                {t("greetingAction", "Join the Journey")} <ArrowRight className="ml-2 h-3 w-3" />
                                            </Button>
                                        </>
                                    )}

                                    {/* Vote CTA State */}
                                    {state === "vote" && (
                                        <>
                                            <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
                                                {t("voteMessage", "We need your intuition! Help us choose the final cards for the deck.")}
                                            </p>
                                            <Button size="sm" onClick={handleVoteAction} className="w-full bg-amber-100 text-amber-900 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-100">
                                                {t("voteAction", "Go to Collections")}
                                            </Button>
                                        </>
                                    )}

                                    {/* Email Capture State */}
                                    {state === "email" && (
                                        <>
                                            <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
                                                {t("emailMessage", "I'd love to share more discoveries with you. Shall we stay in touch?")}
                                            </p>
                                            <form onSubmit={handleEmailSubmit} className="flex gap-2">
                                                <Input
                                                    placeholder={t("emailPlaceholder", "your@email.com")}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="h-8 text-sm"
                                                    required
                                                />
                                                <Button type="submit" size="sm" className="h-8 w-8 p-0 bg-amber-600 hover:bg-amber-700">
                                                    <Send className="h-3 w-3" />
                                                </Button>
                                            </form>
                                        </>
                                    )}
                                </div>
                            )}
                        </Card>

                        {/* Little Triangle Pointer */}
                        <div className={cn("absolute bottom-0 w-4 h-4 bg-white/95 dark:bg-slate-900/95 border-b border-l border-amber-200 dark:border-amber-800 transform rotate-45",
                            isRTL ? "-right-2 translate-x-full border-l-0 border-r" : "-left-2 -translate-x-full")}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
