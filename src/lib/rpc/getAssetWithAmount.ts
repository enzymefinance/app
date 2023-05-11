import type { Address } from "viem";
import type { Network } from "../consts";
import { getAssetInfo } from "./getAssetInfo";
import { getAmount } from "./getAmount";

export async function getAssetWithAmount({
  network,
  account,
  asset,
}: {
  network: Network;
  account: Address;
  asset: Address;
}) {
  const [info, amount] = await Promise.all([getAssetInfo({ network, asset }), getAmount({ network, account, asset })]);

  return { ...info, amount };
}
