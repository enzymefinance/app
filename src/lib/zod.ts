import { type Deployment, deployments } from "./consts";
import { type Address, isAddress } from "viem";
import { z as zz } from "zod";

export type * from "zod";

function address(message?: string) {
  return z.string().refine(((value) => isAddress(value)) as (value: string) => value is Address, message);
}

function deployment(message?: string) {
  return z
    .string()
    .refine(((value) => deployments.includes(value as Deployment)) as (value: string) => value is Deployment, message);
}

export const z = {
  ...zz,
  deployment,
  address,
};
