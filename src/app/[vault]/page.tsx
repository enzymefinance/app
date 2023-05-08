import { HelloWorld } from "@/components/HelloWorld";
import { notFound } from "next/navigation";
import { isAddress } from "viem";

export default function VaultPage({ params }: { params: { vault: string } }) {
  if (!isAddress(params.vault)) {
    return notFound();
  }

  return <HelloWorld address={params.vault} />;
}
