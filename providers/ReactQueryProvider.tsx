"use client";
import { userManager } from "@/config/ManageUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";


/**
 * Provider for React Query that also sets up the User Manager.
 *
 * It does the following:
 * 1. Initializes the User Manager.
 * 2. Adds a "beforeunload" event listener to clear the session when the user closes or reloads the page.
 * 3. Clears the session when the component is unmounted.
 *
 * @param children - The children of the component.
 * @returns A React Query client provider with the User Manager set up.
 */

// Set up queryClient
const queryClient = new QueryClient()

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        // Store the cleanup function with proper type
        const cleanup = userManager.initialize();

        const handleBeforeUnload = () => userManager.clearSession();
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Return cleanup wrapper
        return () => {
            // Call session cleanup function
            cleanup();

            // Remove beforeunload listener
            window.removeEventListener('beforeunload', handleBeforeUnload);

            // Optional: Clear session on unmount
            userManager.clearSession();
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}