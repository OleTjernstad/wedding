import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// GET a specific reservation by ID (admin only)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await auth.protect();

  try {
    // In a real application, you would fetch the reservation from your database
    // const reservation = await getReservationById(params.id)

    // For demo purposes
    const reservation = {
      id: params.id,
      giftId: "gift-123",
      quantity: 1,
      guestName: "John Doe",
      guestEmail: "john@example.com",
      date: new Date().toISOString(),
    };

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(`Error fetching reservation with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch reservation" },
      { status: 500 }
    );
  }
}

// DELETE a specific reservation by ID (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await auth.protect();

  try {
    // In a real application, you would delete the reservation from your database
    // and update the gift's reserved quantity
    // await deleteReservation(params.id)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting reservation with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete reservation" },
      { status: 500 }
    );
  }
}
