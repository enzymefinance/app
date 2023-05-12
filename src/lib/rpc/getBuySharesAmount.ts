import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address } from "viem";
import { simulateContract } from "viem/contract";

export async function getBuySharesAmount({
  network,
  comptroller,
  amount,
  account,
}: {
  network: Network;
  comptroller: Address;
  amount: bigint;
  account: Address;
}) {
  const client = getPublicClient(network);
  const { result } = await simulateContract(client, {
    abi: IComptroller,
    functionName: "buyShares",
    address: comptroller,
    args: [amount, 1n],
    account,
  });

  return result;
}
