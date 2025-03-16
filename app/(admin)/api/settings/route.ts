import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

// GET registry settings (admin only)
export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // In a real application, you would fetch the settings from your database
    // For demo purposes
    const settings = {
      registryTitle: "Wedding Gift Registry",
      registryDescription: "Our wedding gift registry",
      coupleNames: "John & Jane",
      eventDate: "2025-06-15",
      enableNotifications: false,
      notificationEmail: "",
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

// PUT update registry settings (admin only)
export async function PUT(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const settingsData = await req.json()

    // In a real application, you would update the settings in your database
    // await updateSettings(settingsData)

    return NextResponse.json(settingsData)
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

