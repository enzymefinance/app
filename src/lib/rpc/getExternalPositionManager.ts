import { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { Address } from "viem";
import { readContract } from "viem/contract";

export async function getExternalPositionManager({
  network,
  comptroller,
}: {
  network: Network;
  comptroller: Address;
}) {
  const client = getPublicClient(network);
  const externalPositionManager = await readContract(client, {
    abi: IComptroller,
    functionName: "getExternalPositionManager",
    address: comptroller,
  });

  return externalPositionManager;
}
