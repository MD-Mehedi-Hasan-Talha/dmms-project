import { prisma } from "@/lib/prisma";
import {
  createErrorResponse,
  createSuccessResponse,
  sendSuccess,
} from "@/utils/apiResponse";
import { NextResponse } from "next/server";

import { getMonthName } from "@/lib/utils";
import { checkRequiredFields } from "@/utils/errorBuilder";

export async function POST(request) {
  try {
    const { messId, month, mealManagerId } = await request.json();

    const requiredFields = ["messId", "month", "mealManagerId"];
    const missingFieldsError = checkRequiredFields(
      { messId, month, mealManagerId },
      requiredFields
    );
    if (missingFieldsError) {
      return NextResponse.json(
        createErrorResponse(missingFieldsError.error, {
          code: "VALIDATION_ERROR",
        }),
        { status: missingFieldsError.statusCode }
      );
    }

    // check if the month is already created
    const existingMonth = await prisma.messMonth.findFirst({
      where: {
        messId,
        month: new Date(month),
      },
    });

    if (existingMonth) {
      return NextResponse.json(
        createErrorResponse("Month already created", {
          code: "VALIDATION_ERROR",
        }),
        { status: 400 }
      );
    }

    const newMessMonth = await prisma.messMonth.create({
      data: {
        messId,
        month: new Date(month),
        mealManagerId,
        banglaMonth: getMonthName(new Date(month).getMonth() + 1),
        englishMonth: getMonthName(new Date(month).getMonth() + 1, "en"),
      },
    });

    return NextResponse.json(newMessMonth, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const messId = searchParams.get("messId");
    const month = searchParams.get("month");

    const where = {};

    if (messId) {
      where.messId = messId;
    }

    if (month) {
      where.month = new Date(month);
    }

    const months = await prisma.messMonth.findMany({
      where,
    });

    return NextResponse.json(createSuccessResponse(months));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
