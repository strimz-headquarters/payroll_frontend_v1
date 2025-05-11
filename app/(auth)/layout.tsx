'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userManager } from '@/config/ManageUser';


/**
 * The AuthLayout component wraps the auth pages and handles redirects
 * when the user is already logged in.
 *
 * When the user is logged in, the component redirects to the
 * dashboard page.
 *
 * @param {React.ReactNode} children The pages to be wrapped.
 * @returns {JSX.Element} The AuthLayout component.
 */
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();

    useEffect(() => {
        const currentUser = userManager.getUser();
        if (currentUser?.verified === true) {
            router.push('/user');
        }
    }, [router]);

    return (
        <section className="w-full">
            {children}
        </section>
    );
}