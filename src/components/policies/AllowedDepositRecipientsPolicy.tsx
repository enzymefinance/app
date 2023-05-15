import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAllowedDepositRecipientsLists } from "@enzymefinance/sdk";
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
    const result = await getAllowedDepositRecipientsLists(client, {
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Allowed Deposit Recipients Policy</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
