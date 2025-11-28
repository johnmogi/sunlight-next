"use client"

import * as React from "react"
import Image from "next/image"
import { ThumbsUp, ThumbsDown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CardDetailModal } from "@/components/card-detail-modal"

interface CompleteDeckProps {
  messages: any
  cards: any[]
}

type VoteType = 'like' | 'dislike' | 'love' | null

export function CompleteDeck({ messages, cards }: CompleteDeckProps) {
  const [selectedCard, setSelectedCard] = React.useState<any | null>(null)
  const [activeFilter, setActiveFilter] = React.useState('major') // Default to Aether (Major Arcana)
  const [votes, setVotes] = React.useState<Record<string, VoteType>>({})
  const [voteCounts, setVoteCounts] = React.useState<Record<string, { like: number; dislike: number; love: number }>>({})
  const [visibleCount, setVisibleCount] = React.useState(10) // 2 rows at XL breakpoint (5 cols x 2 rows)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)

  // Calculate filtered cards
  const filteredCards = activeFilter === 'all'
    ? cards
    : cards.filter(card =>
        activeFilter === 'major'
          ? card.type === 'major'
          : card.suit === activeFilter
      )

  const visibleCards = filteredCards.slice(0, visibleCount)

  React.useEffect(() => {
    // Load votes from localStorage
    const savedVotes = localStorage.getItem('card-votes')
    const savedCounts = localStorage.getItem('card-vote-counts')
    if (savedVotes) setVotes(JSON.parse(savedVotes))
    if (savedCounts) setVoteCounts(JSON.parse(savedCounts))
  }, [])

  // IntersectionObserver for infinite scroll
  React.useEffect(() => {
    if (!loadMoreRef.current) return
    const el = loadMoreRef.current
    const maxCards = filteredCards.length
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleCount((v) => Math.min(maxCards, v + 10))
        }
      })
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [filteredCards.length])

  // Reset visible count when filter changes
  React.useEffect(() => {
    setVisibleCount(10)
  }, [activeFilter])

  const handleVote = (cardId: string, voteType: VoteType) => {
    const currentVote = votes[cardId]
    const newVotes = { ...votes }
    const newCounts = { ...voteCounts }

    if (!newCounts[cardId]) {
      newCounts[cardId] = { like: 0, dislike: 0, love: 0 }
    }

    // If clicking same vote, remove it
    if (currentVote === voteType) {
      newVotes[cardId] = null
      if (voteType) newCounts[cardId][voteType]--
    } else {
      // Remove previous vote
      if (currentVote) {
        newCounts[cardId][currentVote]--
      }
      // Add new vote
      newVotes[cardId] = voteType
      if (voteType) newCounts[cardId][voteType]++
    }

    setVotes(newVotes)
    setVoteCounts(newCounts)
    localStorage.setItem('card-votes', JSON.stringify(newVotes))
    localStorage.setItem('card-vote-counts', JSON.stringify(newCounts))
  }

  const filters = [
    { id: 'all', label: messages.completeDeck?.all || 'All' },
    { id: 'major', label: messages.completeDeck?.aether || 'Aether (Major)' },
    { id: 'roses', label: messages.completeDeck?.roses || 'Roses (Air)' },
    { id: 'cards', label: messages.completeDeck?.cards || 'Cards (Fire)' },
    { id: 'hearts', label: messages.completeDeck?.hearts || 'Hearts (Water)' },
    { id: 'coins', label: messages.completeDeck?.coins || 'Coins (Earth)' },
  ]

  return (
    <section id="complete-deck" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {messages.completeDeck?.title || "Sunlight Tarot Deck 0.0.1"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {messages.completeDeck?.description || "The entire deck rebuilt around 5 elements with a new inward journey for the Major Arcana."}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "transition-all",
                activeFilter === filter.id && "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {visibleCards.map((card) => {
            const cardVote = votes[card.id]
            const counts = voteCounts[card.id] || { like: 0, dislike: 0, love: 0 }
            const totalVotes = counts.like + counts.dislike + counts.love

            return (
              <div
                key={card.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Image */}
                <div
                  className="relative aspect-[2/3] bg-muted cursor-pointer"
                  onClick={() => setSelectedCard(card)}
                >
                  <Image
                    src={`/images/cards/${card.image}`}
                    alt={card.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-sm line-clamp-2" title={card.name}>
                    {card.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {card.type === 'major' ? messages.completeDeck?.majorArcana || 'Major Arcana' :
                     card.suit ? `${card.suit.charAt(0).toUpperCase()}${card.suit.slice(1)}` : ''}
                  </p>

                  {/* Vote Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={cn(
                          "h-8 px-2",
                          cardVote === 'love' && "text-red-500 bg-red-50 dark:bg-red-950/20"
                        )}
                        onClick={() => handleVote(card.id, 'love')}
                      >
                        <Heart className={cn("h-4 w-4", cardVote === 'love' && "fill-current")} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={cn(
                          "h-8 px-2",
                          cardVote === 'like' && "text-green-500 bg-green-50 dark:bg-green-950/20"
                        )}
                        onClick={() => handleVote(card.id, 'like')}
                      >
                        <ThumbsUp className={cn("h-4 w-4", cardVote === 'like' && "fill-current")} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={cn(
                          "h-8 px-2",
                          cardVote === 'dislike' && "text-red-500 bg-red-50 dark:bg-red-950/20"
                        )}
                        onClick={() => handleVote(card.id, 'dislike')}
                      >
                        <ThumbsDown className={cn("h-4 w-4", cardVote === 'dislike' && "fill-current")} />
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {totalVotes > 0 && `${totalVotes}`}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Load More Sentinel */}
        {visibleCount < filteredCards.length && (
          <div ref={loadMoreRef} className="h-1 w-full" />
        )}

        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No cards found for this filter.
            </p>
          </div>
        )}
      </div>

      {/* Card Detail Modal */}
      <CardDetailModal
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        messages={messages}
        cards={filteredCards}
        onNavigate={setSelectedCard}
      />
    </section>
  )
}
