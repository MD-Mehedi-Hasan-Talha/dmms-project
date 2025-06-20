import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all active daily menus (where deletedAt is null)
    const menus = await prisma.dailyMenu.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        breakfast: true,
        lunch: true,
        dinner: true,
      },
    });

    const allBreakfastItems = new Set();
    const allLunchItems = new Set();
    const allDinnerItems = new Set();

    menus.forEach((menu) => {
      menu.breakfast.forEach((item) => allBreakfastItems.add(item));
      menu.lunch.forEach((item) => allLunchItems.add(item));
      menu.dinner.forEach((item) => allDinnerItems.add(item));
    });

    const uniqueBreakfastItems = Array.from(allBreakfastItems).sort();
    const uniqueLunchItems = Array.from(allLunchItems).sort();
    const uniqueDinnerItems = Array.from(allDinnerItems).sort();

    return NextResponse.json(
      {
        breakfast: uniqueBreakfastItems,
        lunch: uniqueLunchItems,
        dinner: uniqueDinnerItems,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching all dish items:", error);
    return NextResponse.json(
      { error: "Failed to fetch dish items", details: error.message },
      { status: 500 }
    );
  }
}
