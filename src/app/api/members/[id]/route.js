import { NextResponse } from "next/server";
import { PrismaWrapper } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { role, leftAt } = await request.json();

    const updatedMember = await PrismaWrapper.update("MessMember", {
      where: { id },
      data: {
        role,
        leftAt,
      },
    });

    if (!updatedMember) {
      return ApiResponse.error("Mess member not found", 404);
    }

    return ApiResponse.success(
      updatedMember,
      "Mess member updated successfully"
    );
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await PrismaWrapper.delete("MessMember", {
      where: { id },
    });

    return ApiResponse.success(null, "Mess member removed successfully", 204);
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}
