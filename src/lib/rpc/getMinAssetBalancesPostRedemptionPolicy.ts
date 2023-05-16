import { IMinAssetBalancesPostRedemptionPolicy } from "@enzymefinance/abis/IMinAssetBalancesPostRedemptionPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getMinAssetBalancesPostRedemptionPolicy(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
    asset,
  }: {
    comptrollerProxy: Address;
    address: Address;
    asset: Address;
  },
) {
  return readContract(client, {
    abi: IMinAssetBalancesPostRedemptionPolicy,
    functionName: "getMinAssetBalanceForFund",
    args: [comptrollerProxy, asset],
    address,
  });
}
