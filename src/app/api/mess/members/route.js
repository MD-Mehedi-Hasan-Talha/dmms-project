import { NextResponse } from "next/server";
import { PrismaWrapper } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";

export async function POST(request) {
  try {
    const { messId, userId, role } = await request.json();

    if (!messId || !userId) {
      return ApiResponse.error("Mess ID and User ID are required", 400);
    }

    const newMember = await PrismaWrapper.create("MessMember", {
      data: {
        messId,
        userId,
        role: role || "MEMBER",
      },
    });

    return ApiResponse.success(
      newMember,
      "Mess member added successfully",
      201
    );
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}
