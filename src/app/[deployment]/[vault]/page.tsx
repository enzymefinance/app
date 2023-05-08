import { origin } from "@/lib/origin";
import { IVault } from "@enzymefinance/abis/IVault";
import { notFound } from "next/navigation";
import { createPublicClient, http, isAddress } from "viem";

const deployments = ["mainnet", "polygon", "testnet"] as const;
const networks = {
  mainnet: "mainnet",
  polygon: "polygon",
  testnet: "polygon",
} as const;

async function getVault(params: VaultPageParams) {
  if (!isAddress(params.vault)) {
    return notFound();
  }

  const deployment = params.deployment as typeof deployments[number];
  if (!deployments.includes(deployment)) {
    return notFound();
  }

  const network = networks[deployment];
  const client = createPublicClient({
    transport: http(`${origin}/rpc/${network}`),
    name: network,
  });

  const result = await client.readContract({
    abi: IVault,
    functionName: "name",
    address: params.vault,
  });

  return result;
}

type VaultPageParams = { deployment: string; vault: string };

export default async function VaultPage({ params }: { params: { deployment: string; vault: string } }) {
  const vault = await getVault(params);

  return <div>{vault}</div>;
}
