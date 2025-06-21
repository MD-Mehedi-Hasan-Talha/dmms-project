import { prisma } from "@/lib/prisma";
import { createErrorResponse } from "@/utils/apiResponse";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { read } = await request.json();

    if (typeof read !== "boolean") {
      return NextResponse.json(
        createErrorResponse("Invalid 'read' value. Must be a boolean.", {
          code: "VALIDATION_ERROR",
        }),
        { status: 400 }
      );
    }

    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { read },
    });

    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.notification.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
