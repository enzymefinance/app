import { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IExternalPositionProxy } from "@enzymefinance/abis/IExternalPositionProxy";
import { Address } from "viem";
import { readContract } from "viem/contract";

export async function getExternalPositionType({
  network,
  vault,
}: {
  network: Network;
  vault: Address;
}) {
  const client = getPublicClient(network);
  const externalPositionType = await readContract(client, {
    abi: IExternalPositionProxy,
    functionName: "getExternalPositionType",
    address: vault,
  });

  return externalPositionType;
}
