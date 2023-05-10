import { TokenHoldingsTable } from "@/components/TokenHoldingsTable";
import { getNetworkByDeployment } from "@/lib/consts";
import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getAssetInfo } from "@/lib/rpc/getAssetInfo";
import { getBalance } from "@/lib/rpc/getBalance";
import { getTrackedAssets } from "@/lib/rpc/getTrackedAssets";
import { z } from "@/lib/zod";

const mockPortfolioData = [
  {
    asset: "ETH",
    balance: "1.0000",
    price: "$3,000.00",
    value: "$3,000.00",
  },
  {
    asset: "DAI",
    balance: "1,000.0000",
    price: "$1.00",
    value: "$1,000.00",
  },
];

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
    trackedAssets.map(async (asset) => (
      { asset: await getAssetInfo({ network, asset }), balance: await getBalance({ network, account: vault, asset })}
    ))
  ).catch(handleContractError());

  return (
    <>
      {TokenHoldingsTable(portfolioAssets)}
    </>
  );
}

export const runtime = "edge";
