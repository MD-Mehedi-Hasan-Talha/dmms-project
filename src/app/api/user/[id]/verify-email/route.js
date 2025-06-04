import prisma from "@/lib/prisma";
import { verifyEmailSchema, userIdSchema } from "@/validation/user";

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

    const body = await request.json();

    // Validate request body (token)
    const validation = verifyEmailSchema.safeParse({
      id,
      token: body.token,
    });

    if (!validation.success) {
      return new Response(
        JSON.stringify({ errors: validation.error.format() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { token } = body;

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find user with the verification token and matching ID
    const user = await prisma.user.findFirst({
      where: {
        id: id,
        verificationToken: token,
        verificationExpires: {
          gt: new Date(), // Token must not be expired
        },
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          error: "Invalid or expired verification token for this user.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Update user to mark email as verified and clear verification data
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifiedAt: new Date(),
        verificationToken: null,
        verificationExpires: null,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Email verified successfully.",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          emailVerifiedAt: updatedUser.emailVerifiedAt,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return new Response(JSON.stringify({ error: "Failed to verify email." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
