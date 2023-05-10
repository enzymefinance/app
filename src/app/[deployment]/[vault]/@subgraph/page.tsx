import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SUBGRAPH_URL, networks } from "@/lib/consts";
import { useFragment } from "@/lib/generated/gql";
import {
  FeeDetailsCommonFragmentDoc,
  FeeDetailsFragmentDoc,
  PolicyDetailsCommonFragmentDoc,
  PolicyDetailsFragmentDoc,
} from "@/lib/generated/gql/graphql";
import { getPublicClient } from "@/lib/rpc";
import { vaultDetails } from "@/lib/subgraphs/core/vaultDetails";
import { IVault } from "@enzymefinance/abis/IVault";
import { GraphQLClient } from "graphql-request";
import { type Address, getAddress } from "viem";

const deployments = ["mainnet", "polygon", "testnet"] as const;

const getTrackedAssets = async (deployment: typeof deployments[number], vaultId: Address) => {
  const client = getPublicClient(networks[deployment]);

  return await client.readContract({
    abi: IVault,
    address: vaultId,
    functionName: "getTrackedAssets",
  });
};

async function getVaultDetails(id: string) {
  const client = new GraphQLClient(SUBGRAPH_URL, { fetch: fetch });
  return await client.request(vaultDetails, { id });
}

type VaultPageParams = { deployment: string; vault: string };

export default async function VaultPage({ params }: { params: VaultPageParams }) {
  const deployment = params.deployment as typeof deployments[number];

  const { vault } = await getVaultDetails(params.vault);

  const trackedAssets = await getTrackedAssets(deployment, getAddress(params.vault));
  console.log(trackedAssets);

  return (
    <div style={{ padding: "1rem" }}>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Name: {vault?.name}</div>
          <div>Symbol: {vault?.symbol}</div>
          <div>Address: {vault?.id}</div>
          <div>Owner: {vault?.owner?.id}</div>
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
          {vault?.comptroller?.fees.map((fee) => {
            const details = useFragment(FeeDetailsFragmentDoc, fee);
            const common = useFragment(FeeDetailsCommonFragmentDoc, details);

            return (
              <div key={common.id}>
                <div>Fee Type: {common.feeType}</div>
              </div>
            );
          })}
          <h3>
            <strong>Policies</strong>
          </h3>
          {vault?.comptroller?.policies.map((policy) => {
            const details = useFragment(PolicyDetailsFragmentDoc, policy);
            const common = useFragment(PolicyDetailsCommonFragmentDoc, details);

            return (
              <div key={common.id}>
                <div>Policy Type: {common.policyType}</div>
              </div>
            );
          })}
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
