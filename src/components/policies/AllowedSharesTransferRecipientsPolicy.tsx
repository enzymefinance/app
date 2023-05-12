import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Network } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getAllowedSharesTransferRecipientsPolicy } from "@/lib/rpc/getAllowedSharesTransferRecipientsPolicy";
import { type Address } from "viem";

export const AllowedSharesTransferRecipientsPolicy = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    policy,
  }: {
    network: Network;
    comptrollerProxy: Address;
    policy: Address;
  }) => {
    const result = await getAllowedSharesTransferRecipientsPolicy({
      network,
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Allowed Shares Transfer Recipients Policy</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
