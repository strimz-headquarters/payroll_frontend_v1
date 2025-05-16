"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Set up queryClient
const queryClient = new QueryClient()

/**
 * The React Query provider for the entire application.
 *
 * This component wraps the entire application and provides a single instance of the
 * `QueryClient` to all React Query hooks. This allows all hooks to share the same
 * cache and configuration.
 *
 * @example
*/
export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}