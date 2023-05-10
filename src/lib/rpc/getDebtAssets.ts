import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IExternalPosition } from "@enzymefinance/abis/IExternalPosition";
import type { Address } from "viem";
import { simulateContract } from "viem/contract";

export async function getDebtAssets({
  network,
  address,
}: {
  network: Network;
  address: Address;
}) {
  const client = getPublicClient(network);
  const { result } = await simulateContract(client, {
    abi: IExternalPosition,
    functionName: "getDebtAssets",
    address,
  });

  const parsed = result[0].map((res, i) => {
    return {
      asset: res,
      amount: result[1][i],
    };
  });

  return parsed;
}
