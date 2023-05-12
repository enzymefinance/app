import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IMinSharesSupplyFee } from "@enzymefinance/abis/IMinSharesSupplyFee";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getMinSharesSupplyFee({
  network,
  comptrollerProxy,
  address,
}: {
  network: Network;
  comptrollerProxy: Address;
  address: Address;
}) {
  const client = getPublicClient(network);

  const recipientForFund = await readContract(client, {
    abi: IMinSharesSupplyFee,
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
    address,
  });

  return {
    recipientForFund,
  };
}
