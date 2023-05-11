import type { Network } from "@/lib/consts";
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
  const {
    result: [assets, amounts],
  } = await simulateContract(client, {
    abi: IExternalPosition,
    functionName: "getManagedAssets",
    address,
  });

  return assets.map((asset, index) => ({
    asset,
    amount: amounts[index],
  }));
}
