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
    const [position, setPosition] = useState(50) // Percentage from left
    const [isDragging, setIsDragging] = useState(false)

    // Translation hook
    const t = HERO_TRANSLATIONS[locale as keyof typeof HERO_TRANSLATIONS] || HERO_TRANSLATIONS.en

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        const container = document.getElementById('video-swiper-container')
        if (!container) return

        const rect = container.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
        setPosition(percentage)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging])

    return (
        <section
            id="video-swiper-container"
            className="relative w-full h-[100dvh] -mt-16 overflow-hidden select-none bg-black"
            style={{ cursor: isDragging ? 'ew-resize' : 'default' }}
        >
            {/* MOONLIGHT VIDEO - Full Background (Left reveals this) */}
            <div className="absolute inset-0">
                <iframe
                    className="absolute top-1/2 left-[48%] w-[180%] h-[180%] -translate-x-1/2 -translate-y-1/2 object-cover"
                    src="https://www.youtube.com/embed/dVYl5ImNjow?autoplay=1&mute=1&controls=0&loop=1&playlist=dVYl5ImNjow&start=259&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                    allow="autoplay; encrypted-media"
                    style={{
                        border: 'none',
                        pointerEvents: 'none'
                    }}
                    title="Moonlight Background"
                />

                {/* Moonlight Overlay */}
                {/* Moonlight Overlay - Softer Purplish darker hue + Mesh/Star Pattern */}
                {/* Animated Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-purple-900/25 to-slate-900/30 pointer-events-none mix-blend-multiply"
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
                        0%, 100% { opacity: 0.2; }
                        50% { opacity: 0.4; }
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

                {/* Loading Overlay (Masks spinner) */}
                <div className="absolute inset-0 bg-[#0f0c29] z-20 pointer-events-none"
                    style={{ animation: 'loadFade 2.5s ease-out forwards' }} />

                <div className="absolute inset-0 pointer-events-none mix-blend-screen"
                    style={{
                        opacity: 0.05, // Drastically reduced for subtle effect
                        backgroundImage: `radial-gradient(white 1px, transparent 2px), radial-gradient(rgba(255,255,255,0.8) 1px, transparent 2px)`,
                        backgroundSize: '30px 30px',
                        backgroundPosition: '0 0, 15px 15px',
                        animation: 'blink 4s ease-in-out infinite'
                    }}
                />

                {/* Moonlight Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    {/* Custom Crescent inside Full Moon Icon - "Crescent inside Full Moon" */}
                    <div className="w-24 h-24 md:w-32 md:h-32 mb-8 drop-shadow-2xl text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" fill="rgba(255,255,255,0.2)" />
                        </svg>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6 px-8 py-4 rounded-2xl text-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(99, 102, 241, 0.35))',
                            backdropFilter: 'blur(8px)'
                        }}>
                        {t.moon_title}
                    </h1>
                    <p className="text-xl md:text-3xl text-white max-w-3xl text-center px-6 py-3 rounded-xl mb-8"
                        style={{ background: 'rgba(88, 28, 135, 0.6)', backdropFilter: 'blur(8px)' }}>
                        {t.moon_desc}
                    </p>

                    {/* Restored Moonlight CTA */}
                    <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-semibold transition-all backdrop-blur-md flex items-center gap-2 group pointer-events-auto">
                        <span>Explore Moonlight</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            {/* SUNLIGHT VIDEO - Clipped reveal (Right side) */}
            <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 0 0 ${position}%)` }}
            >
                <iframe
                    className="absolute top-[-25%] left-1/2 w-[150%] h-[150%] -translate-x-1/2 object-cover"
                    src="https://www.youtube.com/embed/1VMI7nffU-Q?autoplay=1&mute=1&controls=0&loop=1&playlist=1VMI7nffU-Q&start=22607&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                    allow="autoplay; encrypted-media"
                    style={{
                        border: 'none',
                        pointerEvents: 'none'
                    }}
                    title="Sunlight Background"
                />

                {/* Sunlight Overlay - Subtle dimming + Floral/Organic css pattern */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                {/* Animated Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-amber-500/10 to-yellow-600/10 pointer-events-none mix-blend-color"
                    style={{ animation: 'hueShift 15s infinite alternate' }} />

                {/* Loading Overlay (Masks spinner) */}
                <div className="absolute inset-0 bg-[#0ea5e9] z-20 pointer-events-none"
                    style={{ animation: 'loadFade 2.5s ease-out forwards' }} />

                <div className="absolute inset-0 pointer-events-none mix-blend-screen"
                    style={{
                        opacity: 0.05, // Drastically reduced for subtle effect
                        backgroundImage: `radial-gradient(white 1px, transparent 2px), radial-gradient(rgba(255,255,255,0.8) 1px, transparent 2px)`,
                        backgroundSize: '30px 30px',
                        backgroundPosition: '0 0, 15px 15px',
                        animation: 'blink 4s ease-in-out infinite'
                    }}
                />

                {/* Sunlight Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <Sun className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-2xl mb-8" />
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold drop-shadow-2xl mb-6 px-8 py-4 rounded-2xl text-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(254, 243, 199, 0.85))',
                            backdropFilter: 'blur(12px)',
                            color: '#1f2937'
                        }}>
                        {t.sun_title}
                    </h1>
                    <p className="text-xl md:text-3xl text-center max-w-3xl px-6 py-3 rounded-xl mb-8"
                        style={{
                            background: 'rgba(254, 249, 195, 0.75)',
                            backdropFilter: 'blur(8px)',
                            color: '#92400e'
                        }}>
                        {t.sun_desc}
                    </p>

                    {/* Restored Sunlight CTA */}
                    <button className="px-8 py-3 bg-white/90 hover:bg-white text-orange-900 border border-orange-200 rounded-full font-semibold transition-all shadow-lg flex items-center gap-2 group pointer-events-auto">
                        <span>Explore Sunlight</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            {/* Divider & Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-50"
                style={{ left: `${position}%` }}
                onMouseDown={handleMouseDown}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-gray-200 cursor-ew-resize">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                        </svg>
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Instruction Hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 text-center">
                <p className="text-white text-sm md:text-base drop-shadow-lg font-semibold">
                    {t.drag_hint}
                </p>
            </div>
        </section>
    )
}
