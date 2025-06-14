import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  buildPrismaQuery,
  getPaginationMeta,
} from "@/utils/prismaQueryBuilder";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    const excludedFilterKeys = [
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "status",
      "type",
      "userId",
      "isAnonymous",
    ];
    const searchableFields = [
      "subject",
      "message",
      "adminNotes",
      "isAnonymous",
    ];

    const { where, orderBy, take, skip } = buildPrismaQuery(
      query,
      excludedFilterKeys,
      searchableFields
    );

    if (query.status) {
      where.status = query.status;
    }
    if (query.type) {
      where.type = query.type;
    }
    if (query.userId) {
      where.userId = query.userId;
    }
    if (query.isAnonymous) {
      where.isAnonymous = query.isAnonymous === "true";
    }

    const feedbacks = await prisma.feedback.findMany({
      where,
      orderBy,
      take,
      skip,
    });

    // --- 4. Fetch Data and Count ---
    const totalItems = await prisma.feedback.count({
      where,
    });

    const totalFeedbacks = await prisma.feedback.count({ where });
    // --- 5. Get Pagination Metadata ---
    const paginationMeta = getPaginationMeta(totalItems, query);
    return NextResponse.json(
      {
        data: feedbacks,
        total: totalFeedbacks,
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 10,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { message: "Failed to fetch feedbacks", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, isAnonymous, subject, message, type } = body;

    if (!subject || !message || !type || typeof isAnonymous !== "boolean") {
      return NextResponse.json(
        { message: "Subject, message, and type are required" },
        { status: 400 }
      );
    }

    const newFeedback = await prisma.feedback.create({
      data: {
        userId: isAnonymous ? null : userId,
        isAnonymous: isAnonymous,
        subject,
        message,
        type,
      },
    });

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { message: "Failed to create feedback", error: error.message },
      { status: 500 }
    );
  }
}
