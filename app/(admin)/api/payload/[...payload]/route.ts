import type { NextRequest } from "next/server"
import { getPayloadClient } from "@/lib/payload"

// This route handles all Payload CMS API requests
export async function GET(req: NextRequest) {
  const payload = await getPayloadClient()

  // Pass the request to the Payload API
  const { res } = await payload.handle({ req })

  return res
}

export async function POST(req: NextRequest) {
  const payload = await getPayloadClient()

  // Pass the request to the Payload API
  const { res } = await payload.handle({ req })

  return res
}

export async function PUT(req: NextRequest) {
  const payload = await getPayloadClient()

  // Pass the request to the Payload API
  const { res } = await payload.handle({ req })

  return res
}

export async function PATCH(req: NextRequest) {
  const payload = await getPayloadClient()

  // Pass the request to the Payload API
  const { res } = await payload.handle({ req })

  return res
}

export async function DELETE(req: NextRequest) {
  const payload = await getPayloadClient()

  // Pass the request to the Payload API
  const { res } = await payload.handle({ req })

  return res
}

