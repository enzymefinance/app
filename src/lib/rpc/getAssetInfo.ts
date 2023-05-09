import { type Network } from "../types";
import { getAssetDecimals } from "./getAssetDecimals";
import { getAssetName } from "./getAssetName";
import { getAssetSymbol } from "./getAssetSymbol";
import type { Address } from "viem";

export async function getAssetInfo({
  network,
  asset,
}: {
  network: Network;
  asset: Address;
}) {
  const [name, symbol, decimals] = await Promise.all([
    getAssetName({ network, asset }),
    getAssetSymbol({ network, asset }),
    getAssetDecimals({ network, asset }),
  ]);

  return { name, symbol, decimals };
}
