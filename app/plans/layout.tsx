

export default function PlansLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="w-full min-h-screen flex flex-col bg-white md:pt-10 pb-20 pt-[24px]">
            {children}
        </section>
    );
}