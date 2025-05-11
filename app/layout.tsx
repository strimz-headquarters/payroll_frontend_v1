import "@/styles/globals.css";
import { getMetadata } from "@/utils/getMatadata";
import { Toaster } from 'sonner';
import { headers } from 'next/headers'
import ContextProvider from "@/providers/Context";

export const metadata = getMetadata({
  title: "Strimz Payroll",
  description: "Strimz Payroll is a DeFi payroll solution designed to automate crypto-based salary disbursements, offering secure, seamless, and efficient financial management for businesses and individuals.",
})

/**
 * The root layout of the application.
 *
 * This component wraps the entire application and contains the global
 * React Query provider, as well as the Toaster component for displaying
 * toast notifications.
 *
 * @param {React.ReactNode} children The children to be rendered within the layout.
 * @returns {JSX.Element} The root layout of the application.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="w-full min-h-screen antialiased bg-[#FFFFFF]"
      >
        <ContextProvider cookies={cookies}>
          {children}
          <Toaster richColors position="top-right" />
        </ContextProvider>
      </body>
    </html>
  );
}
