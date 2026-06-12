import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: number, role: string): string {
  const token = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );
  return token;
}
