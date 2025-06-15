// src/lib/auth.js

import jwt from "jsonwebtoken";

export function verifyToken(token) {
  // Implement your token verification logic here
  // This is a placeholder, replace with actual JWT verification
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
