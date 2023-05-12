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
  ENTRANCE_RATE_BURN_FEE,
  ENTRANCE_RATE_DIRECT_FEE,
  EXIT_RATE_BURN_FEE,
  EXIT_RATE_DIRECT_FEE,
  MANAGEMENT_FEE,
  MIN_SHARES_SUPPLY_FEE,
  type Network,
  PERFORMANCE_FEE,
} from "@/lib/consts";
import {
  ALLOWED_DEPOSIT_RECIPIENTS_POLICY,
  ALLOWED_SHARES_TRANSFER_RECIPIENTS_POLICY,
  MIN_MAX_INVESTMENT_POLICY,
  getNetworkByDeployment,
} from "@/lib/consts";
import { assertParams } from "@/lib/params";
import { getEnabledFeesForFund } from "@/lib/rpc/getEnabledFeesForFund";
import { getEnabledPoliciesForFund } from "@/lib/rpc/getEnabledPoliciesForFund";
import { getFeeManager } from "@/lib/rpc/getFeeManager";
import { getPolicyManager } from "@/lib/rpc/getPolicyManager";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
import { z } from "@/lib/zod";
import { Suspense } from "react";
import type { Address } from "viem";
import { UnknownFee } from "@/components/fees/UnknownFee";

const getFeeComponent = ({
  network,
  comptrollerProxy,
  fee,
  feeManager,
}: {
  network: Network;
  comptrollerProxy: Address;
  fee: Address;
  feeManager: Address;
}) => {
  switch (fee) {
    case EXIT_RATE_BURN_FEE:
      return (
        <ExitRateBurnFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} feeManager={feeManager} />
      );
    case EXIT_RATE_DIRECT_FEE:
      return (
        <ExitRateDirectFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} feeManager={feeManager} />
      );
    case ENTRANCE_RATE_BURN_FEE:
      return (
        <EntranceRateBurnFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} feeManager={feeManager} />
      );
    case ENTRANCE_RATE_DIRECT_FEE:
      return (
        <EntranceRateDirectFee
          fee={fee}
          network={network}
          comptrollerProxy={comptrollerProxy}
          feeManager={feeManager}
        />
      );
    case MANAGEMENT_FEE:
      return <ManagementFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} feeManager={feeManager} />;
    case PERFORMANCE_FEE:
      return <PerformanceFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} feeManager={feeManager} />;
    case MIN_SHARES_SUPPLY_FEE:
      return (
        <MinSharesSupplyFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} feeManager={feeManager} />
      );
    default:
      return <UnknownFee />;
  }
};

const getPolicyComponent = ({
  network,
  comptrollerProxy,
  policy,
}: {
  network: Network;
  comptrollerProxy: Address;
  policy: Address;
}) => {
  switch (policy) {
    case ALLOWED_DEPOSIT_RECIPIENTS_POLICY:
      return <AllowedDepositRecipintsPolicy policy={policy} network={network} comptrollerProxy={comptrollerProxy} />;
    case ALLOWED_SHARES_TRANSFER_RECIPIENTS_POLICY:
      return (
        <AllowedSharesTransferRecipientsPolicy policy={policy} network={network} comptrollerProxy={comptrollerProxy} />
      );
    case MIN_MAX_INVESTMENT_POLICY:
      return <MinMaxInvestmentPolicy policy={policy} network={network} comptrollerProxy={comptrollerProxy} />;
    default:
      return <>Unknown Policy</>;
  }
};

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

  const network = getNetworkByDeployment(deployment);

  const comptrollerProxy = await getVaultComptroller({ network, vault });

  const feeManager = await getFeeManager({ network, comptrollerProxy });

  const enabledFeesForFund = await getEnabledFeesForFund({
    network,
    comptrollerProxy,
    feeManager,
  });

  const policyManager = await getPolicyManager({ network, comptrollerProxy });

  const enabledPoliciesForFund = await getEnabledPoliciesForFund({
    network,
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
          return (
            <Suspense fallback={<Skeleton />}>
              {getFeeComponent({ fee, network, comptrollerProxy, feeManager })}
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
            <Suspense fallback={<Skeleton />}>{getPolicyComponent({ policy, network, comptrollerProxy })}</Suspense>
          );
        })}
      </div>
    </>
  );
}
