
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Heart, MessageSquare, ArrowUpRight, Mail, Sparkles } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface LilyChatProps {
    messages: any
    isRTL: boolean
}

type ChatState = "hidden" | "intro" | "like" | "comment" | "exit" | "daydream" | "celebrate_like" | "celebrate_comment" | "offline_support" | "vote_prompt1" | "vote_prompt2" | "comment_prompt" | "daily_spread_promo" | "spread_guide_1" | "spread_guide_2"

export function LilyChat({ messages, isRTL }: LilyChatProps) {
    // States: vote_loop, comment_loop, promo, etc.
    const [state, setState] = React.useState<ChatState | "strong_exit">("hidden")
    const [email, setEmail] = React.useState("")
    const [isTyping, setIsTyping] = React.useState(false)
    const [hasInteracted, setHasInteracted] = React.useState(false)

    // Initial Load & Smart Start
    React.useEffect(() => {
        const hasSeenIntro = localStorage.getItem('lily_intro_seen')
        const isSleeping = sessionStorage.getItem('lily_is_sleeping')
        const voteCount = parseInt(localStorage.getItem('lily_vote_count') || '0')

        let initialTimer: NodeJS.Timeout

        if (isSleeping) {
            setState("daydream")
            return
        }

        if (!hasSeenIntro) {
            // First visit ever: Start Vote Loop
            initialTimer = setTimeout(() => {
                // Prevent auto-open on mobile
                if (window.innerWidth >= 768) {
                    startTyping("vote_prompt1")
                }
                localStorage.setItem('lily_intro_seen', 'true')
            }, 3000)
        } else {
            // Return visit logic
            if (voteCount === 0) {
                // Hasn't voted yet? Remind them.
                initialTimer = setTimeout(() => {
                    if (window.innerWidth >= 768) {
                        startTyping("vote_prompt1")
                    }
                }, 4000)
            } else {
                // Has voted? Just chill or show daily spread (maybe once)
                setState("daydream")
            }
        }

        return () => clearTimeout(initialTimer)
    }, [])

    // Smart Loops
    React.useEffect(() => {
        let loopTimer: NodeJS.Timeout

        // Don't auto-loop if user interacted, is sleeping (daydream), or in exit mode
        if (!hasInteracted && state !== "hidden" && state !== "daydream" && state !== "exit" && state !== "strong_exit" && state !== "offline_support") {
            const voteCount = parseInt(localStorage.getItem('lily_vote_count') || '0')
            const hasCommented = localStorage.getItem('lily_has_commented')

            // LOOP: Voting Phase (Only if 0 votes)
            if (voteCount === 0) {
                if (state === "vote_prompt1") {
                    loopTimer = setTimeout(() => startTyping("vote_prompt2"), 8000)
                } else if (state === "vote_prompt2") {
                    // Wait longer then repeat or nudge
                    loopTimer = setTimeout(() => startTyping("vote_prompt1"), 12000)
                }
            }
            // LOOP: Comment/Engagement Phase (Has voted, no comment)
            else if (!hasCommented) {
                if (state === "celebrate_like") {
                    // Move to comment prompt after celebration
                    loopTimer = setTimeout(() => startTyping("comment_prompt"), 6000)
                } else if (state === "comment_prompt") {
                    // Then try Daily Spread
                    loopTimer = setTimeout(() => startTyping("daily_spread_promo"), 8000)
                } else if (state === "daily_spread_promo") {
                    // Then sleep
                    loopTimer = setTimeout(() => setState("daydream"), 10000)
                }
            }
            // LOOP: Retention Phase (Voted & Commented)
            else {
                if (state === "daily_spread_promo") {
                    loopTimer = setTimeout(() => setState("daydream"), 10000)
                } else {
                    // If in any other active state, eventually sleep
                    loopTimer = setTimeout(() => setState("daydream"), 8000)
                }
            }
        }

        // Auto-dismiss celebrations always
        if (state === "celebrate_like" || state === "celebrate_comment") {
            loopTimer = setTimeout(() => {
                if (state === "celebrate_comment") {
                    startTyping("daily_spread_promo")
                }
                // For 'celebrate_like', the main loop logic (above) handles the transition based on voteCount and hasCommented.
                // If voteCount is 0, it will eventually go to comment_prompt or daily_spread_promo.
                // If voteCount > 0 and hasCommented is false, it will go to comment_prompt.
                // If voteCount > 0 and hasCommented is true, it will go to daily_spread_promo.
            }, 5000)
        }

        // Daily Spread Tour Sequence
        if (state === "spread_guide_1") {
            loopTimer = setTimeout(() => startTyping("spread_guide_2"), 8000)
        } else if (state === "spread_guide_2") {
            loopTimer = setTimeout(() => {
                setState("daydream")
                sessionStorage.setItem('lily_is_sleeping', 'true') // Mission accomplished, sleep.
            }, 10000)
        }

        return () => clearTimeout(loopTimer)
    }, [state, hasInteracted])

    // Interactions
    const handleLike = () => {
        if (state !== "strong_exit") {
            handleInteraction()
            startTyping("celebrate_like")
            const voteCount = parseInt(localStorage.getItem('lily_vote_count') || '0')
            localStorage.setItem('lily_vote_count', (voteCount + 1).toString())
        }
    }

    const handleComment = () => {
        if (state !== "strong_exit") {
            handleInteraction()
            startTyping("celebrate_comment")
            localStorage.setItem('lily_has_commented', 'true')
        }
    }

    // Listeners
    React.useEffect(() => {
        window.addEventListener('sunlight-card-liked', handleLike)
        window.addEventListener('sunlight-comment-added', handleComment)
        return () => {
            window.removeEventListener('sunlight-card-liked', handleLike)
            window.removeEventListener('sunlight-comment-added', handleComment)
        }
    }, [state])

    // Strong Exit Intent
    React.useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            const isSleeping = sessionStorage.getItem('lily_is_sleeping')
            if (isSleeping) return

            if (e.clientY <= 0 && state !== "strong_exit" && !hasInteracted && state !== "daily_spread_promo" && state !== "offline_support" && state !== "spread_guide_1" && state !== "spread_guide_2") {
                startTyping("strong_exit")
            }
        }
        document.addEventListener("mouseleave", handleMouseLeave)
        return () => document.removeEventListener("mouseleave", handleMouseLeave)
    }, [state, hasInteracted])


    const startTyping = (nextState: any) => {
        setIsTyping(true)
        setTimeout(() => {
            setIsTyping(false)
            setState(nextState)
        }, 1500)
    }

    const handleInteraction = () => {
        setHasInteracted(true)
    }

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        handleInteraction()

        try {
            await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Lily Chat User',
                    email: email
                })
            })
        } catch (error) {
            console.error('Failed to save email:', error)
        }

        setTimeout(() => {
            setState("daydream")
            sessionStorage.setItem('lily_is_sleeping', 'true') // Auto-sleep after collecting info?
        }, 1000)
    }

    const dismissOrSleep = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setHasInteracted(true)
        setState("daydream")
        sessionStorage.setItem('lily_is_sleeping', 'true') // Manual sleep
    }

    const handleAvatarClick = () => {
        handleInteraction()

        // Wake up logic
        const isSleeping = sessionStorage.getItem('lily_is_sleeping')
        if (state === "daydream" || isSleeping || state === "hidden") { // Added hidden safety
            sessionStorage.removeItem('lily_is_sleeping') // Wake up!

            // Context aware wake up
            const voteCount = parseInt(localStorage.getItem('lily_vote_count') || '0')
            const hasCommented = localStorage.getItem('lily_has_commented')

            if (voteCount === 0) {
                startTyping("vote_prompt1")
            } else if (!hasCommented) {
                startTyping("daily_spread_promo")
            } else {
                startTyping("daily_spread_promo")
            }
            return
        }

        // Action Logic
        if (state === "vote_prompt1" || state === "vote_prompt2") {
            document.getElementById("complete-deck")?.scrollIntoView({ behavior: "smooth" })
        } else if (state === "daily_spread_promo" || state === "comment_prompt") {
            document.getElementById("daily-spread")?.scrollIntoView({ behavior: "smooth" })
            // START THE GUIDE
            startTyping("spread_guide_1")
        }
    }

    // Helper
    const t = (key: string, fallback: string) => messages?.lilyChat?.[key] || fallback

    return (
        <div className={cn("hidden md:flex fixed bottom-4 z-50 items-end gap-3", isRTL ? "left-4 flex-row-reverse" : "right-4 flex-row")}>
            {/* Avatar */}
            <AnimatePresence>
                {state !== "hidden" && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="relative cursor-pointer"
                        onClick={handleAvatarClick}
                    >
                        <div className={cn("relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg ring-2 transition-all duration-500",
                            state === "daydream" ? "ring-amber-300/50 grayscale hover:grayscale-0" : "ring-amber-500",
                            state === "strong_exit" ? "ring-red-500 ring-4 animate-pulse" : "")}
                        >
                            <Image
                                src="/images/artwork/artwork/httpss.mj.runCpTnpMvgNks_photorealistic_fourth-wall_break_clo_78311e8d-e261-48e4-8092-dd356fac9796_0.jpg"
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

            {/* Chat Bubble */}
            <AnimatePresence mode="wait">
                {state !== "hidden" && state !== "daydream" && (
                    <motion.div
                        key="chat-box"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={cn("mb-4 relative max-w-[280px] md:max-w-md", state === "strong_exit" ? "scale-110 md:max-w-sm origin-bottom-right" : "")}
                    >
                        <Card className={cn("p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-2xl border-amber-200 dark:border-amber-800 rounded-2xl rounded-bl-none rtl:rounded-bl-2xl rtl:rounded-br-none",
                            state === "strong_exit" ? "border-amber-500 border-2 shadow-amber-500/20" : "")}>

                            {/* Header Buttons: Sleep & Close */}
                            <div className="absolute top-1 right-1 flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 text-muted-foreground hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
                                    onClick={dismissOrSleep}
                                    title="Send Lily to Sleep (Zzz)"
                                >
                                    <span className="text-[10px] font-bold">Zzz</span>
                                </Button>
                            </div>

                            {isTyping ? (
                                <div className="flex gap-1 h-6 items-center px-1">
                                    <motion.div className="w-1.5 h-1.5 bg-amber-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                                    <motion.div className="w-1.5 h-1.5 bg-amber-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} />
                                    <motion.div className="w-1.5 h-1.5 bg-amber-600 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                </div>
                            ) : (
                                <div className="space-y-3 cursor-pointer" onClick={handleAvatarClick}>
                                    {/* Vote Prompt Loop */}
                                    {(state === "vote_prompt1" || state === "vote_prompt2") && (
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-medium text-amber-900 dark:text-amber-100 flex items-center gap-2">
                                                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                                                {state === "vote_prompt1" && t("votePrompt1", "Your voice matters! Help us choose the final deck.")}
                                                {state === "vote_prompt2" && t("votePrompt2", "See a card you love? Click the heart to vote!")}
                                            </p>
                                        </div>
                                    )}

                                    {/* Comment / Engagement Prompt */}
                                    {state === "comment_prompt" && (
                                        <p className="text-sm font-medium text-amber-900 dark:text-amber-100 flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4 text-blue-500" />
                                            {t("commentGuideMessage", "You haven't commented yet! We'd love to hear your voice.")}
                                        </p>
                                    )}

                                    {/* Daily Spread Promo & Tour */}
                                    {(state === "daily_spread_promo" || state === "spread_guide_1" || state === "spread_guide_2") && (
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                                                <Sparkles className="h-4 w-4 text-indigo-500 animate-spin-slow" />
                                                {state === "daily_spread_promo" && t("dailySpreadPromo", "Ready for some inner wisdom? Let's peek into the moment.")}
                                                {state === "spread_guide_1" && t("spreadGuide1", "Draw a Reflection Card to see what requires contemplation today.")}
                                                {state === "spread_guide_2" && t("spreadGuide2", "Then choose an Activation Card to take action!")}
                                            </p>
                                        </div>
                                    )}

                                    {/* Celebration: Like */}
                                    {state === "celebrate_like" && (
                                        <>
                                            <p className="text-sm font-medium text-amber-900 dark:text-amber-100 flex items-center gap-2">
                                                <Heart className="h-5 w-5 text-red-500 fill-red-500 animate-bounce" />
                                                {/* First vote special message check */}
                                                {parseInt(localStorage.getItem('lily_vote_count') || '0') <= 1
                                                    ? t("firstVoteCelebration", "Yay! We need more ratings! Please try to comment too!")
                                                    : t("celebrateLike", "Great job! Your intuition is helping shape the deck.")
                                                }
                                            </p>
                                        </>
                                    )}

                                    {/* Celebration: Comment */}
                                    {state === "celebrate_comment" && (
                                        <p className="text-sm font-medium text-amber-900 dark:text-amber-100 flex items-center gap-2">
                                            <MessageSquare className="h-5 w-5 text-blue-500 animate-bounce" />
                                            {t("celebrateComment", "Fantastic! I love hearing your thoughts.")}
                                        </p>
                                    )}

                                    {/* Strong Exit */}
                                    {(state === "strong_exit" || state === "exit") && (
                                        <>
                                            <p className="text-base font-bold text-amber-800 dark:text-amber-200">
                                                {t("strongExitTitle", "Wait! Don't leave yet!")}
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-2 leading-tight">
                                                {t("strongExitMsg", "The journey is just beginning. Join our list for early access and rewards.")}
                                            </p>
                                            <form onSubmit={handleEmailSubmit} className="flex gap-2 mt-2" onClick={e => e.stopPropagation()}>
                                                <Input
                                                    placeholder={t("emailPlaceholder", "email@example.com")}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="h-9 text-sm bg-white dark:bg-slate-950 border-amber-300"
                                                    required
                                                />
                                                <Button type="submit" size="sm" className="h-9 px-3 bg-amber-600 hover:bg-amber-700 font-bold shadow-md">
                                                    {t("sendContact", "Send")}
                                                </Button>
                                            </form>
                                        </>
                                    )}

                                    {/* Offline Support */}
                                    {state === "offline_support" && (
                                        <>
                                            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 flex items-start gap-2">
                                                <Mail className="h-4 w-4 mt-1" />
                                                {t("offlineMessage", "Lily is daydreaming right now... Leave your contact info for support.")}
                                            </p>
                                            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2 mt-2" onClick={e => e.stopPropagation()}>
                                                <Input
                                                    placeholder={t("offlinePlaceholder", "Email or Phone")}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="h-8 text-xs bg-white dark:bg-slate-950"
                                                    required
                                                />
                                                <Button type="submit" size="sm" className="h-8 w-full bg-amber-600 hover:bg-amber-700 text-xs">
                                                    {t("sendContact", "Send to Team")}
                                                </Button>
                                            </form>
                                        </>
                                    )}
                                </div>
                            )}
                        </Card>
                        {/* Pointer */}
                        <div className={cn("absolute bottom-4 w-4 h-4 bg-white/95 dark:bg-slate-900/95 border-b border-l border-amber-200 dark:border-amber-800 transform rotate-45",
                            isRTL ? "-right-2 translate-x-full border-l-0 border-r" : "-left-2 -translate-x-full")}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
