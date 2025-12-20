/**
 * Major Arcana Gallery - Interactive display with swipeable cards
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DUAL_PATH_CARDS } from '@/lib/card-sets/set-dual-path'
import { CardRatingPicker } from './CardRatingPicker'
import { CardDetailModal } from './CardDetailModal'
import { CardCommentSection } from '@/components/card-comment-section'
import { SwipeableCard } from './SwipeableCard'

// Basic translations for the gallery UI
const UI_TRANSLATIONS = {
    en: {
        title: "The Major Arcana",
        subtitle: "Drag each card to reveal both Moonlight and Sunlight paths. Click for full details.",
        noComments: "No comments yet. Be the first!",
        yourName: "Your name",
        yourComment: "Add a comment...",
        postComment: "Post Comment",
        comingSoon: "Coming Soon"
    },
    es: {
        title: "Los Arcanos Mayores",
        subtitle: "Arrastra cada carta para revelar los caminos de Luz de Luna y Luz Solar. Clic para detalles.",
        noComments: "Sin comentarios aún. ¡Sé el primero!",
        yourName: "Tu nombre",
        yourComment: "Añadir comentario...",
        postComment: "Publicar",
        comingSoon: "Próximamente"
    },
    fr: {
        title: "Les Arcanes Majeurs",
        subtitle: "Faites glisser chaque carte pour révéler les chemins Clair de Lune et Soleil. Cliquez pour les détails.",
        noComments: "Pas de commentaires. Soyez le premier!",
        yourName: "Votre nom",
        yourComment: "Ajouter un commentaire...",
        postComment: "Publier",
        comingSoon: "Bientôt Disponible"
    },
    he: {
        title: "הארקנה הגדולה",
        subtitle: "גרור כל קלף כדי לחשוף את נתיבי אור הירח ואור השמש. לחץ לפרטים מלאים.",
        noComments: "אין תגובות עדיין. היה הראשון!",
        yourName: "שמך",
        yourComment: "הוסף תגובה...",
        postComment: "פרסם",
        comingSoon: "בקרוב"
    },
    ar: {
        title: "الأركانة الكبرى",
        subtitle: "اسحب كل بطاقة للكشف عن مسارات ضوء القمر وضوء الشمس. انقر للحصول على التفاصيل الكاملة.",
        noComments: "لا توجد تعليقات بعد. كن الأول!",
        yourName: "اسمك",
        yourComment: "أضف تعليقاً...",
        postComment: "نشر",
        comingSoon: "قريباً"
    }
}

// Placeholder for Card Translations - To be populated
const CARD_TRANSLATIONS = {
    en: {
        'major-0': { name: "The Sun", meaning: "Pure, undifferentiated consciousness - the 'I Am' awareness before it fractures into multiplicity." }
    },
    es: {
        'major-0': { name: "El Sol", meaning: "Conciencia pura e indiferenciada: la conciencia 'Yo Soy' antes de fracturarse en la multiplicidad." }
    },
    fr: {
        'major-0': { name: "Le Soleil", meaning: "Conscience pure et indifférenciée - la conscience 'Je Suis' avant qu'elle ne se fracture en multiplicité." }
    },
    he: {
        'major-0': { name: "השמש", meaning: "תודעה טהורה ובלתי מובחנת - תודעת ה'אני הנני' לפני שהיא מתפצלת לריבוי." }
    },
    ar: {
        'major-0': { name: "الشمس", meaning: "الوعي النقي غير المتمايز - وعي 'أنا أكون' قبل أن ينكسر إلى تعددية." }
    }
} as const

interface MajorArcanaGalleryProps {
    locale?: string
}

export function MajorArcanaGallery({ locale = 'en' }: MajorArcanaGalleryProps) {
    // Filter for major arcana only (type === 'major')
    const majorArcana = DUAL_PATH_CARDS.filter(card => card.type === 'major')

    // Modal state
    const [selectedCard, setSelectedCard] = useState<typeof majorArcana[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Expanded comments state for each card
    const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({})

    const t = UI_TRANSLATIONS[locale as keyof typeof UI_TRANSLATIONS] || UI_TRANSLATIONS.en
    const t_cards = CARD_TRANSLATIONS[locale as keyof typeof CARD_TRANSLATIONS] || CARD_TRANSLATIONS.en

    const handleCardClick = (card: typeof majorArcana[0]) => {
        // Allow clicking if in the ready list
        if (['major-0', 'major-4', 'major-5', 'major-6'].includes(card.id)) {
            setSelectedCard(card)
            setIsModalOpen(true)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedCard(null), 300)
    }

    const toggleComments = (cardId: string) => {
        setExpandedComments(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }))
    }

    // Pass translated messages to children
    const messages = {
        cardDetail: {
            noComments: t.noComments,
            yourName: t.yourName,
            yourComment: t.yourComment,
            postComment: t.postComment
        }
    }

    return (
        <>
            <section className="relative w-full py-16 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
                {/* Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t.title}
                        </h2>
                        <p className="text-lg md:text-xl text-purple-200 max-w-3xl mx-auto">
                            {t.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Card Grid - 5 columns as requested */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {majorArcana.map((card, index) => {
                            const isCommentsExpanded = expandedComments[card.id]
                            // Ready cards: 0 (Fool), 4 (Lighthouse), 5 (Garden), 6 (Stars)
                            const isReady = ['major-0', 'major-4', 'major-5', 'major-6'].includes(card.id)

                            // Lookup translation or fallback to default card data
                            const translation = (t_cards as any)[card.id]
                            const cardName = translation?.name || card.name
                            const cardMeaning = translation?.meaning || card.meaning

                            return (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                    className="space-y-3"
                                >
                                    {isReady ? (
                                        <>
                                            {/* Live Card */}
                                            <SwipeableCard
                                                cardId={card.id}
                                                cardNumber={card.number}
                                                cardName={cardName}
                                                cardMeaning={cardMeaning}
                                                moonlightImage={card.moonlightImage}
                                                sunlightImage={card.sunlightImage}
                                                onCardClick={() => handleCardClick(card)}
                                            />

                                            {/* Ratings - Below Card */}
                                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
                                                <CardRatingPicker
                                                    cardId={card.id}
                                                    compact={true}
                                                />
                                            </div>

                                            {/* Comments Section - Inline */}
                                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
                                                <CardCommentSection
                                                    cardId={card.id}
                                                    cardName={cardName}
                                                    isExpanded={isCommentsExpanded}
                                                    onToggle={() => toggleComments(card.id)}
                                                    messages={messages}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        /* Placeholder "Coming Soon" Card */
                                        <div className="aspect-[2/3] w-full rounded-2xl bg-black border-2 border-gray-800 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80" />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                                                <span className="text-4xl font-serif text-gray-700 font-bold opacity-30 select-none mb-2">{card.number}</span>
                                                <h3 className="text-gray-400 font-medium tracking-widest uppercase text-sm border-y border-gray-800 py-2 px-4">
                                                    {t.comingSoon}
                                                </h3>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Bottom decoration */}
                <div className="mt-12 flex justify-center">
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
                </div>
            </section>

            {/* Card Detail Modal */}
            {selectedCard && (
                <CardDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    card={selectedCard}
                    deckType="moonlight"
                    messages={messages}
                />
            )}
        </>
    )
}
