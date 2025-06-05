import { comparePassword, hashPassword } from "@/lib/passwordUtils";
import prisma from "@/lib/prisma";
import { changePasswordSchema, userIdSchema } from "@/validation/user";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    // Validate user ID
    const idValidation = userIdSchema.safeParse({ id });
    if (!idValidation.success) {
      return new Response(
        JSON.stringify({ errors: idValidation.error.format() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();

    // Validate request body
    const validation = changePasswordSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ errors: validation.error.format() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { currentPassword, newPassword } = validation.data;

    // Verify current password
    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Current password is incorrect." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return new Response(
      JSON.stringify({ message: "Password changed successfully." }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Password change error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to change password." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
