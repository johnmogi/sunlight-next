"use client"

import * as React from "react"
import { MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CardCommentSectionProps {
    cardId: string
    cardName: string
    isExpanded: boolean
    onToggle: () => void
    messages: any
}

export function CardCommentSection({
    cardId,
    cardName,
    isExpanded,
    onToggle,
    messages
}: CardCommentSectionProps) {
    const [comments, setComments] = React.useState<any[]>([])
    const [name, setName] = React.useState("")
    const [comment, setComment] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Load comments when expanded
    React.useEffect(() => {
        if (!isExpanded) return

        async function loadComments() {
            setIsLoading(true)
            try {
                const response = await fetch(`/api/comments?cardId=${cardId}`)
                const data = await response.json()
                setComments(data.comments || [])
            } catch (error) {
                console.error('Error loading comments:', error)
                setComments([])
            } finally {
                setIsLoading(false)
            }
        }

        loadComments()
    }, [isExpanded, cardId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !comment.trim()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardId,
                    name: name.trim(),
                    text: comment.trim(),
                }),
            })

            if (!response.ok) throw new Error('Failed to save comment')

            const data = await response.json()

            // Add new comment to top of list
            setComments([data.comment, ...comments])
            setComment("")

            // Trigger Lily celebration
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('sunlight-comment-added'))
            }
        } catch (error) {
            console.error('Error saving comment:', error)
            alert('Failed to save comment. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const commentCount = comments.length

    return (
        <div className="border-t pt-2">
            {/* Comment Count Button */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <MessageCircle className="h-4 w-4" />
                <span>
                    {commentCount === 0
                        ? messages.cardDetail?.noComments || "No comments yet"
                        : `${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}`}
                </span>
            </button>

            {/* Expanded Comment Section */}
            {isExpanded && (
                <div className="mt-3 space-y-3 border-2 border-purple-300 dark:border-purple-700 pt-3 bg-purple-50/80 dark:bg-purple-900/30 p-4 rounded-xl shadow-md backdrop-blur-sm">
                    {/* Comment Form */}
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={messages.cardDetail?.yourName || "Your name"}
                            required
                            className="text-sm"
                        />
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={messages.cardDetail?.yourComment || "Add a comment..."}
                            rows={2}
                            required
                            className="text-sm"
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting || !name.trim() || !comment.trim()}
                            size="sm"
                            className="w-full"
                        >
                            <Send className="h-3 w-3 mr-2" />
                            {messages.cardDetail?.postComment || "Post Comment"}
                        </Button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-2">
                        {isLoading ? (
                            <p className="text-xs text-center text-muted-foreground py-4">
                                Loading comments...
                            </p>
                        ) : comments.length === 0 ? (
                            <p className="text-xs text-center text-muted-foreground py-4">
                                {messages.cardDetail?.noComments || "No comments yet. Be the first!"}
                            </p>
                        ) : (
                            // Show latest 3 comments
                            comments.slice(0, 3).map((c) => (
                                <div key={c.id} className="bg-muted/50 rounded p-2 text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-xs">{c.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(c.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs">{c.text}</p>
                                </div>
                            ))
                        )}

                        {/* View All Button if more than 3 comments */}
                        {comments.length > 3 && (
                            <button
                                className="w-full text-xs text-muted-foreground hover:text-foreground py-2"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // TODO: Open modal with all comments or navigate to card detail
                                    alert(`View all ${commentCount} comments - TODO: implement`)
                                }}
                            >
                                View all {commentCount} comments
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
