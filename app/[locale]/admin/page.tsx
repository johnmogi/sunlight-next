"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Trash2, Edit, RefreshCw, Database, Trophy, Heart, ThumbsUp, Star, Frown, Flame, AlertTriangle, Eye, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TAROT_CARDS } from "@/lib/card-sets/set-default"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type Vote = {
    id: string
    cardId: string
    userId: string
    voteType: string
    createdAt: string
    updatedAt: string
}

type Comment = {
    id: string
    cardId: string
    userId: string
    content: string
    createdAt: string
    updatedAt: string
}

type Subscriber = {
    id: string
    email: string
    createdAt: string
}

type LeaderboardEntry = {
    cardId: string
    total: number
    love: number
    like: number
    wow: number
    sad: number
    fire: number
}

export default function AdminPage() {
    const [votes, setVotes] = useState<Vote[]>([])
    const [comments, setComments] = useState<Comment[]>([])
    const [subscribers, setSubscribers] = useState<Subscriber[]>([])
    const [loading, setLoading] = useState(false)
    const [editingVote, setEditingVote] = useState<Vote | null>(null)
    const [editingComment, setEditingComment] = useState<Comment | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'vote' | 'comment' | 'subscriber', id: string } | null>(null)
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(false)
    const [viewingCardId, setViewingCardId] = useState<string | null>(null)

    const getCardDetails = (cardId: string) => {
        return TAROT_CARDS.find(c => c.id === cardId)
    }

    const loadVotes = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/admin/votes')
            const data = await response.json()
            setVotes(data.votes || [])
        } catch (error) {
            console.error('Error loading votes:', error)
        }
        setLoading(false)
    }

    const loadComments = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/admin/comments')
            const data = await response.json()
            setComments(data.comments || [])
        } catch (error) {
            console.error('Error loading comments:', error)
        }
        setLoading(false)
    }

    const loadSubscribers = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/admin/subscribers')
            const data = await response.json()
            setSubscribers(data.subscribers || [])
        } catch (error) {
            console.error('Error loading subscribers:', error)
        }
        setLoading(false)
    }

    const loadLeaderboard = async () => {
        setLoadingLeaderboard(true)
        try {
            const response = await fetch('/api/admin/leaderboard')
            const data = await response.json()
            if (data.leaderboard) {
                setLeaderboard(data.leaderboard)
            }
        } catch (error) {
            console.error('Error loading leaderboard:', error)
            // toast({
            //    title: "Error",
            //    description: "Failed to load leaderboard",
            //    variant: "destructive",
            // })
        } finally {
            setLoadingLeaderboard(false)
        }
    }

    useEffect(() => {
        loadVotes()
        loadComments()
        loadSubscribers()
        loadLeaderboard()
    }, [])

    const handleDelete = async () => {
        if (!deleteConfirm) return

        try {
            const endpoint = `/api/admin/${deleteConfirm.type}s?id=${deleteConfirm.id}`
            const res = await fetch(endpoint, { method: 'DELETE' })

            if (!res.ok) throw new Error('Delete failed')

            if (deleteConfirm.type === 'vote') loadVotes()
            else if (deleteConfirm.type === 'comment') loadComments()
            else if (deleteConfirm.type === 'subscriber') loadSubscribers()

            setDeleteConfirm(null)
            alert("Item deleted successfully")
        } catch (error) {
            console.error('Error deleting item:', error)
            alert("Failed to delete item")
        }
    }

    const updateVote = async () => {
        if (!editingVote) return
        try {
            await fetch('/api/admin/votes', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingVote)
            })
            setEditingVote(null)
            loadVotes()
            alert("Vote updated successfully")
        } catch (error) {
            console.error('Error updating vote:', error)
            alert("Failed to update vote")
        }
    }

    const updateComment = async () => {
        if (!editingComment) return
        try {
            await fetch('/api/admin/comments', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingComment)
            })
            setEditingComment(null)
            loadComments()
            alert("Comment updated successfully")
        } catch (error) {
            console.error('Error updating comment:', error)
            alert("Failed to update comment")
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Manage votes, comments, and subscribers
                    </p>
                </div>
            </div>

            <Tabs defaultValue="leaderboard" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Leaderboard
                    </TabsTrigger>
                    <TabsTrigger value="votes" className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Votes ({votes.length})
                    </TabsTrigger>
                    <TabsTrigger value="comments" className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Comments ({comments.length})
                    </TabsTrigger>
                    <TabsTrigger value="subscribers" className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Subscribers ({subscribers.length})
                    </TabsTrigger>
                </TabsList>

                {/* Leaderboard Tab */}
                <TabsContent value="leaderboard">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Vote Leaderboard</CardTitle>
                                    <CardDescription>Top voted cards by engagement</CardDescription>
                                </div>
                                <Button variant="outline" size="icon" onClick={loadLeaderboard} disabled={loadingLeaderboard}>
                                    <RefreshCw className={`h-4 w-4 ${loadingLeaderboard ? 'animate-spin' : ''}`} />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Rank</TableHead>
                                        <TableHead>Card</TableHead>
                                        <TableHead className="text-center">Total Votes</TableHead>
                                        <TableHead className="text-center"><Heart className="w-4 h-4 mx-auto text-pink-500" /></TableHead>
                                        <TableHead className="text-center"><ThumbsUp className="w-4 h-4 mx-auto text-blue-500" /></TableHead>
                                        <TableHead className="text-center"><Star className="w-4 h-4 mx-auto text-yellow-500" /></TableHead>
                                        <TableHead className="text-center"><Frown className="w-4 h-4 mx-auto text-gray-500" /></TableHead>
                                        <TableHead className="text-center"><Flame className="w-4 h-4 mx-auto text-orange-500" /></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leaderboard.map((entry, index) => {
                                        const card = getCardDetails(entry.cardId)
                                        return (
                                            <TableRow key={entry.cardId}>
                                                <TableCell className="font-bold text-lg">
                                                    {index + 1 === 1 && <Trophy className="w-5 h-5 text-yellow-500 inline mr-2" />}
                                                    {index + 1 === 2 && <Trophy className="w-5 h-5 text-gray-400 inline mr-2" />}
                                                    {index + 1 === 3 && <Trophy className="w-5 h-5 text-amber-700 inline mr-2" />}
                                                    #{index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        {card?.image && (
                                                            <div className="relative w-10 h-16 rounded overflow-hidden border border-border">
                                                                <Image
                                                                    src={card.image}
                                                                    alt={card?.name || 'Card'}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{card?.name || entry.cardId}</span>
                                                            <span className="text-xs text-muted-foreground">{entry.cardId}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center font-bold text-lg">{entry.total}</TableCell>
                                                <TableCell className="text-center text-muted-foreground">{entry.love}</TableCell>
                                                <TableCell className="text-center text-muted-foreground">{entry.like}</TableCell>
                                                <TableCell className="text-center text-muted-foreground">{entry.wow}</TableCell>
                                                <TableCell className="text-center text-muted-foreground">{entry.sad}</TableCell>
                                                <TableCell className="text-center text-muted-foreground">{entry.fire}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Votes Tab */}
                <TabsContent value="votes">
                    <div className="bg-card rounded-lg border p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Votes Logs</h2>
                            <Button onClick={loadVotes} variant="outline" size="sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Card</TableHead>
                                        <TableHead>User ID</TableHead>
                                        <TableHead>Vote Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : votes.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                No votes found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        votes.map((vote) => {
                                            const card = getCardDetails(vote.cardId)
                                            return (
                                                <TableRow key={vote.id}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                                                                onClick={() => setViewingCardId(vote.cardId)}
                                                            >
                                                                <div className="relative w-10 h-16 bg-muted rounded overflow-hidden">
                                                                    {(() => {
                                                                        const card = getCardDetails(vote.cardId)
                                                                        return card?.image ? (
                                                                            <Image src={card.image} alt={card.name} fill className="object-cover" />
                                                                        ) : null
                                                                    })()}
                                                                </div>
                                                                <span className="font-medium hover:underline">{vote.cardId}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">{vote.userId}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            {vote.voteType === 'high' ? <ThumbsUp className="w-4 h-4 text-green-500" /> :
                                                                vote.voteType === 'low' ? <Frown className="w-4 h-4 text-red-500" /> :
                                                                    vote.voteType === 'super' ? <Heart className="w-4 h-4 text-pink-500" /> :
                                                                        <Star className="w-4 h-4 text-gray-500" />}
                                                            <span className="capitalize">{vote.voteType}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{new Date(vote.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" onClick={() => setEditingVote(vote)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm({ type: 'vote', id: vote.id })}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TabsContent>

                {/* Comments Tab */}
                <TabsContent value="comments">
                    <div className="bg-card rounded-lg border p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Comments Management</h2>
                            <Button onClick={loadComments} variant="outline" size="sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Card</TableHead>
                                        <TableHead>User ID</TableHead>
                                        <TableHead>Comment</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : comments.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                No comments found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        comments.map((comment) => {
                                            const details = getCardDetails(comment.cardId)
                                            return (
                                                <TableRow key={comment.id}>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-sm">{details?.name || 'Unknown Card'}</span>
                                                            <span className="text-xs text-muted-foreground font-mono">{comment.cardId}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">{comment.userId}</TableCell>
                                                    <TableCell className="max-w-md truncate">
                                                        {comment.content}
                                                    </TableCell>
                                                    <TableCell className="text-sm">
                                                        {formatDate(comment.createdAt)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setEditingComment(comment)}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setDeleteConfirm({ type: 'comment', id: comment.id })}
                                                            >
                                                                <Trash2 className="w-4 h-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TabsContent>

                {/* Subscribers Tab */}
                <TabsContent value="subscribers">
                    <div className="bg-card rounded-lg border p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Subscribers Management</h2>
                            <Button onClick={loadSubscribers} variant="outline" size="sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Subscribed</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-8">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : subscribers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                                No subscribers found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        subscribers.map((subscriber) => (
                                            <TableRow key={subscriber.id}>
                                                <TableCell>{subscriber.email}</TableCell>
                                                <TableCell className="text-sm">
                                                    {formatDate(subscriber.createdAt)}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setDeleteConfirm({ type: 'subscriber', id: subscriber.id })}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Edit Vote Dialog */}
            <Dialog open={!!editingVote} onOpenChange={() => setEditingVote(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Vote</DialogTitle>
                        <DialogDescription>
                            Update the vote type for {editingVote && (getCardDetails(editingVote.cardId)?.name || editingVote.cardId)}
                        </DialogDescription>
                    </DialogHeader>
                    {editingVote && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Card ID</label>
                                <Input value={editingVote.cardId} disabled />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Vote Type</label>
                                <Select
                                    value={editingVote.voteType}
                                    onValueChange={(value) =>
                                        setEditingVote({ ...editingVote, voteType: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="love">Love</SelectItem>
                                        <SelectItem value="like">Like</SelectItem>
                                        <SelectItem value="wow">Wow</SelectItem>
                                        <SelectItem value="sad">Sad</SelectItem>
                                        <SelectItem value="fire">Fire</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingVote(null)}>
                            Cancel
                        </Button>
                        <Button onClick={updateVote}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Comment Dialog */}
            <Dialog open={!!editingComment} onOpenChange={() => setEditingComment(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Comment</DialogTitle>
                        <DialogDescription>
                            Update the comment details
                        </DialogDescription>
                    </DialogHeader>
                    {editingComment && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">User ID</label>
                                <Input
                                    value={editingComment.userId}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Comment</label>
                                <Textarea
                                    value={editingComment.content}
                                    onChange={(e) =>
                                        setEditingComment({ ...editingComment, content: e.target.value })
                                    }
                                    rows={4}
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingComment(null)}>
                            Cancel
                        </Button>
                        <Button onClick={updateComment}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="w-5 h-5" />
                            Confirm Deletion
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this {deleteConfirm?.type}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete Forever</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Card Dialog */}
            <Dialog open={!!viewingCardId} onOpenChange={(open) => !open && setViewingCardId(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Card Details</DialogTitle>
                    </DialogHeader>
                    {viewingCardId && (() => {
                        const card = getCardDetails(viewingCardId)
                        if (!card) return <div>Card not found</div>
                        return (
                            <div className="space-y-6">
                                <div className="relative aspect-[2/3] w-48 mx-auto rounded-lg overflow-hidden border shadow-xl">
                                    {card.image ? (
                                        <Image
                                            src={card.image}
                                            alt={card.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">{card.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1 capitalize">{card.type} Arcana {card.suit ? `• ${card.suit}` : ''}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-muted/30 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-amber-500" />
                                            Meaning
                                        </h4>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{card.meaning}</p>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-purple-500" />
                                            Visual Description
                                        </h4>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{card.visualDesc}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })()}
                </DialogContent>
            </Dialog>

            {/* View Card Dialog */}
            <Dialog open={!!viewingCardId} onOpenChange={(open) => !open && setViewingCardId(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Card Details</DialogTitle>
                    </DialogHeader>
                    {viewingCardId && (() => {
                        const card = getCardDetails(viewingCardId)
                        if (!card) return <div>Card not found</div>
                        return (
                            <div className="space-y-6">
                                <div className="relative aspect-[2/3] w-48 mx-auto rounded-lg overflow-hidden border shadow-xl">
                                    {card.image ? (
                                        <Image
                                            src={card.image}
                                            alt={card.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">{card.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1 capitalize">{card.type} Arcana {card.suit ? `• ${card.suit}` : ''}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-muted/30 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-amber-500" />
                                            Meaning
                                        </h4>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{card.meaning}</p>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-purple-500" />
                                            Visual Description
                                        </h4>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{card.visualDesc}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })()}
                </DialogContent>
            </Dialog>
        </div >
    )
}
