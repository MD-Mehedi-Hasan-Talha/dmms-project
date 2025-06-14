import { db } from "@/utils/prisma-wrapper";
import { NextResponse } from "next/server";
import {
  createPaginatedResponse,
  createErrorResponse,
} from "@/utils/apiResponse";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const sortBy = searchParams.get("sortBy") || "date";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const search = searchParams.get("search") || "";
    const messId = searchParams.get("messId");
    const memberId = searchParams.get("memberId");

    const where = { deletedAt: null };

    if (messId) {
      where.messId = messId;
    }
    if (memberId) {
      where.memberId = memberId;
    }

    const specificDateStr = searchParams.get("date");
    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");

    if (specificDateStr) {
      const specificDate = new Date(specificDateStr);
      if (isNaN(specificDate.getTime())) {
        return NextResponse.json(
          createErrorResponse("Invalid date format. Please use YYYY-MM-DD.", {
            code: "INVALID_DATE_FORMAT",
          }),
          { status: 400 }
        );
      }
      const dayStart = new Date(specificDate);
      dayStart.setUTCHours(0, 0, 0, 0);
      const dayEnd = new Date(specificDate);
      dayEnd.setUTCHours(23, 59, 59, 999);
      where.date = { gte: dayStart, lte: dayEnd };
    } else if (startDateStr && endDateStr) {
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return NextResponse.json(
          createErrorResponse(
            "Invalid startDate or endDate format. Please use YYYY-MM-DD.",
            { code: "INVALID_DATE_FORMAT" }
          ),
          { status: 400 }
        );
      }
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
      where.date = { gte: startDate, lte: endDate };
    } else if (startDateStr) {
      const startDate = new Date(startDateStr);
      if (isNaN(startDate.getTime())) {
        return NextResponse.json(
          createErrorResponse(
            "Invalid startDate format. Please use YYYY-MM-DD.",
            { code: "INVALID_DATE_FORMAT" }
          ),
          { status: 400 }
        );
      }
      startDate.setUTCHours(0, 0, 0, 0);
      where.date = { gte: startDate };
    }

    if (search) {
      where.OR = [
        { member: { name: { contains: search, mode: "insensitive" } } },
        { mess: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const mealEntries = await db.mealEntries.findManyX({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        member: { select: { id: true, name: true } },
        mess: { select: { id: true, name: true } },
      },
    });

    // prisma.findMany("mealEntry", {
    //   where,
    //   skip,
    //   take: limit,
    //   orderBy: { [sortBy]: sortOrder },
    //   include: { member: { select: { id: true, name: true } }, mess: { select: { id: true, name: true } } },
    // });

    const total = await prisma.count("mealEntry", { where });

    const pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };

    return NextResponse.json(
      createPaginatedResponse(mealEntries, total, pagination),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching meal entries:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch meal entries", {
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      memberId,
      messId,
      date,
      breakfastStatus,
      lunchStatus,
      dinnerStatus,
      guestCount,
      status,
    } = body;

    if (
      !memberId ||
      !messId ||
      !date ||
      typeof breakfastStatus !== "boolean" ||
      typeof lunchStatus !== "boolean" ||
      typeof dinnerStatus !== "boolean" ||
      typeof guestCount !== "number" ||
      !status
    ) {
      return NextResponse.json(
        createErrorResponse("Missing required fields or invalid data types", {
          code: "VALIDATION_ERROR",
        }),
        { status: 400 }
      );
    }

    const newMealEntry = await prisma.create("mealEntry", {
      memberId,
      messId,
      date: new Date(date),
      breakfastStatus,
      lunchStatus,
      dinnerStatus,
      guestCount,
      status,
    });

    return NextResponse.json(newMealEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating meal entry:", error);
    return NextResponse.json(
      createErrorResponse("Failed to create meal entry", {
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
