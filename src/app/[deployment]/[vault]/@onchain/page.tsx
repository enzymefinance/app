import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getAssetInfo, getAssetInfoMultiple } from "@/lib/rpc/getAssetInfo";
import { getBalanceMultiple } from "@/lib/rpc/getBalance";
import { getDenominationAsset } from "@/lib/rpc/getDenominationAsset";
import { getTrackedAssets } from "@/lib/rpc/getTrackedAssets";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
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
  const [name, owner, comptroller, trackedAssets] = await Promise.all([
    getVaultName({ vault, network }),
    getVaultOwner({ vault, network }),
    getVaultComptroller({ vault, network }),
    getTrackedAssets({ vault, network }),
  ]).catch(handleContractError());

  const [trackedAssetsInfo, , denominationAsset] = await Promise.all([
    getAssetInfoMultiple({ network, assets: trackedAssets }),
    getBalanceMultiple({ network, account: vault, assets: trackedAssets }),
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
        <div>
          {trackedAssetsInfo.map((trackedAssetInfo) => (
            <div key={trackedAssetInfo.address}>
              {trackedAssetInfo.symbol} {trackedAssetInfo.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export const runtime = "edge";
