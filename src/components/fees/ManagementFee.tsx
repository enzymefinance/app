import { BigIntDisplay } from "@/components/BigIntDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Deployment, ZERO_ADDRESS } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { convertScaledPerSecondRateToRate } from "@enzymefinance/sdk";
import { getManagementFee } from "@enzymefinance/sdk";
import type { Address } from "viem";

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
    const {
      feeInfoForFund: { scaledPerSecondRate },
      recipientForFund,
    } = await getManagementFee(client, {
      comptrollerProxy,
      address: fee,
    });

    const convertedScaledPerSecondRate = convertScaledPerSecondRateToRate({
      scaledPerSecondRate,
      adjustInflation: true,
    });

    const recipient = recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Management Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Rate: <BigIntDisplay amount={convertedScaledPerSecondRate} decimals={16} />%
          </p>
          <p className="text-sm font-medium leading-none">Recipient: {recipient}</p>
        </CardContent>
      </Card>
    );
  },
);
