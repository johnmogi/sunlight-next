"use client"

import React from "react"

export function SunlightBackground() {
    return (
        <div className="fixed inset-0 -z-50 flex items-center justify-center overflow-hidden pointer-events-none">
            <div
                className="w-[80%] h-[400px] rounded-2xl"
                style={{
                    background: "radial-gradient(circle, rgba(230, 200, 100, 0.4), rgba(255, 159, 69, 0.3), transparent)",
                    boxShadow: "0 0 20px 5px rgba(255, 255, 200, 0.5)",
                    border: "1px solid rgba(255, 255, 200, 0.3)",
                }}
            />
        </div>
    )
}
