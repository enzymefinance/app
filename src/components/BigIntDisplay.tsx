import type { AssetWithAmount } from "@/lib/types";
import { formatUnits } from "viem";

export function BigIntDisplay({ asset }: { asset: AssetWithAmount | undefined }) {
  if (!asset) {
    return null;
  }

  return <span>{formatUnits(asset.amount, Number(asset.decimals))}</span>;
}
