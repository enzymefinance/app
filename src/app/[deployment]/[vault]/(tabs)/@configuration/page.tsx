import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { asSyncComponent } from "@/lib/next";
import { assertParams } from "@/lib/params";
import { getAllowedDepositRecipientsPolicy } from "@/lib/rpc/getAllowedDepositRecipientsPolicy";
import { getAllowedSharesTransferRecipientsPolicy } from "@/lib/rpc/getAllowedSharesTransferRecipientsPolicy";
import { getEnabledFeesForFund } from "@/lib/rpc/getEnabledFeesForFund";
import { getEnabledPoliciesForFund } from "@/lib/rpc/getEnabledPoliciesForFund";
import { getEntranceRateBurnFee } from "@/lib/rpc/getEntranceRateBurnFee";
import { getEntranceRateDirectFee } from "@/lib/rpc/getEntranceRateDirectFee";
import { getExitRateBurnFee } from "@/lib/rpc/getExitRateBurnFee";
import { getExitRateDirectFee } from "@/lib/rpc/getExitRateDirectFee";
import { getFeeManager } from "@/lib/rpc/getFeeManager";
import { getManagementFee } from "@/lib/rpc/getManagementFee";
import { getMinMaxInvestmentPolicy } from "@/lib/rpc/getMinMaxInvestmentPolicy";
import { getPerformanceFee } from "@/lib/rpc/getPerformanceFee";
import { getPolicyManager } from "@/lib/rpc/getPolicyManager";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
import { z } from "@/lib/zod";
import { Suspense } from "react";
import type { Address } from "viem";

const ExitRateBurnFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getExitRateBurnFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Burn Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);

const ExitRateDirectFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getExitRateDirectFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Direct Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);

const EntranceRateBurnFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getEntranceRateBurnFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Entrance Rate Burn Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);

const EntranceRateDirectFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getEntranceRateDirectFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Entrance Rate Direct Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);

const PerformanceFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getPerformanceFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);

const ManagementFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getManagementFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Management Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);

const getfeeComponent = ({
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
      <h2>Configuration</h2>
      <p>TODO</p>
      {enabledFeesForFund.map((fee: Address) => {
        return <Suspense fallback={<Skeleton />}>{getfeeComponent({ fee, network, comptrollerProxy })}</Suspense>;
      })}
    </>
  );
}
