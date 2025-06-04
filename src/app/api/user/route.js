import { hashPassword } from "@/lib/passwordUtils";
import prisma from "@/lib/prisma";
import { createUserSchema } from "@/validation/user";

// Get all users
export async function GET(request) {
  try {
    const users = await prisma.user.findMany({
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
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch users." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Create a new user
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = createUserSchema.safeParse(body);
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

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(userData.password);

    // Create user with hashed password
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;

    return new Response(JSON.stringify(userWithoutPassword), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("User creation error:", error);
    return new Response(JSON.stringify({ error: "Failed to create user." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
