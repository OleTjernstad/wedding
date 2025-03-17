import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getReservations } from "@/lib/reservation-service";

// GET all reservations (admin only)
export async function GET() {
  await auth.protect();

  try {
    const reservations = await getReservations();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}
