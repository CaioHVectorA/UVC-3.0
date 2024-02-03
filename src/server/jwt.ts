import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// @ts-ignore
const secretKey: string = process.env.SECRET_KEY;
export function generateToken(data: JSON) {
  return jwt.sign(data, secretKey, { expiresIn: "1h" });
}
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}
export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Verificação de uma senha em relação ao hash
export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
