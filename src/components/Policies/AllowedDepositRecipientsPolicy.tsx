import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Network } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getAllowedDepositRecipientsPolicy } from "@/lib/rpc/getAllowedDepositRecipientsPolicy";
import { type Address } from "viem";

export const AllowedDepositRecipintsPolicy = asSyncComponent(
  async ({
    network,
    comptrollerProxy,
    policy,
  }: {
    network: Network;
    comptrollerProxy: Address;
    policy: Address;
  }) => {
    const result = await getAllowedDepositRecipientsPolicy({
      network,
      comptrollerProxy,
      address: policy,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Allowed Deposit Recipients Policy</CardTitle>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    );
  },
);
