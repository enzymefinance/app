import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IExternalPosition } from "@enzymefinance/abis/IExternalPosition";
import type { Address } from "viem";
import { simulateContract } from "viem/contract";

export async function getManagedAssets({
  network,
  address,
}: {
  network: Network;
  address: Address;
}) {
  const client = getPublicClient(network);
  const { result } = await simulateContract(client, {
    abi: IExternalPosition,
    functionName: "getManagedAssets",
    address,
  });

  const parsed = result[0].map((res, i) => {
    return {
      asset: res,
      amount: result[1][i],
    };
  });

  return parsed;

  // .map((res, i) => {
  //   return {
  //     asset: res,
  //     // amount: managedAssets.result[i],
  //   };
  // });
}
