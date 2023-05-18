import { BigIntDisplay } from "../BigIntDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getMinMaxInvestmentPolicySettings } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const MinMaxInvestmentPolicy = asSyncComponent(
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
    const {
      fundSettings: { maxInvestmentAmount, minInvestmentAmount },
    } = await getMinMaxInvestmentPolicySettings(client, {
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Min Max Investment Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium leading-none">
            Max Investment Amount: <BigIntDisplay amount={maxInvestmentAmount} />
          </p>
          <p className="text-sm font-medium leading-none">
            Min Investment Amount: <BigIntDisplay amount={minInvestmentAmount} />
          </p>
        </CardContent>
      </Card>
    );
  },
);
