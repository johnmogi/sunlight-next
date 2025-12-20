"use client"

import React, { useState } from 'react'
import { Sun, Circle } from 'lucide-react'

// Translations for the Hero Section
const HERO_TRANSLATIONS = {
    en: {
        moon_title: "The Moonlight Path",
        moon_desc: "Receptive • Reflective • The Question • The Wound",
        sun_title: "The Sunlight Path",
        sun_desc: "Active • Projective • The Answer • The Cure",
        drag_hint: "← Drag to reveal the dual path →"
    },
    es: {
        moon_title: "El Camino de Luz de Luna",
        moon_desc: "Receptivo • Reflexivo • La Pregunta • La Herida",
        sun_title: "El Camino de Luz Solar",
        sun_desc: "Activo • Proyectivo • La Respuesta • La Cura",
        drag_hint: "← Arrastra para revelar el camino dual →"
    },
    fr: {
        moon_title: "Le Chemin du Clair de Lune",
        moon_desc: "Réceptif • Réfléchi • La Question • La Blessure",
        sun_title: "Le Chemin de la Lumière du Soleil",
        sun_desc: "Actif • Projectif • La Réponse • Le Remède",
        drag_hint: "← Glissez pour révéler le double chemin →"
    },
    he: {
        moon_title: "נתיב אור הירח",
        moon_desc: "קבלה • השתקפות • השאלה • הפצע",
        sun_title: "נתיב אור השמש",
        sun_desc: "פעולה • הקרנה • התשובה • התרופה",
        drag_hint: "← גרור כדי לחשוף את הנתיב הכפול →"
    },
    ar: {
        moon_title: "مسار ضوء القمر",
        moon_desc: "متقبل • تأملي • السؤال • الجرح",
        sun_title: "مسار ضوء الشمس",
        sun_desc: "نشط • إسقاطي • الجواب • العلاج",
        drag_hint: "← اسحب للكشف عن المسار المزدوج →"
    }
}

interface DualVideoSwiperProps {
    locale?: string
}

export function DualVideoSwiper({ locale = 'en' }: DualVideoSwiperProps) {
    const [activeView, setActiveView] = useState<'sunlight' | 'moonlight'>('sunlight')
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Translation hook
    const t = HERO_TRANSLATIONS[locale as keyof typeof HERO_TRANSLATIONS] || HERO_TRANSLATIONS.en

    const toggleView = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setActiveView(prev => prev === 'sunlight' ? 'moonlight' : 'sunlight')
            setIsTransitioning(false)
        }, 300) // Small delay for fade effect if needed, keeps interaction crisp
    }

    const isSun = activeView === 'sunlight'

    return (
        <section
            id="video-swiper-container"
            className="relative w-full h-[100dvh] -mt-16 overflow-hidden select-none bg-black"
        >
            {/* MOONLIGHT VIDEO - Full Background */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isSun ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <iframe
                    className="absolute top-1/2 left-1/2 w-[300%] h-[120%] md:w-[180%] md:h-[180%] md:left-[48%] -translate-x-1/2 -translate-y-1/2 object-cover"
                    src="https://www.youtube.com/embed/dVYl5ImNjow?autoplay=1&mute=1&controls=0&loop=1&playlist=dVYl5ImNjow&start=269&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                    allow="autoplay; encrypted-media"
                    style={{
                        border: 'none',
                        pointerEvents: 'none'
                    }}
                    title="Moonlight Background"
                />

                {/* Moonlight Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-900/15 to-slate-900/20 pointer-events-none mix-blend-multiply"
                    style={{ animation: 'hueShift 10s infinite alternate' }} />

                {/* Mesh Animation Styles */}
                <style jsx global>{`
                    @keyframes meshDrift {
                        0% { background-position: 0 0; transform: rotate(0deg); }
                        100% { background-position: 60px 60px; transform: rotate(0deg); }
                    }
                    @keyframes meshRotate {
                        0% { transform: scale(1.5) rotate(0deg); }
                        100% { transform: scale(1.5) rotate(360deg); }
                    }
                    @keyframes blink {
                        0%, 100% { opacity: 0.1; }
                        50% { opacity: 0.2; }
                    }
                    @keyframes hueShift {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(30deg); }
                    }
                    @keyframes loadFade {
                        0% { opacity: 1; }
                        50% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                `}</style>

                {/* Loading Overlay */}
                <div className="absolute inset-0 bg-[#0f0c29] z-20 pointer-events-none"
                    style={{ animation: 'loadFade 2.5s ease-out forwards' }} />

                <div className="absolute inset-0 pointer-events-none mix-blend-screen"
                    style={{
                        opacity: 0.03,
                        backgroundImage: `radial-gradient(white 1px, transparent 2px), radial-gradient(rgba(255,255,255,0.8) 1px, transparent 2px)`,
                        backgroundSize: '30px 30px',
                        backgroundPosition: '0 0, 15px 15px',
                        animation: 'blink 4s ease-in-out infinite'
                    }}
                />

                {/* Moonlight Content */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 delay-100 ${!isSun ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="w-24 h-24 md:w-32 md:h-32 mb-8 drop-shadow-2xl text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" fill="rgba(255,255,255,0.2)" />
                        </svg>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6 px-12 py-6 rounded-2xl text-center max-w-[90vw] md:max-w-4xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(99, 102, 241, 0.35))',
                            backdropFilter: 'blur(8px)'
                        }}>
                        {t.moon_title}
                    </h1>
                    <p className="text-xl md:text-3xl text-white text-center px-10 py-5 rounded-xl mb-10 max-w-[90vw] md:max-w-4xl leading-relaxed"
                        style={{ background: 'rgba(88, 28, 135, 0.6)', backdropFilter: 'blur(8px)' }}>
                        {t.moon_desc}
                    </p>

                    <button
                        onClick={toggleView}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-semibold transition-all backdrop-blur-md flex items-center gap-2 group pointer-events-auto hover:scale-105 active:scale-95"
                    >
                        <span>Explore Sunlight</span>
                        <Sun className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </button>
                </div>
            </div>

            {/* SUNLIGHT VIDEO - Full Background */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isSun ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <iframe
                    className="absolute top-1/2 left-1/2 w-[300%] h-[120%] md:w-[150%] md:h-[150%] md:top-[-25%] md:left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 object-cover"
                    src="https://www.youtube.com/embed/1VMI7nffU-Q?autoplay=1&mute=1&controls=0&loop=1&playlist=1VMI7nffU-Q&start=22607&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                    allow="autoplay; encrypted-media"
                    style={{
                        border: 'none',
                        pointerEvents: 'none'
                    }}
                    title="Sunlight Background"
                />

                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-amber-500/5 to-yellow-600/5 pointer-events-none mix-blend-color"
                    style={{ animation: 'hueShift 15s infinite alternate' }} />

                <div className="absolute inset-0 bg-[#0ea5e9] z-20 pointer-events-none"
                    style={{ animation: 'loadFade 2.5s ease-out forwards' }} />

                <div className="absolute inset-0 pointer-events-none mix-blend-screen"
                    style={{
                        opacity: 0.03,
                        backgroundImage: `radial-gradient(white 1px, transparent 2px), radial-gradient(rgba(255,255,255,0.8) 1px, transparent 2px)`,
                        backgroundSize: '30px 30px',
                        backgroundPosition: '0 0, 15px 15px',
                        animation: 'blink 4s ease-in-out infinite'
                    }}
                />

                {/* Sunlight Content */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 delay-100 ${isSun ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Sun className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-2xl mb-8" />
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold drop-shadow-2xl mb-6 px-12 py-6 rounded-2xl text-center max-w-[90vw] md:max-w-4xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(254, 243, 199, 0.85))',
                            backdropFilter: 'blur(12px)',
                            color: '#1f2937'
                        }}>
                        {t.sun_title}
                    </h1>
                    <p className="text-xl md:text-3xl text-center px-10 py-5 rounded-xl mb-10 max-w-[90vw] md:max-w-4xl leading-relaxed"
                        style={{
                            background: 'rgba(254, 249, 195, 0.75)',
                            backdropFilter: 'blur(8px)',
                            color: '#92400e'
                        }}>
                        {t.sun_desc}
                    </p>

                    <button
                        onClick={toggleView}
                        className="px-8 py-3 bg-amber-900/90 hover:bg-amber-950 text-amber-50 border border-amber-800 rounded-full font-semibold transition-all shadow-lg flex items-center gap-2 group pointer-events-auto hover:scale-105 active:scale-95"
                    >
                        <span>Explore Moonlight</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:-rotate-12 transition-transform text-amber-200">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}
