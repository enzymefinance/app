import { ExternalPositions } from "@/components/ExternalPositions";
import { TokenHoldingsTable } from "@/components/TokenHoldingsTable";
import { getContract } from "@/lib/consts";
import { assertParams } from "@/lib/params";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { z } from "@/lib/zod";
import { getAssetWithAmount } from "@enzymefinance/sdk";
import { getExternalPositionsInfo } from "@enzymefinance/sdk";
import { getTrackedAssets } from "@enzymefinance/sdk";

export default async function PortfolioPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const client = getPublicClientForDeployment(deployment);
  const trackedAssets = await getTrackedAssets(client, { vault });
  const portfolioAssets = await Promise.all(
    trackedAssets.map((asset) => getAssetWithAmount(client, { account: vault, asset })),
  );
  const currentPortfolioAssets = portfolioAssets ? portfolioAssets.filter((asset) => asset.amount > 0) : [];
  const externalPositions = await getExternalPositionsInfo(client, {
    vault,
    externalPositionFactory: getContract(deployment, "ExternalPositionFactory"),
  });

  return (
    <>
      <TokenHoldingsTable portfolioAssets={currentPortfolioAssets} />
      <ExternalPositions deployment={deployment} externalPositions={externalPositions} />
    </>
  );
}
