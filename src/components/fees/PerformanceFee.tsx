import { asSyncComponent } from "@/lib/next";
import { type Network, ZERO_ADDRESS } from "@/lib/consts";
import { type Address } from "viem";
import { getPerformanceFee } from "@/lib/rpc/getPerformanceFee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PerformanceFee = asSyncComponent(
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
    const result = await getPerformanceFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    // TODO: convert it
    const convertedScaledPerSecondRate = result.feeInfoForFund.rate.toString();
    const highWatermark = result.feeInfoForFund.highWaterMark.toString();
    const recipient =
      result.recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : result.recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">Rate: {convertedScaledPerSecondRate}</p>
          <p className="text-sm font-medium leading-none">High watermark {highWatermark}</p>
          <p className="text-sm font-medium leading-none">Recipient: {recipient}</p>
        </CardContent>
      </Card>
    );
  },
);
