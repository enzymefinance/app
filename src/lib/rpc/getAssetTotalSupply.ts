import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { type Address, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getAssetTotalSupply({
  network,
  asset,
}: {
  network: Network;
  asset: Address;
}) {
  const client = getPublicClient(network);
  const totalSupply = await readContract(client, {
    abi: parseAbi(["function totalSupply() view returns (uint)"]),
    functionName: "totalSupply",
    address: asset,
  });

  return totalSupply;
}
