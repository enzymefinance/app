import { ConnectButton } from "./ConnectButton";
import { VaultSearch } from "./VaultSearch";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container h-16 items-center space-x-4 justify-between space-x-0 hidden md:flex">
        <Link
          className="inline-flex flex-none items-center justify-center"
          role="banner"
          title="Enzyme — On-chain Asset Management"
          href="/"
        >
          <Logo aria-hidden={true} className="rounded-full" />
        </Link>
        <div className="flex items-center justify-end space-x-4">
          <div className="flex items-center space-x-4 relative pl-60">
            <div className="flex-1 t-0 absolute top-0 left-0 w-60">
              <VaultSearch />
            </div>
            <ConnectButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="container h-32 items-center xs:flex-col md:hidden">
        <div className="flex justify-between w-full pt-4">
          <Link
            className="inline-flex flex-none items-center justify-center"
            role="banner"
            title="Enzyme — On-chain Asset Management"
            href="/"
          >
            <Logo aria-hidden={true} className="rounded-full" />
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-end space-x-4 relative w-full pt-4">
          <div className="flex items-center space-x-4 relative pl-[50%]">
            <div className="flex-1 t-0 absolute top-0 left-0 w-1/2">
              <VaultSearch />
            </div>
            <div className="[&>button]:text-xs">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
