import { type NextRequest, NextResponse } from "next/server"
import { getPayloadClient } from "@/lib/payload"
import { cookies } from "next/headers"

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

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Return user data (excluding sensitive information)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error: any) {
    console.error("Auth verification error:", error.message)

    // Clear the invalid token
    const cookieStore = cookies()
    cookieStore.delete("payload-token")

    return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
  }
}

