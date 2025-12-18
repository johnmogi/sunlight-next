"use client"

import React from "react"

export function SunlightBlurBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black z-1">
            <iframe
                className="absolute top-1/2 left-1/2 w-[300%] h-[150%] -translate-x-1/2 -translate-y-1/2 object-cover"
                src="https://www.youtube.com/embed/1VMI7nffU-Q?autoplay=1&mute=1&controls=0&start=21511&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                allow="autoplay; encrypted-media"
                style={{ border: 'none' }}
                title="Sunlight Background"
            />
        </div>
    )
}
