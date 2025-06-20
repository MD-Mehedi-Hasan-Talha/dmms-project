import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to calculate item counts
function calculateItemCounts(dailyMenus) {
  const itemCounts = {};
  dailyMenus.forEach((menu) => {
    menu.breakfast.forEach((item) => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
    menu.lunch.forEach((item) => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
    menu.dinner.forEach((item) => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
  });
  return Object.entries(itemCounts)
    .map(([item, count]) => ({ item, count }))
    .sort((a, b) => b.count - a.count);
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const queryMonth = url.searchParams.get("month");
    const queryYear = url.searchParams.get("year");
    const queryLimit = url.searchParams.get("limit");

    const limit = queryLimit ? parseInt(queryLimit, 10) : 5; // Default to 5 if no limit is provided

    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize to start of day

    let monthlyAnalytics = [];
    let yearlyAnalytics = [];
    let allTimeAnalytics = [];

    // --- Determine the target month and year for analytics ---
    let targetYear = now.getFullYear();
    let targetMonth = now.getMonth(); // 0-indexed

    if (queryYear) {
      const parsedYear = parseInt(queryYear, 10);
      if (!isNaN(parsedYear)) {
        targetYear = parsedYear;
      } else {
        return NextResponse.json(
          { message: "Invalid year provided." },
          { status: 400 }
        );
      }
    }

    if (queryMonth) {
      const parsedMonth = parseInt(queryMonth, 10) - 1; // Convert to 0-indexed
      if (!isNaN(parsedMonth) && parsedMonth >= 0 && parsedMonth <= 11) {
        targetMonth = parsedMonth;
      } else {
        return NextResponse.json(
          { message: "Invalid month provided." },
          { status: 400 }
        );
      }
    }

    // --- Fetch data for the determined month ---
    const startOfMonth = new Date(targetYear, targetMonth, 1);
    const endOfMonth = new Date(targetYear, targetMonth + 1, 0);

    const monthlyMenus = await prisma.dailyMenu.findMany({
      where: {
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        deletedAt: null,
      },
      select: {
        breakfast: true,
        lunch: true,
        dinner: true,
      },
    });
    monthlyAnalytics = calculateItemCounts(monthlyMenus).slice(0, limit);

    // --- Fetch data for the determined year ---
    const startOfYear = new Date(targetYear, 0, 1);
    const endOfYear = new Date(targetYear, 11, 31);

    const yearlyMenus = await prisma.dailyMenu.findMany({
      where: {
        date: {
          gte: startOfYear,
          lte: endOfYear,
        },
        deletedAt: null,
      },
      select: {
        breakfast: true,
        lunch: true,
        dinner: true,
      },
    });
    yearlyAnalytics = calculateItemCounts(yearlyMenus).slice(0, limit);

    // --- Fetch data for all time ---
    const allTimeMenus = await prisma.dailyMenu.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        breakfast: true,
        lunch: true,
        dinner: true,
      },
    });
    allTimeAnalytics = calculateItemCounts(allTimeMenus).slice(0, limit);

    return NextResponse.json(
      {
        monthly: monthlyAnalytics,
        yearly: yearlyAnalytics,
        allTime: allTimeAnalytics,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching menu item analytics:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
