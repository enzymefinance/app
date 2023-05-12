import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Network } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getMinMaxInvestmentPolicy } from "@/lib/rpc/getMinMaxInvestmentPolicy";
import { type Address } from "viem";

export const MinMaxInvestmentPolicy = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    policy,
  }: {
    network: Network;
    comptrollerProxy: Address;
    policy: Address;
  }) => {
    const result = await getMinMaxInvestmentPolicy({
      network,
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Min Max Investment Policy</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
