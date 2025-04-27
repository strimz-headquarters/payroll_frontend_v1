import { AES, enc, mode, pad, lib } from "crypto-js";

/**
 * Generates a new random 256-bit key as a WordArray.
 *
 * @returns {WordArray} A 256-bit WordArray.
 */
export const generateSessionKey = () => {
  return lib.WordArray.random(256 / 8); // 256-bit key
};

/**
 * Initializes a new user session by generating a new random 256-bit key as a
 * WordArray and storing it in the client's session storage. This key is used to
 * encrypt and decrypt sensitive data for the user.
 */
export const initUserSession = () => {
  const sessionKey = generateSessionKey();
  sessionStorage.setItem("sessionKey", sessionKey.toString(enc.Hex));
};

/**
 * Retrieves the user's current session key from session storage.
 *
 * @throws {Error} If there is no active user session.
 * @returns {WordArray} The session key as a 256-bit WordArray.
 */
const getSessionKey = () => {
  const keyHex = sessionStorage.getItem("sessionKey");
  if (!keyHex) throw new Error("No active session");
  return enc.Hex.parse(keyHex);
};

/**
 * Encrypts given data using the active user's session key.
 *
 * @param {object} data - The data to encrypt.
 * @returns {string} The encrypted data as a string, formatted as "<ivHex>:<encryptedData>".
 * @throws {Error} If there is no active user session.
 */
export const encryptData = (data: object): string => {
  const iv = lib.WordArray.random(128 / 8);
  const encrypted = AES.encrypt(JSON.stringify(data), getSessionKey(), {
    iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return iv.toString(enc.Hex) + ":" + encrypted.toString();
};

/**
 * Decrypts given ciphertext using the active user's session key.
 *
 * @param {string} ciphertext - The ciphertext to decrypt, formatted as "<ivHex>:<encryptedData>".
 * @returns {T | null} The decrypted data as a generic type T, or null if decryption failed.
 * @throws {Error} If there is no active user session.
 */
export const decryptData = <T>(ciphertext: string): T | null => {
  try {
    const [ivHex, encryptedData] = ciphertext.split(":");
    const decrypted = AES.decrypt(encryptedData, getSessionKey(), {
      iv: enc.Hex.parse(ivHex),
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });
    return JSON.parse(decrypted.toString(enc.Utf8)) as T;
  } catch (error) {
    console.error("Decryption failed:", error);
    clearSession();
    return null;
  }
};

/**
 * Clears all session data securely. This is called when the user logs out or if
 * a decryption error occurs.
 */
export const clearSession = () => {
  sessionStorage.removeItem("sessionKey");
  sessionStorage.removeItem("strimzUD");
};
