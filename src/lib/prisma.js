// lib/prisma.js
import { PrismaClient } from "@prisma/client";

let globalForPrisma = global;

const defaultPrisma = globalForPrisma.prisma || new PrismaClient();
export const prisma = new PrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = defaultPrisma;

export default defaultPrisma;
