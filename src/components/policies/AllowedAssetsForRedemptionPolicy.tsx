import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAllowedAssetsForRedemptionPolicySettings } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const AllowedAssetsForRedemptionPolicy = asSyncComponent(
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
    const result = await getAllowedAssetsForRedemptionPolicySettings(client, {
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Allowed Assets For Redemption Policy</CardTitle>
        </CardHeader>
        <CardContent />
      </Card>
    );
  },
);
