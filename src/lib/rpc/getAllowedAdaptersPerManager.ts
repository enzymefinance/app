import { IAllowedAdaptersPerManagerPolicy } from "@enzymefinance/abis/IAllowedAdaptersPerManagerPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getIAllowedAdaptersPerManagerPolicy(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
    user,
  }: {
    comptrollerProxy: Address;
    address: Address;
    user: Address;
  },
) {
  return readContract(client, {
    abi: IAllowedAdaptersPerManagerPolicy,
    functionName: "getListIdsForFundAndUser",
    args: [comptrollerProxy, user],
    address,
  });
}
