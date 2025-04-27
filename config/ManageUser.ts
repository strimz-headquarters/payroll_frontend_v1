import { StrimzUD } from "@/types/auth";
import { encryptData, decryptData, clearSession } from "../providers/crypt";

// Session configuration
const USER_KEY = "strimzUD";
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const EXPIRATION_BUFFER = 5000; // 5 seconds

export const userManager = {
  /**
   * Sets user data with expiration time
   * @param user User data object
   * @param expirationHours Session duration in hours
   */
  setUser: (user: object, expirationHours: number): void => {
    const expirationTime = Date.now() + expirationHours * 60 * 60 * 1000;
    const userWithExpiration: StrimzUD = {
      ...user,
      expiration: expirationTime,
    };

    try {
      const encryptedData = encryptData(userWithExpiration);
      sessionStorage.setItem(USER_KEY, encryptedData);
    } catch (error) {
      console.error("Failed to encrypt user data:", error);
      clearSession();
    }
  },

  /**
   * Retrieves and validates decrypted user data
   * @returns Decrypted user data or null
   */
  getUser: (): Partial<StrimzUD> | null => {
    try {
      const encryptedData = sessionStorage.getItem(USER_KEY);
      if (!encryptedData) return null;

      const userData = decryptData<StrimzUD>(encryptedData);
      if (!userData || Date.now() > userData.expiration - EXPIRATION_BUFFER) {
        clearSession();
        return null;
      }

      return userData;
    } catch (error) {
      console.error("Failed to decrypt user data:", error);
      clearSession();
      return null;
    }
  },

  /**
   * Checks if valid user session exists
   * @returns Boolean indicating session validity
   */
  checkSession: (): boolean => {
    return !!userManager.getUser();
  },

  /**
   * Clears all session data securely
   */
  clearSession: (): void => {
    clearSession();
    // Additional cleanup if needed
  },

  /**
   * Initializes session management system
   * @returns Cleanup function to remove event listeners
   */
  initialize: (): (() => void) => {
    // Explicit return type
    if (typeof window === "undefined") return () => {};

    // Initial check
    userManager.checkSession();

    // Periodic checks
    const intervalId = setInterval(userManager.checkSession, CHECK_INTERVAL);

    // Add visibility change handler
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        userManager.checkSession();
      }
    };

    // Add storage event listener
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === USER_KEY) {
        userManager.checkSession();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("storage", handleStorageChange);

    // Return cleanup function with proper type
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  },
};

// Utility type for React hook
export type UserManager = typeof userManager;
