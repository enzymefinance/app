import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IEntranceRateDirectFee } from "@enzymefinance/abis/IEntranceRateDirectFee";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getEntranceRateDirectFee({
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
    abi: IEntranceRateDirectFee,
    functionName: "getRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const rateForFund = await getRateForFund;

  return {
    rateForFund,
  };
}
