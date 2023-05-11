import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IDispatcher } from "@enzymefinance/abis/IDispatcher";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getFundDeployerForVaultProxy({
  network,
  vault,
  dispatcher,
}: {
  network: Network;
  vault: Address;
  dispatcher: Address;
}) {
  const client = getPublicClient(network);
  const fundDeployer = await readContract(client, {
    abi: IDispatcher,
    functionName: "getFundDeployerForVaultProxy",
    address: dispatcher,
    args: [vault],
  });

  return fundDeployer;
}
