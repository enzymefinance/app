import { Title } from "@/components/Title";
import { EntranceRateBurnFee } from "@/components/fees/EntranceRateBurnFee";
import { EntranceRateDirectFee } from "@/components/fees/EntranceRateDirectFee";
import { ExitRateBurnFee } from "@/components/fees/ExitRateBurnFee";
import { ExitRateDirectFee } from "@/components/fees/ExitRateDirectFee";
import { ManagementFee } from "@/components/fees/ManagementFee";
import { MinSharesSupplyFee } from "@/components/fees/MinSharesSupplyFee";
import { PerformanceFee } from "@/components/fees/PerformanceFee";
import { UnknownFee } from "@/components/fees/UnknownFee";
import { AllowedAdapterIncomingAssetsPolicy } from "@/components/policies/AllowedAdapterIncomingAssetsPolicy";
import { AllowedAdaptersPerManager } from "@/components/policies/AllowedAdaptersPerManager";
import { AllowedAdaptersPolicy } from "@/components/policies/AllowedAdaptersPolicy";
import { AllowedAssetsForRedemptionPolicy } from "@/components/policies/AllowedAssetsForRedemptionPolicy";
import { AllowedDepositRecipintsPolicy } from "@/components/policies/AllowedDepositRecipientsPolicy";
import { AllowedExternalPositionTypesPerManagerPolicy } from "@/components/policies/AllowedExternalPositionTypesPerManagerPolicy";
import { AllowedExternalPositionTypesPolicy } from "@/components/policies/AllowedExternalPositionTypesPolicy";
import { AllowedSharesTransferRecipientsPolicy } from "@/components/policies/AllowedSharesTransferRecipientsPolicy";
import { CumulativeSlippageTolerancePolicy } from "@/components/policies/CumulativeSlippageTolerancePolicy";
import { MinAssetBalancesPostRedemptionPolicy } from "@/components/policies/MinAssetBalancesPostRedemptionPolicy";
import { MinMaxInvestmentPolicy } from "@/components/policies/MinMaxInvestmentPolicy";
import { OnlyRemoveDustExternalPositionPolicy } from "@/components/policies/OnlyRemoveDustExternalPositionPolicy";
import { OnlyUntrackDustOrPricelessAssets } from "@/components/policies/OnlyUntrackDustOrPricelessAssets";
import { UnknownPolicy } from "@/components/policies/UnknownPolicy";
import { Skeleton } from "@/components/ui/skeleton";
import type { Deployment } from "@/lib/consts";
import { getContract } from "@/lib/consts";
import { assertParams } from "@/lib/params";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { z } from "@/lib/zod";
import { getEnabledFeesForFund } from "@enzymefinance/sdk";
import { getEnabledPoliciesForFund } from "@enzymefinance/sdk";
import { getFeeManager } from "@enzymefinance/sdk";
import { getPolicyManager } from "@enzymefinance/sdk";
import { getVaultComptroller } from "@enzymefinance/sdk";
import { Suspense } from "react";
import type { Address } from "viem";

function getFeeComponent({
  deployment,
  comptrollerProxy,
  fee,
  feeManager,
}: {
  deployment: Deployment;
  comptrollerProxy: Address;
  fee: Address;
  feeManager: Address;
}) {
  switch (fee) {
    case getContract(deployment, "ExitRateBurnFee"):
      return (
        <ExitRateBurnFee
          fee={fee}
          deployment={deployment}
          comptrollerProxy={comptrollerProxy}
          feeManager={feeManager}
        />
      );
    case getContract(deployment, "ExitRateDirectFee"):
      return (
        <ExitRateDirectFee
          fee={fee}
          deployment={deployment}
          comptrollerProxy={comptrollerProxy}
          feeManager={feeManager}
        />
      );
    case getContract(deployment, "EntranceRateBurnFee"):
      return <EntranceRateBurnFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    case getContract(deployment, "EntranceRateDirectFee"):
      return <EntranceRateDirectFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    case getContract(deployment, "ManagementFee"):
      return (
        <ManagementFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} feeManager={feeManager} />
      );
    case getContract(deployment, "PerformanceFee"):
      return (
        <PerformanceFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} feeManager={feeManager} />
      );
    case getContract(deployment, "MinSharesSupplyFee"):
      return <MinSharesSupplyFee />;
    default:
      return <UnknownFee />;
  }
}

function getPolicyComponent({
  deployment,
  comptrollerProxy,
  policy,
}: {
  deployment: Deployment;
  comptrollerProxy: Address;
  policy: Address;
}) {
  switch (policy) {
    case getContract(deployment, "AllowedDepositRecipientsPolicy"):
      return (
        <AllowedDepositRecipintsPolicy policy={policy} deployment={deployment} comptrollerProxy={comptrollerProxy} />
      );
    case getContract(deployment, "AllowedSharesTransferRecipientsPolicy"):
      return (
        <AllowedSharesTransferRecipientsPolicy
          policy={policy}
          deployment={deployment}
          comptrollerProxy={comptrollerProxy}
        />
      );
    case getContract(deployment, "MinMaxInvestmentPolicy"):
      return <MinMaxInvestmentPolicy policy={policy} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    case getContract(deployment, "AllowedAdapterIncomingAssetsPolicy"):
      return (
        <AllowedAdapterIncomingAssetsPolicy
          policy={policy}
          deployment={deployment}
          comptrollerProxy={comptrollerProxy}
        />
      );
    case getContract(deployment, "AllowedAdaptersPolicy"):
      return <AllowedAdaptersPolicy policy={policy} deployment={deployment} comptrollerProxy={comptrollerProxy} />;

    case getContract(deployment, "AllowedAdaptersPerManager"):
      return <AllowedAdaptersPerManager />;

    case getContract(deployment, "AllowedAssetsForRedemptionPolicy"):
      return (
        <AllowedAssetsForRedemptionPolicy policy={policy} deployment={deployment} comptrollerProxy={comptrollerProxy} />
      );

    case getContract(deployment, "AllowedExternalPositionTypesPerManagerPolicy"):
      return <AllowedExternalPositionTypesPerManagerPolicy />;

    case getContract(deployment, "AllowedExternalPositionTypesPolicy"):
      return <AllowedExternalPositionTypesPolicy />;

    case getContract(deployment, "CumulativeSlippageTolerancePolicy"):
      return (
        <CumulativeSlippageTolerancePolicy
          policy={policy}
          deployment={deployment}
          comptrollerProxy={comptrollerProxy}
        />
      );

    case getContract(deployment, "MinAssetBalancesPostRedemptionPolicy"):
      return <MinAssetBalancesPostRedemptionPolicy />;

    case getContract(deployment, "OnlyRemoveDustExternalPositionPolicy"):
      return <OnlyRemoveDustExternalPositionPolicy />;

    case getContract(deployment, "OnlyUntrackDustOrPricelessAssets"):
      return <OnlyUntrackDustOrPricelessAssets />;
    default:
      return <UnknownPolicy />;
  }
}

export default async function ConfigurationPage({
  params,
}: {
  params: {
    deployment: string;
    vault: string;
  };
}) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const client = getPublicClientForDeployment(deployment);
  const comptrollerProxy = await getVaultComptroller(client, { vault });
  const feeManager = await getFeeManager(client, { comptrollerProxy });
  const enabledFeesForFund = await getEnabledFeesForFund(client, { comptrollerProxy, feeManager });
  const policyManager = await getPolicyManager(client, { comptrollerProxy });
  const enabledPoliciesForFund = await getEnabledPoliciesForFund(client, {
    comptroller: comptrollerProxy,
    policyManager,
  });

  return (
    <>
      {enabledFeesForFund.length > 0 ? (
        <Title size="xl" appearance="primary">
          Fees
        </Title>
      ) : null}
      <div className="space-y-4">
        {enabledFeesForFund.map((fee: Address) => {
          return (
            <Suspense fallback={<Skeleton />}>
              {getFeeComponent({ deployment, fee, comptrollerProxy, feeManager })}
            </Suspense>
          );
        })}
      </div>

      <Title size="xl" appearance="primary">
        Policies
      </Title>
      <div className="space-y-4">
        {enabledPoliciesForFund.map((policy: Address) => {
          return (
            <Suspense fallback={<Skeleton />}>{getPolicyComponent({ deployment, policy, comptrollerProxy })}</Suspense>
          );
        })}
      </div>
    </>
  );
}
