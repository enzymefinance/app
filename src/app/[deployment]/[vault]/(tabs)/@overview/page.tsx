import { VaultTile } from "@/components/VaultTile";
import { Skeleton } from "@/components/ui/skeleton";
import { type Deployment, getContract } from "@/lib/consts";
import { formatNumber } from "@/lib/format";
import { asSyncComponent } from "@/lib/next";
import { assertParams } from "@/lib/params";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { z } from "@/lib/zod";
import { getAssetSymbol } from "@enzymefinance/sdk";
import { getAssetTotalSupply } from "@enzymefinance/sdk";
import { getDenominationAsset } from "@enzymefinance/sdk";
import { getVaultComptroller } from "@enzymefinance/sdk";
import { getVaultGavInAsset } from "@enzymefinance/sdk";
import { getVaultOwner } from "@enzymefinance/sdk";
import { getVaultSharePriceInAsset } from "@enzymefinance/sdk";
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

const VaultDenonimationAsset = asSyncComponent(async function ({
  deployment,
  vault,
}: {
  deployment: Deployment;
  vault: Address;
}) {
  const client = getPublicClientForDeployment(deployment);
  const comptroller = await getVaultComptroller(client, { vault });
  const asset = await getDenominationAsset(client, { comptroller });
  const symbol = await getAssetSymbol(client, { asset });
  return <VaultTile title="Denomination asset" description={symbol} />;
});

const VaultOwner = asSyncComponent(async function ({
  deployment,
  vault,
}: {
  deployment: Deployment;
  vault: Address;
}) {
  const client = getPublicClientForDeployment(deployment);
  const vaultOwner = await getVaultOwner(client, { vault });
  return <VaultTile title="Owner" description={vaultOwner} />;
});

const VaultTotalSupply = asSyncComponent(async function ({
  deployment,
  vault,
}: {
  deployment: Deployment;
  vault: Address;
}) {
  const client = getPublicClientForDeployment(deployment);
  const vaultTotalSupply = await getAssetTotalSupply(client, { asset: vault });
  return <VaultTile title="Total supply" description={formatUnits(vaultTotalSupply, 18)} />;
});

const VaultGrossShareValue = asSyncComponent(async function ({
  deployment,
  vault,
}: {
  deployment: Deployment;
  vault: Address;
}) {
  const client = getPublicClientForDeployment(deployment);
  const gav = await getVaultGavInAsset(client, {
    vault,
    asset: getContract(deployment, "Usdc"),
    fundValueCalculatorRouter: getContract(deployment, "FundValueCalculatorRouter"),
  });

  return <VaultTile title="GAV" description={gav === undefined ? "N/A" : formatNumber({ amount: gav, decimals: 6 })} />;
});

const VaultSharePrice = asSyncComponent(async function ({
  deployment,
  vault,
}: {
  deployment: Deployment;
  vault: Address;
}) {
  const client = getPublicClientForDeployment(deployment);
  const gav = await getVaultSharePriceInAsset(client, {
    vault,
    asset: getContract(deployment, "Usdc"),
    fundValueCalculatorRouter: getContract(deployment, "FundValueCalculatorRouter"),
  });

  return (
    <VaultTile
      title="Share price"
      description={gav === undefined ? "N/A" : formatNumber({ amount: gav, decimals: 6 })}
    />
  );
});
