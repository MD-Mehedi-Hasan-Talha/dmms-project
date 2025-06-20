import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import PrismaWrapper from "@/utils/prisma-wrapper";

export async function authMiddleware(request) {
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: "Authentication required" }),
      { status: 401 }
    );
  }

  try {
    const decoded = verifyToken(token);
    const user = await PrismaWrapper.findUnique("user", {
      where: { id: decoded.userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Set a custom header with the user ID
    const response = NextResponse.next();
    response.headers.set("x-user-id", user.id);
    response.headers.set("x-user-role", user.role);
    response.headers.set("x-mess-id", user.messId);

    return response;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid or expired token" }),
      { status: 401 }
    );
  }
}
