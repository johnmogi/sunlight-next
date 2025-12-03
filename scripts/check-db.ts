import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...')

    // Test connection
    await prisma.$connect()
    console.log('✅ Connected to database')

    // Check if tables exist by trying to count
    const subscribersCount = await prisma.subscriber.count()
    console.log(`📊 Subscribers table: ${subscribersCount} rows`)

    const commentsCount = await prisma.comment.count()
    console.log(`📊 Comments table: ${commentsCount} rows`)

    const votesCount = await prisma.vote.count()
    console.log(`📊 Votes table: ${votesCount} rows`)

    // Try to create a test vote
    console.log('\n🧪 Testing vote creation...')
    const testVote = await prisma.vote.create({
      data: {
        cardId: 'test-card-1',
        userId: 'test-user-1',
        voteType: 'like'
      }
    })
    console.log('✅ Test vote created:', testVote)

    // Clean up test vote
    await prisma.vote.delete({
      where: { id: testVote.id }
    })
    console.log('🧹 Test vote deleted')

    // Try to create a test comment
    console.log('\n🧪 Testing comment creation...')
    const testComment = await prisma.comment.create({
      data: {
        cardId: 'test-card-1',
        name: 'Test User',
        text: 'Test comment'
      }
    })
    console.log('✅ Test comment created:', testComment)

    // Clean up test comment
    await prisma.comment.delete({
      where: { id: testComment.id }
    })
    console.log('🧹 Test comment deleted')

    console.log('\n✨ All database operations working correctly!')

  } catch (error) {
    console.error('❌ Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()
