import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { type Address, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getBalance({
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

export async function getBalanceMultiple({
  network,
  account,
  assets,
}: {
  network: Network;
  account: Address;
  assets: readonly Address[];
}) {
  const balances = await Promise.all(assets.map((asset) => getBalance({ network, account, asset })));

  return balances;
}
