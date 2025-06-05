import prisma from "@/lib/prisma";

// Get a single user by ID
export async function GET(request, { params }) {
  try {
    const { email } = await params;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch user." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
