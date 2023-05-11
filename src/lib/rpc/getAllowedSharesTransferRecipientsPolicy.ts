import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IAllowedSharesTransferRecipientsPolicy } from "@enzymefinance/abis/IAllowedSharesTransferRecipientsPolicy";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getAllowedSharesTransferRecipientsPolicy({
  network,
  comptrollerProxy,
  address,
}: {
  network: Network;
  comptrollerProxy: Address;
  address: Address;
}) {
  const client = getPublicClient(network);

  const listIdsForFund = await readContract(client, {
    abi: IAllowedSharesTransferRecipientsPolicy,
    functionName: "getListIdsForFund",
    args: [comptrollerProxy],
    address,
  });

  return {
    listIdsForFund,
  };
}
