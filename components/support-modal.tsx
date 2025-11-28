"use client"

import * as React from "react"
import { Loader2, CheckCircle2, Users, Pen, Palette, Rocket } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
  messages: any
}

export function SupportModal({ isOpen, onClose, messages }: SupportModalProps) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [interest, setInterest] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, interest, message }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setName("")
        setEmail("")
        setInterest("")
        setMessage("")
        setTimeout(() => {
          setStatus('idle')
          onClose()
        }, 2000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || messages.support?.error || "Something went wrong")
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(messages.support?.error || "Something went wrong")
      setTimeout(() => setStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const supportAreas = [
    {
      icon: Pen,
      title: messages.support?.writing || "Writing & Content",
      description: messages.support?.writingDesc || "Help craft the guide diary and card meanings"
    },
    {
      icon: Palette,
      title: messages.support?.illustration || "Illustration & Design",
      description: messages.support?.illustrationDesc || "Bring the vision to life through art"
    },
    {
      icon: Rocket,
      title: messages.support?.campaign || "Campaign Building",
      description: messages.support?.campaignDesc || "Support Kickstarter & Gamefound launches"
    },
    {
      icon: Users,
      title: messages.support?.team || "Join the Team",
      description: messages.support?.teamDesc || "Become part of the core creative team"
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            {messages.support?.title || "Join Our Journey"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {messages.support?.subtitle || "We're building something transformative and we need your help"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Support Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportAreas.map((area, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors"
              >
                <area.icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{area.title}</h3>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  {messages.support?.nameLabel || "Your Name"}
                </label>
                <Input
                  type="text"
                  placeholder={messages.support?.namePlaceholder || "John Doe"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  {messages.support?.emailLabel || "Email"}
                </label>
                <Input
                  type="email"
                  placeholder={messages.support?.emailPlaceholder || "john@example.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                {messages.support?.interestLabel || "I'm interested in"}
              </label>
              <Input
                type="text"
                placeholder={messages.support?.interestPlaceholder || "Writing, Illustration, Campaign Support..."}
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                {messages.support?.messageLabel || "Tell us about yourself"}
              </label>
              <Textarea
                placeholder={messages.support?.messagePlaceholder || "Share your experience, skills, and why you'd like to join..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={isSubmitting}
                className="min-h-[120px]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {messages.support?.sending || "Sending..."}
                </>
              ) : (
                messages.support?.submit || "Send Message"
              )}
            </Button>

            <div className="text-center min-h-[20px]">
              {status === 'success' && (
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  {messages.support?.success || "Thank you! We'll be in touch soon."}
                </div>
              )}

              {status === 'error' && (
                <p className="text-red-600 dark:text-red-400 font-medium text-sm">
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
