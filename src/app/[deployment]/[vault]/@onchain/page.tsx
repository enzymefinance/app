import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getAccountBalance } from "@/lib/rpc/getAccountBalance";
import { getAssetInfo } from "@/lib/rpc/getAssetInfo";
import { getComptrollerDenominationAsset } from "@/lib/rpc/getComptrollerDenominationAsset";
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

  console.log({ vault });
  const [name, owner, comptroller, trackedAssets] = await Promise.all([
    getVaultName({
      vault,
      network,
    }),
    getVaultOwner({
      vault,
      network,
    }),
    getVaultComptroller({
      vault,
      network,
    }),
    getTrackedAssets({
      vault,
      network,
    }),
  ]).catch(handleContractError());

  const [trackedAssetsInfo, , denominationAsset] = await Promise.all([
    Promise.all(trackedAssets.map((trackedAsset) => getAssetInfo({ network, asset: trackedAsset }))),
    Promise.all(
      trackedAssets.map((trackedAsset) => getAccountBalance({ network, asset: trackedAsset, account: vault })),
    ),
    getComptrollerDenominationAsset({
      network,
      comptroller,
    }),
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
            <div key={trackedAssetInfo.symbol}>
              {trackedAssetInfo.symbol} {trackedAssetInfo.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export const runtime = "edge";
