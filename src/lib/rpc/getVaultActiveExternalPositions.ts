import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IVault } from "@enzymefinance/abis/IVault";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getVaultActiveExternalPositions({
  network,
  vault,
}: {
  network: Network;
  vault: Address;
}) {
  const client = getPublicClient(network);
  const activeExternalPositions = await readContract(client, {
    abi: IVault,
    functionName: "getActiveExternalPositions",
    address: vault,
  });

  return activeExternalPositions;
}
