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
    feeManager,
  }: {
    network: Network;
    comptrollerProxy: Address;
    fee: Address;
    feeManager: Address;
  }) => {
    const result = await getEntranceRateBurnFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    const rate = result.rateForFund.toString();

    return (
      <Card>
        <CardHeader>
          <CardTitle>Entrance Rate Burn Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">Rate: {rate}</p>
        </CardContent>
      </Card>
    );
  },
);
