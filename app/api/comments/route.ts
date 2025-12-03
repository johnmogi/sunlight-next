import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/comments?cardId=xxx - Get comments for a specific card or all comments
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const cardId = searchParams.get('cardId')

    if (cardId) {
      // Get comments for a specific card
      const comments = await prisma.comment.findMany({
        where: { cardId },
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json({ comments })
    } else {
      // Get all comments grouped by cardId
      const allComments = await prisma.comment.findMany({
        orderBy: { createdAt: 'desc' },
      })

      // Group by cardId
      const commentsByCard: Record<string, any[]> = {}
      allComments.forEach((comment: any) => {
        if (!commentsByCard[comment.cardId]) {
          commentsByCard[comment.cardId] = []
        }
        commentsByCard[comment.cardId].push(comment)
      })

      return NextResponse.json({ commentsByCard })
    }
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

// POST /api/comments - Add a new comment
export async function POST(request: NextRequest) {
  try {
    const { cardId, name, text } = await request.json()

    if (!cardId || !name || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const comment = await prisma.comment.create({
      data: {
        cardId,
        name,
        text,
      },
    })

    return NextResponse.json({ success: true, comment })
  } catch (error) {
    console.error('Error saving comment:', error)
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 })
  }
}
