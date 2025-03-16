import { type NextRequest, NextResponse } from "next/server"
import { createReservation, getReservations } from "@/lib/reservation-service"
import { getGiftById, updateGift } from "@/lib/gift-service"
import { auth } from "@clerk/nextjs"

// GET all reservations (admin only)
export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const reservations = await getReservations()
    return NextResponse.json(reservations)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}

// POST create a new reservation (public)
export async function POST(req: NextRequest) {
  try {
    const { giftId, quantity, guestName, guestEmail } = await req.json()

    // Validate required fields
    if (!giftId || !quantity || !guestName || !guestEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate quantity
    if (quantity <= 0) {
      return NextResponse.json({ error: "Quantity must be greater than 0" }, { status: 400 })
    }

    // Check if gift exists and has enough quantity
    const gift = await getGiftById(giftId)

    if (!gift) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 })
    }

    const availableQuantity = gift.quantity - gift.reservedQuantity

    if (quantity > availableQuantity) {
      return NextResponse.json({ error: "Not enough quantity available" }, { status: 400 })
    }

    // Create reservation
    const reservation = await createReservation({
      giftId,
      quantity,
      guestName,
      guestEmail,
      date: new Date().toISOString(),
    })

    // Update gift reserved quantity
    await updateGift({
      ...gift,
      reservedQuantity: gift.reservedQuantity + quantity,
    })

    return NextResponse.json(reservation, { status: 201 })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}

