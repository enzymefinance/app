import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getComptrollerDenominationAsset({
  network,
  comptroller,
}: {
  network: Network;
  comptroller: Address;
}) {
  const client = getPublicClient(network);

  const denominationAsset = await readContract(client, {
    abi: IComptroller,
    functionName: "getDenominationAsset",
    address: comptroller,
  });

  return denominationAsset;
}
