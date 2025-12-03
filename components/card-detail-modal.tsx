"use client"

import * as React from "react"
import Image from "next/image"
import { X, Send, ThumbsUp, ThumbsDown, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CardDetailModalProps {
  card: any | null
  isOpen: boolean
  onClose: () => void
  messages: any
  cards?: any[]
  onNavigate?: (card: any) => void
}

export function CardDetailModal({ card, isOpen, onClose, messages, cards = [], onNavigate }: CardDetailModalProps) {
  const [comments, setComments] = React.useState<any[]>([])
  const [name, setName] = React.useState("")
  const [comment, setComment] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Load comments for this card from API
  React.useEffect(() => {
    if (!card) return

    async function loadComments() {
      try {
        const response = await fetch(`/api/comments?cardId=${card.id}`)
        const data = await response.json()
        setComments(data.comments || [])
      } catch (error) {
        console.error('Error loading comments:', error)
        setComments([])
      }
    }

    loadComments()
  }, [card])

  // Navigation helpers
  const currentIndex = card ? cards.findIndex(c => c.id === card.id) : -1
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < cards.length - 1

  const handlePrevious = React.useCallback(() => {
    if (hasPrevious && onNavigate) {
      onNavigate(cards[currentIndex - 1])
    }
  }, [hasPrevious, onNavigate, cards, currentIndex])

  const handleNext = React.useCallback(() => {
    if (hasNext && onNavigate) {
      onNavigate(cards[currentIndex + 1])
    }
  }, [hasNext, onNavigate, cards, currentIndex])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handlePrevious, handleNext])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim() || !card) return

    setIsSubmitting(true)

    try {
      // Save to API
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: card.id,
          name: name.trim(),
          text: comment.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save comment')
      }

      const data = await response.json()

      // Add to local state
      setComments([data.comment, ...comments])
      setComment("")
    } catch (error) {
      console.error('Error saving comment:', error)
      alert('Failed to save comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!card) return null

  const cardType = card.type === 'major'
    ? (messages.completeDeck?.majorArcana || 'Major Arcana')
    : `${card.suit?.charAt(0).toUpperCase()}${card.suit?.slice(1)} Suit`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] max-h-[98vh] overflow-y-auto p-0">
        <div className="p-4 md:p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl md:text-3xl font-bold">{card.name}</DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">{cardType}</p>
          </DialogHeader>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Card Image - Larger display taking 60% width on desktop */}
            <div className="flex-shrink-0 flex items-start justify-center lg:w-[60%] relative">
              <div className="relative w-full bg-gradient-to-br from-muted/50 to-muted rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '2/3', maxHeight: '85vh' }}>
                <Image
                  src={`/images/cards/${card.image}`}
                  alt={card.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>

              {/* Navigation Buttons */}
              {cards.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/95 shadow-lg"
                    onClick={handlePrevious}
                    disabled={!hasPrevious}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/95 shadow-lg"
                    onClick={handleNext}
                    disabled={!hasNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Card Info & Comments - Takes up 40% on desktop */}
            <div className="flex-1 space-y-4 lg:overflow-y-auto" style={{ maxHeight: '85vh' }}>
              <div className="bg-muted/30 rounded-lg p-4 md:p-6">
                <h3 className="font-semibold text-lg md:text-xl mb-3">
                  {messages.cardDetail?.meaning || 'Meaning'}
                </h3>
                <p className="text-sm md:text-base leading-relaxed">{card.meaning}</p>
              </div>

              {card.visualDesc && (
                <div className="bg-muted/30 rounded-lg p-4 md:p-6">
                  <h3 className="font-semibold text-lg md:text-xl mb-3">
                    {messages.cardDetail?.imagery || 'Imagery'}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{card.visualDesc}</p>
                </div>
              )}

              {/* Comments Section - Now in sidebar */}
              <div className="bg-muted/30 rounded-lg p-4 md:p-6">
                <h3 className="font-semibold text-lg md:text-xl mb-4">
                  {messages.cardDetail?.comments || 'Comments'} ({comments.length})
                </h3>

                {/* Comment Form */}
                <form onSubmit={handleSubmit} className="mb-4 space-y-3">
                  <div>
                    <Label htmlFor="comment-name" className="text-xs">
                      {messages.cardDetail?.yourName || 'Your Name'}
                    </Label>
                    <Input
                      id="comment-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={messages.cardDetail?.yourName || 'Enter your name'}
                      className="text-sm"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="comment-text" className="text-xs">
                      {messages.cardDetail?.yourComment || 'Your Comment'}
                    </Label>
                    <Textarea
                      id="comment-text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={messages.cardDetail?.yourComment || 'Share your thoughts about this card...'}
                      rows={2}
                      className="text-sm"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !comment.trim()}
                    size="sm"
                    className="w-full"
                  >
                    <Send className="h-3 w-3 mr-2" />
                    {messages.cardDetail?.postComment || 'Post Comment'}
                  </Button>
                </form>

                {/* Comments List */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {comments.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-6 bg-muted/10 rounded-lg">
                      {messages.cardDetail?.noComments || 'No comments yet. Be the first!'}
                    </p>
                  ) : (
                    comments.map((c) => (
                      <div key={c.id} className="bg-muted/50 rounded-lg p-3 hover:bg-muted/60 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm">{c.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(c.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{c.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
