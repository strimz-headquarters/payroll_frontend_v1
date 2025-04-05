

/**
 * The PlansLayout component renders a layout for the plans page.
 * It is a section element with a class of "w-full min-h-screen flex flex-col bg-white md:pt-10 pb-20 pt-[24px]".
 * The section element renders the children of the component.
 *
 * @param {{ children: React.ReactNode }} props The children to be rendered within the section.
 * @returns {JSX.Element} The plans layout component.
 */
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