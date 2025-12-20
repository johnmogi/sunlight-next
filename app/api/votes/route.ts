import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/votes - Get all vote counts
export async function GET(request: NextRequest) {
  try {
    const votes = await prisma.vote.findMany()

    // Aggregate votes by card
    const voteCounts: Record<string, { love: number; like: number; wow: number; sad: number; fire: number }> = {}

    votes.forEach((vote: any) => {
      if (!voteCounts[vote.cardId]) {
        voteCounts[vote.cardId] = { love: 0, like: 0, wow: 0, sad: 0, fire: 0 }
      }

      // Safe check for voteType
      const type = vote.voteType as keyof typeof voteCounts[string]
      if (['love', 'like', 'wow', 'sad', 'fire'].includes(type)) {
        voteCounts[vote.cardId][type]++
      }
    })

    return NextResponse.json({ voteCounts })
  } catch (error) {
    console.error('Error fetching votes:', error)
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 })
  }
}

// POST /api/votes - Add or update a vote
export async function POST(request: NextRequest) {
  try {
    const { cardId, userId, voteType } = await request.json()

    if (!cardId || !userId) {
      return NextResponse.json({ error: 'Missing cardId or userId' }, { status: 400 })
    }

    // If voteType is null, delete the vote
    if (!voteType) {
      await prisma.vote.deleteMany({
        where: {
          cardId,
          userId,
        },
      })

      return NextResponse.json({ success: true, action: 'deleted' })
    }

    // Upsert the vote (update if exists, create if not)
    const vote = await prisma.vote.upsert({
      where: {
        cardId_userId: {
          cardId,
          userId,
        },
      },
      update: {
        voteType,
      },
      create: {
        cardId,
        userId,
        voteType,
      },
    })

    return NextResponse.json({ success: true, vote })
  } catch (error) {
    console.error('Error saving vote:', error)
    return NextResponse.json({ error: 'Failed to save vote' }, { status: 500 })
  }
}
