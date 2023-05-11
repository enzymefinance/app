import { VaultTile } from "@/components/VaultTile";
import { Skeleton } from "@/components/ui/skeleton";
import { type Network, getNetworkByDeployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { assertParams } from "@/lib/params";
import { getAssetSymbol } from "@/lib/rpc/getAssetSymbol";
import { getAssetTotalSupply } from "@/lib/rpc/getAssetTotalSupply";
import { getDenominationAsset } from "@/lib/rpc/getDenominationAsset";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
import { getVaultOwner } from "@/lib/rpc/getVaultOwner";
import { z } from "@/lib/zod";
import { Suspense } from "react";
import { type Address, formatUnits } from "viem";

export default function VaultPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const network = getNetworkByDeployment(deployment);

  return (
    <div className="grid grid-cols-1 grid-rows-6 gap-4 pt-2 sm:grid-cols-3 sm:grid-rows-2">
      <VaultTile title="Vault" description={vault} />
      <Suspense fallback={<Skeleton />}>
        <VaultOwner vault={vault} network={network} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <VaultDenonimationAsset vault={vault} network={network} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <VaultTotalSupply vault={vault} network={network} />
      </Suspense>
      <VaultTile title="GAV" description="$1,001.52" />
      <VaultTile title="Share price" description="$1,001.52" />
      <VaultTile title="Release" description="Sulu" />
    </div>
  );
}

const VaultDenonimationAsset = asSyncComponent(async function ({
  network,
  vault,
}: { network: Network; vault: Address }) {
  const comptroller = await getVaultComptroller({ vault, network });
  const asset = await getDenominationAsset({ network, comptroller });
  const symbol = await getAssetSymbol({ network, asset });
  return <VaultTile title="Denomination asset" description={symbol} />;
});

const VaultOwner = asSyncComponent(async function ({ network, vault }: { network: Network; vault: Address }) {
  const vaultOwner = await getVaultOwner({ vault, network });
  return <VaultTile title="Owner" description={vaultOwner} />;
});

const VaultTotalSupply = asSyncComponent(async function ({ network, vault }: { network: Network; vault: Address }) {
  const vaultTotalSupply = await getAssetTotalSupply({ asset: vault, network });
  return <VaultTile title="Total supply" description={formatUnits(vaultTotalSupply, 18)} />;
});
