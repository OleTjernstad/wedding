import { type NextRequest, NextResponse } from "next/server"
import { getPayloadClient } from "@/lib/payload"

export async function GET(req: NextRequest) {
  try {
    // Get Payload instance
    const payload = await getPayloadClient()

    // Fetch registry settings
    const settings = await payload.findGlobal({
      slug: "registry-settings",
    })

    return NextResponse.json(settings)
  } catch (error: any) {
    console.error("Error fetching registry settings:", error.message)

    return NextResponse.json({ error: "Failed to fetch registry settings" }, { status: 500 })
  }
}

