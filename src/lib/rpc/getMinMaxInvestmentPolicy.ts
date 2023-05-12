import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IMinMaxInvestmentPolicy } from "@enzymefinance/abis/IMinMaxInvestmentPolicy";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getMinMaxInvestmentPolicy({
  network,
  comptrollerProxy,
  address,
}: {
  network: Network;
  comptrollerProxy: Address;
  address: Address;
}) {
  const client = getPublicClient(network);

  const fundSettings = await readContract(client, {
    abi: IMinMaxInvestmentPolicy,
    functionName: "getFundSettings",
    args: [comptrollerProxy],
    address,
  });

  return {
    fundSettings,
  };
}
