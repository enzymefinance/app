import { type Address, isAddress } from "viem";
import { z as zz } from "zod";

function address() {
  return z.string().refine(((value) => isAddress(value)) as (value: string) => value is Address);
}

function deployment() {
  return z.union([z.literal("mainnet"), z.literal("polygon"), z.literal("testnet")]);
}

export const z = {
  ...zz,
  deployment,
  address,
};
