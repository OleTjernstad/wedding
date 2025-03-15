import { type NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function POST(req: NextRequest) {
  try {
    const { giftId, quantity, message, anonymous } = await req.json();

    // Validate input
    if (!giftId || !quantity) {
      return NextResponse.json(
        { error: "Gift ID and quantity are required" },
        { status: 400 }
      );
    }

    // Get Payload instance
    const payload = await getPayloadClient();

    // Check if gift exists
    const gift = await payload.findByID({
      collection: "gifts",
      id: giftId,
    });

    console.log({ gift });

    if (!gift) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 });
    }

    // Create reservation
    const reservation = await payload.create({
      collection: "gift-reservations",
      data: {
        gift: gift.id, // Use gift.id instead of giftId
        quantity,
        message: message || "",
        anonymous: true,
      },
    });

    return NextResponse.json({
      success: true,
      //   reservation: {
      //     id: reservation.id,
      //     giftId: gift.id, // Use gift.id instead of giftId
      //     quantity,
      //   },
    });
  } catch (error: any) {
    console.error("Error reserving gift:", error.message);

    return NextResponse.json(
      { error: "Failed to reserve gift" },
      { status: 500 }
    );
  }
}
