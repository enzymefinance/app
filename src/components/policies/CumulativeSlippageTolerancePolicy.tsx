import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getCumulativeSlippageTolerancePolicy } from "@/lib/rpc/getCumulativeSlippageTolerancePolicy";
import type { Address } from "viem";

export const CumulativeSlippageTolerancePolicy = asSyncComponent(
  async ({
    deployment,
    comptrollerProxy,
    policy,
  }: {
    deployment: Deployment;
    comptrollerProxy: Address;
    policy: Address;
  }) => {
    const client = getPublicClientForDeployment(deployment);
    const result = await getCumulativeSlippageTolerancePolicy(client, {
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Cumulative Slippage Tolerance Policy</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
