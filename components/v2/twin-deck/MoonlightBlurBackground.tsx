"use client"

import React from "react"

export function MoonlightBlurBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black z-1">
            <iframe
                className="absolute top-1/2 left-1/2 w-[300%] h-[150%] -translate-x-1/2 -translate-y-1/2 object-cover"
                src="https://www.youtube.com/embed/hMM9xVDMUgc?autoplay=1&mute=1&controls=0&loop=1&playlist=hMM9xVDMUgc&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                allow="autoplay; encrypted-media"
                style={{ border: 'none' }}
                title="Moonlight Background"
            />
        </div>
    )
}
