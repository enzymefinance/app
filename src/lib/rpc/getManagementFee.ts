import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IManagementFee } from "@enzymefinance/abis/IManagementFee";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getManagementFee({
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
    abi: IManagementFee,
    functionName: "getFeeInfoForFund",
    args: [comptrollerProxy],
    address,
  });

  const getRecipientForFund = readContract(client, {
    abi: IManagementFee,
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
