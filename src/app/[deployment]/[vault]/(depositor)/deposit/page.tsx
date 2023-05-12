import { VaultApprove } from "@/components/VaultApprove";
import { VaultBuyShares } from "@/components/VaultBuyShares";
import { assertParams } from "@/lib/params";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { z } from "@/lib/zod";
import { getDenominationAsset } from "@enzymefinance/sdk";
import { getVaultComptroller } from "@enzymefinance/sdk";

export default async function DepositPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const client = getPublicClientForDeployment(deployment);
  const comptroller = await getVaultComptroller(client, { vault });
  const denominationAsset = await getDenominationAsset(client, { comptroller });

  return (
    <>
      <VaultApprove deployment={deployment} comptroller={comptroller} denominationAsset={denominationAsset} />
      <VaultBuyShares deployment={deployment} comptroller={comptroller} denominationAsset={denominationAsset} />
    </>
  );
}
