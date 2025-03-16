import { type NextRequest, NextResponse } from "next/server"
import { getPayloadClient } from "@/lib/payload"
import { cookies } from "next/headers"

// Protected route - only accessible to admins and couple
export async function GET(req: NextRequest) {
  try {
    // Get the token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get("payload-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get Payload instance
    const payload = await getPayloadClient()

    // Verify and get the user
    const { user } = await payload.verifyToken({
      token,
      collection: "users",
    })

    if (!user || !["admin", "couple"].includes(user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "20")

    // Fetch all reservations
    const reservations = await payload.find({
      collection: "gift-reservations",
      page,
      limit,
      depth: 2, // Include gift details
    })

    return NextResponse.json(reservations)
  } catch (error: any) {
    console.error("Error fetching reservations:", error.message)

    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}

