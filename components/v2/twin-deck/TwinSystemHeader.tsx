/**
 * Twin System Navigation Header
 * Top navigation for the new Twin System (v0.30)
 */

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function TwinSystemHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navLinks = [
        { name: 'Collections', href: '#collections', description: 'Major Arcana' },
        { name: 'About', href: '#about' },
        { name: 'Daily Spread', href: '#daily-spread' },
        { name: 'Studio', href: '/en/studio' },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-md shadow-lg mb-0">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Title */}
                    <Link
                        href="/en/twin-system"
                        className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent hover:scale-105 transition-transform"
                    >
                        The Lost Garden
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="group relative text-purple-100 hover:text-white transition-colors"
                            >
                                <span className="relative z-10">{link.name}</span>
                                {link.description && (
                                    <span className="absolute -bottom-4 left-0 text-xs text-purple-300/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                        {link.description}
                                    </span>
                                )}
                                {/* Hover underline */}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}

                        {/* Version 0.20 Link */}
                        <Link
                            href="/"
                            className="px-4 py-2 bg-purple-600/80 hover:bg-purple-700 text-white text-sm rounded-lg shadow-lg transition-colors flex items-center gap-2 border border-purple-400/30"
                        >
                            <span>See Version 0.20</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-purple-200 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-purple-500/20 py-4 space-y-3 animate-in slide-in-from-top">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2 text-purple-100 hover:bg-purple-800/50 rounded-lg transition-colors"
                            >
                                <div className="font-medium">{link.name}</div>
                                {link.description && (
                                    <div className="text-xs text-purple-300/70 mt-1">{link.description}</div>
                                )}
                            </Link>
                        ))}

                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block mx-4 px-4 py-2 bg-purple-600/80 hover:bg-purple-700 text-white text-sm rounded-lg shadow-lg transition-colors text-center"
                        >
                            See Version 0.20 →
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}
