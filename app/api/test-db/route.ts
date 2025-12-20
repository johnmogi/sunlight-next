import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/test-db - Test database connection
export async function GET(request: NextRequest) {
    try {
        // Simple query to check connection
        const voteCount = await prisma.vote.count()
        const commentCount = await prisma.comment.count()
        const subscriberCount = await prisma.subscriber.count()

        return NextResponse.json({
            success: true,
            connection: 'OK',
            counts: {
                votes: voteCount,
                comments: commentCount,
                subscribers: subscriberCount
            }
        })
    } catch (error: any) {
        console.error('Database connection test failed:', error)
        return NextResponse.json({
            error: 'Database connection failed',
            message: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
