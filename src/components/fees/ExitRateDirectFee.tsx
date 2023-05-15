import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Deployment, ZERO_ADDRESS } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import type { Address } from "viem";
import { getExitRateDirectFee } from "@enzymefinance/sdk";
import { BigIntDisplay } from "@/components/BigIntDisplay";

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
    const result = await getExitRateDirectFee(client, {
      comptrollerProxy,
      address: fee,
    });
    const rateInKind = result.inKindRateForFund;
    const rateSpecificAsset = result.specificAssetsRateForFund;
    const recipient = result.recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : result.recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Direct Fee</CardTitle>
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
