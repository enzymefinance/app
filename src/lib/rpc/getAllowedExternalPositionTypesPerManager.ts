import { IAllowedExternalPositionTypesPerManagerPolicy } from "@enzymefinance/abis/IAllowedExternalPositionTypesPerManagerPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getAllowedExternalPositionTypesPerManagerPolicy(
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
    abi: IAllowedExternalPositionTypesPerManagerPolicy,
    functionName: "getListIdsForFundAndUser",
    args: [comptrollerProxy, user],
    address,
  });
}
