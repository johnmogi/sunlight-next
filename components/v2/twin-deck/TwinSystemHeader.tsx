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

    const navLinks = [
        { name: 'Collections', href: '#collections', description: 'Major Arcana' },
        { name: 'About', href: '#about' },
        { name: 'Daily Spread', href: '#daily-spread' },
        { name: 'Studio', href: `/${locale}/studio` },
    ]

    return (
        <header
            className={`
                fixed top-0 left-0 right-0 z-50 
                backdrop-blur-md transition-all duration-300
                border-b border-white/10
                ${scrolled ? 'h-16 bg-background/40' : 'h-20 bg-background/20'}
            `}
            style={{
                background: scrolled
                    ? 'linear-gradient(to right, rgba(88, 28, 135, 0.4), rgba(55, 48, 163, 0.4))' // slight purple tint when scrolled
                    : 'linear-gradient(to right, rgba(88, 28, 135, 0.2), rgba(55, 48, 163, 0.2))'  // lighter tint when top
            }}
        >
            <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
                {/* Logo / Title */}
                <Link
                    href={`/${locale}/twin-system`}
                    className="flex items-center space-x-2 text-white"
                >
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform">
                        The Lost Garden
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-primary text-white relative group"
                        >
                            <span className="relative z-10">{link.name}</span>
                            {/* Subtle underline on hover matching main site feel */}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}

                    <div className="h-6 w-px bg-white/20 mx-2" />

                    {/* Controls */}
                    <div className="flex items-center space-x-2">
                        <ThemeToggle />
                        <LanguageSwitcher currentLocale={locale} />
                    </div>

                    {/* Version 0.20 Link - Styled Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-purple-600/80 hover:bg-purple-700 text-white px-4 py-2 shadow-lg transition-colors"
                    >
                        <span>See Version 0.20</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-white transition-colors"
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
                        href="/"
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
