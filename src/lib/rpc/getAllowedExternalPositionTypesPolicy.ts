import { IAllowedExternalPositionTypesPolicy } from "@enzymefinance/abis/IAllowedExternalPositionTypesPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getAllowedExternalPositionTypesPolicy(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
    externalPositionTypeId,
  }: {
    comptrollerProxy: Address;
    address: Address;
    externalPositionTypeId: bigint;
  },
) {
  return readContract(client, {
    abi: IAllowedExternalPositionTypesPolicy,
    functionName: "externalPositionTypeIsAllowedForFund",
    args: [comptrollerProxy, externalPositionTypeId],
    address,
  });
}
