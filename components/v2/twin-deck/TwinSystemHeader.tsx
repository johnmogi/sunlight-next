/**
 * Twin System Navigation Header
 * Top navigation for the new Twin System (v0.30)
 */

'use client'

import Link from 'next/link'
import * as React from 'react'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { type Locale } from '@/lib/i18n'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'

interface TwinSystemHeaderProps {
    locale?: Locale
}

export function TwinSystemHeader({ locale = 'en' }: TwinSystemHeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect for resizing
    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Navigation Translations
    const TRANSLATIONS = {
        en: { collections: 'Collections', about: 'About', daily: 'Daily Spread', studio: 'Studio', version: 'See Version 0.20' },
        es: { collections: 'Colecciones', about: 'Acerca de', daily: 'Lectura Diaria', studio: 'Estudio', version: 'Ver Versión 0.20' },
        fr: { collections: 'Collections', about: 'À propos', daily: 'Tirage Quotidien', studio: 'Studio', version: 'Voir Version 0.20' },
        he: { collections: 'אוספים', about: 'אודות', daily: 'פריסה יומית', studio: 'סטודיו', version: 'V0.20' },
        ar: { collections: 'مجموعات', about: 'حول', daily: 'قراءة يومية', studio: 'استوديو', version: 'النسخة 0.20' }
    }

    const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS.en

    const navLinks = [
        { name: t.collections, href: '#collections', description: 'Major Arcana' },
        { name: t.about, href: '#about' },
        { name: t.daily, href: '#daily-spread' },
        { name: t.studio, href: `/${locale}/studio` },
    ]

    return (
        <header
            className={`
                fixed top-0 left-0 right-0 z-50 
                backdrop-blur-md transition-all duration-300
                border-b
                ${scrolled
                    ? 'h-16 bg-white/80 dark:bg-black/60 border-gray-200 dark:border-white/10 shadow-sm'
                    : 'h-20 bg-white/50 dark:bg-black/30 border-transparent dark:border-white/5'
                }
            `}
        >
            <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
                {/* Logo / Title */}
                <Link
                    href={`/${locale}`}
                    className="flex items-center space-x-2 text-gray-900 dark:text-white"
                >
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform">
                        The Lost Garden
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-300 text-gray-700 dark:text-gray-200 relative group"
                        >
                            <span className="relative z-10">{link.name}</span>
                            {/* Subtle underline on hover matching main site feel */}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-amber-500 group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}

                    <div className="h-6 w-px bg-gray-200 dark:bg-white/20 mx-2" />

                    {/* Controls */}
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
                        <ThemeToggle />
                        <LanguageSwitcher currentLocale={locale} />
                    </div>

                    {/* Version 0.20 Link - Styled Button */}
                    <Link
                        href={`/${locale}/v020`}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 shadow-md transition-colors"
                    >
                        <span>{t.version}</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 md:hidden text-gray-900 dark:text-white">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 transition-colors hover:bg-gray-100 dark:hover:bg-white/10 rounded-md"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-white/10 py-4 space-y-3 animate-in slide-in-from-top bg-black/90 backdrop-blur-xl absolute left-0 right-0 px-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <div className="font-medium">{link.name}</div>
                        </Link>
                    ))}

                    <div className="px-4 py-2 flex justify-between items-center text-white">
                        <span className="text-sm">Language</span>
                        <LanguageSwitcher currentLocale={locale} />
                    </div>

                    <Link
                        href={`/${locale}/v020`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block mx-4 px-4 py-2 bg-purple-600/80 hover:bg-purple-700 text-white text-sm rounded-lg shadow-lg transition-colors text-center"
                    >
                        See Version 0.20 →
                    </Link>
                </div>
            )}
        </header>
    )
}
