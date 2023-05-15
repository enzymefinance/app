import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getEntranceRateBurnFee } from "@enzymefinance/sdk";
import type { Address } from "viem";
import { BigIntDisplay } from "@/components/BigIntDisplay";

export const EntranceRateBurnFee = asSyncComponent(
  async ({
    deployment,
    comptrollerProxy,
    fee,
    feeManager,
  }: {
    deployment: Deployment;
    comptrollerProxy: Address;
    fee: Address;
    feeManager: Address;
  }) => {
    const client = getPublicClientForDeployment(deployment);
    const result = await getEntranceRateBurnFee(client, {
      comptrollerProxy,
      address: fee,
    });

    const rate = result.rateForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Entrance Rate Burn Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Rate: <BigIntDisplay amount={rate} decimals={2} />%
          </p>
        </CardContent>
      </Card>
    );
  },
);
