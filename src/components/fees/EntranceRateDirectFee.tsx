import { BigIntDisplay } from "@/components/BigIntDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getEntranceRateDirectFeeSettings } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const EntranceRateDirectFee = asSyncComponent(
  async ({
    deployment,
    comptrollerProxy,
    fee,
  }: {
    deployment: Deployment;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const client = getPublicClientForDeployment(deployment);
    const { rateForFund } = await getEntranceRateDirectFeeSettings(client, {
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Entrance Rate Direct Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Rate: <BigIntDisplay amount={rateForFund} />%
          </p>
        </CardContent>
      </Card>
    );
  },
);
