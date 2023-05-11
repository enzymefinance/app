import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { type Address, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getAmount({
  network,
  account,
  asset,
}: {
  network: Network;
  account: Address;
  asset: Address;
}) {
  const client = getPublicClient(network);
  const amount = await readContract(client, {
    abi: parseAbi(["function balanceOf(address account) view returns (uint256)"]),
    functionName: "balanceOf",
    address: asset,
    args: [account],
  });

  return amount;
}

export async function getAmountMultiple({
  network,
  account,
  assets,
}: {
  network: Network;
  account: Address;
  assets: readonly Address[];
}) {
  const balances = await Promise.all(assets.map((asset) => getAmount({ network, account, asset })));

  return balances;
}
