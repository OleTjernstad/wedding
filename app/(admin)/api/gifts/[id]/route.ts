import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getGiftById } from "@/lib/gift-service";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// GET a specific gift by ID (public)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gift = await getGiftById(params.id);

    if (!gift) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 });
    }

    return NextResponse.json(gift);
  } catch (error) {
    console.error(`Error fetching gift with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch gift" },
      { status: 500 }
    );
  }
}

// DELETE a specific gift by ID (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await auth.protect();

  try {
    const gift = await getGiftById(params.id);

    if (!gift) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 });
    }

    // Delete the gift and related reservations from the database
    await db.reservation.deleteMany({
      where: { giftId: params.id },
    });
    await db.gift.delete({
      where: { id: params.id },
    });

    revalidatePath("/admin/gifts");
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting gift with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete gift" },
      { status: 500 }
    );
  }
}
