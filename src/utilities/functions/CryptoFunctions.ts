// @ts-nocheck
// Process.env no working, so temporary key is:
import crypto from "crypto-js";
const tempKey = "a1738432-8176-431e-b296-f787bcf1c889";

export function encryptData(data: any) {
  const encrypted = crypto.AES.encrypt(
    JSON.stringify(data),
    tempKey
  ).toString();
  return encrypted;
}

export function decryptData(encryptedData: any) {
  const bytes = crypto.AES.decrypt(encryptedData, tempKey);
  const decrypted = JSON.parse(bytes.toString(crypto.enc.Utf8));
  return decrypted;
}
