import { asSyncComponent } from "@/lib/next";
import { type Network, ZERO_ADDRESS } from "@/lib/consts";
import { type Address } from "viem";
import { getExitRateDirectFee } from "@/lib/rpc/getExitRateDirectFee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ExitRateDirectFee = asSyncComponent(
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
    const result = await getExitRateDirectFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    const rateInKind = result.inKindRateForFund.toString();
    const rateSpecificAsset = result.specificAssetsRateForFund.toString();
    const recipient =
      result.recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : result.recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Rate Direct Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">Rate (in kind): {rateInKind}</p>
          <p className="text-sm font-medium leading-none">Rate (specific asset): {rateSpecificAsset}</p>

          <p className="text-sm font-medium leading-none">Recipient: {recipient}</p>
        </CardContent>
      </Card>
    );
  },
);
