import { NextResponse } from "next/server";
import { PrismaWrapper } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const mess = await PrismaWrapper.findUnique("Mess", {
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
      return ApiResponse.error("Mess not found", 404);
    }

    return ApiResponse.success(mess, "Mess retrieved successfully");
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, description } = await request.json();

    const updatedMess = await PrismaWrapper.update("Mess", {
      where: { id },
      data: {
        name,
        description,
      },
    });

    if (!updatedMess) {
      return ApiResponse.error("Mess not found", 404);
    }

    return ApiResponse.success(updatedMess, "Mess updated successfully");
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await PrismaWrapper.delete("Mess", {
      where: { id },
    });

    return ApiResponse.success(null, "Mess deleted successfully", 204);
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}
