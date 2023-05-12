import { asSyncComponent } from "@/lib/next";
import { type Network, ZERO_ADDRESS } from "@/lib/consts";
import { type Address } from "viem";
import { getManagementFee } from "@/lib/rpc/getManagementFee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertScaledPerSecondRateToRate } from "@enzymefinance/sdk";

export const ManagementFee = asSyncComponent(
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
    const result = await getManagementFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    const convertedScaledPerSecondRate = convertScaledPerSecondRateToRate({
      scaledPerSecondRate: result.feeInfoForFund.scaledPerSecondRate,
      adjustInflation: true,
    }).toString()

    const recipient =
      result.recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : result.recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Management Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">Rate: {convertedScaledPerSecondRate}%</p>
          <p className="text-sm font-medium leading-none">Recipient: {recipient}</p>
        </CardContent>
      </Card>
    );
  },
);
