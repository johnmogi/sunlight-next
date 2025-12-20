import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/comments - Get all comments with optional pagination
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const skip = (page - 1) * limit

        const [comments, total] = await Promise.all([
            prisma.comment.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.comment.count()
        ])

        return NextResponse.json({
            comments,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Error fetching comments:', error)
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
    }
}

// DELETE /api/admin/comments?id=xxx - Delete a comment by ID
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Comment ID required' }, { status: 400 })
        }

        await prisma.comment.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting comment:', error)
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
    }
}

// PUT /api/admin/comments - Update a comment
export async function PUT(request: NextRequest) {
    try {
        const { id, text, name } = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'Comment ID required' }, { status: 400 })
        }

        const updateData: any = {}
        if (text !== undefined) updateData.text = text
        if (name !== undefined) updateData.name = name

        const comment = await prisma.comment.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json({ success: true, comment })
    } catch (error) {
        console.error('Error updating comment:', error)
        return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 })
    }
}
