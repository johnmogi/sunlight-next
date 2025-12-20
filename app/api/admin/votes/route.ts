import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/votes - Get all votes with optional pagination
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const skip = (page - 1) * limit

        const [votes, total] = await Promise.all([
            prisma.vote.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.vote.count()
        ])

        return NextResponse.json({
            votes,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Error fetching votes:', error)
        return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 })
    }
}

// DELETE /api/admin/votes?id=xxx - Delete a vote by ID
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Vote ID required' }, { status: 400 })
        }

        await prisma.vote.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting vote:', error)
        return NextResponse.json({ error: 'Failed to delete vote' }, { status: 500 })
    }
}

// PUT /api/admin/votes - Update a vote
export async function PUT(request: NextRequest) {
    try {
        const { id, voteType } = await request.json()

        if (!id || !voteType) {
            return NextResponse.json({ error: 'Vote ID and type required' }, { status: 400 })
        }

        const vote = await prisma.vote.update({
            where: { id },
            data: { voteType }
        })

        return NextResponse.json({ success: true, vote })
    } catch (error) {
        console.error('Error updating vote:', error)
        return NextResponse.json({ error: 'Failed to update vote' }, { status: 500 })
    }
}
