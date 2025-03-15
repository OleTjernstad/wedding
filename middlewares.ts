import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This middleware protects admin routes
export function middleware(request: NextRequest) {
  //Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Get the token from cookies
    const token = request.cookies.get("payload-token")?.value;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure which paths this middleware runs on
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
