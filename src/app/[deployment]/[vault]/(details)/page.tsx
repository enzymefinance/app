import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { networks } from "@/lib/consts";
import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getAssetInfo } from "@/lib/rpc/getAssetInfo";
import { getDenominationAsset } from "@/lib/rpc/getDenominationAsset";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
import { getVaultName } from "@/lib/rpc/getVaultName";
import { getVaultOwner } from "@/lib/rpc/getVaultOwner";
import { z } from "@/lib/zod";

export default async function VaultPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const network = networks[deployment];
  const [name, owner, comptroller] = await Promise.all([
    getVaultName({ vault, network }),
    getVaultOwner({ vault, network }),
    getVaultComptroller({ vault, network }),
  ]).catch(handleContractError());

  const [denominationAsset] = await Promise.all([
    getDenominationAsset({ network, comptroller }),
  ]).catch(handleContractError());

  const denominationAssetInfo = await getAssetInfo({
    network,
    asset: denominationAsset,
  }).catch(handleContractError());

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>owner: {owner}</div>
        <div>denomination asset: {denominationAssetInfo.symbol}</div>
      </CardContent>
    </Card>
  );
}

export const runtime = "edge";
