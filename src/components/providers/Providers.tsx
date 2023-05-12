"use client";

import { QueryClientProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { WagmiProvider } from "./WagmiProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <WagmiProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
