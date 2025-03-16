import { type NextRequest, NextResponse } from "next/server"
import { getPayloadClient } from "@/lib/payload"

export async function GET(req: NextRequest) {
  try {
    // Get Payload instance
    const payload = await getPayloadClient()

    // Fetch categories
    const categories = await payload.find({
      collection: "categories",
    })

    return NextResponse.json(categories)
  } catch (error: any) {
    console.error("Error fetching categories:", error.message)

    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

