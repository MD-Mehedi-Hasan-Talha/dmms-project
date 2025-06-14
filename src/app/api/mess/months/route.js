import { NextResponse } from "next/server";
import { PrismaWrapper } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";

export async function POST(request) {
  try {
    const { messId, month, mealManagerId } = await request.json();

    if (!messId || !month || !mealManagerId) {
      return ApiResponse.error(
        "Mess ID, month, and meal manager ID are required",
        400
      );
    }

    const newMessMonth = await PrismaWrapper.create("MessMonth", {
      data: {
        messId,
        month: new Date(month),
        mealManagerId,
      },
    });

    return ApiResponse.success(
      newMessMonth,
      "Mess month created successfully",
      201
    );
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}
