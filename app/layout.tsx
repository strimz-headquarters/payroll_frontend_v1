import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/styles/globals.css";
import { getMetadata } from "@/utils/getMatadata";
import { Toaster } from 'sonner';

export const metadata = getMetadata({
  title: "Strimz",
  description: "Strimz is a DeFi payroll solution designed to automate crypto-based salary disbursements, offering secure, seamless, and efficient financial management for businesses and individuals.",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="w-full min-h-screen antialiased bg-[#FFFFFF]"
      >
        <ReactQueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
