"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {Logo} from "@/components/Logo";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link
            className="inline-flex flex-none items-center justify-center"
            role="banner"
            title="Enzyme — On-chain Asset Management"
            href="/"
        >
          <Logo aria-hidden  className="rounded-full" />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <ConnectButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
