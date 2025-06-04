import prisma from "@/lib/prisma";
import { loginSchema } from "@/validation/user";
import { comparePassword } from "@/lib/passwordUtils";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ errors: validation.error.format() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { email, password } = validation.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return new Response(
      JSON.stringify({
        message: "Login successful.",
        user: userWithoutPassword,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Failed to login." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
