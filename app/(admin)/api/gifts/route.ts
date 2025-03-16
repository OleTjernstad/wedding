import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  createGift,
  updateGift,
  deleteGift,
  getGifts,
} from "@/lib/gift-service";
import type { Gift } from "@/lib/types";

// GET all gifts (admin only)
export async function GET(req: NextRequest) {
  await auth.protect();

  try {
    const gifts = await getGifts();
    return NextResponse.json(gifts);
  } catch (error) {
    console.error("Error fetching gifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch gifts" },
      { status: 500 }
    );
  }
}

// POST create a new gift (admin only)
export async function POST(req: NextRequest) {
  await auth.protect();

  try {
    const giftData: Omit<Gift, "id"> = await req.json();

    // Validate required fields
    if (
      !giftData.name ||
      !giftData.categoryId ||
      giftData.quantity === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate quantity
    if (giftData.quantity <= 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0" },
        { status: 400 }
      );
    }

    const gift = await createGift(giftData);
    return NextResponse.json(gift, { status: 201 });
  } catch (error) {
    console.error("Error creating gift:", error);
    return NextResponse.json(
      { error: "Failed to create gift" },
      { status: 500 }
    );
  }
}

// PUT update a gift (admin only)
export async function PUT(req: NextRequest) {
  await auth.protect();

  try {
    const giftData: Gift = await req.json();

    // Validate required fields
    if (
      !giftData.id ||
      !giftData.name ||
      !giftData.categoryId ||
      giftData.quantity === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate quantity
    if (giftData.quantity < giftData.reservedQuantity) {
      return NextResponse.json(
        { error: "Quantity cannot be less than reserved quantity" },
        { status: 400 }
      );
    }

    const gift = await updateGift(giftData);
    return NextResponse.json(gift);
  } catch (error) {
    console.error("Error updating gift:", error);
    return NextResponse.json(
      { error: "Failed to update gift" },
      { status: 500 }
    );
  }
}

// DELETE a gift (admin only)
export async function DELETE(req: NextRequest) {
  await auth.protect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing gift ID" }, { status: 400 });
    }

    await deleteGift(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gift:", error);
    return NextResponse.json(
      { error: "Failed to delete gift" },
      { status: 500 }
    );
  }
}
