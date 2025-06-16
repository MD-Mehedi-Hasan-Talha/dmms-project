// app/api/menus/route.js
// Handles POST to /api/menus (Create Menu)
// Handles GET to /api/menus (Get All Menus / Filter Menus)

// Get all daily menus, with optional filtering
// app/api/menus/route.js (or your specific path)

import { NextResponse } from "next/server";
import {
  createErrorResponse,
  createPaginatedResponse,
} from "@/utils/apiResponse"; // Assuming you have these response helpers
import { db } from "@/utils/prisma-wrapper";
import { checkRequiredFields } from "@/utils/errorBuilder";

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
    const { date, breakfast, lunch, dinner, notes, messId, monthId } = body;

    const requiredFields = [
      "date",
      "breakfast",
      "lunch",
      "dinner",
      "messId",
      "monthId",
    ];
    const fieldsCheck = checkRequiredFields(body, requiredFields);
    if (fieldsCheck) {
      console.log(fieldsCheck);

      return NextResponse.json(
        createErrorResponse(fieldsCheck.error, { code: "VALIDATION_ERROR" }),
        { status: fieldsCheck.statusCode }
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
        messId,
        monthId,
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

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get("page")) || 1;
//     const limit = parseInt(searchParams.get("limit")) || 10;
//     const skip = (page - 1) * limit;
//     const sortBy = searchParams.get("sortBy") || "date";
//     const sortOrder = searchParams.get("sortOrder") || "desc";
//     const search = searchParams.get("search") || "";
//     const messId = searchParams.get("messId");
//     const monthId = searchParams.get("monthId");

//     const where = { deletedAt: null };

//     // Date filtering
//     const specificDateStr = searchParams.get("date");
//     const startDateStr = searchParams.get("startDate");
//     const endDateStr = searchParams.get("endDate");

//     if (specificDateStr) {
//       const specificDate = new Date(specificDateStr);
//       if (isNaN(specificDate.getTime())) {
//         return NextResponse.json(
//           createErrorResponse("Invalid date format. Please use YYYY-MM-DD.", { code: "INVALID_DATE_FORMAT" }),
//           { status: 400 }
//         );
//       }
//       const dayStart = new Date(specificDate);
//       dayStart.setUTCHours(0, 0, 0, 0);
//       const dayEnd = new Date(specificDate);
//       dayEnd.setUTCHours(23, 59, 59, 999);
//       where.date = { gte: dayStart, lte: dayEnd };
//     } else if (startDateStr && endDateStr) {
//       const startDate = new Date(startDateStr);
//       const endDate = new Date(endDateStr);
//       if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//         return NextResponse.json(
//           createErrorResponse("Invalid startDate or endDate format. Please use YYYY-MM-DD.", { code: "INVALID_DATE_FORMAT" }),
//           { status: 400 }
//         );
//       }
//       startDate.setUTCHours(0, 0, 0, 0);
//       endDate.setUTCHours(23, 59, 59, 999);
//       where.date = { gte: startDate, lte: endDate };
//     } else if (startDateStr) {
//       const startDate = new Date(startDateStr);
//       if (isNaN(startDate.getTime())) {
//         return NextResponse.json(
//           createErrorResponse("Invalid startDate format. Please use YYYY-MM-DD.", { code: "INVALID_DATE_FORMAT" }),
//           { status: 400 }
//         );
//       }
//       startDate.setUTCHours(0, 0, 0, 0);
//       where.date = { gte: startDate };
//     } else if (!specificDateStr && !startDateStr && !endDateStr) {
//       // Default to current week if no date filters are provided
//       const today = new Date();
//       today.setUTCHours(0, 0, 0, 0);
//       const lastDayOfWeek = new Date(today);
//       lastDayOfWeek.setUTCDate(today.getUTCDate() + 6);
//       lastDayOfWeek.setUTCHours(23, 59, 59, 999);
//       where.date = { gte: today, lte: lastDayOfWeek };
//     }

//     // Add messId and monthId to where clause
//     if (messId) {
//       where.messId = messId;
//     }
//     if (monthId) {
//       where.monthId = monthId;
//     }

//     // Search functionality
//     if (search) {
//       where.OR = [
//         { dayNameEn: { contains: search, mode: "insensitive" } },
//         { dayNameBn: { contains: search, mode: "insensitive" } },
//         { notes: { contains: search, mode: "insensitive" } },
//         { breakfast: { contains: search, mode: "insensitive" } },
//         { lunch: { contains: search, mode: "insensitive" } },
//         { dinner: { contains: search, mode: "insensitive" } },
//       ];
//     }

//     const menus = await PrismaWrapper.findMany("dailyMenu", {
//       where,
//       skip,
//       take: limit,
//       orderBy: { [sortBy]: sortOrder },
//     });

//     const total = await PrismaWrapper.count("dailyMenu", { where });

//     const pagination = {
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit),
//     };

//     return NextResponse.json(
//       createPaginatedResponse(menus, total, pagination),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching menus:", error);
//     return NextResponse.json(
//       createErrorResponse("Failed to fetch menus", { details: error.message }),
//       { status: 500 }
//     );
//   }

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Convert URLSearchParams to a plain object for easier access
    const queryParams = Object.fromEntries(searchParams.entries());

    // --- 1. Build the 'where' clause for Prisma ---
    const where = {
      // The wrapper handles soft deletes by default (deletedAt: null)
    };

    // a. Handle Custom Date Logic (this logic is specific and remains)
    const { date, startDate, endDate } = queryParams;

    if (date) {
      const specificDate = new Date(date);
      if (isNaN(specificDate.getTime())) {
        return NextResponse.json(
          createErrorResponse("Invalid date format. Please use YYYY-MM-DD.", {
            code: "INVALID_DATE_FORMAT",
          }),
          { status: 400 }
        );
      }
      // Set time to the beginning and end of the specified day
      where.date = {
        gte: new Date(specificDate.setUTCHours(0, 0, 0, 0)),
        lte: new Date(specificDate.setUTCHours(23, 59, 59, 999)),
      };
    } else if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if ((start && isNaN(start.getTime())) || (end && isNaN(end.getTime()))) {
        return NextResponse.json(
          createErrorResponse(
            "Invalid startDate or endDate format. Please use YYYY-MM-DD.",
            { code: "INVALID_DATE_FORMAT" }
          ),
          { status: 400 }
        );
      }
      where.date = {};
      if (start) where.date.gte = new Date(start.setUTCHours(0, 0, 0, 0));
      if (end) where.date.lte = new Date(end.setUTCHours(23, 59, 59, 999));
    } else {
      // Default to this week if no date params are provided
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const lastDayOfWeek = new Date(today);
      lastDayOfWeek.setUTCDate(today.getUTCDate() + 6);
      lastDayOfWeek.setUTCHours(23, 59, 59, 999);
      where.date = { gte: today, lte: lastDayOfWeek };
    }

    // b. Handle other exact match filters
    if (queryParams.messId) {
      where.messId = queryParams.messId;
    }
    if (queryParams.monthId) {
      where.monthId = queryParams.monthId;
    }

    // c. Handle full-text search
    if (queryParams.search) {
      // Note: Prisma's `contains` works on String fields. Searching within String[]
      // like `breakfast` would require `has` for exact matches, which might not be
      // the desired behavior for a general search. This search focuses on text fields.
      where.OR = [
        { dayNameEn: { contains: queryParams.search, mode: "insensitive" } },
        { dayNameBn: { contains: queryParams.search, mode: "insensitive" } },
        { notes: { contains: queryParams.search, mode: "insensitive" } },
      ];
    }

    // --- 2. Prepare other query options ---

    // a. Sorting
    const [sortField, sortOrder] = (queryParams.sort || "date,asc").split(",");
    const orderBy = { [sortField]: sortOrder || "asc" };

    // b. Pagination
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const paginate = { page, pageSize: limit };

    // c. Field Selection (optional)
    const fields = queryParams.fields?.split(",");
    const select = fields
      ? fields.reduce((obj, field) => ({ ...obj, [field.trim()]: true }), {})
      : null; // null selects all fields by default

    // --- 3. Fetch Data using the PrismaWrapper ---
    // The `findManyX` method handles counting, pagination, and soft-deletes in one call.
    const { data: items, ...paginationMeta } = await db.dailyMenu.findManyX({
      where,
      orderBy,
      paginate,
      select,
    });

    // Optional: Check if requested page is out of bounds
    if (page > paginationMeta.totalPages && paginationMeta.total > 0) {
      return NextResponse.json(
        createErrorResponse("Page not found.", { code: "PAGE_NOT_FOUND" }),
        { status: 404 }
      );
    }

    // --- 4. Return Standardized Paginated Response ---
    return NextResponse.json(
      createPaginatedResponse(
        items,
        paginationMeta, // The wrapper provides a compatible metadata object
        "Daily menus retrieved successfully."
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching daily menus:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch daily menus", {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
