import { asSyncComponent } from "@/lib/next";
import { type Network, ZERO_ADDRESS } from "@/lib/consts";
import { type Address } from "viem";
import { getPerformanceFee } from "@/lib/rpc/getPerformanceFee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {BigIntDisplay} from "@/components/BigIntDisplay";
import {getDenominationAsset} from "@/lib/rpc/getDenominationAsset";
import {getAssetSymbol} from "@/lib/rpc/getAssetSymbol";
import {getAssetDecimals} from "@/lib/rpc/getAssetDecimals";

export const PerformanceFee = asSyncComponent(
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
    const result = await getPerformanceFee({
      network,
      comptrollerProxy,
      address: fee,
    });

    const denominationAsset = await  getDenominationAsset({ network, comptroller: comptrollerProxy})

      const symbol = await getAssetSymbol({network, asset: denominationAsset})

      const decimals = await getAssetDecimals({network, asset: denominationAsset})

    const rate = result.feeInfoForFund.rate;
    const highWatermark = result.feeInfoForFund.highWaterMark
    const recipient =
      result.recipientForFund === ZERO_ADDRESS ? `${feeManager} (Vault Owner)` : result.recipientForFund;


    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm font-medium leading-none">Rate: <BigIntDisplay amount={rate} decimals={0} />%</p>
          <p className="text-sm font-medium leading-none">High watermark: <BigIntDisplay amount={highWatermark} decimals={decimals} /> {symbol}</p>
          <p className="text-sm font-medium leading-none">Recipient: {recipient}</p>
        </CardContent>
      </Card>
    );
  },
);
