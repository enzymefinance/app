import { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { Address } from "viem";
import { readContract } from "viem/contract";

export async function getPolicyManager({
  network,
  comptroller,
}: {
  network: Network;
  comptroller: Address;
}) {
  const client = getPublicClient(network);
  const policyManager = await readContract(client, {
    abi: IComptroller,
    functionName: "getPolicyManager",
    address: comptroller,
  });

  return policyManager;
}
