import { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IPolicyManager } from "@enzymefinance/abis/IPolicyManager";
import { Address } from "viem";
import { readContract } from "viem/contract";

export async function getEnabledPoliciesForFund({
  network,
  comptroller,
  policyManager,
}: {
  network: Network;
  comptroller: Address;
  policyManager: Address;
}) {
  const client = getPublicClient(network);
  const enabledPolicies = await readContract(client, {
    abi: IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: policyManager,
    args: [comptroller],
  });

  return enabledPolicies;
}
