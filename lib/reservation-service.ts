import { db } from "@/lib/db"
import type { Reservation } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"

// Get all reservations with gift information
export async function getReservations(): Promise<Reservation[]> {
  try {
    const reservations = await db.reservation.findMany({
      include: {
        gift: true,
      },
      orderBy: {
        date: "desc",
      },
    })

    return reservations.map((reservation) => ({
      id: reservation.id,
      giftId: reservation.giftId,
      quantity: reservation.quantity,
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail,
      date: reservation.date,
      gift: reservation.gift
        ? {
            id: reservation.gift.id,
            name: reservation.gift.name,
            description: reservation.gift.description || "",
            quantity: reservation.gift.quantity,
            reservedQuantity: reservation.gift.reservedQuantity,
            categoryId: reservation.gift.categoryId,
            imageUrl: reservation.gift.imageUrl || undefined,
          }
        : undefined,
    }))
  } catch (error) {
    console.error("Error fetching reservations:", error)
    throw new Error("Failed to fetch reservations")
  }
}

// Get recent reservations
export async function getRecentReservations(limit: number): Promise<Reservation[]> {
  try {
    const reservations = await db.reservation.findMany({
      include: {
        gift: true,
      },
      orderBy: {
        date: "desc",
      },
      take: limit,
    })

    return reservations.map((reservation) => ({
      id: reservation.id,
      giftId: reservation.giftId,
      quantity: reservation.quantity,
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail,
      date: reservation.date,
      gift: reservation.gift
        ? {
            id: reservation.gift.id,
            name: reservation.gift.name,
            description: reservation.gift.description || "",
            quantity: reservation.gift.quantity,
            reservedQuantity: reservation.gift.reservedQuantity,
            categoryId: reservation.gift.categoryId,
            imageUrl: reservation.gift.imageUrl || undefined,
          }
        : undefined,
    }))
  } catch (error) {
    console.error("Error fetching recent reservations:", error)
    throw new Error("Failed to fetch recent reservations")
  }
}

// Create a new reservation
export async function createReservation(reservationData: Omit<Reservation, "id">): Promise<Reservation> {
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
    })

    return {
      id: reservation.id,
      giftId: reservation.giftId,
      quantity: reservation.quantity,
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail,
      date: reservation.date,
    }
  } catch (error) {
    console.error("Error creating reservation:", error)
    throw new Error("Failed to create reservation")
  }
}

