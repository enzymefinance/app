import { VaultTile } from "@/components/VaultTile";
import { Skeleton } from "@/components/ui/skeleton";
import { type Deployment, getContract, getNetworkByDeployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { assertParams } from "@/lib/params";
import { getAssetSymbol } from "@/lib/rpc/getAssetSymbol";
import { getAssetTotalSupply } from "@/lib/rpc/getAssetTotalSupply";
import { getDenominationAsset } from "@/lib/rpc/getDenominationAsset";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
import { getVaultGavInAsset } from "@/lib/rpc/getVaultGavInAsset";
import { getVaultOwner } from "@/lib/rpc/getVaultOwner";
import { getVaultSharePriceInAsset } from "@/lib/rpc/getVaultSharePriceInAsset";
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

  return (
    <div className="grid grid-cols-1 grid-rows-6 gap-4 pt-2 sm:grid-cols-3 sm:grid-rows-2">
      <VaultTile title="Vault" description={vault} />
      <Suspense fallback={<Skeleton />}>
        <VaultOwner vault={vault} deployment={deployment} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <VaultDenonimationAsset vault={vault} deployment={deployment} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <VaultTotalSupply vault={vault} deployment={deployment} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <VaultGrossShareValue vault={vault} deployment={deployment} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <VaultSharePrice vault={vault} deployment={deployment} />
      </Suspense>
      <VaultTile title="Release" description="Sulu" />
    </div>
  );
}

const numberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const VaultDenonimationAsset = asSyncComponent(async function ({
  deployment,
  vault,
}: { deployment: Deployment; vault: Address }) {
  const network = getNetworkByDeployment(deployment);
  const comptroller = await getVaultComptroller({ vault, network });
  const asset = await getDenominationAsset({ network, comptroller });
  const symbol = await getAssetSymbol({ network, asset });
  return <VaultTile title="Denomination asset" description={symbol} />;
});

const VaultOwner = asSyncComponent(async function ({ deployment, vault }: { deployment: Deployment; vault: Address }) {
  const network = getNetworkByDeployment(deployment);
  const vaultOwner = await getVaultOwner({ vault, network });
  return <VaultTile title="Owner" description={vaultOwner} />;
});

const VaultTotalSupply = asSyncComponent(async function ({
  deployment,
  vault,
}: { deployment: Deployment; vault: Address }) {
  const network = getNetworkByDeployment(deployment);
  const vaultTotalSupply = await getAssetTotalSupply({ asset: vault, network });
  return <VaultTile title="Total supply" description={formatUnits(vaultTotalSupply, 18)} />;
});

const VaultGrossShareValue = asSyncComponent(async function ({
  deployment,
  vault,
}: { deployment: Deployment; vault: Address }) {
  const network = getNetworkByDeployment(deployment);
  const gav = await getVaultGavInAsset({
    vault,
    network,
    asset: getContract(deployment, "Usdc"),
    fundValueCalculatorRouter: getContract(deployment, "FundValueCalculatorRouter"),
  });

  return (
    <VaultTile title="GAV" description={gav === undefined ? "N/A" : numberFormat.format(Number(formatUnits(gav, 6)))} />
  );
});

const VaultSharePrice = asSyncComponent(async function ({
  deployment,
  vault,
}: { deployment: Deployment; vault: Address }) {
  const network = getNetworkByDeployment(deployment);
  const gav = await getVaultSharePriceInAsset({
    vault,
    network,
    asset: getContract(deployment, "Usdc"),
    fundValueCalculatorRouter: getContract(deployment, "FundValueCalculatorRouter"),
  });

  return (
    <VaultTile
      title="Share price"
      description={gav === undefined ? "N/A" : numberFormat.format(Number(formatUnits(gav, 6)))}
    />
  );
});
