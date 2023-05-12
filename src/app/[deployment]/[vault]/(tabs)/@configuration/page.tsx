import { Skeleton } from "@/components/ui/skeleton";
import { type Network, getNetworkByDeployment, MIN_SHARES_SUPPLY_FEE } from "@/lib/consts";
import {
  ENTRANCE_RATE_BURN_FEE,
  ENTRANCE_RATE_DIRECT_FEE,
  EXIT_RATE_BURN_FEE,
  EXIT_RATE_DIRECT_FEE,
  MANAGEMENT_FEE,
  PERFORMANCE_FEE,
} from "@/lib/consts";
import { assertParams } from "@/lib/params";
import { getEnabledFeesForFund } from "@/lib/rpc/getEnabledFeesForFund";
import { getFeeManager } from "@/lib/rpc/getFeeManager";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
import { z } from "@/lib/zod";
import { Suspense } from "react";
import type { Address } from "viem";
import { Title } from "@/components/Title";
import { ExitRateBurnFee } from "@/components/Fees/ExitRateBurnFee";
import { ExitRateDirectFee } from "@/components/Fees/ExitRateDirectFee";
import { EntranceRateBurnFee } from "@/components/Fees/EntranceRateBurnFee";
import { EntranceRateDirectFee } from "@/components/Fees/EntranceRateDirectFee";
import { ManagementFee } from "@/components/Fees/ManagementFee";
import { PerformanceFee } from "@/components/Fees/PerformanceFee";
import { MinSharesSupplyFee } from "@/components/Fees/MinSharesSupplyFee";
import { UnknownFee } from "@/components/Fees/UnknownFee";

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
      return <MinSharesSupplyFee fee={fee} network={network} comptrollerProxy={comptrollerProxy} />;
    default:
      return <UnknownFee />;
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

  return (
    <>
      {enabledFeesForFund.length > 0 ? (
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
        </>
      ) : null}
    </>
  );
}
