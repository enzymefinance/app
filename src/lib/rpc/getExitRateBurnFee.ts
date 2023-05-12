import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IExitRateBurnFee } from "@enzymefinance/abis/IExitRateBurnFee";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getExitRateBurnFee({
  network,
  comptrollerProxy,
  address,
}: {
  network: Network;
  comptrollerProxy: Address;
  address: Address;
}) {
  const client = getPublicClient(network);

  const getInKindRateForFund = readContract(client, {
    abi: IExitRateBurnFee,
    functionName: "getInKindRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const getSpecificAssetsRateForFund = readContract(client, {
    abi: IExitRateBurnFee,
    functionName: "getSpecificAssetsRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const getRecipientForFund = readContract(client, {
    abi: IExitRateBurnFee,
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
    address,
  });

  const [inKindRateForFund, specificAssetsRateForFund, recipientForFund] = await Promise.all([
    getInKindRateForFund,
    getSpecificAssetsRateForFund,
    getRecipientForFund,
  ]);

  return {
    inKindRateForFund,
    specificAssetsRateForFund,
    recipientForFund,
  };
}
