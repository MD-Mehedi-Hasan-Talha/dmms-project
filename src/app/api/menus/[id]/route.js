// app/api/menus/route.ts
// Handles POST to /api/menus (Create Menu)
// Handles GET to /api/menus (Get All Menus / Filter Menus)

import { NextRequest, NextResponse } from "next/server";
import { getLocalizedDayNames } from "../route";

import prisma from "@/lib/prisma";

// app/api/menus/[id]/route.ts
// Handles GET to /api/menus/[id] (Get Menu by ID)
// Handles PUT to /api/menus/[id] (Update Menu by ID)
// Handles DELETE to /api/menus/[id] (Delete Menu by ID)

// Note: To use the same prisma instance, you'd typically put `const prisma = new PrismaClient();`
// in a separate file (e.g., lib/prisma.ts) and import it.
// For this example, I'm re-declaring it for clarity, but in a real app, share the instance.
// const prismaIdRoute = new PrismaClient(); // Assuming prisma is already initialized if this were a separate file.

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const menu = await prisma.dailyMenu.findUnique({
      where: { id, deletedAt: null },
    });

    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    console.error(`Error fetching menu with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch menu", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { date, breakfast, lunch, dinner, notes, messId, monthId } = body;

    const updateData = {};

    if (date) {
      const menuDate = new Date(date);
      if (isNaN(menuDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid date format if provided." },
          { status: 400 }
        );
      }
      menuDate.setUTCHours(0, 0, 0, 0);
      updateData.date = menuDate;
      // If date is updated, also update day names
      const { dayNameEn, dayNameBn } = getLocalizedDayNames(menuDate);
      updateData.dayNameEn = dayNameEn;
      updateData.dayNameBn = dayNameBn;
    }

    if (breakfast) {
      if (
        !Array.isArray(breakfast) ||
        !breakfast.every((item) => typeof item === "string")
      ) {
        return NextResponse.json(
          { error: "Breakfast items must be an array of strings if provided." },
          { status: 400 }
        );
      }
      updateData.breakfast = breakfast;
    }
    if (lunch) {
      if (
        !Array.isArray(lunch) ||
        !lunch.every((item) => typeof item === "string")
      ) {
        return NextResponse.json(
          { error: "Lunch items must be an array of strings if provided." },
          { status: 400 }
        );
      }
      updateData.lunch = lunch;
    }
    if (dinner) {
      if (
        !Array.isArray(dinner) ||
        !dinner.every((item) => typeof item === "string")
      ) {
        return NextResponse.json(
          { error: "Dinner items must be an array of strings if provided." },
          { status: 400 }
        );
      }
      updateData.dinner = dinner;
    }
    if (notes !== undefined) {
      updateData.notes = notes;
    }
    if (messId) {
      updateData.messId = messId;
    }
    if (monthId) {
      updateData.monthId = monthId;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No fields provided for update." },
        { status: 400 }
      );
    }

    const updatedMenu = await prisma.dailyMenu.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedMenu, { status: 200 });
  } catch (error) {
    console.error(`Error updating menu with ID ${params.id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }
    if (error.code === "P2002" && error.meta?.target?.includes("date")) {
      return NextResponse.json(
        { error: "A menu for the new date already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update menu", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.dailyMenu.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Menu deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting menu with ID ${params.id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete menu", details: error.message },
      { status: 500 }
    );
  }
}
