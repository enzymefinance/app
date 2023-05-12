import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IFeeManager } from "@enzymefinance/abis/IFeeManager";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getEnabledFeesForFund({
  network,
  comptrollerProxy,
  feeManager,
}: {
  network: Network;
  comptrollerProxy: Address;
  feeManager: Address;
}) {
  const client = getPublicClient(network);

  const result = await readContract(client, {
    abi: IFeeManager,
    functionName: "getEnabledFeesForFund",
    args: [comptrollerProxy],
    address: feeManager,
  });

  return result;
}
