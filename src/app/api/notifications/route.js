import { prisma } from "@/lib/prisma";
import { createErrorResponse } from "@/utils/apiResponse";
import { checkRequiredFields } from "@/utils/errorBuilder";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const read = searchParams.get("read");

    if (!userId) {
      return NextResponse.json(
        createErrorResponse("User ID is required", {
          code: "VALIDATION_ERROR",
        }),
        { status: 400 }
      );
    }

    const where = { userId };
    if (read !== null) {
      where.read = read === "true";
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId, type, title, message, link } = await request.json();

    const requiredFields = ["userId", "type", "title", "message"];
    const missingFieldsError = checkRequiredFields(
      { userId, type, title, message },
      requiredFields
    );
    if (missingFieldsError) {
      return NextResponse.json(
        createErrorResponse(missingFieldsError.error, {
          code: "VALIDATION_ERROR",
        }),
        { status: missingFieldsError.statusCode }
      );
    }

    const newNotification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        link,
      },
    });

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
