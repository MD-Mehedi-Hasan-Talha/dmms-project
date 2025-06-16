import prisma from "@/lib/prisma";
import { db } from "@/utils/prisma-wrapper";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const mealEntry = await db.mealEntry.findX({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    if (!mealEntry) {
      return NextResponse.json(
        { error: "Meal entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mealEntry);
  } catch (error) {
    console.error("Error fetching meal entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch meal entry" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const updatedMealEntry = await prisma.mealEntry.update({
      where: { id },
      data: body,
    });

    if (!updatedMealEntry) {
      return NextResponse.json(
        { error: "Meal entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMealEntry);
  } catch (error) {
    console.error("Error updating meal entry:", error);
    return NextResponse.json(
      { error: "Failed to update meal entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Assuming soft delete is implemented in PrismaWrapper for MealEntry
    await db.mealEntry.softDeleteX({ where: { id } });

    return NextResponse.json(
      { message: "Meal entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting meal entry:", error);
    return NextResponse.json(
      { error: "Failed to delete meal entry" },
      { status: 500 }
    );
  }
}
