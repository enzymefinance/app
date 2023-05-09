import { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { Address, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getAssetName({
  network,
  asset,
}: {
  network: Network;
  asset: Address;
}) {
  const client = getPublicClient(network);

  const name = await readContract(client, {
    abi: parseAbi(["function name() view returns (string)"]),
    functionName: "name",
    address: asset,
  });

  return name;
}
