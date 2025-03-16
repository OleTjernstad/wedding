import { type NextRequest, NextResponse } from "next/server"
import { getPayloadClient } from "@/lib/payload"

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const category = url.searchParams.get("category")
    const search = url.searchParams.get("search")
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "50")
    const sort = url.searchParams.get("sort") || "name"
    const order = url.searchParams.get("order") || "asc"

    // Get Payload instance
    const payload = await getPayloadClient()

    // Build query
    const query: any = {}

    if (category) {
      // Find the category by slug
      const categoryResult = await payload.find({
        collection: "categories",
        where: {
          slug: {
            equals: category,
          },
        },
        limit: 1,
      })

      if (categoryResult.docs.length > 0) {
        query.category = {
          equals: categoryResult.docs[0].id,
        }
      }
    }

    if (search) {
      query.name = {
        like: search,
      }
    }

    // Fetch gifts
    const gifts = await payload.find({
      collection: "gifts",
      where: query,
      page,
      limit,
      sort: [sort, order],
      depth: 1, // Include category information
    })

    return NextResponse.json(gifts)
  } catch (error: any) {
    console.error("Error fetching gifts:", error.message)

    return NextResponse.json({ error: "Failed to fetch gifts" }, { status: 500 })
  }
}

