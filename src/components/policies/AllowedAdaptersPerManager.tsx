import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getIAllowedAdaptersPerManagerPolicy } from "@/lib/rpc/getAllowedAdaptersPerManager";
import type { Address } from "viem";

export const AllowedAdaptersPerManager = asSyncComponent(
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
    const result = await getIAllowedAdaptersPerManagerPolicy(client, {
      comptrollerProxy,
      address: policy,
      user,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>AllowedAdaptersPerManager</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
