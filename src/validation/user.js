import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  bio: z.string().optional(),
  emergencyContact: z.string().optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(new Date(val).getTime()), {
      message: "Invalid date format",
    }),
  bloodGroup: z.string().optional(),
  nidNumber: z.string().optional(),
  profession: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(["admin", "member", "moderator"]).default("member"),
});

// For update, make password optional
export const updateUserSchema = createUserSchema.partial();

// For password change
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Current password is required" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

export const userIdSchema = z.object({
  id: z.string().min(1, { message: "User ID is required" }),
});

export const verifyEmailSchema = z.object({
  id: z.string().min(1, { message: "User ID is required" }),
  token: z.string().min(1, { message: "Verification token is required" }),
});

// For login
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
