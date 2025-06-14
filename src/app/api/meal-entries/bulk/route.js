import { NextResponse } from "next/server";
import PrismaWrapper from "@/utils/prisma-wrapper";
import { createErrorResponse } from "@/utils/apiResponse";

export async function POST(request) {
  try {
    const body = await request.json();
    const { messId, startDate, endDate } = body;

    if (!messId) {
      return NextResponse.json(
        createErrorResponse("Mess ID is required.", {
          code: "VALIDATION_ERROR",
        }),
        { status: 400 }
      );
    }

    let start = new Date(startDate);
    let end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      // Default to 7 days from now if dates are not provided or invalid
      start = new Date();
      start.setHours(0, 0, 0, 0);
      end = new Date();
      end.setDate(end.getDate() + 6); // 7 days including today
      end.setHours(23, 59, 59, 999);
    }

    const messMembers = await PrismaWrapper.findMany("messMember", {
      where: { messId, deletedAt: null },
      select: { id: true },
    });

    if (messMembers.length === 0) {
      return NextResponse.json(
        createErrorResponse("No members found for the given Mess ID.", {
          code: "NOT_FOUND",
        }),
        { status: 404 }
      );
    }

    const mealEntriesToCreate = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      for (const member of messMembers) {
        mealEntriesToCreate.push({
          memberId: member.id,
          messId,
          date: new Date(currentDate),
          breakfastStatus: true,
          lunchStatus: true,
          dinnerStatus: true,
          guestCount: 0,
          status: "Present",
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const createdMealEntries = await PrismaWrapper.createMany("mealEntry", {
      data: mealEntriesToCreate,
      skipDuplicates: true, // Avoid creating duplicate entries for the same member on the same day
    });

    return NextResponse.json(
      {
        message: `Successfully created ${createdMealEntries.count} meal entries.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating bulk meal entries:", error);
    return NextResponse.json(
      createErrorResponse("Failed to create bulk meal entries", {
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
