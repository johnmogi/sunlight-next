import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Check for Cookie Auth on /admin routes
  if (pathname.includes('/admin')) {
    // allow access to login page
    if (pathname.includes('/login')) {
      if (pathnameHasLocale) return
    } else {
      const hasSession = request.cookies.has('admin_session')

      if (!hasSession) {
        const url = request.nextUrl.clone()
        url.pathname = `/${defaultLocale}/admin/login`
        return NextResponse.redirect(url)
      }
    }
  }

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - _next (Next.js internals)
    // - api (API routes)
    // - Static files (images, fonts, etc.)
    '/((?!_next|api|.*\\..*|images).*)',
  ],
}
