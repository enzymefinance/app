import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deployment } from "@/lib/consts";
import { asSyncComponent } from "@/lib/next";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { getAssetDecimals, getAssetSymbol, getDenominationAsset, getMinMaxInvestmentPolicy } from "@enzymefinance/sdk";
import type { Address } from "viem";
import { BigIntDisplay } from "@/components/BigIntDisplay";

export const MinMaxInvestmentPolicy = asSyncComponent(
  async ({
    deployment,
    comptrollerProxy,
    policy,
  }: {
    deployment: Deployment;
    comptrollerProxy: Address;
    policy: Address;
  }) => {
    const client = getPublicClientForDeployment(deployment);
    const result = await getMinMaxInvestmentPolicy(client, {
      comptrollerProxy,
      address: policy,
    });

    const denominationAsset = await getDenominationAsset(client, {
      comptroller: comptrollerProxy,
    });
    const symbol = await getAssetSymbol(client, {
      asset: denominationAsset,
    });

    const decimals = await getAssetDecimals(client, {
      asset: denominationAsset,
    });

    const min = result.fundSettings.minInvestmentAmount;
    const max = result.fundSettings.maxInvestmentAmount;

    const isMin = Number(min) > 0;
    const isMax = Number(max) > 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Deposit Limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {isMin ? (
            <p className="text-sm font-medium leading-none">
              Minimum: <BigIntDisplay amount={min} decimals={decimals} /> {symbol}
            </p>
          ) : null}
          {isMax ? (
            <p className="text-sm font-medium leading-none">
              Maximum: <BigIntDisplay amount={max} decimals={decimals} /> {symbol}
            </p>
          ) : null}
        </CardContent>
      </Card>
    );
  },
);
