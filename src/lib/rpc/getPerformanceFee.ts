import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IPerformanceFee } from "@enzymefinance/abis/IPerformanceFee";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getPerformanceFee({
  network,
  comptrollerProxy,
  address,
}: {
  network: Network;
  comptrollerProxy: Address;
  address: Address;
}) {
  const client = getPublicClient(network);

  const getFeeInfoForFund = readContract(client, {
    abi: IPerformanceFee,
    functionName: "getFeeInfoForFund",
    args: [comptrollerProxy],
    address,
  });

  const getRecipientForFund = readContract(client, {
    abi: IPerformanceFee,
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
    address,
  });

  const [feeInfoForFund, recipientForFund] = await Promise.all([getFeeInfoForFund, getRecipientForFund]);

  return {
    feeInfoForFund,
    recipientForFund,
  };
}
