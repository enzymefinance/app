import { VaultApprove } from "@/components/VaultApprove";
import { VaultBuyShares } from "@/components/VaultBuyShares";
import { getNetworkByDeployment } from "@/lib/consts";
import { assertParams } from "@/lib/params";
import { getDenominationAsset } from "@/lib/rpc/getDenominationAsset";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
import { z } from "@/lib/zod";

export default async function DepositPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const network = getNetworkByDeployment(deployment);
  const comptroller = await getVaultComptroller({ vault, network });
  const denominationAsset = await getDenominationAsset({ comptroller, network });

  return (
    <>
      <VaultApprove network={network} comptroller={comptroller} denominationAsset={denominationAsset} />
      <VaultBuyShares network={network} comptroller={comptroller} denominationAsset={denominationAsset} />
    </>
  );
}