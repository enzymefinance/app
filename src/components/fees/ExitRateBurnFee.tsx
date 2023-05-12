import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getExitRateBurnFee } from "@enzymefinance/sdk";
import { type Address } from "viem";

export const ExitRateBurnFee = asSyncComponent(
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
    const result = await getExitRateBurnFee(client, {
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
