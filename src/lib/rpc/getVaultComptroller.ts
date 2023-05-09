import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IVault } from "@enzymefinance/abis/IVault";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getVaultComptroller({
  network,
  vault,
}: {
  network: Network;
  vault: Address;
}) {
  const client = getPublicClient(network);

  const accessor = await readContract(client, {
    abi: IVault,
    functionName: "getAccessor",
    address: vault,
  });

  return accessor;
}
