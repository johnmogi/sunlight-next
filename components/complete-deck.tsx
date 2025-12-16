"use client"

import * as React from "react"
import Image from "next/image"
import { ThumbsUp, ThumbsDown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CardDetailModal } from "@/components/card-detail-modal"
import { CardCommentSection } from "@/components/card-comment-section"

interface CompleteDeckProps {
  messages: any
  locale: string
}

type VoteType = 'like' | 'dislike' | 'love' | null

// Helper to get or create anonymous user ID
function getUserId(): string {
  if (typeof window === 'undefined') return ''

  let userId = localStorage.getItem('sunlight-user-id')
  if (!userId) {
    userId = `anon-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`
    localStorage.setItem('sunlight-user-id', userId)
  }
  return userId
}

export function CompleteDeck({ messages }: CompleteDeckProps) {
  const [selectedCard, setSelectedCard] = React.useState<any | null>(null)
  const [activeFilter, setActiveFilter] = React.useState('major') // Default to Aether (Major Arcana)
  const [votes, setVotes] = React.useState<Record<string, VoteType>>({})
  const [voteCounts, setVoteCounts] = React.useState<Record<string, { like: number; dislike: number; love: number }>>({})
  const [visibleCount, setVisibleCount] = React.useState(10) // 2 rows at XL breakpoint (5 cols x 2 rows)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [selectedSet, setSelectedSet] = React.useState('tarot-cards-update129') // Changed to set-update129 as default
  const [cards, setCards] = React.useState<any[]>([])
  const [userId, setUserId] = React.useState('')
  const [expandedComments, setExpandedComments] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    async function loadCards() {
      let cardSetModule;
      switch (selectedSet) {
        case 'tarot-cards':
          cardSetModule = await import('@/lib/card-sets/set-default');
          break;
        case 'tarot-cards-new':
          cardSetModule = await import('@/lib/card-sets/set-update112');
          break;
        case 'tarot-cards-old':
          cardSetModule = await import('@/lib/card-sets/set-old');
          break;
        case 'tarot-cards-update129':
          cardSetModule = await import('@/lib/card-sets/set-update129');
          break;
        default:
          cardSetModule = await import('@/lib/card-sets/set-default');
      }
      setCards(cardSetModule.TAROT_CARDS);
    }
    loadCards();
  }, [selectedSet]);

  // Localize cards
  const localizedCards = React.useMemo(() => {
    return cards.map(card => {
      let localizedTitle = card.name
      let localizedDesc = ""
      let localizedVisual = ""

      // Try to find localization
      if (card.type === 'major') {
        const majorKey = card.number.toString()
        if (messages.cards?.major?.[majorKey]) {
          localizedTitle = messages.cards.major[majorKey].title
          localizedDesc = messages.cards.major[majorKey].desc
        }
      } else if (card.suit) {
        const suitKey = card.suit
        const numKey = card.number.toString()
        if (messages.cards?.minor?.[suitKey]?.[numKey]) {
          localizedTitle = messages.cards.minor[suitKey][numKey].title
          localizedDesc = messages.cards.minor[suitKey][numKey].desc
        }
      }

      return {
        ...card,
        name: localizedTitle,
        meaning: localizedDesc || card.meaning,
        visualDesc: localizedVisual || card.visualDesc // Keep original or update if JSON has it
      }
    })
  }, [cards, messages])

  // Calculate filtered cards from localizedCards
  const filteredCards = activeFilter === 'all'
    ? localizedCards
    : localizedCards.filter(card =>
      activeFilter === 'major'
        ? card.type === 'major'
        : card.suit === activeFilter
    )

  const visibleCards = filteredCards.slice(0, visibleCount)

  // Initialize user ID on mount
  React.useEffect(() => {
    setUserId(getUserId())
  }, [])

  // Load votes from API
  React.useEffect(() => {
    if (!userId) return

    async function loadVotes() {
      try {
        // Load vote counts from API
        const response = await fetch('/api/votes')
        const data = await response.json()
        setVoteCounts(data.voteCounts || {})

        // Load user's votes from localStorage (for UI state only)
        const savedVotes = localStorage.getItem('card-votes')
        if (savedVotes) {
          setVotes(JSON.parse(savedVotes))
        }
      } catch (error) {
        console.error('Error loading votes:', error)
      }
    }

    loadVotes()
  }, [userId])

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

  const handleVote = async (cardId: string, voteType: VoteType) => {
    if (!userId) return

    const currentVote = votes[cardId]
    const newVotes = { ...votes }
    const newCounts = { ...voteCounts }

    if (!newCounts[cardId]) {
      newCounts[cardId] = { like: 0, dislike: 0, love: 0 }
    }

    // Determine the new vote type
    let finalVoteType: VoteType = voteType

    // If clicking same vote, remove it
    if (currentVote === voteType) {
      newVotes[cardId] = null
      finalVoteType = null
      if (voteType) newCounts[cardId][voteType]--
    } else {
      // Remove previous vote count
      if (currentVote) {
        newCounts[cardId][currentVote]--
      }
      // Add new vote
      newVotes[cardId] = voteType
      if (voteType) newCounts[cardId][voteType]++
    }

    // Optimistic UI update
    setVotes(newVotes)
    setVoteCounts(newCounts)
    localStorage.setItem('card-votes', JSON.stringify(newVotes))

    // Trigger Lily Celebration if it's a positive vote
    if (voteType === 'like' || voteType === 'love') {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('sunlight-card-liked'))
      }
    }

    // Send to API
    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId,
          userId,
          voteType: finalVoteType,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save vote')
      }

      // Refresh vote counts from server
      const votesResponse = await fetch('/api/votes')
      const votesData = await votesResponse.json()
      setVoteCounts(votesData.voteCounts || {})
    } catch (error) {
      console.error('Error saving vote:', error)
      // Revert optimistic update on error
      setVotes(prev => ({ ...prev, [cardId]: currentVote }))
    }
  }

  const filters = [
    { id: 'all', label: messages.completeDeck?.all || 'All' },
    { id: 'major', label: messages.completeDeck?.aether || 'Aether (Major)' },
    { id: 'roses', label: messages.completeDeck?.roses || 'Roses (Air)' },
    { id: 'leaves', label: messages.completeDeck?.leaves || 'Leaves (Fire)' },
    { id: 'vessels', label: messages.completeDeck?.vessels || 'Vessels (Water)' },
    { id: 'crystals', label: messages.completeDeck?.crystals || 'Crystals (Earth)' },
  ]

  const cardSets = [
    { id: 'tarot-cards', label: 'Default Set' },
    { id: 'tarot-cards-new', label: 'Update 112 Set' },
    { id: 'tarot-cards-update129', label: 'Update 129 Set (WIP)' },
    { id: 'tarot-cards-old', label: 'Old Set' },
  ]

  return (
    <section id="complete-deck" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {messages.completeDeck?.title || "Sunlight Tarot Deck 0.2.0"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {messages.completeDeck?.description || "The entire deck rebuilt around 5 elements with a new inward journey for the Major Arcana."}
          </p>
        </div>

        {/* Set Selector */}
        <div className="flex justify-center mb-8">
          <Select onValueChange={setSelectedSet} defaultValue={selectedSet}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a card set" />
            </SelectTrigger>
            <SelectContent>
              {cardSets.map((set) => (
                <SelectItem key={set.id} value={set.id}>
                  {set.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                    src={card.image.startsWith('/') ? card.image : `/images/cards/${card.image}`}
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

                  {/* Comment Section - NEW */}
                  <CardCommentSection
                    cardId={card.id}
                    cardName={card.name}
                    isExpanded={expandedComments[card.id] || false}
                    onToggle={() => {
                      setExpandedComments(prev => ({
                        ...prev,
                        [card.id]: !prev[card.id]
                      }))
                    }}
                    messages={messages}
                  />
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
