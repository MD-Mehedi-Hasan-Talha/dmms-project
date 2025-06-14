import { NextResponse } from "next/server";
import { PrismaWrapper } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { mealManagerId } = await request.json();

    const updatedMessMonth = await PrismaWrapper.update("MessMonth", {
      where: { id },
      data: {
        mealManagerId,
      },
    });

    if (!updatedMessMonth) {
      return ApiResponse.error("Mess month not found", 404);
    }

    return ApiResponse.success(
      updatedMessMonth,
      "Mess month updated successfully"
    );
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await PrismaWrapper.delete("MessMonth", {
      where: { id },
    });

    return ApiResponse.success(null, "Mess month deleted successfully", 204);
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}
