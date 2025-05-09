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

    // Session management initialization
    useEffect(() => {
        const cleanup = userManager.initialize();
        return () => {
            cleanup();
            userManager.clearSession();
        };
    }, []);

    // Session validation
    useEffect(() => {
        const currentUser = userManager.getUser();
        if (!userManager.checkSession() && !currentUser?.verified) {
            userManager.clearSession();
            router.push('/login');
        }
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