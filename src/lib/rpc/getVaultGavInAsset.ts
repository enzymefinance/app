import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IFundValueCalculatorRouter } from "@enzymefinance/abis/IFundValueCalculatorRouter";
import { type Address, ContractFunctionExecutionError } from "viem";
import { simulateContract } from "viem/contract";

export async function getVaultGavInAsset({
  network,
  vault,
  asset,
  fundValueCalculatorRouter,
}: {
  network: Network;
  vault: Address;
  asset: Address;
  fundValueCalculatorRouter: Address;
}) {
  const client = getPublicClient(network);

  try {
    const { result } = await simulateContract(client, {
      abi: IFundValueCalculatorRouter,
      functionName: "calcGavInAsset",
      address: fundValueCalculatorRouter,
      args: [vault, asset],
    });

    return result;
  } catch (error) {
    console.log(error);
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
