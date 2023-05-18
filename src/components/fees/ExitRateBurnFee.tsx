import { BigIntDisplay } from "@/components/BigIntDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Deployment, ZERO_ADDRESS } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getExitRateBurnFeeSettings } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const ExitRateBurnFee = asSyncComponent(
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
    const { inKindRateForFund, specificAssetsRateForFund, recipientForFund } = await getExitRateBurnFeeSettings(
      client,
      {
        comptrollerProxy,
        address: fee,
      },
    );
    const recipient = recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Burn Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Rate (in kind): <BigIntDisplay amount={inKindRateForFund} decimals={2} />%
          </p>
          <p className="text-sm font-medium leading-none">
            Rate (specific asset): <BigIntDisplay amount={specificAssetsRateForFund} decimals={2} />%
          </p>

          <p className="text-sm font-medium leading-none">Recipient: {recipient}</p>
        </CardContent>
      </Card>
    );
  },
);
