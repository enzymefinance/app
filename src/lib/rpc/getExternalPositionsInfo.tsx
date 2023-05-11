import { EXTERNAL_POSITION_FACTORY, type Network } from "@/lib/consts";
import { getDebtAssets } from "@/lib/rpc/getDebtAssets";
import { getExternalPositionType } from "@/lib/rpc/getExternalPositionType";
import { getLabelForExternalPositionType } from "@/lib/rpc/getLabelForPositionType";
import { getManagedAssets } from "@/lib/rpc/getManagedAssets";
import { getVaultActiveExternalPositions } from "@/lib/rpc/getVaultActiveExternalPositions";
import type { Address } from "viem";

export async function getExternalPositionsInfo({
  vault,
  network,
}: {
  vault: Address;
  network: Network;
}) {
  const externalPositions = await getVaultActiveExternalPositions({ vault, network });
  const externalPositionsInfo = await Promise.all(
    externalPositions.map(async (externalPosition) => {
      const [externalPositionType, debtAssets, managedAssets] = await Promise.all([
        getExternalPositionType({ network, address: externalPosition }),
        getDebtAssets({ network, address: externalPosition }),
        getManagedAssets({ network, address: externalPosition }),
      ]);

      const externalPositionLabel = await getLabelForExternalPositionType({
        network,
        externalPositionFactory: EXTERNAL_POSITION_FACTORY,
        typeId: externalPositionType,
      });

      return {
        externalPosition,
        externalPositionLabel,
        debtAssets,
        managedAssets,
      };
    }),
  );

  return externalPositionsInfo;
}
