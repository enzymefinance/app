import { getExternalPositionsInfo } from "../../../lib/rpc/getExternalPositionsInfo";
import { VaultTile } from "@/components/VaultTile";
import { getNetworkByDeployment } from "@/lib/consts";
import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getAssetInfo, getAssetInfoMultiple } from "@/lib/rpc/getAssetInfo";
import { getBalanceMultiple } from "@/lib/rpc/getBalance";
import { getDenominationAsset } from "@/lib/rpc/getDenominationAsset";
import { getTrackedAssets } from "@/lib/rpc/getTrackedAssets";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
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

  const network = getNetworkByDeployment(deployment);
  const [owner, comptroller, trackedAssets, externalPositionsInfo] = await Promise.all([
    getVaultOwner({ vault, network }),
    getVaultComptroller({ vault, network }),
    getTrackedAssets({ vault, network }),
    getExternalPositionsInfo({ vault, network }),
  ]).catch(handleContractError());

  const [trackedAssetsInfo, , denominationAsset] = await Promise.all([
    getAssetInfoMultiple({ network, assets: trackedAssets }),
    getBalanceMultiple({ network, account: vault, assets: trackedAssets }),
    getDenominationAsset({ network, comptroller }),
  ]).catch(handleContractError());

  console.log(trackedAssetsInfo);
  const denominationAssetInfo = await getAssetInfo({
    network,
    asset: denominationAsset,
  }).catch(handleContractError());

  console.log(externalPositionsInfo);

  return (
    <div className="grid grid-cols-1 grid-rows-6 gap-4 pt-2 sm:grid-cols-3 sm:grid-rows-2">
      <VaultTile title="Owner" description={owner} />
      <VaultTile title="Denomination Asset" description={denominationAssetInfo.symbol} />
      <VaultTile title="Total supply" description="$0.99" />
      <VaultTile title="GAV" description="$1,001.52" />
      <VaultTile title="Share price" description="$1,001.52" />
      <VaultTile title="Release" description="Sulu" />
    </div>
  );
}
