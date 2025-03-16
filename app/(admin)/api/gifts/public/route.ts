import { type NextRequest, NextResponse } from "next/server";
import { getPublicGifts } from "@/lib/gift-service";

// GET public gifts (accessible to everyone)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    const gifts = await getPublicGifts(
      categoryId || undefined,
      search || undefined
    );

    return NextResponse.json(gifts);
  } catch (error) {
    console.error("Error fetching public gifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch gifts" },
      { status: 500 }
    );
  }
}
