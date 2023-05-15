"use client";

import { ThemeProvider as ThemeProviderBase } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof ThemeProviderBase>) {
  return <ThemeProviderBase {...props}>{children}</ThemeProviderBase>;
}
