"use client"

import * as React from "react"
import Image from "next/image"
import { X, Send, ThumbsUp, ThumbsDown, Heart } from "lucide-react"
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
}

export function CardDetailModal({ card, isOpen, onClose, messages }: CardDetailModalProps) {
  const [comments, setComments] = React.useState<any[]>([])
  const [name, setName] = React.useState("")
  const [comment, setComment] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Load comments for this card
  React.useEffect(() => {
    if (card) {
      const allComments = JSON.parse(localStorage.getItem('card-comments') || '{}')
      setComments(allComments[card.id] || [])
    }
  }, [card])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim() || !card) return

    setIsSubmitting(true)

    const newComment = {
      id: Date.now().toString(),
      name: name.trim(),
      text: comment.trim(),
      date: new Date().toISOString(),
    }

    // Save to localStorage
    const allComments = JSON.parse(localStorage.getItem('card-comments') || '{}')
    if (!allComments[card.id]) allComments[card.id] = []
    allComments[card.id].unshift(newComment)
    localStorage.setItem('card-comments', JSON.stringify(allComments))

    setComments([newComment, ...comments])
    setComment("")
    setIsSubmitting(false)
  }

  if (!card) return null

  const cardType = card.type === 'major'
    ? (messages.completeDeck?.majorArcana || 'Major Arcana')
    : `${card.suit?.charAt(0).toUpperCase()}${card.suit?.slice(1)} Suit`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[98vh] overflow-y-auto p-0">
        <div className="p-4 md:p-8">
          <DialogHeader className="mb-4 md:mb-6">
            <DialogTitle className="text-2xl md:text-3xl font-bold">{card.name}</DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">{cardType}</p>
          </DialogHeader>

          <div className="grid md:grid-cols-12 gap-4 md:gap-8">
            {/* Card Image - Takes up 8 columns on desktop, full width on mobile */}
            <div className="md:col-span-8">
              <div className="relative w-full bg-gradient-to-br from-muted/50 to-muted rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: '80vh', height: '80vh' }}>
                <Image
                  src={`/images/cards/${card.image}`}
                  alt={card.name}
                  fill
                  className="object-contain p-2 md:p-6"
                  sizes="(max-width: 768px) 100vw, 70vw"
                  priority
                />
              </div>
            </div>

            {/* Card Info - Takes up 4 columns on desktop */}
            <div className="md:col-span-4 space-y-4 md:space-y-6">
              <div className="bg-muted/30 rounded-lg p-4 md:p-6">
                <h3 className="font-semibold text-lg md:text-xl mb-3">Meaning</h3>
                <p className="text-sm md:text-base leading-relaxed">{card.meaning}</p>
              </div>

              {card.visualDesc && (
                <div className="bg-muted/30 rounded-lg p-4 md:p-6">
                  <h3 className="font-semibold text-lg md:text-xl mb-3">Imagery</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{card.visualDesc}</p>
                </div>
              )}
            </div>
          </div>

        {/* Comments Section */}
        <div className="mt-8 pt-8 border-t">
          <h3 className="font-semibold text-2xl mb-6">
            Comments ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-muted/20 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="comment-name">Your Name</Label>
                <Input
                  id="comment-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !comment.trim()}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="comment-text">Your Comment</Label>
              <Textarea
                id="comment-text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this card..."
                rows={3}
                required
              />
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {comments.length === 0 ? (
              <p className="text-base text-muted-foreground text-center py-12 bg-muted/10 rounded-lg">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="bg-muted/30 rounded-lg p-5 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-base">{c.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(c.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed">{c.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
