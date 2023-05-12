import { asSyncComponent } from "@/lib/next";
import { type Network, ZERO_ADDRESS } from "@/lib/consts";
import { type Address } from "viem";
import { getExitRateBurnFee } from "@/lib/rpc/getExitRateBurnFee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {BigIntDisplay} from "@/components/BigIntDisplay";

export const ExitRateBurnFee = asSyncComponent(
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
    const result = await getExitRateBurnFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    const rateInKind = result.inKindRateForFund
    const rateSpecificAsset = result.specificAssetsRateForFund
    const recipient =
      result.recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : result.recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Burn Fee</CardTitle>
        </CardHeader>
          <CardContent className="space-y-1">
              <p className="text-sm font-medium leading-none">Rate (in kind): <BigIntDisplay amount={rateInKind} />%</p>
              <p className="text-sm font-medium leading-none">Rate (specific asset): <BigIntDisplay amount={rateSpecificAsset} />%</p>

              <p className="text-sm font-medium leading-none">Recipient: {recipient}</p>
          </CardContent>
      </Card>
    );
  },
);
