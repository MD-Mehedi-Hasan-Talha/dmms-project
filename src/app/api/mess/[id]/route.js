import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createSuccessResponse,
  createErrorResponse,
} from "@/utils/apiResponse";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const mess = await prisma.mess.findUnique({
      where: { id },
      include: {
        members: {
          include: { user: true },
        },
        months: {
          include: { mealManager: true },
        },
      },
    });

    if (!mess) {
      return NextResponse.json(
        createErrorResponse("Mess not found", { code: "NOT_FOUND" }),
        404
      );
    }

    return NextResponse.json(
      createSuccessResponse(mess, "Mess retrieved successfully"),
      200
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      500
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, description } = await request.json();

    const updatedMess = await prisma.mess.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    if (!updatedMess) {
      return NextResponse.json(
        createErrorResponse("Mess not found", { code: "NOT_FOUND" }),
        404
      );
    }

    return NextResponse.json(
      createSuccessResponse(updatedMess, "Mess updated successfully"),
      200
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      500
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.mess.delete({
      where: { id },
    });

    return NextResponse.json(
      createSuccessResponse(null, "Mess deleted successfully"),
      204
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      500
    );
  }
}
