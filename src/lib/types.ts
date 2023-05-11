import type { Address } from "viem";

export interface Asset {
  address: Address;
  decimals: bigint;
  name: string;
  symbol: string;
}

export interface AssetWithAmount extends Asset {
  amount: bigint;
}
