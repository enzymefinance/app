import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IFundValueCalculatorRouter } from "@enzymefinance/abis/IFundValueCalculatorRouter";
import { type Address, ContractFunctionExecutionError } from "viem";
import { simulateContract } from "viem/contract";

export async function getVaultNav({
  network,
  vault,
  fundValueCalculatorRouter,
}: {
  network: Network;
  vault: Address;
  fundValueCalculatorRouter: Address;
}) {
  const client = getPublicClient(network);

  try {
    const {
      result: [asset, value],
    } = await simulateContract(client, {
      abi: IFundValueCalculatorRouter,
      functionName: "calcNav",
      address: fundValueCalculatorRouter,
      args: [vault],
    });

    return { asset, value };
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
