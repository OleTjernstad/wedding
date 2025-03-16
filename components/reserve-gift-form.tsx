"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

interface ReserveGiftFormProps {
  giftId: string
  giftName: string
  onSuccess?: () => void
}

export default function ReserveGiftForm({ giftId, giftName, onSuccess }: ReserveGiftFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/registry/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          giftId,
          guestName: name,
          guestEmail: email,
          message,
          anonymous,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to reserve gift")
      }

      setSuccess(true)

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="p-6 bg-green-50 rounded-lg border border-green-100">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <CheckCircle className="h-5 w-5" />
          <h3 className="text-lg font-medium">Gift Reserved!</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Thank you for reserving "{giftName}". The couple will be notified of your reservation.
        </p>
        <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
          Continue Browsing
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium text-purple-800">Reserve "{giftName}"</h3>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-2">
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Your Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="name@example.com"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a personal message to the couple"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="anonymous" checked={anonymous} onCheckedChange={(checked) => setAnonymous(checked === true)} />
        <Label htmlFor="anonymous" className="text-sm font-normal">
          Make my reservation anonymous
        </Label>
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
        {loading ? "Reserving..." : "Reserve Gift"}
      </Button>
    </form>
  )
}

