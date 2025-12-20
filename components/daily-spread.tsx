"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Sparkles, Sun, Moon, ChevronLeft, ChevronRight, X, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Prevent hydration errors by only rendering dialogs on client
function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

import { DUAL_PATH_CARDS } from "@/lib/card-sets/set-dual-path"
import { TAROT_CARDS as cards129 } from "@/lib/card-sets/set-update129"

interface DailySpreadProps {
  messages: Record<string, any>
}

interface DrawnCard {
  id: string
  name: string
  image: string
  type: string
  meaning: string
  reading: string
}

export function DailySpread({ messages }: DailySpreadProps) {
  const hasMounted = useHasMounted()
  const sectionRef = React.useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  // V6.2 Flow State
  type FlowState =
    | 'IDLE'
    | 'FEELING_INPUT'
    | 'CHOOSING_REFLECTION'
    | 'REFLECTION_REVEAL'
    | 'CONNECTION_CHECK'
    | 'ALTERNATIVE_SELECTION'
    | 'REFLECTION_CONFIRMED'
    | 'DRAWING_ACTIVATION'
    | 'ACTIVATION_REVEAL'
    | 'SUMMARY'

  const [flowState, setFlowState] = React.useState<FlowState>('IDLE')

  // Data State
  const [reflectionCard, setReflectionCard] = React.useState<DrawnCard | null>(null)
  const [activationCard, setActivationCard] = React.useState<DrawnCard | null>(null)
  const [alternatives, setAlternatives] = React.useState<DrawnCard[]>([])
  const [userFeelings, setUserFeelings] = React.useState("")
  const [mysteryCards, setMysteryCards] = React.useState<any[]>([])
  const [retryCount, setRetryCount] = React.useState(0)

  // UI State
  const [cards, setCards] = React.useState<any[]>([])

  React.useEffect(() => {
    // Merge: Twin System Majors (0,4,5,6) + Update 129 (All)
    // We filter Dual Path to only the specific "Twin System" cards to avoid duplicates/legacy art
    const twinMajors = DUAL_PATH_CARDS.filter(c => ['major-0', 'major-4', 'major-5', 'major-6'].includes(c.id));
    const combined = [...twinMajors, ...cards129].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
    setCards(combined)
  }, [])

  // Hints Helper
  const getHint = (card: any) => {
    if (card.keywords && card.keywords.length > 0) return card.keywords[0];

    const name = card.name.toLowerCase();

    if (card.suit === 'roses') return "Mind";
    if (card.suit === 'hearts') return "Heart";
    if (card.suit === 'shields') return "Earth";
    if (card.suit === 'coins') return "Form";
    if (card.suit === 'crystals') return "Clarity";
    if (card.suit === 'swords') return "Truth";
    if (card.suit === 'wands') return "Fire";
    if (card.suit === 'cups') return "Emotion";
    if (card.suit === 'pentacles') return "Root";

    if (name.includes("ace")) return "Seed";
    if (name.includes("human")) return "Self";

    return "Mystery";
  }

  // Typewriter Component
  const Typewriter = ({ text, delay = 30 }: { text: string, delay?: number }) => {
    const [displayedText, setDisplayedText] = React.useState("")

    React.useEffect(() => {
      let index = 0
      setDisplayedText("")
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => text.substring(0, index + 1))
        index++
        if (index > text.length) clearInterval(intervalId)
      }, delay)
      return () => clearInterval(intervalId)
    }, [text, delay])

    return <span>{displayedText}</span>
  }

  // --- ACTIONS ---

  const startJourney = () => {
    setFlowState('FEELING_INPUT')
    setRetryCount(0)
    setReflectionCard(null)
    setActivationCard(null)
    setUserFeelings("")
  }

  const handleSilence = () => {
    setUserFeelings("Silence")
    prepareChoice("Silence")
  }

  const handleFeelingSubmit = () => {
    if (!userFeelings.trim()) return
    prepareChoice(userFeelings)
  }

  const prepareChoice = (feelings: string) => {
    // Filter for Minor Arcana for first choice
    const minorArcana = cards.filter(c => c.type === 'minor' || (c.suit && c.suit !== 'major'))
    const pool = minorArcana.length > 3 ? minorArcana : cards;

    const selected: any[] = []
    const indices = new Set<number>()
    let attempts = 0;
    while (selected.length < 3 && attempts < 100) {
      attempts++;
      const idx = Math.floor(Math.random() * pool.length)
      if (!indices.has(idx)) {
        indices.add(idx)
        selected.push({ ...pool[idx], hint: getHint(pool[idx]) })
      }
    }
    setMysteryCards(selected)
    setFlowState('CHOOSING_REFLECTION')
  }

  const chooseReflectionCard = (card: any) => {
    setReflectionCard(formatCard(card, 'reflection'))
    setFlowState('REFLECTION_REVEAL')
  }

  const handleConnection = (connected: boolean) => {
    if (connected) {
      setFlowState('REFLECTION_CONFIRMED')
    } else {
      if (retryCount === 0) {
        // First Rejection: Offer Major Arcana
        setRetryCount(1)
        const majors = cards.filter(c => c.type === 'major' || (!c.suit && typeof c.number === 'number'))
        const pool = majors.length >= 3 ? majors : cards;

        const alts = []
        const indices = new Set<number>()
        let attempts = 0
        while (alts.length < 3 && attempts < 100) {
          attempts++
          const idx = Math.floor(Math.random() * pool.length)
          if (!indices.has(idx)) {
            indices.add(idx)
            alts.push(formatCard(pool[idx]))
          }
        }
        setAlternatives(alts)
        setFlowState('ALTERNATIVE_SELECTION')
      } else {
        setFlowState('REFLECTION_CONFIRMED')
      }
    }
  }

  const selectAlternative = (card: DrawnCard) => {
    setReflectionCard(card)
    setFlowState('REFLECTION_REVEAL')
  }

  const drawActivation = () => {
    setFlowState('DRAWING_ACTIVATION')
    setTimeout(() => {
      const randomCard = cards[Math.floor(Math.random() * cards.length)]
      setActivationCard(formatCard(randomCard, 'activation'))
      setFlowState('ACTIVATION_REVEAL')
    }, 2000)
  }

  const finishJourney = () => {
    setFlowState('SUMMARY')
  }

  // Helper
  const formatCard = (card: any, context: 'reflection' | 'activation' = 'reflection'): DrawnCard => {
    let image = card.image;
    // Dual Path Logic: Use Moonlight for Reflection, Sunlight for Activation
    if (context === 'reflection' && card.moonlightImage) image = card.moonlightImage;
    if (context === 'activation' && card.sunlightImage) image = card.sunlightImage;

    return {
      id: card.id,
      name: card.name,
      image: image.startsWith('/') ? image : `/images/cards/${image}`,
      type: card.suit ? "Minor Arcana" : "Major Arcana",
      meaning: card.meaning || "A card of mystery and potential.",
      reading: card.visualDesc || card.meaning || "Listen to your intuition."
    }
  }

  // --- RENDERERS ---

  return (
    <section id="daily-spread" ref={sectionRef} className="relative py-20 min-h-[900px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 opacity-35 dark:opacity-25 will-change-transform"
      >
        <Image
          src="/images/CTA/same_as_2_but_add_subtle_floating_petals_and_gentle_sunrise_r_c4c022dd-210e-49f1-9fdd-95c6097bd155_2.png"
          alt="Daily Spread Background"
          fill
          className="object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-amber-50/90 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-950/90" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <AnimatePresence mode="wait">

          {/* STATE: IDLE */}
          {flowState === 'IDLE' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
                Daily Reflection
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Enter the quiet space. Anchor your feeling, choose your path, and find the energy to move forward.
              </p>
              <Button
                onClick={startJourney}
                className="bg-black text-white dark:bg-white dark:text-black px-12 py-8 text-xl rounded-full hover:scale-105 transition-transform"
              >
                Begin Journey
              </Button>
            </motion.div>
          )}

          {/* STATE: FEELING_INPUT */}
          {flowState === 'FEELING_INPUT' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center space-y-8 w-full max-w-2xl mx-auto"
            >
              <div className="text-center space-y-2">
                <span className="text-sm font-bold text-indigo-500 uppercase tracking-widest">Step 1: Anchor</span>
                <h3 className="text-3xl md:text-5xl font-bold text-center">One Word.</h3>
                <p className="text-gray-500 text-lg md:text-xl">
                  Close your eyes. What is the dominant feeling or intention you are carrying right now?
                </p>
              </div>

              <input
                type="text"
                value={userFeelings}
                onChange={(e) => setUserFeelings(e.target.value)}
                placeholder="e.g. Focus"
                className="w-full p-6 text-center text-3xl md:text-5xl border-b-2 border-indigo-200 bg-transparent focus:outline-none focus:border-indigo-600 transition-colors placeholder:text-gray-200"
                autoFocus
              />

              <div className="flex flex-col gap-4 w-full md:w-auto items-center">
                <Button
                  onClick={handleFeelingSubmit}
                  disabled={!userFeelings.trim()}
                  className="w-full md:w-64 px-8 py-6 text-xl"
                >
                  Anchor & Continue
                </Button>
                <button
                  onClick={handleSilence}
                  className="text-gray-400 hover:text-indigo-500 text-sm md:text-base border-b border-transparent hover:border-indigo-500 transition-colors"
                >
                  I prefer silence
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE: CHOOSING_REFLECTION */}
          {flowState === 'CHOOSING_REFLECTION' && (
            <motion.div
              key="choosing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-12"
            >
              <div className="text-center space-y-2">
                <span className="text-sm font-bold text-purple-500 uppercase tracking-widest">Step 2: Choose</span>
                <h3 className="text-3xl md:text-5xl font-bold">The Lesser Arcana.</h3>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
                  Three paths lie before you. Hinting at {userFeelings === "Silence" ? "the void" : userFeelings}.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 md:gap-12">
                {mysteryCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    onClick={() => chooseReflectionCard(card)}
                    className="cursor-pointer relative flex flex-col items-center group"
                  >
                    <div className="relative w-32 h-48 md:w-64 md:h-96 lg:w-72 lg:h-[28rem] rounded-xl bg-indigo-900 border-2 border-indigo-700 shadow-2xl flex items-center justify-center mb-6 transition-all group-hover:bg-indigo-800">
                      <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-20" />
                      <Moon className="w-12 h-12 md:w-20 md:h-20 text-indigo-300/30 group-hover:text-indigo-300 transition-colors" />
                    </div>
                    {/* FIXED: Improved Contrast for Hint Text */}
                    <span className="text-sm md:text-xl font-medium text-indigo-200 group-hover:text-white transition-colors uppercase tracking-widest bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-500/30 shadow-lg">
                      {card.hint}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}


          {/* STATE: REFLECTION_REVEAL */}
          {flowState === 'REFLECTION_REVEAL' && reflectionCard && (
            <motion.div
              key="reveal-reflection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20"
            >
              {/* Card */}
              <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-72 h-[26rem] lg:w-96 lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0"
              >
                <Image src={reflectionCard.image} alt={reflectionCard.name} fill className="object-cover" />
              </motion.div>

              {/* Content */}
              <div className="flex flex-col space-y-8 max-w-xl text-center lg:text-left">
                <div>
                  <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4 inline-block">
                    {retryCount > 0 ? "Major Arcana Insight" : "Reflection"}
                  </span>
                  <h3 className="text-4xl lg:text-6xl font-bold mb-4">{reflectionCard.name}</h3>
                  <div className="text-2xl lg:text-3xl text-gray-500 font-light italic min-h-[4rem]">
                    "<Typewriter text={reflectionCard.meaning} />"
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase text-sm tracking-widest">Guidance</h4>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {retryCount > 0
                      ? "The Major Arcana speaks with the voice of the universe. This archetype presents itself to you now."
                      : `This card reflects your anchor "${userFeelings}". It asks you to not just look at the surface, but to understand the deeper currents.`
                    }
                  </p>
                </div>

                <Button onClick={() => setFlowState('CONNECTION_CHECK')} className="w-full lg:w-auto px-12 py-6 text-lg">
                  Contemplate Resonance
                </Button>
              </div>
            </motion.div>
          )}


          {/* STATE: CONNECTION_CHECK */}
          {flowState === 'CONNECTION_CHECK' && (
            <motion.div
              key="connection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-12 max-w-4xl mx-auto"
            >
              <div className="text-center space-y-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Step 3: Verification</span>
                <h3 className="text-3xl md:text-5xl font-bold">Does this resonate?</h3>
                <p className="text-gray-500 text-xl max-w-2xl mx-auto">
                  {retryCount === 0
                    ? "Sometimes the mirror is clear, sometimes it is clouded. Does this card feel like a true reflection?"
                    : "The Major Arcana brings powerful messages. Can you accept this archetype?"}
                </p>
              </div>

              <div className="flex gap-8">
                <Button
                  onClick={() => handleConnection(false)}
                  disabled={retryCount >= 2}
                  variant="outline"
                  className="px-12 py-8 text-xl border-2 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {retryCount >= 1 ? "I still struggle" : "No, it feels off"}
                </Button>
                <Button
                  onClick={() => handleConnection(true)}
                  className="px-12 py-8 text-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl hover:scale-105 transition-all"
                >
                  Yes, deeply
                </Button>
              </div>
            </motion.div>
          )}

          {/* STATE: ALTERNATIVE_SELECTION */}
          {flowState === 'ALTERNATIVE_SELECTION' && (
            <motion.div
              key="alternatives"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-12"
            >
              <div className="text-center space-y-2">
                <h3 className="text-3xl md:text-5xl font-bold">The Major Arcana Calls.</h3>
                <p className="text-gray-500 text-xl">
                  The Minor cards were silent. Now, the Major Arcana speaks. Choose one of these powerful archetypes.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 md:gap-12">
                {alternatives.map(card => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => selectAlternative(card)}
                    className="cursor-pointer space-y-4 group"
                  >
                    <div className="relative w-32 h-48 md:w-64 md:h-96 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all">
                      <Image src={card.image} alt={card.name} fill className="object-cover" />
                    </div>
                    <p className="text-center font-bold text-lg group-hover:text-indigo-600 transition-colors">{card.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STATE: REFLECTION_CONFIRMED */}
          {flowState === 'REFLECTION_CONFIRMED' && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Sparkles className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold text-center">Connection Established.</h3>
              <p className="text-gray-600 text-xl text-center max-w-lg">
                You have anchored <strong>"{userFeelings}"</strong> to the <strong>{reflectionCard?.name}</strong>.
                Now, let's find the energy to activate this intention.
              </p>
              <Button onClick={drawActivation} size="lg" className="px-12 py-8 text-xl bg-amber-600 hover:bg-amber-700 text-white mt-8">
                Draw Activation Card
              </Button>
            </motion.div>
          )}

          {/* STATE: DRAWING ACTIVATION */}
          {flowState === 'DRAWING_ACTIVATION' && (
            <motion.div
              key="drawing-activation"
              className="flex flex-col items-center justify-center space-y-6"
            >
              <div className="relative w-64 h-96">
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-full h-full bg-amber-600 rounded-xl border-4 border-white shadow-2xl"
                />
              </div>
              <p className="text-2xl font-bold text-amber-600">Summoning Solar Energy...</p>
            </motion.div>
          )}

          {/* STATE: ACTIVATION_REVEAL */}
          {flowState === 'ACTIVATION_REVEAL' && activationCard && (
            <motion.div
              key="reveal-activation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20"
            >
              {/* Card */}
              <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-72 h-[26rem] lg:w-96 lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-amber-400/50 flex-shrink-0"
              >
                <Image src={activationCard.image} alt={activationCard.name} fill className="object-cover" />
              </motion.div>

              {/* Content */}
              <div className="flex flex-col space-y-8 max-w-xl text-center lg:text-left">
                <div>
                  <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4 inline-block">
                    Activation
                  </span>
                  <h3 className="text-4xl lg:text-6xl font-bold mb-4">{activationCard.name}</h3>
                  <div className="text-2xl lg:text-3xl text-gray-500 font-light italic min-h-[4rem]">
                    "<Typewriter text={activationCard.meaning} />"
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-xl border border-amber-100 dark:border-amber-900">
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase text-sm tracking-widest">Call to Action</h4>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    To honor your reflection, you must embody the energy of the <strong>{activationCard.name}</strong>. This is your tool to move forward today.
                  </p>
                </div>

                <Button onClick={finishJourney} className="w-full lg:w-auto px-12 py-6 text-lg bg-black text-white dark:bg-white dark:text-black">
                  Complete the Circle
                </Button>
              </div>
            </motion.div>
          )}

          {/* STATE: SUMMARY */}
          {flowState === 'SUMMARY' && reflectionCard && activationCard && (
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12 w-full max-w-5xl mx-auto"
            >
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">
                  Good Day.
                </h2>
                <p className="text-xl text-gray-500">Your path is illuminated.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
                {/* Reflection Summary */}
                <Dialog>
                  <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-bold">{reflectionCard.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative w-full h-96 md:h-[600px] rounded-xl overflow-hidden">
                        <Image src={reflectionCard.image} alt={reflectionCard.name} fill className="object-cover" />
                      </div>
                      <div className="space-y-6">
                        <p className="text-2xl font-light italic">"{reflectionCard.meaning}"</p>
                        <hr />
                        <p className="text-lg leading-relaxed">{reflectionCard.reading}</p>
                      </div>
                    </div>
                  </DialogContent>

                  <FlowCardSummary
                    title="Your Anchor"
                    card={reflectionCard}
                    subtitle={`"${userFeelings}"`}
                    color="indigo"
                  />
                </Dialog>

                {/* Activation Summary */}
                <Dialog>
                  <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-bold">{activationCard.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative w-full h-96 md:h-[600px] rounded-xl overflow-hidden">
                        <Image src={activationCard.image} alt={activationCard.name} fill className="object-cover" />
                      </div>
                      <div className="space-y-6">
                        <p className="text-2xl font-light italic">"{activationCard.meaning}"</p>
                        <hr />
                        <p className="text-lg leading-relaxed">{activationCard.reading}</p>
                      </div>
                    </div>
                  </DialogContent>

                  <FlowCardSummary
                    title="Your Fire"
                    card={activationCard}
                    subtitle="Action Required"
                    color="amber"
                  />
                </Dialog>
              </div>

              {/* FIXED: Wisdom & Tips Added Here */}
              <div className="max-w-3xl mx-auto text-center space-y-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-center gap-2 text-indigo-500">
                  <Lightbulb className="w-6 h-6" />
                  <span className="text-sm font-bold uppercase tracking-widest">Words of Wisdom</span>
                </div>
                <p className="text-2xl font-serif italic text-gray-700 dark:text-gray-300 leading-relaxed">
                  "{["Trust the silence as much as the sound.", "Your reflection is the map; your action is the journey.", "Balance is not stillness, but the ability to move.", "The cards only show the door; you hold the key."][Math.floor(Math.random() * 4)]}"
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-left text-sm text-gray-500 bg-white/40 dark:bg-slate-900/40 p-6 rounded-xl">
                  <div className="flex gap-3">
                    <span className="text-lg">🌅</span>
                    <p><strong>Morning Ritual:</strong> Keep your Reflection card in mind as you start your day. It is your compass.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg">🌙</span>
                    <p><strong>Evening Practice:</strong> Review your Activation card. Did you embody its energy today?</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <Button onClick={startJourney} variant="ghost" className="text-gray-400 hover:text-gray-900 text-lg">
                  Start Over
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}

function FlowCardSummary({ title, card, subtitle, color }: { title: string, card: DrawnCard, subtitle: string, color: string }) {
  const borderColor = color === 'indigo' ? 'border-indigo-100 dark:border-indigo-900' : 'border-amber-100 dark:border-amber-900'
  const textColor = color === 'indigo' ? 'text-indigo-600' : 'text-amber-600'

  return (
    <DialogTrigger asChild>
      <div className={`cursor-pointer flex flex-col items-center space-y-6 p-8 bg-white/50 dark:bg-slate-900/50 rounded-3xl shadow-lg border-2 ${borderColor} hover:scale-105 transition-transform`}>
        <span className={`text-sm font-bold ${textColor} uppercase tracking-widest`}>{title}</span>
        <div className="relative w-48 h-72 lg:w-64 lg:h-96 rounded-xl overflow-hidden shadow-md opacity-90 grayscale-[20%] hover:grayscale-0 transition-all">
          <Image src={card.image} alt={card.name} fill className="object-cover" />
        </div>
        <div className="text-center space-y-2">
          <p className="font-bold text-2xl">{card.name}</p>
          <p className="text-lg text-gray-500 italic">{subtitle}</p>
          <span className="text-xs text-gray-400 uppercase tracking-wider mt-4 block">Click to Expand</span>
        </div>
      </div>
    </DialogTrigger>
  )
}
