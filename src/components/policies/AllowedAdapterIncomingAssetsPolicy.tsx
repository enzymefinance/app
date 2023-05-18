import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAllowedAdapterIncomingAssetsPolicySettings } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const AllowedAdapterIncomingAssetsPolicy = asSyncComponent(
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
    const result = await getAllowedAdapterIncomingAssetsPolicySettings(client, {
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Allowed Adapter Incoming Assets Policy</CardTitle>
        </CardHeader>
        <CardContent />
      </Card>
    );
  },
);
