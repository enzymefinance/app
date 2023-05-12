import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Network } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getEntranceRateBurnFee } from "@/lib/rpc/getEntranceRateBurnFee";
import { type Address } from "viem";

export const EntranceRateBurnFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getEntranceRateBurnFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Entrance Rate Burn Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
