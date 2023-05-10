import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import {
  type Address,
  ContractFunctionExecutionError,
  ContractFunctionZeroDataError,
  hexToString,
  parseAbi,
} from "viem";
import { readContract } from "viem/contract";

export async function getAssetName({
  network,
  asset,
}: {
  network: Network;
  asset: Address;
}) {
  const client = getPublicClient(network);

  try {
    try {
      const name = await readContract(client, {
        abi: parseAbi(["function name() view returns (string)"]),
        functionName: "name",
        address: asset,
      });

      return name;
    } catch (error) {
      if (error instanceof ContractFunctionExecutionError) {
        // TODO: Once `viem` exports the `SliceOutOfBoundsError` class, we should use that here too (`error.cause`).
        const name = await readContract(client, {
          abi: parseAbi(["function name() view returns (bytes32)"]),
          functionName: "name",
          address: asset,
        });

        return hexToString(name);
      }

      throw error;
    }
  } catch (error) {
    if (error instanceof ContractFunctionZeroDataError) {
      return "";
    }

    throw error;
  }
}
