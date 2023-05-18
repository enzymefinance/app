import { BigIntDisplay } from "@/components/BigIntDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Deployment, ZERO_ADDRESS } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getExitRateDirectFeeSettings } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const ExitRateDirectFee = asSyncComponent(
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
    const result = await getExitRateDirectFeeSettings(client, {
      comptrollerProxy,
      address: fee,
    });

    const rateInKind = result.inKindRateForFund;
    const rateSpecificAsset = result.specificAssetsRateForFund;
    const recipient =
      result.recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : result.recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Direct Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Rate (in kind): <BigIntDisplay amount={rateInKind} decimals={2} />%
          </p>
          <p className="text-sm font-medium leading-none">
            Rate (specific asset): <BigIntDisplay amount={rateSpecificAsset} decimals={2} />%
          </p>
          <p className="text-sm font-medium leading-none">Recipient: {recipient.toLowerCase()}</p>
        </CardContent>
      </Card>
    );
  },
);
