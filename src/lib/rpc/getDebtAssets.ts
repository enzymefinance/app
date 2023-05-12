import { getAssetInfo } from "./getAssetInfo";
import type { Network } from "@/lib/consts";
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
  const {
    result: [assets, amounts],
  } = await simulateContract(client, {
    abi: IExternalPosition,
    functionName: "getDebtAssets",
    address,
  });

  return Promise.all(
    assets.map(async (asset, index) => ({
      asset: await getAssetInfo({ network, asset }),
      amount: amounts[index] ?? BigInt(0),
    })),
  );
}
