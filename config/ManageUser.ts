import { StrimzUD } from "@/types/auth";

// Session configuration
const USER_KEY = "strimzUD";
const EXPIRATION_BUFFER = 5000; // 5 seconds

let inactivityTimer: ReturnType<typeof setTimeout>;

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
      sessionStorage.setItem(USER_KEY, JSON.stringify(userWithExpiration));
    } catch (error) {
      console.error("Failed to store user data:", error);
      userManager.clearSession();
    }
  },

  /**
   * Retrieves and validates user data
   * @returns User data or null
   */
  getUser: (): Partial<StrimzUD> | null => {
    try {
      const userData = sessionStorage.getItem(USER_KEY);
      if (!userData) return null;

      const parsedData = JSON.parse(userData) as StrimzUD;

      if (Date.now() > parsedData.expiration - EXPIRATION_BUFFER) {
        userManager.clearSession();
        return null;
      }

      return parsedData;
    } catch (error) {
      console.error("Failed to parse user data:", error);
      userManager.clearSession();
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
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(USER_KEY, "");
      window.sessionStorage.removeItem(USER_KEY);

      const clearEvent = new StorageEvent("storage", {
        key: USER_KEY,
        newValue: null,
        oldValue: window.sessionStorage.getItem(USER_KEY),
        storageArea: window.sessionStorage,
      });
      window.dispatchEvent(clearEvent);

      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    } catch (error) {
      console.error("Failed to clear session data:", error);
    }
  },

  /**
   * Initializes session management system
   * @returns Cleanup function to remove event listeners
   */
  initialize: (): (() => void) => {
    // Explicit return type
    if (typeof window === "undefined") return () => {};

    // Initial check
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        userManager.clearSession();
        window.location.reload();
      }, 15 * 60 * 1000); // 15 minutes
    };

    // Initial setup
    resetTimer();

    // Activity listeners
    const activityListeners = ["mousemove", "keypress", "scroll"] as const;
    activityListeners.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Add storage event listener
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === USER_KEY) {
        userManager.checkSession();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Return cleanup function with proper type
    return () => {
      clearTimeout(inactivityTimer);
      activityListeners.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      window.removeEventListener("storage", handleStorageChange);
    };
  },
};

// Utility type for React hook
export type UserManager = typeof userManager;
