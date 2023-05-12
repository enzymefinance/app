import { formatNumber } from "@/lib/format";

export function BigIntDisplay({
  amount,
  decimals = 18,
  currency,
}: { amount: bigint; currency?: string; decimals?: number | bigint }) {
  if (amount === undefined) {
    return null;
  }

  const formatted =
    currency === undefined ? formatNumber({ amount, decimals }) : formatNumber({ amount, decimals, currency });

  return <span>{formatted}</span>;
}
