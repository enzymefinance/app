import { asSyncComponent } from "@/lib/next";
import { type Deployment, ZERO_ADDRESS } from "@/lib/consts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BigIntDisplay } from "@/components/BigIntDisplay";
import { getPublicClientForDeployment } from "@/lib/rpc";
import type { Address } from "viem";
import { getExitRateBurnFee } from "@enzymefinance/sdk";

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
    const result = await getExitRateBurnFee(client, {
      comptrollerProxy,
      address: fee,
    });

    const rateInKind = result.inKindRateForFund;
    const rateSpecificAsset = result.specificAssetsRateForFund;
    const recipient = result.recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : result.recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Burn Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Rate (in kind): <BigIntDisplay amount={rateInKind} />%
          </p>
          <p className="text-sm font-medium leading-none">
            Rate (specific asset): <BigIntDisplay amount={rateSpecificAsset} />%
          </p>

          <p className="text-sm font-medium leading-none">Recipient: {recipient}</p>
        </CardContent>
      </Card>
    );
  },
);
