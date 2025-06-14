import { NextResponse } from "next/server";
import { authMiddleware } from "./middleware/auth";

export async function middleware(request) {
  // Apply authMiddleware to specific paths
  // if (request.nextUrl.pathname.startsWith('/api/')) {
  //     return authMiddleware(request);
  // }

  return NextResponse.next();
}

// This matcher ensures the middleware only runs for specified paths
export const config = {
  matcher: [
    "/api/:path*", // Protect all meal-entry API routes
  ],
};
