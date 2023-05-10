import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { networks } from "@/lib/consts";
import {
  FeeDetailsCommonFragmentDoc,
  FeeDetailsFragmentDoc,
  PolicyDetailsCommonFragmentDoc,
  PolicyDetailsFragmentDoc,
  queryCoreSubgraph,
  useFragment,
} from "@/lib/gql";
import { assertParams } from "@/lib/params";
import { getTrackedAssets } from "@/lib/rpc/getTrackedAssets";
import { vaultDetails } from "@/lib/subgraphs/core/vaultDetails";
import { z } from "@/lib/zod";

export default async function VaultPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const result = await queryCoreSubgraph(vaultDetails, {
    id: params.vault,
  });

  const trackedAssets = await getTrackedAssets({
    network: networks[deployment],
    vault,
  });

  console.log(trackedAssets);

  return (
    <div style={{ padding: "1rem" }}>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Name: {result.vault?.name}</div>
          <div>Symbol: {result.vault?.symbol}</div>
          <div>Address: {result.vault?.id}</div>
          <div>Owner: {result.vault?.owner?.id}</div>
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
          {result.vault?.comptroller?.fees.map((fee) => {
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
          {result.vault?.comptroller?.policies.map((policy) => {
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
      {/*        <Link href={`${params.deployment}/${result.vault?.id}/deposit`} >Deposit</Link>*/}
      {/*        <Link href={`${params.deployment}/${result.vault?.id}/redeem`} >Redeem</Link>*/}
      {/*    </CardContent>*/}
      {/*</Card>*/}
    </div>
  );
}

export const runtime = "edge";
