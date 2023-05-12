import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Network } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getEntranceRateDirectFee } from "@/lib/rpc/getEntranceRateDirectFee";
import { type Address } from "viem";
import {BigIntDisplay} from "@/components/BigIntDisplay";

export const EntranceRateDirectFee = asSyncComponent(
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
    const result = await getEntranceRateDirectFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    const rate = result.rateForFund

    return (
      <Card>
        <CardHeader>
          <CardTitle>Entrance Rate Direct Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">Rate: <BigIntDisplay amount={rate} />%</p>
        </CardContent>
      </Card>
    );
  },
);
