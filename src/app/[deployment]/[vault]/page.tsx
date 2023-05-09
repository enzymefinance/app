import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getVaultName } from "@/lib/rpc/getVaultName";
import { getVaultOwner } from "@/lib/rpc/getVaultOwner";
import { z } from "@/lib/zod";

const networks = {
  mainnet: "mainnet",
  polygon: "polygon",
  testnet: "polygon",
} as const;

export default async function VaultPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const network = networks[deployment];
  const [name, owner] = await Promise.all([
    getVaultName({
      vault,
      network,
    }),
    getVaultOwner({
      vault,
      network,
    }),
  ]).catch(handleContractError());

  return (
    <>
      <div>name: {name}</div>
      <div>owner: {owner}</div>
    </>
  );
}

export const runtime = "edge";
