"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



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



    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}