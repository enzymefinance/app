import { EntranceRateBurnFee } from "@/components/Fees/EntranceRateBurnFee";
import { EntranceRateDirectFee } from "@/components/Fees/EntranceRateDirectFee";
import { ExitRateBurnFee } from "@/components/Fees/ExitRateBurnFee";
import { ExitRateDirectFee } from "@/components/Fees/ExitRateDirectFee";
import { ManagementFee } from "@/components/Fees/ManagementFee";
import { PerformanceFee } from "@/components/Fees/PerformanceFee";
import { Title } from "@/components/Title";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ENTRANCE_RATE_BURN_FEE,
  ENTRANCE_RATE_DIRECT_FEE,
  EXIT_RATE_BURN_FEE,
  EXIT_RATE_DIRECT_FEE,
  MANAGEMENT_FEE,
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

const getFeeComponent = ({
  network,
  comptrollerProxy,
  fee,
}: {
  network: Network;
  comptrollerProxy: Address;
  fee: Address;
}) => {
  switch (fee) {
    case EXIT_RATE_BURN_FEE:
      return <ExitRateBurnFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} />;
    case EXIT_RATE_DIRECT_FEE:
      return <ExitRateDirectFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} />;
    case ENTRANCE_RATE_BURN_FEE:
      return <EntranceRateBurnFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} />;
    case ENTRANCE_RATE_DIRECT_FEE:
      return <EntranceRateDirectFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} />;
    case MANAGEMENT_FEE:
      return <ManagementFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} />;
    case PERFORMANCE_FEE:
      return <PerformanceFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} />;
    default:
      return <>Unknown fee</>;
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
          return <Suspense fallback={<Skeleton />}>{getFeeComponent({ fee, network, comptrollerProxy })}</Suspense>;
        })}
      </div>
    </>
  );
}
