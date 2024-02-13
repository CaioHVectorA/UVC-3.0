import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const secretKey = process.env.SECRET_KEY || "w";
export function generateToken(data: JSON | string) {
  return jwt.sign(data, secretKey);
}
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log({token, error})
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
