import { NextResponse } from "next/server";
import { PrismaWrapper } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const messes = await PrismaWrapper.findMany("Mess", {
      skip,
      take: limit,
      include: {
        members: true,
        months: true,
      },
    });

    const totalMesses = await PrismaWrapper.count("Mess");

    return ApiResponse.success(
      {
        messes,
        pagination: {
          total: totalMesses,
          page,
          limit,
          totalPages: Math.ceil(totalMesses / limit),
        },
      },
      "Messes retrieved successfully"
    );
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}

export async function POST(request) {
  try {
    const { name, description } = await request.json();

    if (!name) {
      return ApiResponse.error("Mess name is required", 400);
    }

    const newMess = await PrismaWrapper.create("Mess", {
      data: {
        name,
        description,
      },
    });

    return ApiResponse.success(newMess, "Mess created successfully", 201);
  } catch (error) {
    return ApiResponse.error(error.message, 500);
  }
}
