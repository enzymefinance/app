import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAllowedAdaptersPolicy } from "@/lib/rpc/getAllowedAdaptersPolicy";
import type { Address } from "viem";

export const AllowedAdaptersPolicy = asSyncComponent(
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
    const result = await getAllowedAdaptersPolicy(client, {
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Limit Adapters To A Specified List</CardTitle>
        </CardHeader>
        <CardContent>TODO</CardContent>
      </Card>
    );
  },
);
