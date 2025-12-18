'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Sparkles, X as CloseIcon } from 'lucide-react'
import { CardRatingPicker } from './CardRatingPicker'
import { CardCommentSection } from '@/components/card-comment-section'

const TRANSLATIONS = {
    en: {
        title: "The Dual-Path System",
        subtitle_overview: "Every card holds two perspectives: Moonlight (receptive) and Sunlight (projective)",
        subtitle_symbolism: "Explore the elemental associations, animals, and colors hidden within the suits",
        subtitle_music: "Listen to the musical journey of the Twin System",
        tab_philosophy: "Philosophy",
        tab_symbolism: "Symbolism",
        tab_music: "Music",
        moon_title: "Moonlight Path",
        moon_desc_short: "Receptive • The Question • The Wound",
        moon_desc_long: "The feminine principle of introspection and reflection. Exploring shadows, uncovering hidden truths, and acknowledging the wound before transformation can begin.",
        sun_title: "Sunlight Path",
        sun_desc_short: "Active • The Answer • The Cure",
        sun_desc_long: "The masculine principle of action and manifestation. Bringing light to the shadows, applying the remedy, and actively moving towards healing and growth.",
        symbolism_title: "Elemental & Animal Symbolism",
        symbolism_cta: "Click to view full details, rate, and discuss the symbolism.",
        symbolism_desc: "A guide to the animals and colors connecting the suits across the dual system.",
        music_title: "The Sound of the Garden",
        music_desc: "Immerse yourself in the auditory experience of the major arcana.",
        modal_rate: "Rate this Breakdown",
        modal_discuss: "Community Discussion",
        modal_title: "Symbolism Breakdown",
        rate_guide: "Rate this Guide",
        comments: {
            yourName: "Your Name",
            yourComment: "Share your thoughts...",
            postComment: "Post",
            noComments: "No thoughts shared yet. Be the first!"
        }
    },
    es: {
        title: "El Sistema de Doble Vía",
        subtitle_overview: "Cada carta tiene dos perspectivas: Luz de Luna (receptiva) y Luz Solar (proyectiva)",
        subtitle_symbolism: "Explora las asociaciones elementales, animales y colores ocultos en los palos",
        subtitle_music: "Escucha el viaje musical del Sistema Gemelo",
        tab_philosophy: "Filosofía",
        tab_symbolism: "Simbolismo",
        tab_music: "Música",
        moon_title: "Camino de Luz de Luna",
        moon_desc_short: "Receptivo • La Pregunta • La Herida",
        moon_desc_long: "El principio femenino de introspección y reflexión. Explorar sombras, descubrir verdades ocultas y reconocer la herida antes de la transformación.",
        sun_title: "Camino de Luz Solar",
        sun_desc_short: "Activo • La Respuesta • La Cura",
        sun_desc_long: "El principio masculino de acción y manifestación. Llevar luz a las sombras, aplicar el remedio y avanzar activamente hacia la curación.",
        symbolism_title: "Simbolismo Elemental y Animal",
        symbolism_cta: "Clic para ver detalles completos, calificar y discutir.",
        symbolism_desc: "Una guía de los animales y colores que conectan los palos a través del sistema dual.",
        music_title: "El Sonido del Jardín",
        music_desc: "Sumérgete en la experiencia auditiva de los arcanos mayores.",
        modal_rate: "Califica este Desglose",
        modal_discuss: "Discusión Comunitaria",
        modal_title: "Desglose del Simbolismo",
        rate_guide: "Calificar Guía",
        comments: {
            yourName: "Tu Nombre",
            yourComment: "Comparte tus ideas...",
            postComment: "Publicar",
            noComments: "Aún no hay comentarios. ¡Sé el primero!"
        }
    },
    fr: {
        title: "Le Système à Double Voie",
        subtitle_overview: "Chaque carte contient deux perspectives : Clair de Lune (réceptif) et Lumière du Soleil (projectif)",
        subtitle_symbolism: "Explorez les associations élémentaires, les animaux et les couleurs cachés dans les suites",
        subtitle_music: "Écoutez le voyage musical du Système Jumeau",
        tab_philosophy: "Philosophie",
        tab_symbolism: "Symbolisme",
        tab_music: "Musique",
        moon_title: "Chemin du Clair de Lune",
        moon_desc_short: "Réceptif • La Question • La Blessure",
        moon_desc_long: "Le principe féminin d'introspection et de réflexion. Explorer les ombres, découvrir des vérités cachées et reconnaître la blessure avant la transformation.",
        sun_title: "Chemin de la Lumière du Soleil",
        sun_desc_short: "Actif • La Réponse • Le Remède",
        sun_desc_long: "Le principe masculin d'action et de manifestation. Apporter la lumière aux ombres, appliquer le remède et avancer activement vers la guérison.",
        symbolism_title: "Symbolisme Élémentaire et Animal",
        symbolism_cta: "Cliquez pour voir les détails, noter et discuter du symbolisme.",
        symbolism_desc: "Un guide des animaux et des couleurs reliant les suites à travers le système double.",
        music_title: "Le Son du Jardin",
        music_desc: "Plongez dans l'expérience auditive des arcanos majeurs.",
        modal_rate: "Notez cette Analyse",
        modal_discuss: "Discussion Communautaire",
        modal_title: "Analyse du Symbolisme",
        rate_guide: "Noter ce Guide",
        comments: {
            yourName: "Votre Nom",
            yourComment: "Partagez vos pensées...",
            postComment: "Publier",
            noComments: "Aucun commentaire pour l'instant. Soyez le premier !"
        }
    },
    he: {
        title: "Lost Garden 03.0",
        subtitle_overview: "כל קלף מחזיק בשתי פרספקטיבות: אור ירח (מקבל) ואור שמש (מקרין)",
        subtitle_symbolism: "גלה את הקשרים היסודיים, החיות והצבעים החבויים בתוך הסדרות",
        subtitle_music: "הקשב למסע המוזיקלי של המערכת הכפולה",
        tab_philosophy: "פילוסופיה",
        tab_symbolism: "סימבוליזם",
        tab_music: "מוזיקה",
        moon_title: "נתיב אור הירח",
        moon_desc_short: "קבלה • השאלה • הפצע",
        moon_desc_long: "העיקרון הנשי של התבוננות פנימית והשתקפות. חקירת צללים, חשיפת אמיתות נסתרות והכרה בפצע לפני שהשינוי יכול להתחיל.",
        sun_title: "נתיב אור השמש",
        sun_desc_short: "פעולה • התשובה • התרופה",
        sun_desc_long: "העיקרון הגברי של פעולה והגשמה. הבאת אור אל הצללים, יישום התרופה והתקדמות אקטיבית לעבר ריפוי וצמיחה.",
        symbolism_title: "סימבוליזם יסודות וחיות",
        symbolism_cta: "לחץ לצפייה בפרטים מלאים, לדרג ולדון בסימבוליזם.",
        symbolism_desc: "מדריך לחיות ולצבעים המקשרים בין הסדרות במערכת הכפולה.",
        music_title: "צלילי הגן",
        music_desc: "התעמק בחוויה השמיעתית של הארקנה הגדולה.",
        modal_rate: "דרג הסבר זה",
        modal_discuss: "דיון קהילתי",
        modal_title: "פירוט הסימבוליזם",
        rate_guide: "דרג מדריך זה",
        comments: {
            yourName: "שמך",
            yourComment: "שתף את מחשבותיך...",
            postComment: "פרסם",
            noComments: "עדיין לא שותפו מחשבות. היה הראשון!"
        }
    },
    ar: {
        title: "نظام المسار المزدوج",
        subtitle_overview: "كل بطاقة تحمل منظورين: ضوء القمر (متقبل) وضوء الشمس (إسقاطي)",
        subtitle_symbolism: "اكتشف الارتباطات العنصرية والحيوانات والألوان المخبأة داخل المجموعات",
        subtitle_music: "استمع إلى الرحلة الموسيقية للنظام المزدوج",
        tab_philosophy: "الفلسفة",
        tab_symbolism: "الرمزية",
        tab_music: "موسيقى",
        moon_title: "مسار ضوء القمر",
        moon_desc_short: "متقبل • السؤال • الجرح",
        moon_desc_long: "المبدأ الأنثوي للاستبطان والتفكير. استكشاف الظلال وكشف الحقائق الخفية والاعتراف بالجرح قبل أن يبدأ التحول.",
        sun_title: "مسار ضوء الشمس",
        sun_desc_short: "نشط • الجواب • العلاج",
        sun_desc_long: "المبدأ الذكوري للعمل والتجلي. جلب الضوء إلى الظلال وتطبيق العلاج والتحرك بنشاط نحو الشفاء والنمو.",
        symbolism_title: "رمزية العناصر والحيوانات",
        symbolism_cta: "انقر لعرض التفاصيل الكاملة والتقييم ومناقشة الرمزية.",
        symbolism_desc: "دليل للحيوانات والألوان التي تربط المجموعات عبر النظام المزدوج.",
        music_title: "صوت الحديقة",
        music_desc: "انغمس في التجربة السمعية للأركانة الكبرى.",
        modal_rate: "قيّم هذا التحليل",
        modal_discuss: "مناقشة المجتمع",
        modal_title: "تفاصيل الرمزية",
        rate_guide: "قيم هذا الدليل",
        comments: {
            yourName: "اسمك",
            yourComment: "شارك أفكارك...",
            postComment: "نشر",
            noComments: "لم يتم مشاركة أي أفكار بعد. كن الأول!"
        }
    }
}

interface TwinAboutSectionProps {
    locale?: string
}

export function TwinAboutSection({ locale = 'en' }: TwinAboutSectionProps) {
    const [activeTab, setActiveTab] = React.useState<'overview' | 'symbolism' | 'music'>('symbolism')
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    // Translations
    const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS.en

    // Map locale to correct image
    const infographicMap: Record<string, string> = {
        en: '/images/infolansys/animen.png',
        fr: '/images/infolansys/animaufr.png',
        es: '/images/infolansys/animes.png',
        he: '/images/infolansys/animheb.png',
        ar: '/images/infolansys/animar.png',
    }
    const infographicSrc = infographicMap[locale] || infographicMap['en']

    return (
        <section id="about" className="relative py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header & Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                        {t.title}
                    </h2>

                    {/* Tab Navigation */}
                    <div className="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'overview'
                                    ? 'bg-white dark:bg-gray-700 text-purple-700 dark:text-purple-300 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                }`}
                        >
                            {t.tab_philosophy}
                        </button>
                        <button
                            onClick={() => setActiveTab('symbolism')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'symbolism'
                                    ? 'bg-white dark:bg-gray-700 text-amber-700 dark:text-amber-300 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                }`}
                        >
                            {t.tab_symbolism}
                        </button>
                        <button
                            onClick={() => setActiveTab('music')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'music'
                                    ? 'bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                }`}
                        >
                            {t.tab_music}
                        </button>
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {activeTab === 'overview' && t.subtitle_overview}
                        {activeTab === 'symbolism' && t.subtitle_symbolism}
                        {activeTab === 'music' && t.subtitle_music}
                    </p>
                </motion.div>

                {/* Content Area */}
                <div className="min-h-[400px]">
                    {activeTab === 'overview' && (
                        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-8 text-white shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-white/10 rounded-full">
                                        <Moon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold">{t.moon_title}</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-purple-100 font-medium text-lg">
                                        {t.moon_desc_short}
                                    </p>
                                    <p className="text-purple-200 leading-relaxed">
                                        {t.moon_desc_long}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-8 text-white shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-white/10 rounded-full">
                                        <Sun className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold">{t.sun_title}</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-amber-50 font-medium text-lg">
                                        {t.sun_desc_short}
                                    </p>
                                    <p className="text-amber-100 leading-relaxed">
                                        {t.sun_desc_long}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'symbolism' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Symbolism Infographic */}
                            <div
                                className="bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-950 dark:to-amber-950 rounded-xl p-8 border-4 border-dashed border-purple-300 dark:border-purple-700 text-center overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <div className="mb-6 pointer-events-none">
                                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                                        {t.symbolism_title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-6">
                                        {t.symbolism_cta}
                                    </p>
                                </div>

                                <div className="rounded-lg overflow-hidden shadow-2xl max-w-4xl mx-auto bg-black/5 pointer-events-none">
                                    <img
                                        src={infographicSrc}
                                        alt="Twin System Symbolism Infographic"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'music' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto space-y-6">
                            {/* YouTube Album Embed */}
                            <div className="relative aspect-video bg-black/90 rounded-xl shadow-2xl border border-gray-800 overflow-hidden group">
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                    {/* Overlay or Play Hint could go here */}
                                </div>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/929InPS_r9w"
                                    title="Moonlight Sun House Album"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0"
                                />
                            </div>

                            {/* New Album Announcement */}
                            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/50">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                    </span>
                                    <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                                        New Album Coming Soon
                                    </h4>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    We are currently crafting the next chapter of the Twin System's musical journey.
                                    <br />
                                    <span className="text-sm opacity-80">Stay tuned for the release.</span>
                                </p>
                            </div>

                            <p className="text-center text-gray-400 text-sm">
                                {t.music_desc}
                            </p>
                        </div>
                    )}
                </div>

                {/* Detail Modal - Full Screen / Gallery Mode */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
                        <div
                            className="bg-white dark:bg-gray-900 rounded-xl w-[95vw] h-[90vh] overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Close Button - Floating */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
                            >
                                <CloseIcon className="w-6 h-6" />
                            </button>

                            {/* Main Image Area - Maximized */}
                            <div className="flex-1 bg-black/5 dark:bg-black/50 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
                                <img
                                    src={infographicSrc}
                                    alt="Full Symbolism Infographic"
                                    className="max-w-full max-h-full object-contain shadow-lg rounded-md"
                                />
                            </div>

                            {/* Sidebar / Bottom Panel - Interaction */}
                            <div className="w-full lg:w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
                                <div className="p-6 overflow-y-auto flex-1">
                                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                        {t.modal_title}
                                    </h3>

                                    <div className="space-y-8">
                                        {/* Ratings */}
                                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                            <h4 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400 uppercase tracking-wider">{t.rate_guide}</h4>
                                            <CardRatingPicker cardId="symbolism-infographic" />
                                        </div>

                                        {/* Comments */}
                                        <div>
                                            <h4 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400 uppercase tracking-wider">{t.modal_discuss}</h4>
                                            <CardCommentSection
                                                cardId="symbolism-infographic"
                                                cardName={t.symbolism_title}
                                                isExpanded={true}
                                                onToggle={() => { }}
                                                messages={{ cardDetail: t.comments }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
