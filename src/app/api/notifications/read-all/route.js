import { prisma } from "@/lib/prisma";
import { createErrorResponse } from "@/utils/apiResponse";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        createErrorResponse("User ID is required", {
          code: "VALIDATION_ERROR",
        }),
        { status: 400 }
      );
    }

    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
