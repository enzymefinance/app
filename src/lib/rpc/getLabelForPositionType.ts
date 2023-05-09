import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IExternalPositionFactory } from "@enzymefinance/abis/IExternalPositionFactory";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getLabelForExternalPositionType({
  network,
  externalPositionFactory,
  typeId,
}: {
  network: Network;
  externalPositionFactory: Address;
  typeId: bigint;
}) {
  const client = getPublicClient(network);
  const externalPositionManager = await readContract(client, {
    abi: IExternalPositionFactory,
    functionName: "getLabelForPositionType",
    address: externalPositionFactory,
    args: [typeId],
  });

  return externalPositionManager;
}
