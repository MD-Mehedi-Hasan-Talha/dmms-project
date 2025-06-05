import bcrypt from "bcrypt";

// Hash a password
export async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Compare a password with a hash
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}
