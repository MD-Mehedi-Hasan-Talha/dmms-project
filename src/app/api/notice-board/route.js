import { wrapAllModels } from "@/utils/prisma-wrapper";
import { NextResponse } from "next/server";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/apiResponse";
import { prisma } from "@/lib/prisma";
import { checkRequiredFields } from "@/utils/errorBuilder";
const db = wrapAllModels(prisma);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const type = searchParams.get("type");
    const label = searchParams.get("label");
    const search = searchParams.get("search") || "";

    const where = { deletedAt: null };

    if (type) {
      where.type = type;
    }
    if (label) {
      where.label = label;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const noticeBoards = await db.noticeBoard.findManyX({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        creator: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(createSuccessResponse(noticeBoards), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching notice boards:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch notice boards", {
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const requiredFields = [
      "title",
      "description",
      "creator_role",
      "creator_id",
      "type",
    ];

    const missingFieldsError = checkRequiredFields(body, requiredFields);
    if (missingFieldsError) {
      return NextResponse.json(
        createErrorResponse(missingFieldsError.error, {
          code: "VALIDATION_ERROR",
        }),
        { status: missingFieldsError.statusCode }
      );
    }

    const {
      title,
      description,
      creator_role,
      creator_id,
      expiry_date,
      label,
      type,
    } = body;

    const newNoticeBoard = await prisma.noticeBoard.create({
      data: {
        title,
        description,
        creator_role,
        creator_id,
        expiry_date: expiry_date ? new Date(expiry_date) : null,
        label,
        type,
      },
    });

    return NextResponse.json(createSuccessResponse(newNoticeBoard), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating notice board:", error);
    return NextResponse.json(
      createErrorResponse("Failed to create notice board", {
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
