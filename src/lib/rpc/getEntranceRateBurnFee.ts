import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IEntranceRateBurnFee } from "@enzymefinance/abis/IEntranceRateBurnFee";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getEntranceRateBurnFee({
  network,
  comptrollerProxy,
  address,
}: {
  network: Network;
  comptrollerProxy: Address;
  address: Address;
}) {
  const client = getPublicClient(network);

  const getRateForFund = readContract(client, {
    abi: IEntranceRateBurnFee,
    functionName: "getRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const rateForFund = await getRateForFund;

  return {
    rateForFund,
  };
}
