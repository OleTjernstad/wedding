"use client"

import { useState } from "react"
import { GiftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ReserveGiftForm } from "@/components/public/reserve-gift-form"
import type { Gift } from "@/lib/types"

interface PublicGiftCardProps {
  gift: Gift
  viewMode: "grid" | "list"
  onReservationComplete?: () => void
}

export function PublicGiftCard({ gift, viewMode, onReservationComplete }: PublicGiftCardProps) {
  const [isReserveDialogOpen, setIsReserveDialogOpen] = useState(false)

  const availableQuantity = gift.quantity - gift.reservedQuantity
  const reservationProgress = (gift.reservedQuantity / gift.quantity) * 100

  const getReservationStatus = () => {
    if (availableQuantity === 0) {
      return <Badge className="bg-red-500">Fully Reserved</Badge>
    } else if (gift.reservedQuantity > 0) {
      return <Badge className="bg-yellow-500">Partially Reserved</Badge>
    } else {
      return <Badge className="bg-green-500">Available</Badge>
    }
  }

  if (viewMode === "list") {
    return (
      <div className="flex items-center border rounded-md p-4 gap-4">
        <div className="p-2 rounded-full bg-primary/10">
          <GiftIcon className="h-6 w-6 text-primary" />
        </div>

        <div className="flex-1">
          <h3 className="font-medium">{gift.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">{gift.description}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {getReservationStatus()}
          <div className="text-sm text-gray-500">
            {availableQuantity} of {gift.quantity} available
          </div>
        </div>

        <Button onClick={() => setIsReserveDialogOpen(true)} disabled={availableQuantity === 0}>
          Reserve
        </Button>

        <Dialog open={isReserveDialogOpen} onOpenChange={setIsReserveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reserve Gift</DialogTitle>
              <DialogDescription>Fill out the form below to reserve {gift.name}.</DialogDescription>
            </DialogHeader>
            <ReserveGiftForm
              gift={gift}
              onSuccess={() => {
                setIsReserveDialogOpen(false)
                if (onReservationComplete) {
                  onReservationComplete()
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <GiftIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{gift.name}</CardTitle>
              <CardDescription>{gift.description}</CardDescription>
            </div>
          </div>
          {getReservationStatus()}
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Reservation Progress</span>
              <span>
                {gift.reservedQuantity} of {gift.quantity}
              </span>
            </div>
            <Progress value={reservationProgress} />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2 pt-4 border-t">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setIsReserveDialogOpen(true)}
          disabled={availableQuantity === 0}
        >
          Reserve Gift
        </Button>

        <Dialog open={isReserveDialogOpen} onOpenChange={setIsReserveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reserve Gift</DialogTitle>
              <DialogDescription>Fill out the form below to reserve {gift.name}.</DialogDescription>
            </DialogHeader>
            <ReserveGiftForm
              gift={gift}
              onSuccess={() => {
                setIsReserveDialogOpen(false)
                if (onReservationComplete) {
                  onReservationComplete()
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

