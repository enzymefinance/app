import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IFundValueCalculatorRouter } from "@enzymefinance/abis/IFundValueCalculatorRouter";
import { type Address, ContractFunctionExecutionError } from "viem";
import { simulateContract } from "viem/contract";

export async function getVaultNetShareValue({
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
      functionName: "calcNetShareValue",
      address: fundValueCalculatorRouter,
      args: [vault],
    });
    const [asset, value] = result;

    return { asset, value };
  } catch (error) {
    // has tracked asset/position without at a valid price
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}