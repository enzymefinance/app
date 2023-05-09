import { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { Address, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getAccountBalance({
  network,
  account,
  asset,
}: {
  network: Network;
  account: Address;
  asset: Address;
}) {
  const client = getPublicClient(network);

  const balance = await readContract(client, {
    abi: parseAbi(["function balanceOf(address account) view returns (uint256)"]),
    functionName: "balanceOf",
    address: asset,
    args: [account],
  });

  return balance;
}
