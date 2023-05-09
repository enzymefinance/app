import { parseParams } from "@/lib/parseParams";
import { getVaultName } from "@/lib/rpc/getVaultName";
import { getVaultOwner } from "@/lib/rpc/getVaultOwner";
import { isAddress } from "viem";
import { z } from "zod";

const deployments = ["mainnet", "polygon", "testnet"] as const;
type Deployment = typeof deployments[number];
const networks = {
  mainnet: "mainnet",
  polygon: "polygon",
  testnet: "polygon",
} as const;

export default async function VaultPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault, deployment } = parseParams({
    schema: z.object({
      deployment: z.string().and(z.union([z.literal("mainnet"), z.literal("polygon"), z.literal("testnet")])),
      vault: z.string().refine(isAddress, { message: "invalid vault address" }),
    }),
    params,
  });

  const network = networks[deployment];

  const [name, owner] = await Promise.all([getVaultName({ vault, network }), getVaultOwner({ vault, network })]);

  return (
    <>
      <div>name: {name}</div>
      <div>owner: {owner}</div>
    </>
  );
}

export const runtime = "edge";
