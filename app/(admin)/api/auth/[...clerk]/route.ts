import { NextResponse } from "next/server"
import { WebhookEvent } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = req.headers
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret
  const wh = new WebhookEvent(body, {
    id: svix_id,
    timestamp: svix_timestamp,
    signature: svix_signature,
  })

  // Verify the payload with the headers
  let evt

  try {
    evt = wh.verify(process.env.CLERK_WEBHOOK_SECRET || "") as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occurred", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === "user.created" || eventType === "user.updated") {
    // Handle user creation or update
    const { id, email_addresses, first_name, last_name } = evt.data

    // You can add custom logic here to sync with your database
    // For example, create or update a user record in your database

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: true })
}

