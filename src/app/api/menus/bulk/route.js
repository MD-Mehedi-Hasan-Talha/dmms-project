import prisma from "@/lib/prisma";
import { checkRequiredFields } from "@/utils/errorBuilder";
import { NextResponse } from "next/server";

// Helper function to get localized day names
function getLocalizedDayNames(date) {
  const dayNameEn = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const dayNameBn = new Date(date).toLocaleDateString("bn-BD", {
    weekday: "long",
  });
  return { dayNameEn, dayNameBn };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { startDate, endDate, messId, monthId } = body;

    const requiredFields = ["startDate", "endDate", "messId", "monthId"];
    const fieldsCheck = checkRequiredFields(body, requiredFields);
    if (fieldsCheck) {
      return NextResponse.json(
        createErrorResponse(fieldsCheck.error, { code: "VALIDATION_ERROR" }),
        { status: fieldsCheck.statusCode }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0, 0);

    if (start > end) {
      return NextResponse.json(
        { message: "startDate cannot be after endDate." },
        { status: 400 }
      );
    }

    const createdMenus = [];
    const errors = [];

    let currentDate = new Date(start);
    while (currentDate <= end) {
      try {
        const menuDate = new Date(currentDate);
        menuDate.setUTCHours(0, 0, 0, 0);

        const { dayNameEn, dayNameBn } = getLocalizedDayNames(menuDate);

        // Calculate date for previous week
        const prevWeekDate = new Date(menuDate);
        prevWeekDate.setDate(menuDate.getDate() - 7);

        // Find previous week's menu pattern
        const prevWeekMenu = await prisma.dailyMenu.findFirst({
          where: {
            date: prevWeekDate,
            deletedAt: null,
          },
          select: {
            breakfast: true,
            lunch: true,
            dinner: true,
          },
        });

        let breakfast = [];
        let lunch = [];
        let dinner = [];

        if (prevWeekMenu) {
          breakfast = prevWeekMenu.breakfast;
          lunch = prevWeekMenu.lunch;
          dinner = prevWeekMenu.dinner;
        }

        // Check if a menu for this date already exists (soft-deleted or active)
        const existingMenu = await prisma.dailyMenu.findFirst({
          where: {
            date: menuDate,
            deletedAt: null, // Check for active menu
          },
        });

        if (existingMenu) {
          // If an active menu exists, update it
          const updatedMenu = await prisma.dailyMenu.update({
            where: {
              id: existingMenu.id,
            },
            data: {
              breakfast,
              lunch,
              dinner,
              updatedAt: new Date(),
            },
          });
          createdMenus.push(updatedMenu);
        } else {
          // Check for a soft-deleted menu for the same date
          const softDeletedMenu = await prisma.dailyMenu.findFirst({
            where: {
              date: menuDate,
              deletedAt: { not: null }, // Check for soft-deleted menu
            },
          });

          if (softDeletedMenu) {
            // Restore the soft-deleted menu
            const restoredMenu = await prisma.dailyMenu.update({
              where: {
                id: softDeletedMenu.id,
              },
              data: {
                breakfast,
                lunch,
                dinner,
                deletedAt: null, // Restore it
                updatedAt: new Date(),
              },
            });
            createdMenus.push(restoredMenu);
          } else {
            // Create a new menu
            const newMenu = await prisma.dailyMenu.create({
              data: {
                date: menuDate,
                dayNameEn,
                dayNameBn,
                breakfast,
                lunch,
                dinner,
                notes: null,
                deletedAt: null, // Ensure it's not marked as deleted
                monthId,
                messId,
              },
            });
            createdMenus.push(newMenu);
          }
        }
      } catch (itemError) {
        errors.push({
          date: currentDate.toISOString().split("T")[0],
          message: itemError.message,
        });
      }
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          message: "Some menus could not be created/updated.",
          created: createdMenus,
          errors: errors,
        },
        { status: 207 }
      ); // 207 Multi-Status
    } else {
      return NextResponse.json(
        {
          message: "All menus processed successfully.",
          created: createdMenus,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error during bulk menu creation:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
