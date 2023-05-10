import { getExternalPositionsInfo } from "./getExternalPositionsInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { networks } from "@/lib/consts";
import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getAssetInfo, getAssetInfoMultiple } from "@/lib/rpc/getAssetInfo";
import { getBalanceMultiple } from "@/lib/rpc/getBalance";
import { getDenominationAsset } from "@/lib/rpc/getDenominationAsset";
import { getTrackedAssets } from "@/lib/rpc/getTrackedAssets";
import { getVaultActiveExternalPositions } from "@/lib/rpc/getVaultActiveExternalPositions";
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

  const externalPositionsInfo = await getExternalPositionsInfo({
    vault,
    network,
  });

  console.log(externalPositionsInfo);
  /*
  {
    externalPositionsInfo: 
    [
      {
        externalPosition: '0xc0a9506d4A0D186a028530680b493a97679D90D4',
        externalPositionLabel: 'AAVE_DEBT',
        debtAssets: [ [
          {
            asset: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
            amount: 21201354687617n
          }
        ],
        managedAssets: [
          {
            asset: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
            amount: 21201354687617n
          }
        ]
      }
    ]
  }
  */

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
        <hr />
      </CardContent>
    </Card>
  );
}

export const runtime = "edge";
