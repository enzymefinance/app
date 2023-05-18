import { BigIntDisplay } from "../BigIntDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getCumulativeSlippageTolerancePolicySettings } from "@enzymefinance/sdk";
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
    const { cumulativeSlippage, lastSlippageTimestamp, tolerance } = await getCumulativeSlippageTolerancePolicySettings(
      client,
      {
        comptrollerProxy,
        address: policy,
      },
    );

    return (
      <Card>
        <CardHeader>
          <CardTitle>Cumulative Slippage Tolerance Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium leading-none">
            Cumulative Slippage: <BigIntDisplay amount={cumulativeSlippage} />
          </p>
          <p className="text-sm font-medium leading-none">
            Last Slippage Timestamp: <BigIntDisplay amount={lastSlippageTimestamp} />
          </p>
          <p className="text-sm font-medium leading-none">
            Tollerance: <BigIntDisplay amount={tolerance} />
          </p>
        </CardContent>
      </Card>
    );
  },
);
