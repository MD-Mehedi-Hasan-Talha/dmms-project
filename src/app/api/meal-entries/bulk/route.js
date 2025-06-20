import { NextResponse } from "next/server";

import { createErrorResponse } from "@/utils/apiResponse";
import { checkRequiredFields } from "@/utils/errorBuilder";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const requiredFields = ["messId"];
    const missingFieldsError = checkRequiredFields(body, requiredFields);
    if (missingFieldsError) {
      return NextResponse.json(
        createErrorResponse(missingFieldsError.error, {
          code: "VALIDATION_ERROR",
        }),
        { status: missingFieldsError.statusCode }
      );
    }

    const { messId, startDate, endDate } = body;

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

    const messMembers = await prisma.messMember.findMany({
      where: { messId },
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
          breakfastStatus: 1,
          lunchStatus: 0,
          dinnerStatus: 0,
          guestCount: 0,
          status: "FULL",
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const createdMealEntries = await prisma.mealEntry.createMany({
      data: mealEntriesToCreate,
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
