import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  createSuccessResponse,
  createErrorResponse,
} from "@/utils/apiResponse";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { mealManagerId } = await request.json();

    const updatedMessMonth = await prisma.messMonth.update({
      where: { id },
      data: {
        mealManagerId,
      },
    });

    if (!updatedMessMonth) {
      return NextResponse.json(
        createErrorResponse("Mess month not found", { code: "NOT_FOUND" }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createSuccessResponse(
        updatedMessMonth,
        "Mess month updated successfully"
      ),
      { status: 200 }
    );
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

    await prisma.messMonth.delete({
      where: { id },
    });

    return NextResponse.json(
      createSuccessResponse(null, "Mess month deleted successfully"),
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
