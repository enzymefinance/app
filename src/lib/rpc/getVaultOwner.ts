import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IVault } from "@enzymefinance/abis/IVault";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getVaultOwner({
  network,
  vault,
}: {
  network: Network;
  vault: Address;
}) {
  const client = getPublicClient(network);
  const owner = await readContract(client, {
    abi: IVault,
    functionName: "getOwner",
    address: vault,
  });

  return owner;
}
