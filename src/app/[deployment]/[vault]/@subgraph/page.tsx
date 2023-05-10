import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FUND_DEPLOYER_ENCORE,
  FUND_DEPLOYER_PHOENIX,
  FUND_DEPLOYER_SULU,
  FUND_VALUE_CALCULATOR_ROUTER,
  type Network,
  getNetworkByDeployment,
} from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { getAssetInfo } from "@/lib/rpc/getAssetInfo";
import { getAssetSymbol } from "@/lib/rpc/getAssetSymbol";
import { getAssetTotalSupply } from "@/lib/rpc/getAssetTotalSupply";
import { getDenominationAsset } from "@/lib/rpc/getDenominationAsset";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
import { getVaultGrossAssetValue } from "@/lib/rpc/getVaultGrossAssetValue";
import { getVaultName } from "@/lib/rpc/getVaultName";
import { getVaultNetShareValue } from "@/lib/rpc/getVaultNetShareValue";
import { getVaultOwner } from "@/lib/rpc/getVaultOwner";
import { getVaultRelease } from "@/lib/rpc/getVaultRelease";
import { IVault } from "@enzymefinance/abis/IVault";
import { type Address, getAddress } from "viem";

const deployments = ["ethereum", "polygon", "testnet"] as const;

const getTrackedAssets = async (deployment: typeof deployments[number], vaultId: Address) => {
  const client = getPublicClient(getNetworkByDeployment(deployment));

  return await client.readContract({
    abi: IVault,
    address: vaultId,
    functionName: "getTrackedAssets",
  });
};

async function getVaultDetails({ network, vault }: { network: Network; vault: Address }) {
  const [release, netShareValue, sharesTotalSupply, grossAssetValue, name, symbol, owner, comptroller] =
    await Promise.all([
      getVaultRelease({
        network,
        vault,
        fundDeployerSulu: FUND_DEPLOYER_SULU,
        fundDeployerEncore: FUND_DEPLOYER_ENCORE,
        fundDeployerPhoenix: FUND_DEPLOYER_PHOENIX,
      }),
      getVaultNetShareValue({ network, vault, fundValueCalculatorRouter: FUND_VALUE_CALCULATOR_ROUTER }),
      getAssetTotalSupply({ network, asset: vault }),
      getVaultGrossAssetValue({ network, vault, fundValueCalculatorRouter: FUND_VALUE_CALCULATOR_ROUTER }),
      getVaultName({ network, vault }),
      getAssetSymbol({ network, asset: vault }),
      getVaultOwner({ network, vault }),
      getVaultComptroller({ network, vault }),
    ]);

  const denominationAsset = await getAssetInfo({
    network,
    asset: await getDenominationAsset({ network, comptroller }),
  });

  return {
    release,
    netShareValue,
    sharesTotalSupply,
    grossAssetValue,
    id: vault,
    name,
    symbol,
    owner,
    denominationAsset,
  };
}

type VaultPageParams = { deployment: string; vault: string };

export default async function VaultPage({ params }: { params: VaultPageParams }) {
  const deployment = params.deployment as typeof deployments[number];
  const network = getNetworkByDeployment(deployment);
  const vault = getAddress(params.vault);

  const vaultDetails = await getVaultDetails({ vault, network });

  const trackedAssets = await getTrackedAssets(deployment, getAddress(params.vault));

  console.log({ vaultDetails, trackedAssets });

  return (
    <div style={{ padding: "1rem" }}>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Name: {vaultDetails.name}</div>
          <div>Symbol: {vaultDetails.symbol}</div>
          <div>Address: {vaultDetails.id}</div>
          <div>Owner: {vaultDetails.owner}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent>{/*    */}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <h3>
            <strong>Fees</strong>
          </h3>

          <h3>
            <strong>Policies</strong>
          </h3>
        </CardContent>
      </Card>
      {/*<Card>*/}
      {/*    <CardHeader>*/}
      {/*        <CardTitle>*/}
      {/*            Overview*/}
      {/*        </CardTitle>*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent>*/}
      {/*        <Link href={`${params.deployment}/${vault?.id}/deposit`} >Deposit</Link>*/}
      {/*        <Link href={`${params.deployment}/${vault?.id}/redeem`} >Redeem</Link>*/}
      {/*    </CardContent>*/}
      {/*</Card>*/}
    </div>
  );
}

export const runtime = "edge";
