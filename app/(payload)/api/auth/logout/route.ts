import { type NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Get Payload instance
    const payload = await getPayloadClient();

    // Get the token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token")?.value;

    if (token) {
      // Logout from Payload
      await payload.logout({
        token,
      });

      // Clear the cookie
      cookieStore.delete("payload-token");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Logout error:", error.message);

    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
