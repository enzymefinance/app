import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { type Address, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getAssetSymbol({
  network,
  asset,
}: {
  network: Network;
  asset: Address;
}) {
  const client = getPublicClient(network);

  const symbol = await readContract(client, {
    abi: parseAbi(["function symbol() view returns (string)"]),
    functionName: "symbol",
    address: asset,
  });

  return symbol;
}
