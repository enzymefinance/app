import { VaultTile } from "@/components/VaultTile";
import { getNetworkByDeployment } from "@/lib/consts";
import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getAssetInfo } from "@/lib/rpc/getAssetInfo";
import { getDenominationAsset } from "@/lib/rpc/getDenominationAsset";
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

  const [owner, comptroller] = await Promise.all([
    getVaultOwner({ vault, network }),
    getVaultComptroller({ vault, network }),
  ]).catch(handleContractError());

  const [denominationAsset] = await Promise.all([getDenominationAsset({ network, comptroller })]).catch(
    handleContractError(),
  );

  const denominationAssetInfo = await getAssetInfo({
    network,
    asset: denominationAsset,
  }).catch(handleContractError());

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 pt-2">
      <VaultTile title="Owner" description={owner} />
      <VaultTile title="Denomination Asset" description={denominationAssetInfo.symbol} />
      <VaultTile title="Total supply" description="$0.99" />
      <VaultTile title="GAV" description="$1,001.52" />
      <VaultTile title="Share price" description="$1,001.52" />
      <VaultTile title="Release" description="Sulu" />
    </div>
  );
}
