import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IExternalPositionManager } from "@enzymefinance/abis/IExternalPositionManager";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getExternalPositionFactory({
  network,
  externalPositionManager,
}: {
  network: Network;
  externalPositionManager: Address;
  typeId: bigint;
}) {
  const client = getPublicClient(network);
  const externalPositionFactory = await readContract(client, {
    abi: IExternalPositionManager,
    functionName: "getExternalPositionFactory",
    address: externalPositionManager,
  });

  return externalPositionFactory;
}
