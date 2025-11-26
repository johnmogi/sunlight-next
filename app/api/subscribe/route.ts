import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create subscriber (will fail if email already exists due to unique constraint)
    const subscriber = await prisma.subscriber.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
      },
    })

    // Get total count
    const count = await prisma.subscriber.count()

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      subscriberCount: count,
    })
  } catch (error: any) {
    // Handle duplicate email
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      )
    }

    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const count = await prisma.subscriber.count()
    return NextResponse.json({ success: true, count })
  } catch (error) {
    console.error('Get subscriber count error:', error)
    return NextResponse.json(
      { error: 'Failed to get subscriber count' },
      { status: 500 }
    )
  }
}
