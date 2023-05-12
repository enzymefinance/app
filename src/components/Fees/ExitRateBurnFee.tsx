import { asSyncComponent } from "@/lib/next";
import { type Network } from "@/lib/consts";
import { type Address } from "viem";
import { getExitRateBurnFee } from "@/lib/rpc/getExitRateBurnFee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ExitRateBurnFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getExitRateBurnFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Burn Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
