import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAllowedExternalPositionTypesPolicy } from "@/lib/rpc/getAllowedExternalPositionTypesPolicy";
import type { Address } from "viem";

export const AllowedExternalPositionTypesPolicy = asSyncComponent(
  async ({
    deployment,
    comptrollerProxy,
    policy,
    externalPositionTypeId,
  }: {
    deployment: Deployment;
    comptrollerProxy: Address;
    policy: Address;
    externalPositionTypeId: bigint;
  }) => {
    const client = getPublicClientForDeployment(deployment);
    const result = await getAllowedExternalPositionTypesPolicy(client, {
      comptrollerProxy,
      address: policy,
      externalPositionTypeId,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Allowed External Position Types Policy</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
