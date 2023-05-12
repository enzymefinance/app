import { formatUnits } from "viem";

const usdNumberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const numberFormat = new Intl.NumberFormat("en-US");

export function formatNumber({
  amount,
  decimals = 18,
  currency = undefined,
}: {
  amount: bigint;
  decimals: number | bigint;
  currency?: string;
}) {
  if (currency === "usd") {
    return usdNumberFormat.format(Number(formatUnits(amount, Number(decimals))));
  }

  const formatted = numberFormat.format(Number(formatUnits(amount, Number(decimals))));

  return currency === undefined ? formatted : `${currency} ${formatted}`;
}
