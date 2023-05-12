import { asSyncComponent } from "@/lib/next";
import { type Network } from "@/lib/consts";
import { type Address } from "viem";
import { getPerformanceFee } from "@/lib/rpc/getPerformanceFee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PerformanceFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getPerformanceFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
