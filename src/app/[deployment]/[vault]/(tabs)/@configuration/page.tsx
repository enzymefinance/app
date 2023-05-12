import { Title } from "@/components/Title";
import { EntranceRateBurnFee } from "@/components/fees/EntranceRateBurnFee";
import { EntranceRateDirectFee } from "@/components/fees/EntranceRateDirectFee";
import { ExitRateBurnFee } from "@/components/fees/ExitRateBurnFee";
import { ExitRateDirectFee } from "@/components/fees/ExitRateDirectFee";
import { ManagementFee } from "@/components/fees/ManagementFee";
import { MinSharesSupplyFee } from "@/components/fees/MinSharesSupplyFee";
import { PerformanceFee } from "@/components/fees/PerformanceFee";
import { AllowedDepositRecipintsPolicy } from "@/components/policies/AllowedDepositRecipientsPolicy";
import { AllowedSharesTransferRecipientsPolicy } from "@/components/policies/AllowedSharesTransferRecipientsPolicy";
import { MinMaxInvestmentPolicy } from "@/components/policies/MinMaxInvestmentPolicy";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ALLOWED_DEPOSIT_RECIPIENTS_POLICY,
  ALLOWED_SHARES_TRANSFER_RECIPIENTS_POLICY,
  type Deployment,
  ENTRANCE_RATE_BURN_FEE,
  ENTRANCE_RATE_DIRECT_FEE,
  EXIT_RATE_BURN_FEE,
  EXIT_RATE_DIRECT_FEE,
  MANAGEMENT_FEE,
  MIN_MAX_INVESTMENT_POLICY,
  MIN_SHARES_SUPPLY_FEE,
  PERFORMANCE_FEE,
} from "@/lib/consts";
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
}: {
  deployment: Deployment;
  comptrollerProxy: Address;
  fee: Address;
}) {
  switch (fee) {
    case EXIT_RATE_BURN_FEE:
      return <ExitRateBurnFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    case EXIT_RATE_DIRECT_FEE:
      return <ExitRateDirectFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    case ENTRANCE_RATE_BURN_FEE:
      return <EntranceRateBurnFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    case ENTRANCE_RATE_DIRECT_FEE:
      return <EntranceRateDirectFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    case MANAGEMENT_FEE:
      return <ManagementFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    case PERFORMANCE_FEE:
      return <PerformanceFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    case MIN_SHARES_SUPPLY_FEE:
      return <MinSharesSupplyFee fee={fee} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    default:
      return <>Unknown fee</>;
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
    case ALLOWED_DEPOSIT_RECIPIENTS_POLICY:
      return (
        <AllowedDepositRecipintsPolicy policy={policy} deployment={deployment} comptrollerProxy={comptrollerProxy} />
      );
    case ALLOWED_SHARES_TRANSFER_RECIPIENTS_POLICY:
      return (
        <AllowedSharesTransferRecipientsPolicy
          policy={policy}
          deployment={deployment}
          comptrollerProxy={comptrollerProxy}
        />
      );
    case MIN_MAX_INVESTMENT_POLICY:
      return <MinMaxInvestmentPolicy policy={policy} deployment={deployment} comptrollerProxy={comptrollerProxy} />;
    default:
      return <>Unknown Policy</>;
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
      <Title size="xl" appearance="primary">
        Fees
      </Title>
      <div className="space-y-4">
        {enabledFeesForFund.map((fee: Address) => {
          return <Suspense fallback={<Skeleton />}>{getFeeComponent({ deployment, fee, comptrollerProxy })}</Suspense>;
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
