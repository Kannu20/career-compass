// src/utils/hash.ts
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash plain password
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
  if (!plainPassword) {
    throw new Error("Password is required for hashing");
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashed = await bcrypt.hash(plainPassword, salt);
  return hashed;
};

/**
 * Compare plain password with stored hash
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  if (!plainPassword || !hashedPassword) {
    return false;
  }
  return bcrypt.compare(plainPassword, hashedPassword);
};
