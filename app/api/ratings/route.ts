/**
 * Card Ratings API
 * Handles saving and retrieving card reaction counts
 * Uses localStorage for persistence (can be upgraded to database later)
 */

import { NextRequest, NextResponse } from 'next/server'

// In-memory storage (will reset on server restart)
let ratingsStore: Record<string, Record<string, number>> = {}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const cardId = searchParams.get('cardId')

    if (!cardId) {
        return NextResponse.json({ error: 'Card ID required' }, { status: 400 })
    }

    try {
        // Get ratings from in-memory store
        const ratings = ratingsStore[cardId] || {
            love: 0,
            like: 0,
            wow: 0,
            sad: 0,
            fire: 0
        }

        return NextResponse.json({ cardId, ratings })
    } catch (error) {
        console.error('Error fetching ratings:', error)

        return NextResponse.json({
            cardId,
            ratings: { love: 0, like: 0, wow: 0, sad: 0, fire: 0 }
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { cardId, reaction } = body

        if (!cardId || !reaction) {
            return NextResponse.json(
                { error: 'Card ID and reaction required' },
                { status: 400 }
            )
        }

        // Validate reaction type
        const validReactions = ['love', 'like', 'wow', 'sad', 'fire']
        if (!validReactions.includes(reaction)) {
            return NextResponse.json(
                { error: 'Invalid reaction type' },
                { status: 400 }
            )
        }

        // Initialize card ratings if not exists
        if (!ratingsStore[cardId]) {
            ratingsStore[cardId] = {
                love: 0,
                like: 0,
                wow: 0,
                sad: 0,
                fire: 0
            }
        }

        // Increment the reaction count
        ratingsStore[cardId][reaction] = (ratingsStore[cardId][reaction] || 0) + 1

        return NextResponse.json({
            success: true,
            cardId,
            reaction,
            ratings: ratingsStore[cardId]
        })
    } catch (error) {
        console.error('Error saving rating:', error)
        return NextResponse.json(
            { error: 'Failed to save rating' },
            { status: 500 }
        )
    }
}
