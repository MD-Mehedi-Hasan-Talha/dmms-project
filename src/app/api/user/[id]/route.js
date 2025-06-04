import { hashPassword } from "@/lib/passwordUtils";
import prisma from "@/lib/prisma";
import { updateUserSchema, userIdSchema } from "@/validation/user";

// Get a single user by ID
export async function GET(request, { params }) {
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

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        bio: true,
        emergencyContact: true,
        dateOfBirth: true,
        bloodGroup: true,
        nidNumber: true,
        profession: true,
        address: true,
        activeStatus: true,
        joinDate: true,
        role: true,
        emailVerifiedAt: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password and verification details
      },
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

// Update a user
export async function PATCH(request, { params }) {
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
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();

    // Validate request body
    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ errors: validation.error.format() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Process date of birth if provided
    const userData = { ...validation.data };
    if (userData.dateOfBirth) {
      userData.dateOfBirth = new Date(userData.dateOfBirth);
    }

    // Check if email is being updated and is already in use
    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (emailExists) {
        return new Response(
          JSON.stringify({ error: "Email already in use." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Hash password if it's being updated
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return new Response(JSON.stringify(userWithoutPassword), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update user." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Delete a user
export async function DELETE(request, { params }) {
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

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ message: "User deleted successfully." }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete user." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
