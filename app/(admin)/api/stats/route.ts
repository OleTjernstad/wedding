import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { getGiftStats } from "@/lib/gift-service"

// GET registry statistics (admin only)
export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const stats = await getGiftStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}

