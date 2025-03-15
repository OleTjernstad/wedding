"use client"

import { useState } from "react"
import { Check, ExternalLink, GiftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ReserveGiftForm from "@/components/reserve-gift-form"

interface GiftCardProps {
  gift: {
    id: string
    name: string
    description: string
    store: string
    link: string
    category: {
      id: string
      name: string
      slug: string
    }
    image?: {
      url: string
    }
    reserved: boolean
  }
  onReserved?: () => void
}

export default function GiftCard({ gift, onReserved }: GiftCardProps) {
  const [isPurchased, setIsPurchased] = useState(gift.reserved)
  const [isReserveDialogOpen, setIsReserveDialogOpen] = useState(false)

  // Generate a consistent color based on the gift category
  const getCategoryColor = (categorySlug: string) => {
    switch (categorySlug) {
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

  // Handle successful reservation
  const handleReservationSuccess = () => {
    setIsPurchased(true)
    setIsReserveDialogOpen(false)
    if (onReserved) onReserved()
  }

  // Translate category names to Norwegian
  const getCategoryName = (categorySlug: string) => {
    switch (categorySlug) {
      case "kitchen":
        return "Kjøkken"
      case "home":
        return "Hjem"
      case "experiences":
        return "Opplevelser"
      case "gift-cards":
        return "Gavekort"
      default:
        return gift.category?.name || categorySlug
    }
  }

  const categorySlug = gift.category?.slug || "default"
  const categoryName = gift.category?.name || getCategoryName(categorySlug)

  return (
    <>
      <Card className={`transition-all h-full flex flex-col ${isPurchased ? "opacity-60" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getCategoryColor(categorySlug)}`}>
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
          <Badge variant="outline" className={`mb-3 ${getCategoryColor(categorySlug)}`}>
            {categoryName}
          </Badge>
          <p className="text-gray-600">{gift.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between gap-2 pt-4 border-t">
          <Button
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50 flex-1"
            onClick={() => setIsReserveDialogOpen(true)}
            disabled={isPurchased}
          >
            {isPurchased ? "Reservert" : "Reserver gave"}
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" asChild>
            <a href={gift.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" /> Se gave
            </a>
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isReserveDialogOpen} onOpenChange={setIsReserveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reserver gave</DialogTitle>
          </DialogHeader>
          <ReserveGiftForm giftId={gift.id} giftName={gift.name} onSuccess={handleReservationSuccess} />
        </DialogContent>
      </Dialog>
    </>
  )
}

