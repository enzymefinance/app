import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Network } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getExitRateDirectFee } from "@/lib/rpc/getExitRateDirectFee";
import { type Address } from "viem";

export const ExitRateDirectFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getExitRateDirectFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Direct Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
