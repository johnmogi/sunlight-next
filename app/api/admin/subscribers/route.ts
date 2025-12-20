import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/subscribers - Get all subscribers with optional pagination
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const skip = (page - 1) * limit

        const [subscribers, total] = await Promise.all([
            prisma.subscriber.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.subscriber.count()
        ])

        return NextResponse.json({
            subscribers,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Error fetching subscribers:', error)
        return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
    }
}

// DELETE /api/admin/subscribers?id=xxx - Delete a subscriber by ID
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Subscriber ID required' }, { status: 400 })
        }

        await prisma.subscriber.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting subscriber:', error)
        return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 })
    }
}
