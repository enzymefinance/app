import { ExternalPositions } from "@/components/ExternalPositions";
import { TokenHoldingsTable } from "@/components/TokenHoldingsTable";
import { getNetworkByDeployment } from "@/lib/consts";
import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getAssetWithAmount } from "@/lib/rpc/getAssetWithAmount";
import { getExternalPositionsInfo } from "@/lib/rpc/getExternalPositionsInfo";
import { getTrackedAssets } from "@/lib/rpc/getTrackedAssets";
import { z } from "@/lib/zod";

export default async function PortfolioPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const network = getNetworkByDeployment(deployment);

  const trackedAssets = await getTrackedAssets({ vault, network }).catch(handleContractError());

  const portfolioAssets = await Promise.all(
    trackedAssets.map(async (asset) => await getAssetWithAmount({ network, account: vault, asset })),
  ).catch(handleContractError());

  const currentPortfolioAssets = portfolioAssets ? portfolioAssets.filter((asset) => asset.amount > 0) : [];

  const externalPositions = await getExternalPositionsInfo({ vault, network });

  return (
    <>
      <TokenHoldingsTable portfolioAssets={currentPortfolioAssets} />
      <ExternalPositions network={network} externalPositions={externalPositions} />
    </>
  );
}
