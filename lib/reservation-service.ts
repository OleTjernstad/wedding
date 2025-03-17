import type { Reservation } from "@/lib/types";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// Get all reservations with gift information
export async function getReservations() {
  try {
    const reservations = await db.reservation.findMany({
      include: {
        gift: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw new Error("Failed to fetch reservations");
  }
}

// Get recent reservations
export async function getRecentReservations(limit: number) {
  try {
    const reservations = await db.reservation.findMany({
      include: {
        gift: true,
      },
      orderBy: {
        date: "desc",
      },
      take: limit,
    });

    return reservations;
  } catch (error) {
    console.error("Error fetching recent reservations:", error);
    throw new Error("Failed to fetch recent reservations");
  }
}

// Create a new reservation
export async function createReservation(
  reservationData: Omit<Reservation, "id">
) {
  try {
    const reservation = await db.reservation.create({
      data: {
        id: uuidv4(),
        giftId: reservationData.giftId,
        quantity: reservationData.quantity,
        guestName: reservationData.guestName,
        guestEmail: reservationData.guestEmail,
        date: reservationData.date,
      },
    });

    return reservation;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw new Error("Failed to create reservation");
  }
}
