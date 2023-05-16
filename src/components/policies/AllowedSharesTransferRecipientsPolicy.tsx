import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAllowedSharesTransferRecipientsList } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const AllowedSharesTransferRecipientsPolicy = asSyncComponent(
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
    const result = await getAllowedSharesTransferRecipientsList(client, {
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Restrict Wallets Permitted To Receive A Share Transfer</CardTitle>
        </CardHeader>
        <CardContent>TODO</CardContent>
      </Card>
    );
  },
);
