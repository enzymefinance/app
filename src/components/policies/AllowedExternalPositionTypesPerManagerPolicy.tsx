import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAllowedExternalPositionTypesPerManagerPolicy } from "@/lib/rpc/getAllowedExternalPositionTypesPerManager";
import type { Address } from "viem";

export const AllowedExternalPositionTypesPerManagerPolicy = asSyncComponent(
  async ({
    deployment,
    comptrollerProxy,
    policy,
    user,
  }: {
    deployment: Deployment;
    comptrollerProxy: Address;
    policy: Address;
    user: Address;
  }) => {
    const client = getPublicClientForDeployment(deployment);
    const result = await getAllowedExternalPositionTypesPerManagerPolicy(client, {
      comptrollerProxy,
      address: policy,
      user,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>AllowedExternalPositionTypesPerManagerPolicy</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);