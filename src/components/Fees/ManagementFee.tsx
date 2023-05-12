import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Network } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getManagementFee } from "@/lib/rpc/getManagementFee";
import { type Address } from "viem";

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
