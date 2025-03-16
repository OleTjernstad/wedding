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

    console.log("gift.id", typeof gift.id);
    console.log("quantity", typeof quantity);
    // Create reservation
    const reservation = await payload.create({
      collection: "gift-reservations",
      data: {
        gift: Number(gift.id), // Use gift.id instead of giftId
        quantity: Number(quantity),
        anonymous: true,
      },
    });

    // Find all reservations for the gift
    const reservations = await payload.find({
      collection: "gift-reservations",
      where: {
        gift: {
          equals: gift.id,
        },
      },
    });

    // Calculate total reserved quantity
    const totalReservedQuantity = reservations.docs.reduce(
      (sum: number, res: any) => sum + (res.quantity || 0),
      0
    );

    // Update the gift's reserved and partially reserved status
    await payload.update({
      collection: "gifts",
      id: gift.id,
      data: {
        reservedQuantity: totalReservedQuantity,
        reserved: totalReservedQuantity >= gift.quantity,
        partiallyReserved:
          totalReservedQuantity > 0 && totalReservedQuantity < gift.quantity,
      },
    });

    return NextResponse.json({
      success: true,
      reservation: {
        id: reservation.id,
        giftId: gift.id, // Use gift.id instead of giftId
        quantity,
      },
    });
  } catch (error: any) {
    console.error("Error reserving gift:", error.message);

    return NextResponse.json(
      { error: "Failed to reserve gift" },
      { status: 500 }
    );
  }
}
