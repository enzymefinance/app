import type { Network } from "../types";
import { getPublicClient } from "@/lib/rpc";
import { IFundValueCalculatorRouter } from "@enzymefinance/abis/IFundValueCalculatorRouter";
import { type Address, ContractFunctionExecutionError } from "viem";
import { simulateContract } from "viem/contract";

export async function getVaultGavValue({
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
    const { result } = await simulateContract(client, {
      abi: IFundValueCalculatorRouter,
      functionName: "calcGav",
      address: fundValueCalculatorRouter,
      args: [vault],
    });

    const [asset, gavValue] = result;

    return { asset, gavValue };
  } catch (error) {
    // has tracked asset/position without at a valid price
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
