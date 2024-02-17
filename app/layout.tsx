import ModalProviders from "@/components/modals/model-providers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord",
  description: "By Kris.nguyen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(openSans.className, "bg-white dark:bg-[#313338]")}>
          <NextTopLoader height={4} color="#4338ca" />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="theme"
          >
            <ModalProviders />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
