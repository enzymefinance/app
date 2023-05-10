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

export async function getAssetSymbol({
  network,
  asset,
}: {
  network: Network;
  asset: Address;
}) {
  const client = getPublicClient(network);

  try {
    try {
      const symbol = await readContract(client, {
        abi: parseAbi(["function symbol() view returns (string)"]),
        functionName: "symbol",
        address: asset,
      });

      return symbol;
    } catch (error) {
      if (error instanceof ContractFunctionExecutionError) {
        // TODO: Once `viem` exports the `SliceOutOfBoundsError` class, we should use that here too (`error.cause`).
        const symbol = await readContract(client, {
          abi: parseAbi(["function symbol() view returns (bytes32)"]),
          functionName: "symbol",
          address: asset,
        });

        return hexToString(symbol);
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
