import { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IPolicy } from "@enzymefinance/abis/IPolicy";
import { Address } from "viem";
import { readContract } from "viem/contract";

export async function getPolicyIdentifier({
  network,
  policy,
}: {
  network: Network;
  policy: Address;
}) {
  const client = getPublicClient(network);
  const identifier = await readContract(client, {
    abi: IPolicy,
    functionName: "identifier",
    address: policy,
  });

  return identifier;
}
