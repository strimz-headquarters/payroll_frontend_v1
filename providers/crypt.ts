import { AES, enc, mode, pad, lib } from "crypto-js";

export const generateSessionKey = () => {
  return lib.WordArray.random(256 / 8); // 256-bit key
};

export const initUserSession = () => {
  const sessionKey = generateSessionKey();
  sessionStorage.setItem("sessionKey", sessionKey.toString(enc.Hex));
};

const getSessionKey = () => {
  const keyHex = sessionStorage.getItem("sessionKey");
  if (!keyHex) throw new Error("No active session");
  return enc.Hex.parse(keyHex);
};

export const encryptData = (data: object): string => {
  const iv = lib.WordArray.random(128 / 8);
  const encrypted = AES.encrypt(JSON.stringify(data), getSessionKey(), {
    iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return iv.toString(enc.Hex) + ":" + encrypted.toString();
};

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

export const clearSession = () => {
  sessionStorage.removeItem("sessionKey");
  sessionStorage.removeItem("strimzUD");
};
