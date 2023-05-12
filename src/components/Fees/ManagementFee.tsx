import { asSyncComponent } from "@/lib/next";
import { type Network } from "@/lib/consts";
import { type Address } from "viem";
import { getManagementFee } from "@/lib/rpc/getManagementFee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ManagementFee = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    fee,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
  }) => {
    const result = await getManagementFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Management Fee</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
