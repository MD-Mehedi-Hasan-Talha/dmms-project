import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createSuccessResponse,
  createErrorResponse,
} from "@/utils/apiResponse";

export async function POST(request) {
  try {
    const { messId, userId, role } = await request.json();

    if (!messId || !userId) {
      return NextResponse.json(
        createErrorResponse("Mess ID and User ID are required", {
          code: "VALIDATION_ERROR",
        }),
        { status: 400 }
      );
    }

    // check mess and user exists
    const mess = await prisma.mess.findUnique({
      where: { id: messId },
    });

    if (!mess) {
      return NextResponse.json(
        createErrorResponse("Mess not found", { code: "NOT_FOUND" }),
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        createErrorResponse("User not found", { code: "NOT_FOUND" }),
        { status: 404 }
      );
    }

    const newMember = await prisma.messMember.create({
      data: {
        messId,
        userId,
        role: role || "MEMBER",
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(
      createSuccessResponse(newMember, "Mess member added successfully"),
      { status: 201 }
    );
  } catch (error) {
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
    const where = {};

    if (messId) {
      where.messId = messId;
    }

    const members = await prisma.messMember.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        mess: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      createSuccessResponse(members, "Mess members fetched successfully"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
