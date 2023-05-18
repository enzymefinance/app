import { BigIntDisplay } from "@/components/BigIntDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Deployment, ZERO_ADDRESS } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAssetDecimals, getAssetSymbol, getDenominationAsset, getPerformanceFeeSettings } from "@enzymefinance/sdk";
import type { Address } from "viem";

export const PerformanceFee = asSyncComponent(
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

    const [
      {
        feeInfoForFund: { rate, highWaterMark },
        recipientForFund,
      },
      denominationAsset,
    ] = await Promise.all([
      getPerformanceFeeSettings(client, {
        comptrollerProxy,
        address: fee,
      }),
      getDenominationAsset(client, {
        comptroller: comptrollerProxy,
      }),
    ]);

    const [symbol, decimals] = await Promise.all([
      getAssetSymbol(client, { asset: denominationAsset }),
      getAssetDecimals(client, { asset: denominationAsset }),
    ]);

    const recipient = recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : recipientForFund;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Rate: <BigIntDisplay amount={rate} decimals={2} />%
          </p>
          <p className="text-sm font-medium leading-none">
            High watermark: <BigIntDisplay amount={highWaterMark} decimals={decimals} /> {symbol}
          </p>
          <p className="text-sm font-medium leading-none">Recipient: {recipient}</p>
        </CardContent>
      </Card>
    );
  },
);
