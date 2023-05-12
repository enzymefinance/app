import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IExitRateDirectFee } from "@enzymefinance/abis/IExitRateDirectFee";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getExitRateDirectFee({
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
    abi: IExitRateDirectFee,
    functionName: "getInKindRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const getSpecificAssetsRateForFund = readContract(client, {
    abi: IExitRateDirectFee,
    functionName: "getSpecificAssetsRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const getRecipientForFund = readContract(client, {
    abi: IExitRateDirectFee,
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
