import { type NextRequest, NextResponse } from "next/server"
import { getPayloadClient } from "@/lib/payload"

export async function POST(req: NextRequest) {
  try {
    const { giftId, guestName, guestEmail, message, anonymous } = await req.json()

    // Validate input
    if (!giftId || !guestName || !guestEmail) {
      return NextResponse.json({ error: "Gift ID, guest name, and guest email are required" }, { status: 400 })
    }

    // Get Payload instance
    const payload = await getPayloadClient()

    // Check if gift exists and is not already reserved
    const gift = await payload.findByID({
      collection: "gifts",
      id: giftId,
    })

    if (!gift) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 })
    }

    if (gift.reserved) {
      return NextResponse.json({ error: "This gift has already been reserved" }, { status: 400 })
    }

    // Create reservation
    const reservation = await payload.create({
      collection: "gift-reservations",
      data: {
        gift: giftId,
        guestName,
        guestEmail,
        message: message || "",
        anonymous: anonymous || false,
      },
    })

    return NextResponse.json({
      success: true,
      reservation: {
        id: reservation.id,
        giftId,
        guestName,
        guestEmail,
      },
    })
  } catch (error: any) {
    console.error("Error reserving gift:", error.message)

    return NextResponse.json({ error: "Failed to reserve gift" }, { status: 500 })
  }
}

