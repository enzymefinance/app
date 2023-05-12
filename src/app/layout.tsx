import "@/lib/styles/globals.css";

import { QueryClientProvider } from "@/components/QueryProvider";
import { RouteTransitionIndicator } from "@/components/RouteTransitionIndicator";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WagmiProvider } from "@/components/WagmiProvider";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { type ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "Enzyme",
    template: "%s - Enzyme",
  },
  description: "A decentralized on-chain asset management protocol",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <RouteTransitionIndicator />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <WagmiProvider>
            <QueryClientProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
              </div>
            </QueryClientProvider>
          </WagmiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
