import { type NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Get Payload instance
    const payload = await getPayloadClient();

    // Attempt to login
    const result = await payload.login({
      collection: "users",
      data: {
        email,
        password,
      },
    });

    // Set the payload token as a cookie
    const cookieStore = await cookies();
    cookieStore.set("payload-token", result.token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7200, // 2 hours
    });

    // Return user data (excluding sensitive information)
    return NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error.message);

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }
}
