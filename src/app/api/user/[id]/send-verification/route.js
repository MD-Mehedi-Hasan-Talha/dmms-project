import {
  generateVerificationToken,
  sendVerificationEmail,
} from "@/lib/emailUtils";
import prisma from "@/lib/prisma";
import { userIdSchema } from "@/validation/user";

// Send verification email to a user by ID
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    // Validate user ID
    const validation = userIdSchema.safeParse({ id });
    if (!validation.success) {
      return new Response(
        JSON.stringify({ errors: validation.error.format() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if user's email is already verified
    if (user.emailVerified) {
      return new Response(
        JSON.stringify({ message: "Email is already verified." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Generate verification token and set expiration (24 hours from now)
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with verification data
    await prisma.user.update({
      where: { id },
      data: {
        verificationToken,
        verificationExpires,
      },
    });

    // Send verification email
    try {
      await sendVerificationEmail(user, verificationToken);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      return new Response(
        JSON.stringify({ error: "Failed to send verification email." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Verification email sent successfully.",
        email: user.email,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Send verification error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process verification request." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
