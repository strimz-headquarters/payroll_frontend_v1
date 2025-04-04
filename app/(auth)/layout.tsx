
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section className="w-full">
            {children}
        </section>
    );
}