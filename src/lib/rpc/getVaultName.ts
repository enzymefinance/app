import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IVault } from "@enzymefinance/abis/IVault";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getVaultName({
  network,
  vault,
}: {
  network: Network;
  vault: Address;
}) {
  const client = getPublicClient(network);
  const name = await readContract(client, {
    abi: IVault,
    functionName: "name",
    address: vault,
  });

  return name;
}
