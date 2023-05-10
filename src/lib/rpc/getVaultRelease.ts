import type { Network } from "../types";
import { getVaultFundDeployer } from "./getVaultFundDeployer";
import { type Address, isAddressEqual } from "viem";

export async function getVaultRelease({
  network,
  vault,
  fundDeployerSulu,
  fundDeployerEncore,
  fundDeployerPhoenix,
}: {
  network: Network;
  vault: Address;
  fundDeployerSulu: Address;
  fundDeployerEncore: Address;
  fundDeployerPhoenix: Address;
}): Promise<{ name: string; version: number }> {
  const fundDeployer = await getVaultFundDeployer({ network, vault });

  if (isAddressEqual(fundDeployer, fundDeployerSulu)) {
    return { name: "Sulu", version: 4 };
  }

  if (isAddressEqual(fundDeployer, fundDeployerEncore)) {
    return { name: "Encore", version: 3 };
  }

  if (isAddressEqual(fundDeployer, fundDeployerPhoenix)) {
    return { name: "Phoenix", version: 2 };
  }

  throw new Error(`Unknown fund deployer: ${fundDeployer}`);
}
