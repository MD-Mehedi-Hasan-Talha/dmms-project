import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const allTests = await prisma.test.findMany();
    return new Response(JSON.stringify(allTests), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch tests." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
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
