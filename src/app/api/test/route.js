// import prisma from "@/lib/prisma";

import prisma from "@/lib/prisma";
import { wrapAllModels } from "@/utils/prisma-wrapper";
import { NextResponse } from "next/server";
import { date } from "zod";

const db = wrapAllModels(prisma);
export async function GET() {
  try {
    // // Test findX
    // const singleUser = await db.user.findX({ where: { email: 'test@example.com' } });
    // console.log('Single User:', singleUser);

    // // Test findById
    // if (singleUser) {
    //   const userById = await db.user.findById(singleUser.id);
    //   console.log('User by ID:', userById);
    // }

    // // Test softDeleteX (assuming a 'deletedAt' field exists in your schema for 'Test' model)
    // // await db.test.softDeleteX({ where: { id: 'some_test_id' } });
    // // console.log('Soft deleted a test entry.');

    // // Test countX
    // const userCount = await db.user.countX({});
    // console.log('User Count:', userCount);

    // Test findManyX with pagination
    const paginatedUsers = await db.dailyMenu.findManyX({
      paginate: { page: 1, pageSize: 2 },
    });
    // console.log('Paginated Users:', paginatedUsers);

    // // Test findManyX with exclude
    const usersWithoutPassword = await db.user.findManyX({
      exclude: ["password", "verificationToken", "verificationExpires"],
    });
    // console.log('Users without password:', usersWithoutPassword);

    // // Test findManyX with transform
    const transformedUsers = await db.user.findManyX({
      transform: (user) => ({
        ...user,
        transformedName: user.name.toUpperCase(),
      }),
    });
    console.log("Transformed Users:", transformedUsers);

    return NextResponse.json({
      message: "PrismaWrapper tests executed. Check console for logs.",
      data: paginatedUsers,
    });
  } catch (error) {
    console.error("Error during PrismaWrapper tests:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, value } = body;

    const newTest = await prisma.test.create({
      data: { name, value },
    });

    return new Response(JSON.stringify(newTest), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create test." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
