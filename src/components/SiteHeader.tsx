import { ConnectButton } from "./ConnectButton";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
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
          <Logo aria-hidden={true} className="rounded-full" />
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
