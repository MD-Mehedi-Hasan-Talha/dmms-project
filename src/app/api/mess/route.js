import { NextResponse } from "next/server";
import { wrapAllModels } from "@/utils/prisma-wrapper";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/apiResponse";
import { prisma } from "@/lib/prisma";

const db = wrapAllModels(prisma);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const messes = await db.mess.findManyX({
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      transform: (data) => ({
        ...data,
        totalMembers: data.members.length,
      }),
    });

    return NextResponse.json(createSuccessResponse(messes));
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "INTERNAL_SERVER_ERROR" }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, description, adminId } = await request.json();

    if (!name) {
      return NextResponse.json(
        createErrorResponse("Mess name is required", {
          code: "VALIDATION_ERROR",
        }),
        { status: 400 }
      );
    }

    const newMess = await prisma.mess.create({
      data: {
        name,
        description,
      },
    });

    // add member in this mess as admin
    if (adminId) {
      await prisma.messMember.create({
        data: {
          messId: newMess.id,
          userId: adminId,
          role: "ADMIN",
        },
      });
    }

    return NextResponse.json(
      createSuccessResponse(newMess, "Mess created successfully"),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "INTERNAL_SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
