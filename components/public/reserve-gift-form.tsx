"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import type { Gift } from "@/lib/types"

const reserveFormSchema = z.object({
  guestName: z.string().min(1, "Name is required"),
  guestEmail: z.string().email("Valid email is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
})

type ReserveFormValues = z.infer<typeof reserveFormSchema>

interface ReserveGiftFormProps {
  gift: Gift
  onSuccess?: () => void
}

export function ReserveGiftForm({ gift, onSuccess }: ReserveGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const availableQuantity = gift.quantity - gift.reservedQuantity

  const form = useForm<ReserveFormValues>({
    resolver: zodResolver(reserveFormSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      quantity: 1,
    },
  })

  async function onSubmit(data: ReserveFormValues) {
    if (data.quantity > availableQuantity) {
      form.setError("quantity", {
        type: "manual",
        message: `Only ${availableQuantity} available`,
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          giftId: gift.id,
          quantity: data.quantity,
          guestName: data.guestName,
          guestEmail: data.guestEmail,
          date: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to reserve gift")
      }

      toast({
        title: "Gift Reserved",
        description: `You have successfully reserved ${data.quantity} ${data.quantity > 1 ? "units" : "unit"} of ${gift.name}.`,
      })

      form.reset()

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error reserving gift:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reserve gift. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (availableQuantity === 0) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">This gift is fully reserved.</div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="guestName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guestEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormDescription>We'll send you a confirmation email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={availableQuantity} {...field} />
              </FormControl>
              <FormDescription>{availableQuantity} available</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Reserving..." : "Reserve Gift"}
        </Button>
      </form>
    </Form>
  )
}

