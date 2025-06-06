import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

// POST create a new reservation (public)
export async function POST(req: NextRequest) {
  try {
    const { giftId, quantity, message, anonymous } = await req.json();

    // Validate required fields
    if (!giftId || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate quantity
    if (quantity <= 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0" },
        { status: 400 }
      );
    }

    // Check if gift exists and has enough quantity

    const gift = await db.gift.findUnique({
      where: { id: giftId },
    });

    if (!gift) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 });
    }

    const availableQuantity = gift.quantity - gift.reservedQuantity;

    // if (quantity > availableQuantity) {
    //   return NextResponse.json(
    //     { error: "Not enough quantity available" },
    //     { status: 400 }
    //   );
    // }

    const reservation = await db.reservation.create({
      data: {
        id: uuidv4(),
        giftId: giftId,
        quantity: quantity,
        message,
      },
    });

    const updatedGift = await db.gift.update({
      where: { id: giftId },
      data: {
        reservedQuantity: gift.reservedQuantity + quantity,
      },
    });

    revalidatePath("/admin/gifts");
    revalidatePath("/admin/reservations");
    revalidatePath("/");

    return NextResponse.json({ reservation, updatedGift }, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}
