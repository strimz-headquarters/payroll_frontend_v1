"use client";
import { userManager } from "@/config/ManageUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

/**
 * The ReactQueryProvider is a React context provider that wraps a QueryClient and its children.
 * The QueryClient is a state container for react-query that stores the results of all queries.
 * The ReactQueryProvider is used to provide a QueryClient to all react-query hooks and components
 * within its children.
 */
export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

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