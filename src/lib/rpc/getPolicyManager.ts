import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getPolicyManager({
  network,
  comptrollerProxy,
}: {
  network: Network;
  comptrollerProxy: Address;
}) {
  const client = getPublicClient(network);

  const result = await readContract(client, {
    abi: IComptroller,
    functionName: "getPolicyManager",
    address: comptrollerProxy,
  });

  return result;
}
