import { prisma } from "@/lib/prisma";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/apiResponse";
import { wrapAllModels } from "@/utils/prisma-wrapper";
import { NextResponse } from "next/server";

const db = wrapAllModels(prisma);

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const noticeBoard = await prisma.noticeBoard.findUnique({
      where: { id }, // add deletedAt: null
      include: { creator: { select: { id: true, name: true } } },
    });

    if (!noticeBoard) {
      return NextResponse.json(
        createErrorResponse("Notice board not found", { code: "NOT_FOUND" }),
        { status: 404 }
      );
    }

    return NextResponse.json(createSuccessResponse(noticeBoard), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching notice board:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch notice board", {
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingNotice = await prisma.noticeBoard.findUnique({
      where: { id },
    });

    if (!existingNotice) {
      return NextResponse.json(
        createErrorResponse("Notice board not found", { code: "NOT_FOUND" }),
        { status: 404 }
      );
    }

    const updatedNoticeBoard = await prisma.noticeBoard.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        expiry_date: body.expiry_date
          ? new Date(body.expiry_date)
          : existingNotice.expiry_date,
        label: body.label,
        type: body.type,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(createSuccessResponse(updatedNoticeBoard), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating notice board:", error);
    return NextResponse.json(
      createErrorResponse("Failed to update notice board", {
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Soft delete implementation
    await db.noticeBoard.softDeleteX({ where: { id } });

    return NextResponse.json(
      createSuccessResponse({ message: "Notice board deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting notice board:", error);
    return NextResponse.json(
      createErrorResponse("Failed to delete notice board", {
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
