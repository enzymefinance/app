import { getAssetDecimals } from "./getAssetDecimals";
import { getAssetName } from "./getAssetName";
import { getAssetSymbol } from "./getAssetSymbol";
import { type Network } from "@/lib/consts";
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

  return { name, symbol, decimals, address: asset };
}

export async function getAssetInfoMultiple({
  network,
  assets,
}: {
  network: Network;
  assets: readonly Address[];
}) {
  const infos = await Promise.all(assets.map((asset) => getAssetInfo({ network, asset })));

  return infos;
}
