import { asSyncComponent } from "@/lib/next";
import { type Network } from "@/lib/consts";
import { type Address } from "viem";
import { getExitRateDirectFee } from "@/lib/rpc/getExitRateDirectFee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
