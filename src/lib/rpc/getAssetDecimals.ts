import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { type Address, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getAssetDecimals({
  network,
  asset,
}: {
  network: Network;
  asset: Address;
}) {
  const client = getPublicClient(network);
  const decimals = await readContract(client, {
    abi: parseAbi(["function decimals() view returns (uint)"] as const),
    functionName: "decimals",
    address: asset,
  });

  return decimals;
}
