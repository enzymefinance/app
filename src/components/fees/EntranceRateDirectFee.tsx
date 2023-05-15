import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getEntranceRateDirectFee } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const EntranceRateDirectFee = asSyncComponent(
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
    const result = await getEntranceRateDirectFee(client, {
      comptrollerProxy,
      address: fee,
    });

    const rate = result.rateForFund

    return (
      <Card>
        <CardHeader>
          <CardTitle>Entrance Rate Direct Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">Rate: <BigIntDisplay amount={rate} />%</p>
        </CardContent>
      </Card>
    );
  },
);
