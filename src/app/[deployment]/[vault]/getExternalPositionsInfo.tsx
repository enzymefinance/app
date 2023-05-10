import { handleContractError } from "@/lib/errors";
import { getDebtAssets } from "@/lib/rpc/getDebtAssets";
import { getExternalPositionType } from "@/lib/rpc/getExternalPositionType";
import { getLabelForExternalPositionType } from "@/lib/rpc/getLabelForPositionType";
import { getManagedAssets } from "@/lib/rpc/getManagedAssets";
import { getVaultActiveExternalPositions } from "@/lib/rpc/getVaultActiveExternalPositions";
import type { Network } from "@/lib/types";
import type { Address } from "viem";

export async function getExternalPositionsInfo({
  vault,
  network,
}: {
  vault: Address;
  network: Network;
}) {
  const externalPositions = await getVaultActiveExternalPositions({ vault, network });
  const externalPositionFactory = "0x0aacb782205dde9eff4862ace9849dce1ca3409f";

  const externalPositionsInfo = await Promise.all(
    externalPositions.map(async (externalPosition) => {
      const externalPositionType = await getExternalPositionType({ vault: externalPosition, network });

      const externalPositionLabel = await getLabelForExternalPositionType({
        network,
        externalPositionFactory,
        typeId: externalPositionType,
      });

      const debtAssets = await getDebtAssets({
        network,
        address: externalPosition,
      });

      const managedAssets = await getManagedAssets({
        network,
        address: externalPosition,
      });

      return {
        externalPosition,
        externalPositionLabel,
        debtAssets,
        managedAssets,
      };
    }),
  );

  return {
    externalPositionsInfo,
  };
}
