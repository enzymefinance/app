import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAllowedDepositRecipientsSettings } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const AllowedDepositRecipintsPolicy = asSyncComponent(
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
    const result = await getAllowedDepositRecipientsSettings(client, {
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Allowed Deposit Recipients Policy</CardTitle>
        </CardHeader>
        <CardContent />
      </Card>
    );
  },
);
