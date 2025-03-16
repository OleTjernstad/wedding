import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { getGiftById } from "@/lib/gift-service"

// GET a specific gift by ID (public)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const gift = await getGiftById(params.id)

    if (!gift) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 })
    }

    return NextResponse.json(gift)
  } catch (error) {
    console.error(`Error fetching gift with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch gift" }, { status: 500 })
  }
}

// DELETE a specific gift by ID (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const gift = await getGiftById(params.id)

    if (!gift) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 })
    }

    // In a real application, you would delete the gift from your database
    // await deleteGift(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting gift with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete gift" }, { status: 500 })
  }
}

