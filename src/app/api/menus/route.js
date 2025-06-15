// app/api/menus/route.js
// Handles POST to /api/menus (Create Menu)
// Handles GET to /api/menus (Get All Menus / Filter Menus)

// Get all daily menus, with optional filtering
// app/api/menus/route.js (or your specific path)

import { NextResponse } from "next/server";
import {
  buildPrismaQuery,
  getPaginationMeta,
} from "@/utils/prismaQueryBuilder"; // Adjust path
import {
  createPaginatedResponse,
  createErrorResponse,
} from "@/utils/apiResponse"; // Adjust path

import prisma from "@/lib/prisma";

/**
 * Gets the day name in English and Bengali for a given date.
 * @param dateObject The Date object.
 * @returns An object with dayNameEn and dayNameBn.
 */
export function getLocalizedDayNames(dateObject) {
  const dayNameEn = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "UTC",
  }).format(dateObject);
  // For Bengali, ensure your server environment supports the 'bn-BD' locale.
  // If not, you might need a more robust i18n library or a fallback.
  const dayNameBn = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    timeZone: "UTC",
  }).format(dateObject);
  return { dayNameEn, dayNameBn };
}

// Create a new daily menu
export async function POST(request) {
  try {
    const body = await request.json();
    const { date, breakfast, lunch, dinner, notes } = body;

    if (!date || !breakfast || !lunch || !dinner) {
      return NextResponse.json(
        { error: "Missing required fields: date, breakfast, lunch, dinner" },
        { status: 400 }
      );
    }
    if (
      !Array.isArray(breakfast) ||
      !breakfast.every((item) => typeof item === "string") ||
      !Array.isArray(lunch) ||
      !lunch.every((item) => typeof item === "string") ||
      !Array.isArray(dinner) ||
      !dinner.every((item) => typeof item === "string")
    ) {
      return NextResponse.json(
        {
          error:
            "Breakfast, lunch, and dinner items must be arrays of strings.",
        },
        { status: 400 }
      );
    }

    const menuDate = new Date(date);
    if (isNaN(menuDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format. Please use YYYY-MM-DD." },
        { status: 400 }
      );
    }
    // Normalize to UTC start of day
    menuDate.setUTCHours(0, 0, 0, 0);

    const { dayNameEn, dayNameBn } = getLocalizedDayNames(menuDate);
    //   check for duplicate date
    const existingMenu = await prisma.dailyMenu.findFirst({
      where: { date: menuDate, deletedAt: null },
    });
    if (existingMenu) {
      return NextResponse.json(
        { error: "A menu for this date already exists." },
        { status: 409 }
      );
    }

    const newMenu = await prisma.dailyMenu.create({
      data: {
        date: menuDate,
        dayNameEn,
        dayNameBn,
        breakfast,
        lunch,
        dinner,
        notes,
        deletedAt: null,
      },
    });

    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    console.error("Error creating menu:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("date")) {
      return NextResponse.json(
        { error: "A menu for this date already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create menu", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Convert URLSearchParams to a plain object for buildPrismaQuery
    const queryParams = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    // --- 1. Handle Custom Date Logic ---
    const specificDateStr = queryParams.date; // Use already parsed queryParams
    // default start date is today
    // default end date is last day of this week
    if (!specificDateStr && !queryParams.startDate && !queryParams.endDate) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const lastDayOfWeek = new Date(today);
      lastDayOfWeek.setUTCDate(today.getUTCDate() + 6);
      lastDayOfWeek.setUTCHours(23, 59, 59, 999);
      queryParams.startDate = today.toISOString().split("T")[0];
      queryParams.endDate = lastDayOfWeek.toISOString().split("T")[0];
    }
    const startDateStr = queryParams.startDate;
    const endDateStr = queryParams.endDate;
    let customDateFilter = null; // This will be an object like { date: { gte: ..., lte: ... } }

    if (specificDateStr) {
      const specificDate = new Date(specificDateStr);
      if (isNaN(specificDate.getTime())) {
        return NextResponse.json(
          createErrorResponse(
            "Invalid specificDate format. Please use YYYY-MM-DD.",
            { code: "INVALID_DATE_FORMAT" }
          ),
          { status: 400 }
        );
      }
      const dayStart = new Date(specificDate);
      dayStart.setUTCHours(0, 0, 0, 0);
      const dayEnd = new Date(specificDate);
      dayEnd.setUTCHours(23, 59, 59, 999);
      customDateFilter = { date: { gte: dayStart, lte: dayEnd } };
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
      customDateFilter = { date: { gte: startDate, lte: endDate } };
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
      customDateFilter = { date: { gte: startDate } };
    }

    // --- 2. Build Prisma Query using the helper ---
    const queryOptions = {
      searchableFields: [
        "dayNameEn",
        "dayNameBn",
        "notes",
        "breakfast",
        "lunch",
        "dinner",
      ],
      numericFields: ["calories"],
      booleanFields: ["isSpecial"],
      exactMatchFields: ["id", "status"], // Add other fields that need exact match
      defaultSortField: "date", // Your previous default
      defaultSortOrder: "asc", // Your previous default
      defaultLimit: 10, // Or whatever you prefer
      // Exclude date-related params from generic filtering by buildPrismaQuery
      // as we're handling them manually above.
      excludedFilterKeys: [
        "search",
        "page",
        "limit",
        "sort",
        "fields",
        "date",
        "startDate",
        "endDate",
      ],
    };

    const prismaArgs = buildPrismaQuery(queryParams, queryOptions);

    // --- 3. Combine Where Clauses ---
    // Start with the where clause from buildPrismaQuery (which might have AND for search/filters)
    // And add our static and custom date filters.

    // Initialize AND array if it doesn't exist
    if (!prismaArgs.where.AND) {
      prismaArgs.where.AND = [];
    }

    // Add static filter for non-deleted records
    // prismaArgs.where.AND.push({ deletedAt: null });

    // Add custom date filter if it was created
    if (customDateFilter) {
      prismaArgs.where.AND.push(customDateFilter);
    }

    // If after all this, AND is empty, remove it to prevent Prisma error.
    // Though buildPrismaQuery usually creates some structure if queryParams is not empty.
    // And we always add {deletedAt: null}.
    if (prismaArgs.where.AND && prismaArgs.where.AND.length === 0) {
      delete prismaArgs.where.AND; // or delete prismaArgs.where if it becomes empty
    }

    // --- 4. Fetch Data and Count ---
    const totalItems = await prisma.dailyMenu.count({
      where: prismaArgs.where,
    });

    const items = await prisma.dailyMenu.findMany({
      where: prismaArgs.where,
      orderBy: prismaArgs.orderBy,
      skip: prismaArgs.skip,
      take: prismaArgs.take,
      select: prismaArgs.select,
    });

    // --- 5. Get Pagination Metadata ---
    const paginationMeta = getPaginationMeta(
      totalItems,
      queryParams,
      queryOptions.defaultLimit
    );

    // Optional: Check if requested page is out of bounds
    if (
      queryParams.page &&
      parseInt(queryParams.page) > paginationMeta.totalPages &&
      paginationMeta.totalItems > 0
    ) {
      return NextResponse.json(
        createErrorResponse("Page not found.", { code: "PAGE_NOT_FOUND" }),
        { status: 404 }
      );
    }

    // --- 6. Return Standardized Paginated Response ---
    return NextResponse.json(
      createPaginatedResponse(
        items,
        paginationMeta,
        "Daily menus retrieved successfully."
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching menus:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch menus", {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
