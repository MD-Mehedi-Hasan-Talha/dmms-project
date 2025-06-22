import { prisma } from "@/lib/prisma";
import { createErrorResponse } from "@/utils/apiResponse";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        createErrorResponse("User ID is required", {
          code: "VALIDATION_ERROR",
        }),
        { status: 400 }
      );
    }

    const unreadCount = await prisma.notification.count({
      where: { userId, read: false },
    });

    return NextResponse.json({ count: unreadCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
