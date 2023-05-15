import { asSyncComponent } from "@/lib/next";
import { type Deployment, ZERO_ADDRESS } from "@/lib/consts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertScaledPerSecondRateToRate } from "@enzymefinance/sdk";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { BigIntDisplay } from "@/components/BigIntDisplay";
import type { Address } from "viem";
import { getManagementFee } from "@enzymefinance/sdk";

export const ManagementFee = asSyncComponent(
  async ({
    deployment,
    comptrollerProxy,
    fee,
    feeManager,
  }: {
    deployment: Deployment;
    comptrollerProxy: Address;
    fee: Address;
    feeManager: Address;
  }) => {
    const client = getPublicClientForDeployment(deployment);
    const result = await getManagementFee(client, {
      comptrollerProxy,
      address: fee,
    });

    const convertedScaledPerSecondRate = convertScaledPerSecondRateToRate({
      scaledPerSecondRate: result.feeInfoForFund.scaledPerSecondRate,
      adjustInflation: true,
    });

    const recipient =
      result.recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : result.recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Management Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Rate: <BigIntDisplay amount={convertedScaledPerSecondRate} decimals={16} />%
          </p>
          <p className="text-sm font-medium leading-none">Recipient: {recipient.toLowerCase()}</p>
        </CardContent>
      </Card>
    );
  },
);
