/**
 * Design System Tokens - V2
 * Central source of truth for design values
 */

// Color System (HSL for better manipulation)
export const colors = {
    // Primary - Sun theme
    sun: {
        50: 'hsl(48, 100%, 96%)',
        100: 'hsl(48, 96%, 89%)',
        200: 'hsl(48, 97%, 77%)',
        300: 'hsl(46, 97%, 65%)',
        400: 'hsl(43, 96%, 56%)',
        500: 'hsl(38, 92%, 50%)', // Main
        600: 'hsl(32, 95%, 44%)',
        700: 'hsl(26, 90%, 37%)',
        800: 'hsl(23, 83%, 31%)',
        900: 'hsl(22, 78%, 26%)',
    },

    // Secondary - Moon theme
    moon: {
        50: 'hsl(240, 40%, 98%)',
        100: 'hsl(240, 38%, 94%)',
        200: 'hsl(239, 37%, 88%)',
        300: 'hsl(238, 36%, 78%)',
        400: 'hsl(237, 35%, 66%)',
        500: 'hsl(235, 47%, 55%)', // Main
        600: 'hsl(234, 56%, 47%)',
        700: 'hsl(233, 54%, 39%)',
        800: 'hsl(232, 51%, 32%)',
        900: 'hsl(231, 48%, 27%)',
    },

    // Accent - Cards and highlights
    accent: {
        50: 'hsl(330, 81%, 96%)',
        100: 'hsl(330, 77%, 90%)',
        200: 'hsl(329, 79%, 81%)',
        300: 'hsl(328, 78%, 70%)',
        400: 'hsl(327, 73%, 58%)',
        500: 'hsl(326, 78%, 47%)', // Main
        600: 'hsl(325, 84%, 38%)',
        700: 'hsl(324, 80%, 31%)',
        800: 'hsl(323, 72%, 26%)',
        900: 'hsl(322, 67%, 23%)',
    },

    // Neutrals
    gray: {
        50: 'hsl(210, 20%, 98%)',
        100: 'hsl(210, 17%, 95%)',
        200: 'hsl(214, 15%, 91%)',
        300: 'hsl(213, 13%, 83%)',
        400: 'hsl(215, 12%, 70%)',
        500: 'hsl(215, 11%, 55%)',
        600: 'hsl(215, 14%, 42%)',
        700: 'hsl(215, 19%, 35%)',
        800: 'hsl(215, 25%, 27%)',
        900: 'hsl(216, 28%, 17%)',
    },

    // Semantic colors
    success: 'hsl(142, 76%, 36%)',
    warning: 'hsl(38, 92%, 50%)',
    error: 'hsl(0, 84%, 60%)',
    info: 'hsl(199, 89%, 48%)',
} as const

// Typography Scale
export const typography = {
    fonts: {
        sans: 'var(--font-inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        display: 'var(--font-playfair, Georgia, serif)',
    },

    sizes: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem',// 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
        '6xl': '3.75rem', // 60px
    },

    weights: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
    },

    lineHeights: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
        loose: '2',
    },
} as const

// Spacing Scale (4px base)
export const spacing = {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
} as const

// Border Radius
export const radius = {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
} as const

// Shadows
export const shadows = {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const

// Breakpoints (mobile-first)
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const

// Z-index scale
export const zIndex = {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
} as const

// Animation durations
export const durations = {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
    slower: '500ms',
} as const

// Animation easings
export const easings = {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const
