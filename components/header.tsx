"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { type Locale } from "@/lib/i18n"

interface HeaderProps {
  locale: Locale
  messages: any
}

import { usePathname } from "next/navigation"

export function Header({ locale, messages }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const navLinks = [
    { href: `/${locale}#philosophy`, label: messages.header.about },
    { href: `/${locale}#gallery`, label: messages.header.gallery },
    { href: `/${locale}#daily-spread`, label: messages.header.daily },
    { href: `/${locale}#complete-deck`, label: messages.header.collections },
    { href: `/${locale}/studio`, label: messages.header.studio },
  ]

  // Hide global header on root route (Twin System page) which has its own header
  // Show it on v020 page and other routes
  if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    return null
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-white/10 bg-background/20 backdrop-blur-md transition-all duration-300 ${scrolled ? "h-16 bg-background/40" : "h-20"
        }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${scrolled ? "h-16" : "h-20"
          }`}
      >
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center space-x-2 text-foreground transition-colors hover:text-primary">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent tracking-tight">
              SunLight
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground/80 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {pathname?.includes('/v020') && (
                  <Link
                    href={`/${locale}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-lg font-medium text-primary mb-4"
                  >
                    ← Back to Twin System
                  </Link>
                )}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Back Button */}
          {pathname?.includes('/v020') && (
            <Link
              href={`/${locale}`}
              className="hidden md:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
