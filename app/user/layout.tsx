/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Footer from "@/components/dashboard_shared/Footer";
import Header from "@/components/dashboard_shared/Header";
import SideBar from "@/components/dashboard_shared/SideBar";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { userManager } from "@/config/ManageUser";


/**
 * The UserLayout component renders a basic layout for authenticated user pages.
 * It renders a sidebar, a header, a main content section, and a footer.
 * The sidebar is collapsible and can be toggled by the user.
 * The component also includes authentication session management.
 *
 * Props:
 * - `children`: A React node that contains the content to be rendered within the main content section.
 *
 * @returns A JSX element representing the layout.
 */
export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const router = useRouter();


    useEffect(() => {
        const cleanup = userManager.initialize();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Use window.performance directly with type assertion
            const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

            // Only clear session on actual window close
            if (navigation.type !== 'reload') {
                userManager.clearSession();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            cleanup();
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Enhanced verification check
    useEffect(() => {
        // Enhanced session validation with proper typing
        const validateSession = () => {
            const currentUser = userManager.getUser();

            // Explicit type for session data
            type UserSession = {
                verified: boolean;
                expiration: number;
                [key: string]: any;
            };

            const sessionData = currentUser as UserSession | null;
            const isValidSession = sessionData?.verified && Date.now() < (sessionData?.expiration || 0);

            if (!isValidSession) {
                userManager.clearSession();
                router.push('/login');
            }
        };

        // Validate on mount and periodically
        validateSession();
        const interval = setInterval(validateSession, 300000); // 5 mins

        return () => clearInterval(interval);
    }, [router]);

    return (
        <div className=" bg-[#F9FAFB] lg:p-1.5">
            {/* Page Wrapper Start  */}
            <div className="flex h-screen gap-1 overflow-hidden">
                {/* Sidebar Start */}
                <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* Sidebar End  */}

                {/* Content Area Start  */}
                <div className="relative flex min-h-[100svh] rounded-t-[8px] bg-white flex-1 border border-[#E5E7EB] flex-col justify-between overflow-y-auto overflow-x-hidden no-scrollbar">
                    <section>
                        {/*  Header Start */}
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        {/*  Header End */}

                        {/*  Main Content Start */}
                        <main>
                            <div className="mx-auto 2xl:max-w-screen-2xl max-w-[800px] mt-4 pb-6 md:pt-4 md:pb-10 2xl:p-10">
                                <section className="w-full lg:px-1.5 px-3">{children}</section>
                            </div>
                        </main>
                    </section>
                    {/*  Main Content End  */}
                    <Footer />
                </div>
                {/*  Content Area End  */}
            </div>
            {/*  Page Wrapper End  */}
        </div>
    );
}