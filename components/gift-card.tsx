"use client"

import { useState } from "react"
import { Check, ExternalLink, GiftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Gift } from "@/lib/gifts"

interface GiftCardProps {
  gift: Gift
}

export default function GiftCard({ gift }: GiftCardProps) {
  const [isPurchased, setIsPurchased] = useState(gift.purchased)

  const handleMarkAsPurchased = () => {
    setIsPurchased(true)
    // In a real app, this would call an API to update the database
  }

  // Generate a consistent color based on the gift category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "kitchen":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "home":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "experiences":
        return "bg-purple-200 text-purple-900 border-purple-300"
      case "gift-cards":
        return "bg-purple-300 text-purple-900 border-purple-400"
      default:
        return "bg-purple-100 text-purple-800 border-purple-200"
    }
  }

  // Translate category names to Norwegian
  const getCategoryName = (category: string) => {
    switch (category) {
      case "kitchen":
        return "Kjøkken"
      case "home":
        return "Hjem"
      case "experiences":
        return "Opplevelser"
      case "gift-cards":
        return "Gavekort"
      default:
        return category
    }
  }

  return (
    <Card className={`transition-all h-full flex flex-col ${isPurchased ? "opacity-60" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${getCategoryColor(gift.category)}`}>
              <GiftIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-purple-800">{gift.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">{gift.store}</CardDescription>
            </div>
          </div>
          {isPurchased && (
            <Badge className="bg-purple-700 text-white">
              <Check className="mr-1 h-3 w-3" /> Reservert
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge variant="outline" className={`mb-3 ${getCategoryColor(gift.category)}`}>
          {getCategoryName(gift.category)}
        </Badge>
        <p className="text-gray-600">{gift.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-4 border-t">
        <Button
          variant="outline"
          className="border-purple-200 text-purple-700 hover:bg-purple-50 flex-1"
          onClick={handleMarkAsPurchased}
          disabled={isPurchased}
        >
          {isPurchased ? "Reservert" : "Marker som reservert"}
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700" asChild>
          <a href={gift.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" /> Se gave
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

