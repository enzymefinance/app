import { formatUnits } from "viem";

export function BigIntDisplay({ amount, decimals = 18 }: { amount: bigint; decimals?: number | bigint }) {
  if (amount === undefined) {
    return null;
  }

  return <span>{formatUnits(amount, Number(decimals))}</span>;
}
