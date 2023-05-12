import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IAllowedDepositRecipientsPolicy } from "@enzymefinance/abis/IAllowedDepositRecipientsPolicy";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getAllowedDepositRecipientsPolicy({
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
    abi: IAllowedDepositRecipientsPolicy,
    functionName: "getListIdsForFund",
    args: [comptrollerProxy],
    address,
  });

  return {
    listIdsForFund,
  };
}
